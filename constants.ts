import { Product, Category, ProductDetails } from './types';

const DEFAULT_DETAILS = (): ProductDetails => {
  return {
    description: "Verified authentic Valentino Born in Roma. 2024/2025 Batch.",
    projection: "STRONG",
    sillage: "MODERATE",
    topNotes: [],
    heartNotes: [],
    baseNotes: []
  };
};

// Helper to map product names to image base filenames
const getValentinoImageKey = (brand: string, name: string): string | null => {
  if (brand !== "Valentino") return null;
  
  const n = name.toLowerCase();
  if (n.includes("uomo") && n.includes("green stravaganza")) return "ValentinoUomoBorninRomaGreenStravaganzaValentino";
  if (n.includes("extradose donna")) return "ValentinoBorninRomaExtradoseDonna";
  if (n.includes("donna") && n.includes("green stravaganza")) return "ValentinoDonnaBorninRomaGreenStravaganzaValentino";
  if (n.includes("uomo") && n.includes("coral fantasy")) return "ValentinoUomoBornInRomaCoralFantasyValentino";
  if (n.includes("uomo") && n.includes("intense")) return "ValentinoUomoBornInRomaIntenseValentino";
  if (n.includes("donna") && n.includes("intense")) return "ValentinoDonnaBornInRomaIntenseValentino";
  if (n.includes("donna born")) return "ValentinoDonnaBornInRomaValentino";
  if (n.includes("uomo born")) return "ValentinoUomoBornInRomaValentino";
  
  return null;
};

// Generate 5 image paths (works with .png, .jpg, .jpeg - browser tries all)
const getValentinoImages = (baseName: string): string[] => {
  return [
    `/images/${baseName}.png`,
    `/images/${baseName}1.png`,
    `/images/${baseName}2.png`,
    `/images/${baseName}3.png`,
    `/images/${baseName}4.png`
  ];
};

// Fallback placeholder image
const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1523293188086-b469b979756c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1509631179647-b84917759c1e?auto=format&fit=crop&w=800&q=80"
];

// FRAGRANCE INVENTORY
const rawData: [string, string, string[]][] = [
  // ========== CHANEL ==========
  ["Chanel", "Coco Mademoiselle", ["100ml", "30ml"]],
  ["Chanel", "Bleu de Chanel", ["100ml"]],
  
  // ========== VALENTINO ==========
  ["Valentino", "Uomo Born in Roma Green Stravaganza", ["100ml"]],
  ["Valentino", "Born in Roma Extradose Donna", ["100ml"]],
  ["Valentino", "Donna Born in Roma", ["100ml"]],
  ["Valentino", "Donna Born in Roma Green Stravaganza", ["100ml"]],
  ["Valentino", "Uomo Born in Roma Intense", ["100ml"]],
  ["Valentino", "Uomo Born in Roma Coral Fantasy", ["100ml"]],
  ["Valentino", "Uomo Born in Roma", ["100ml"]],
  ["Valentino", "Donna Born in Roma Intense", ["100ml"]],
  
  // ========== DIOR ==========
  ["Dior", "Sauvage", ["100ml"]],
  
  // Add more brands here as needed...
];

export const DISCOUNTS = [
  "LA LOCAL PICKUP: 90015",
  "VALENTINO BORN IN ROMA EXCLUSIVE",
  "NEW DROP: GREEN STRAVAGANZA",
  "AUTHENTICITY VERIFIED",
  "EST. 2025 ARCHIVE"
];

const grouped: Record<string, Product> = {};

rawData.forEach(([brand, name, volumes], index) => {
  const normalizedBrand = brand.trim();
  const normalizedName = name.trim();
  
  const primaryVolume = volumes[0];
  const hasMultipleVolumes = volumes.length > 1;
  const spec = hasMultipleVolumes ? `${volumes.join(', ')} options` : primaryVolume;
  
  const key = `${normalizedBrand}|${normalizedName}`.toLowerCase();
  
  // Get images for Valentino products, placeholder for others
  let images: string[];
  const imageKey = getValentinoImageKey(normalizedBrand, normalizedName);
  if (imageKey) {
    images = getValentinoImages(imageKey);
  } else {
    images = PLACEHOLDER_IMAGES;
  }
  
  // All products $80
  const price = 80;
  
  grouped[key] = {
    ids: [key], // Use the unique key as identifier
    brand: normalizedBrand,
    name: normalizedName,
    spec,
    condition: 'Sealed',
    stock: Math.floor(Math.random() * 15) + 3,
    price,
    category: 'Fragrance',
    image: images[0],
    images,
    details: DEFAULT_DETAILS()
  };
});

// Filter to show ONLY Valentino products
export const INVENTORY: Product[] = Object.values(grouped).filter(p => p.brand === "Valentino");