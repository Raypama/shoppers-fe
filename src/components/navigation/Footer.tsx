import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-300 mt-12 py-10 text-stone-800">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Column 1 */}
        <div>
          <h3 className="font-bold text-lg mb-4">Shop</h3>
          <p className="text-sm text-stone-700">
            Your trusted place for premium fashion products.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold mb-3">Information</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/offline-store" className="hover:underline">Offline Store</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2 text-sm">

            <li><Link href="/shipping" className="hover:underline">Shipping Info</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Instagram</Link></li>
            <li><Link href="#" className="hover:underline">Facebook</Link></li>
            <li><Link href="#" className="hover:underline">TikTok</Link></li>
            <li><Link href="#" className="hover:underline">YouTube</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-stone-400 pt-4 text-center text-sm text-stone-700">
        © {new Date().getFullYear()} Shop — All Rights Reserved.
      </div>
    </footer>
  );
}
