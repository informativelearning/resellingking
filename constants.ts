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
  VALENTINO: "https://images.unsplash.com/photo-1594035910387-fea477942653?auto=format&fit=crop&w=800&q=80",
  TOMFORD: "https://images.unsplash.com/photo-1523293188086-b469b979756c?auto=format&fit=crop&w=800&q=80",
  // Valentino Products
  VALENTINO_UOMO_BORN: "/images/Uomo Born in Roma.jpg",
  VALENTINO_DONNA_BORN: "/images/Donna Born in Roma.jpg",
  VALENTINO_VOCE_VIVA: "/images/Voce Viva.jpg",
  VALENTINO_UOMO_INTENSE: "/images/Uomo Intense.jpg",
  // Creed Products
  CREED_ACQUA_FIORENTINA: "/images/Acqua Fiorentina.jpg",
  CREED_AVENTUS: "/images/Aventus.jpg",
  CREED_CARMINA: "/images/Carmina.jpg",
  CREED_DELPHINUS: "/images/Delphinus.jpg",
  CREED_EROLFA: "/images/Erolfa.webp",
  CREED_FLEURS_GARDENIA: "/images/Fleurs de Gardenia.png",
  CREED_FLORALIE: "/images/Floralie.png",
  CREED_GREEN_IRISH: "/images/Green Irish Tweed.jpg",
  CREED_HIMALAYA: "/images/Himalaya.jpg",
  CREED_JARDIN_AMALFI: "/images/Jardin d'Amalfi.jpg",
  CREED_LOVE_WHITE: "/images/Love in White.jpg",
  CREED_MILLESIME: "/images/Millesime Imperial.jpg",
  CREED_ORIGINAL_VETIVER: "/images/Original Vetiver.jpg",
  CREED_QUEEN_SILK: "/images/Queen of Silk.jpg",
  CREED_ROYAL_PRINCESS: "/images/Royal Princess Oud.jpg",
  CREED_SILVER_MOUNTAIN: "/images/Silver Mountain Water.jpg",
  CREED_SPRING_FLOWER: "/images/Spring Flower.jpg",
  CREED_VIKING: "/images/Viking.jpg",
  CREED_WHITE_FLOWERS: "/images/White Flowers.jpg"
};

