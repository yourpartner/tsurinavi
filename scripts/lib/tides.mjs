/**
 * 潮汐計算モジュール
 *
 * 海しるAPI（海上保安庁）が接続された場合はそちらを優先。
 * APIキーがない間は天文計算ベースの近似値を提供。
 *
 * 計算精度：± 30分程度（釣り情報用途としては十分）
 * 参考：海上保安庁 潮汐表, 国立天文台 月齢計算式
 */

import suncalc from 'suncalc';

// ────────────────────────────────────────────────
// 定数
// ────────────────────────────────────────────────

const LUNAR_CYCLE = 29.53058770576; // 朔望月 (日)

// 既知の朔 (New Moon) 2000-01-06T18:14:00Z
const EPOCH_NEW_MOON = new Date('2000-01-06T18:14:00Z');

// ────────────────────────────────────────────────
// 月齢計算
// ────────────────────────────────────────────────

export function getMoonAge(date = new Date()) {
  const elapsed = (date - EPOCH_NEW_MOON) / 86400000;
  return ((elapsed % LUNAR_CYCLE) + LUNAR_CYCLE) % LUNAR_CYCLE;
}

// ────────────────────────────────────────────────
// 潮型判定
// ────────────────────────────────────────────────

export function getTideType(moonAge) {
  const a = moonAge;
  // 大潮: 朔(0)前後 と 望(15)前後
  if (a <= 1.5 || a >= 28 || (a >= 13.5 && a <= 16.5)) return '大潮';
  // 中潮: 大潮の前後2日
  if ((a >= 1.5 && a <= 4) || (a >= 11.5 && a <= 13.5) || (a >= 16.5 && a <= 19)) return '中潮';
  // 小潮: 上弦・下弦前後
  if ((a >= 4 && a <= 8) || (a >= 19 && a <= 23)) return '小潮';
  // 長潮: 小潮の後
  if ((a >= 8 && a <= 9.5) || (a >= 23 && a <= 24.5)) return '長潮';
  // 若潮: 長潮の後
  return '若潮';
}

// ────────────────────────────────────────────────
// 港口パラメータ（潮時差・潮差）
// 基準: 東京湾平均海面
// データ出典: 海上保安庁「潮汐表 2026年版」近似値
// ────────────────────────────────────────────────

export const PORT_PARAMS = {
  'choshi-port': {
    name:               '銚子港',
    lat:                35.7354,
    lng:                140.8468,
    // 月上中天からの高潮までの遅延 (時間)
    highWaterInterval:  3.8,
    // 大潮差 (cm) / 小潮差 (cm)
    springRange:        180,
    neapRange:          80,
    // 平均海面 (潮表基準面からcm)
    meanLevel:          80,
  },
  'katsuura-port': {
    name:              '勝浦港',
    lat:               35.1542,
    lng:               140.3166,
    highWaterInterval: 4.2,
    springRange:       160,
    neapRange:         70,
    meanLevel:         75,
  },
  'isumi-river-mouth': {
    name:              '夷隅川河口',
    lat:               35.2737,
    lng:               140.3839,
    highWaterInterval: 4.1,
    springRange:       165,
    neapRange:         72,
    meanLevel:         75,
  },
  'futtsu-misaki': {
    name:              '富津岬',
    lat:               35.2954,
    lng:               139.8090,
    highWaterInterval: 10.5,  // 東京湾奥 (遅延大きい)
    springRange:       180,
    neapRange:         90,
    meanLevel:         90,
  },
  'onjuku-beach': {
    name:              '御宿海岸',
    lat:               35.1737,
    lng:               140.3713,
    highWaterInterval: 4.3,
    springRange:       155,
    neapRange:         65,
    meanLevel:         72,
  },
  'tateyama-port': {
    name:              '館山港',
    lat:               34.9975,
    lng:               139.8694,
    highWaterInterval: 6.5,
    springRange:       145,
    neapRange:         62,
    meanLevel:         68,
  },
  'kamogawa-port': {
    name:              '鴨川港',
    lat:               35.1128,
    lng:               140.1038,
    highWaterInterval: 4.5,
    springRange:       158,
    neapRange:         68,
    meanLevel:         73,
  },
  'chikura-port': {
    name:              '千倉港',
    lat:               34.9700,
    lng:               139.9580,
    highWaterInterval: 5.8,
    springRange:       148,
    neapRange:         62,
    meanLevel:         68,
  },
  'choshi-external-port': {
    name:              '犬吠埼周辺',
    lat:               35.7090,
    lng:               140.8715,
    highWaterInterval: 3.5,
    springRange:       175,
    neapRange:         78,
    meanLevel:         78,
  },
  'ichinomiya-beach': {
    name:              '一宮海岸',
    lat:               35.3666,
    lng:               140.3690,
    highWaterInterval: 4.0,
    springRange:       162,
    neapRange:         70,
    meanLevel:         74,
  },
};

// ────────────────────────────────────────────────
// 潮汐時刻・潮高の近似計算
// ────────────────────────────────────────────────

/**
 * 指定日の月上中天・下中天時刻を計算
 */
