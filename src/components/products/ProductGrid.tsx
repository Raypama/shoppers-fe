import ProductCard from "./ProductCard";

export default function ProductGrid({ products }: { products: any[] }) {
  if (!products) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
