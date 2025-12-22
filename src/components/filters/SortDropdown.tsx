"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "", label: "Fitur" },
  { value: "price_asc", label: "Harga Termurah" },
  { value: "price_desc", label: "Harga Termahal" },
  { value: "popular", label: "Terlaris" },
  { value: "newest", label: "Terbaru" },
  { value: "rating_desc", label: "Rating Tertinggi" },
];

export default function SortDropdown({ currentSort }: { currentSort?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (v: string) => {
    const params = new URLSearchParams(Object.fromEntries(Array.from(searchParams.entries())));
    if (v) params.set("sort", v); else params.delete("sort");
    params.set("page", "1");
    router.push(`/collections/all-product?${params.toString()}`);
  };

  return (
    <select
      value={currentSort ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-1 text-sm"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
