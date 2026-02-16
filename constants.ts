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

// Helper to map product names to image base filenames and extensions
const getValentinoImagePaths = (brand: string, name: string): string[] | null => {
  if (brand !== "Valentino") return null;
  
  const n = name.toLowerCase();
  
  // Uomo Green Stravaganza - all PNG
  if (n.includes("uomo") && n.includes("green stravaganza")) {
    return [
      "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino.png",
      "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino1.png",
      "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino2.png",
      "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino3.png",
      "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino4.png"
    ];
  }
  
  // Extradose Donna - mixed PNG and JPEG
  if (n.includes("extradose donna")) {
    return [
      "/images/BorninRomaExtradoseDonnaValentino.png",
      "/images/BorninRomaExtradoseDonnaValentino1.png",
      "/images/BorninRomaExtradoseDonnaValentino2.jpeg",
      "/images/BorninRomaExtradoseDonnaValentino3.png",
      "/images/BorninRomaExtradoseDonnaValentino4.png"
    ];
  }
  
  // Donna Born in Roma - PNG and JPEG
  if (n.includes("donna born") && !n.includes("green") && !n.includes("intense")) {
    return [
      "/images/ValentinoDonnaBornInRomaValentino.png",
      "/images/ValentinoDonnaBornInRomaValentino1.jpeg",
      "/images/ValentinoDonnaBornInRomaValentino2.jpeg",
      "/images/ValentinoDonnaBornInRomaValentino.png", // fallback
      "/images/ValentinoDonnaBornInRomaValentino.png"  // fallback
    ];
  }
  
  // For other Valentino products, use generic pattern
  if (n.includes("donna") && n.includes("green stravaganza")) {
    const base = "ValentinoDonnaBorninRomaGreenStravaganzaValentino";
    return [
      `/images/${base}.png`,
      `/images/${base}1.png`,
      `/images/${base}2.png`,
      `/images/${base}3.png`,
      `/images/${base}4.png`
    ];
  }
  
  if (n.includes("uomo") && n.includes("coral fantasy")) {
    const base = "ValentinoUomoBornInRomaCoralFantasyValentino";
    return [
      `/images/${base}.png`,
      `/images/${base}1.png`,
      `/images/${base}2.png`,
      `/images/${base}3.png`,
      `/images/${base}4.png`
    ];
  }
  
  if (n.includes("uomo") && n.includes("intense")) {
    const base = "ValentinoUomoBornInRomaIntenseValentino";
    return [
      `/images/${base}.png`,
      `/images/${base}1.png`,
      `/images/${base}2.png`,
      `/images/${base}3.png`,
      `/images/${base}4.png`
    ];
  }
  
  if (n.includes("donna") && n.includes("intense")) {
    const base = "ValentinoDonnaBornInRomaIntenseValentino";
    return [
      `/images/${base}.png`,
      `/images/${base}1.png`,
      `/images/${base}2.png`,
      `/images/${base}3.png`,
      `/images/${base}4.png`
    ];
  }
  
  if (n.includes("uomo born")) {
    const base = "ValentinoUomoBornInRomaValentino";
    return [
      `/images/${base}.png`,
      `/images/${base}1.png`,
      `/images/${base}2.png`,
      `/images/${base}3.png`,
      `/images/${base}4.png`
    ];
  }
  
  return null;
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
  const images = getValentinoImagePaths(normalizedBrand, normalizedName) || PLACEHOLDER_IMAGES;
  
  // All products $80
  const price = 80;
  
  grouped[key] = {
    ids: [key],
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