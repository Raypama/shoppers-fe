"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function ProductCard({ product }: any) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddCart = () => {
    addToCart(product.id, 1);
    toast.success('Added to Cart Succes!')
  };

  return (
    <div className="bg-white rounded shadow flex flex-col">
      <Link
        href={`/product/${product.name.replaceAll(" ", "-").toLowerCase()}`}
      >
        <img
          src={product.media?.[0]?.url ?? "/placeholder.png"}
          alt={product.name}
          className="w-full h-44 object-cover rounded"
        />
      </Link>

      <div className="mt-3 px-3 flex-1">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <div className="text-sm text-stone-600">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </div>
        <div className="text-xs text-stone-500 mt-1">
          {product.brand?.name ?? "-"}
        </div>
        <div className="text-xs text-stone-500">{product.category?.name ?? "-"}</div>
        <div className="text-xs text-stone-500">{product.rating ?? "-"}</div>
      </div>

      <div className="mt-3 px-3 py-2 flex text-sm gap-2">
        <button
          onClick={handleAddCart}
          className="flex-1 px-3 py-2 bg-stone-900 text-white rounded"
        >
          Add To Cart
        </button>

        <Link
          href={`/product/${product.name.replaceAll(" ", "-").toLowerCase()}`}
          className="px-3 py-2 border rounded"
        >
          View
        </Link>
      </div>
    </div>
  );
}
