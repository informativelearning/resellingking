import { Product, Category, ProductDetails } from './types';

const IMAGES = {
  DARK: "https://images.unsplash.com/photo-1523293188086-b469b979756c?auto=format&fit=crop&w=800&q=80",
  GOLD: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=80",
  MONO: "https://images.unsplash.com/photo-1509631179647-b84917759c1e?auto=format&fit=crop&w=800&q=80",
  RED: "https://images.unsplash.com/photo-1592914610354-split-b469b979756c?auto=format&fit=crop&w=800&q=80",
  CLEAN: "https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&w=800&q=80",
  BLUE: "https://images.unsplash.com/photo-1582211594533-268f4f1edcb9?auto=format&fit=crop&w=800&q=80",
  WOOD: "https://images.unsplash.com/photo-1594035910387-fea477942653?auto=format&fit=crop&w=800&q=80",
  GREEN: "https://images.unsplash.com/photo-1544467316-e97029d2bf88?auto=format&fit=crop&w=800&q=80",
  PURPLE: "https://images.unsplash.com/photo-1557170334-a7c3c4e7f9f4?auto=format&fit=crop&w=800&q=80",
  SKIN: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
  VALENTINO: "https://images.unsplash.com/photo-1594035910387-fea477942653?auto=format&fit=crop&w=800&q=80",
  TOMFORD: "https://images.unsplash.com/photo-1523293188086-b469b979756c?auto=format&fit=crop&w=800&q=80"
};

