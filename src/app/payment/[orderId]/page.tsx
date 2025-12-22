"use client";

import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function PaymentPage({ params }: { params: { orderId: string } }) {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payment, setPayment] = useState<any>(null);

  useEffect(() => {
    const fetchOrderPayment = async () => {
      try {
        const res = await api.get(`/orders/${params.orderId}`);
        setOrder(res.data.data);
      } catch (err) {
        alert("Order not found");
        router.push("/account");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderPayment();
  }, [params.orderId]);

  const handleCreatePayment = async () => {
    if (!paymentMethod) return alert("Pilih metode pembayaran dulu!");

    try {
      const res = await api.post(`/payments`, {
        order_id: params.orderId,
        payment_method: paymentMethod,
      });

      setPayment(res.data.data);

      alert("Payment created!");
    } catch (error: any) {
      alert(error.response?.data?.message || "Error creating payment");
    }
  };

  const handlePay = async () => {
    if (!payment) return alert("Buat payment dulu!");

    try {
      const res = await api.patch(`/payments/${payment.id}`, {
        status: "PAID",
      });

      alert("Pembayaran berhasil!");

      router.push("/account");
    } catch (error) {
      alert("Gagal update payment");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 shadow-xl animate-fade-in">

        <h2 className="text-xl font-semibold mb-4">
          Payment for Order #{order?.id}
        </h2>

        <div className="bg-gray-100 p-4 rounded mb-4">
          <div className="flex justify-between">
            <span>Total Amount:</span>
            <span className="font-bold text-orange-600">
              Rp {Number(order.total_amount).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <label className="block mb-2 font-medium">Payment Method</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <h3>Select</h3>
          <option value="BCA VA">BCA VA</option>
          <option value="MANDIRI VA">Mandiri VA</option>
          <option value="BNI VA">BNI VA</option>
          <option value="BANK DKI VA">BANK DKI VA</option>
          <option value="BRI VA">BRI VA</option>
        </select>

        {!payment ? (
          <button
            onClick={handleCreatePayment}
            className="w-full bg-orange-500 text-white p-3 rounded hover:bg-orange-600"
          >
            Create Payment
          </button>
        ) : (
          <button
            onClick={handlePay}
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Pay Now
          </button>
        )}

        <button
          onClick={() => router.back()}
          className="w-full mt-3 p-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
