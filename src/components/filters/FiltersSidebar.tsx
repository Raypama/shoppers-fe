"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Category = { id: number; name: string; slug?: string };
type Brand = { id: number; name: string; slug?: string };

export default function FiltersSidebar({
  categories = [],
  brands = [],
  currentFilters = {},
}: {
  categories: Category[];
  brands: Brand[];
  currentFilters?: Record<string, any>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // local state for price/rating (init from currentFilters)
  const [minPrice, setMinPrice] = useState(currentFilters.min_price ?? "");
  const [maxPrice, setMaxPrice] = useState(currentFilters.max_price ?? "");
  const [minRating, setMinRating] = useState(currentFilters.min_rating ?? "");

  // helper: update URL with new params and reset page to 1
  const updateParams = (newParams: Record<string, any>) => {
    const params = new URLSearchParams(
      Object.fromEntries(Array.from(searchParams.entries()))
    );
    // apply new params
    Object.entries(newParams).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") params.delete(k);
      else params.set(k, String(v));
    });
    params.set("page", "1"); // reset page on filter change
    router.push(`/collections/all-product?${params.toString()}`);
  };

  const toggleCategory = (catId: number) => {
    // support single category or multiple? backend supports category_id; we send single
    updateParams({ category_id: catId });
  };

  const toggleBrand = (brandId: number) => {
    updateParams({ brand_id: brandId });
  };

  const applyPrice = () => {
    updateParams({
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
    });
  };

  const applyRating = (val: number) => {
    setMinRating(String(val));
    updateParams({ min_rating: val });
  };

  const resetAll = () => {
    router.push(`/collections/all-product`);
  };

  return (
    <div className="p-4 border  rounded-md bg-white">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold">Filter</h4>
        <button className="text-sm text-blue-600" onClick={resetAll}>
          Reset
        </button>
      </div>

      {/* Category */}
      <div className="mb-4">
        <h5 className="font-medium mb-2">By Category</h5>
        <ul className="space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c.id}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={String(currentFilters.category_id) === String(c.id)}
                  onChange={() => toggleCategory(c.id)}
                />
                <span>{c.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Brand */}
      <div className="mb-4">
        <h5 className="font-medium mb-2">Brand</h5>
        <ul className="space-y-2 text-sm max-h-48 overflow-auto">
          {brands.map((b) => (
            <li key={b.id}>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={String(currentFilters.brand_id) === String(b.id)}
                  onChange={() => toggleBrand(b.id)}
                />
                <span>{b.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="mb-4">
        <h5 className="font-medium mb-2">Price (Max)</h5>

        <div className="">
          <div className="w-full flex justify-between items-center mb-2 ">
            <span className="text-sm">Rp. 0</span>
            <span className="text-sm w-fit ">
              Rp. {Number(maxPrice || 0).toLocaleString("id-ID")}
            </span>
          </div>
          <div>
            <input
              type="range"
              min={0}
              max={5000000}
              step={50000}
              value={maxPrice || 0}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="flex-1 w-full"
            />
          </div>
        </div>

        <button
          className="mt-2 px-3 py-1 bg-stone-900 text-white rounded text-sm"
          onClick={() =>
            updateParams({
              min_price: undefined,
              max_price: maxPrice || undefined,
            })
          }
        >
          Apply
        </button>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h5 className="font-medium mb-2">Rating</h5>
        <div className="flex flex-col gap-2 text-sm">
          {[4.5, 4.0, 3.5].map((r) => (
            <button
              key={r}
              className={`text-left px-2 py-1 rounded ${
                String(currentFilters.min_rating) === String(r)
                  ? "bg-stone-200"
                  : ""
              }`}
              onClick={() => applyRating(Number(r))}
            >
              {r}+ stars
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
