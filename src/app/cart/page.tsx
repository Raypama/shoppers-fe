"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/CartItem";
import { useCheckoutStore } from "@/store/checkoutStore";
import CheckoutButton from "@/components/cart/CheckoutButton";

export default function CartPage() {
  const { cart, fetchCart } = useCartStore();
  const selectedItem = useCheckoutStore((state) => state.selectedItem);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // TOTAL dari item yang dipilih
  const total = selectedItem
    ? (() => {
        const item = cart.find((i) => i.id === selectedItem);
        return item ? item.price * item.qty : 0;
      })()
    : 0;

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => <CartItem key={item.id} {...item} />)
        )}
      </div>

      <div className="mt-6 border-t pt-4">

        {/* TOTAL */}
        <p className="text-xl font-semibold">
          Total: Rp {total.toLocaleString()}
        </p>

        {/* Proceed Button */}
        <CheckoutButton/>
      </div>
    </div>
  );
}
