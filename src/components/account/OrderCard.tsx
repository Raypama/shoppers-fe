import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import PayNow from "./PayNow";
type Props = {
  order: Order;
  activeTab: string;
};

export default function OrderCard({ order, activeTab }: Props) {
  const router = useRouter();
 const handleMarkAsCompleted = async (orderId: string | number) => {
  try {
    const res = await api.patch(`/orders/${orderId}`, {
      status: "COMPLETED",
    });

    alert("Order Completed!");

    router.refresh(); // lebih Next.js daripada reload

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat menyelesaikan pesanan.");
  }
};
  return (
    <div className="bg-white border rounded-lg mb-4">
      {/* HEADER */}
      <div className="flex justify-between items-center px-4 py-3 border-b text-sm">
        <span className="font-medium">Order #{order.id}</span>
        <span className="text-orange-500 font-semibold uppercase">
          {order.status}
        </span>
      </div>

      {/* ITEMS */}
      {order.items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 px-4 py-4 border-b last:border-b-0"
        >
          <img
            src={item.product?.media?.[0]?.url || "/product.png"}
            className="w-16 h-16 object-cover rounded"
          />

          <div className="flex-1">
            <p className="font-medium">{item.product_name_snapshot}</p>
            <p className="text-sm text-gray-500">
              {item.quantity} x Rp{" "}
              {Number(item.price_snapshot).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="font-semibold">
            Rp{" "}
            {(Number(item.price_snapshot) * item.quantity).toLocaleString(
              "id-ID"
            )}
          </div>
        </div>
      ))}

      {/* FOOTER */}
      <div className="px-4 py-3 bg-gray-50 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Shipping Cost</span>
          <span>Rp {Number(order.shipping_cost).toLocaleString("id-ID")}</span>
        </div>

        <div className="flex justify-between font-semibold text-base">
          <span>Total Orders</span>
          <span className="text-orange-500">
            Rp {Number(order.total_amount).toLocaleString("id-ID")}
          </span>
        </div>
        {activeTab === "pending" && order.status === "PENDING" && (
          <div className="flex justify-end px-4 py-3 bg-gray-50">
            <PayNow orderId={order.id} />
          </div>
        )}
        {order.status === "COMPLETED" && (
          <div className="flex justify-end pt-2">
            <button className="px-4 py-2 text-sm bg-orange-500 text-white rounded">
              Rated Product
            </button>
          </div>
        )}
        {order.status === "DELIVERED" && activeTab === "dikirim" && (
          <button
            onClick={() => handleMarkAsCompleted(order.id.toString())}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded"
          >
            Pesanan Diterima
          </button>
        )}
      </div>
    </div>
  );
}
