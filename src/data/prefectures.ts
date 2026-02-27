export interface Prefecture {
  slug: string;
  name: string;
  nameEn: string;
  region: string;
  spotCount: number;
  topFish: string[];
}

export const prefectures: Prefecture[] = [
  { slug: 'chiba',      name: '千葉県',   nameEn: 'Chiba',      region: '関東', spotCount: 100, topFish: ['アジ','イワシ','クロダイ','シーバス','ヒラメ'] },
  { slug: 'kanagawa',   name: '神奈川県', nameEn: 'Kanagawa',   region: '関東', spotCount: 80,  topFish: ['アジ','サバ','シーバス','クロダイ','カサゴ'] },
  { slug: 'shizuoka',   name: '静岡県',   nameEn: 'Shizuoka',   region: '東海', spotCount: 90,  topFish: ['アジ','カマス','ヒラメ','シーバス','イシダイ'] },
  { slug: 'tokyo',      name: '東京都',   nameEn: 'Tokyo',      region: '関東', spotCount: 40,  topFish: ['アジ','シーバス','クロダイ','サビキ全般'] },
  { slug: 'osaka',      name: '大阪府',   nameEn: 'Osaka',      region: '近畿', spotCount: 60,  topFish: ['アジ','サバ','チヌ','タチウオ','ハマチ'] },
  { slug: 'hyogo',      name: '兵庫県',   nameEn: 'Hyogo',      region: '近畿', spotCount: 70,  topFish: ['アジ','サバ','イワシ','チヌ','タチウオ'] },
  { slug: 'aichi',      name: '愛知県',   nameEn: 'Aichi',      region: '東海', spotCount: 65,  topFish: ['アジ','サバ','クロダイ','シーバス','カレイ'] },
  { slug: 'fukuoka',    name: '福岡県',   nameEn: 'Fukuoka',    region: '九州', spotCount: 75,  topFish: ['アジ','サバ','チヌ','ヒラメ','ブリ'] },
  { slug: 'hiroshima',  name: '広島県',   nameEn: 'Hiroshima',  region: '中国', spotCount: 55,  topFish: ['アジ','チヌ','カレイ','アナゴ','タコ'] },
  { slug: 'miyagi',     name: '宮城県',   nameEn: 'Miyagi',     region: '東北', spotCount: 50,  topFish: ['アジ','サバ','カレイ','ヒラメ','マダラ'] },
  { slug: 'ibaraki',    name: '茨城県',   nameEn: 'Ibaraki',    region: '関東', spotCount: 45,  topFish: ['アジ','イワシ','カレイ','シーバス','ヒラメ'] },
  { slug: 'mie',        name: '三重県',   nameEn: 'Mie',        region: '東海', spotCount: 60,  topFish: ['アジ','グレ','イシダイ','マダイ','ヒラメ'] },
  { slug: 'nagasaki',   name: '長崎県',   nameEn: 'Nagasaki',   region: '九州', spotCount: 85,  topFish: ['アジ','クロ','イサキ','マダイ','ヒラス'] },
  { slug: 'okinawa',    name: '沖縄県',   nameEn: 'Okinawa',    region: '沖縄', spotCount: 70,  topFish: ['ガーラ','タマン','ミーバイ','カーエー','オニヒラアジ'] },
  { slug: 'hokkaido',   name: '北海道',   nameEn: 'Hokkaido',   region: '北海道', spotCount: 110, topFish: ['サクラマス','カラフトマス','ソイ','ホッケ','カジカ'] },
  { slug: 'aomori',     name: '青森県',   nameEn: 'Aomori',     region: '東北', spotCount: 48,  topFish: ['マグロ','アジ','サバ','カレイ','ヒラメ'] },
  { slug: 'iwate',      name: '岩手県',   nameEn: 'Iwate',      region: '東北', spotCount: 42,  topFish: ['アイナメ','ソイ','カレイ','ウミタナゴ','サバ'] },
  { slug: 'akita',      name: '秋田県',   nameEn: 'Akita',      region: '東北', spotCount: 35,  topFish: ['ハタハタ','アジ','サバ','カレイ','クロダイ'] },
  { slug: 'yamagata',   name: '山形県',   nameEn: 'Yamagata',   region: '東北', spotCount: 30,  topFish: ['アジ','サバ','クロダイ','カレイ','ハタハタ'] },
  { slug: 'fukushima',  name: '福島県',   nameEn: 'Fukushima',  region: '東北', spotCount: 38,  topFish: ['アジ','サバ','カレイ','ヒラメ','シーバス'] },
  { slug: 'niigata',    name: '新潟県',   nameEn: 'Niigata',    region: '北陸', spotCount: 52,  topFish: ['アジ','サバ','クロダイ','カレイ','ヒラメ'] },
  { slug: 'toyama',     name: '富山県',   nameEn: 'Toyama',     region: '北陸', spotCount: 40,  topFish: ['ホタルイカ','アジ','サバ','ブリ','マダイ'] },
  { slug: 'ishikawa',   name: '石川県',   nameEn: 'Ishikawa',   region: '北陸', spotCount: 45,  topFish: ['アジ','グレ','マダイ','ブリ','サヨリ'] },
  { slug: 'fukui',      name: '福井県',   nameEn: 'Fukui',      region: '北陸', spotCount: 38,  topFish: ['アジ','グレ','マダイ','カレイ','ガシラ'] },
  { slug: 'tottori',    name: '鳥取県',   nameEn: 'Tottori',    region: '中国', spotCount: 35,  topFish: ['アジ','サバ','カレイ','ヒラメ','クロダイ'] },
  { slug: 'shimane',    name: '島根県',   nameEn: 'Shimane',    region: '中国', spotCount: 42,  topFish: ['アジ','サバ','クロダイ','マダイ','カレイ'] },
  { slug: 'okayama',    name: '岡山県',   nameEn: 'Okayama',    region: '中国', spotCount: 48,  topFish: ['チヌ','アジ','カレイ','タコ','アナゴ'] },
  { slug: 'yamaguchi',  name: '山口県',   nameEn: 'Yamaguchi',  region: '中国', spotCount: 55,  topFish: ['アジ','チヌ','マダイ','カレイ','イサキ'] },
  { slug: 'tokushima',  name: '徳島県',   nameEn: 'Tokushima',  region: '四国', spotCount: 45,  topFish: ['アジ','チヌ','マダイ','イサキ','ハマチ'] },
  { slug: 'kagawa',     name: '香川県',   nameEn: 'Kagawa',     region: '四国', spotCount: 50,  topFish: ['チヌ','アジ','アナゴ','タコ','カレイ'] },
  { slug: 'ehime',      name: '愛媛県',   nameEn: 'Ehime',      region: '四国', spotCount: 58,  topFish: ['アジ','マダイ','チヌ','グレ','イサキ'] },
  { slug: 'kochi',      name: '高知県',   nameEn: 'Kochi',      region: '四国', spotCount: 55,  topFish: ['アジ','カツオ','マダイ','グレ','イサキ'] },
  { slug: 'saga',       name: '佐賀県',   nameEn: 'Saga',       region: '九州', spotCount: 40,  topFish: ['タイ','チヌ','アジ','カレイ','クルマエビ'] },
  { slug: 'kumamoto',   name: '熊本県',   nameEn: 'Kumamoto',   region: '九州', spotCount: 45,  topFish: ['チヌ','アジ','カレイ','タコ','ガラカブ'] },
  { slug: 'oita',       name: '大分県',   nameEn: 'Oita',       region: '九州', spotCount: 52,  topFish: ['アジ','マダイ','チヌ','グレ','カレイ'] },
  { slug: 'miyazaki',   name: '宮崎県',   nameEn: 'Miyazaki',   region: '九州', spotCount: 48,  topFish: ['アジ','マダイ','チヌ','ヒラメ','ブリ'] },
  { slug: 'kagoshima',  name: '鹿児島県', nameEn: 'Kagoshima',  region: '九州', spotCount: 72,  topFish: ['アジ','マダイ','ブリ','カツオ','キハダ'] },
  { slug: 'kyoto',      name: '京都府',   nameEn: 'Kyoto',      region: '近畿', spotCount: 25,  topFish: ['アジ','クロダイ','マダイ','カレイ','サヨリ'] },
  { slug: 'wakayama',   name: '和歌山県', nameEn: 'Wakayama',   region: '近畿', spotCount: 68,  topFish: ['アジ','マダイ','グレ','イサキ','ハマチ'] },
  { slug: 'nara',       name: '奈良県',   nameEn: 'Nara',       region: '近畿', spotCount: 0,   topFish: [] },
  { slug: 'shiga',      name: '滋賀県',   nameEn: 'Shiga',      region: '近畿', spotCount: 0,   topFish: ['バス','ブルーギル','ナマズ','フナ'] },
  { slug: 'gifu',       name: '岐阜県',   nameEn: 'Gifu',       region: '東海', spotCount: 0,   topFish: ['アユ','アマゴ','ニジマス','コイ'] },
  { slug: 'nagano',     name: '長野県',   nameEn: 'Nagano',     region: '東海', spotCount: 0,   topFish: ['アマゴ','イワナ','ニジマス','ヤマメ'] },
  { slug: 'gunma',      name: '群馬県',   nameEn: 'Gunma',      region: '関東', spotCount: 0,   topFish: ['アユ','ヤマメ','イワナ','コイ'] },
  { slug: 'tochigi',    name: '栃木県',   nameEn: 'Tochigi',    region: '関東', spotCount: 0,   topFish: ['アユ','ヤマメ','ニジマス','コイ'] },
  { slug: 'saitama',    name: '埼玉県',   nameEn: 'Saitama',    region: '関東', spotCount: 0,   topFish: ['コイ','ヘラブナ','バス','シーバス'] },
  { slug: 'yamanashi',  name: '山梨県',   nameEn: 'Yamanashi',  region: '東海', spotCount: 0,   topFish: ['アマゴ','イワナ','ニジマス','コイ'] },
];

export const regions = ['北海道','東北','関東','北陸','東海','近畿','中国','四国','九州','沖縄'];

export function getPrefectureBySlug(slug: string): Prefecture | undefined {
  return prefectures.find(p => p.slug === slug);
}

export function getCoastalPrefectures(): Prefecture[] {
  return prefectures.filter(p => p.spotCount > 0);
}
