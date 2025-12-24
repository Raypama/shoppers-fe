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

  const toggleSelected = useCheckoutStore((s) => s.toggleSelected);
  const selectedItems = useCheckoutStore((s) => s.selectedItems);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        {/* ✅ MULTI CHECKBOX */}
        <input
          type="checkbox"
          checked={selectedItems.includes(id)}
          onChange={() => toggleSelected(id)}
          className="h-4 w-4"
        />

        <div className="relative h-20 w-20 rounded overflow-hidden">
          <Image
            src={image || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-500">
            Rp {price.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex gap-2">
          <button onClick={() => updateItem(id, qty - 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => addToCart(productId, 1)}>+</button>
        </div>

        <button
          onClick={() => removeFromCart(id)}
          className="text-red-600 flex gap-1"
        >
          <Trash2 size={16} /> Remove
        </button>
      </div>
    </div>
  );
}
