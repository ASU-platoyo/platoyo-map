const base = import.meta.env.BASE_URL;

export const spots = [
  {
    id: 1,
    slug: "shimakumayama",
    name: "島熊山",
    lat: 34.807769,
    lng: 135.485006,
    category: "自然",
    image: `${base}spots/shimakumayama.jpg`,
    description: "住宅地の中にひっそり残る、自然豊かな里山。",
    links: [
      {
        type: "archive",
        label: "ぷらとよアーカイブを見る",
        url: "https://platto-toyonaka.com/2026/03/22/archive-shimakumayama/"
      },
      {
        type: "walk",
        label: "散歩記事を見る",
        url: "https://platto-toyonaka.com/2025/08/25/shimakumayama/",
        thumbnail: `${base}thumbnails/shimakumayama-tnl.jpg`
      }
    ],
    guide: {
      character: "とよな",
      image: `${base}characters/toyona.png`,
      comment: "ちょっとした冒険を楽しめる、ワクワクがあふれた場所や！"
    }
  },
  {
    id: 2,
    slug: "kitatani-no-ido",
    name: "北谷の井戸",
    lat: 34.801087,
    lng: 135.456479,
    category: "歴史",
    image: `${base}spots/kitatani-no-ido5.jpg`,
    description: "弘法大師にまつわる伝説が残された井戸。",
    links: [
      {
        type: "archive",
        label: "ぷらとよアーカイブを見る",
        url: ""
      },
      {
        type: "walk",
        label: "散歩記事を見る",
        url: "https://platto-toyonaka.com/2025/08/31/kitatani-no-ido/",
        thumbnail: `${base}thumbnails/kitatani-no-ido-tnl.jpg`
      }
    ],
    guide: {
      character: "ちさと",
      image: `${base}characters/chisato.png`,
      comment: "幹線道路沿いに突如として現われる不思議な空間です。"
    }
  },
  {
    id: 3,
    slug: "ninokiriike-koen",
    name: "二ノ切池公園",
    lat: 34.795308,
    lng: 135.490398,
    category: "公園",
    image: `${base}spots/ninokiri-ike-koen.jpg`,
    description: "東豊中に位置する市民憩いの場",
    links: [
      {
        type: "archive",
        label: "ぷらとよアーカイブを見る",
        url: ""
      },
      {
        type: "walk",
        label: "散歩記事を見る",
        url: "https://platto-toyonaka.com/2025/11/03/ninokiriike-koen/",
        thumbnail: `${base}thumbnails/ninokiriike-koen-tnl.jpg`
      }
    ],
    guide: {
      character: "とよな",
      image: `${base}characters/toyona.png`,
      comment: "野球場や温水プールもある、大きな公園や！"
    }
  },
  {
    id: 4,
    slug: "machikaneyama",
    name: "待兼山",
    lat: 34.807003,
    lng: 135.450445,
    category: "自然",
    image: `${base}spots/namikou-statue.jpg`,
    description: "「大阪大学豊中キャンパス」内に位置する、マチカネワニ発掘の地。",
    links: [
      {
        type: "archive",
        label: "ぷらとよアーカイブを見る",
        url: ""
      },
      {
        type: "walk",
        label: "散歩記事を見る",
        url: "https://platto-toyonaka.com/2025/08/12/machikaneyama/",
        thumbnail: `${base}thumbnails/machikaneyama-tnl.jpg`
      }
    ],
    guide: {
      character: "ちさと",
      image: `${base}characters/chisato.png`,
      comment: "豊中市のシンボルキャラクター「マチカネくん」は、この地で発掘された「マチカネワニ」の化石が由来となっています。"
    }
  },
  {
    id: 5,
    slug: "toyomu",
    name: "豊中市立 郷土資料館（とよみゅー）",
    lat: 34.743508,
    lng: 135.467739,
    category: "歴史",
    image: `${base}spots/toyonaka-museum.jpg`,
    description: "豊中市の歴史を学べる博物館。",
    links: [
      {
        type: "archive",
        label: "ぷらとよアーカイブを見る",
        url: ""
      },
      {
        type: "walk",
        label: "散歩記事を見る",
        url: "https://platto-toyonaka.com/2025/09/22/toyomu/",
        thumbnail: `${base}thumbnails/toyomu-tnl.jpg`
      }
    ],
    guide: {
      character: "ちさと",
      image: `${base}characters/chisato.png`,
      comment: "ここでは「豊中市」の古代から現代までの歴史を学ぶことができます。"
    }
  },
];