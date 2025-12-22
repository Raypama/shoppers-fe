"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore"; // ✅ NEW

interface Props {
  id: number; // cart item id
  productId: number; // product id
  name: string;
  price: number;
  image?: string;
  qty: number;
}

export default function CartItem({
  id,
  productId,
  name,
  price,
  image,
  qty,
}: Props) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const updateItem = useCartStore((state) => state.updateItem);

  // ✅ checkout store radio selection
  const setSelected = useCheckoutStore((state) => state.setSelected);
  const selectedItem = useCheckoutStore((state) => state.selectedItem);

  const decreaseQty = () => {
    if (qty <= 1) return removeFromCart(id);

    updateItem(id, qty - 1);
  };

  const increaseQty = () => addToCart(productId, 1);

  return (
    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">


      {/* IMAGE + INFO */}
      <div className="flex items-center gap-4">
      {/* RADIO BUTTON SELECT */}
      <input
        type="radio"
        className=" h-4 w-4"
        checked={selectedItem === id}
        onChange={() => setSelected(id)}
      />
        <div className="relative h-20 w-20 rounded-md overflow-hidden bg-neutral-200 dark:bg-neutral-800">
          <Image
            src={image || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h3 className="font-semibold text-sm">{name}</h3>
          <p className="text-neutral-500 text-sm">
            Rp {price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* QTY + REMOVE */}
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={decreaseQty}
            className="px-2 py-1 border rounded hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            -
          </button>
          <span className="w-6 text-center">{qty}</span>
          <button
            onClick={increaseQty}
            className="px-2 py-1 border rounded hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            +
          </button>
        </div>

        <button
          onClick={() => removeFromCart(id)}
          className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm"
        >
          <Trash2 size={16} />
          Remove
        </button>
      </div>
    </div>
  );
}
