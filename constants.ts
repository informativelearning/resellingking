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
  "Bleu de Chanel": { description: "The definitive aromatic-woody masculine fragrance. Timeless and versatile.", projection: "STRONG", sillage: "HEAVY" },
  "Baccarat Rouge 540": { description: "Luminous and sophisticated, an amber, floral, and woody breeze.", projection: "BEAST MODE", sillage: "ETERNAL" },
  "Aventus": { description: "Successful, powerful, and iconic. The masterpiece of the house.", projection: "STRONG", sillage: "EXCEPTIONAL" },
  "Born in Roma": { description: "A celebration of self-expression and heritage. Edgy yet sophisticated.", projection: "STRONG", sillage: "MODERATE" },
  "Crème de la Mer": { description: "The legendary cream that transforms skin with the Miracle Broth™.", serialStatus: "BOUTIQUE SEALED", coverage: "ULTRA-RICH" },
  "Imagination": { description: "The key to boldness. An overdose of ambroxan and citrus.", projection: "STRONG", sillage: "MODERATE" }
};

const DEFAULT_DETAILS = (brand: string, name: string): ProductDetails => {
  const n = name.toLowerCase();
  const sortedKeys = Object.keys(ARCHIVE_DB).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    if (n.includes(key.toLowerCase())) return ARCHIVE_DB[key] as ProductDetails;
  }
  return {
    description: `Verified authentic ${brand} archive entry. 2024/2025 Batch.`,
    projection: "STRONG",
    sillage: "HEAVY",
    topNotes: ["Bergamot", "Citrus"],
    heartNotes: ["Geranium", "Lavender"],
    baseNotes: ["Sandalwood", "Amber"]
  };
};

