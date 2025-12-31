"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function PayNow({ orderId }: { orderId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 text-white font-bold cursor-pointer transition duration-500 px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Pay Now
      </button>

      <PaymentModal open={open} onClose={() => setOpen(false)} orderId={orderId} />
    </>
  );
}