const ARCHIVE_DB: Record<string, Partial<ProductDetails>> = {
  "Bleu de Chanel": { description: "The definitive aromatic-woody masculine fragrance. Timeless and versatile.", projection: "STRONG", sillage: "HEAVY" },
  "Baccarat Rouge 540": { description: "Luminous and sophisticated, an amber, floral, and woody breeze.", projection: "BEAST MODE", sillage: "ETERNAL" },
  "Aventus": { description: "Successful, powerful, and iconic. The masterpiece of the house.", projection: "STRONG", sillage: "EXCEPTIONAL" },
  "Born in Roma": { description: "A celebration of self-expression and heritage. Edgy yet sophisticated.", projection: "STRONG", sillage: "MODERATE" },
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

// COMPREHENSIVE FRAGRANCE INVENTORY
// Format: [brand, product_name, [volume1, volume2], [sku1, sku2, ...]]
const rawData: [string, string, string[], string[]][] = [
  // ========== CHANEL ==========
  ["Chanel", "Coco Mademoiselle", ["100ml", "30ml"], ["053-FENCOVAPG", "071-FUCOIN", "123-FENVAP100", "098-PTDAFUCO", "099-PTNIGHCO", "296-COCO30ML"]],
  ["Chanel", "Coco Noir", ["100ml"], ["054-CONIGHTG", "126-GVAPCOHEI", "028-COHEITOP", "109-COHEIPT", "097-HEICOVAP"]],
  ["Chanel", "Allure Homme Sport", ["100ml"], ["445-ALSPG", "659-SUPE", "660-EXTR", "223-ALLCO", "115-SPOREDT"]],
  ["Chanel", "Allure Homme", ["100ml"], ["221-ALLHOME", "454-ALHO"]],
  ["Chanel", "Allure", ["100ml"], ["077-ALLUH"]],
  ["Chanel", "Bleu de Chanel", ["100ml", "30ml"], ["062-EDTBLUG", "013-BLUTOPJIN", "094-TOPBLUE", "624-LEBLU", "012-PTJINBL", "018-PTBLUEDP", "067-PTBLUE", "284-BLU30ML"]],
  ["Chanel", "Chance Eau Tendre (Pink)", ["100ml"], ["596-XHDPH", "042-DANFENG", "052-XHNONGG", "035-CHXHDAN"]],
  ["Chanel", "Chance (Purple)", ["100ml"], ["467-XHZI"]],
  ["Chanel", "Chance Eau Fraiche (Green)", ["100ml"], ["456-XHLVEDP", "046-LVXHG", "105-LVPTXH"]],
  ["Chanel", "Chance (Yellow/EDT)", ["100ml"], ["104-PTXHHUANG"]],
  ["Chanel", "N°5", ["100ml"], ["116-TOPN5H", "049-N5BAIG", "472-HON5", "120-N5HPT", "308-PTBAIN5"]],
  ["Chanel", "Gabrielle", ["100ml"], ["311-ESSE", "627-ESSPT"]],

  // ========== DIOR ==========
  ["Dior", "Sauvage", ["100ml"], ["043-TOPKUANG", "374-SAPAR", "114-EDPSAU", "589-EDPSA", "314-PTKUANG"]],
  ["Dior", "Sauvage Elixir", ["60ml"], ["029-SAELG", "588-ELISA"]],
  ["Dior", "Homme", ["100ml", "125ml"], ["201-DAHOMM", "206-HOPAR", "540-HOMT"]],
  ["Dior", "J'adore", ["100ml"], ["112-JAWATE", "044-JADOEDP"]],
  ["Miss Dior", "Miss Dior", ["100ml", "Gift Set"], ["239-MISABS", "051-MISSBLO", "237-MISEDP", "631-DIES", "654-MIPA"]],

  // ========== YSL ==========
  ["YSL", "Y", ["100ml"], ["191-YLELI", "133-GLEPAR", "531-YSEAU", "121-GYSEAU", "019-LEPARYS", "567-YSINT", "020-EAUFRAYS", "021-YSEAUDE", "228-YSEDT"]],
  ["YSL", "Libre", ["90ml"], ["193-TOPLIBRE", "248-EDPLIB", "198-LIBLEP", "194-LIBFLOW", "459-LIBLE", "697-LIVA", "118-LIBRE", "677-YVEAU", "687-LILE"]],
  ["YSL", "MYSLF", ["100ml"], ["230-MYSLE", "107-MYSLF", "565-MYLA", "369-PTMYSLE", "361-PTMYSL"]],
  ["YSL", "Black Opium", ["90ml"], ["217-GOPIU", "673-OPEX", "674-OPRE", "675-OPGL", "306-HOPIUPT", "117-OPIU", "587-LANOP"]],
  ["YSL", "Mon Paris", ["90ml"], ["227-MONPAR", "661-SEME", "315-PTMON"]],
  ["YSL", "Wild Leather", ["125ml"], ["612-BOUQ"]],
  ["YSL", "Manifesto", ["90ml"], ["427-YSMAN"]],

  // ========== MFK (MAISON FRANCIS KURKDJIAN) ==========
  ["MFK", "Baccarat Rouge 540 Extrait", ["70ml"], ["186-XINDA540HONG", "511-MFPTH", "147-MFKfanghong"]],
  ["MFK", "Baccarat Rouge 540", ["70ml"], ["293-DABAIma", "512-MFBPT", "262-fangbai540"]],
  ["MFK", "Oud Satin Mood", ["70ml"], ["184-OUDlanDA", "548-OUDPT"]],
  ["MFK", "Oud Silk Mood", ["70ml"], ["207-DAOUDJIN"]],
  ["MFK", "À la rose", ["70ml"], ["453-MFKALA"]],
  ["MFK", "APOM", ["70ml"], ["152-APOM"]],
  ["MFK", "Aqua Universalis", ["70ml"], ["509-AQMFK"]],
  ["MFK", "Gentle Fluidity Silver", ["70ml"], ["655-GENT"]],
  ["MFK", "Le Beau Parfum", ["70ml"], ["680-BEAU"]],
  ["MFK", "724", ["Gift Set"], ["392-LEBEZI"]],
  ["MFK", "Miniature Set", ["4 x 5ml"], ["231-MFK4PC"]],

  // ========== PRADA ==========
  ["Prada", "Paradoxe", ["90ml"], ["245-PARVIR", "058-PARADO", "623-PRDI", "181-INTEPRADA", "276-PTPARADO"]],
  ["Prada", "Luna Rossa", ["100ml"], ["108-LUNA", "711-PBLA", "712-OCEA"]],
  ["Prada", "Infusion d'Iris", ["100ml"], ["409-PRADI"]],
  ["Prada", "Les Infusions", ["100ml"], ["628-DIGM"]],

  // ========== CAROLINA HERRERA ==========
  ["Carolina Herrera", "Good Girl", ["80ml"], ["075-GOBLUS", "093-ITSGO", "091-GOGL", "111-GODAZZ", "089-CARHEI", "657-VERY", "694-BOWT", "695-FENBO", "658-GOSP", "664-GIRL", "425-GOBAI", "323-PTCARHEI", "313-PTGODAZI", "592-PTGOIT", "166-GLAM", "303-PTITS", "698-CARO", "302-PTGOFAN", "176-BLUS", "153-ITSS"]],
  ["Carolina Herrera", "Bad Boy", ["100ml"], ["682-HREE", "683-COBA"]],
  ["Carolina Herrera", "212 Heroes", ["90ml"], ["431-HEROH", "432-HERHY"]],
  ["Carolina Herrera", "212 VIP Rosé", ["80ml"], ["299-WILDPT"]],

  // ========== LOUIS VUITTON ==========
  ["Louis Vuitton", "Pacific Chill", ["100ml"], ["581-PACLV"]],
  ["Louis Vuitton", "Imagination", ["100ml"], ["580-IMALV"]],
  ["Louis Vuitton", "California Dream", ["100ml"], ["582-CALLV"]],
  ["Louis Vuitton", "Afternoon Swim", ["100ml"], ["579-AFTLV"]],
  ["Louis Vuitton", "L'Immensité", ["100ml"], ["637-LIMM"]],
  ["Louis Vuitton", "Ombre Nomade", ["100ml"], ["632-OMBR"]],
  ["Louis Vuitton", "Sun Song", ["100ml"], ["633-SUN"]],
  ["Louis Vuitton", "Lovers", ["100ml"], ["634-LOERS"]],
  ["Louis Vuitton", "Pur Oud", ["100ml"], ["662-PURA"]],

  // ========== JEAN PAUL GAULTIER ==========
  ["Jean Paul Gaultier", "Divine", ["100ml"], ["371-GJINT"]],
  ["Jean Paul Gaultier", "Scandal", ["80ml"], ["639-JEAB", "640-JEIN", "642-JELE"]],
  ["Jean Paul Gaultier", "La Belle", ["100ml"], ["321-HUALABE", "387-JPPAR"]],
  ["Jean Paul Gaultier", "Scandal Pour Homme", ["100ml"], ["643-SCLE", "644-SCAB", "645-SCIN", "533-GAUPT"]],
  ["Jean Paul Gaultier", "Le Male", ["125ml"], ["238-LEPATONG", "151-LEPAZHI", "259-LEMAhei125zi", "242-JINTONG", "257-JINLEMAZI", "159-HEITONG", "585-UITR", "225-UITR", "286-LEMAlvzi", "165-LEMAZI", "590-LEY"]],
  ["Jean Paul Gaultier", "Le Beau", ["125ml"], ["337-LEHUA", "167-LELOE", "368-LEBEA"]],

  // ========== XERJOFF ==========
  ["Xerjoff", "Erba Pura", ["100ml"], ["439-XERH"]],
  ["Xerjoff", "Naxos", ["100ml"], ["440-LXER"]],
  ["Xerjoff", "Alexandria II", ["100ml"], ["541-XERHE"]],
  ["Xerjoff", "Accento", ["100ml"], ["569-XEAC", "577-ZIXER"]],
  ["Xerjoff", "Opera", ["100ml"], ["578-ZOXER"]],
  ["Xerjoff", "Muse", ["100ml"], ["570-MUXE"]],
  ["Xerjoff", "Wardasina", ["100ml"], ["573-EXWA"]],
  ["Xerjoff", "Erba Gold", ["100ml"], ["571-JOFF"]],
  ["Xerjoff", "Various", ["100ml"], ["636-XER"]],

  // ========== INITIO ==========
  ["Initio", "Side Effect", ["90ml"], ["602-INSID"]],
  ["Initio", "Musk Therapy", ["90ml"], ["611-MUSK"]],
  ["Initio", "Oud for Greatness", ["90ml"], ["603-INOUD"]],
  ["Initio", "Oud for Happiness", ["90ml", "Gift Set"], ["493-ABINI", "693-INEDP"]],
  ["Initio", "Paragon", ["90ml"], ["692-INPA"]],
  ["Initio", "Atomic Rose", ["90ml"], ["710-ATOM"]],

  // ========== PARFUMS DE MARLY ==========
  ["Parfums de Marly", "Delina", ["75ml"], ["192-EXCLFEN", "161-MALFEN", "334-MALrose"]],
  ["Parfums de Marly", "Oriana", ["75ml"], ["215-GhongfenMAL"]],
  ["Parfums de Marly", "Valaya", ["75ml"], ["352-VALAYA", "487-VALEX"]],
  ["Parfums de Marly", "Palatine", ["75ml"], ["277-PALA"]],
  ["Parfums de Marly", "Safanad", ["75ml"], ["210-SAFAN"]],
  ["Parfums de Marly", "Meliora", ["75ml"], ["005-MELI"]],
  ["Parfums de Marly", "Althaïr", ["125ml"], ["218-MALYcheng75", "254-ALTH125"]],
  ["Parfums de Marly", "Layton", ["125ml"], ["613-LAEDP", "142-TOPLAYTON", "208-LAEXC"]],
  ["Parfums de Marly", "Pegasus", ["125ml"], ["148-TOPPEGASU", "146-EXCLUS"]],
  ["Parfums de Marly", "Kalan", ["125ml"], ["164-TOPKALAN"]],
  ["Parfums de Marly", "Herod", ["125ml"], ["600-HERO"]],
  ["Parfums de Marly", "Greenley", ["125ml"], ["209-GREE"]],
  ["Parfums de Marly", "Carlisle", ["125ml"], ["598-CAST"]],
  ["Parfums de Marly", "Haltane", ["125ml"], ["266-TOPMAjin", "145-HALTAN125"]],
  ["Parfums de Marly", "Perseus", ["125ml"], ["630-PERS"]],

  // ========== LATTAFA ==========
  ["Lattafa", "Yara", ["100ml"], ["526-YAHO", "480-YABAI", "476-YAFEN"]],
  ["Lattafa", "Asad", ["100ml"], ["479-HEAS", "478-ASLAN", "477-ASAD"]],
  ["Lattafa", "Fakhar Gold", ["100ml"], ["481-CHEYA"]],
  ["Lattafa", "Pride", ["Gift Set"], ["521-LATPR"]],

  // ========== MARC JACOBS ==========
  ["Marc Jacobs", "Decadence", ["100ml"], ["124-LVTIBAO"]],

  // ========== GUCCI ==========
  ["Gucci", "Flora", ["100ml"], ["024-ZIGUCC", "040-FENGUCC", "106-GUCLV", "510-GUCH", "656-FLIN", "437-GUCH", "471-GUBLV"]],
  ["Gucci", "Bloom", ["100ml"], ["047-BLOMREDG", "690-BLOO"]],
  ["Gucci", "Guilty", ["90ml"], ["063-GUILTY", "438-GUPO", "586-GUILPT", "615-GULOV", "618-HABGU", "617-LOHGU", "616-ABGU"]],
  ["Gucci", "The Alchemist's Garden", ["100ml"], ["688-AMBR", "689-BLPA"]],

  // ========== ARMANI ==========
  ["Armani", "Acqua di Gio", ["100ml", "125ml"], ["076-GIOABSG", "418-GPRO", "031-GIOLAN100", "179-BAIGIOG", "183-BAIGIO", "197-GIOPAR", "033-GIOHEI125G", "041-HEIGIO", "346-DAHUGIO"]],
  ["Armani", "Stronger With You", ["100ml"], ["344-YOUABSG", "389-YOUTO", "610-YOPAR", "532-STRIN", "348-PTYOUAB", "003-STAR", "338-PTYOPA", "090-YAMB", "267-PTYOUBE", "629-FREE"]],
  ["Armani", "Code", ["125ml"], ["247-ARCODE", "381-CODEDP", "175-ARCODE"]],
  ["Armani", "My Way", ["90ml"], ["092-WAYPAR", "082-WAYGAO", "055-MYWAY"]],
  ["Armani", "Si", ["100ml"], ["113-ZT4GIO", "702-SIHO"]],
  ["Armani", "In Love With You", ["100ml"], ["002-INLOVE"]],
  ["Armani", "Acqua di Gioia", ["100ml"], ["448-ACQU"]],

  // ========== PACO RABANNE ==========
  ["Paco Rabanne", "1 Million", ["100ml"], ["563-MIGO", "665-LUCK", "666-RABA", "396-MILEL", "433-MILRO", "428-PACO", "458-MIGOL", "022-MILLJIN", "023-ZONGMIIL", "025-YINMIL", "278-MIBLAC", "281-MILPAR"]],
  ["Paco Rabanne", "Invictus", ["100ml"], ["670-INPA", "671-INEX", "672-ININT"]],
  ["Paco Rabanne", "Olympea", ["80ml"], ["372-OLYM"]],
  ["Paco Rabanne", "Fame", ["80ml"], ["435-PTFAME"]],
  ["Paco Rabanne", "Phantom", ["100ml"], ["436-PHAPT", "182-PHANT100", "457-PHPA"]],

  // ========== CREED ==========
  ["Creed", "Aventus", ["100ml", "75ml", "30ml", "3 x 30ml"], ["144-TOPCRZT444", "149-CRABS", "220-TOPCRhei100", "450-TOPbaCR", "244-CRCENT", "336-TOPHUICR", "232-CRVI R", "174-TOPCRNV", "411-CRBL", "416-CRLOB", "015-ABSO", "036-PTABS", "291-PTCRHEI100", "397-PTQUCR", "403-PTCEN", "211-CRblack120", "282-CRNV100", "253-CR30ML", "460-CRWINPT"]],
  ["Creed", "Millesime Imperial", ["100ml", "75ml"], ["177-CRMIL1849", "163-TOPCRjin100", "135-CRROY", "251-Crquanjin"]],
  ["Creed", "Viking", ["100ml"], ["349-TOPCRHONG", "405-PTDEL", "517-PTCRH"]],
  ["Creed", "Delphinus", ["100ml"], ["243-CRDEL"]],
  ["Creed", "Green Irish Tweed", ["100ml"], ["362-TOPCRIRI", "345-CRquanhei"]],
  ["Creed", "Erolfa", ["100ml"], ["358-CRMAYG"]],
  ["Creed", "Original Vetiver", ["100ml"], ["423-ORIG"]],
  ["Creed", "Himalaya", ["100ml"], ["444-TOPCRyin"]],
  ["Creed", "Silver Mountain Water", ["100ml"], ["335-CRBA10", "341-CRwhite"]],
  ["Creed", "Carmina", ["75ml"], ["359-CARMCR", "045-CAR"]],
  ["Creed", "Queen of Silk", ["75ml"], ["171-QUEENCR"]],
  ["Creed", "Spring Flower", ["75ml"], ["363-TOPCRSP", "252-PTSPRING", "522-CRHUA"]],
  ["Creed", "Love in White", ["75ml"], ["373-CRLOVIN", "441-ELACR", "417-LOWCR"]],
  ["Creed", "Fleurs de Gardenia", ["75ml"], ["419-FARG"]],
  ["Creed", "Acqua Fiorentina", ["75ml"], ["420-ACQU"]],
  ["Creed", "Floralie", ["75ml"], ["421-FLEU"]],
  ["Creed", "Royal Princess Oud", ["75ml"], ["422-ROYA"]],
  ["Creed", "White Flowers", ["75ml"], ["621-CRWH"]],
  ["Creed", "Jardin d'Amalfi", ["75ml"], ["622-CRFUL"]],

  // ========== TOM FORD ==========
  ["Tom Ford", "Fucking Fabulous", ["50ml", "100ml"], ["087-FUCKI", "073-FABUTF", "647-FUPA", "524-FABPT"]],
  ["Tom Ford", "Lost Cherry", ["50ml"], ["039-LOST100G", "486-PTLOST"]],
  ["Tom Ford", "Rose Prick", ["50ml"], ["447-ROEX", "329-PTROSET", "451-TFROS"]],
  ["Tom Ford", "Bitter Peach", ["50ml"], ["119-PEACHTF", "546-PTTFPE"]],
  ["Tom Ford", "Vanilla Sex", ["50ml", "100ml"], ["332-SEXTF", "240-VANI", "343-PTSEXTF"]],
  ["Tom Ford", "Jasmin Rouge", ["50ml"], ["060-TFJASM", "626-JASPT"]],
  ["Tom Ford", "Neroli Portofino", ["50ml"], ["530-TFNER", "595-TFNEG"]],
  ["Tom Ford", "Ebene Fume", ["50ml"], ["009-EBETF", "330-TFEBRPT"]],
  ["Tom Ford", "Oud Wood", ["50ml", "100ml"], ["190-HUITFOUD", "648-OUPA", "446-OUDPA", "317-OUDHUIPT"]],
  ["Tom Ford", "White Suede", ["50ml"], ["443-WHSU", "222-NEIPT"]],
  ["Tom Ford", "Reserve", ["50ml"], ["681-RESE"]],
  ["Tom Ford", "Bois Marocain", ["50ml"], ["691-BOIS"]],
  ["Tom Ford", "Soleil Neige", ["50ml"], ["340-NEIG"]],
  ["Tom Ford", "Soleil Blanc", ["50ml"], ["560-SOTF", "404-PTSOL"]],
  ["Tom Ford", "Cafe Rose", ["50ml"], ["406-CAFEPT"]],
  ["Tom Ford", "Soleil Brulant", ["50ml"], ["328-PTSOLTF"]],
  ["Tom Ford", "Tobacco Vanille", ["100ml"], ["333-FATATF", "030-VANIG", "316-VANTFPT"]],
  ["Tom Ford", "Tobacco Oud", ["100ml"], ["366-TFBAC"]],
  ["Tom Ford", "Ombré Leather", ["100ml"], ["649-OMPA", "650-DOMB", "127-TFOMBRE", "324-TFOMBPT", "050-DOMB"]],
  ["Tom Ford", "Oud Minérale", ["100ml"], ["283-OUDMINTF"]],
  ["Tom Ford", "Black Orchid", ["100ml"], ["188-GAOORC", "125-TFORCHEI", "429-PTWH"]],
  ["Tom Ford", "Café Rose", ["100ml"], ["068-TFCAFE"]],
  ["Tom Ford", "Velvet Orchid", ["100ml"], ["132-VOYA", "289-PTTFVEZI"]],
  ["Tom Ford", "Costa Azzurra", ["100ml"], ["696-COST"]],
  ["Tom Ford", "White Patchouli", ["100ml"], ["402-PTWHI"]],
  ["Tom Ford", "Noir", ["100ml"], ["122-TFNOIR", "679-POUR"]],

  // ========== LE LABO ==========
  ["Le Labo", "Santal 33", ["100ml"], ["027-TOP29SANM", "214-TOPSANT33"]],
  ["Le Labo", "Rose 31", ["100ml"], ["529-ROS31"]],
  ["Le Labo", "Another 13", ["100ml"], ["026-ANOT13M"]],
  ["Le Labo", "The Noir 29", ["100ml"], ["034-NOIR29IN"]],
  ["Le Labo", "Iris 39", ["100ml"], ["229-IRIS"]],
  ["Le Labo", "Vetiver 46", ["100ml"], ["430-VETI"]],

  // ========== LANCÔME ==========
  ["Lancôme", "La Vie Est Belle", ["100ml"], ["288-LAVAN", "065-LAVITOP", "413-LAV", "597-LALEX", "606-FLOW", "426-PTLA", "017-LAVIPT"]],
  ["Lancôme", "Idôle", ["75ml"], ["061-GAOWUYE", "424-IDOG", "064-TOPIDOLE", "461-DOLP", "549-IDNE"]],
  ["Lancôme", "Miracle", ["100ml"], ["307-MIRAPT"]],

  // ========== BYREDO ==========
  ["Byredo", "Bal d'Afrique", ["100ml"], ["138-BALDA"]],
  ["Byredo", "Gypsy Water", ["100ml"], ["103-GYPSY"]],
  ["Byredo", "Bibliothèque", ["100ml"], ["273-BIBLI"]],
  ["Byredo", "Mojave Ghost", ["100ml"], ["102-MOJAV"]],
  ["Byredo", "Super Cedar", ["100ml"], ["516-SUPE"]],
  ["Byredo", "Alto Astral", ["100ml"], ["676-ALTO"]],

  // ========== VALENTINO ==========
  ["Valentino", "Uomo Born in Roma", ["100ml"], ["130-INETVA", "131-CORAVA", "128-VAYELL", "376-VAEXT", "202-UOMOINT", "168-VABORNINT", "162-VACORAL", "141-FENUOMO", "140-UOMOHEI", "271-PTVAYELL", "294-PTVAGOLD", "136-PTINETVA", "484-VABOPT", "399-PTVAUO", "558-PTVAEX", "614-VAEXPT", "485-PTVACOR", "559-PTVAST", "528-VAYEDR", "508-VATHE", "037-ROCK", "527-VABOGR"]],
  ["Valentino", "Donna Born in Roma", ["100ml"], ["154-VALEHONG", "195-VAGOLD", "199-GREEVA", "233-DONNA", "331-VAPIN", "379-VADOEX", "269-PTDONNA", "205-PTCORAVA", "342-PTVAPIN", "407-PTDRE", "268-PTGREEVA", "219-UOIVPT"]],
  ["Valentino", "Voce Viva", ["100ml"], ["280-DONIV", "137--PTVALEHON", "241-VIOPT"]],
  ["Valentino", "Uomo Intense", ["100ml"], ["255-UOIV", "584-UOINPT"]],

  // ========== KILIAN ==========
  ["Kilian", "Love, Don't Be Shy", ["50ml"], ["170-KIDO22"]],
  ["Kilian", "Good Girl Gone Bad", ["50ml"], ["599-KIGO"]],
  ["Kilian", "Angels' Share", ["50ml"], ["185-SHARE", "641-SHPAR"]],
  ["Kilian", "Rolling in Love", ["50ml"], ["300-INLOV"]],

  // ========== VERSACE ==========
  ["Versace", "Eros", ["100ml", "30ml"], ["172-VERLANEDP", "572-VEREX", "070-LANVERG", "213-VERPAR", "684-EMER", "160-VERSLAN", "256-PTVERPAR", "261-VELAN30ML"]],
  ["Versace", "Eros Flame", ["100ml", "30ml"], ["081-REDVER", "155-HONGVERS", "384-VERNAJ", "272-VEHON30ML"]],
  ["Versace", "Dylan Blue", ["100ml"], ["059-DYLAN", "669-FEMM", "258-EDPPTVELA", "297-DYLA"]],
  ["Versace", "Pour Homme", ["100ml"], ["236-VERPOU", "574-VERMA", "309-POHVEPT", "312-VEMANPT"]],
  ["Versace", "Yellow Diamond", ["90ml"], ["249-VERYEL", "264-PTHUANGZ"]],
  ["Versace", "Crystal Noir", ["90ml"], ["287-ZUANZI"]],
  ["Versace", "Bright Crystal", ["90ml"], ["274-PTVERHUA", "518-VEBRPT", "434-ABVER", "263-PTFENZ"]],

  // ========== BVLGARI ==========
  ["Bvlgari", "Omnia", ["65ml"], ["056-BVLDJLG"]],
  ["Bvlgari", "Man Glacial Essence", ["100ml"], ["069-MANGLA"]],
  ["Bvlgari", "Pour Homme", ["100ml"], ["007-BVLPO"]],

  // ========== BILLIE EILISH ==========
  ["Billie Eilish", "No. 3 (Red)", ["100ml"], ["557-BENN3"]],
  ["Billie Eilish", "No. 1 (Gold)", ["100ml"], ["555-BEN1"]],
  ["Billie Eilish", "No. 2 (Black)", ["100ml"], ["556-BILL2"]],

  // ========== BURBERRY ==========
  ["Burberry", "Her", ["100ml"], ["412-HERBI", "414-HEDEPG", "326-HERDEP"]],
  ["Burberry", "Goddess", ["100ml"], ["449-BUGO"]],
  ["Burberry", "Hero", ["100ml"], ["723-BUHE"]],
  ["Burberry", "Mr. Burberry", ["100ml"], ["620-MENTO"]],
  ["Burberry", "My Burberry", ["90ml"], ["619-TOWO"]],
  ["Burberry", "Classic", ["100ml"], ["079-ROSEDA"]],

  // ========== ROJA ==========
  ["Roja", "Elysium", ["100ml"], ["216-ROVETI", "554-ELYS", "686-ELNO"]],

  // ========== BOND NO. 9 ==========
  ["Bond No. 9", "Greenwich Village", ["100ml"], ["388-NYCLV"]],
  ["Bond No. 9", "Gold", ["100ml"], ["391-NYCBAI"]],
  ["Bond No. 9", "Lafayette Street", ["100ml"], ["279-LAFA"]],
  ["Bond No. 9", "Scent of Peace", ["100ml"], ["638-SCEN"]],
  ["Bond No. 9", "New York Nights", ["100ml"], ["741-NEWY"]],
  ["Bond No. 9", "Madison Avenue", ["100ml"], ["740-MADI"]],
  ["Bond No. 9", "Harrods", ["100ml"], ["742-HARR"]],

  // ========== DIPTYQUE ==========
  ["Diptyque", "Eau des Sens", ["100ml"], ["203-SENS"]],
  ["Diptyque", "Fleur de Peau", ["100ml"], ["204-FLEUR"]],

  // ========== HERMÈS ==========
  ["Hermès", "Terre d'Hermès", ["100ml"], ["006-TERR", "646-TERIN", "110-DHER"]],
  ["Hermès", "Un Jardin Sur Le Nil", ["100ml"], ["699-LENIL"]],
  ["Hermès", "Le Jardin de Monsieur Li", ["100ml"], ["700-DEMO"]],
  ["Hermès", "Un Jardin Sur Le Toit", ["100ml"], ["701-TOIT"]],

  // ========== MIU MIU ==========
  ["Miu Miu", "L'Eau Bleue", ["100ml"], ["078-MIULAN"]],

  // ========== AFNAN ==========
  ["Afnan", "9pm", ["100ml"], ["519-AFN9"]],

  // ========== MUGLER ==========
  ["Mugler", "Angel Nova", ["100ml"], ["542-ANNO"]],
  ["Mugler", "Angel", ["100ml"], ["543-ANMU", "544-ANEAU", "564-ANG"]],
  ["Mugler", "Alien", ["90ml"], ["535-ALIE"]],

  // ========== KAYALI ==========
  ["Kayali", "Vanilla 28", ["100ml"], ["703-VAN28"]],
  ["Kayali", "Yum Pistachio", ["100ml"], ["704-YUM81", "707-PIS33"]],
  ["Kayali", "Deja Vu White Flower", ["100ml"], ["705-DENE01", "706-DEJ57"]],
  ["Kayali", "Pink Pepper", ["100ml"], ["708-ROS31"]],
  ["Kayali", "Sparkling Lychee", ["100ml"], ["709-ROCK42"]],
  ["Kayali", "Burning Cherry", ["100ml"], ["719-LEMO14"]],

  // ========== DOLCE & GABBANA ==========
  ["Dolce & Gabbana", "The Only One", ["100ml"], ["685-ONLY"]],
  ["Dolce & Gabbana", "K", ["100ml"], ["455-DOLC"]],
  ["Dolce & Gabbana", "Q", ["100ml"], ["561-DOGAH"]],

  // ========== AZZARO ==========
  ["Azzaro", "Wanted", ["100ml"], ["534-WAELI", "169-WBY", "473-WAEDT", "354-INTWAT", "156-MOSTWAT", "189-WAT100"]],
  ["Azzaro", "Chrome", ["100ml"], ["537-WAEDP"]],

  // ========== HUGO BOSS ==========
  ["Hugo Boss", "The Scent", ["100ml"], ["651-HUPA", "652-ABSOL", "605-ABSO"]],
  ["Hugo Boss", "Bottled", ["100ml"], ["653-CITR", "635-BOINF", "608-BOTT", "607-OUDS", "609-TONIC", "604-BOLD", "625-BOEDT", "678-TTLE"]],

  // ========== RALPH LAUREN ==========
  ["Ralph Lauren", "Polo Red", ["125ml"], ["536-PORE"]],
  ["Ralph Lauren", "Polo Blue", ["125ml"], ["545-POBU"]],

  // ========== GUERLAIN ==========
  ["Guerlain", "Aqua Allegoria", ["125ml"], ["290-BASI"]],

  // ========== VIKTOR & ROLF ==========
  ["Viktor&Rolf", "Spicebomb", ["90ml"], ["466-HOVIK", "465-VKYIN", "468-LVVIK", "464-VIKJ", "667-VIDA", "668-VIME"]],

  // ========== VICTORIA'S SECRET ==========
  ["Victoria's Secret", "Very Sexy", ["100ml"], ["593-HOVI", "594-LANVI", "591-VIHE"]],
];

export const DISCOUNTS = [
  "LA LOCAL PICKUP: 90015",
  "USE CODE 'FORTUNE25' FOR BUNDLES",
  "NEW DROP: PARFUMS DE MARLY",
  "AUTHENTICITY VERIFIED",
  "EST. 2025 ARCHIVE"
];

const grouped: Record<string, Product> = {};

rawData.forEach(([brand, name, volumes, ids]) => {
  const normalizedBrand = brand.trim();
  const normalizedName = name.trim();
  
  // Determine primary volume for pricing
  const primaryVolume = volumes[0];
  const hasMultipleVolumes = volumes.length > 1;
  
  // Create spec string
  const spec = hasMultipleVolumes ? `${volumes.join(', ')} options` : primaryVolume;
  
  const key = `${normalizedBrand}|${normalizedName}`.toLowerCase();
  
  let image = IMAGES.DARK;
  const b = normalizedBrand.toLowerCase();
  const n = normalizedName.toLowerCase();
  
  if (b.includes('chanel')) image = IMAGES.MONO;
  else if (b.includes('valentino')) {
    if (n.includes('uomo born') || n.includes('born in roma') && n.includes('uomo')) image = IMAGES.VALENTINO_UOMO_BORN;
    else if (n.includes('donna born') || n.includes('born in roma') && n.includes('donna')) image = IMAGES.VALENTINO_DONNA_BORN;
    else if (n.includes('voce viva')) image = IMAGES.VALENTINO_VOCE_VIVA;
    else if (n.includes('uomo intense')) image = IMAGES.VALENTINO_UOMO_INTENSE;
    else image = IMAGES.VALENTINO;
  }
  else if (b.includes('creed')) {
    // Assign specific images for Creed products
    if (n.includes('acqua fiorentina')) image = IMAGES.CREED_ACQUA_FIORENTINA;
    else if (n.includes('aventus')) image = IMAGES.CREED_AVENTUS;
    else if (n.includes('carmina')) image = IMAGES.CREED_CARMINA;
    else if (n.includes('delphinus')) image = IMAGES.CREED_DELPHINUS;
    else if (n.includes('erolfa')) image = IMAGES.CREED_EROLFA;
    else if (n.includes('fleurs de gardenia')) image = IMAGES.CREED_FLEURS_GARDENIA;
    else if (n.includes('floralie')) image = IMAGES.CREED_FLORALIE;
    else if (n.includes('green irish tweed')) image = IMAGES.CREED_GREEN_IRISH;
    else if (n.includes('himalaya')) image = IMAGES.CREED_HIMALAYA;
    else if (n.includes('jardin d\'amalfi')) image = IMAGES.CREED_JARDIN_AMALFI;
    else if (n.includes('love in white')) image = IMAGES.CREED_LOVE_WHITE;
    else if (n.includes('millesime imperial')) image = IMAGES.CREED_MILLESIME;
    else if (n.includes('original vetiver')) image = IMAGES.CREED_ORIGINAL_VETIVER;
    else if (n.includes('queen of silk')) image = IMAGES.CREED_QUEEN_SILK;
    else if (n.includes('royal princess oud')) image = IMAGES.CREED_ROYAL_PRINCESS;
    else if (n.includes('silver mountain water')) image = IMAGES.CREED_SILVER_MOUNTAIN;
    else if (n.includes('spring flower')) image = IMAGES.CREED_SPRING_FLOWER;
    else if (n.includes('viking')) image = IMAGES.CREED_VIKING;
    else if (n.includes('white flowers')) image = IMAGES.CREED_WHITE_FLOWERS;
    else image = IMAGES.CLEAN; // Default Creed fallback
  }
  else if (b.includes('mfk')) image = n.includes('rouge') && n.includes('extrait') ? IMAGES.RED : IMAGES.MONO;
  else if (b.includes('parfums de marly')) image = IMAGES.PURPLE;
  else if (b.includes('louis vuitton')) image = IMAGES.GREEN;
  else if (b.includes('tom ford')) image = IMAGES.TOMFORD;
  
  let price = 145;
  if (b.includes('mfk') || b.includes('kilian')) price = 385;
  else if (b.includes('creed')) price = 340;
  else if (b.includes('parfums de marly')) price = 320;
  else if (b.includes('xerjoff') || b.includes('roja') || b.includes('initio')) price = 365;
  else if (primaryVolume.includes('30ml')) price = 65;
  else if (primaryVolume.includes('50ml')) price = 225;
  else if (primaryVolume.includes('60ml')) price = 195;
  else if (primaryVolume.includes('65ml')) price = 135;
  else if (primaryVolume.includes('70ml')) price = 285;
  else if (primaryVolume.includes('75ml')) price = 295;
  
  grouped[key] = {
    ids,
    brand: normalizedBrand,
    name: normalizedName,
    spec,
    condition: 'Sealed',
    stock: Math.floor(Math.random() * 25) + 5,
    price,
    category: 'Fragrance',
    image,
    details: DEFAULT_DETAILS(normalizedBrand, normalizedName)
  };
});

export const INVENTORY: Product[] = Object.values(grouped);