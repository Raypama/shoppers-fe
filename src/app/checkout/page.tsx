"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { useRouter } from "next/navigation";

// simple spinner
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, fetchCart } = useCartStore();
  const { selectedItem, checkout } = useCheckoutStore();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedCart = cart.find((c) => c.id === selectedItem);
  
  
  useEffect(() => {
      fetchCart();
    }, [fetchCart]);
    
    const handleCheckout = async () => {
        console.log(selectedCart ,'ini selected cart');
        if (!paymentMethod) {
            alert("Pilih metode pembayaran!");
            return;
        }
        
    setLoading(true);

    try {
      const res = await checkout(paymentMethod);

      if (res?.status === 201) {
        router.push("/account?tab=pending");
      }
    } catch (err) {
      console.log(err);
      alert("Checkout failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!selectedCart)
    return (
      <div className="max-w-lg mx-auto p-6 mt-10 text-center">
        <p className="text-gray-600 text-lg">
          no selected cart items
        </p>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto p-6 mt-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* CART ITEM SUMMARY */}
      <div className="border rounded-lg p-4 mb-6 shadow-sm bg-white">
        <h2 className="font-semibold mb-4">Selected Cart :</h2>

        <div className="flex justify-between">
          <div>
            <p className="font-medium">{selectedCart.name}</p>
            <p className="text-sm text-gray-500">Qty: {selectedCart.qty}</p>
          </div>

          <p className="font-semibold">
            Rp {(selectedCart.price * selectedCart.qty).toLocaleString()}
          </p>
        </div>
      </div>

      {/* PAYMENT METHODS */}
      <div className="border rounded-lg p-4 mb-6 shadow-sm bg-white ">
        <h2 className="font-semibold mb-4">Payment Method</h2>

        <div className="space-y-3">

          {["BCA VA", "BRI VA", "MANDIRI VA", "BNI VA", "BANK DKI VA", "QRIS"].map((method) => (
            <label
              key={method}
              className={`flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-stone-800 hover:text-white transition 
              ${
                paymentMethod === method
                  ? "border-black dark:border-white"
                  : "border-gray-300 dark:border-neutral-700"
              }`}
            >
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              <span>{method}</span>
            </label>
          ))}

        </div>
      </div>

      {/* BUTTON */}
      <button
        disabled={loading}
        onClick={handleCheckout}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-opacity-80 disabled:opacity-40"
      >
        {loading ? <Spinner /> : "Checkout Now"}
      </button>
    </div>
  );
}