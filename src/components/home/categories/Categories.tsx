import Link from "next/link";

const categories = [
  { name: "Shoes", image: "/images/categories/shoes.jpg", href: "/collections/all-product?category_id=1&page=1" },
  { name: "Bags", image: "/images/categories/bags.jpg", href: "/collections/all-product?category_id=2&page=1" },
  { name: "Apparel", image: "/images/categories/apparel.jpg", href: "/collections/all-product?category_id=3&page=1" },
  { name: "Accessories", image: "/images/categories/accessories.jpg", href: "/collections/all-product?category_id=4&page=1" },
];

export default function Categories() {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {categories.map((cat, i) => (
        <Link
          key={i}
          href={cat.href}
          className="
            relative h-56 w-full rounded-xl overflow-hidden 
            group cursor-pointer
          "
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-300 
                       group-hover:scale-110"
            style={{ backgroundImage: `url(${cat.image})` }}
          ></div>

          {/* Overlay gelap */}
          <div className="
              absolute inset-0 bg-black/40 
              group-hover:bg-black/60 
              transition-all duration-300
          "></div>

          {/* Teks */}
          <div className="
              relative z-10 h-full w-full flex items-center justify-center
          ">
            <span className="
                text-white text-2xl font-semibold 
                transition-all duration-300 
                group-hover:scale-110
            ">
              {cat.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
