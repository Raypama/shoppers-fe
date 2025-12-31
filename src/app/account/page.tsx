"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import OrderTabs from "@/components/account/OrdersTabs";
import OrderList from "@/components/account/OrdersList";
import UserCard from "@/components/account/UserCard";

export default function AccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("ORDER ERROR:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user, fetchOrders]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!user) return <div className="p-10">Please login</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UserCard user={user} />

        <div className="md:col-span-2 space-y-4">
          <OrderTabs orders={orders} />
          <OrderList orders={orders} onRefresh={fetchOrders} />
        </div>
      </div>
    </div>
  );
}
