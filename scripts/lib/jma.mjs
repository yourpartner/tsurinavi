/**
 * 気象庁天気予報API ラッパー
 * 公式ドキュメントなしの非公式エンドポイントだが長期安定稼働中
 * https://www.jma.go.jp/bosai/forecast/data/forecast/{officeCode}.json
 */

export const JMA_OFFICES = {
  chiba:     '120000',
  kanagawa:  '140000',
  shizuoka:  '220000',
  tokyo:     '130000',
  osaka:     '270000',
  hyogo:     '280000',
  aichi:     '230000',
  fukuoka:   '400000',
  hiroshima: '340000',
  miyagi:    '040000',
  ibaraki:   '080000',
  mie:       '240000',
  nagasaki:  '420000',
  hokkaido:  '016000',
};

// 天気コード → 天気テキスト（気象庁コード体系）
const WEATHER_CODE_MAP = {
  '100': '晴れ',
  '101': '晴れ時々くもり',
  '102': '晴れ一時雨',
  '103': '晴れ時々雨',
  '104': '晴れ一時雪',
  '110': '晴れ後くもり',
  '111': '晴れ後くもり一時雨',
  '112': '晴れ後雨',
  '113': '晴れ後雪',
  '200': 'くもり',
  '201': 'くもり時々晴れ',
  '202': 'くもり一時雨',
  '203': 'くもり時々雨',
  '204': 'くもり一時雪',
  '210': 'くもり後晴れ',
  '211': 'くもり後晴れ一時雨',
  '212': 'くもり後雨',
  '213': 'くもり後雪',
  '300': '雨',
  '301': '雨時々晴れ',
  '302': '雨時々くもり',
  '303': '雨時々雪',
  '308': '大雨',
  '311': '雨後晴れ',
  '313': '雨後くもり',
  '400': '雪',
  '401': '雪時々晴れ',
  '402': '雪時々くもり',
  '403': '雪時々雨',
  '411': '雪後晴れ',
  '413': '雪後くもり',
  '414': '雪後雨',
};

// 天気コード → 絵文字
const WEATHER_EMOJI = {
  '1': '☀️',   // 晴れ系
  '2': '⛅',   // くもり系
  '3': '🌧️',  // 雨系
  '4': '❄️',  // 雪系
};

export function getWeatherEmoji(code) {
  const first = String(code)[0] ?? '2';
  return WEATHER_EMOJI[first] ?? '🌡️';
}

export function getWeatherText(code) {
  return WEATHER_CODE_MAP[String(code)] ?? '不明';
}

// 風速テキスト → 数値 (m/s) 変換
export function parseWindSpeed(windText) {
  if (!windText) return 4;
  if (windText.includes('非常に強く') || windText.includes('暴風')) return 18;
  if (windText.includes('強く'))                                      return 13;
  if (windText.includes('やや強く'))                                  return 9;
  if (windText.includes('おだやか') || windText.includes('弱い'))      return 2;
  return 4; // デフォルト
}

// 風向テキスト → 方位記号
export function parseWindDir(windText) {
  if (!windText) return '不明';
  const dirs = ['北北東','北東','東北東','東','東南東','南東','南南東','南','南南西','南西','西南西','西','西北西','北西','北北西','北'];
  for (const d of dirs) {
    if (windText.includes(d)) return d;
  }
  if (windText.includes('北'))  return '北';
  if (windText.includes('南'))  return '南';
  if (windText.includes('東'))  return '東';
  if (windText.includes('西'))  return '西';
  return '不明';
}

// 波高テキスト → 数値 (m) 変換
export function parseWaveHeight(waveText) {
  if (!waveText) return null;
  const m = waveText.match(/(\d+(?:\.\d+)?)\s*メートル/);
  if (m) return parseFloat(m[1]);
  if (waveText.includes('うねり')) return null;
  return null;
}

/**
 * 気象庁 API から天気予報データを取得
 * @param {string} officeCode 地方気象台コード (例: '120000')
 * @returns {Promise<ForecastResult>}
 */
export async function fetchJmaForecast(officeCode) {
  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${officeCode}.json`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'TsuriNavi/1.0 (tsurinavi.jp; contact@tsurinavi.jp)' },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`JMA API error: ${res.status} for ${url}`);

  const data = await res.json();
  return parseJmaForecast(data);
}

function parseJmaForecast(raw) {
  // raw[0]: 3日間予報, raw[1]: 週間予報
  const shortTerm = raw[0];
  const weekly    = raw[1];

  if (!shortTerm) throw new Error('JMA response missing short-term forecast');

  const ts = shortTerm.timeSeries ?? [];
  const days3  = ts[0]; // 天気・風 (3日間)
  const pops3  = ts[1]; // 降水確率 (6時間ごと)
  const temps3 = ts[2]; // 気温

  // 最初のエリア（通常は県全体代表）
  const areaWeather = days3?.areas?.[0];
  const areaTemps   = temps3?.areas?.[0];
  const areaPops    = pops3?.areas?.[0];

  // 今日の天気
  const todayCode     = areaWeather?.weatherCodes?.[0] ?? '200';
  const todayWeather  = getWeatherText(todayCode);
  const todayEmoji    = getWeatherEmoji(todayCode);
  const todayWind     = areaWeather?.winds?.[0] ?? '';
  const todayWave     = areaWeather?.waves?.[0] ?? null;
  const todayTemp     = areaTemps?.temps?.[0]   ?? null;

  // 降水確率（今日の最大値）
  const popsToday = areaPops?.pops?.slice(0, 4).filter(p => p !== '' && p !== '--').map(Number) ?? [];
  const todayPop  = popsToday.length > 0 ? Math.max(...popsToday) : 0;

  // 週間予報
  const weeklyTs   = weekly?.timeSeries ?? [];
  const weeklyDays = weeklyTs[0];
  const weeklyTemps= weeklyTs[1];
  const weeklyArea = weeklyDays?.areas?.[0];
  const weeklyTempArea = weeklyTemps?.areas?.[0];

  const forecast7 = (weeklyDays?.timeDefines ?? []).slice(0, 7).map((dateStr, i) => {
    const d = new Date(dateStr);
    const days = ['日','月','火','水','木','金','土'];
    const code = weeklyArea?.weatherCodes?.[i] ?? '200';
    const pop  = weeklyArea?.pops?.[i] ?? '0';
    const wind = weeklyArea?.winds?.[i] ?? '';
    return {
      date:       `${String(d.getMonth() + 1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}`,
      dayOfWeek:  days[d.getDay()],
      weatherCode: code,
      weather:    getWeatherText(code),
      weatherEmoji: getWeatherEmoji(code),
      precipitation: parseInt(pop) || 0,
      windSpeed:  parseWindSpeed(wind),
      windDir:    parseWindDir(wind),
      tempMin:    weeklyTempArea?.tempsMin?.[i] ?? null,
      tempMax:    weeklyTempArea?.tempsMax?.[i] ?? null,
    };
  });

  return {
    publishedAt:   shortTerm.reportDatetime,
    officeName:    shortTerm.publishingOffice,
    today: {
      weatherCode: todayCode,
      condition:   todayWeather,
      emoji:       todayEmoji,
      windDir:     parseWindDir(todayWind),
      windSpeed:   parseWindSpeed(todayWind),
      waveHeight:  parseWaveHeight(todayWave),
      precipitation: todayPop,
      temp:        todayTemp ? parseInt(todayTemp) : null,
    },
    forecast7,
  };
}
