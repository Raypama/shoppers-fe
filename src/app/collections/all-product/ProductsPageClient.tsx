"use client";

import { useState } from "react";
import FiltersSidebar from "@/components/filters/FiltersSidebar";

export default function ProductsPageClient({ categories, brands, currentFilters }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE FILTER BUTTON */}
      <div className="lg:hidden mb-4">
        <button
          className="px-2  rounded-md border text-left bg-white shadow-sm"
          onClick={() => setOpen(true)}
        >
          ☰ Filters
        </button>
      </div>

      {/* SLIDE-IN DRAWER */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white shadow-lg z-50 transition-transform duration-300 
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="p-4 overflow-y-auto h-full">
          <FiltersSidebar categories={categories} brands={brands} currentFilters={currentFilters} />
        </div>
      </div>
    </>
  );
}
