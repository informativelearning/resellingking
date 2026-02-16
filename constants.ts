import { Product, Category, ProductDetails } from './types';

const DEFAULT_DETAILS = (): ProductDetails => {
  return {
    description: "Verified authentic fragrance. 2024/2025 Batch.",
    projection: "STRONG",
    sillage: "MODERATE",
    topNotes: [],
    heartNotes: [],
    baseNotes: []
  };
};

// Helper to map product names to actual image paths
const getImagePaths = (brand: string, name: string): string[] | null => {
  const b = brand.toLowerCase();
  const n = name.toLowerCase();
  
  // ========== VALENTINO ==========
  if (b.includes("valentino")) {
    // Uomo Green Stravaganza - 5 images (all PNG)
    if (n.includes("uomo") && n.includes("green stravaganza")) {
      return [
        "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino.png",
        "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino1.png",
        "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino2.png",
        "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino3.png",
        "/images/ValentinoUomoBorninRomaGreenStravaganzaValentino4.png"
      ];
    }
    
    // Extradose Donna - 5 images
    if (n.includes("extradose")) {
      return [
        "/images/BorninRomaExtradoseDonnaValentino.png",
        "/images/BorninRomaExtradoseDonnaValentino1.png",
        "/images/BorninRomaExtradoseDonnaValentino2.jpeg",
        "/images/BorninRomaExtradoseDonnaValentino3.png",
        "/images/BorninRomaExtradoseDonnaValentino4.png"
      ];
    }
    
    // Donna Born in Roma (original) - 3 images
    if (n.includes("donna born") && !n.includes("green") && !n.includes("intense")) {
      return [
        "/images/ValentinoDonnaBornInRomaValentino.png",
        "/images/ValentinoDonnaBornInRomaValentino1.jpeg",
        "/images/ValentinoDonnaBornInRomaValentino2.jpeg"
      ];
    }
    
    // Donna Green Stravaganza - 5 images (note: missing image 4, has image 5)
    if (n.includes("donna") && n.includes("green stravaganza")) {
      return [
        "/images/Valentino Donna Born in Roma Green Stravaganza Valentino.jpeg",
        "/images/Valentino Donna Born in Roma Green Stravaganza Valentino1.png",
        "/images/Valentino Donna Born in Roma Green Stravaganza Valentino2.jpeg",
        "/images/Valentino Donna Born in Roma Green Stravaganza Valentino3.jpeg",
        "/images/Valentino Donna Born in Roma Green Stravaganza Valentino5.png"
      ];
    }
    
    // Donna Intense - 5 images
    if (n.includes("donna") && n.includes("intense")) {
      return [
        "/images/Valentino Donna Born In Roma Intense Valentino.jpeg",
        "/images/Valentino Donna Born In Roma Intense Valentino1.jpeg",
        "/images/Valentino Donna Born In Roma Intense Valentino2.jpeg",
        "/images/Valentino Donna Born In Roma Intense Valentino3.jpeg",
        "/images/Valentino Donna Born In Roma Intense Valentino4.jpeg"
      ];
    }
    
    // Uomo Coral Fantasy - 5 images
    if (n.includes("coral fantasy")) {
      return [
        "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino.jpeg",
        "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino1.png",
        "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino2.jpeg",
        "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino3.jpeg",
        "/images/Valentino Uomo Born In Roma Coral Fantasy Valentino4.jpeg"
      ];
    }
    
    // Uomo Intense - 5 images
    if (n.includes("uomo") && n.includes("intense")) {
      return [
        "/images/Valentino Uomo Born In Roma Intense Valentino.jpeg",
        "/images/Valentino Uomo Born In Roma Intense Valentino1.jpeg",
        "/images/Valentino Uomo Born In Roma Intense Valentino2.jpeg",
        "/images/Valentino Uomo Born In Roma Intense Valentino3.jpeg",
        "/images/Valentino Uomo Born In Roma Intense Valentino4.png"
      ];
    }
    
    // Uomo Born in Roma (original) - 5 images
    if (n.includes("uomo born")) {
      return [
        "/images/Valentino Uomo Born in Roma Valentino.png",
        "/images/Valentino Uomo Born in Roma Valentino1.png",
        "/images/Valentino Uomo Born in Roma Valentino2.jpeg",
        "/images/Valentino Uomo Born in Roma Valentino3.jpeg",
        "/images/Valentino Uomo Born in Roma Valentino4.jpeg"
      ];
    }
  }
  
  // ========== CREED ==========
  if (b.includes("creed")) {
    // Aventus - 4 images
    if (n.includes("aventus") && !n.includes("absolu")) {
      return [
        "/images/Aventus Creed.jpeg",
        "/images/Aventus Creed1.png",
        "/images/Aventus Creed2.jpeg",
        "/images/Aventus Creed3.jpeg"
      ];
    }
    
    // Absolu Aventus - 5 images
    if (n.includes("absolu aventus")) {
      return [
        "/images/Absolu Aventus Creed.jpeg",
        "/images/Absolu Aventus Creed1.png",
        "/images/Absolu Aventus Creed2.jpeg",
        "/images/Absolu Aventus Creed3.jpeg",
        "/images/Absolu Aventus Creed4.jpeg"
      ];
    }
    
    // Delphinus - 4 images
    if (n.includes("delphinus")) {
      return [
        "/images/Delphinus Creed.jpeg",
        "/images/Delphinus Creed1.png",
        "/images/Delphinus Creed2.jpeg",
        "/images/Delphinus Creed3.jpeg"
      ];
    }
    
    // Eladaria - 5 images
    if (n.includes("eladaria")) {
      return [
        "/images/Eladaria Creed.jpeg",
        "/images/Eladaria Creed1.jpeg",
        "/images/Eladaria Creed2.jpeg",
        "/images/Eladaria Creed3.png",
        "/images/Eladaria Creed4.png"
      ];
    }
    
    // Green Irish Tweed - 5 images
    if (n.includes("green irish tweed")) {
      return [
        "/images/Green Irish Tweed Creed.jpeg",
        "/images/Green Irish Tweed Creed1.png",
        "/images/Green Irish Tweed Creed2.jpeg",
        "/images/Green Irish Tweed Creed3.jpeg",
        "/images/Green Irish Tweed Creed4.jpeg"
      ];
    }
  }
  
  // ========== YVES SAINT LAURENT / YSL ==========
  if (b.includes("yves saint laurent") || b.includes("ysl")) {
    // MYSLF Eau de Parfum - 5 images
    if (n.includes("myslf") && n.includes("eau de parfum") && !n.includes("le parfum")) {
      return [
        "/images/MYSLF Eau de Parfum Yves Saint Laurent.jpeg",
        "/images/MYSLF Eau de Parfum Yves Saint Laurent1.jpeg",
        "/images/MYSLF Eau de Parfum Yves Saint Laurent2.jpeg",
        "/images/MYSLF Eau de Parfum Yves Saint Laurent3.jpeg",
        "/images/MYSLF Eau de Parfum Yves Saint Laurent4.jpeg"
      ];
    }
    
    // MYSLF Le Parfum - 5 images
    if (n.includes("myslf") && n.includes("le parfum")) {
      return [
        "/images/MYSLF Le Parfum Yves Saint Laurent.jpeg",
        "/images/MYSLF Le Parfum Yves Saint Laurent1.png",
        "/images/MYSLF Le Parfum Yves Saint Laurent2.jpeg",
        "/images/MYSLF Le Parfum Yves Saint Laurent3.jpeg",
        "/images/MYSLF Le Parfum Yves Saint Laurent4.jpeg"
      ];
    }
    
    // Y Eau de Parfum Intense - 4 images
    if (n.includes("y eau de parfum intense") || (n.includes("y") && n.includes("intense"))) {
      return [
        "/images/Y Eau de Parfum Intense Yves Saint Laurent.png",
        "/images/Y Eau de Parfum Intense Yves Saint Laurent1.png",
        "/images/Y Eau de Parfum Intense Yves Saint Laurent2.png",
        "/images/Y Eau de Parfum Intense Yves Saint Laurent3.png"
      ];
    }
    
    // Y Eau de Parfum - 5 images
    if (n.includes("y eau de parfum") || (n.includes("y") && !n.includes("intense") && !n.includes("myslf"))) {
      return [
        "/images/Y Eau de Parfum Yves Saint Laurent.png",
        "/images/Y Eau de Parfum Yves Saint Laurent1.png",
        "/images/Y Eau de Parfum Yves Saint Laurent2.jpeg",
        "/images/Y Eau de Parfum Yves Saint Laurent3.jpg",
        "/images/Y Eau de Parfum Yves Saint Laurent4.jpeg"
      ];
    }
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
  // ========== VALENTINO ==========
  ["Valentino", "Uomo Born in Roma Green Stravaganza", ["100ml"]],
  ["Valentino", "Born in Roma Extradose Donna", ["100ml"]],
  ["Valentino", "Donna Born in Roma", ["100ml"]],
  ["Valentino", "Donna Born in Roma Green Stravaganza", ["100ml"]],
  ["Valentino", "Uomo Born in Roma Intense", ["100ml"]],
  ["Valentino", "Uomo Born in Roma Coral Fantasy", ["100ml"]],
  ["Valentino", "Uomo Born in Roma", ["100ml"]],
  ["Valentino", "Donna Born in Roma Intense", ["100ml"]],
  
  // ========== CREED ==========
  ["Creed", "Aventus", ["100ml"]],
  ["Creed", "Absolu Aventus", ["100ml"]],
  ["Creed", "Delphinus", ["100ml"]],
  ["Creed", "Eladaria", ["75ml"]],
  ["Creed", "Green Irish Tweed", ["100ml"]],
  
  // ========== YVES SAINT LAURENT ==========
  ["Yves Saint Laurent", "MYSLF Eau de Parfum", ["100ml"]],
  ["Yves Saint Laurent", "MYSLF Le Parfum", ["100ml"]],
  ["Yves Saint Laurent", "Y Eau de Parfum", ["100ml"]],
  ["Yves Saint Laurent", "Y Eau de Parfum Intense", ["100ml"]],
];

export const DISCOUNTS = [
  "LA LOCAL PICKUP: 90015",
  "LUXURY FRAGRANCE COLLECTION",
  "VALENTINO • CREED • YSL",
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
  
  // Get images, placeholder for products without images
  const images = getImagePaths(normalizedBrand, normalizedName) || PLACEHOLDER_IMAGES;
  
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

// Export all products
export const INVENTORY: Product[] = Object.values(grouped);