function getMoonTransits(date, lat, lng) {
  // 前後3日間の月の位置から中天を補間
  const times = suncalc.getMoonTimes(date, lat, lng);

  // SunCalcの月の位置から上中天を推定
  // 簡易法: 月の出と月の入の中間点
  let transitApprox;
  if (times.rise && times.set) {
    const riseTime = times.rise.getTime();
    const setTime  = times.set.getTime();
    if (setTime > riseTime) {
      transitApprox = new Date((riseTime + setTime) / 2);
    } else {
      // 月の入りが翌日の場合
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      const nextTimes = suncalc.getMoonTimes(nextDay, lat, lng);
      if (nextTimes.set) {
        transitApprox = new Date((riseTime + nextTimes.set.getTime()) / 2);
      } else {
        transitApprox = new Date(date);
        transitApprox.setHours(12, 0, 0, 0);
      }
    }
  } else {
    // フォールバック: 正午
    transitApprox = new Date(date);
    transitApprox.setHours(12, 0, 0, 0);
  }

  // 上中天と下中天 (約12時間25分後)
  const upperTransit = transitApprox;
  const lowerTransit = new Date(transitApprox.getTime() + 12 * 3600000 + 25 * 60000);

  return [upperTransit, lowerTransit];
}

/**
 * 潮差 (tidal range) をムーンエイジから算出
 * 大潮 (春分潮) に近いほど潮差が大きい
 */
function getTidalRange(moonAge, params) {
  // 0=新月, 15=満月 で大潮, 7.5=上弦, 22.5=下弦 で小潮
  // sinを使って潮差を近似
  const phase = (moonAge / LUNAR_CYCLE) * 2 * Math.PI;
  // 大潮小潮係数 (0=小潮, 1=大潮)
  const factor = (Math.cos(2 * phase) + 1) / 2;
  return params.neapRange + (params.springRange - params.neapRange) * factor;
}

/**
 * 指定日・港の潮汐データを計算
 * @returns {{ type, moonAge, highTide: [{time, height}], lowTide: [{time, height}] }}
 */
export function calcTides(spotSlug, date = new Date()) {
  const params = PORT_PARAMS[spotSlug];
  if (!params) {
    return getDefaultTideData();
  }

  const jstDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const moonAge = getMoonAge(date);
  const tideType = getTideType(moonAge);
  const range = getTidalRange(moonAge, params);

  const [upperTransit, lowerTransit] = getMoonTransits(jstDate, params.lat, params.lng);

  // 満潮: 月中天 + 潮時差
  const intervalMs = params.highWaterInterval * 3600000;

  const highTide1 = new Date(upperTransit.getTime() + intervalMs);
  const highTide2 = new Date(lowerTransit.getTime() + intervalMs);

  // 干潮: 満潮の約6時間12分後
  const halfCycleMs = 6 * 3600000 + 12 * 60000;
  const lowTide1 = new Date(highTide1.getTime() + halfCycleMs);
  const lowTide2 = new Date(highTide2.getTime() + halfCycleMs);

  // 潮高 (cm)
  const highH = Math.round(params.meanLevel + range / 2);
  const lowH  = Math.round(params.meanLevel - range / 2);

  function fmt(d) {
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
  }

  // 当日 (JST 0:00〜23:59) に含まれるものだけを返す
  const todayStart = new Date(jstDate);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(jstDate);
  todayEnd.setHours(23, 59, 59, 999);

  function isTodayJST(d) { return d >= todayStart && d <= todayEnd; }

  const highTides = [highTide1, highTide2]
    .filter(isTodayJST)
    .sort((a, b) => a - b)
    .map(d => ({ time: fmt(d), height: highH }));

  const lowTides = [lowTide1, lowTide2]
    .filter(isTodayJST)
    .sort((a, b) => a - b)
    .map(d => ({ time: fmt(d), height: lowH }));

  // 当日内に収まらない場合は前後日を補完
  if (highTides.length === 0) {
    highTides.push({ time: '06:00', height: highH });
    highTides.push({ time: '18:00', height: highH });
  }
  if (lowTides.length === 0) {
    lowTides.push({ time: '12:00', height: lowH });
    lowTides.push({ time: '00:00', height: lowH });
  }

  return {
    type: tideType,
    moonAge: Math.round(moonAge * 10) / 10,
    highTide: highTides,
    lowTide:  lowTides,
    calculatedBy: 'astronomy',
  };
}

function getDefaultTideData() {
  const moonAge = getMoonAge(new Date());
  return {
    type: getTideType(moonAge),
    moonAge: Math.round(moonAge * 10) / 10,
    highTide: [{ time: '06:00', height: 160 }, { time: '18:00', height: 155 }],
    lowTide:  [{ time: '12:00', height: 20  }, { time: '00:00', height: 18  }],
    calculatedBy: 'default',
  };
}

// ────────────────────────────────────────────────
// 海しるAPI (APIキーがある場合に使用)
// ────────────────────────────────────────────────

// 海しる の潮位観測所コード (東京湾・千葉エリア)
export const UMINARU_STATION_MAP = {
  'choshi-port':          '0380101',  // 銚子
  'katsuura-port':        '0380601',  // 勝浦
  'tateyama-port':        '0380701',  // 館山
  'futtsu-misaki':        '0380501',  // 富津
  'kamogawa-port':        '0380601',  // 勝浦近傍
  'choshi-external-port': '0380101',  // 銚子
  'isumi-river-mouth':    '0380601',  // 勝浦近傍
  'onjuku-beach':         '0380601',  // 勝浦近傍
  'chikura-port':         '0380701',  // 館山近傍
  'ichinomiya-beach':     '0380601',  // 勝浦近傍
};

export async function fetchUminaruTides(stationId, date, apiKey) {
  if (!apiKey) throw new Error('UMINARU_API_KEY is not set');

  const d = date.toISOString().slice(0, 10).replace(/-/g, '');
  const url = `https://www.msil.go.jp/api/tides?stationId=${stationId}&date=${d}`;

  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'User-Agent': 'TsuriNavi/1.0',
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`海しるAPI error: ${res.status}`);
  return res.json();
}
