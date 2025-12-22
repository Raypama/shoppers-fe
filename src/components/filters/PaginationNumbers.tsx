"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PaginationNumbers({
  pagination,
  currentPage,
}: {
  pagination: { page: number; limit: number; total: number; totalPages: number };
  currentPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const range = (start: number, end: number) => {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
  };

  const totalPages = pagination.totalPages;
  const page = currentPage;

  // choose window
  const delta = 2;
  const from = Math.max(1, page - delta);
  const to = Math.min(totalPages, page + delta);
  const pages = range(from, to);

  const go = (p: number) => {
    const params = new URLSearchParams(Object.fromEntries(Array.from(searchParams.entries())));
    params.set("page", String(p));
    router.push(`/collections/all-product?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => go(Math.max(1, page - 1))}
        className="px-3 py-1 border rounded text-sm"
        disabled={page <= 1}
      >
        Prev
      </button>

      {from > 1 && (
        <>
          <button onClick={() => go(1)} className="px-3 py-1 border rounded text-sm">1</button>
          {from > 2 && <span className="px-2">...</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`px-3 py-1 border rounded text-sm ${p === page ? "bg-stone-900 text-white" : ""}`}
        >
          {p}
        </button>
      ))}

      {to < totalPages && (
        <>
          {to < totalPages - 1 && <span className="px-2">...</span>}
          <button onClick={() => go(totalPages)} className="px-3 py-1 border rounded text-sm">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => go(Math.min(totalPages, page + 1))}
        className="px-3 py-1 border rounded text-sm"
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
