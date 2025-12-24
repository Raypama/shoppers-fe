"use client";

import { useEffect, useMemo, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, fetchCart } = useCartStore();
  const { selectedItems, checkout, clearSelected } = useCheckoutStore();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ✅ derive selected carts safely
  const selectedCarts = useMemo(() => {
    return cart.filter((c) => selectedItems.includes(c.id));
  }, [cart, selectedItems]);

  // ✅ hitung total
  const total = useMemo(() => {
    return selectedCarts.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [selectedCarts]);

 const handleCheckout = async () => {
  if (!paymentMethod) return;

  setLoading(true);
  try {
    const res = await checkout(paymentMethod);

    if (!res || res.length === 0) {
      throw new Error("Checkout failed");
    }

    // cek minimal 1 sukses
    const success = res.some(
      (r) => r.status === 201 || r.status === 200
    );

    if (success) {
      clearSelected();
      router.push("/account?tab=pending");
    } else {
      throw new Error("Checkout failed");
    }
  } catch (err) {
    alert("Checkout failed");
  } finally {
    setLoading(false);
  }
};



  // ✅ empty guard
  if (selectedItems.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No selected items
      </p>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* ITEMS */}
      <div className="space-y-2">
        {selectedCarts.map((item) => (
          <div
            key={item.id}
            className="flex justify-between text-sm"
          >
            <span>
              {item.name} × {item.qty}
            </span>
            <span>
              Rp {(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <p className="font-semibold mb-4">
        Total: Rp {total.toLocaleString()}
      </p>

      {/* PAYMENT */}
      <select
        className="border p-2 w-full mb-4"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="">Select payment</option>
        <option value="BCA VA">BCA VA</option>
        <option value="BRI VA">BRI VA</option>
        <option value="QRIS">QRIS</option>
      </select>

      {/* BUTTON */}
      <button
        disabled={loading || !paymentMethod}
        onClick={handleCheckout}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Checkout Now"}
      </button>
    </div>
  );
}
