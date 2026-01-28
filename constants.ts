import { Product, Category, ProductDetails } from './types';

const IMAGES = {
  DARK: "https://images.unsplash.com/photo-1523293188086-b469b979756c?auto=format&fit=crop&w=800&q=80",
  GOLD: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
  MONO: "https://images.unsplash.com/photo-1509631179647-b84917759c1e?auto=format&fit=crop&w=800&q=80",
  RED: "https://images.unsplash.com/photo-1592914610354-b220e57b441f?auto=format&fit=crop&w=800&q=80",
  CLEAN: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
  BLUE: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
  WOOD: "https://images.unsplash.com/photo-1594035910387-fea477942653?auto=format&fit=crop&w=800&q=80",
  GREEN: "https://images.unsplash.com/photo-1544467316-e97029d2bf88?auto=format&fit=crop&w=800&q=80",
  PURPLE: "https://images.unsplash.com/photo-1557170334-a7c3c4e7f9f4?auto=format&fit=crop&w=800&q=80",
  SKIN: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
  VALENTINO: "https://images.unsplash.com/photo-1594035910387-fea477942653?auto=format&fit=crop&w=800&q=80",
  TOMFORD: "https://images.unsplash.com/photo-1523293188086-b469b979756c?auto=format&fit=crop&w=800&q=80"
};

