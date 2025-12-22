"use client";

import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function AddToCartButton({ productId }: { productId: number }) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAdd = () => {
    addToCart(productId, 1);
    toast.success("Added to Cart!");
  };

  return (
    <button
      onClick={handleAdd}
      className="bg-stone-800 hover:bg-stone-700 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2"
    >
      🛒 Add to Cart
    </button>
  );
}
