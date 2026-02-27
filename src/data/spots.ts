export interface FishingSpot {
  slug: string;
  name: string;
  prefecture: string;
  prefectureSlug: string;
  area: string;
  type: 'port' | 'beach' | 'rock' | 'breakwater' | 'river';
  lat: number;
  lng: number;
  topFish: string[];
  methods: string[];
  description: string;
  access: string;
  parking: boolean;
  toilet: boolean;
  difficulty: 1 | 2 | 3;
  score: number;
}

export interface TideData {
  type: '大潮' | '中潮' | '小潮' | '長潮' | '若潮';
  highTide: { time: string; height: number }[];
  lowTide:  { time: string; height: number }[];
  moonAge: number;
}

export interface WeatherData {
  temp: number;
  windDir: string;
  windSpeed: number;
  precipitation: number;
  waveHeight: number | null;
  waterTemp: number | null;
  condition: string;
}

export interface WeekForecastDay {
  date: string;
  dayOfWeek: string;
  tideType: string;
  weather: string;
  windSpeed: number;
  precipitation: number;
  score: number;
}

export interface AiAdvice {
  overall: '✅ 好条件' | '⚠️ 注意が必要' | '❌ 不向き';
  summary: string;
  bestTime: string;
  recommendedFish: string[];
  reasons: string[];
  caution: string;
  safety: string;
  updatedAt: string;
}

