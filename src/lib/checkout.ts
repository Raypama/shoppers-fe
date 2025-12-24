import api from "./axios";

export const checkoutAPI = async (
  cartItemId: number,
  payment_method: string
) => {
  return api.post("/api/checkout", {
    cart_item_id: cartItemId,
    shipping_cost: 12000,
    payment_method,
  });
};
