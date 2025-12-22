// src/lib/checkout.ts
import axios from "./axios";

export const checkoutAPI = async (itemId: number, payment_method : string) => {
  return axios.post(
    `/api/checkout`,
    {
      cart_item_id: itemId,
      shipping_cost: 12000,
      payment_method,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
