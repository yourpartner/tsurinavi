export interface FishingMethod {
  slug: string;
  name: string;
  difficulty: 1 | 2 | 3;
  targetFish: string[];
  scene: string[];
  description: string;
  beginner: boolean;
  gearBudget: '低' | '中' | '高';
  amazonLink: string;
  rakutenLink: string;
}

export const methods: FishingMethod[] = [
  {
    slug: 'sabiki',
    name: 'サビキ釣り',
    difficulty: 1,
    targetFish: ['アジ','サバ','イワシ','サヨリ'],
    scene: ['堤防','港','桟橋'],
    description: '複数の疑似餌針（サビキ仕掛け）とアミエビを使う最もポピュラーな釣り。アジ・イワシなど群れで泳ぐ魚を数釣りできます。道具代が安く、手軽に始められる入門最適の釣り方。',
    beginner: true,
    gearBudget: '低',
    amazonLink: 'https://www.amazon.co.jp/s?k=サビキ仕掛けセット&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/サビキ仕掛け/',
  },
  {
    slug: 'ukizuri',
    name: 'ウキ釣り',
    difficulty: 1,
    targetFish: ['クロダイ','メジナ','アジ','チヌ','サヨリ'],
    scene: ['堤防','港','磯'],
    description: 'ウキ（浮き）を使って魚のアタリを目で確認する釣り方。シンプルな仕掛けで様々な魚を狙えます。エサはオキアミ・虫エサ・コーン等、狙う魚によって選択。',
    beginner: true,
    gearBudget: '低',
    amazonLink: 'https://www.amazon.co.jp/s?k=ウキ釣り仕掛けセット&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/ウキ釣りセット/',
  },
  {
    slug: 'nage-zuri',
    name: '投げ釣り',
    difficulty: 1,
    targetFish: ['カレイ','シロギス','イシモチ','ヒラメ','マゴチ'],
    scene: ['砂浜','堤防','港'],
    description: '重いオモリをつけた仕掛けを遠くに投げ、海底付近の魚を狙う釣り。砂浜（サーフ）での投げ釣りはカレイ・シロギス狙いに最適。竿は長めのもの（30〜33号）を使用。',
    beginner: true,
    gearBudget: '中',
    amazonLink: 'https://www.amazon.co.jp/s?k=投げ釣りセット+初心者&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/投げ釣りセット/',
  },
  {
    slug: 'fukase',
    name: 'フカセ釣り',
    difficulty: 3,
    targetFish: ['クロダイ','メジナ','マダイ','グレ'],
    scene: ['磯','堤防'],
    description: '仕掛けをコマセ（撒き餌）に同調させて魚を釣る本格的な釣り方。クロダイ・メジナを専門に狙うスタイルで、仕掛けの調整や流し方に技術が必要。「釣りの奥が深い」と言われる釣り方。',
    beginner: false,
    gearBudget: '高',
    amazonLink: 'https://www.amazon.co.jp/s?k=フカセ釣りセット+磯竿&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/フカセ釣りセット/',
  },
  {
    slug: 'lure',
    name: 'ルアー釣り（シーバス）',
    difficulty: 2,
    targetFish: ['シーバス','ヒラメ','マゴチ','青物'],
    scene: ['河口','砂浜','堤防','磯'],
    description: '疑似餌（ルアー）を使ってシーバスや青物を狙うゲームフィッシング。ルアーを投げて巻く「ただ巻き」が基本。夜の河口・堤防はシーバスの一級ポイントです。',
    beginner: false,
    gearBudget: '中',
    amazonLink: 'https://www.amazon.co.jp/s?k=シーバスルアーセット+ミノー&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/シーバスルアーセット/',
  },
  {
    slug: 'eging',
    name: 'エギング',
    difficulty: 2,
    targetFish: ['アオリイカ','コウイカ','ヤリイカ'],
    scene: ['堤防','磯','港'],
    description: 'エギ（疑似餌）をシャクってアオリイカを釣るルアー釣りの一種。シャクリのリズムやステイのタイミングがコツ。秋の新子シーズンは初心者でも釣れる絶好のチャンス。',
    beginner: false,
    gearBudget: '中',
    amazonLink: 'https://www.amazon.co.jp/s?k=エギングセット+アオリイカ&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/エギングセット/',
  },
  {
    slug: 'jigging',
    name: 'ジギング（メタルジグ）',
    difficulty: 2,
    targetFish: ['ブリ','カンパチ','サバ','ソウダガツオ'],
    scene: ['港','堤防','沖'],
    description: '金属製のルアー（メタルジグ）を上下にしゃくって青物やサバを狙う釣り方。堤防から手軽にできる「ショアジギング」は近年大人気。時速60km以上で引くブリの引きは最高です。',
    beginner: false,
    gearBudget: '中',
    amazonLink: 'https://www.amazon.co.jp/s?k=ショアジギングロッド+セット&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/ショアジギングセット/',
  },
  {
    slug: 'ajing',
    name: 'アジング',
    difficulty: 2,
    targetFish: ['アジ','メバル','カサゴ'],
    scene: ['港','堤防'],
    description: '超軽量ジグヘッド（0.3〜2g）とソフトルアー（ワーム）でアジを釣るライトゲームフィッシング。夜の常夜灯回りがメインポイント。タックルの繊細さと感度が勝負のカギ。',
    beginner: false,
    gearBudget: '中',
    amazonLink: 'https://www.amazon.co.jp/s?k=アジングロッド+ジグヘッド+セット&tag=YOURTAG-22',
    rakutenLink: 'https://search.rakuten.co.jp/search/mall/アジングセット/',
  },
];

export function getMethodBySlug(slug: string): FishingMethod | undefined {
  return methods.find(m => m.slug === slug);
}
