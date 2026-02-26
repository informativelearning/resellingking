import { Product, Category, ProductDetails } from './types';

const DEFAULT_DETAILS = (category: string): ProductDetails => {
  if (category === 'Apparel') {
    return {
      description: "Verified authentic Fear of God Essentials. New with tags.",
      material: "Cotton Blend",
      fit: "Relaxed Oversized",
      care: "Machine wash cold, tumble dry low"
    };
  }
  return {
    description: "Verified authentic fragrance. 2024/2025 Batch.",
    projection: "STRONG",
    sillage: "MODERATE",
    topNotes: [],
    heartNotes: [],
    baseNotes: []
  };
};

// ---------------------------------------------------------------------------
// IMAGE LOOKUP TABLE
// ---------------------------------------------------------------------------
const IMAGE_MAP: Record<string, string[]> = {
  // AZZARO
  "azzaro|the most wanted": [
    "/images/Azzaro The Most Wanted by Azzaro.jpg",
    "/images/Azzaro The Most Wanted by Azzaro1.jpg",
    "/images/Azzaro The Most Wanted by Azzaro2.jpg",
  ],
  "azzaro|wanted by night": [
    "/images/Azzaro Wanted by Night Azzaro.jpg",
    "/images/Azzaro Wanted by Night Azzaro1.jpg",
    "/images/Azzaro Wanted by Night Azzaro2.jpg",
  ],
  "azzaro|forever wanted elixir": [
    "/images/Forever Wanted Elixir Azzaro.jpg",
    "/images/Forever Wanted Elixir Azzaro1.jpg",
    "/images/Forever Wanted Elixir Azzaro3.jpeg",
  ],
  "azzaro|the most wanted parfum": [
    "/images/The Most Wanted Parfum Azzaro.jpg",
    "/images/The Most Wanted Parfum Azzaro1.jpg",
    "/images/The Most Wanted Parfum Azzaro2.jpeg",
  ],
  "azzaro|wanted eau de parfum": [
    "/images/Wanted Eau de Parfum Azzaro.jpg",
    "/images/Wanted Eau de Parfum Azzaro1.jpg",
    "/images/Wanted Eau de Parfum Azzaro2.jpg",
  ],

  // VALENTINO
  "valentino|uomo born in roma green stravaganza": [
    "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino.png",
    "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino1.png",
    "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino2.png",
    "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino3.png",
    "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino4.png",
  ],
  "valentino|born in roma extradose donna": [
    "/images/BorninRomaExtradoseDonnaValentino.png",
    "/images/BorninRomaExtradoseDonnaValentino1.png",
    "/images/BorninRomaExtradoseDonnaValentino2.jpeg",
    "/images/BorninRomaExtradoseDonnaValentino3.png",
    "/images/BorninRomaExtradoseDonnaValentino4.png",
  ],
  "valentino|donna born in roma": [
    "/images/ValentinoDonnaBornInRomaValentino.png",
    "/images/ValentinoDonnaBornInRomaValentino1.jpeg",
    "/images/ValentinoDonnaBornInRomaValentino2.jpeg",
  ],
  "valentino|donna born in roma green stravaganza": [
    "/images/Valentino Donna Born in Roma Green Stravaganza Valentino.jpeg",
    "/images/Valentino Donna Born in Roma Green Stravaganza Valentino1.png",
    "/images/Valentino Donna Born in Roma Green Stravaganza Valentino2.jpeg",
    "/images/Valentino Donna Born in Roma Green Stravaganza Valentino3.jpeg",
    "/images/Valentino Donna Born in Roma Green Stravaganza Valentino5.png",
  ],
  "valentino|donna born in roma intense": [
    "/images/Valentino Donna Born In Roma Intense Valentino.jpeg",
    "/images/Valentino Donna Born In Roma Intense Valentino1.jpeg",
    "/images/Valentino Donna Born In Roma Intense Valentino2.jpeg",
    "/images/Valentino Donna Born In Roma Intense Valentino3.jpeg",
    "/images/Valentino Donna Born In Roma Intense Valentino4.jpeg",
  ],
  "valentino|uomo born in roma intense": [
    "/images/Valentino Uomo Born In Roma Intense Valentino.jpeg",
    "/images/Valentino Uomo Born In Roma Intense Valentino1.jpeg",
    "/images/Valentino Uomo Born In Roma Intense Valentino2.jpeg",
    "/images/Valentino Uomo Born In Roma Intense Valentino3.jpeg",
    "/images/Valentino Uomo Born In Roma Intense Valentino4.png",
  ],
  "valentino|uomo born in roma coral fantasy": [
    "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino.jpeg",
    "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino1.png",
    "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino2.jpeg",
    "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino3.jpeg",
    "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino4.jpeg",
  ],
  "valentino|uomo born in roma": [
    "/images/Valentino Uomo Born in Roma Valentino.png",
    "/images/Valentino Uomo Born in Roma Valentino1.png",
    "/images/Valentino Uomo Born in Roma Valentino2.jpeg",
    "/images/Valentino Uomo Born in Roma Valentino3.jpeg",
    "/images/Valentino Uomo Born in Roma Valentino4.jpeg",
  ],

  // CREED
  "creed|absolu aventus": [
    "/images/Absolu Aventus Creed.jpeg",
    "/images/Absolu Aventus Creed1.png",
    "/images/Absolu Aventus Creed2.jpeg",
    "/images/Absolu Aventus Creed3.jpeg",
    "/images/Absolu Aventus Creed4.jpeg",
  ],
  "creed|aventus": [
    "/images/Aventus Creed.jpeg",
    "/images/Aventus Creed1.png",
    "/images/Aventus Creed2.jpeg",
    "/images/Aventus Creed3.jpeg",
  ],
  "creed|delphinus": [
    "/images/Delphinus Creed.jpeg",
    "/images/Delphinus Creed1.png",
    "/images/Delphinus Creed2.jpeg",
    "/images/Delphinus Creed3.jpeg",
  ],
  "creed|eladaria": [
    "/images/Eladaria Creed.jpeg",
    "/images/Eladaria Creed1.jpeg",
    "/images/Eladaria Creed2.jpeg",
    "/images/Eladaria Creed3.png",
    "/images/Eladaria Creed4.png",
  ],
  "creed|green irish tweed": [
    "/images/Green Irish Tweed Creed.jpeg",
    "/images/Green Irish Tweed Creed1.png",
    "/images/Green Irish Tweed Creed2.jpeg",
    "/images/Green Irish Tweed Creed3.jpeg",
    "/images/Green Irish Tweed Creed4.jpeg",
  ],

  // YVES SAINT LAURENT
  "yves saint laurent|black opium": [
    "/images/Black Opium Yves Saint Laurent.jpeg",
    "/images/Black Opium Yves Saint Laurent1.png",
    "/images/Black Opium Yves Saint Laurent2.jpeg",
    "/images/Black Opium Yves Saint Laurent3.jpeg",
  ],
  "yves saint laurent|mon paris": [
    "/images/Mon Paris Yves Saint Laurent.png",
    "/images/Mon Paris Yves Saint Laurent1.png",
    "/images/Mon Paris Yves Saint Laurent2.jpeg",
    "/images/Mon Paris Yves Saint Laurent3.jpeg",
  ],
  "yves saint laurent|myslf le parfum": [
    "/images/MYSLF Le Parfum Yves Saint Laurent.jpeg",
    "/images/MYSLF Le Parfum Yves Saint Laurent1.png",
    "/images/MYSLF Le Parfum Yves Saint Laurent2.jpeg",
    "/images/MYSLF Le Parfum Yves Saint Laurent3.jpeg",
    "/images/MYSLF Le Parfum Yves Saint Laurent4.jpeg",
  ],
  "yves saint laurent|myslf eau de parfum": [
    "/images/MYSLF Eau de Parfum Yves Saint Laurent.jpeg",
    "/images/MYSLF Eau de Parfum Yves Saint Laurent1.jpeg",
    "/images/MYSLF Eau de Parfum Yves Saint Laurent2.jpeg",
    "/images/MYSLF Eau de Parfum Yves Saint Laurent3.jpeg",
    "/images/MYSLF Eau de Parfum Yves Saint Laurent4.jpeg",
  ],
  "yves saint laurent|y eau de parfum intense": [
    "/images/Y Eau de Parfum Intense Yves Saint Laurent.png",
    "/images/Y Eau de Parfum Intense Yves Saint Laurent1.png",
    "/images/Y Eau de Parfum Intense Yves Saint Laurent2.png",
    "/images/Y Eau de Parfum Intense Yves Saint Laurent3.png",
  ],
  "yves saint laurent|y eau de parfum": [
    "/images/Y Eau de Parfum Yves Saint Laurent.png",
    "/images/Y Eau de Parfum Yves Saint Laurent1.png",
    "/images/Y Eau de Parfum Yves Saint Laurent2.jpeg",
    "/images/Y Eau de Parfum Yves Saint Laurent3.jpg",
    "/images/Y Eau de Parfum Yves Saint Laurent4.jpeg",
  ],

  // GIORGIO ARMANI
  "giorgio armani|acqua di giò profumo": [
    "/images/Acqua di Giò Profumo Giorgio Armani.png",
    "/images/Acqua di Giò Profumo Giorgio Armani2.png",
    "/images/Acqua di Giò Profumo Giorgio Armani3.png",
    "/images/Acqua di Giò Profumo Giorgio Armani4.png",
    "/images/Acqua di Giò Profumo Giorgio Armani5.png",
  ],
  "giorgio armani|emporio armani stronger with you absolutely": [
    "/images/Emporio Armani Stronger With You Absolutely Giorgio Armani.png",
    "/images/Emporio Armani Stronger With You Absolutely Giorgio Armani1.png",
    "/images/Emporio Armani Stronger With You Absolutely Giorgio Armani2.jpeg",
    "/images/Emporio Armani Stronger With You Absolutely Giorgio Armani3.jpeg",
    "/images/Emporio Armani Stronger With You Absolutely Giorgio Armani4.png",
  ],
  "giorgio armani|emporio armani stronger with you intensely": [
    "/images/Emporio Armani Stronger With You Intensely Giorgio Armani.png",
    "/images/Emporio Armani Stronger With You Intensely Giorgio Armani1.png",
    "/images/Emporio Armani Stronger With You Intensely Giorgio Armani2.png",
    "/images/Emporio Armani Stronger With You Intensely Giorgio Armani3.png",
    "/images/Emporio Armani Stronger With You Intensely Giorgio Armani4.png",
  ],
  "giorgio armani|my way": [
    "/images/My Way Giorgio Armani1.jpeg",
    "/images/My Way Giorgio Armani2.jpeg",
    "/images/My Way Giorgio Armani3.jpeg",
    "/images/My Way Giorgio Armani4.jpeg",
  ],

  // FEAR OF GOD ESSENTIALS
  "fear of god essentials|essentials ss22 stretch limo hoodie": [
    "/images/Essentials SS22 Stretch Limo Hoodie.jpeg",
    "/images/Essentials SS22 Stretch Limo Hoodie1.jpeg",
  ],
  "fear of god essentials|essentials 1977 hoodie - iron": [
    "/images/Fear of God Essentials \u201c1977\u201d Hoodie \u2013 Iron.jpeg",
    "/images/Fear of God Essentials \u201c1977\u201d Hoodie \u2013 Iron1.jpeg",
  ],
  "fear of god essentials|essentials hoodie - desert taupe": [
    "/images/Fear of God Essentials Hoodie – Desert Taupe.jpeg",
    "/images/Fear of God Essentials Hoodie – Desert Taupe1.jpeg",
  ],
  "fear of god essentials|essentials hoodie - eggshell": [
    "/images/Fear of God Essentials Hoodie – Eggshell.jpeg",
    "/images/Fear of God Essentials Hoodie – Eggshell1.jpeg",
  ],
  "fear of god essentials|essentials hoodie - sycamore": [
    "/images/Fear of God Essentials Hoodie – Sycamore.jpeg",
    "/images/Fear of God Essentials Hoodie – Sycamore1.jpeg",
  ],
  "fear of god essentials|essentials ss22 hoodie - dark oatmeal": [
    "/images/Fear of God Essentials SS22 Hoodie – Dark Oatmeal.jpg",
    "/images/Fear of God Essentials SS22 Hoodie – Dark Oatmeal.png",
  ],
  "fear of god essentials|essentials ss22 hoodie - light oatmeal": [
    "/images/Fear of God Essentials SS22 Hoodie – Light Oatmeal.jpeg",
    "/images/Fear of God Essentials SS22 Hoodie – Light Oatmeal1.jpeg",
  ],
  "fear of god essentials|essentials hoodie - coral": [
    "/images/Fear-of-God-Essentials-Hoodie-Coral.jpg",
    "/images/Fear-of-God-Essentials-Hoodie-Coral1.jpg",
  ],
  "fear of god essentials|essentials sweatpants - desert taupe": [
    "/images/Fear of God Essentials Essentials Sweatpant 'Desert Taupe'.jpeg",
    "/images/Fear of God Essentials Essentials Sweatpant 'Desert Taupe'1.jpeg",
  ],
  "fear of god essentials|essentials sweatpants - coral": [
    "/images/Fear of God Essentials Essentials Sweatpants - Coral.jpg",
    "/images/Fear of God Essentials Essentials Sweatpants - Coral1.jpg",
  ],
  "fear of god essentials|essentials sweatpants - dark oatmeal": [
    "/images/Fear of God Essentials Sweatpants 'Dark Oatmeal'.jpeg",
    "/images/Fear of God Essentials Sweatpants 'Dark Oatmeal'1.jpeg",
  ],
  "fear of god essentials|essentials sweatpants - light oatmeal": [
    "/images/Fear of God Essentials Sweatpants 'Light Oatmeal'.jpeg",
  ],
};

