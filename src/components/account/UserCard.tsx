"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function UserCard({ user }: { user: any }) {
  const { logout } = useAuth();

  return (
    <div className="md:col-span-1">
      <div className="bg-white transition scroll-smooth p-6 rounded-xl shadow sticky top-24">
        <img
          src={user.profile_image || "/default-user.png"}
          className="w-24 h-24 rounded-full mx-auto border object-cover"
        />

        <h2 className="text-xl font-semibold text-center mt-4">
          {user.nickname}
        </h2>
        <p className="text-sm text-center text-gray-600">
          {user.email}
        </p>
        <p>
          {user.addresses}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/account/edit"
            className="text-center border py-2 rounded hover:bg-gray-100"
          >
            Update Profile
          </Link>

          <button
            onClick={logout}
            className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
