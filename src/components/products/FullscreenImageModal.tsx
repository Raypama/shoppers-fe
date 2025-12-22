"use client";

import { useState } from "react";

export default function FullscreenImageModal({
  images,
  index,
  onClose,
}: {
  images: string[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl"
      >
        ✕
      </button>

      {/* IMAGE */}
      <img
        src={images[current]}
        className="max-w-[90%] max-h-[90%] object-contain"
      />

      {/* ARROWS */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 text-white text-4xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-6 text-white text-4xl"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
