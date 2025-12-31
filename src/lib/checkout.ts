import api from "./axios";

export const checkoutAPI = async (
  cartItemIds: number[],
  payment_method: string
) => {
  return api.post("/api/checkout", {
    cart_item_id: cartItemIds,
    shipping_cost: 12000,
    payment_method,
  });
};
