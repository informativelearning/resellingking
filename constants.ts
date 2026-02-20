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
    "/images/Azzaro The Most Wanted By azzaro.jpg",
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
};

const getImagePaths = (brand: string, name: string): string[] => {
  const key = `${brand.toLowerCase().trim()}|${name.toLowerCase().trim()}`;
  const images = IMAGE_MAP[key];
  if (!images) {
    console.warn(`No images mapped for: ${brand} - ${name}`);
    return ["/images/placeholder.jpg"];
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

  // FEAR OF GOD ESSENTIALS
  ["Fear of God Essentials", "Essentials SS22 Stretch Limo Hoodie",   ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials 1977 Hoodie - Iron",         ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Desert Taupe",      ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Eggshell",          ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Sycamore",          ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials SS22 Hoodie - Dark Oatmeal", ["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials SS22 Hoodie - Light Oatmeal",["S, M, L, XL"]],
  ["Fear of God Essentials", "Essentials Hoodie - Coral",             ["S, M, L, XL"]],
];

// ---------------------------------------------------------------------------
// TICKER CONTENT
// ---------------------------------------------------------------------------
export const DISCOUNTS = [
  "CURATED LUXURY COLLECTION",
  "FRAGRANCE • STREETWEAR • LUXURY",
  "AUTHENTICITY VERIFIED",
  "ANYTHING ANYWHERE",
];

// ---------------------------------------------------------------------------
// BUILD INVENTORY
// ---------------------------------------------------------------------------
const isApparel = (brand: string): boolean =>
  brand.toLowerCase().includes('essentials') || brand.toLowerCase().includes('fear of god');

export const INVENTORY: Product[] = rawData.map(([brand, name, volumes]) => {
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
    price:     category === 'Apparel' ? 60 : 70,
    category,
    image:     images[0],
    images,
    details:   DEFAULT_DETAILS(category),
  };
});