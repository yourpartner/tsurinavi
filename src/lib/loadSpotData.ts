/**
 * 钓点实时数据加载器
 *
 * 优先级：
 *  1. src/data/live/spot_{slug}.json  （fetch-data.mjs 生成的真实数据）
 *  2. mock 数据 （开发阶段 / API 失败降级）
 */

import { existsSync, readFileSync } from 'node:fs';
import { join }                     from 'node:path';
import type {
  TideData,
  WeatherData,
  WeekForecastDay,
  AiAdvice,
  FishingSpot,
} from '../data/spots';
import {
  getMockTideData,
  getMockWeather,
  getMockWeekForecast,
  getMockAiAdvice,
} from '../data/spots';

// ────────────────────────────────────────────────
// live JSON の型定義
// ────────────────────────────────────────────────

interface LiveSpotData {
  generatedAt:  string;
  spotSlug:     string;
  score:        number;
  tide:         TideData & { calculatedBy?: string };
  weather:      WeatherData & { emoji?: string };
  weekForecast: (WeekForecastDay & { weatherEmoji?: string; tempMin?: string | null; tempMax?: string | null })[];
  aiAdvice:     Omit<AiAdvice, 'updatedAt'> & { updatedAt: string; generatedBy?: string };
  dataSource: {
    weather:     string;
    tide:        string;
    publishedAt: string;
  };
}

// ────────────────────────────────────────────────
// 読み込み関数
// ────────────────────────────────────────────────

const LIVE_DIR = join(process.cwd(), 'src/data/live');

function loadLiveData(slug: string): LiveSpotData | null {
  try {
    const filePath = join(LIVE_DIR, `spot_${slug}.json`);
    if (!existsSync(filePath)) return null;

    const raw  = readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw) as LiveSpotData;

    // データが24時間以内かチェック（古すぎるデータは使わない）
    const generatedAt = new Date(data.generatedAt);
    const ageHours    = (Date.now() - generatedAt.getTime()) / 3600000;
    if (ageHours > 26) {
      console.warn(`[loadSpotData] ${slug}: live data is ${Math.round(ageHours)}h old, using mock`);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

// ────────────────────────────────────────────────
// 公開API
// ────────────────────────────────────────────────

export interface SpotPageData {
  tide:          TideData;
  weather:       WeatherData;
  weekForecast:  WeekForecastDay[];
  aiAdvice:      AiAdvice;
  score:         number;
  dataSource:    string;
  isLiveData:    boolean;
}

export function getSpotPageData(spot: FishingSpot): SpotPageData {
  const live = loadLiveData(spot.slug);

  if (live) {
    // ── live データを使用 ──
    const tide: TideData = {
      type:     live.tide.type,
      highTide: live.tide.highTide,
      lowTide:  live.tide.lowTide,
      moonAge:  live.tide.moonAge,
    };

    const weather: WeatherData = {
      temp:          live.weather.temp ?? 15,
      windDir:       live.weather.windDir ?? '不明',
      windSpeed:     live.weather.windSpeed ?? 5,
      precipitation: live.weather.precipitation ?? 0,
      waveHeight:    live.weather.waveHeight ?? null,
      waterTemp:     live.weather.waterTemp ?? null,
      condition:     live.weather.condition ?? '不明',
    };

    const weekForecast: WeekForecastDay[] = live.weekForecast.map(d => ({
      date:          d.date,
      dayOfWeek:     d.dayOfWeek,
      tideType:      d.tideType,
      weather:       d.weather,
      windSpeed:     d.windSpeed,
      precipitation: d.precipitation,
      score:         d.score,
    }));

    const aiAdvice: AiAdvice = {
      overall:         live.aiAdvice.overall as AiAdvice['overall'],
      summary:         live.aiAdvice.summary,
      bestTime:        live.aiAdvice.bestTime,
      recommendedFish: live.aiAdvice.recommendedFish,
      reasons:         live.aiAdvice.reasons,
      caution:         live.aiAdvice.caution,
      safety:          live.aiAdvice.safety,
      updatedAt:       live.aiAdvice.updatedAt,
    };

    return {
      tide,
      weather,
      weekForecast,
      aiAdvice,
      score:       live.score,
      dataSource:  live.dataSource.weather,
      isLiveData:  true,
    };
  }

  // ── フォールバック: mock データ ──
  const tide    = getMockTideData(spot.slug);
  const weather = getMockWeather(spot.slug);
  return {
    tide,
    weather,
    weekForecast:  getMockWeekForecast(),
    aiAdvice:      getMockAiAdvice(spot, tide, weather),
    score:         spot.score,
    dataSource:    'モックデータ（API未接続）',
    isLiveData:    false,
  };
}
