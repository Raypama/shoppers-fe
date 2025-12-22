"use client";
import { useEffect, useState } from "react";

import type { Payment } from "@/types/payment";
import { useRouter } from "next/navigation";
import paymentAPI from "@/lib/payment";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: number;
}

export default function PaymentModal({ open, onClose, orderId }: Props) {
  const [payment, setPayment] = useState<Payment | null>(null);
  const [method, setMethod] = useState("");
  const router = useRouter();

  // fetch payment when modal open
  useEffect(() => {
    if (!open) return;

    const fetchPayment = async () => {
      try {
        const data = await paymentAPI.get(orderId);
        setPayment(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPayment();
  }, [open, orderId]);

  // confirm payment
  const confirmPayment = async () => {
    if (!payment) return; // guard
    if (!method) return alert("please select method");

    try {
      await paymentAPI.confirm(payment.id, method);

      onClose();
      router.push("/account?tab=pending");
    } catch (err) {
      console.error(err);
      alert("payment failed");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex items-center justify-center
        transition-opacity duration-300
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        className={`bg-white w-11/12 max-w-md rounded-2xl p-6 shadow-xl transform transition-all duration-300
          ${open ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
      >
        <h2 className="text-xl font-semibold mb-4">Payment</h2>

        {!payment ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="mb-3">
              <p className="text-gray-600">
                <span className="font-semibold">Transaction:</span>{" "}
                {payment.transaction_id}
              </p>

              <p className="mt-1 text-gray-600">
                <span className="font-semibold">Amount:</span> Rp{" "}
                {payment.amount}
              </p>
            </div>

            <select
              onChange={(e) => setMethod(e.target.value)}
              className="border rounded w-full p-2 mb-4"
            >
              <option value="">selec your payment</option>
              <option value="BCA VA">BCA VA</option>
              <option value="MANDIRI VA">Mandiri VA</option>
              <option value="BNI VA">BNI VA</option>
              <option value="BANK DKI VA">BANK DKI VA</option>
              <option value="BRI VA">BRI VA</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmPayment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
