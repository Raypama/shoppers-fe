"use client";

import { useEffect, useMemo } from "react";
import { useCartStore } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CheckoutButton from "@/components/cart/CheckoutButton";
import { useCheckoutStore } from "@/store/checkoutStore";

export default function CartPage() {
  const { cart, fetchCart } = useCartStore();
  const selectedItems = useCheckoutStore((s) => s.selectedItems);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = useMemo(() => {
    return cart
      .filter((item) => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart, selectedItems]);

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cart.map((item) => <CartItem key={item.id} {...item} />)
        )}
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-500">
          Selected items: {selectedItems.length}
        </p>

        <p className="text-xl font-semibold">
          Total: Rp {total.toLocaleString()}
        </p>

        <CheckoutButton />
      </div>
    </div>
  );
}
