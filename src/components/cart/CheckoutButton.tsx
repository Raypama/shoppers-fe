"use client";

import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkoutStore";

export default function CheckoutButton() {
  const router = useRouter();
  const { selectedItems, checkout, clearSelected } = useCheckoutStore();

  const isDisabled = selectedItems.length === 0;

  const handleCheckout = async () => {
    try {
      const res = await checkout();

      if (res && (res.status === 200 || res.status === 201)) {
        const orderId = res.data.data.id;
        clearSelected();
        router.push(`/account/orders/${orderId}`);
      }
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

  return (
    <button
      disabled={isDisabled}
      onClick={handleCheckout}
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
        <span className="ml-2 opacity-80">
          ({selectedItems.length})
        </span>
      )}
    </button>
  );
}
