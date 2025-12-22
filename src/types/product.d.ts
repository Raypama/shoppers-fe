export interface ProductMedia {
  id: number;
  product_id: number;
  media_type: string;
  url: string;
}

export interface Brand {
  id: number;
  name: string;
  slug?: string;
}

export interface Category {
  id: number;
  name: string;
  slug?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  rating?: number;
  brand_id?: number;
  category_id?: number;

  // RELASI
  brand?: Brand;
  category?: Category;
  media?: ProductMedia[]; // array media dari ProductMedia
}