const FRAGRANCE_DB: Record<string, Partial<ProductDetails>> = {
  // --- CHANEL ---
  "Bleu de Chanel Eau de Toilette": {
    topNotes: ["Grapefruit", "Lemon", "Mint", "Pink Pepper"],
    heartNotes: ["Ginger", "Nutmeg", "Jasmine", "Iso E Super"],
    baseNotes: ["Incense", "Vetiver", "Cedar", "Sandalwood", "Patchouli"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "The original aromatic-woody scent. Sharp citrus meets dry cedar and incense."
  },
  "Bleu de Chanel Eau de Parfum": {
    topNotes: ["Grapefruit", "Lemon", "Bergamot", "Mint", "Pink Pepper"],
    heartNotes: ["Melon", "Jasmine", "Ginger", "Nutmeg"],
    baseNotes: ["Amber", "Incense", "Cedar", "Sandalwood", "Amberwood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A warmer, more sensual interpretation. Amber and musk round out the aromatic core."
  },
  "Bleu de Chanel Parfum": {
    topNotes: ["Lemon Zest", "Bergamot", "Mint", "Artemisia"],
    heartNotes: ["Lavender", "Pineapple", "Geranium", "Green Notes"],
    baseNotes: ["Sandalwood", "Cedar", "Amberwood", "Iso E Super", "Tonka Bean"],
    projection: "MODERATE",
    sillage: "HEAVY",
    description: "The most intense concentration. Dense, creamy sandalwood defines this majestic signature."
  },
  "Coco Mademoiselle": {
    topNotes: ["Orange", "Mandarin Orange", "Bergamot"],
    heartNotes: ["Turkish Rose", "Jasmine", "Mimosa", "Ylang-Ylang"],
    baseNotes: ["Patchouli", "White Musk", "Vanilla", "Vetiver", "Tonka Bean"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "The essence of a free and bold woman. Fresh oriental with a distinct patchouli character."
  },
  "Coco Mademoiselle Intense": {
    topNotes: ["Sicilian Orange", "Calabrian Bergamot"],
    heartNotes: ["Rose", "Jasmine"],
    baseNotes: ["Patchouli", "Tonka Bean", "Madagascar Vanilla"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A deeper, more narcotic version. Heavily amplified patchouli and vanilla amber."
  },
  "Coco Noir": {
    topNotes: ["Grapefruit", "Calabrian Bergamot"],
    heartNotes: ["Rose", "Narcissus", "Geranium", "Peach"],
    baseNotes: ["Patchouli", "Sandalwood", "Vanilla", "White Musk", "Frankincense"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A magnetic luminous oriental. Explores the intensity of black through a modern lens."
  },
  "Allure Homme Sport Eau Extreme": {
    topNotes: ["Mandarin Orange", "Mint", "Cypress", "Sage"],
    heartNotes: ["Pepper"],
    baseNotes: ["Tonka Bean", "Musk", "Sandalwood", "Cedar"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "Musky, aromatic, and intense. A rush of adrenaline with a powerful mint and tonka opening."
  },

  // --- ARMANI ---
  "Acqua di Gio Profondo": {
    topNotes: ["Sea Notes", "Aquozone", "Bergamot", "Mandarin"],
    heartNotes: ["Rosemary", "Lavender", "Cypress", "Mastic"],
    baseNotes: ["Mineral Notes", "Musk", "Patchouli", "Amber"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A deep dive into the intensity of the sea. Marine notes meet aromatic essences."
  },
  "Armani Code Parfum": {
    topNotes: ["Bergamot", "Bergamot Leaf"],
    heartNotes: ["Iris", "Orris", "Clary Sage", "Aldehydes"],
    baseNotes: ["Tonka Bean", "Cedar"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Rewriting the code of masculinity. A strong yet sensitive woody aromatic signature."
  },

  // --- VERSACE ---
  "Eros Parfum": {
    topNotes: ["Mint", "Green Apple", "Lemon"],
    heartNotes: ["Tonka Bean", "Ambroxan", "Geranium"],
    baseNotes: ["Madagascar Vanilla", "Cedar", "Oakmoss", "Vetiver"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "A fragrance that interprets sublime masculinity through a luminous aura."
  },
  "Dylan Blue": {
    topNotes: ["Calabrian Bergamot", "Grapefruit", "Water Notes"],
    heartNotes: ["Ambrosia", "Patchouli", "Black Pepper", "Papyrus", "Violet Leaf"],
    baseNotes: ["Incense", "Musk", "Tonka Bean", "Saffron"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Highly distinctive with a fragrant woody aroma based on the unique olfactory properties of precious natural ingredients."
  },

  // --- PRADA ---
  "Prada Paradoxe": {
    topNotes: ["Pear", "Tangerine", "Bergamot"],
    heartNotes: ["Orange Blossom", "Jasmine Sambac", "Neroli Essence"],
    baseNotes: ["White Musk", "Bourbon Vanilla", "Amber", "Benzoin"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The essence of Prada, reimagined. Floral and feminine with a deep, musky amber base."
  },
  "Prada L'Homme": {
    topNotes: ["Neroli", "Black Pepper", "Cardamom", "Carrot Seeds"],
    heartNotes: ["Iris", "Violet", "Geranium", "Mate"],
    baseNotes: ["Sandalwood", "Cedar", "Patchouli", "Amber"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "The ultimate clean scent. Airy iris and neroli create a luxurious soap-like elegance."
  },

  // --- GUCCI ---
  "Gucci Flora Gorgeous Gardenia": {
    topNotes: ["Pear Blossom", "Red Berries", "Italian Mandarin"],
    heartNotes: ["Gardenia", "Jasmine", "Frangipani"],
    baseNotes: ["Brown Sugar", "Patchouli"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A joyful floral signature. Built around the Gardenia flower, blended with Solar Jasmine absolute."
  },
  "Gucci Guilty Pour Homme Elixir": {
    topNotes: ["Pimento", "Nutmeg"],
    heartNotes: ["Orange Blossom", "Orris", "Osmanthus"],
    baseNotes: ["Ambrofix", "Benzoin", "Vanilla", "Patchouli"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "A powerful invitation to love and self-acceptance. Highly concentrated and magnetic."
  },

  // --- CREED ---
  "Aventus": {
    topNotes: ["Bergamot", "Black Currant", "Apple", "Lemon", "Pink Pepper"],
    heartNotes: ["Pineapple", "Patchouli", "Moroccan Jasmine"],
    baseNotes: ["Birch", "Musk", "Oak Moss", "Ambroxan", "Cedarwood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The absolute benchmark of niche perfumery. Sophisticated, bold, and legendary."
  },

  // --- DIOR ---
  "Sauvage Elixir": {
    topNotes: ["Cinnamon", "Nutmeg", "Cardamom", "Grapefruit"],
    heartNotes: ["Lavender"],
    baseNotes: ["Licorice", "Sandalwood", "Amber", "Patchouli"],
    projection: "NUCLEAR",
    sillage: "ETERNAL",
    description: "An extraordinary concentration. A dense liqueur of spices and rich woods."
  },

  // --- MFK ---
  "Baccarat Rouge 540 Extrait": {
    topNotes: ["Bitter Almond", "Saffron"],
    heartNotes: ["Egyptian Jasmine", "Cedar"],
    baseNotes: ["Ambergris", "Woody Notes", "Musk"],
    projection: "BEAST MODE",
    sillage: "ENORMOUS",
    description: "The ultimate intensity. Rich bitter almond and musk add density to the signature 540 aura."
  }
};

const DEFAULT_DETAILS = (brand: string, name: string): ProductDetails => {
  const n = name.toLowerCase();
  let match: Partial<ProductDetails> | undefined;
  const sortedKeys = Object.keys(FRAGRANCE_DB).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (n.includes(key.toLowerCase()) || key.toLowerCase().includes(n)) {
      match = FRAGRANCE_DB[key];
      break;
    }
  }
  const fallback: ProductDetails = {
    description: `High-performance ${brand} formulation. Verified batch with maximum concentration. Street-tested projection designed for high-impact presence.`,
    projection: "STRONG",
    sillage: "HEAVY",
    topNotes: ["Bergamot", "Pink Pepper", "Citrus"],
    heartNotes: ["Jasmine", "Rose", "Geranium"],
    baseNotes: ["Sandalwood", "Amber", "Musk"]
  };
  return match ? { ...fallback, ...match } as ProductDetails : fallback;
};

const rawData = [
  // Chanel
  ["123-FENVAP100", "Chanel", "Coco Mademoiselle", "100ml"],
  ["071-FUCOIN", "Chanel", "Coco Mademoiselle Intense", "100ml"],
  ["097-HEICOVAP", "Chanel", "Coco Noir", "100ml"],
  ["660-EXTR", "Chanel", "Allure Homme Sport Eau Extreme", "100ml"],
  ["624-LEBLU", "Chanel", "Bleu de Chanel Parfum", "100ml"],
  
  // Armani
  ["AR-PRO-100", "Armani", "Acqua di Gio Profondo", "100ml"],
  ["AR-CODE-P", "Armani", "Armani Code Parfum", "100ml"],

  // Versace
  ["VE-EROS-P", "Versace", "Eros Parfum", "100ml"],
  ["VE-DYLAN-B", "Versace", "Dylan Blue", "100ml"],

  // Prada
  ["PR-PARA-90", "Prada", "Paradoxe", "90ml"],
  ["PR-HOMME-100", "Prada", "L'Homme", "100ml"],

  // Gucci
  ["GU-FLORA-100", "Gucci", "Flora Gorgeous Gardenia", "100ml"],
  ["GU-GUILTY-E", "Gucci", "Guilty Pour Homme Elixir", "60ml"],

  // Creed
  ["CR-AVE-100", "Creed", "Aventus", "100ml"],

  // Valentino
  ["269-PTDONNA", "Valentino", "Donna Born In Roma", "100ml"],
  ["614-VAEXPT", "Valentino", "Uomo Born In Roma", "100ml"],
  ["559-PTVAST", "Valentino", "Green Stravaganza", "100ml"],

  // YSL
  ["107-MYSLF", "YSL", "MYSLF", "100ml"],
  ["198-LIBLEP", "YSL", "Libre Le Parfum", "90ml"],
  ["191-YLELI", "YSL", "Y Men Le Parfum", "100ml"],

  // Dior
  ["029-SAELG", "Dior", "Sauvage Elixir", "60ml"],

  // MFK
  ["186-XINDA540", "MFK", "Baccarat Rouge 540 Extrait", "70ml"],

  // JPG
  ["242-JINTONG", "JPG", "Le Male Elixir", "125ml"],
  ["338-LEBEA", "JPG", "Le Beau Paradise Garden", "125ml"],

  // Tom Ford
  ["546-PTTFPE", "Tom Ford", "Bitter Peach", "50ml"],
  ["316-VANTFPT", "Tom Ford", "Tobacco Vanille", "100ml"],
  ["486-PTLOST", "Tom Ford", "Lost Cherry", "50ml"],

  // Louis Vuitton
  ["580-IMALV", "Louis Vuitton", "Imagination", "100ml"],
  ["632-OMBR", "Louis Vuitton", "Ombre Nomade", "100ml"]
];

export const DISCOUNTS = [
  "2+ ITEMS = 10% OFF",
  "3+ ITEMS = 15% OFF",
  "NEW DROPS WEEKLY",
  "VERIFIED AUTHENTIC",
  "LOS ANGELES LOCAL PICKUP"
];

const grouped = new Map<string, Product>();

rawData.forEach(([sku, brand, name, spec]) => {
  const key = `${brand}-${name}-${spec}`;
  if (grouped.has(key)) {
    grouped.get(key)!.ids.push(sku);
  } else {
    let image = IMAGES.DARK;
    const b = brand.toLowerCase();
    if (b.includes('chanel')) image = IMAGES.MONO;
    else if (b.includes('valentino')) image = IMAGES.VALENTINO;
    else if (b.includes('tom ford')) image = IMAGES.TOMFORD;
    else if (b.includes('ysl')) image = IMAGES.GOLD;
    else if (b.includes('jpg')) image = IMAGES.BLUE;
    else if (b.includes('dior')) image = IMAGES.BLUE;
    else if (b.includes('prada') || b.includes('armani')) image = IMAGES.SKIN;
    else if (b.includes('versace')) image = IMAGES.BLUE;
    else if (b.includes('gucci')) image = IMAGES.GREEN;
    else if (b.includes('creed')) image = IMAGES.MONO;

    let price = 135;
    if (brand === 'MFK') price = 320;
    else if (brand === 'Tom Ford') price = 250;
    else if (brand === 'Louis Vuitton') price = 280;
    else if (brand === 'Creed') price = 340;

    grouped.set(key, {
      ids: [sku],
      brand,
      name,
      spec,
      condition: 'Sealed',
      stock: Math.floor(Math.random() * 50) + 10,
      price,
      category: 'Fragrance',
      image,
      details: DEFAULT_DETAILS(brand, name)
    });
  }
});

export const INVENTORY: Product[] = Array.from(grouped.values());
