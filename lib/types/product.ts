export type ProductCategory = 'citrus' | 'hallabong' | 'cheonhyehyang';
export type ProductSize = 'small' | 'medium' | 'large' | 'premium';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  weight: string;
  images: string[];
  badge?: string;
  features: string[];
  specifications: {
    origin: string;
    harvest: string;
    sweetness: number;
    quantity: string;
    packaging: string;
  };
  stock: number;
  isAvailable: boolean;
  createdAt: string;
}
