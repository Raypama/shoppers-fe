import api from "./axios";

export const getOrderDetail = async (orderId: string) => {
  const res = await api.get(`/api/orders/${orderId}`);
  return res.data.data;
};