export const spots: FishingSpot[] = [
  {
    slug: 'choshi-port',
    name: '銚子港',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '銚子市',
    type: 'port',
    lat: 35.7354,
    lng: 140.8468,
    topFish: ['イワシ','アジ','サバ','イシモチ','シーバス'],
    methods: ['サビキ釣り','ウキ釣り','投げ釣り','ルアー釣り'],
    description: '銚子港は千葉県最大の漁港で、イワシやアジが年間を通じて狙える人気釣りスポットです。港内は波が穏やかで初心者にも安心です。',
    access: 'JR銚子駅から徒歩15分、または車で5分',
    parking: true,
    toilet: true,
    difficulty: 1,
    score: 88,
  },
  {
    slug: 'katsuura-port',
    name: '勝浦港',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '勝浦市',
    type: 'port',
    lat: 35.1542,
    lng: 140.3166,
    topFish: ['アジ','サバ','クロダイ','メジナ','タコ'],
    methods: ['サビキ釣り','フカセ釣り','ちょい投げ','タコ釣り'],
    description: '勝浦港は内房と外房の中間に位置し、多彩な魚種が狙えます。クロダイ・メジナのフカセ釣りで人気が高いスポットです。',
    access: 'JR勝浦駅から徒歩10分',
    parking: true,
    toilet: true,
    difficulty: 2,
    score: 85,
  },
  {
    slug: 'isumi-river-mouth',
    name: '夷隅川河口',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '大原市',
    type: 'river',
    lat: 35.2737,
    lng: 140.3839,
    topFish: ['シーバス','クロダイ','ヒラメ','マゴチ'],
    methods: ['ルアー釣り','ウキ釣り','投げ釣り'],
    description: '夷隅川河口はシーバスの一級スポット。秋のハイシーズンには大型のスズキも狙えます。ヒラメやマゴチも人気のターゲットです。',
    access: 'JR大原駅から徒歩20分',
    parking: true,
    toilet: false,
    difficulty: 2,
    score: 82,
  },
  {
    slug: 'futtsu-misaki',
    name: '富津岬',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '富津市',
    type: 'rock',
    lat: 35.2954,
    lng: 139.8090,
    topFish: ['クロダイ','シーバス','アジ','イシモチ','カレイ'],
    methods: ['フカセ釣り','ルアー釣り','サビキ釣り','投げ釣り'],
    description: '富津岬は東京湾に大きく突き出た地形で、多様な魚種が回遊します。特に春夏のクロダイフカセ釣りは定評があります。',
    access: '富津公園駐車場から徒歩10分',
    parking: true,
    toilet: true,
    difficulty: 2,
    score: 80,
  },
  {
    slug: 'onjuku-beach',
    name: '御宿海岸',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '夷隅郡御宿町',
    type: 'beach',
    lat: 35.1737,
    lng: 140.3713,
    topFish: ['ヒラメ','マゴチ','シロギス','カレイ'],
    methods: ['投げ釣り','サーフルアー'],
    description: '御宿海岸は外房の美しい砂浜で、投げ釣りのメッカ。秋のヒラメシーズンには多くの釣り人で賑わいます。',
    access: 'JR御宿駅から徒歩5分',
    parking: true,
    toilet: true,
    difficulty: 1,
    score: 78,
  },
  {
    slug: 'tateyama-port',
    name: '館山港',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '館山市',
    type: 'port',
    lat: 34.9975,
    lng: 139.8694,
    topFish: ['アジ','イワシ','サバ','クロダイ','アオリイカ'],
    methods: ['サビキ釣り','エギング','フカセ釣り','ルアー釣り'],
    description: '館山港は南房総の中心的な漁港。温暖な気候のため1年を通じてアジのサビキ釣りが楽しめます。秋のアオリイカシーズンは特に人気。',
    access: 'JR館山駅から徒歩20分、またはバス5分',
    parking: true,
    toilet: true,
    difficulty: 1,
    score: 87,
  },
  {
    slug: 'kamogawa-port',
    name: '鴨川港',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '鴨川市',
    type: 'port',
    lat: 35.1128,
    lng: 140.1038,
    topFish: ['アジ','サバ','クロダイ','メジナ','アオリイカ'],
    methods: ['サビキ釣り','フカセ釣り','エギング','ルアー釣り'],
    description: '鴨川港は外房を代表する漁港のひとつ。クロダイ・メジナのフカセ釣りから手軽なサビキ釣りまで幅広く楽しめます。',
    access: 'JR安房鴨川駅から徒歩15分',
    parking: true,
    toilet: true,
    difficulty: 1,
    score: 84,
  },
  {
    slug: 'chikura-port',
    name: '千倉港',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '南房総市',
    type: 'port',
    lat: 34.9700,
    lng: 139.9580,
    topFish: ['アジ','クロダイ','メジナ','イサキ','カワハギ'],
    methods: ['サビキ釣り','フカセ釣り','投げ釣り','カワハギ釣り'],
    description: '千倉港は南房総の静かな漁港。水質が良く、冬でもアジやクロダイが釣れます。カワハギ釣りの好場としても知られています。',
    access: 'JR千倉駅から徒歩10分',
    parking: true,
    toilet: true,
    difficulty: 1,
    score: 81,
  },
  {
    slug: 'choshi-external-port',
    name: '銚子外港（犬吠埼周辺）',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '銚子市',
    type: 'rock',
    lat: 35.7090,
    lng: 140.8715,
    topFish: ['イシダイ','メジナ','クロダイ','ヒラスズキ','カサゴ'],
    methods: ['フカセ釣り','ぶっこみ釣り','ルアー釣り'],
    description: '犬吠埼周辺の磯場は千葉県を代表する磯釣りスポット。荒磯でのヒラスズキや大型イシダイを狙う上級者に人気。波が高い日は立ち入り禁止になる場合があります。',
    access: '銚子電鉄・犬吠駅から徒歩5分',
    parking: true,
    toilet: true,
    difficulty: 3,
    score: 86,
  },
  {
    slug: 'ichinomiya-beach',
    name: '一宮海岸',
    prefecture: '千葉県',
    prefectureSlug: 'chiba',
    area: '長生郡一宮町',
    type: 'beach',
    lat: 35.3666,
    lng: 140.3690,
    topFish: ['シロギス','イシモチ','ヒラメ','マゴチ','シーバス'],
    methods: ['投げ釣り','サーフルアー'],
    description: '一宮海岸はサーフィンでも有名な外房の砂浜。シロキスの投げ釣りから秋のヒラメ・マゴチ狙いのルアーまで楽しめます。',
    access: 'JR上総一ノ宮駅から徒歩15分',
    parking: true,
    toilet: true,
    difficulty: 1,
    score: 77,
  },
];

export function getSpotBySlug(slug: string): FishingSpot | undefined {
  return spots.find(s => s.slug === slug);
}

export function getSpotsByPrefecture(prefSlug: string): FishingSpot[] {
  return spots.filter(s => s.prefectureSlug === prefSlug);
}

