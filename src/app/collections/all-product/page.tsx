// src/app/collections/all-product/page.tsx
import ProductGrid from "@/components/products/ProductGrid";
import FiltersSidebar from "@/components/filters/FiltersSidebar";
import SortDropdown from "@/components/filters/SortDropdown";
import PaginationNumbers from "@/components/filters/PaginationNumbers";
import { getAllProducts, getAllCategories, getAllBrands } from "@/lib/products";
import ProductsPageClient from "./ProductsPageClient";
import BannerVideo from "@/components/home/BannerVideo";

export default async function ProductsPage(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;

  // parse params
  const page = Number(searchParams?.page ?? 1);
  const limit = Number(searchParams?.limit ?? 12);
  const category_id = searchParams?.category_id
    ? Number(searchParams.category_id)
    : undefined;
  const brand_id = searchParams?.brand_id
    ? Number(searchParams.brand_id)
    : undefined;
  const min_price = searchParams?.min_price
    ? Number(searchParams.min_price)
    : undefined;
  const max_price = searchParams?.max_price
    ? Number(searchParams.max_price)
    : undefined;
  const min_rating = searchParams?.min_rating
    ? Number(searchParams.min_rating)
    : undefined;
  const sort = (searchParams?.sort as string) ?? undefined;
  const search = (searchParams?.search as string) ?? undefined;

  const filters: Record<string, any> = { page, limit };
  if (category_id) filters.category_id = category_id;
  if (brand_id) filters.brand_id = brand_id;
  if (min_price) filters.min_price = min_price;
  if (max_price) filters.max_price = max_price;
  if (min_rating) filters.min_rating = min_rating;
  if (sort) filters.sort = sort;
  if (search) filters.search = search;

  const [{ products, pagination }, categories, brands] = await Promise.all([
    getAllProducts(filters),
    getAllCategories(),
    getAllBrands(),
  ]);

  return (
    <div className="container mx-auto px-4 py-">
      {/* HEADER */}
      <BannerVideo/>
      <div className="flex items-center justify-between lg:mb-2 ">
        <div>
          <h1 className="text-2xl font-semibold mb-2">All Products</h1>
          <div className="items-center">
            <ProductsPageClient
              categories={categories}
              brands={brands}
              currentFilters={{
                page,
                limit,
                category_id,
                brand_id,
                min_price,
                max_price,
                min_rating,
                sort,
                search,
              }}
            />
          </div>
        </div>

        <div className=" lg:flex items-center gap-4">
          <div className="text-sm text-stone-600">
            {pagination.total} products — page {pagination.page} of{" "}
            {pagination.totalPages}
          </div>
          <SortDropdown currentSort={sort} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* DESKTOP SIDEBAR */}
        <aside className="lg:col-span-1 hidden lg:block">
          <FiltersSidebar
            categories={categories}
            brands={brands}
            currentFilters={{
              page,
              limit,
              category_id,
              brand_id,
              min_price,
              max_price,
              min_rating,
              sort,
              search,
            }}
          />
        </aside>

        {/* PRODUCTS */}
        <main className="lg:col-span-3">
          <ProductGrid products={products} />

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-stone-600">
              Showing {products.length} of {pagination.total} products
            </div>
            <PaginationNumbers
              pagination={pagination}
              currentPage={pagination.page}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
