// src/lib/products.ts
import axios from "./axios";
import { Product } from "@/types/product";

export function normalizeProduct(data: any): Product {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: Number(data.price),
    stock: data.stock,
    rating: data.rating ? Number(data.rating) : undefined,
    brand_id: data.brand_id,
    category_id: data.category_id,

    brand: data.brand ?? null,
    category: data.category ?? null,

    media:
      data.media?.map((m: any) => ({
        id: m.id,
        product_id: m.product_id,
        media_type: m.media_type,
        url: m.url,
      })) ?? [],
  };
}

export interface PaginatedProducts {
  products: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * filters: object that matches backend supported query params
 */
export const getAllProducts = async (filters: Record<string, any> = {}) => {
  try {
    const res = await axios.get("/api/products", {
      params: filters,
    });

    return {
      products: res.data.data.map(normalizeProduct),
      pagination: res.data.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { products: [], pagination: null };
  }
};


export const getProductById = async (id: number) => {
  const res = await axios.get(`/api/products/${id}`);

  if (!res || !res.data || !res.data.data) {
    throw new Error("Product not found");
  }

  return normalizeProduct(res.data.data);
};
export const getProductBySlug = async (slug: string) => {
  const name = slug.replaceAll("-", " ");

  // pake search backend yang sudah ada
  const res = await axios.get("/api/products", {
    params: { search: name, limit: 1 },
  });

  const product = res.data?.data?.[0];

  if (!product) {
    throw new Error("Product not found");
  }

  return normalizeProduct(product);
};


export const getProductsBySearch = async (query: string) => {
  try {
    const res = await axios.get(`/api/products`, { params: { search: query } });
    return res.data.data.map(normalizeProduct);
  } catch (err) {
    console.log("Search error:", err);
    return [];
  }
};

export const getAllCategories = async () => {
  const res = await axios.get("/api/categories");
  return res.data.data;
};

export const getAllBrands = async () => {
  const res = await axios.get("/api/brands");
  return res.data.data;
};
export const getCategoryId = async (id:number) => {
  const res = await axios.get(`/api/categories/${id}`);
  return res.data.data;
};

export const getBrandsId = async (id:number) => {
  const res = await axios.get(`/api/brands/${id}`);
  return res.data.data;
};

