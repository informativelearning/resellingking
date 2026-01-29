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

const ARCHIVE_DB: Record<string, Partial<ProductDetails>> = {
  "Bleu de Chanel": { topNotes: ["Grapefruit", "Lemon"], heartNotes: ["Ginger"], baseNotes: ["Cedar", "Incense"], projection: "STRONG", sillage: "HEAVY", description: "The definitive aromatic-woody masculine fragrance." },
  "Baccarat Rouge 540": { topNotes: ["Saffron"], heartNotes: ["Cedarwood"], baseNotes: ["Ambergris"], projection: "BEAST MODE", sillage: "ETERNAL", description: "Luminous and sophisticated floral-woody breeze." },
  "Aventus": { topNotes: ["Pineapple", "Bergamot"], heartNotes: ["Birch", "Patchouli"], baseNotes: ["Musk", "Oak Moss"], projection: "STRONG", sillage: "EXCEPTIONAL", description: "The masterpiece of the house. Successful, powerful, and iconic." },
  "Imagination": { topNotes: ["Citrus", "Bergamot"], heartNotes: ["Ginger", "Cinnamon"], baseNotes: ["Black Tea", "Guaiac Wood"], projection: "STRONG", sillage: "MODERATE", description: "The key to boldness. An overdose of ambroxan and citrus." }
};

const DEFAULT_DETAILS = (brand: string, name: string): ProductDetails => {
  const n = name.toLowerCase();
  const sortedKeys = Object.keys(ARCHIVE_DB).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (n.includes(key.toLowerCase()) || key.toLowerCase().includes(n)) {
      return ARCHIVE_DB[key] as ProductDetails;
    }
  }
  return {
    description: `Verified authentic archive entry from the ${brand} 2024/2025 couture manifest.`,
    projection: "STRONG",
    sillage: "HEAVY",
    topNotes: ["Bergamot", "Citrus"],
    heartNotes: ["Geranium", "Lavender"],
    baseNotes: ["Sandalwood", "Amber"]
  };
};

