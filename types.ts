export type Category = 'Fragrance' | 'Apparel' | 'Sneakers' | 'All';

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
  image: string;
  images?: string[];
  details: ProductDetails;
  cardBg?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string; // for apparel
}