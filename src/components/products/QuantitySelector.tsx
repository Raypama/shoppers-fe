"use client";

import { useState } from "react";

interface QuantitySelectorProps {
  stock: number;
  onChange?: (qty: number) => void;
}

export default function QuantitySelector({
  stock,
  onChange,
}: QuantitySelectorProps) {
  const [qty, setQty] = useState(1);

  const decrease = () => {
    setQty((prev) => {
      const next = Math.max(1, prev - 1);
      onChange?.(next);
      return next;
    });
  };

  const increase = () => {
    setQty((prev) => {
      const next = Math.min(stock, prev + 1);
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="flex items-center border rounded">
      <button
        onClick={decrease}
        disabled={qty === 1}
        className="px-3 py-2 disabled:opacity-40"
      >
        −
      </button>

      <span className="px-4 select-none">{qty}</span>

      <button
        onClick={increase}
        disabled={qty === stock}
        className="px-3 py-2 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
}
