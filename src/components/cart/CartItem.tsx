"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";

interface Props {
  id: number;
  productId: number;
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
  const removeFromCart = useCartStore((s) => s.removeFromCart);
  const addToCart = useCartStore((s) => s.addToCart);
  const updateItem = useCartStore((s) => s.updateItem);

  const { selectedItems, toggleSelected } = useCheckoutStore();

  return (
    <div className="flex justify-between items-center border-b p-4">
      <div className="flex gap-4 items-center">
        <input
          type="checkbox"
          checked={selectedItems.includes(id)}
          onChange={() => toggleSelected(id)}
        />

        <div className="relative w-20 h-20">
          <Image
            src={image || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover rounded"
          />
        </div>

        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">
            Rp {price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <button onClick={() => updateItem(id, qty - 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => addToCart(productId, 1)}>+</button>
        </div>

        <button
          onClick={() => removeFromCart(id)}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
}
