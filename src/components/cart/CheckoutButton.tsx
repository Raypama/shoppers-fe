"use client";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";

export default function CheckoutButton() {
  const router = useRouter();
  const selectedItem = useCheckoutStore((state) => state.selectedItem);

  return (
    <button
      disabled={!selectedItem}
      onClick={() => router.push("/checkout")}
      className="mt-4 w-full bg-black text-white py-3 rounded-lg hover:bg-opacity-80 disabled:bg-gray-400"
    >
      Proceed to Checkout
    </button>
  );
}