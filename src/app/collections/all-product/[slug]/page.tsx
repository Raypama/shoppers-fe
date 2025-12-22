import { parseSlug } from "@/lib/utils";
import { getProductBySlug } from "@/lib/products";
import ProductImageSlider from "@/components/products/ProductImageSlider";

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  

  const product = await getProductBySlug(slug);

  if (!product) {
    return <div className="p-10">Product not found</div>;
  }

  const images = product.media?.map((m) => m.url) ?? [];

  return (
    <div className="container mx-auto px-4 py-10">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

    {/* LEFT – IMAGE */}
    <div>
      <ProductImageSlider images={images} />
    </div>

    {/* RIGHT – INFO */}
    <div className="flex flex-col gap-4">

      {/* Title */}
      <h1 className="text-3xl font-semibold">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2 text-sm text-stone-600">
        <span className="text-yellow-500">⭐ {Number(product.rating ?? 0).toFixed(1)}</span>
        <span>(21 ulasan)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-red-500">
          Rp {Number(product.price).toLocaleString("id-ID")}
        </span>
        <span className="line-through text-stone-400 text-sm">
          Rp 198.000
        </span>
        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
          7%
        </span>
      </div>

      {/* Color */}
      <div>
        <p className="text-sm mb-2">Color: <b>Black</b></p>
        <div className="flex gap-3">
          <button className="w-9 h-9 rounded-full border-2 border-black bg-black" />
          <button className="w-9 h-9 rounded-full border bg-black/80" />
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded">
          <button className="px-3 py-2">−</button>
          <span className="px-4">1</span>
          <button className="px-3 py-2">+</button>
        </div>
      </div>

      <hr />

      {/* Benefit */}
      <div className="space-y-2 text-sm">
        <p className="font-medium">Benefit:</p>
        <div className="flex items-center gap-2">
          🚚 <span>Gratis Ongkir Seluruh Indonesia</span>
        </div>
        <div className="flex items-center gap-2">
          🛡️ <span>Garansi 1 Tahun <a className="text-blue-600 cursor-pointer">Klaim</a></span>
        </div>
      </div>

      {/* Wishlist */}
      <button className="flex items-center justify-center gap-2 border rounded-lg py-3">
        🤍 Tambahkan ke Wishlist
      </button>

      {/* Add to Cart */}
      <button className="bg-teal-900 hover:bg-teal-800 text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2">
        🛒 Tambah ke Keranjang
      </button>

    </div>
  </div>
</div>

  );
}
