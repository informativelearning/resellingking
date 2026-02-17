export type Category = 'Fragrance' | 'Apparel' | 'All';

export interface ProductDetails {
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  projection?: string;
  sillage?: string;
  description: string;
  serialStatus?: string;
  coverage?: string;
  batteryHealth?: string;
  // Apparel-specific
  material?: string;
  fit?: string;
  care?: string;
}

export interface Product {
  ids: string[];
  brand: string;
  name: string;
  spec: string;
  condition: string;
  stock: number;
  price: number;
  category: Category;
  image: string; // Keep for backwards compatibility
  images?: string[]; // NEW: Array of images for carousel
  details: ProductDetails;
}

export interface CartItem extends Product {
  quantity: number;
}