export interface Fish {
  slug: string;
  name: string;
  nameEn: string;
  season: string;
  difficulty: 1 | 2 | 3;
  methods: string[];
  description: string;
  gear: string[];
  spots: string[];
  image: string;
}

export const fishList: Fish[] = [
  {
    slug: 'aji',
    name: 'アジ',
    nameEn: 'Horse Mackerel',
    season: '通年（春〜秋が最盛期）',
    difficulty: 1,
    methods: ['サビキ釣り', 'アジング', 'ウキ釣り'],
    description: '日本全国の港や堤防で最もポピュラーな対象魚。初心者でも簡単に釣れるため「釣りの入門魚」として親しまれています。サビキ仕掛けで数釣りが楽しめます。',
    gear: ['サビキ仕掛け', 'アミエビ', 'コマセカゴ', '5〜8号サビキ竿'],
    spots: ['choshi-port', 'tateyama-port', 'kamogawa-port'],
    image: '/images/fish/aji.webp',
  },
  {
    slug: 'kurodai',
    name: 'クロダイ',
    nameEn: 'Black Seabream',
    season: '春〜秋（通年可）',
    difficulty: 2,
    methods: ['フカセ釣り', 'ぶっこみ釣り', 'チニング'],
    description: '堤防・磯・河口などに生息する人気の高級魚。警戒心が強く「底物の王様」とも呼ばれます。フカセ釣りでの繊細なやり取りが醍醐味です。',
    gear: ['磯竿1〜1.5号', 'フカセ仕掛け', 'コーン・オキアミ等エサ', 'ウキ各種'],
    spots: ['katsuura-port', 'futtsu-misaki', 'choshi-external-port'],
    image: '/images/fish/kurodai.webp',
  },
  {
    slug: 'seabass',
    name: 'シーバス（スズキ）',
    nameEn: 'Japanese Seabass',
    season: '春〜秋（特に秋が大型期）',
    difficulty: 2,
    methods: ['ルアー釣り', 'ウキ釣り', 'のべ竿泳がせ'],
    description: '都市河川から外洋まで幅広く生息する人気のゲームフィッシュ。夜釣りのルアーゲームは特に興奮します。秋の荒食いシーズンには大型の「ランカー」も狙えます。',
    gear: ['シーバスロッド9〜10ft', 'スピニングリール3000〜4000番', 'バイブレーション・ミノー・シンペン'],
    spots: ['isumi-river-mouth', 'futtsu-misaki', 'ichinomiya-beach'],
    image: '/images/fish/seabass.webp',
  },
  {
    slug: 'hirame',
    name: 'ヒラメ',
    nameEn: 'Japanese Flounder',
    season: '秋〜冬（10月〜1月が最盛期）',
    difficulty: 2,
    methods: ['サーフルアー', '泳がせ釣り', '投げ釣り（ジグヘッド）'],
    description: 'サーフ（砂浜）でのルアーゲームの最人気ターゲット。「サーフゲームの王者」と呼ばれ、秋の落とし込みシーズンには大型個体も多く釣れます。',
    gear: ['サーフロッド10〜12ft', 'スピニングリール4000番', 'メタルジグ・ヒラメミノー'],
    spots: ['onjuku-beach', 'ichinomiya-beach'],
    image: '/images/fish/hirame.webp',
  },
  {
    slug: 'saba',
    name: 'サバ',
    nameEn: 'Mackerel',
    season: '夏〜秋（群れの回遊次第）',
    difficulty: 1,
    methods: ['サビキ釣り', 'ジギング', 'ウキ釣り'],
    description: '群れで回遊するため、当たれば爆釣できる人気魚。青物特有の強い引きが楽しめます。新鮮なサバはお刺身でも絶品です。',
    gear: ['サビキ仕掛け(大きめ)', 'メタルジグ20〜40g', 'ウキ仕掛け'],
    spots: ['choshi-port', 'tateyama-port'],
    image: '/images/fish/saba.webp',
  },
  {
    slug: 'aoriika',
    name: 'アオリイカ',
    nameEn: 'Bigfin Reef Squid',
    season: '春（産卵期）・秋（新子シーズン）',
    difficulty: 2,
    methods: ['エギング', 'ヤエン釣り', 'ウキ釣りアジ泳がせ'],
    description: 'イカ釣りの最人気ターゲット。エギング（エギを使ったルアー釣り）で狙うスタイルが主流で、秋の新子シーズンには初心者でも釣れます。',
    gear: ['エギングロッド8〜8.6ft', 'スピニングリール2500番', 'エギ2.5〜3.5号'],
    spots: ['tateyama-port', 'kamogawa-port', 'chikura-port'],
    image: '/images/fish/aoriika.webp',
  },
  {
    slug: 'karei',
    name: 'カレイ',
    nameEn: 'Flatfish',
    season: '冬〜春（12月〜4月）',
    difficulty: 1,
    methods: ['投げ釣り', 'ちょい投げ'],
    description: '冬の投げ釣りの定番ターゲット。砂底の海底を好み、イソメ類を餌にした投げ釣りで狙います。寒い時期でも釣れるため冬の釣り人に人気です。',
    gear: ['投げ竿30〜33号', 'スピニングリール大型', 'テンビン仕掛け', 'アオイソメ'],
    spots: [],
    image: '/images/fish/karei.webp',
  },
  {
    slug: 'mejina',
    name: 'メジナ（グレ）',
    nameEn: 'Largescale Blackfish',
    season: '冬〜春（12月〜3月が最盛期）',
    difficulty: 3,
    methods: ['フカセ釣り'],
    description: '磯釣りの王道ターゲット。「磯のクイーン」と呼ばれ、フカセ釣りの技術が問われます。冬の冷たい水の中での繊細なアタリを見極める上級者向けの魚です。',
    gear: ['磯竿1号', 'ウキ仕掛け（グレ針5〜7号）', 'オキアミ', 'グレ専用コマセ'],
    spots: ['choshi-external-port', 'katsuura-port'],
    image: '/images/fish/mejina.webp',
  },
];

export function getFishBySlug(slug: string): Fish | undefined {
  return fishList.find(f => f.slug === slug);
}
