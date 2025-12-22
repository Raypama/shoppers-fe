"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { LoginPayload, AuthResponse } from "@/types/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;

    const payload: LoginPayload = {
      email: (form.email as HTMLInputElement).value.trim(),
      password: (form.password as HTMLInputElement).value,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data: AuthResponse = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      login({
        user: data.data.user,
        token: data.data.token,
      });
     toast.success("Sign in successful!");
      router.push("/");
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
        className="w-full max-w-sm  p-6 rounded-xl shadow space-y-4"
      >
        <h1 className="text-2xl font-semibold text-center text-stone-900">
          Login
        </h1>

        {error && (
          <div className="text-sm text-red-600  px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-stone-300"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Password</label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-stone-300"
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-stone-900 text-white py-2 rounded hover:bg-stone-800 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-stone-600">
          Belum punya akun?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-stone-900 underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
