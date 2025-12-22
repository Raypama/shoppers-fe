import { getProductBySlug } from "@/lib/products";
import ProductImageSlider from "@/components/products/ProductImageSlider";
import QuantitySelector from "@/components/products/QuantitySelector";
import { Heart } from "lucide-react";
import { addToCartAPI } from "@/lib/cart";
import toast from "react-hot-toast";
import AddToCartButton from "../addToCartButton";




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
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          {/* Rating */}
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <span className="text-yellow-500">
              ⭐ {Number(product.rating ?? 0).toFixed(1)}
            </span>
            <span>(21 ulasan)</span>
          </div>
          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">
              Rp {Number(product.price).toLocaleString("id-ID")}
            </span>
            {/* <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
              7%
            </span> */}
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium">Category : {product.category?.name}</p>
            <p className="font-medium">Brand : {product.brand?.name}</p>
          </div>
          {/* Benefit */}
          <div className="space-y-2 text-sm">
            <p className="font-medium">
              Benefit : 🚚 <span>Disc Shipping Cost on JABODETABEK</span>
            </p>
          </div>
          <div>
            <p>Stock: {product.stock}</p>
          </div>
          {/* Quantity */}
          {/* <div className="flex items-center gap-4">
            <QuantitySelector
              stock={product.stock}
            />
          </div> */}
          <hr /> {/* Wishlist */}
          <button className="flex items-center justify-center gap-2 border rounded-lg py-3">
            <Heart className="w-5 h-5 text-stone-800 hover:text-pink-500 transition-colors duration-300 cursor-pointer" />
            Add to Wishlist
          </button>
          {/* Add to Cart */}
          <AddToCartButton productId={product.id}/>
        </div>
      </div>
    </div>
  );
}
