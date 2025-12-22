import ProductCard from "@/components/products/ProductCard";
import { getProductsBySearch } from "@/lib/products";
import Link from "next/link";

export default async function SearchPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? "";
  const results = await getProductsBySearch(String(query));

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Search results for: “{query}”
        </h1>

        {/* ⬅ Tombol clear */}
        <Link
          href="/collections/all-product"
          className="text-sm text-blue-600 hover:underline"
        >
          Clear search
        </Link>
      </div>

      {results.length === 0 ? (
        <p className="text-stone-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