// FULL MANIFEST Pages 1-14
const rawData: [string, string, string, string][] = [
  // --- PAGE 1 (Chanel) ---
  ["123-FENVAP100", "Chanel", "Coco Mademoiselle", "100ml"],
  ["053-FENCOVAPG", "Chanel", "Coco Mademoiselle", "100ml"],
  ["098-PTDAFUCO", "Chanel", "Coco Mademoiselle", "100ml"],
  ["099-PTNIGHCO", "Chanel", "Coco Mademoiselle", "100ml"],
  ["109-COHEIPT", "Chanel", "Coco Noir", "100ml"],
  ["097-HEICOVAP", "Chanel", "Coco Noir", "100ml"],
  ["126-GVAPCOHEI", "Chanel", "Coco Noir", "100ml"],
  ["028-COHEITOP", "Chanel", "Coco Noir", "100ml"],
  ["054-CONIGHTG", "Chanel", "Coco Noir", "100ml"],
  ["223-ALLCO", "Chanel", "Allure Homme Sport", "100ml"],
  ["115-SPOREDT", "Chanel", "Allure Homme Sport", "100ml"],
  ["454-ALHO", "Chanel", "Allure Homme", "100ml"],
  ["012-PTJINBL", "Chanel", "Bleu de Chanel", "100ml"],
  ["018-PTBLUEDP", "Chanel", "Bleu de Chanel", "100ml"],
  ["067-PTBLUE", "Chanel", "Bleu de Chanel", "100ml"],
  ["104-PTXHHUANG", "Chanel", "Chance (Yellow/EDT)", "100ml"],
  ["035-CHXHDAN", "Chanel", "Chance Eau Tendre (Pink)", "100ml"],
  ["472-HON5", "Chanel", "N°5 Red Edition", "100ml"],
  ["105-LVPTXH", "Chanel", "Chance Eau Fraiche (Green)", "100ml"],
  ["120-N5HPT", "Chanel", "N°5 L'Eau", "100ml"],
  ["308-PTBAIN5", "Chanel", "N°5", "100ml"],
  ["627-ESSPT", "Chanel", "Gabrielle", "100ml"],

  // --- PAGE 2 (Valentino) ---
  ["271-PTVAYELL", "Valentino", "Uomo Born in Roma Yellow Dream", "100ml"],
  ["294-PTVAGOLD", "Valentino", "Uomo Born in Roma Yellow Dream", "100ml"],
  ["269-PTDONNA", "Valentino", "Donna Born in Roma", "100ml"],
  ["136-PTINETVA", "Valentino", "Uomo Born in Roma", "100ml"],
  ["130-INETVA", "Valentino", "Uomo Born in Roma", "100ml"],
  ["484-VABOPT", "Valentino", "Uomo Born in Roma", "100ml"],
  ["399-PTVAUO", "Valentino", "Uomo Born in Roma", "100ml"],
  ["558-PTVAEX", "Valentino", "Uomo Born in Roma", "100ml"],
  ["614-VAEXPT", "Valentino", "Uomo Born in Roma", "100ml"],
  ["137--PTVALEHON", "Valentino", "Voce Viva", "100ml"],
  ["485-PTVACOR", "Valentino", "Uomo Born in Roma Coral Fantasy", "100ml"],
  ["205-PTCORAVA", "Valentino", "Donna Born in Roma Coral Fantasy", "100ml"],
  ["342-PTVAPIN", "Valentino", "Donna Born in Roma Pink PP", "100ml"],
  ["407-PTDRE", "Valentino", "Donna Born in Roma Green Stravaganza", "100ml"],
  ["559-PTVAST", "Valentino", "Uomo Born in Roma Green Stravaganza", "100ml"],
  ["268-PTGREEVA", "Valentino", "Donna Born in Roma Green Stravaganza", "100ml"],
  ["584-UOINPT", "Valentino", "Uomo Intense", "100ml"],
  ["037-ROCK", "Valentino", "Uomo Born in Roma Rockstud Noir", "100ml"],
  ["219-UOIVPT", "Valentino", "Donna Born in Roma Yellow Dream", "100ml"],
  ["241-VIOPT", "Valentino", "Voce Viva Intensa", "100ml"],

  // --- PAGE 3 (YSL & MFK) ---
  ["306-HOPIUPT", "YSL", "Black Opium", "90ml"],
  ["117-OPIU", "YSL", "Black Opium", "90ml"],
  ["587-LANOP", "YSL", "Black Opium Intense", "90ml"],
  ["019-LEPARYS", "YSL", "Y Men Eau de Parfum", "100ml"],
  ["567-YSINT", "YSL", "Y Men Le Parfum", "100ml"],
  ["020-EAUFRAYS", "YSL", "Y Eau Fraiche", "100ml"],
  ["021-YSEAUDE", "YSL", "Y Men", "100ml"],
  ["228-YSEDT", "YSL", "Y Men EDT", "100ml"],
  ["315-PTMON", "YSL", "Mon Paris", "90ml"],
  ["118-LIBRE", "YSL", "Libre", "90ml"],
  ["677-YVEAU", "YSL", "Libre", "90ml"],
  ["687-LILE", "YSL", "Libre", "90ml"],
  ["369-PTMYSLE", "YSL", "MYSLF", "100ml"],
  ["361-PTMYSL", "YSL", "MYSLF", "100ml"],
  ["427-YSMAN", "YSL", "Manifesto", "90ml"],
  ["511-MFPTH", "MFK", "Baccarat Rouge 540 Extrait (Red)", "70ml"],
  ["512-MFBPT", "MFK", "Baccarat Rouge 540 (White)", "70ml"],

  // --- PAGE 4 (MFK, Dior, CH) ---
  ["147-MFKfanghong", "MFK", "Baccarat Rouge 540 Extrait (Red)", "70ml"],
  ["262-fangbai540", "MFK", "Baccarat Rouge 540 (White)", "70ml"],
  ["548-OUDPT", "MFK", "Oud Satin Mood", "70ml"],
  ["589-EDPSA", "Dior", "Sauvage", "100ml"],
  ["314-PTKUANG", "Dior", "Sauvage", "100ml"],
  ["588-ELISA", "Dior", "Sauvage Elixir", "60ml"],
  ["425-GOBAI", "Carolina Herrera", "Good Girl (White/Gold)", "80ml"],
  ["323-PTCARHEI", "Carolina Herrera", "Good Girl (Black)", "80ml"],
  ["313-PTGODAZI", "Carolina Herrera", "Good Girl Dazzling Garden", "80ml"],
  ["592-PTGOIT", "Carolina Herrera", "Very Good Girl Glam", "80ml"],
  ["166-GLAM", "Carolina Herrera", "Very Good Girl Glam", "80ml"],
  ["303-PTITS", "Carolina Herrera", "Good Girl", "80ml"],
  ["698-CARO", "Carolina Herrera", "Good Girl", "80ml"],
  ["302-PTGOFAN", "Carolina Herrera", "Good Girl (Light Blue/Glitter)", "80ml"],
  ["176-BLUS", "Carolina Herrera", "Good Girl Blush", "80ml"],
  ["153-ITSS", "Carolina Herrera", "Very Good Girl (Red)", "80ml"],
  ["431-HEROH", "Carolina Herrera", "212 Heroes (Pink Skateboard)", "90ml"],
  ["432-HERHY", "Carolina Herrera", "212 Heroes (Silver Skateboard)", "90ml"],

  // --- PAGE 5 (CH & JPG) ---
  ["299-WILDPT", "Carolina Herrera", "212 VIP Rosé", "80ml"],
  ["321-HUALABE", "Jean Paul Gaultier", "La Belle", "100ml"],
  ["387-JPPAR", "Jean Paul Gaultier", "La Belle Le Parfum", "100ml"],
  ["533-GAUPT", "Jean Paul Gaultier", "Scandal Pour Homme", "100ml"],
  ["238-LEPATONG", "Jean Paul Gaultier", "Le Male Le Parfum", "125ml"],
  ["151-LEPAZHI", "Jean Paul Gaultier", "Le Male Le Parfum", "125ml"],
  ["259-LEMAhei125zi", "Jean Paul Gaultier", "Le Male Le Parfum", "125ml"],
  ["337-LEHUA", "Jean Paul Gaultier", "Le Beau", "125ml"],
  ["167-LELOE", "Jean Paul Gaultier", "Le Beau", "125ml"],
  ["368-LEBEA", "Jean Paul Gaultier", "Le Beau Paradise Garden", "125ml"],
  ["242-JINTONG", "Jean Paul Gaultier", "Le Male Elixir", "125ml"],
  ["257-JINLEMAZI", "Jean Paul Gaultier", "Le Male Elixir", "125ml"],
  ["159-HEITONG", "Jean Paul Gaultier", "Le Male (Black)", "125ml"],
  ["585-UITR", "Jean Paul Gaultier", "Ultra Male", "125ml"],
  ["225-UITR", "Jean Paul Gaultier", "Le Male (Silver)", "125ml"],
  ["286-LEMAlvzi", "Jean Paul Gaultier", "Le Male (Green)", "125ml"],
  ["165-LEMAZI", "Jean Paul Gaultier", "Le Male (Teal)", "125ml"],
  ["590-LEY", "Jean Paul Gaultier", "Le Male Pride Edition", "125ml"],

  // --- PAGE 6 (Gucci, Prada, Armani) ---
  ["685-ONLY", "Dolce & Gabbana", "The Only One", "100ml"],
  ["437-GUCH", "Gucci", "Flora Gorgeous Gardenia", "100ml"],
  ["438-GUPO", "Gucci", "Guilty Pour Homme", "90ml"],
  ["471-GUBLV", "Gucci", "Flora Gorgeous Jasmine", "100ml"],
  ["586-GUILPT", "Gucci", "Guilty Gold", "90ml"],
  ["615-GULOV", "Gucci", "Guilty Love Edition", "90ml"],
  ["618-HABGU", "Gucci", "Guilty Red", "90ml"],
  ["617-LOHGU", "Gucci", "Guilty Pour Femme (Purple)", "90ml"],
  ["616-ABGU", "Gucci", "Guilty Absolute", "90ml"],
  ["688-AMBR", "Gucci", "The Alchemist's Garden (A Gloaming Night)", "100ml"],
  ["689-BLPA", "Gucci", "The Alchemist's Garden (The Voice of the Snake)", "100ml"],
  ["690-BLOO", "Gucci", "Bloom", "100ml"],
  ["276-PTPARADO", "Prada", "Paradoxe", "90ml"],
  ["031-GIOLAN100", "Armani", "Acqua di Gio Profondo", "100ml"],
  ["041-HEIGIO", "Armani", "Acqua di Gio Profumo", "125ml"],
  ["183-BAIGIO", "Armani", "Acqua di Gio", "100ml"],
  ["346-DAHUGIO", "Armani", "Acqua di Gio Absolu", "125ml"],

  // --- PAGE 7 (Armani & Versace) ---
  ["348-PTYOUAB", "Armani", "Stronger With You", "100ml"],
  ["003-STAR", "Armani", "Stronger With You", "100ml"],
  ["338-PTYOPA", "Armani", "Stronger With You Intensely", "100ml"],
  ["090-YAMB", "Armani", "Stronger With You Amber", "100ml"],
  ["267-PTYOUBE", "Armani", "Stronger With You Freeze", "100ml"],
  ["629-FREE", "Armani", "Stronger With You Freeze", "100ml"],
  ["002-INLOVE", "Armani", "In Love With You", "100ml"],
  ["448-ACQU", "Armani", "Acqua di Gioia", "100ml"],
  ["055-MYWAY", "Armani", "My Way", "90ml"],
  ["381-CODEDP", "Armani", "Code", "125ml"],
  ["175-ARCODE", "Armani", "Code Parfum", "125ml"],
  ["155-HONGVERS", "Versace", "Eros Flame", "100ml"],
  ["384-VERNAJ", "Versace", "Eros Flame", "100ml"],
  ["160-VERSLAN", "Versace", "Eros", "100ml"],
  ["256-PTVERPAR", "Versace", "Eros", "100ml"],
  ["258-EDPPTVELA", "Versace", "Dylan Blue", "100ml"],
  ["287-ZUANZI", "Versace", "Crystal Noir", "90ml"],
  ["274-PTVERHUA", "Versace", "Bright Crystal", "90ml"],
  ["264-PTHUANGZ", "Versace", "Yellow Diamond", "90ml"],

  // --- PAGE 8 (Versace, Azzaro, Creed) ---
  ["312-VEMANPT", "Versace", "Man Eau Fraiche", "100ml"],
  ["518-VEBRPT", "Versace", "Bright Crystal", "90ml"],
  ["434-ABVER", "Versace", "Bright Crystal Absolu", "90ml"],
  ["263-PTFENZ", "Versace", "Bright Crystal", "90ml"],
  ["297-DYLA", "Versace", "Dylan Blue", "100ml"],
  ["309-POHVEPT", "Versace", "Pour Homme", "100ml"],
  ["534-WAELI", "Azzaro", "Wanted", "100ml"],
  ["169-WBY", "Azzaro", "Wanted", "100ml"],
  ["473-WAEDT", "Azzaro", "Wanted", "100ml"],
  ["354-INTWAT", "Azzaro", "The Most Wanted", "100ml"],
  ["156-MOSTWAT", "Azzaro", "The Most Wanted (Black)", "100ml"],
  ["189-WAT100", "Azzaro", "Wanted By Night", "100ml"],
  ["537-WAEDP", "Azzaro", "Chrome", "100ml"],
  ["036-PTABS", "Creed", "Aventus (Black Label)", "100ml"],
  ["291-PTCRHEI100", "Creed", "Aventus (Black Label)", "100ml"],
  ["460-CRWINPT", "Creed", "Aventus For Her", "75ml"],
  ["397-PTQUCR", "Creed", "Aventus (White/Silver Label)", "100ml"],
  ["405-PTDEL", "Creed", "Viking (Red)", "100ml"],

  // --- PAGE 9 (Creed, Tom Ford, Le Labo) ---
  ["403-PTCEN", "Creed", "Aventus (10th Anniversary Red)", "100ml"],
  ["335-CRBA10", "Creed", "Silver Mountain Water", "100ml"],
  ["341-CRwhite", "Creed", "Silver Mountain Water", "100ml"],
  ["211-CRblack120", "Creed", "Aventus", "100ml"],
  ["135-CRROY", "Creed", "Millesime Imperial", "100ml"],
  ["251-Crquanjin", "Creed", "Millesime Imperial", "100ml"],
  ["345-CRquanhei", "Creed", "Green Irish Tweed", "100ml"],
  ["282-CRNV100", "Creed", "Aventus (White Label)", "100ml"],
  ["252-PTSPRING", "Creed", "Spring Flower", "75ml"],
  ["522-CRHUA", "Creed", "Spring Flower (Pink)", "75ml"],
  ["517-PTCRH", "Creed", "Viking", "100ml"],
  ["045-CAR", "Creed", "Carmina", "75ml"],
  ["546-PTTFPE", "Tom Ford", "Bitter Peach", "50ml"],
  ["316-VANTFPT", "Tom Ford", "Tobacco Vanille", "100ml"],
  ["560-SOTF", "Tom Ford", "Soleil Blanc", "50ml"],
  ["404-PTSOL", "Tom Ford", "Soleil Blanc", "50ml"],
  ["317-OUDHUIPT", "Tom Ford", "Oud Wood", "100ml"],
  ["329-PTROSET", "Tom Ford", "Rose Prick", "50ml"],
  ["034-NOIR29IN", "Le Labo", "The Noir 29", "100ml"],
  ["330-TFEBRPT", "Tom Ford", "Ebene Fume", "50ml"],

  // --- PAGE 10 (Tom Ford & Boss) ---
  ["125-TFORCHEI", "Tom Ford", "Black Orchid", "100ml"],
  ["122-TFNOIR", "Tom Ford", "Noir Extreme", "100ml"],
  ["222-NEIPT", "Tom Ford", "White Suede", "50ml"],
  ["289-PTTFVEZI", "Tom Ford", "Velvet Orchid", "100ml"],
  ["343-PTSEXTF", "Tom Ford", "Vanilla Sex (Gold Label)", "50ml"],
  ["406-CAFEPT", "Tom Ford", "Cafe Rose", "50ml"],
  ["402-PTWHI", "Tom Ford", "White Patchouli", "100ml"],
  ["324-TFOMBPT", "Tom Ford", "Ombre Leather", "100ml"],
  ["050-DOMB", "Tom Ford", "Ombre Leather", "100ml"],
  ["429-PTWH", "Tom Ford", "Black Orchid Style", "100ml"],
  ["328-PTSOLTF", "Tom Ford", "Soleil Brulant", "50ml"],
  ["486-PTLOST", "Tom Ford", "Lost Cherry", "50ml"],
  ["524-FABPT", "Tom Ford", "Fucking Fabulous", "50ml"],
  ["626-JASPT", "Tom Ford", "Jasmin Rouge", "50ml"],
  ["679-POUR", "Tom Ford", "Noir", "100ml"],
  ["608-BOTT", "Hugo Boss", "Bottled", "100ml"],
  ["607-OUDS", "Hugo Boss", "Bottled Oud", "100ml"],
  ["605-ABSO", "Hugo Boss", "The Scent Absolute", "100ml"],
  ["609-TONIC", "Hugo Boss", "Bottled Tonic", "100ml"],

  // --- PAGE 11 (Boss, Polo, Paco) ---
  ["604-BOLD", "Hugo Boss", "Bottled", "100ml"],
  ["625-BOEDT", "Hugo Boss", "Boss", "100ml"],
  ["678-TTLE", "Hugo Boss", "Bottled", "100ml"],
  ["536-PORE", "Ralph Lauren", "Polo Red", "125ml"],
  ["545-POBU", "Ralph Lauren", "Polo Blue", "125ml"],
  ["396-MILEL", "Paco Rabanne", "1 Million Elixir", "100ml"],
  ["433-MILRO", "Paco Rabanne", "1 Million Royal", "100ml"],
  ["428-PACO", "Paco Rabanne", "1 Million", "100ml"],
  ["458-MIGOL", "Paco Rabanne", "1 Million", "100ml"],
  ["022-MILLJIN", "Paco Rabanne", "1 Million", "100ml"],
  ["023-ZONGMIIL", "Paco Rabanne", "1 Million", "100ml"],
  ["025-YINMIL", "Paco Rabanne", "1 Million", "100ml"],
  ["278-MIBLAC", "Paco Rabanne", "1 Million Prive", "100ml"],
  ["281-MILPAR", "Paco Rabanne", "1 Million Parfum", "100ml"],
  ["372-OLYM", "Paco Rabanne", "Olympea", "80ml"],
  ["436-PHAPT", "Paco Rabanne", "Phantom", "100ml"],
  ["182-PHANT100", "Paco Rabanne", "Phantom", "100ml"],
  ["457-PHPA", "Paco Rabanne", "Phantom (Black)", "100ml"],
  ["435-PTFAME", "Paco Rabanne", "Fame", "80ml"],

  // --- PAGE 12 (Lancome, Burberry, D&G, VS) ---
  ["606-FLOW", "Lancôme", "La Vie Est Belle", "100ml"],
  ["426-PTLA", "Lancôme", "La Vie Est Belle", "100ml"],
  ["017-LAVIPT", "Lancôme", "La Vie Est Belle", "100ml"],
  ["461-DOLP", "Lancôme", "Idole", "75ml"],
  ["549-IDNE", "Lancôme", "Idole Nectar", "75ml"],
  ["307-MIRAPT", "Lancôme", "Miracle", "100ml"],
  ["620-MENTO", "Burberry", "Mr. Burberry", "100ml"],
  ["619-TOWO", "Burberry", "My Burberry", "90ml"],
  ["326-HERDEP", "Burberry", "Her", "100ml"],
  ["079-ROSEDA", "Burberry", "Classic", "100ml"],
  ["455-DOLC", "Dolce & Gabbana", "K", "100ml"],
  ["561-DOGAH", "Dolce & Gabbana", "Q", "100ml"],
  ["564-ANG", "Mugler", "Angel", "100ml"],
  ["535-ALIE", "Mugler", "Alien", "90ml"],
  ["593-HOVI", "Victoria's Secret", "Very Sexy (Red)", "100ml"],
  ["594-LANVI", "Victoria's Secret", "Very Sexy (Teal)", "100ml"],
  ["591-VIHE", "Victoria's Secret", "Very Sexy (Black)", "100ml"],
  ["007-BVLPO", "Bvlgari", "Pour Homme", "100ml"],

  // --- PAGE 13 (Guerlain, V&R, Hermes, Le Labo) ---
  ["290-BASI", "Guerlain", "Aqua Allegoria", "125ml"],
  ["466-HOVIK", "Viktor&Rolf", "Spicebomb Infrared", "90ml"],
  ["465-VKYIN", "Viktor&Rolf", "Spicebomb Night Vision", "90ml"],
  ["468-LVVIK", "Viktor&Rolf", "Spicebomb Night Vision", "90ml"],
  ["464-VIKJ", "Viktor&Rolf", "Spicebomb", "90ml"],
  ["667-VIDA", "Viktor&Rolf", "Spicebomb", "90ml"],
  ["668-VIME", "Viktor&Rolf", "Spicebomb (Silver)", "90ml"],
  ["110-DHER", "Hermès", "Terre d'Hermès", "100ml"],
  ["699-LENIL", "Hermès", "Un Jardin Sur Le Nil", "100ml"],
  ["700-DEMO", "Hermès", "Le Jardin de Monsieur Li", "100ml"],
  ["701-TOIT", "Hermès", "Un Jardin Sur Le Toit", "100ml"],
  ["229-IRIS", "Le Labo", "Iris 39", "100ml"],
  ["430-VETI", "Le Labo", "Vetiver 46", "100ml"],

  // --- PAGE 13-14 (30ML TRAVEL ARCHIVE) ---
  ["253-CR30ML", "Creed", "Aventus Travel Spray", "30ml"],
  ["284-BLU30ML", "Chanel", "Bleu de Chanel Travel Spray", "30ml"],
  ["272-VEHON30ML", "Versace", "Eros Flame Travel Spray", "30ml"],
  ["296-COCO30ML", "Chanel", "Coco Mademoiselle Travel Spray", "30ml"],
  ["261-VELAN30ML", "Versace", "Eros Travel Spray", "30ml"],

  // --- SKINCARE ARCHIVE (Supplemental) ---
  ["583-BLEM", "Skinceuticals", "Blemish + Age", "30ml"],
  ["066-CEFE", "Skinceuticals", "C E Ferulic", "30ml"],
  ["095-LAJIN30", "La Mer", "The Concentrate", "30ml"],
  ["096-LAMER60", "La Mer", "Soft Cream", "60ml"],
  ["101-MER30ML", "La Mer", "Crème de la Mer", "30ml"],
  ["158-HAILAN100ML", "La Mer", "Crème de la Mer", "100ml"]
];

