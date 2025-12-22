import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "E-Commerce",
  description: "Starter e-commerce Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className=" bg-stone-100 text-#4B352A">
        <AuthProvider>
          <div className="min-h-screen flex flex-col ">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-4">
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </main>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
