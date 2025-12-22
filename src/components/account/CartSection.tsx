
"use client";

export default function CartSection({ cart }: { cart: any[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-xl font-semibold mb-4">My Orders</h3>

      {cart.length === 0 ? (
        <p className="text-gray-500">belum ada pesanan</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border rounded-lg p-4"
            >
              <img
                src={item.product?.media}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1">
                <h4 className="font-semibold">
                  {item.product?.name}
                </h4>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
                <p className="font-bold">
                  Rp{" "}
                  {Number(item.product?.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
