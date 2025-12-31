"use client";

import { useState } from "react";
import api from "@/lib/axios";

type Props = {
  initialData?: any;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddressModal({
  initialData,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    label: initialData?.label || "",
    recipient_name: initialData?.recipient_name || "",
    phone: initialData?.phone || "",
    address_line: initialData?.address_line || "",
    city: initialData?.city || "",
    province: initialData?.province || "",
    postal_code: initialData?.postal_code || "",
    is_default: initialData?.is_default || false,
  });

  const isEdit = Boolean(initialData);

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await api.put(`/api/user-address/${initialData.id}`, form);
      } else {
        await api.post(`/api/user-address`, form);
      }

      onSuccess();
    } catch (err) {
      alert("Saving address failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="font-semibold text-lg mb-4">
          {isEdit ? "Edit Address" : "Added Address"}
        </h3>

        <div className="space-y-3">
          {Object.entries(form).map(([key, value]) => {
            if (key === "is_default") return null;

            return (
              <input
                key={key}
                placeholder={key.replace("_", " ")}
                value={value as string}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
            );
          })}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.is_default}
              onChange={(e) =>
                setForm({ ...form, is_default: e.target.checked })
              }
            />
            Default address
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
