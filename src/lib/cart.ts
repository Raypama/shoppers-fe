import axios from "@/lib/axios";

export const getCartAPI = async () => {
  return axios.get("/api/carts");
};

export const addToCartAPI = async (productId: number, qty: number) => {
  return axios.post(
    "/api/carts/add",
    {
      product_id: productId,
      quantity: qty,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
export const updateCartItemAPI = async (itemId: number, qty: number) => {
  return axios.put(
    `/api/carts/item/${itemId}`,
    { quantity: qty },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const removeFromCartAPI = async (itemId: number) => {
  return axios.delete(`/api/carts/item/${itemId}`);
};

export const clearCartAPI = async () => {
  return axios.delete("/api/carts/clear");
};