export const DISCOUNTS = [
  "LA LOCAL PICKUP: 90015",
  "USE CODE 'FORTUNE25' FOR BUNDLES",
  "NEW DROP: PARFUMS DE MARLY",
  "AUTHENTICITY VERIFIED",
  "EST. 2025 ARCHIVE"
];

const grouped: Record<string, Product> = {};

rawData.forEach(([id, brand, name, spec]) => {
  // MASTER KEY: Brand + Name + VolumeSpec (normalized)
  const normalizedBrand = brand.trim();
  const normalizedName = name.trim();
  const normalizedSpec = spec.trim();
  const key = `${normalizedBrand}|${normalizedName}|${normalizedSpec}`.toLowerCase();
  
  if (grouped[key]) {
    // If exact product model + volume exists, just append the new SKU ID
    if (!grouped[key].ids.includes(id)) {
      grouped[key].ids.push(id);
    }
  } else {
    // New model entry
    const isSkincare = normalizedBrand === 'La Mer' || normalizedBrand === 'Skinceuticals' || normalizedName.toLowerCase().includes('cream') || normalizedName.toLowerCase().includes('crème');
    
    let image = IMAGES.DARK;
    const b = normalizedBrand.toLowerCase();
    const n = normalizedName.toLowerCase();
    
    if (isSkincare) image = IMAGES.SKIN;
    else if (b.includes('chanel')) image = IMAGES.MONO;
    else if (b.includes('valentino')) image = IMAGES.VALENTINO;
    else if (b.includes('creed')) image = IMAGES.CLEAN;
    else if (b.includes('mfk')) image = n.includes('hong') || n.includes('red') ? IMAGES.RED : IMAGES.MONO;
    else if (b.includes('parfums de marly')) image = IMAGES.PURPLE;
    else if (b.includes('louis vuitton')) image = IMAGES.GREEN;
    else if (b.includes('tom ford')) image = IMAGES.TOMFORD;

    let price = 145;
    if (b.includes('mfk') || b.includes('kilian')) price = 385;
    else if (b.includes('creed')) price = 340;
    else if (b.includes('la mer')) price = 380;
    else if (b.includes('parfums de marly')) price = 320;
    else if (normalizedSpec.includes('30ml')) price = 65;

    grouped[key] = {
      ids: [id],
      brand: normalizedBrand,
      name: normalizedName, 
      spec: normalizedSpec,
      condition: 'Sealed',
      stock: Math.floor(Math.random() * 25) + 5,
      price,
      category: isSkincare ? 'Skincare' : 'Fragrance',
      image,
      details: DEFAULT_DETAILS(normalizedBrand, normalizedName)
    };
  }
});

export const INVENTORY: Product[] = Object.values(grouped);