const rawData: [string, string, string, string][] = [
  // --- CHANEL VAULT ---
  ["123-FENVAP100", "Chanel", "Coco Mademoiselle", "100ml"],
  ["053-FENCOVAPG", "Chanel", "Coco Mademoiselle", "100ml"],
  ["071-FUCOIN", "Chanel", "Coco Mademoiselle Intense", "100ml"],
  ["098-PTDAFUCO", "Chanel", "Coco Mademoiselle", "100ml"],
  ["099-PTNIGHCO", "Chanel", "Coco Mademoiselle L'Eau Privee", "100ml"],
  ["296-COCO30ML", "Chanel", "Coco Mademoiselle Travel Spray", "30ml"],
  ["109-COHEIPT", "Chanel", "Coco Noir", "100ml"],
  ["097-HEICOVAP", "Chanel", "Coco Noir", "100ml"],
  ["126-GVAPCOHEI", "Chanel", "Coco Noir", "100ml"],
  ["028-COHEITOP", "Chanel", "Coco Noir", "100ml"],
  ["054-CONIGHTG", "Chanel", "Coco Noir", "100ml"],
  ["223-ALLCO", "Chanel", "Allure Homme Sport", "100ml"],
  ["445-ALSPG", "Chanel", "Allure Homme Sport", "100ml"],
  ["115-SPOREDT", "Chanel", "Allure Homme Sport", "100ml"],
  ["659-SUPE", "Chanel", "Allure Homme Sport Superleggera", "100ml"],
  ["660-EXTR", "Chanel", "Allure Homme Sport Eau Extreme", "100ml"],
  ["454-ALHO", "Chanel", "Allure Homme", "100ml"],
  ["221-ALLHOME", "Chanel", "Allure Homme", "100ml"],
  ["012-PTJINBL", "Chanel", "Bleu de Chanel", "100ml"],
  ["013-BLUTOPJIN", "Chanel", "Bleu de Chanel", "100ml"],
  ["018-PTBLUEDP", "Chanel", "Bleu de Chanel Eau de Parfum", "100ml"],
  ["062-EDTBLUG", "Chanel", "Bleu de Chanel Eau de Toilette", "100ml"],
  ["067-PTBLUE", "Chanel", "Bleu de Chanel Parfum", "100ml"],
  ["624-LEBLU", "Chanel", "Bleu de Chanel Parfum", "100ml"],
  ["094-TOPBLUE", "Chanel", "Bleu de Chanel", "100ml"],
  ["284-BLU30ML", "Chanel", "Bleu de Chanel Travel Spray", "30ml"],
  ["104-PTXHHUANG", "Chanel", "Chance EDT", "100ml"],
  ["035-CHXHDAN", "Chanel", "Chance Eau Tendre", "100ml"],
  ["596-XHDPH", "Chanel", "Chance Eau Tendre", "100ml"],
  ["467-XHZI", "Chanel", "Chance (Purple)", "100ml"],
  ["042-DANFENG", "Chanel", "Chance (Pink)", "100ml"],
  ["052-XHNONGG", "Chanel", "Chance (Pink)", "100ml"],
  ["105-LVPTXH", "Chanel", "Chance Eau Fraiche", "100ml"],
  ["456-XHLVEDP", "Chanel", "Chance Eau Fraiche", "100ml"],
  ["046-LVXHG", "Chanel", "Chance Eau Fraiche", "100ml"],
  ["116-TOPN5H", "Chanel", "N°5", "100ml"],
  ["472-HON5", "Chanel", "N°5 Red Edition", "100ml"],
  ["120-N5HPT", "Chanel", "N°5 L'Eau", "100ml"],
  ["049-N5BAIG", "Chanel", "N°5 L'Eau", "100ml"],
  ["308-PTBAIN5", "Chanel", "N°5", "100ml"],
  ["627-ESSPT", "Chanel", "Gabrielle", "100ml"],
  ["311-ESSE", "Chanel", "Gabrielle Essence", "100ml"],

  // --- VALENTINO ---
  ["271-PTVAYELL", "Valentino", "Uomo Born In Roma Yellow Dream", "100ml"],
  ["294-PTVAGOLD", "Valentino", "Uomo Born In Roma Yellow Dream", "100ml"],
  ["128-VAYELL", "Valentino", "Uomo Born in Roma Yellow Dream", "100ml"],
  ["528-VAYEDR", "Valentino", "Yellow Dream", "100ml"],
  ["219-UOIVPT", "Valentino", "Donna Born In Roma Yellow Dream", "100ml"],
  ["195-VAGOLD", "Valentino", "Donna Born in Roma Yellow Dream", "100ml"],
  ["269-PTDONNA", "Valentino", "Donna Born In Roma", "100ml"],
  ["154-VALEHONG", "Valentino", "Donna Born in Roma", "100ml"],
  ["233-DONNA", "Valentino", "Donna Born in Roma", "100ml"],
  ["136-PTINETVA", "Valentino", "Uomo Born In Roma", "100ml"],
  ["484-VABOPT", "Valentino", "Uomo Born In Roma", "100ml"],
  ["399-PTVAUO", "Valentino", "Uomo Born In Roma", "100ml"],
  ["130-INETVA", "Valentino", "Uomo Born in Roma", "100ml"],
  ["137--PTVALEHON", "Valentino", "Voce Viva", "100ml"],
  ["280-DONIV", "Valentino", "Voce Viva", "100ml"],
  ["241-VIOPT", "Valentino", "Voce Viva Intensa", "100ml"],
  ["485-PTVACOR", "Valentino", "Uomo Born In Roma Coral Fantasy", "100ml"],
  ["162-VACORAL", "Valentino", "Uomo Born in Roma Coral Fantasy", "100ml"],
  ["205-PTCORAVA", "Valentino", "Donna Born In Roma Coral Fantasy", "100ml"],
  ["342-PTVAPIN", "Valentino", "Donna Born In Roma Pink PP", "100ml"],
  ["331-VAPIN", "Valentino", "Donna Born in Roma Pink PP", "100ml"],
  ["407-PTDRE", "Valentino", "Donna Born In Roma Green Stravaganza", "100ml"],
  ["199-GREEVA", "Valentino", "Donna Born in Roma Green Stravaganza", "100ml"],
  ["559-PTVAST", "Valentino", "Uomo Born In Roma Green Stravaganza", "100ml"],
  ["527-VABOGR", "Valentino", "Born in Roma Green Stravaganza", "100ml"],
  ["268-PTGREEVA", "Valentino", "Donna Born In Roma Green Stravaganza", "100ml"],
  ["584-UOINPT", "Valentino", "Uomo Intense", "100ml"],
  ["255-UOIV", "Valentino", "Uomo Intense", "100ml"],
  ["037-ROCK", "Valentino", "Uomo Born In Roma Rockstud Noir", "100ml"],
  ["376-VAEXT", "Valentino", "Uomo Born in Roma Rockstud Noir", "100ml"],
  ["202-UOMOINT", "Valentino", "Uomo Born in Roma Intense", "100ml"],
  ["168-VABORNINT", "Valentino", "Uomo Born in Roma Intense", "100ml"],

  // --- CREED ---
  ["036-PTABS", "Creed", "Aventus (Black Label)", "100ml"],
  ["291-PTCRHEI100", "Creed", "Aventus (Black Label)", "100ml"],
  ["397-PTQUCR", "Creed", "Aventus (White Label)", "100ml"],
  ["450-TOPbaCR", "Creed", "Aventus (White)", "100ml"],
  ["211-CRblack120", "Creed", "Aventus", "120ml"],
  ["149-CRABS", "Creed", "Aventus Absolu", "75ml"],
  ["015-ABSO", "Creed", "Aventus Absolu", "75ml"],
  ["220-TOPCRhei100", "Creed", "Aventus Anniversary", "100ml"],
  ["460-CRWINPT", "Creed", "Aventus For Her", "75ml"],
  ["335-CRBA10", "Creed", "Silver Mountain Water", "100ml"],
  ["341-CRwhite", "Creed", "Silver Mountain Water", "100ml"],
  ["135-CRROY", "Creed", "Millesime Imperial", "100ml"],
  ["163-TOPCRjin100", "Creed", "Millesime Imperial (Gold)", "100ml"],
  ["345-CRquanhei", "Creed", "Green Irish Tweed", "100ml"],
  ["362-TOPCRIRI", "Creed", "Green Irish Tweed", "100ml"],
  ["336-TOPHUICR", "Creed", "Aventus (Titanium)", "100ml"],
  ["244-CRCENT", "Creed", "Centaurus", "100ml"],
  ["243-CRDEL", "Creed", "Delphinus", "100ml"],
  ["405-PTDEL", "Creed", "Viking (Red)", "100ml"],
  ["349-TOPCRHONG", "Creed", "Viking (Red)", "100ml"],
  ["517-PTCRH", "Creed", "Viking", "100ml"],
  ["359-CARMCR", "Creed", "Carmina", "75ml"],
  ["045-CAR", "Creed", "Carmina", "75ml"],
  ["363-TOPCRSP", "Creed", "Spring Flower", "75ml"],
  ["522-CRHUA", "Creed", "Spring Flower (Pink)", "75ml"],
  ["252-PTSPRING", "Creed", "Spring Flower", "75ml"],

  // --- MFK ---
  ["511-MFPTH", "MFK", "Baccarat Rouge 540 Extrait (Red)", "70ml"],
  ["147-MFKfanghong", "MFK", "Baccarat Rouge 540 Extrait (Red)", "70ml"],
  ["186-XINDA540HONG", "MFK", "Baccarat Rouge 540 Extrait", "70ml"],
  ["512-MFBPT", "MFK", "Baccarat Rouge 540 (White)", "70ml"],
  ["262-fangbai540", "MFK", "Baccarat Rouge 540 (White)", "70ml"],
  ["293-DABAIma", "MFK", "Baccarat Rouge 540", "70ml"],
  ["184-OUDlanDA", "MFK", "Oud Satin Mood", "70ml"],
  ["548-OUDPT", "MFK", "Oud Satin Mood", "70ml"],
  ["207-DAOUDJIN", "MFK", "Oud Silk Mood", "70ml"],
  ["453-MFKALA", "MFK", "À la rose", "70ml"],
  ["152-APOM", "MFK", "APOM", "70ml"],
  ["509-AQMFK", "MFK", "Aqua Universalis", "70ml"],
  ["655-GENT", "MFK", "Gentle Fluidity Silver", "70ml"],
  ["680-BEAU", "MFK", "Le Beau Parfum", "70ml"],
  ["392-LEBEZI", "MFK", "724 (Gift Set)", "70ml"],
  ["231-MFK4PC", "MFK", "Miniature Set (4x5ml)", "20ml"],

  // --- DIOR ---
  ["589-EDPSA", "Dior", "Sauvage", "100ml"],
  ["114-EDPSAU", "Dior", "Sauvage", "100ml"],
  ["043-TOPKUANG", "Dior", "Sauvage", "100ml"],
  ["314-PTKUANG", "Dior", "Sauvage", "100ml"],
  ["374-SAPAR", "Dior", "Sauvage Parfum", "100ml"],
  ["588-ELISA", "Dior", "Sauvage Elixir", "60ml"],
  ["029-SAELG", "Dior", "Sauvage Elixir", "60ml"],
  ["201-DAHOMM", "Dior", "Homme", "100ml"],
  ["206-HOPAR", "Dior", "Homme Parfum", "100ml"],
  ["540-HOMT", "Dior", "Homme Sport", "125ml"],
  ["112-JAWATE", "Dior", "J'adore L'eau", "100ml"],
  ["044-JADOEDP", "Dior", "J'adore", "100ml"],
  ["239-MISABS", "Miss Dior", "Miss Dior (Gift Set)", "100ml"],
  ["051-MISSBLO", "Miss Dior", "Blooming Bouquet", "100ml"],
  ["237-MISEDP", "Miss Dior", "Eau de Parfum", "100ml"],
  ["654-MIPA", "Miss Dior", "Parfum", "100ml"],

  // --- YSL ---
  ["306-HOPIUPT", "YSL", "Black Opium", "90ml"],
  ["587-LANOP", "YSL", "Black Opium Intense", "90ml"],
  ["117-OPIU", "YSL", "Black Opium", "90ml"],
  ["673-OPEX", "YSL", "Black Opium Extreme", "90ml"],
  ["674-OPRE", "YSL", "Black Opium Over Red", "90ml"],
  ["217-GOPIU", "YSL", "Black Opium Over Red", "90ml"],
  ["675-OPGL", "YSL", "Black Opium Illicit Green", "90ml"],
  ["191-YLELI", "YSL", "Y Le Parfum", "100ml"],
  ["133-GLEPAR", "YSL", "Y Eau de Parfum", "100ml"],
  ["567-YSINT", "YSL", "Y Men Le Parfum", "100ml"],
  ["228-YSEDT", "YSL", "Y Men EDT", "100ml"],
  ["531-YSEAU", "YSL", "Y Eau de Toilette", "100ml"],
  ["121-GYSEAU", "YSL", "Y", "100ml"],
  ["019-LEPARYS", "YSL", "Y Men Eau de Parfum", "100ml"],
  ["118-LIBRE", "YSL", "Libre", "90ml"],
  ["193-TOPLIBRE", "YSL", "Libre", "90ml"],
  ["248-EDPLIB", "YSL", "Libre Eau de Parfum", "90ml"],
  ["198-LIBLEP", "YSL", "Libre Le Parfum", "90ml"],
  ["194-LIBFLOW", "YSL", "Libre Flowers & Flames", "90ml"],
  ["459-LIBLE", "YSL", "Libre L'Absolu Platine", "90ml"],
  ["697-LIVA", "YSL", "Libre", "90ml"],
  ["369-PTMYSLE", "YSL", "MYSLF", "100ml"],
  ["230-MYSLE", "YSL", "MYSLF", "100ml"],
  ["107-MYSLF", "YSL", "MYSLF Refillable", "100ml"],
  ["565-MYLA", "YSL", "MYSLF Le Parfum", "100ml"],
  ["227-MONPAR", "YSL", "Mon Paris", "90ml"],
  ["315-PTMON", "YSL", "Mon Paris", "90ml"],
  ["661-SEME", "YSL", "Mon Paris", "90ml"],
  ["612-BOUQ", "YSL", "Wild Leather", "125ml"],

  // --- LOUIS VUITTON ---
  ["581-PACLV", "Louis Vuitton", "Pacific Chill", "100ml"],
  ["580-IMALV", "Louis Vuitton", "Imagination", "100ml"],
  ["582-CALLV", "Louis Vuitton", "California Dream", "100ml"],
  ["579-AFTLV", "Louis Vuitton", "Afternoon Swim", "100ml"],
  ["637-LIMM", "Louis Vuitton", "L'Immensité", "100ml"],
  ["632-OMBR", "Louis Vuitton", "Ombre Nomade", "100ml"],
  ["633-SUN", "Louis Vuitton", "Sun Song", "100ml"],
  ["634-LOERS", "Louis Vuitton", "Lovers", "100ml"],
  ["662-PURA", "Louis Vuitton", "Pur Oud", "100ml"],

  // --- XERJOFF ---
  ["439-XERH", "Xerjoff", "Erba Pura", "100ml"],
  ["440-LXER", "Xerjoff", "Naxos", "100ml"],
  ["541-XERHE", "Xerjoff", "Alexandria II", "100ml"],
  ["569-XEAC", "Xerjoff", "Accento", "100ml"],
  ["577-ZIXER", "Xerjoff", "Purple Accento", "100ml"],
  ["578-ZOXER", "Xerjoff", "Opera", "100ml"],
  ["570-MUXE", "Xerjoff", "Muse", "100ml"],
  ["573-EXWA", "Xerjoff", "Wardasina", "100ml"],
  ["571-JOFF", "Xerjoff", "Erba Gold", "100ml"],

  // --- INITIO ---
  ["602-INSID", "Initio", "Side Effect", "90ml"],
  ["611-MUSK", "Initio", "Musk Therapy", "90ml"],
  ["603-INOUD", "Initio", "Oud for Greatness", "90ml"],
  ["692-INPA", "Initio", "Paragon", "90ml"],
  ["693-INEDP", "Initio", "Oud for Happiness", "90ml"],
  ["710-ATOM", "Initio", "Atomic Rose", "90ml"],

  // --- PARFUMS DE MARLY ---
  ["161-MALFEN", "Parfums de Marly", "Delina", "75ml"],
  ["192-EXCLFEN", "Parfums de Marly", "Delina Exclusif", "75ml"],
  ["334-MALrose", "Parfums de Marly", "Delina La Rosée", "75ml"],
  ["215-GhongfenMAL", "Parfums de Marly", "Oriana", "75ml"],
  ["352-VALAYA", "Parfums de Marly", "Valaya", "75ml"],
  ["487-VALEX", "Parfums de Marly", "Valaya", "75ml"],
  ["277-PALA", "Parfums de Marly", "Palatine", "75ml"],
  ["210-SAFAN", "Parfums de Marly", "Safanad", "75ml"],
  ["005-MELI", "Parfums de Marly", "Meliora", "75ml"],
  ["613-LAEDP", "Parfums de Marly", "Layton", "125ml"],
  ["142-TOPLAYTON", "Parfums de Marly", "Layton", "125ml"],
  ["208-LAEXC", "Parfums de Marly", "Layton Exclusif", "125ml"],
  ["218-MALYcheng75", "Parfums de Marly", "Althaïr", "125ml"],
  ["254-ALTH125", "Parfums de Marly", "Althaïr", "125ml"],
  ["148-TOPPEGASU", "Parfums de Marly", "Pegasus", "125ml"],
  ["146-EXCLUS", "Parfums de Marly", "Pegasus Exclusif", "125ml"],
  ["164-TOPKALAN", "Parfums de Marly", "Kalan", "125ml"],
  ["600-HERO", "Parfums de Marly", "Herod", "125ml"],
  ["209-GREE", "Parfums de Marly", "Greenley", "125ml"],
  ["598-CAST", "Parfums de Marly", "Carlisle", "125ml"],
  ["266-TOPMAjin", "Parfums de Marly", "Haltane", "125ml"],
  ["145-HALTAN125", "Parfums de Marly", "Haltane", "125ml"],
  ["630-PERS", "Parfums de Marly", "Perseus", "125ml"],

  // --- SKINCARE ARCHIVE ---
  ["583-BLEM", "Skinceuticals", "Blemish + Age", "30ml"],
  ["066-CEFE", "Skinceuticals", "C E Ferulic", "30ml"],
  ["085-DEFE", "Skinceuticals", "Discoloration Defense", "30ml"],
  ["084-PHLOR", "Skinceuticals", "Phloretin CF", "30ml"],
  ["083-PHYT", "Skinceuticals", "Phyto Corrective", "30ml"],
  ["576-HAIN", "Skinceuticals", "H.A. Intensifier", "30ml"],
  ["095-LAJIN30", "La Mer", "The Concentrate", "30ml"],
  ["096-LAMER60", "La Mer", "Soft Cream", "60ml"],
  ["101-MER30ML", "La Mer", "Crème de la Mer", "30ml"],
  ["158-HAILAN100ML", "La Mer", "Crème de la Mer", "100ml"]
];