const getImagePaths = (brand: string, name: string): string[] => {
  const key = `${brand.toLowerCase().trim()}|${name.toLowerCase().trim()}`;
  const images = IMAGE_MAP[key];
  if (!images) {
    console.warn(`No images mapped for: ${brand} - ${name}`);
    return [];
  }
  return images;
};

// ---------------------------------------------------------------------------
// RAW INVENTORY DATA
// ---------------------------------------------------------------------------
const rawData: [string, string, string[]][] = [
  // AZZARO
  ["Azzaro", "The Most Wanted",        ["100ml"]],
  ["Azzaro", "The Most Wanted Parfum", ["100ml"]],
  ["Azzaro", "Wanted by Night",        ["100ml"]],
  ["Azzaro", "Wanted Eau de Parfum",   ["100ml"]],
  ["Azzaro", "Forever Wanted Elixir",  ["100ml"]],

  // VALENTINO
  ["Valentino", "Uomo Born in Roma Green Stravaganza", ["100ml"]],
  ["Valentino", "Born in Roma Extradose Donna",        ["100ml"]],
  ["Valentino", "Donna Born in Roma",                  ["100ml"]],
  ["Valentino", "Donna Born in Roma Green Stravaganza",["100ml"]],
  ["Valentino", "Uomo Born in Roma Intense",           ["100ml"]],
  ["Valentino", "Uomo Born in Roma Coral Fantasy",     ["100ml"]],
  ["Valentino", "Uomo Born in Roma",                   ["100ml"]],
  ["Valentino", "Donna Born in Roma Intense",          ["100ml"]],

  // CREED
  ["Creed", "Aventus",          ["100ml"]],
  ["Creed", "Absolu Aventus",   ["100ml"]],
  ["Creed", "Delphinus",        ["100ml"]],
  ["Creed", "Eladaria",         ["75ml"]],
  ["Creed", "Green Irish Tweed",["100ml"]],

  // YVES SAINT LAURENT
  ["Yves Saint Laurent", "Black Opium",            ["90ml"]],
  ["Yves Saint Laurent", "Mon Paris",              ["90ml"]],
  ["Yves Saint Laurent", "MYSLF Eau de Parfum",    ["100ml"]],
  ["Yves Saint Laurent", "MYSLF Le Parfum",        ["100ml"]],
  ["Yves Saint Laurent", "Y Eau de Parfum",        ["100ml"]],
  ["Yves Saint Laurent", "Y Eau de Parfum Intense",["100ml"]],

  // GIORGIO ARMANI
  ["Giorgio Armani", "Acqua di Giò Profumo",                       ["125ml"]],
  ["Giorgio Armani", "Emporio Armani Stronger With You Absolutely", ["100ml"]],
  ["Giorgio Armani", "Emporio Armani Stronger With You Intensely",  ["100ml"]],
  ["Giorgio Armani", "My Way",                                      ["90ml"]],

  // VERSACE
  ["Versace", "Eros Eau de Parfum",                    ["100ml"]],
  ["Versace", "Eros Eau de Toilette",                  ["100ml"]],
  ["Versace", "Eros Parfum",                           ["100ml"]],
  ["Versace", "Eros Flame Eau de Parfum",              ["100ml"]],
  ["Versace", "Eros Energy Pour Homme Eau de Parfum",  ["100ml"]],
  ["Versace", "Man Eau Fraîche Eau de Toilette",       ["100ml"]],
  ["Versace", "Eau Fraîche Extreme Pour Homme",        ["100ml"]],
  ["Versace", "Pour Femme Dylan Blue Parfum",          ["100ml"]],
  ["Versace", "Dylan Blush Pink Pour Femme",           ["100ml"]],
  ["Versace", "Crystal Emerald Pour Femme",            ["90ml"]],

  // FEAR OF GOD ESSENTIALS
  ["Fear of God Essentials", "Essentials SS22 Stretch Limo Hoodie",   ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials 1977 Hoodie - Iron",         ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Desert Taupe",      ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Eggshell",          ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Sycamore",          ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials SS22 Hoodie - Dark Oatmeal", ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials SS22 Hoodie - Light Oatmeal",["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Coral",             ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Sweatpants - Desert Taupe", ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Sweatpants - Coral",        ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Sweatpants - Dark Oatmeal", ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Sweatpants - Light Oatmeal",["S, M, L, XL"]],
];

// ---------------------------------------------------------------------------
// TICKER CONTENT
// ---------------------------------------------------------------------------
export const DISCOUNTS = [
  "FRAGRANCE • STREETWEAR • LUXURY",
  "ESSENTIAL HOODIES $35 LIMITED ASF",
  "AUTHENTIC",
  "QUALITY SAYS EVERYTHING",
  "ANYTHING ANYWHERE",
  "DM IF WHAT YOU WANT ISN'T HERE",
];

// ---------------------------------------------------------------------------
// BUILD INVENTORY
// ---------------------------------------------------------------------------
const isApparel = (brand: string): boolean =>
  brand.toLowerCase().includes('essentials') || brand.toLowerCase().includes('fear of god');


// ---------------------------------------------------------------------------
// SNEAKERS (Cleaned up Brand Names)
// ---------------------------------------------------------------------------
const SNEAKERS: Product[] =[
  {
    ids: ['DD0587-002-ogsp'], brand: 'Jordan', name: 'Air Jordan 4 Retro OG SP',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Air Jordan 4 Retro OG SP.jpeg',
    images:['/images/Air Jordan 4 Retro OG SP.jpeg', '/images/Air Jordan 4 Retro OG SP1.jpeg', '/images/Air Jordan 4 Retro OG SP2.jpeg', '/images/Air Jordan 4 Retro OG SP3.jpeg', '/images/Air Jordan 4 Retro OG SP4.jpeg', '/images/Air Jordan 4 Retro OG SP5.jpeg'],
    details: { description: 'Air Jordan 4 Retro OG SP. New, verified authentic.' },
  },
  {
    ids: ['DD0587-002'], brand: 'Jordan', name: 'Air Jordan 5 Retro Wolf Grey (2026)',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Jordan 5 Retro 'Wolf Grey' 2026.jpeg",
    images:["/images/Jordan 5 Retro 'Wolf Grey' 2026.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20261.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20262.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20263.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20264.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20265.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20266.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20267.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 20268.png", "/images/Jordan 5 Retro 'Wolf Grey' 20269.jpeg", "/images/Jordan 5 Retro 'Wolf Grey' 202610.jpeg"],
    details: { description: 'Air Jordan 5 Retro Wolf Grey 2026. New, verified authentic.' },
  },
  {
    ids: ['CT8012-005'], brand: 'Jordan', name: 'Air Jordan 11 Retro Cool Grey (2021)',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Air Jordan 11 Cool Grey (2021).jpeg',
    images:['/images/Air Jordan 11 Cool Grey (2021).jpeg', '/images/Air Jordan 11 Cool Grey (2021)1.jpeg', '/images/Air Jordan 11 Cool Grey (2021)2.jpeg', '/images/Air Jordan 11 Cool Grey (2021)3.jpeg', '/images/Air Jordan 11 Cool Grey (2021)4.jpeg', '/images/Air Jordan 11 Cool Grey (2021)5.jpeg', '/images/Air Jordan 11 Cool Grey (2021)6.jpeg', '/images/Air Jordan 11 Cool Grey (2021)7.jpeg', '/images/Air Jordan 11 Cool Grey (2021)8.jpeg'],
    details: { description: 'Air Jordan 11 Retro Cool Grey 2021. New, verified authentic.' },
  },
  {
    ids: ['HQ7978-101'], brand: 'Jordan', name: 'Air Jordan 5 OG Black Tongue Fire Red',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Air Jordan 5 Fire Red 'Black Tongue'.png",
    images:["/images/Air Jordan 5 Fire Red 'Black Tongue'.png", "/images/Air Jordan 5 Fire Red 'Black Tongue'1.png", "/images/Air Jordan 5 Fire Red 'Black Tongue'2.png", "/images/Air Jordan 5 Fire Red 'Black Tongue'3.png", "/images/Air Jordan 5 Fire Red 'Black Tongue'4.png", "/images/Air Jordan 5 Fire Red 'Black Tongue'5.png"],
    details: { description: 'Air Jordan 5 OG Black Tongue Fire Red. New, verified authentic.' },
  },
  {
    ids: ['FV5029-200'], brand: 'Jordan', name: 'Air Jordan 4 Retro Cave Stone',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/AIR JORDAN 4 RETRO CAVE STONE AND BLACK.jpg',
    images:['/images/AIR JORDAN 4 RETRO CAVE STONE AND BLACK.jpg', '/images/AIR JORDAN 4 RETRO CAVE STONE AND BLACK1.jpg', '/images/AIR JORDAN 4 RETRO CAVE STONE AND BLACK2.jpg', '/images/AIR JORDAN 4 RETRO CAVE STONE AND BLACK3.jpg', '/images/AIR JORDAN 4 RETRO CAVE STONE AND BLACK4.jpg'],
    details: { description: 'Air Jordan 4 Retro Cave Stone. New, verified authentic.' },
  },
  {
    ids: ['DR5415-100'], brand: 'Jordan', name: 'Nike SB x Air Jordan 4 Navy',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Nike SB x Air Jordan 4 Navy.png',
    images:['/images/Nike SB x Air Jordan 4 Navy.png', '/images/Nike SB x Air Jordan 4 Navy2.png', '/images/Nike SB x Air Jordan 4 Navy3.png', '/images/Nike SB x Air Jordan 4 Navy4.png', '/images/Nike SB x Air Jordan 4 Navy5.png', '/images/Nike SB x Air Jordan 4 Navy6.png', '/images/Nike SB x Air Jordan 4 Navy7.png'],
    details: { description: 'Nike SB x Air Jordan 4 Navy. New, verified authentic.' },
  },
  {
    ids: ['CT8532-001'], brand: 'Jordan', name: 'Air Jordan 3 Retro Black Cat (2025)',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 3 Retro Black Cat (2025).jpeg',
    images:['/images/Jordan 3 Retro Black Cat (2025).jpeg', '/images/Jordan 3 Retro Black Cat (2025)1.jpeg', '/images/Jordan 3 Retro Black Cat (2025)2.jpeg', '/images/Jordan 3 Retro Black Cat (2025)3.jpeg', '/images/Jordan 3 Retro Black Cat (2025)4.jpeg', '/images/Jordan 3 Retro Black Cat (2025)5.jpeg', '/images/Jordan 3 Retro Black Cat (2025)6.jpeg', '/images/Jordan 3 Retro Black Cat (2025)7.jpeg', '/images/Jordan 3 Retro Black Cat (2025)8.jpeg'],
    details: { description: 'Air Jordan 3 Retro Black Cat 2025. New, verified authentic.' },
  },
  {
    ids:['FV5029-010'], brand: 'Jordan', name: 'Air Jordan 4 Retro Black Cat',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Air Jordan 4 Retro 'Black Cat' 2025.jpeg",
    images:["/images/Air Jordan 4 Retro 'Black Cat' 2025.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20251.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20252.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20253.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20254.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20255.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20256.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20257.jpeg", "/images/Air Jordan 4 Retro 'Black Cat' 20258.jpeg"],
    details: { description: 'Air Jordan 4 Retro Black Cat. New, verified authentic.' },
  },
  {
    ids:['378037-005'], brand: 'Jordan', name: 'Air Jordan 11 Retro Cap and Gown',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 11 RetroCap and Gown.jpeg',
    images:['/images/Jordan 11 RetroCap and Gown.jpeg', '/images/Jordan 11 RetroCap and Gown2.jpeg', '/images/Jordan 11 RetroCap and Gown3.jpeg', '/images/Jordan 11 RetroCap and Gown4.jpeg', '/images/Jordan 11 RetroCap and Gown5.jpeg', '/images/Jordan 11 RetroCap and Gown6.jpeg', '/images/Jordan 11 RetroCap and Gown7.jpeg', '/images/Jordan 11 RetroCap and Gown8.jpeg'],
    details: { description: 'Air Jordan 11 Retro Cap and Gown. New, verified authentic.' },
  },
  {
    ids: ['CT8012-047'], brand: 'Jordan', name: 'Air Jordan 11 Retro Gamma Blue (2025)',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Air Jordan 11 'Gamma'.png",
    images:["/images/Air Jordan 11 'Gamma'.png", "/images/Air Jordan 11 'Gamma'2.png", "/images/Air Jordan 11 'Gamma'3.png", "/images/Air Jordan 11 'Gamma'4.png", "/images/Air Jordan 11 'Gamma'5.png"],
    details: { description: 'Air Jordan 11 Retro Gamma Blue 2025. New, verified authentic.' },
  },
  {
    ids:['DR5415-103'], brand: 'Jordan', name: 'Nike SB x Air Jordan 4 Pine Green',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Nike SB x Air Jordan 4 Retro SP Pine Green .jpeg',
    images:['/images/Nike SB x Air Jordan 4 Retro SP Pine Green .jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 1.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 2.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 4.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 5.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 6.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 7.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 8.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 9.jpeg', '/images/Nike SB x Air Jordan 4 Retro SP Pine Green 10.jpeg'],
    details: { description: 'Nike SB x Air Jordan 4 Pine Green. New, verified authentic.' },
  },
  {
    ids:['IH0296-400'], brand: 'Jordan', name: 'Air Jordan 11 Retro Rare Air',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 11 RetroRare Air.png',
    images:['/images/Jordan 11 RetroRare Air.png', '/images/Jordan 11 RetroRare Air1.png', '/images/Jordan 11 RetroRare Air2.png', '/images/Jordan 11 RetroRare Air3.png', '/images/Jordan 11 RetroRare Air4.png', '/images/Jordan 11 RetroRare Air5.png'],
    details: { description: 'Air Jordan 11 Retro Rare Air. New, verified authentic.' },
  },
  {
    ids: ['HQ7978-100'], brand: 'Jordan', name: 'Air Jordan 5 OG Grape',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 5 Retro Grape (2025).jpeg',
    images:['/images/Jordan 5 Retro Grape (2025).jpeg', '/images/Jordan 5 Retro Grape (2025)1.jpeg', '/images/Jordan 5 Retro Grape (2025)3.jpeg', '/images/Jordan 5 Retro Grape (2025)4.jpeg', '/images/Jordan 5 Retro Grape (2025)5.jpeg', '/images/Jordan 5 Retro Grape (2025)6.jpeg'],
    details: { description: 'Air Jordan 5 OG Grape 2025. New, verified authentic.' },
  },
  {
    ids: ['HF4340-800'], brand: 'Jordan', name: 'Nigel Sylvester x Air Jordan 4 Brick by Brick',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick.jpeg',
    images:['/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick1.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick2.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick3.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick4.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick5.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick6.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick7.jpeg', '/images/Air Jordan 4 Retro OG SP Nigel Sylvester Brick by Brick8.jpeg'],
    details: { description: 'Nigel Sylvester x Air Jordan 4 Brick by Brick Firewood Orange. New, verified authentic.' },
  },
  {
    ids:['HF3975-001'], brand: 'Jordan', name: 'Air Jordan 5 OG Black Metallic Reimagined',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 5 Retro OG Black Metallic Reimagined.jpeg',
    images:['/images/Jordan 5 Retro OG Black Metallic Reimagined.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined1.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined2.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined3.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined4.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined5.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined6.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined7.jpeg', '/images/Jordan 5 Retro OG Black Metallic Reimagined8.jpeg'],
    details: { description: 'Air Jordan 5 OG Black Metallic Reimagined. New, verified authentic.' },
  },
  {
    ids: ['IB1519-200'], brand: 'Jordan', name: 'Undefeated x Air Jordan 4 Retro Deep Green',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Undefeated x Air Jordan 4 Retro 2025.jpeg',
    images:['/images/Undefeated x Air Jordan 4 Retro 2025.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20251.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20252.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20253.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20254.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20255.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20256.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20257.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20258.jpeg', '/images/Undefeated x Air Jordan 4 Retro 20259.jpeg'],
    details: { description: 'Undefeated x Air Jordan 4 Retro 2025 Deep Green. New, verified authentic.' },
  },
  {
    ids:['DM7866-104'], brand: 'Jordan', name: 'Travis Scott x Air Jordan 1 Low OG Reverse Mocha',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'.jpeg",
    images:["/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'1.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'2.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'3.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'4.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'5.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'6.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'7.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'8.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG 'Reverse Mocha'9.jpeg"],
    details: { description: 'Travis Scott x Air Jordan 1 Low OG Reverse Mocha. New, verified authentic.' },
  },
  {
    ids:['DZ4137-106'], brand: 'Jordan', name: 'Travis Scott x Air Jordan 1 Low OG Olive',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'.jpeg",
    images:["/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'1.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'2.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'3.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'4.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'5.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'6.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'7.jpeg", "/images/Travis Scott x Wmns Air Jordan 1 Retro Low OG SP 'Olive'8.jpeg"],
    details: { description: 'Travis Scott x Air Jordan 1 Low OG Olive. New, verified authentic.' },
  },
  {
    ids: ['DM7866-140'], brand: 'Jordan', name: 'Fragment x Travis Scott x Air Jordan 1 Low',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low.jpeg',
    images:['/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low.jpeg', '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low1.jpeg', '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low2.jpeg', '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low3.jpeg', '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low4.jpeg', '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low5.jpeg', '/images/Fragment Design x Travis Scott x Air Jordan 1 Retro Low6.jpeg'],
    details: { description: 'Fragment Design x Travis Scott x Air Jordan 1 Retro Low. New, verified authentic.' },
  },
  {
    ids:['DM7866-202'], brand: 'Jordan', name: 'Travis Scott x Air Jordan 1 Low OG Velvet Brown',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'.jpeg",
    images:["/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'1.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'2.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'3.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'4.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'5.jpeg", "/images/Travis Scott x Air Jordan 1 Retro Low OG SP 'Velvet Brown'6.jpeg"],
    details: { description: 'Travis Scott x Air Jordan 1 Low OG Velvet Brown. New, verified authentic.' },
  },
  {
    ids: ['DM7866-200'], brand: 'Jordan', name: 'Travis Scott x Air Jordan 1 Low OG Medium Olive',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive.jpeg',
    images:['/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive1.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive2.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive3.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive4.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Medium Olive5.jpeg'],
    details: { description: 'Travis Scott x Air Jordan 1 Low OG Medium Olive. New, verified authentic.' },
  },
  {
    ids:['CQ4277-001'], brand: 'Jordan', name: 'Travis Scott x Air Jordan 1 Low OG Mocha',
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha.jpeg',
    images:['/images/Jordan 1 Retro Low OG SP Travis Scott Mocha.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha1.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha2.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha3.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha4.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha5.jpeg', '/images/Jordan 1 Retro Low OG SP Travis Scott Mocha6.jpeg'],
    details: { description: 'Travis Scott x Air Jordan 1 Low OG Mocha. New, verified authentic.' },
  },
  {
    ids:['CD4487-100'], brand: 'Jordan', name: "Travis Scott x Air Jordan 1 High OG Mocha",
    price: 180, spec: 'Various Sizes', category: 'Sneakers' as Category, condition: 'New', stock: 10,
    image: "/images/Travis Scott x Air Jordan 1 Retro High OG 'Mocha'.jpeg",
    images:["/images/Travis Scott x Air Jordan 1 Retro High OG 'Mocha'.jpeg", "/images/Travis Scott x Air Jordan 1 Retro High OG 'Mocha'1.jpeg", "/images/Travis Scott x Air Jordan 1 Retro High OG 'Mocha'2.jpeg", "/images/Travis Scott x Air Jordan 1 Retro High OG 'Mocha'3.jpeg", "/images/Travis Scott x Air Jordan 1 Retro High OG 'Mocha'5.jpeg"],
    details: { description: "Travis Scott x Air Jordan 1 Retro High OG Mocha. New, verified authentic." },
  },
];

export const INVENTORY: Product[] = [...rawData.map(([brand, name, volumes]) => {
  const normalizedBrand = brand.trim();
  const normalizedName  = name.trim();
  const spec            = volumes.length > 1 ? `${volumes.join(', ')} options` : volumes[0];
  const category: Category = isApparel(normalizedBrand) ? 'Apparel' : 'Fragrance';
  const images          = getImagePaths(normalizedBrand, normalizedName);

  return {
    ids:       [`${normalizedBrand}|${normalizedName}`.toLowerCase()],
    brand:     normalizedBrand,
    name:      normalizedName,
    spec,
    condition: category === 'Apparel' ? 'New with Tags' : 'Sealed',
    stock:     Math.floor(Math.random() * 15) + 3,
    price:     category === 'Apparel' ? 35 : 70,
    category,
    image:     images[0] ?? '',
    images,
    details:   DEFAULT_DETAILS(category),
  };
}), ...SNEAKERS];
