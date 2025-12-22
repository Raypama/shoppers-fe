"use client";

import { useState } from "react";
import FullscreenImageModal from "./FullscreenImageModal";

export default function ProductImageSlider({
  images = [],
}: {
  images?: string[];
}) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="w-full h-[420px] bg-stone-100 rounded-xl flex items-center justify-center text-sm text-stone-500">
        No image
      </div>
    );
  }

  return (
    <>
      {/* MAIN IMAGE */}
      <div
        className="relative w-full h-[420px] bg-stone-100 rounded-xl overflow-hidden cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <img
          src={images[index]}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 mt-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-20 h-20 border rounded overflow-hidden ${
              index === i ? "ring-2 ring-black" : ""
            }`}
          >
            <img src={img} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* FULLSCREEN */}
      {open && (
        <FullscreenImageModal
          images={images}
          index={index}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