export const DISCOUNTS = [
  "LA LOCAL PICKUP: 90015",
  "USE CODE 'PLUG25' FOR BUNDLES",
  "NEW DROP: PARFUMS DE MARLY",
  "AUTHENTICITY VERIFIED",
  "EST. 2025 ARCHIVE"
];

const grouped: Record<string, Product> = {};

rawData.forEach(([id, brand, name, spec]) => {
  const key = `${brand}-${name}-${spec}`;
  if (grouped[key]) {
    grouped[key].ids.push(id);
  } else {
    const isSkincare = brand === 'La Mer' || brand === 'Skinceuticals' || name.toLowerCase().includes('cream') || name.toLowerCase().includes('crème');
    
    let image = IMAGES.DARK;
    const b = brand.toLowerCase();
    const n = name.toLowerCase();
    
    if (isSkincare) image = IMAGES.SKIN;
    else if (b.includes('chanel')) image = IMAGES.MONO;
    else if (b.includes('valentino')) image = IMAGES.VALENTINO;
    else if (b.includes('creed')) image = IMAGES.CLEAN;
    else if (b.includes('mfk')) image = n.includes('hong') || n.includes('red') ? IMAGES.RED : IMAGES.MONO;
    else if (b.includes('parfums de marly')) image = IMAGES.PURPLE;
    else if (b.includes('louis vuitton')) image = IMAGES.GREEN;
    else if (b.includes('tom ford')) image = IMAGES.TOMFORD;

    let price = 145;
    if (b.includes('mfk')) price = 385;
    else if (b.includes('creed')) price = 340;
    else if (b.includes('louis vuitton')) price = 285;
    else if (b.includes('la mer')) price = 380;
    else if (b.includes('parfums de marly')) price = 320;
    else if (b.includes('xerjoff')) price = 310;
    else if (b.includes('initio')) price = 290;

    grouped[key] = {
      ids: [id],
      brand,
      name,
      spec,
      condition: 'Sealed',
      stock: Math.floor(Math.random() * 25) + 5,
      price,
      category: isSkincare ? 'Skincare' : 'Fragrance',
      image,
      details: DEFAULT_DETAILS(brand, name)
    };
  }
});

export const INVENTORY: Product[] = Object.values(grouped);
