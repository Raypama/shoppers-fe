// src/store/checkoutStore.ts
import { create } from "zustand";
import { checkoutAPI } from "@/lib/checkout";

interface CheckoutState {
  selectedItem: number | null;
  setSelected: (id: number) => void;
  checkout: (payment_method?: string) => Promise<any>;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  selectedItem: null,

  setSelected: (id) => set({ selectedItem: id }),

  checkout: async (payment_method = "BCA VA") => {
    const itemId = get().selectedItem;

    if (!itemId) {
      alert("please select one item!");
      return;
    }

    const res = await checkoutAPI(itemId, payment_method);

    return res; // <= IMPORTANT
  },
}));