export function getTopSpots(n: number = 5): FishingSpot[] {
  return [...spots].sort((a, b) => b.score - a.score).slice(0, n);
}

export function getMockTideData(slug: string): TideData {
  const tideTypes: TideData['type'][] = ['大潮','中潮','小潮','長潮','若潮'];
  const idx = Math.abs(slug.charCodeAt(0)) % 5;
  return {
    type: tideTypes[idx] ?? '中潮',
    highTide: [
      { time: '05:42', height: 165 },
      { time: '17:28', height: 148 },
    ],
    lowTide: [
      { time: '11:15', height: 22 },
      { time: '23:50', height: 18 },
    ],
    moonAge: 12,
  };
}

export function getMockWeather(slug: string): WeatherData {
  return {
    temp: 14,
    windDir: '北東',
    windSpeed: 5,
    precipitation: 10,
    waveHeight: 0.8,
    waterTemp: null,
    condition: '晴れ時々曇り',
  };
}

export function getMockWeekForecast(): WeekForecastDay[] {
  const days = ['日','月','火','水','木','金','土'];
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const weathers = ['晴れ','晴れ時々曇り','曇り','小雨','晴れ','晴れ','曇り時々晴れ'];
    const scores  = [90, 82, 65, 40, 88, 85, 75];
    return {
      date: `${mm}/${dd}`,
      dayOfWeek: days[d.getDay()] ?? '',
      tideType: ['大潮','中潮','中潮','小潮','小潮','長潮','若潮'][i] ?? '中潮',
      weather: weathers[i] ?? '晴れ',
      windSpeed: [4, 5, 7, 10, 4, 3, 6][i] ?? 5,
      precipitation: [5, 10, 20, 60, 5, 0, 15][i] ?? 10,
      score: scores[i] ?? 70,
    };
  });
}

export function getMockAiAdvice(spot: FishingSpot, tide: TideData, weather: WeatherData): AiAdvice {
  const isGoodWind = weather.windSpeed <= 6;
  const isGoodWave = weather.waveHeight == null || weather.waveHeight <= 1.0;
  const isGoodTide = tide.type === '大潮' || tide.type === '中潮';
  const goodConditions = [isGoodWind, isGoodWave, isGoodTide].filter(Boolean).length;
  
  let overall: AiAdvice['overall'];
  if (goodConditions >= 3) overall = '✅ 好条件';
  else if (goodConditions >= 2) overall = '⚠️ 注意が必要';
  else overall = '❌ 不向き';

  return {
    overall,
    summary: `本日の${spot.name}は${tide.type}・${weather.condition}・風速${weather.windSpeed}m/sのコンディションです。${
      overall === '✅ 好条件'
        ? `潮回りが良く、${spot.topFish[0] ?? 'アジ'}を中心に好釣果が期待できます。`
        : overall === '⚠️ 注意が必要'
        ? `条件はまずまずですが、風速に注意が必要です。${spot.topFish[0] ?? 'アジ'}狙いなら早朝の満潮前後がチャンスです。`
        : `本日は風波が強く、安全な釣りが難しい状況です。条件が改善するまで待つか、港内の穏やかな場所での釣りをおすすめします。`
    }`,
    bestTime: isGoodTide ? '早朝（04:00〜07:00）と夕マズメ（16:00〜18:30）' : '干満の差が少ないため終日チャンスは限られます',
    recommendedFish: spot.topFish.slice(0, 3),
    reasons: [
      `${tide.type}で潮の動きが${isGoodTide ? '活発' : 'やや弱め'}`,
      `風速${weather.windSpeed}m/s（${isGoodWind ? '釣りやすい範囲' : 'やや強め、注意が必要'}）`,
      `波高${weather.waveHeight != null ? weather.waveHeight + 'm' : '情報なし'}（${isGoodWave ? '問題なし' : '高め'}）`,
    ],
    caution: weather.windSpeed > 8
      ? '⚠️ 風速8m/s以上のため、仕掛けが流されやすい状況です。重いオモリを使用してください。'
      : '通常の釣りスタイルで問題ありません。',
    safety: '⛑️ 堤防・磯での釣りには必ずライフジャケットを着用してください。濡れた岩・消波ブロックの上では十分に注意し、波にさらわれないよう常に海を監視してください。',
    updatedAt: new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }),
  };
}
