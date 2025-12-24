"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function Header() {
  const items = useCartStore((s) => s.cart);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showCategories, setShowCategories] = useState(false);
  const [showBrands, setShowBrands] = useState(false);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?query=${query}`);
  };

  const baseURL = process.env.FE_BASE_URL
  return (
    <header className="w-full z-50">
      {/* TOP BAR */}
      <div className="w-full bg-stone-200 text-stone-700 text-xs py-2 border-b  border-stone-300">
        <div className="container mx-auto flex justify-end gap-4 px-4">
          <Link href="/offline-store">Find a Store</Link>
          <Link href="/help">Help</Link>
          <Link href="/join">Join Us</Link>
          {!user ? (
            <Link href="/auth/login">Sign In</Link>
          ) : (
            <button
              onClick={logout}
              className="transition font-semibold hover:text-red-600"
            >
              Sign Out
            </button>
          )}{" "}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="w-full bg-stone-100 border-b border-stone-300">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-stone-900">
            SHOP<span className="text-amber-950">PERS</span>
          </Link>

          {/* MENU */}

          <nav className="hidden lg:flex gap-8 text-stone-800 font-medium text-sm">
            <Link href="/collections/all-product">All Product</Link>

            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <button className="hover:text-stone-600">Categories</button>

              {showCategories && (
                <div className="absolute left-0  top-full w-fit bg-white shadow-lg  p-10 pr-20 grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm mb-3">Popular</h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link href='http://localhost:3000/collections/all-product?category_id=1&page=1'>Shoes</Link>
                      </li>
                      <li>
                        <Link href="http://localhost:3000/collections/all-product?category_id=3&page=1">Apparel</Link>
                      </li>
                      <li>
                        <Link href="http://localhost:3000/collections/all-product?category_id=4&page=1">Accesories</Link>
                      </li>
                      <li>
                        <Link href="http://localhost:3000/collections/all-product?category_id=2&page=1">Bags</Link>
                      </li>
                    </ul>
                  </div>

                  
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setShowBrands(true)}
              onMouseLeave={() => setShowBrands(false)}
            >
              <button className="hover:text-stone-600">Brands</button>

              {showBrands && (
                <div className="absolute left-0 top-full w-fit bg-white shadow-lg p-10 pr-20 grid grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link href='http://localhost:3000/collections/all-product?brand_id=1&page=1'>Nike</Link>
                    </li>
                    <li>
                      <Link href="http://localhost:3000/collections/all-product?brand_id=3&page=1">Puma</Link>
                    </li>
                    <li>
                      <Link href="http://localhost:3000/collections/all-product?brand_id=4&page=1">Adidas</Link>
                    </li>
                    <li>
                      <Link href="http://localhost:3000/collections/all-product?brand_id=4&page=1">Reebok</Link>
                    </li>
                  </ul>

                  {/* <ul className="space-y-2 text-sm">
                    <li>
                      <Link href="#">Converse</Link>
                    </li>
                    <li>
                      <Link href="#">New Balance</Link>
                    </li>
                    <li>
                      <Link href="#">Reebok</Link>
                    </li>
                  </ul> */}
                </div>
              )}
            </div>

            {/* BRAND MODAL */}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-4">
            {/* SEARCH BOX */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm border border-stone-300"
            >
              <Search className="w-5 h-5 text-stone-500" />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-transparent outline-none ml-2 text-sm w-32"
              />
            </form>

            {/* WISHLIST */}
            <Link href="/wishlist">
              <Heart className="w-5 h-5 text-stone-800 hover:text-pink-500 transition-colors duration-300 cursor-pointer" />
            </Link>

            {/* CART */}
            <Link href="/cart" className="relative">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white text-xs px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              )}
            </Link>
            {/* USER AVATAR (JIKA LOGIN) */}
            {user && (
              <Link href="/account" className="flex items-center gap-3">
                <img
                  src={user.profile_image}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-stone-300 hover:ring-2 hover:ring-stone-400 transition"
                />
                <p className="text-sm">let's Shopp!! {user.nickname}</p>
              </Link>
            )}
            {/* MOBILE MENU */}
            <button onClick={() => setOpen(!open)} className="lg:hidden">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="lg:hidden bg-stone-100 border-b border-stone-300 p-5 space-y-4 text-stone-800">
          <Link href="/collections/all-product">All Product</Link>
          <details>
            <summary className="font-medium">Categories</summary>
            <ul className="ml-4 mt-2 space-y-2 text-sm">
              <li>
                <Link href="#">Sneakers</Link>
              </li>
              <li>
                <Link href="#">Boots</Link>
              </li>
            </ul>
          </details>

          <details>
            <summary className="font-medium">Brands</summary>
            <ul className="ml-4 mt-2 space-y-2 text-sm">
              <li>
                <Link href="#">Nike</Link>
              </li>
              <li>
                <Link href="#">Puma</Link>
              </li>
            </ul>
          </details>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-stone-300 mt-2"
          >
            <Search className="w-5 h-5 text-stone-500" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </form>
        </div>
      )}
    </header>
  );
}
