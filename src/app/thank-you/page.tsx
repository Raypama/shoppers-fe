"use client";

import Link from "next/link";

export default function ThankYouPage() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER DARI LAYOUT */}

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white border rounded-lg p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2">
            Terima Kasih {user.full_name || "Customer"} 🙏
          </h1>

          <p className="text-gray-600 mb-6">
            Pembayaran Anda berhasil dan sedang kami proses.
          </p>

          <Link
            href="/"
            className="inline-block w-full py-3 bg-black text-white rounded hover:bg-gray-800"
          >
            Back to Shop
          </Link>
        </div>
      </main>

      {/* FOOTER DARI LAYOUT */}
    </div>
  );
}
