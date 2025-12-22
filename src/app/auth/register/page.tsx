"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RegisterPayload } from "@/types/auth";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const form = e.currentTarget;
    const nickname = (form.nickname as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const password = (form.password as HTMLInputElement).value;
    const payload: RegisterPayload = {
      nickname,
      email,
      password,
    };
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // ⬅️ FIX
      });

      const data = await res.json();
      console.log(data);
      
      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }
      
      toast.success("Register successful! Please login.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center">Register</h1>

        {error && (
          <div className="text-sm text-red-600  px-3 py-2 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="text-sm text-green-700  px-3 py-2 rounded">
            {success}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Nickname</label>
          <input
            name="nickname"
            required
            placeholder="admin"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-stone-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="admin@gmail.com"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-stone-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-stone-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <p className="text-xs text-stone-500">
            Min 8 karakter, kombinasi huruf besar & simbol
          </p>
        </div>

        <button
          disabled={loading}
          className="w-full bg-stone-900 text-white py-2 rounded hover:bg-stone-800 transition disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center text-stone-600">
          Sudah punya akun?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-stone-900 underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