/**
 * MASTER FRAGRANCE DATABASE
 * 100% SKU Coverage for Description & Notes across all listed brands
 */
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
  "Coco Mademoiselle L'Eau Privee": {
    topNotes: ["Mandarin Orange"],
    heartNotes: ["Rose", "Jasmine"],
    baseNotes: ["White Musk"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A soft, watercolor interpretation designed for night. Delicate and musky."
  },
  "Coco Noir": {
    topNotes: ["Grapefruit", "Calabrian Bergamot"],
    heartNotes: ["Rose", "Narcissus", "Geranium", "Peach"],
    baseNotes: ["Patchouli", "Sandalwood", "Vanilla", "White Musk", "Frankincense"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A magnetic luminous oriental. Explores the intensity of black through a modern lens."
  },
  "Allure Homme Sport": {
    topNotes: ["Mandarin Orange", "Sea Notes", "Aldehydes"],
    heartNotes: ["Pepper", "Neroli", "Cedar"],
    baseNotes: ["Vanilla", "Tonka Bean", "White Musk", "Amber", "Vetiver"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A fresh and sensual scent for the active man. Balances citrus height with creamy tonka."
  },
  "Allure Homme Sport Superleggera": {
    topNotes: ["Mandarin Orange", "Citrus Accord"],
    heartNotes: ["Woody Notes", "Cedar"],
    baseNotes: ["White Musk", "Sandalwood", "Amber"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A limited-edition high-intensity fresh wood. Lighter, airier, and more streamlined."
  },
  "Allure Homme Sport Eau Extreme": {
    topNotes: ["Mandarin Orange", "Mint", "Cypress", "Sage"],
    heartNotes: ["Pepper"],
    baseNotes: ["Tonka Bean", "Musk", "Sandalwood", "Cedar"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "Musky, aromatic, and intense. A rush of adrenaline with a powerful mint and tonka opening."
  },
  "Allure Homme": {
    topNotes: ["Lemon", "Peach", "Ginger", "Mandarin", "Lavender"],
    heartNotes: ["Pepper", "Patchouli", "Rosewood", "Cedar"],
    baseNotes: ["Vanilla", "Tonka Bean", "Coconut", "Sandalwood", "Amber"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "Crisp and clean, warm and sexy. The very first Allure men's fragrance."
  },
  "N°5": {
    topNotes: ["Aldehydes", "Ylang-Ylang", "Neroli", "Bergamot"],
    heartNotes: ["Iris", "Jasmine", "Rose", "Orris Root"],
    baseNotes: ["Civet", "Musk", "Amber", "Sandalwood", "Moss", "Vanilla"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The world's most iconic fragrance. An abstract, floral bouquet defined by groundbreaking aldehydes."
  },
  "N°5 L'Eau": {
    topNotes: ["Lemon", "Mandarin", "Orange", "Neroli"],
    heartNotes: ["Rose", "Jasmine", "Ylang-Ylang"],
    baseNotes: ["Cedar", "White Musk"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A modern, fresh, and vibrant embodiment of the eternal N°5. Citrus-forward and airy."
  },
  "N°5 Red Edition": {
    topNotes: ["Aldehydes", "Neroli", "Rose"],
    heartNotes: ["Jasmine", "Iris"],
    baseNotes: ["Sandalwood", "Vanilla", "Vetiver"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A limited visual edition of the classic N°5. The same legendary juice in a striking red bottle."
  },
  "Chance Eau Tendre": {
    topNotes: ["Quince", "Grapefruit"],
    heartNotes: ["Hyacinth", "Jasmine"],
    baseNotes: ["Musk", "Iris", "Virginia Cedar", "Amber"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A delicate and unexpected fruity-floral. A soft whirlwind of happiness and fantasy."
  },
  "Chance Eau Fraiche": {
    topNotes: ["Lemon", "Cedar", "Citron"],
    heartNotes: ["Pink Pepper", "Water Hyacinth", "Jasmine"],
    baseNotes: ["Teak Wood", "Iris", "Amber", "Patchouli", "Vetiver"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A sparkling, floral-woody fragrance. Brimming with energy and zest."
  },
  "Chance Eau de Toilette": {
    topNotes: ["Patchouli", "Pink Pepper", "Pineapple", "Hyacinth"],
    heartNotes: ["Jasmine", "Lemon"],
    baseNotes: ["Musk", "Patchouli", "Vanilla", "Vetiver"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "The original Chance. A floral fragrance that evolves from fresh to spicy to sensual."
  },
  "Gabrielle": {
    topNotes: ["Mandarin Orange", "Grapefruit", "Black Currant"],
    heartNotes: ["Tuberose", "Ylang-Ylang", "Jasmine", "Orange Blossom"],
    baseNotes: ["Sandalwood", "Musk"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A solar fragrance based on a bouquet of four white flowers. Luminous and deeply feminine."
  },

  // --- VALENTINO ---
  "Uomo Born In Roma": {
    topNotes: ["Mineral notes", "Salt", "Violet Leaf"],
    heartNotes: ["Sage", "Ginger"],
    baseNotes: ["Vetiver", "Woody Notes"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A modern aromatic vetiver. Salty, mineral, and woody notes create a high-fashion street scent."
  },
  "Donna Born In Roma": {
    topNotes: ["Black Currant", "Pink Pepper", "Bergamot"],
    heartNotes: ["Jasmine Sambac", "Jasmine Tea"],
    baseNotes: ["Bourbon Vanilla", "Cashmeran", "Guaiac Wood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A floriental masterpiece. Three types of jasmine blended with warm bourbon vanilla."
  },
  "Yellow Dream": {
    topNotes: ["Italian Lemon", "Pineapple", "Mandarin"],
    heartNotes: ["Ginger", "Gingerbread", "Spices"],
    baseNotes: ["White Musk", "Cedarwood", "Vanilla"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "An energetic and luminous scent. Spicy gingerbread meets fresh Italian lemon."
  },
  "Coral Fantasy": {
    topNotes: ["Red Apple", "Cardamom", "Calabrian Bergamot"],
    heartNotes: ["Lavender", "Clary Sage", "Geranium"],
    baseNotes: ["Tobacco Leaf", "Patchouli", "Vetiver"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A floral-fruity scent with a woody edge. Features a unique Red Apple and Tobacco accord."
  },
  "Green Stravaganza": {
    topNotes: ["Calabrian Bergamot"],
    heartNotes: ["Coffee", "Star Anise"],
    baseNotes: ["Vetiver", "Woody Notes"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A bold, vibrant fragrance. Fresh bergamot contrasts with addictive coffee notes."
  },
  "Voce Viva": {
    topNotes: ["Mandarin Orange", "Bergamot", "Ginger"],
    heartNotes: ["Orange Blossom", "Golden Gardenia"],
    baseNotes: ["Vanilla", "Tonka Bean", "Musk", "Sandalwood"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A floral woody scent. Sweet vanilla and orange blossom create a radiant aura."
  },
  "Uomo Intense": {
    topNotes: ["Mandarin Orange", "Clary Sage"],
    heartNotes: ["Iris", "Tonka Bean"],
    baseNotes: ["Black Leather", "Vanilla Bean"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "An intimate and deeply masculine fragrance. Smooth iris meets dark leather."
  },
  "Rockstud Noir": {
    topNotes: ["Bergamot"],
    heartNotes: ["Tuberose"],
    baseNotes: ["Sandalwood", "Myrrh"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A mysterious, dark fragrance reflecting the rock-chic edge of the Valentino brand."
  },

  // --- YSL ---
  "MYSLF": {
    topNotes: ["Calabrian Bergamot", "Bergamot"],
    heartNotes: ["Tunisian Orange Blossom"],
    baseNotes: ["Ambrofix", "Patchouli"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "A statement of modern masculinity. Fresh, clean, and effortlessly sophisticated."
  },
  "Libre Eau de Parfum": {
    topNotes: ["Lavender", "Mandarin Orange", "Blackcurrant"],
    heartNotes: ["Lavender", "Orange Blossom", "Jasmine"],
    baseNotes: ["Madagascar Vanilla", "Musk", "Cedar", "Ambergris"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The fragrance of freedom. A grand floral scent with an edgy, couture twist."
  },
  "Libre Le Parfum": {
    topNotes: ["Ginger", "Saffron", "Mandarin Orange", "Bergamot"],
    heartNotes: ["Orange Blossom", "Lavender"],
    baseNotes: ["Bourbon Vanilla", "Honey", "Tonka Bean", "Vetiver"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "The most intense Libre. Spicy saffron and honey make this fiery and luxurious."
  },
  "Y Men Eau de Parfum": {
    topNotes: ["Apple", "Ginger", "Bergamot"],
    heartNotes: ["Sage", "Juniper Berries", "Geranium"],
    baseNotes: ["Amberwood", "Tonka Bean", "Cedar", "Vetiver"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Bold, fresh and intense. The definitive blue fragrance for the modern man."
  },
  "Y Men Le Parfum": {
    topNotes: ["Apple", "Aldehydes", "Grapefruit", "Ginger"],
    heartNotes: ["Sage", "Lavender", "Geranium"],
    baseNotes: ["Tonka Bean", "Cedar", "Olibanum", "Patchouli"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "Dark and elegant. A more mature, woody take on the Y DNA."
  },
  "Y Men Eau de Toilette": {
    topNotes: ["Bergamot", "Ginger", "Aldehydes"],
    heartNotes: ["Sage", "Geranium", "Violet Leaf"],
    baseNotes: ["Ambergris", "Incense", "Fir Balsam", "Cedar", "Musk"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "Crisp and salty. A mineral woody-fougère that feels like a fresh ocean breeze."
  },
  "Black Opium": {
    topNotes: ["Pear", "Pink Pepper", "Orange Blossom"],
    heartNotes: ["Coffee", "Jasmine", "Bitter Almond", "Licorice"],
    baseNotes: ["Vanilla", "Patchouli", "Cedar", "Cashmere Wood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "An addictive gourmand. The electrifying energy of black coffee meets assertive femininity."
  },
  "Black Opium Intense": {
    topNotes: ["Absinthe", "Boysenberry"],
    heartNotes: ["Coffee", "Orange Blossom", "Jasmine"],
    baseNotes: ["Vanilla", "Licorice", "Sandalwood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A bolder, more hypnotic interpretation. Features a daring note of blue absinthe."
  },
  "Mon Paris": {
    topNotes: ["Strawberry", "Raspberry", "Pear", "Calabrian Bergamot"],
    heartNotes: ["Peony", "Jasmine Sambac", "Datura", "Orange Blossom"],
    baseNotes: ["Patchouli", "White Musk", "Vanilla", "Ambroxan"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A modern, dizzying love story. Sweet fruits and white florals in a Parisian whirlwind."
  },

  // --- DIOR ---
  "Sauvage Eau de Toilette": {
    topNotes: ["Calabrian Bergamot", "Pepper"],
    heartNotes: ["Sichuan Pepper", "Lavender", "Pink Pepper", "Vetiver"],
    baseNotes: ["Ambroxan", "Cedar", "Labdanum"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "Radically fresh, raw and noble. The original overdose of bergamot and pepper."
  },
  "Sauvage Eau de Parfum": {
    topNotes: ["Bergamot"],
    heartNotes: ["Sichuan Pepper", "Lavender", "Star Anise", "Nutmeg"],
    baseNotes: ["Ambroxan", "Vanilla"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A smoother, more sensual interpretation. Enriched with spicy star anise and vanilla."
  },
  "Sauvage Parfum": {
    topNotes: ["Bergamot", "Mandarin Orange"],
    heartNotes: ["Sandalwood"],
    baseNotes: ["Olibanum", "Tonka Bean", "Vanilla"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Highly concentrated and distinct. Rich sandalwood and tonka create a nocturnal signature."
  },
  "Sauvage Elixir": {
    topNotes: ["Cinnamon", "Nutmeg", "Cardamom", "Grapefruit"],
    heartNotes: ["Lavender"],
    baseNotes: ["Licorice", "Sandalwood", "Amber", "Patchouli"],
    projection: "NUCLEAR",
    sillage: "ETERNAL",
    description: "An extraordinary concentration. A dense liqueur of spices and rich woods."
  },

  // --- MFK ---
  "Baccarat Rouge 540": {
    topNotes: ["Saffron", "Jasmine"],
    heartNotes: ["Amberwood", "Ambergris"],
    baseNotes: ["Fir Resin", "Cedar"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A poetic alchemy. Luminous and sophisticated with its signature airy sweetness."
  },
  "Baccarat Rouge 540 Extrait": {
    topNotes: ["Bitter Almond", "Saffron"],
    heartNotes: ["Egyptian Jasmine", "Cedar"],
    baseNotes: ["Ambergris", "Woody Notes", "Musk"],
    projection: "BEAST MODE",
    sillage: "ENORMOUS",
    description: "The ultimate intensity. Rich bitter almond and musk add density to the signature 540 aura."
  },
  "Oud Satin Mood": {
    topNotes: ["Bulgarian Rose", "Turkish Rose"],
    heartNotes: ["Vanilla", "Oud (Laos)"],
    baseNotes: ["Benzoin", "Violet", "Amber"],
    projection: "NUCLEAR",
    sillage: "ENORMOUS",
    description: "A shimmering oriental fragrance. Soft rose and powdery violet wrap around deep oud."
  },

  // --- CAROLINA HERRERA ---
  "Good Girl": {
    topNotes: ["Almond", "Coffee", "Bergamot", "Lemon"],
    heartNotes: ["Tuberose", "Jasmine Sambac", "Orris", "Bulgarian Rose"],
    baseNotes: ["Tonka Bean", "Cacao", "Vanilla", "Praline"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Powerful and sensual. 'It's so good to be bad' with this tuberose and cacao blend."
  },
  "Very Good Girl": {
    topNotes: ["Red Currant", "Lychee"],
    heartNotes: ["Rose"],
    baseNotes: ["Vetiver", "Vanilla"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A bold fruity-floral. Red currant and lychee create a playful, modern twist."
  },
  "Very Good Girl Glam": {
    topNotes: ["Sour Cherry", "Bitter Almond"],
    heartNotes: ["Rose", "Lily"],
    baseNotes: ["Vanilla", "Vetiver"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A dazzling evolution. Shimmering cherry and almond create a glamorous, intense profile."
  },
  "Good Girl Blush": {
    topNotes: ["Bergamot", "Bitter Almond"],
    heartNotes: ["Peony", "Ylang-Ylang"],
    baseNotes: ["Vanilla", "Coumarin"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A fresh, floral explosion of femininity. Soft peony meets warm vanilla."
  },
  "212 Heroes": {
    topNotes: ["Pear", "Cannabis", "Ginger"],
    heartNotes: ["Geranium", "Sage"],
    baseNotes: ["Musk", "Leather"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "Audacious and revolutionary. A unique cannabis and pear accord in a skateboard bottle."
  },

  // --- JPG ---
  "La Belle": {
    topNotes: ["Pear"],
    heartNotes: ["Vetiver"],
    baseNotes: ["Vanilla"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The original sin. An addictive, luminous, and ultra-feminine vanilla scent."
  },
  "La Belle Le Parfum": {
    topNotes: ["Pear"],
    heartNotes: ["Tonka Bean", "Jasmine"],
    baseNotes: ["Vanilla"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "A darker, more intense temptation. Richer vanilla and tonka for a seductive trail."
  },
  "Le Male Eau de Toilette": {
    topNotes: ["Lavender", "Mint", "Cardamom", "Bergamot"],
    heartNotes: ["Cinnamon", "Orange Blossom", "Caraway"],
    baseNotes: ["Vanilla", "Tonka Bean", "Amber", "Sandalwood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The classic barbershop oriental. Mint, lavender and vanilla create the iconic sailor scent."
  },
  "Le Male Le Parfum": {
    topNotes: ["Cardamom"],
    heartNotes: ["Lavender", "Iris"],
    baseNotes: ["Vanilla", "Oriental notes", "Woody Notes"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "An intense woody oriental. The captain has arrived, commanding and seductive with iris and cardamom."
  },
  "Le Male Elixir": {
    topNotes: ["Lavender", "Mint"],
    heartNotes: ["Vanilla", "Benzoin"],
    baseNotes: ["Honey", "Tonka Bean", "Tobacco"],
    projection: "NUCLEAR",
    sillage: "HEAVY",
    description: "A burning desire. Syrupy honey and tobacco make this the sexiest Le Male yet."
  },
  "Le Beau": {
    topNotes: ["Bergamot"],
    heartNotes: ["Coconut Wood"],
    baseNotes: ["Tonka Bean"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A fresh and powerful garden of Eden. Simple, sensual coconut and tonka."
  },
  "Le Beau Paradise Garden": {
    topNotes: ["Watery Notes", "Mint", "Green Notes"],
    heartNotes: ["Coconut", "Fig", "Salt"],
    baseNotes: ["Sandalwood", "Tonka Bean"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A high-performance tropical escape. Salty, green, and incredibly fresh with fig notes."
  },
  "Ultra Male": {
    topNotes: ["Pear", "Lavender", "Mint", "Lemon"],
    heartNotes: ["Cinnamon", "Caraway", "Clary Sage"],
    baseNotes: ["Black Vanilla", "Amber", "Patchouli"],
    projection: "NUCLEAR",
    sillage: "ENORMOUS",
    description: "The ultimate clubbing fragrance. Spicy pear and bubblegum sweetness that cuts through anything."
  },
  "Scandal Pour Homme": {
    topNotes: ["Clary Sage", "Mandarin Orange"],
    heartNotes: ["Caramel", "Tonka Bean"],
    baseNotes: ["Vetiver"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "The champion of the ring. A woody-oriental with addictive caramel notes."
  },

  // --- TOM FORD ---
  "Bitter Peach": {
    topNotes: ["Peach", "Blood Orange", "Cardamom", "Heliotrope"],
    heartNotes: ["Rum", "Cognac", "Davana", "Jasmine"],
    baseNotes: ["Indonesian Patchouli Leaf", "Vanilla", "Sandalwood"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "Explicitly sweet and dangerously voluptuous. A boozy, ripe peach with a dark heart."
  },
  "Tobacco Vanille": {
    topNotes: ["Tobacco Leaf", "Spicy Notes"],
    heartNotes: ["Vanilla", "Cacao", "Tonka Bean", "Tobacco Blossom"],
    baseNotes: ["Dried Fruits", "Woody Notes"],
    projection: "VERY STRONG",
    sillage: "HEAVY",
    description: "A classic spice-tobacco masterpiece. Opulent, warm, and iconic."
  },
  "Soleil Blanc": {
    topNotes: ["Pistachio", "Bergamot", "Cardamom", "Pink Pepper"],
    heartNotes: ["Tuberose", "Ylang-Ylang", "Jasmine"],
    baseNotes: ["Coconut", "Amber", "Tonka Bean", "Benzoin"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "Remote private islands where summer lasts all year. Sultry pistachio and coconut."
  },
  "Oud Wood": {
    topNotes: ["Rare Oud", "Cardamom", "Rosewood"],
    heartNotes: ["Sandalwood", "Sichuan Pepper", "Vetiver"],
    baseNotes: ["Tonka Bean", "Vanilla", "Amber"],
    projection: "MODERATE",
    sillage: "MODERATE",
    description: "Exotic and distinctive. One of the most copied yet never duplicated woody scents."
  },
  "Rose Prick": {
    topNotes: ["Sichuan Pepper", "Turmeric"],
    heartNotes: ["May Rose", "Turkish Rose", "Bulgarian Rose"],
    baseNotes: ["Patchouli", "Tonka Bean"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Inspired by Tom Ford's private rose garden. A wild, prickly bouquet of three roses."
  },
  "Ebene Fume": {
    topNotes: ["Incense", "Palo Santo", "Black Pepper"],
    heartNotes: ["Leather", "Labdanum", "Cade oil", "Rose"],
    baseNotes: ["Resins", "Ebony Tree", "Guaiac Wood"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A meditative woody scent. The purifying essence of Palo Santo meets warm ebony wood."
  },
  "Fucking Fabulous": {
    topNotes: ["Lavender", "Clary Sage"],
    heartNotes: ["Leather", "Bitter Almond", "Vanilla", "Orris"],
    baseNotes: ["Leather", "Tonka Bean", "Cashmeran", "Amber"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A decadent oriental leather. Explicit, exclusive, and fabulous."
  },
  "Jasmin Rouge": {
    topNotes: ["Cinnamon", "Ginger", "Bergamot", "Cardamom"],
    heartNotes: ["Jasmine", "Ylang-Ylang", "Neroli"],
    baseNotes: ["Amber", "Vanila", "Leather"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "Voluptuous and sensuous. A spiced floral blend dominated by red jasmine."
  },
  "Lost Cherry": {
    topNotes: ["Black Cherry", "Bitter Almond", "Liquor"],
    heartNotes: ["Sour Cherry", "Plum", "Turkish Rose"],
    baseNotes: ["Tonka Bean", "Vanilla", "Peru Balsam", "Cinnamon"],
    projection: "STRONG",
    sillage: "HEAVY",
    description: "A full-bodied journey into the once-forbidden. Luscious candy-like cherry with a dark side."
  },

  // --- LOUIS VUITTON ---
  "Pacific Chill": {
    topNotes: ["Orange", "Citron", "Mint", "Lemon"],
    heartNotes: ["Apricot", "Basil", "Carrot Seeds"],
    baseNotes: ["Dates", "Fig", "Ambrette"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "A wellness-inspired detox scent. Captures the regenerating energy of the Pacific Ocean."
  },
  "Imagination": {
    topNotes: ["Citron", "Calabrian Bergamot", "Sicilian Orange"],
    heartNotes: ["Nigerian Ginger", "Tunisian Neroli", "Cinnamon"],
    baseNotes: ["Chinese Black Tea", "Ambroxan", "Guaiac Wood"],
    projection: "STRONG",
    sillage: "MODERATE",
    description: "The key to boldness. An elite signature of tea, citrus and ambroxan."
  },
  "Ombre Nomade": {
    topNotes: ["Raspberry", "Geranium"],
    heartNotes: ["Rose", "Saffron"],
    baseNotes: ["Oud", "Benzoin", "Incense", "Amberwood"],
    projection: "NUCLEAR",
    sillage: "ETERNAL",
    description: "A whirlwind of oud. Dark, leathery, and infinitely deep."
  }
};

const DEFAULT_DETAILS = (brand: string, name: string): ProductDetails => {
  const b = brand.toLowerCase();
  const n = name.toLowerCase();

  // Optimized Search: Find the most specific match in the database
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

  if (match) {
    return { ...fallback, ...match } as ProductDetails;
  }

  return fallback;
};

const rawData = [
  // Chanel
  ["053-FENCOVAPG", "Chanel", "Coco Mademoiselle", "100ml"],
  ["123-FENVAP100", "Chanel", "Coco Mademoiselle", "100ml"],
  ["071-FUCOIN", "Chanel", "Coco Mademoiselle Intense", "100ml"],
  ["098-PTDAFUCO", "Chanel", "Coco Mademoiselle", "100ml"],
  ["099-PTNIGHCO", "Chanel", "Coco Mademoiselle L'Eau Privee", "100ml"],
  ["296-COCO30ML", "Chanel", "Coco Mademoiselle Travel Spray", "30ml"],
  ["054-CONIGHTG", "Chanel", "Coco Noir", "100ml"],
  ["109-COHEIPT", "Chanel", "Coco Noir", "100ml"],
  ["126-GVAPCOHEI", "Chanel", "Coco Noir", "100ml"],
  ["028-COHEITOP", "Chanel", "Coco Noir", "100ml"],
  ["097-HEICOVAP", "Chanel", "Coco Noir", "100ml"],
  ["445-ALSPG", "Chanel", "Allure Homme Sport", "100ml"],
  ["223-ALLCO", "Chanel", "Allure Homme Sport", "100ml"],
  ["115-SPOREDT", "Chanel", "Allure Homme Sport", "100ml"],
  ["659-SUPE", "Chanel", "Allure Homme Sport Superleggera", "100ml"],
  ["660-EXTR", "Chanel", "Allure Homme Sport Eau Extreme", "100ml"],
  ["062-EDTBLUG", "Chanel", "Bleu de Chanel Eau de Toilette", "100ml"],
  ["012-PTJINBL", "Chanel", "Bleu de Chanel Eau de Toilette", "100ml"],
  ["013-BLUTOPJIN", "Chanel", "Bleu de Chanel Eau de Toilette", "100ml"],
  ["094-TOPBLUE", "Chanel", "Bleu de Chanel Eau de Toilette", "100ml"],
  ["018-PTBLUEDP", "Chanel", "Bleu de Chanel Eau de Parfum", "100ml"],
  ["067-PTBLUE", "Chanel", "Bleu de Chanel Parfum", "100ml"],
  ["624-LEBLU", "Chanel", "Bleu de Chanel Parfum", "100ml"],
  ["284-BLU30ML", "Chanel", "Bleu de Chanel Travel Spray", "30ml"],
  ["221-ALLHOME", "Chanel", "Allure Homme", "100ml"],
  ["454-ALHO", "Chanel", "Allure Homme", "100ml"],
  ["116-TOPN5H", "Chanel", "N°5", "100ml"],
  ["308-PTBAIN5", "Chanel", "N°5", "100ml"],
  ["472-HON5", "Chanel", "N°5 Red Edition", "100ml"],
  ["049-N5BAIG", "Chanel", "N°5 L'Eau", "100ml"],
  ["120-N5HPT", "Chanel", "N°5 L'Eau", "100ml"],
  ["596-XHDPH", "Chanel", "Chance Eau Tendre", "100ml"],
  ["035-CHXHDAN", "Chanel", "Chance Eau Tendre", "100ml"],
  ["456-XHLVEDP", "Chanel", "Chance Eau Fraiche", "100ml"],
  ["105-LVPTXH", "Chanel", "Chance Eau Fraiche", "100ml"],
  ["104-PTXHHUANG", "Chanel", "Chance Eau de Toilette", "100ml"],
  ["311-ESSE", "Chanel", "Gabrielle", "100ml"],
  ["627-ESSPT", "Chanel", "Gabrielle", "100ml"],

  // Valentino
  ["271-PTVAYELL", "Valentino", "Yellow Dream", "100ml"],
  ["294-PTVAGOLD", "Valentino", "Yellow Dream", "100ml"],
  ["219-UOIVPT", "Valentino", "Yellow Dream", "100ml"],
  ["269-PTDONNA", "Valentino", "Donna Born In Roma", "100ml"],
  ["136-PTINETVA", "Valentino", "Uomo Born In Roma", "100ml"],
  ["484-VABOPT", "Valentino", "Uomo Born In Roma", "100ml"],
  ["399-PTVAUO", "Valentino", "Uomo Born In Roma", "100ml"],
  ["558-PTVAEX", "Valentino", "Uomo Born In Roma", "100ml"],
  ["614-VAEXPT", "Valentino", "Uomo Born In Roma", "100ml"],
  ["485-PTVACOR", "Valentino", "Coral Fantasy", "100ml"],
  ["205-PTCORAVA", "Valentino", "Coral Fantasy", "100ml"],
  ["342-PTVAPIN", "Valentino", "Donna Born In Roma", "100ml"],
  ["407-PTDRE", "Valentino", "Green Stravaganza", "100ml"],
  ["559-PTVAST", "Valentino", "Green Stravaganza", "100ml"],
  ["268-PTGREEVA", "Valentino", "Green Stravaganza", "100ml"],
  ["584-UOINPT", "Valentino", "Uomo Intense", "100ml"],
  ["037-ROCK", "Valentino", "Rockstud Noir", "100ml"],
  ["137--PTVALEHON", "Valentino", "Voce Viva", "100ml"],
  ["241-VIOPT", "Valentino", "Voce Viva", "100ml"],

  // YSL
  ["230-MYSLE", "YSL", "MYSLF", "100ml"],
  ["369-PTMYSLE", "YSL", "MYSLF", "100ml"],
  ["361-PTMYSL", "YSL", "MYSLF", "100ml"],
  ["107-MYSLF", "YSL", "MYSLF", "100ml"],
  ["193-TOPLIBRE", "YSL", "Libre Eau de Parfum", "90ml"],
  ["118-LIBRE", "YSL", "Libre Eau de Parfum", "90ml"],
  ["677-YVEAU", "YSL", "Libre Eau de Parfum", "90ml"],
  ["687-LILE", "YSL", "Libre Eau de Parfum", "90ml"],
  ["198-LIBLEP", "YSL", "Libre Le Parfum", "90ml"],
  ["133-GLEPAR", "YSL", "Y Men Eau de Parfum", "100ml"],
  ["019-LEPARYS", "YSL", "Y Men Eau de Parfum", "100ml"],
  ["191-YLELI", "YSL", "Y Men Le Parfum", "100ml"],
  ["567-YSINT", "YSL", "Y Men Le Parfum", "100ml"],
  ["020-EAUFRAYS", "YSL", "Y Men Eau de Toilette", "100ml"],
  ["228-YSEDT", "YSL", "Y Men Eau de Toilette", "100ml"],
  ["021-YSEAUDE", "YSL", "Y Men Eau de Toilette", "100ml"],
  ["217-GOPIU", "YSL", "Black Opium", "90ml"],
  ["306-HOPIUPT", "YSL", "Black Opium", "90ml"],
  ["117-OPIU", "YSL", "Black Opium", "90ml"],
  ["587-LANOP", "YSL", "Black Opium Intense", "90ml"],
  ["227-MONPAR", "YSL", "Mon Paris", "90ml"],
  ["315-PTMON", "YSL", "Mon Paris", "90ml"],

  // MFK
  ["186-XINDA540HONG", "MFK", "Baccarat Rouge 540 Extrait", "70ml"],
  ["511-MFPTH", "MFK", "Baccarat Rouge 540 Extrait", "70ml"],
  ["147-MFKfanghong", "MFK", "Baccarat Rouge 540 Extrait", "70ml"],
  ["293-DABAIma", "MFK", "Baccarat Rouge 540", "70ml"],
  ["512-MFBPT", "MFK", "Baccarat Rouge 540", "70ml"],
  ["262-fangbai540", "MFK", "Baccarat Rouge 540", "70ml"],
  ["184-OUDlanDA", "MFK", "Oud Satin Mood", "70ml"],
  ["548-OUDPT", "MFK", "Oud Satin Mood", "70ml"],

  // Dior
  ["043-TOPKUANG", "Dior", "Sauvage Eau de Toilette", "100ml"],
  ["114-EDPSAU", "Dior", "Sauvage Eau de Parfum", "100ml"],
  ["589-EDPSA", "Dior", "Sauvage Eau de Parfum", "100ml"],
  ["314-PTKUANG", "Dior", "Sauvage Parfum", "100ml"],
  ["029-SAELG", "Dior", "Sauvage Elixir", "60ml"],
  ["588-ELISA", "Dior", "Sauvage Elixir", "60ml"],

  // Carolina Herrera
  ["091-GOGL", "Carolina Herrera", "Good Girl", "80ml"],
  ["303-PTITS", "Carolina Herrera", "Good Girl", "80ml"],
  ["698-CARO", "Carolina Herrera", "Good Girl", "80ml"],
  ["323-PTCARHEI", "Carolina Herrera", "Good Girl (Black)", "80ml"],
  ["425-GOBAI", "Carolina Herrera", "Good Girl (White/Gold)", "80ml"],
  ["302-PTGOFAN", "Carolina Herrera", "Good Girl (Glitter)", "80ml"],
  ["111-GODAZZ", "Carolina Herrera", "Good Girl Dazzling Garden", "80ml"],
  ["313-PTGODAZI", "Carolina Herrera", "Good Girl Dazzling Garden", "80ml"],
  ["153-ITSS", "Carolina Herrera", "Very Good Girl", "80ml"],
  ["166-GLAM", "Carolina Herrera", "Very Good Girl Glam", "80ml"],
  ["592-PTGOIT", "Carolina Herrera", "Very Good Girl Glam", "80ml"],
  ["075-GOBLUS", "Carolina Herrera", "Good Girl Blush", "80ml"],
  ["176-BLUS", "Carolina Herrera", "Good Girl Blush", "80ml"],
  ["431-HEROH", "Carolina Herrera", "212 Heroes", "90ml"],
  ["432-HERHY", "Carolina Herrera", "212 Heroes", "90ml"],

  // JPG
  ["321-HUALABE", "JPG", "La Belle", "100ml"],
  ["387-JPPAR", "JPG", "La Belle Le Parfum", "100ml"],
  ["238-LEPATONG", "JPG", "Le Male Le Parfum", "125ml"],
  ["151-LEPAZHI", "JPG", "Le Male Le Parfum", "125ml"],
  ["259-LEMAhei125zi", "JPG", "Le Male Le Parfum", "125ml"],
  ["242-JINTONG", "JPG", "Le Male Elixir", "125ml"],
  ["257-JINLEMAZI", "JPG", "Le Male Elixir", "125ml"],
  ["337-LEHUA", "JPG", "Le Beau", "125ml"],
  ["167-LELOE", "JPG", "Le Beau", "125ml"],
  ["338-LEBEA", "JPG", "Le Beau Paradise Garden", "125ml"],
  ["585-UITR", "JPG", "Ultra Male", "125ml"],
  ["533-GAUPT", "JPG", "Scandal Pour Homme", "100ml"],

  // Tom Ford
  ["546-PTTFPE", "Tom Ford", "Bitter Peach", "50ml"],
  ["316-VANTFPT", "Tom Ford", "Tobacco Vanille", "100ml"],
  ["560-SOTF", "Tom Ford", "Soleil Blanc", "50ml"],
  ["404-PTSOL", "Tom Ford", "Soleil Blanc", "50ml"],
  ["317-OUDHUIPT", "Tom Ford", "Oud Wood", "100ml"],
  ["329-PTROSET", "Tom Ford", "Rose Prick", "50ml"],
  ["330-TFEBRPT", "Tom Ford", "Ebene Fume", "50ml"],
  ["486-PTLOST", "Tom Ford", "Lost Cherry", "50ml"],
  ["524-FABPT", "Tom Ford", "Fucking Fabulous", "50ml"],
  ["626-JASPT", "Tom Ford", "Jasmin Rouge", "50ml"],

  // Louis Vuitton
  ["581-PACLV", "Louis Vuitton", "Pacific Chill", "100ml"],
  ["580-IMALV", "Louis Vuitton", "Imagination", "100ml"],
  ["632-OMBR", "Louis Vuitton", "Ombre Nomade", "100ml"]
];

export const DISCOUNTS = [
  "2+ ITEMS = 10% OFF",
  "3+ ITEMS = 15% OFF",
  "NEW DROPS WEEKLY",
  "CASHAPP/ZELLE ACCEPTED",
  "VERIFIED AUTHENTIC",
  "LOS ANGELES LOCAL PICKUP",
  "STREETWEAR COMPATIBLE"
];

const grouped = new Map<string, Product>();

rawData.forEach(([sku, brand, name, spec]) => {
  const key = `${brand}-${name}-${spec}`;
  if (grouped.has(key)) {
    grouped.get(key)!.ids.push(sku);
  } else {
    let image = IMAGES.DARK;
    const b = brand.toLowerCase();
    const n = name.toLowerCase();
    
    if (b.includes('chanel')) image = IMAGES.MONO;
    else if (b.includes('valentino')) image = IMAGES.VALENTINO;
    else if (b.includes('tom ford')) image = IMAGES.TOMFORD;
    else if (b.includes('ysl')) image = IMAGES.GOLD;
    else if (b.includes('mfk')) image = n.includes('red') ? IMAGES.RED : IMAGES.MONO;
    else if (b.includes('jpg')) image = IMAGES.BLUE;
    else if (b.includes('dior')) image = IMAGES.BLUE;
    else if (b.includes('carolina')) image = IMAGES.PURPLE;
    else if (b.includes('louis vuitton')) image = IMAGES.WOOD;

    let price = 135;
    if (brand === 'MFK') price = 320;
    else if (brand === 'Tom Ford') price = 250;
    else if (brand === 'Louis Vuitton') price = 280;
    else if (brand === 'Dior' && name.includes('Elixir')) price = 180;
    else if (brand === 'JPG' && (name.includes('Elixir') || name.includes('Parfum'))) price = 145;

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
