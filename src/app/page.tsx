import Banner from "@/components/home/Banner";
import Categories from "@/components/home/categories/Categories";
// import ProductGrid from "@/components/products/ProductGrid";
// import Link from "next/link";
// import { getProducts } from "@/lib/products";

export default async function HomePage() {
  //   const products = await getProducts();

  return (
    <section>
      <div className="mb-8">
        <div className="rounded-lg overflow-hidden relative">
          <h1 className="font-bold  text-2xl mt-2">
            Big <span className="text-red-800">Sale!!!</span> Welcomes To Shopping anyway
          </h1>
          <Banner/>
        </div>
        <h2 className="font-bold  text-2xl">
            Select From <span className="text-amber-950">Category:</span>
          </h2>
        <Categories/>
      </div>

      {/* <ProductGrid products={products} /> */}
    </section>
  );
}
