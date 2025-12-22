"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

declare type BannerImage = string;

const images: BannerImage[] = [
  "/images/banner-1.png",
  "/images/banner-2.png",
  "/images/banner-3.png",
  "/images/banner-4.png",
];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full h-[700px] relative rounded-sm shadow-2xl cursor-pointer z-40"
      onClick={() => router.push("/collections/all-product")}
    >
      {images.map((src: BannerImage, i: number) => (
        <Image
          key={i}
          src={src}
          alt={`Banner ${i + 1}`}
          fill
          className={`object-contain transition-opacity duration-900 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
