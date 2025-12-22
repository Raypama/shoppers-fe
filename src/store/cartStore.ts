import { create } from "zustand";
import {
  addToCartAPI,
  getCartAPI,
  removeFromCartAPI,
  clearCartAPI,
  updateCartItemAPI,
} from "@/lib/cart";

export interface CartItemType {
  id: number;
  name: string;
  productId: number;
  price: number;
  image?: string;
  qty: number;
}

interface CartState {
  cart: CartItemType[];

  fetchCart: () => Promise<void>;
  addToCart: (productId: number, qty?: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  updateItem: (itemId: number, qty: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  // 🔹 load cart dari backend
  fetchCart: async () => {
    const res = await getCartAPI();

    const items = res.data?.data?.items ?? [];

    const formatted = items.map((item: any) => ({
      id: item.id, // cart item id
      productId: item.product.id, // real product id
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.media?.[0]?.url ?? "/placeholder.png",
      qty: item.quantity,
    }));

    set({ cart: formatted });
  },
  updateItem: async (itemId: number, qty: number) => {
    await updateCartItemAPI(itemId, qty);
    await get().fetchCart();
  },

  // 🔹 add product ke cart
  addToCart: async (productId, qty = 1) => {
    await addToCartAPI(productId, qty);
    await get().fetchCart(); // refresh
  },

  // 🔹 remove item
  removeFromCart: async (productId) => {
    await removeFromCartAPI(productId);
    await get().fetchCart();
  },

  // 🔹 clear entire cart
  clearCart: async () => {
    await clearCartAPI();
    set({ cart: [] });
  },
}));
