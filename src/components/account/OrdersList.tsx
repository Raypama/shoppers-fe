"use client";

import { useSearchParams } from "next/navigation";
import OrderCard from "./OrderCard";
import { statusTabMap } from "@/lib/orderStatus";

type Props = {
  orders: any[];
  onRefresh: () => void;
};
// DESCENDING DISINI  Orders diolah disini
export default function OrderList({ orders, onRefresh }: Props) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "all";

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((o) => statusTabMap[o.status] === activeTab);

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Tidak ada pesanan.
      </div>
    );
  }

  return (
    <div>
      {filteredOrders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          activeTab={activeTab}
          onRefresh={onRefresh}
        />
      ))}
    </div>
  );
}
