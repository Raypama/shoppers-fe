"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Plus, Pencil } from "lucide-react";
import AddressModal from "@/components/address/AddressModal";
import toast from "react-hot-toast";
import Router from "next/router";

type Props = {
  orderId: string;
};

const COURIERS = [
  { name: "JNE", price: 12000, img: "/images/courier/jne.png" },
  { name: "JNT", price: 16000, img: "/images/courier/jnt.png" },
  { name: "TIKI", price: 15000, img: "/images/courier/tiki.png" },
];

const PAYMENTS = [
  { key: "BCA VA", img: "/images/payments/bca.png" },
  { key: "BRI VA", img: "/images/payments/bri.png" },
  { key: "BNI VA", img: "/images/payments/bni.png" },
  { key: "MANDIRI VA", img: "/images/payments/livin.png" },
  { key: "BANK DKI VA", img: "/images/payments/bank-dki.png" },
  { key: "QRIS", img: "/images/payments/qr.png" },
];

export default function OrderDetail({ orderId }: Props) {
  const [order, setOrder] = useState<any>(null);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [courier, setCourier] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [showQRIS, setShowQRIS] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [countdown, setCountdown] = useState(24 * 60 * 60); // detik
  const [expiredAt, setExpiredAt] = useState<Date | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [remaining, setRemaining] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, []);

  const isPayDisabled =
    isExpired ||
    addresses.length === 0 ||
    !selectedAddress ||
    !courier ||
    !paymentMethod ||
    isSummaryLoading;

  const getCourierPrice = (courierName: string) => {
    return COURIERS.find((c) => c.name === courierName)?.price || 0;
  };

  const getSubtotal = () => {
    if (!order) return 0;

    return order.items.reduce((sum: number, item: any) => {
      return sum + Number(item.price_snapshot) * item.quantity;
    }, 0);
  };

  const getTotalAmount = (shippingCost: number) => {
    return getSubtotal() + shippingCost;
  };

  const fetchOrder = async () => {
    const res = await api.get(`/api/orders/${orderId}`);
    const data = res.data.data;

    // ❌ block order PAID
    if (data.status === "PAID") {
      toast.success("Order sudah dibayar 🎉");
      Router.replace("/account/orders");
      return;
    }

    setOrder(data);
    setPaymentMethod(data.payment_method);

    // ⏱️ expired = createdAt + 24 jam
    const created = new Date(data.createdAt);
    const expired = new Date(created.getTime() + 24 * 60 * 60 * 1000);

    setExpiredAt(expired);
    setIsExpired(new Date() > expired);

    
    // ambil default address dari relasi order
    const defaultAddr = data.user?.addresses?.[0] || null;
    
    if (defaultAddr) {
      setSelectedAddress(defaultAddr.id);
    }
    
    
    if (data.shipment?.courier) {
      setCourier(data.shipment.courier);
    }
    await fetchAllAddresses();
  };
  
  const handleCopyVA = async () => {
    await navigator.clipboard.writeText(order.payment.transaction_id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h}j ${m}m ${s}d`;
  };
  const selectedAddr = order?.user?.addresses?.find(
    (a: any) => a.id === selectedAddress
  );
  useEffect(() => {
    if (!expiredAt) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = expiredAt.getTime() - now;

      if (diff <= 0) {
        setRemaining("00:00:00");
        setIsExpired(true);
        clearInterval(timer);
        return;
      }

      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setRemaining(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
          s
        ).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [expiredAt]);
  useEffect(() => {
    if (!isExpired || !order) return;

    const cancelOrder = async () => {
      try {
        // update order
        await api.put(`/api/orders/${orderId}`, {
          status: "CANCELED",
        });

        // update payment
        if (order.payment?.id) {
          await api.put(`/api/payments/${order.payment.id}`, {
            status: "EXPIRED",
          });
        }

        toast.error("Order dibatalkan karena melewati batas waktu pembayaran");
      } catch (err) {
        console.error(err);
      }
    };

    cancelOrder();
  }, [isExpired]);

  const handleSelectCourier = async (name: string) => {
    try {
      setCourier(name);
      setIsSummaryLoading(true);

      const shippingCost = getCourierPrice(name);
      const totalAmount = getTotalAmount(shippingCost);

      // 1️⃣ update shipment
      if (order.shipment) {
        await api.put(`/api/shipments/${order.shipment.id}`, {
          courier: name,
          cost: shippingCost,
        });
      }

      // 2️⃣ update order (INI PENTING)
      await api.put(`/api/orders/${orderId}`, {
        shipping_cost: String(shippingCost),
        total_amount: String(totalAmount),
      });

      // 3️⃣ fetch ulang
      await fetchOrder();
    } catch (err) {
      console.error(err);
      alert("Failed update courier");
    } finally {
      setIsSummaryLoading(false);
    }
  };
  const fetchAllAddresses = async () => {
    const res = await api.get("/api/user-address");
    setAddresses(res.data.data);
    console.log(addresses);
  };
  const handleSelectAddress = async (addressId: number) => {
    try {
      setSelectedAddress(addressId);
      setIsSummaryLoading(true);

      // 🔥 update default address ke BE
      await api.put(`/api/user-address/${addressId}`, {
        is_default: true,
      });

      // refresh order biar konsisten
      await fetchOrder();
    } catch (err) {
      console.error(err);
      alert("Failed selected Address");
    } finally {
      setIsSummaryLoading(false);
    }
  };
  const handleUpdatePayment = async () => {
    try {
      setIsSummaryLoading(true);

      await api.put(`/api/orders/${orderId}`, {
        payment_method: paymentMethod,
      });

      await fetchOrder();
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    try {
      setIsSummaryLoading(true);

      // 1️⃣ update payment status
      if (order.payment?.id) {
        await api.put(`/api/payments/${order.payment.id}`, {
          status: "PAID",
        });
      }

      // // 2️⃣ update order status
      // await api.put(`/api/orders/${orderId}`, {
      //   status: "PAID",
      // });

      // 3️⃣ redirect
      setShowPaymentModal(false);

      setTimeout(() => {
        window.location.href = "/thank-you";
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Gagal konfirmasi pembayaran");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handlePayNow = () => {
    if (!selectedAddress) {
      alert("Pilih alamat dulu");
      return;
    }

    if (!courier) {
      alert("Pilih kurir dulu");
      return;
    }

    if (paymentMethod === "QRIS") {
      setShowQRIS(true);
      return;
    }

    alert("Redirect ke payment gateway (dummy)");
    setShowPaymentModal(true);
  };
  useEffect(() => {
    if (!showPaymentModal) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showPaymentModal]);

  if (!order)
    return (
      <p className="flex h-full w-full items-center justify-center">
        Loading...
      </p>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* ADDRESS */}
          <section className="bg-white border rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Shipping Address</h2>

              <div className="flex items-center gap-3">
                {/* ➕ Add Address */}
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressModal(true);
                  }}
                  className="p-2 rounded hover:bg-gray-100"
                  title="Tambah alamat"
                >
                  <Plus size={18} />
                </button>

                {/* ✏️ Edit Address (hanya aktif kalau ada selectedAddress) */}
                {selectedAddress && (
                  <button
                    onClick={() => {
                      const addr = addresses.find(
                        (a) => a.id === selectedAddress
                      );
                      setEditingAddress(addr);
                      setShowAddressModal(true);
                    }}
                    className="p-2 rounded hover:bg-gray-100"
                    title="Edit alamat"
                  >
                    <Pencil size={16} />
                  </button>
                )}
              </div>
            </div>

            {addresses.length === 0 && (
              <p className="text-red-500 text-sm">
                ⚠️ Wajib menambahkan alamat terlebih dahulu
              </p>
            )}

            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => handleSelectAddress(addr.id)}
                  className={`
        flex gap-3 border p-4 rounded cursor-pointer transition
        ${
          selectedAddress === addr.id
            ? "border-black bg-gray-100 ring-1 ring-black"
            : "border-gray-300 hover:border-gray-500"
        }
      `}
                >
                  <div className="flex-1">
                    <p className="font-medium">
                      {addr.label} – {addr.recipient_name}
                    </p>
                    <p className="text-sm text-gray-600">{addr.phone}</p>
                    <p className="text-sm text-gray-600">
                      {addr.address_line}, {addr.city}, {addr.province}
                    </p>
                  </div>

                  {selectedAddress === addr.id && (
                    <div className="text-green-600 font-semibold">✓</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* COURIER */}
          <section className="bg-white border rounded p-4">
            <h2 className="font-semibold mb-4">Shipping Method:</h2>

            <div className="grid gap-5 grid-cols-3 ">
              {COURIERS.map((c) => {
                const isActive = courier === c.name;

                return (
                  <div
                    key={c.name}
                    onClick={() => handleSelectCourier(c.name)}
                    className={`cursor-pointer border rounded-lg p-4 transition
            ${
              isActive
                ? "border-black bg-gray-100 ring-1 ring-black"
                : "border-gray-300 hover:border-gray-500"
            }
          `}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={c.img}
                        alt={c.name}
                        className="h-16 object-contain"
                      />

                      <div className="text-center">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-sm text-gray-500">
                          Rp {c.price.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PAYMENT */}
          <section className="bg-white border rounded p-4">
            <h2 className="font-semibold mb-4">Select Payment</h2>

            <div className="grid grid-cols-2 gap-3">
              {PAYMENTS.map((pm) => {
                const isActived = paymentMethod === pm.key;

                return (
                  <div
                    key={pm.key}
                    onClick={() => setPaymentMethod(pm.key)}
                    className={`cursor-pointer border rounded-lg p-4 transition
                    ${
                      isActived
                        ? "border-black bg-gray-100 ring-1 ring-black"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex flex-col items-center w-full">
                      <img src={pm.img} className="h-28 object-contain " />
                      <p className="text-sm">{pm.key}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ================= RIGHT ================= */}
        <aside className="bg-white border rounded p-4 h-fit">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-sm">
            {order.items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product?.media?.[0]?.url || "/placeholder.png"}
                    alt={item.product_name_snapshot}
                    className="w-14 object-cover h-14 rounded"
                  />{" "}
                  <span>
                    {item.product_name_snapshot} <br /> x {item.quantity}
                  </span>
                </div>
                <span className="text-[12px]">
                  Rp{" "}
                  {(item.price_snapshot * item.quantity).toLocaleString(
                    "id-ID"
                  )}
                </span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {isSummaryLoading ? (
                  <span className="animate-pulse text-gray-400">
                    Updating...
                  </span>
                ) : (
                  `Rp ${Number(order.shipping_cost).toLocaleString("id-ID")}`
                )}
              </span>
            </div>

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-orange-500">
                Rp {Number(order.total_amount).toLocaleString("id-ID")}
              </span>
            </div>

            <button
              disabled={isPayDisabled}
              onClick={handlePayNow}
              className={`mt-4 w-full py-3 rounded transition
    ${
      isPayDisabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-black text-white hover:bg-gray-800"
    }
  `}
            >
              {isExpired
                ? "Order Expired"
                : addresses.length === 0
                ? "Tambah alamat terlebih dahulu"
                : "Pay Now"}
            </button>
          </div>
        </aside>
      </div>

      {/* ================= QRIS MODAL ================= */}
      {showQRIS && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-80 text-center">
            <h3 className="font-semibold mb-4">Scan QRIS</h3>
            <img
              src="/images/payments/QRIS-dummy.jpg"
              className="w-full mb-4"
            />
            <button
              onClick={() => setShowQRIS(false)}
              className="w-full py-2 bg-black text-white rounded"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
      {showPaymentModal && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-5 shadow-xl">
      
      {/* HEADER */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">Payment Summary</h3>
        <p className="text-sm text-gray-500">
          Complete the payment before
        </p>
        <p className="text-xl font-bold text-red-500 mt-1">
          {formatTime(countdown)}
        </p>
      </div>

      <hr />

      {/* SHIPPING ADDRESS */}
      <div className="text-left space-y-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Shipping Address
        </p>
        <p className="font-medium text-sm">
          {selectedAddr
            ? `${selectedAddr.label} – ${selectedAddr.recipient_name}`
            : "-"}
        </p>
        <p className="text-sm text-gray-600">
          {selectedAddr
            ? `${selectedAddr.address_line}, ${selectedAddr.city}, ${selectedAddr.province}`
            : "-"}
        </p>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">{order.payment_method}</span>
        </div>

        {/* VIRTUAL ACCOUNT */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Virtual Account Number</p>
          <div className="flex items-center justify-between bg-white border rounded px-3 py-2">
            <span className="font-mono text-sm truncate">
              {order.payment.transaction_id}
            </span>

            <button
              onClick={handleCopyVA}
              className="text-xs px-3 py-1 rounded border hover:bg-gray-100 transition"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="flex justify-between items-center text-base font-semibold">
        <span>Total Payment</span>
        <span className="text-orange-500 text-lg">
          Rp {Number(order.total_amount).toLocaleString("id-ID")}
        </span>
      </div>

      {/* ACTION */}
      <button
        disabled={isSummaryLoading}
        onClick={handleConfirmPayment}
        className={`w-full py-3 rounded-lg font-medium transition
          ${
            isSummaryLoading
              ? "bg-gray-300 text-gray-500"
              : "bg-black text-white hover:bg-gray-800"
          }
        `}
      >
        {isSummaryLoading ? "Processing..." : "Saya Sudah Bayar"}
      </button>

      {/* FOOT NOTE */}
      <p className="text-xs text-gray-400 text-center">
        Pastikan nominal dan VA sesuai sebelum melakukan pembayaran
      </p>
    </div>
  </div>
)}

    </div>
  );
}
