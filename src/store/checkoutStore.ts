import { create } from "zustand";
import { checkoutAPI } from "@/lib/checkout";
import type { AxiosResponse } from "axios";

interface CheckoutState {
  selectedItems: number[];
  toggleSelected: (id: number) => void;
  clearSelected: () => void;
  checkout: (payment_method?: string) => Promise<AxiosResponse[] | null>;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  selectedItems: [],

  toggleSelected: (id) =>
    set((state) => ({
      selectedItems: state.selectedItems.includes(id)
        ? state.selectedItems.filter((i) => i !== id)
        : [...state.selectedItems, id],
    })),

  clearSelected: () => set({ selectedItems: [] }),

  checkout: async (payment_method = "BCA VA") => {
    const itemIds = get().selectedItems;

    if (itemIds.length === 0) {
      alert("please select at least one item!");
      return null;
    }

    // 🔥 CALL API SATU-SATU
    const responses = await Promise.all(
      itemIds.map((id) => checkoutAPI(id, payment_method))
    );

    return responses; // AxiosResponse[]
  },
}));
