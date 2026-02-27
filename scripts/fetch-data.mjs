/**
 * TsuriNavi データ取得スクリプト
 *
 * 実行タイミング: 毎日 AM 4:30 JST (GitHub Actions cron)
 * 実行順序: このスクリプト → astro build → Cloudflare Pages deploy
 *
 * データフロー:
 *   気象庁API  →┐
 *   天文計算    ├→ src/data/live/*.json → astro build
 *   海しるAPI  →┘ (APIキーがある場合)
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath }                         from 'node:url';
import { dirname, join }                         from 'node:path';
import { fetchJmaForecast, JMA_OFFICES }         from './lib/jma.mjs';
import {
  calcTides,
  getMoonAge,
  getTideType,
  fetchUminaruTides,
  UMINARU_STATION_MAP,
}                                                from './lib/tides.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const LIVE_DIR  = join(__dirname, '../src/data/live');
const LOG       = [];

// ────────────────────────────────────────────────
// 設定
// ────────────────────────────────────────────────

const UMINARU_API_KEY = process.env.UMINARU_API_KEY ?? '';

// スポット → 気象庁オフィスコード マッピング
const SPOT_OFFICE = {
  'choshi-port':          'chiba',
  'katsuura-port':        'chiba',
  'isumi-river-mouth':    'chiba',
  'futtsu-misaki':        'chiba',
  'onjuku-beach':         'chiba',
  'tateyama-port':        'chiba',
  'kamogawa-port':        'chiba',
  'chikura-port':         'chiba',
  'choshi-external-port': 'chiba',
  'ichinomiya-beach':     'chiba',
};

// 釣りスコア計算ロジック (0〜100)
function calcFishingScore({ tide, weather, moonAge }) {
  let score = 50;

  // 潮型ボーナス
  const tideBonus = { '大潮': 20, '中潮': 12, '若潮': 5, '小潮': 0, '長潮': -5 };
  score += tideBonus[tide.type] ?? 0;

  // 天気・風ボーナス
  const wind = weather.windSpeed ?? 5;
  if (wind <= 4)       score += 15;
  else if (wind <= 7)  score += 8;
  else if (wind <= 10) score += 0;
  else                 score -= 15;

  // 降水確率ペナルティ
  const pop = weather.precipitation ?? 0;
  if (pop >= 70) score -= 20;
  else if (pop >= 50) score -= 10;
  else if (pop >= 30) score -= 5;

  // 波高ボーナス/ペナルティ
  const wave = weather.waveHeight;
  if (wave != null) {
    if (wave <= 0.5)     score += 8;
    else if (wave <= 1.0) score += 3;
    else if (wave <= 1.5) score -= 5;
    else                  score -= 15;
  }

  // 朝夕マズメ加味 (現在の実行時刻で判定 → ビルド時は早朝)
  // ※ビルドは AM4:30 JST なので早朝マズメのスコアを微加算
  score += 5;

  return Math.min(100, Math.max(0, Math.round(score)));
}

// ────────────────────────────────────────────────
// AI アドバイス文生成 (ルールベース・DeepSeek API 接続前の代替)
// ────────────────────────────────────────────────

function generateAiAdvice(spotName, tide, weather, topFish) {
  const isGoodWind  = (weather.windSpeed ?? 5) <= 6;
  const isGoodWave  = weather.waveHeight == null || weather.waveHeight <= 1.0;
  const isGoodTide  = tide.type === '大潮' || tide.type === '中潮';
  const goodCount   = [isGoodWind, isGoodWave, isGoodTide].filter(Boolean).length;

  let overall;
  if (goodCount >= 3)    overall = '✅ 好条件';
  else if (goodCount >= 2) overall = '⚠️ 注意が必要';
  else                   overall = '❌ 不向き';

  const firstFish = topFish[0] ?? 'アジ';

  const summaries = {
    '✅ 好条件': `本日の${spotName}は${tide.type}・${weather.condition}・風速${weather.windSpeed ?? 5}m/sの好コンディションです。潮の動きが活発で、${firstFish}を中心に好釣果が期待できます。早朝のマズメ時は特にチャンスです。`,
    '⚠️ 注意が必要': `本日の${spotName}は${tide.type}・${weather.condition}・風速${weather.windSpeed ?? 5}m/sのコンディションです。条件はまずまずですが${!isGoodWind ? '風が強め' : !isGoodWave ? '波が高め' : '潮が弱め'}なため注意が必要です。${firstFish}狙いなら${tide.highTide[0]?.time ?? '早朝'}前後がチャンスです。`,
    '❌ 不向き': `本日の${spotName}は${tide.type}・${weather.condition}・風速${weather.windSpeed ?? 5}m/sで釣行には不向きなコンディションです。風波が強く安全な釣りが難しい状況です。条件改善まで待つか、波の穏やかな港内での釣りをおすすめします。`,
  };

  const reasons = [
    `${tide.type}で潮の動きが${isGoodTide ? '活発' : 'やや弱め'}`,
    `風速${weather.windSpeed ?? 5}m/s（${isGoodWind ? '釣りやすい範囲' : 'やや強め・要注意'}）`,
  ];
  if (weather.waveHeight != null) {
    reasons.push(`波高${weather.waveHeight}m（${isGoodWave ? '問題なし' : '高め・要注意'}）`);
  }

  const bestTime = isGoodTide
    ? `早朝マズメ（日出前後）と満潮前後（${tide.highTide[0]?.time ?? '06:00'}頃）`
    : '干満の差が小さいため終日チャンスは限られます。早朝マズメが最もチャンス。';

  const caution = (weather.windSpeed ?? 0) > 8
    ? `⚠️ 風速${weather.windSpeed}m/s以上のため仕掛けが流されやすい状況です。重いオモリを使用してください。`
    : '';

  return {
    overall,
    summary:         summaries[overall] ?? summaries['⚠️ 注意が必要'],
    bestTime,
    recommendedFish: topFish.slice(0, 3),
    reasons,
    caution,
    safety:          '⛑️ 堤防・磯での釣りには必ずライフジャケットを着用してください。濡れた岩・消波ブロックの上では十分に注意し、波にさらわれないよう常に海を監視してください。',
    generatedBy:     'rule-engine-v1',
    updatedAt:       new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
  };
}

// ────────────────────────────────────────────────
// メイン処理
// ────────────────────────────────────────────────

async function main() {
  console.log('🎣 TsuriNavi データ取得開始:', new Date().toISOString());

  if (!existsSync(LIVE_DIR)) {
    mkdirSync(LIVE_DIR, { recursive: true });
  }

  const today = new Date();
  const moonAge = getMoonAge(today);
  const tideType = getTideType(moonAge);

  // ① 気象庁API: 都道府県ごとに1回だけ取得
  const weatherByPref = {};
  for (const [prefKey, officeCode] of Object.entries(JMA_OFFICES)) {
    try {
      console.log(`  ⛅ 天気取得: ${prefKey} (${officeCode})`);
      weatherByPref[prefKey] = await fetchJmaForecast(officeCode);
      // API への負荷軽減
      await sleep(500);
    } catch (err) {
      console.error(`  ❌ 天気取得失敗: ${prefKey} -`, err.message);
      LOG.push({ type: 'error', target: prefKey, message: err.message });
    }
  }

  // ② スポットごとにデータを生成
  const spots = Object.keys(SPOT_OFFICE);
  let successCount = 0;
  let failCount    = 0;

  for (const spotSlug of spots) {
    try {
      const prefKey  = SPOT_OFFICE[spotSlug];
      const forecast = weatherByPref[prefKey];

      if (!forecast) {
        throw new Error(`Weather data not available for ${prefKey}`);
      }

      // 潮汐データ取得 (海しるAPIが使える場合はそちらを優先)
      let tideData;
      if (UMINARU_API_KEY && UMINARU_STATION_MAP[spotSlug]) {
        try {
          const raw = await fetchUminaruTides(UMINARU_STATION_MAP[spotSlug], today, UMINARU_API_KEY);
          tideData = parseUminaruResponse(raw, moonAge, tideType);
          console.log(`  🌊 潮汐: ${spotSlug} (海しるAPI)`);
        } catch (err) {
          console.warn(`  ⚠️ 海しるAPI失敗、天文計算で代替: ${err.message}`);
          tideData = calcTides(spotSlug, today);
        }
      } else {
        tideData = calcTides(spotSlug, today);
      }

      // 今日の天気 (weatherオブジェクト組み立て)
      const weather = {
        ...forecast.today,
        waterTemp: null, // 水温は後補
      };

      // 7日間予報
      const weekForecast = forecast.forecast7.map(day => {
        const tileScore = calcFishingScore({
          tide: { type: getTideType(getMoonAge(new Date(today.getTime() + forecast.forecast7.indexOf(day) * 86400000))) },
          weather: { windSpeed: day.windSpeed, precipitation: day.precipitation, waveHeight: null },
          moonAge: getMoonAge(today),
        });
        return {
          date:          day.date,
          dayOfWeek:     day.dayOfWeek,
          tideType:      getTideType(getMoonAge(new Date(today.getTime() + forecast.forecast7.indexOf(day) * 86400000))),
          weather:       day.weather,
          weatherEmoji:  day.weatherEmoji,
          windSpeed:     day.windSpeed,
          windDir:       day.windDir,
          precipitation: day.precipitation,
          tempMin:       day.tempMin,
          tempMax:       day.tempMax,
          score:         tileScore,
        };
      });

      // スポットのTopFish (data/spots.ts から同期は難しいので直接定義)
      const topFishMap = getTopFishMap();
      const topFish = topFishMap[spotSlug] ?? ['アジ','イワシ','シーバス'];

      // AI アドバイス生成
      const aiAdvice = generateAiAdvice(
        getSpotName(spotSlug),
        tideData,
        weather,
        topFish,
      );

      const score = calcFishingScore({ tide: tideData, weather, moonAge });

      // JSON に書き出し
      const output = {
        generatedAt:  new Date().toISOString(),
        spotSlug,
        score,
        tide:         tideData,
        weather,
        weekForecast,
        aiAdvice,
        dataSource: {
          weather:    `気象庁API (${forecast.officeName})`,
          tide:       tideData.calculatedBy === 'astronomy' ? '天文計算（海しるAPIキー未設定）' : '海しるAPI',
          publishedAt: forecast.publishedAt,
        },
      };

      const outPath = join(LIVE_DIR, `spot_${spotSlug}.json`);
      writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8');
      successCount++;
      console.log(`  ✅ ${spotSlug} → score: ${score}, 潮型: ${tideData.type}`);

    } catch (err) {
      failCount++;
      console.error(`  ❌ ${spotSlug}:`, err.message);
      LOG.push({ type: 'error', target: spotSlug, message: err.message });
    }
  }

  // サマリーファイル
  const summary = {
    generatedAt:  new Date().toISOString(),
    successCount,
    failCount,
    moonAge:      Math.round(moonAge * 10) / 10,
    tideType,
    errors:       LOG.filter(l => l.type === 'error'),
  };
  writeFileSync(join(LIVE_DIR, '_summary.json'), JSON.stringify(summary, null, 2), 'utf-8');

  console.log(`\n✅ 完了: 成功${successCount}件 / 失敗${failCount}件`);
  if (failCount > 0) {
    console.error('⚠️ エラーあり。_summary.json を確認してください。');
    process.exit(failCount === spots.length ? 1 : 0); // 全失敗の場合のみ非ゼロ終了
  }
}

// ────────────────────────────────────────────────
// ヘルパー
// ────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function parseUminaruResponse(raw, moonAge, tideType) {
  // 海しるAPIのレスポンス形式に合わせてパース (実装後に調整)
  // 仮実装: 天文計算を返す
  return {
    type: tideType,
    moonAge: Math.round(moonAge * 10) / 10,
    highTide: raw.highTide ?? [],
    lowTide:  raw.lowTide  ?? [],
    calculatedBy: 'uminaru-api',
  };
}

function getSpotName(slug) {
  const names = {
    'choshi-port':          '銚子港',
    'katsuura-port':        '勝浦港',
    'isumi-river-mouth':    '夷隅川河口',
    'futtsu-misaki':        '富津岬',
    'onjuku-beach':         '御宿海岸',
    'tateyama-port':        '館山港',
    'kamogawa-port':        '鴨川港',
    'chikura-port':         '千倉港',
    'choshi-external-port': '犬吠埼周辺',
    'ichinomiya-beach':     '一宮海岸',
  };
  return names[slug] ?? slug;
}

function getTopFishMap() {
  return {
    'choshi-port':          ['イワシ','アジ','サバ','イシモチ','シーバス'],
    'katsuura-port':        ['アジ','サバ','クロダイ','メジナ','タコ'],
    'isumi-river-mouth':    ['シーバス','クロダイ','ヒラメ','マゴチ'],
    'futtsu-misaki':        ['クロダイ','シーバス','アジ','イシモチ','カレイ'],
    'onjuku-beach':         ['ヒラメ','マゴチ','シロギス','カレイ'],
    'tateyama-port':        ['アジ','イワシ','サバ','クロダイ','アオリイカ'],
    'kamogawa-port':        ['アジ','サバ','クロダイ','メジナ','アオリイカ'],
    'chikura-port':         ['アジ','クロダイ','メジナ','イサキ','カワハギ'],
    'choshi-external-port': ['イシダイ','メジナ','クロダイ','ヒラスズキ','カサゴ'],
    'ichinomiya-beach':     ['シロギス','イシモチ','ヒラメ','マゴチ','シーバス'],
  };
}

// ────────────────────────────────────────────────
// 実行
// ────────────────────────────────────────────────

main().catch(err => {
  console.error('💥 致命的エラー:', err);
  process.exit(1);
});
