
export type Category = 'Fragrance' | 'Skincare' | 'All';

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
}

export interface Product {
  ids: string[]; // Support multiple SKUs
  brand: string;
  name: string;
  spec: string;
  condition: 'Sealed' | 'Open Box' | 'Used' | 'Refurb' | 'Tester (No Cap)';
  stock: number;
  price: number;
  category: Category;
  image: string;
  details: ProductDetails;
}

export interface CartItem extends Product {
  quantity: number;
}
