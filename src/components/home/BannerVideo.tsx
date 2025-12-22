"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const videos = [
  "/video/banner-1.mp4"
//   "/videos/banner-2.mp4",
//   "/videos/banner-3.mp4",
];

export default function BannerVideo() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const router = useRouter();

  // auto change video
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % videos.length);
    }, 8000); // ganti tiap 8 detik

    return () => clearInterval(interval);
  }, []);

  // play ulang saat video ganti
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [index]);

  return (
    <div
      className="relative w-full h-[300px] md:h-[500px] lg:h-[450px] mb-5 overflow-hidden rounded-md shadow-2xl cursor-pointer"
    //   onClick={() => router.push("/collections/all-product")}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        key={videos[index]}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videos[index]} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* TEXT CONTENT */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Discover New Collection
          </h1>
          <p className="text-sm md:text-lg opacity-90">
            Buy All With Shoppers 
          </p>
        </div>
      </div>

      {/* DOT INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {videos.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
