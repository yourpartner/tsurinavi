export interface GearCategory {
  slug: string;
  name: string;
  description: string;
  scene: string;
  items: GearItem[];
}

export interface GearItem {
  name: string;
  description: string;
  priceRange: string;
  amazonLink: string;
  rakutenLink: string;
  recommended: boolean;
}

export const gearCategories: GearCategory[] = [
  {
    slug: 'sabiki-set',
    name: 'サビキ釣りセット',
    description: 'アジ・イワシ・サバ狙いに最適な入門セット',
    scene: '堤防・港',
    items: [
      {
        name: 'サビキ竿セット（初心者向け）',
        description: '竿＋リール＋仕掛けのオールインワン。3〜4mの振り出し竿で堤防から手軽に始められます。',
        priceRange: '2,000〜5,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=サビキ釣りセット+竿+リール+初心者&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/サビキ釣りセット+初心者/',
        recommended: true,
      },
      {
        name: 'アミエビ（冷凍ブロック）',
        description: 'サビキ釣りのコマセ。コマセカゴに詰めて使います。釣具店や港近くの自販機でも購入可能。',
        priceRange: '500〜800円',
        amazonLink: 'https://www.amazon.co.jp/s?k=アミエビ+冷凍+サビキ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/アミエビ+サビキ/',
        recommended: true,
      },
      {
        name: 'サビキ仕掛け（5〜7号）',
        description: 'サバ皮・魚皮・ハゲ皮など種類が豊富。アジのサイズに合わせて号数を選びましょう。',
        priceRange: '200〜500円',
        amazonLink: 'https://www.amazon.co.jp/s?k=サビキ仕掛け+アジ+おすすめ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/サビキ仕掛けアジ/',
        recommended: false,
      },
      {
        name: 'クーラーボックス（小型）',
        description: '釣った魚を持ち帰るのに必須。10〜15Lで堤防釣りには十分です。氷と一緒に使いましょう。',
        priceRange: '3,000〜8,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=クーラーボックス+釣り+15L&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/クーラーボックス+釣り+15L/',
        recommended: true,
      },
    ],
  },
  {
    slug: 'lure-bass',
    name: 'シーバスルアーセット',
    description: 'シーバス（スズキ）を狙うルアーゲームの基本セット',
    scene: '河口・堤防・砂浜',
    items: [
      {
        name: 'シーバスロッド 9〜10ft',
        description: 'L〜MLパワーの9〜10ftロッドが汎用性高く使いやすい。ダイワ・シマノ・メジャークラフトが定番ブランド。',
        priceRange: '8,000〜30,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=シーバスロッド+9ft+おすすめ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/シーバスロッド+おすすめ/',
        recommended: true,
      },
      {
        name: 'スピニングリール 3000〜4000番',
        description: 'PEライン1号を150m以上巻けるスピニングリール。ダイワLT3000・シマノ4000番台が定番。',
        priceRange: '6,000〜20,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=スピニングリール+3000番+シーバス&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/スピニングリール+シーバス/',
        recommended: true,
      },
      {
        name: 'シーバス用ミノー（フローティング）',
        description: '12〜14cmのフローティングミノーがシーバスの基本ルアー。ナイトゲームではチャートカラーが有効。',
        priceRange: '1,200〜2,500円',
        amazonLink: 'https://www.amazon.co.jp/s?k=シーバスミノー+フローティング+おすすめ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/シーバスミノー+おすすめ/',
        recommended: true,
      },
      {
        name: 'バイブレーション（鉄板バイブ）',
        description: '遠投が効き、広範囲を素早く探るのに最適。秋の荒食いシーズンに特に有効なルアーです。',
        priceRange: '800〜1,500円',
        amazonLink: 'https://www.amazon.co.jp/s?k=鉄板バイブ+シーバス+おすすめ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/バイブレーション+シーバス/',
        recommended: false,
      },
    ],
  },
  {
    slug: 'eging-set',
    name: 'エギングセット',
    description: 'アオリイカをエギで狙う人気のルアーゲームセット',
    scene: '堤防・港・磯',
    items: [
      {
        name: 'エギングロッド 8〜8.6ft',
        description: 'エギング専用ロッド。ブランクの感度が高く、シャクリやすい設計。MLパワーが汎用性◎',
        priceRange: '8,000〜25,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=エギングロッド+おすすめ+8.6ft&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/エギングロッドおすすめ/',
        recommended: true,
      },
      {
        name: 'エギ 2.5〜3.5号セット',
        description: '秋の新子には2.5〜3号、春の親イカには3.5号が基本。カラーは下地が赤・金・マーブルを揃えると安心。',
        priceRange: '1,500〜3,000円（3本セット）',
        amazonLink: 'https://www.amazon.co.jp/s?k=エギ+アオリイカ+セット+おすすめ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/エギセット+アオリイカ/',
        recommended: true,
      },
      {
        name: 'PEライン 0.6〜0.8号',
        description: 'エギングの主流ラインはPE0.6〜0.8号。細いほど感度が上がりシャクリやすくなります。',
        priceRange: '1,500〜3,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=PEライン+0.8号+エギング&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/PEライン+エギング/',
        recommended: false,
      },
    ],
  },
  {
    slug: 'safety',
    name: '安全装備',
    description: '釣りの安全に欠かせない必須アイテム',
    scene: '全シーン',
    items: [
      {
        name: 'ライフジャケット（自動膨張式）',
        description: '堤防・磯釣りには必須の安全装備。桜マーク（国土交通省型式承認）付きのものを選びましょう。腰巻き式が動きやすくおすすめ。',
        priceRange: '5,000〜15,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=ライフジャケット+釣り+自動膨張+桜マーク&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/ライフジャケット+釣り+桜マーク/',
        recommended: true,
      },
      {
        name: '偏光サングラス',
        description: '水面のギラつきを抑えて魚の動きが見やすくなります。目の保護にもなるため釣りには必需品。',
        priceRange: '2,000〜15,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=偏光サングラス+釣り+おすすめ&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/偏光サングラス+釣り/',
        recommended: true,
      },
      {
        name: '帽子（UVカット）',
        description: '長時間の釣りでは日差し対策が重要。つば広のUVカット帽子で熱中症を防止しましょう。',
        priceRange: '2,000〜6,000円',
        amazonLink: 'https://www.amazon.co.jp/s?k=釣り帽子+UVカット&tag=YOURTAG-22',
        rakutenLink: 'https://search.rakuten.co.jp/search/mall/釣り帽子UVカット/',
        recommended: false,
      },
    ],
  },
];

export function getGearCategoryBySlug(slug: string): GearCategory | undefined {
  return gearCategories.find(g => g.slug === slug);
}
