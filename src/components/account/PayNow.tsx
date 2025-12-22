"use client";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function PayNow({ orderId }: { orderId: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Pay Now
      </button>

      <PaymentModal open={open} onClose={() => setOpen(false)} orderId={orderId} />
    </>
  );
}
