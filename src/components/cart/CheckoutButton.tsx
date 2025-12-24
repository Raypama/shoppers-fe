"use client";

import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";

export default function CheckoutButton() {
  const router = useRouter();

  // ✅ ambil array
  const selectedItems = useCheckoutStore((state) => state.selectedItems);

  const isDisabled = selectedItems.length === 0;

  return (
    <button
      disabled={isDisabled}
      onClick={() => router.push("/checkout")}
      className={`mt-4 w-full py-3 rounded-lg transition
        ${
          isDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-opacity-80"
        }
      `}
    >
      Proceed to Checkout
      {!isDisabled && (
        <span className="ml-2 text-sm opacity-80">
          ({selectedItems.length})
        </span>
      )}
    </button>
  );
}
