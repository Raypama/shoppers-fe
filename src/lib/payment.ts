import api from "@/lib/axios";

const paymentAPI = {
  get: async (orderId: number) => {
    const res = await api.get(`/api/payments/${orderId}`);
    return res.data.data;
  },

  confirm: async (paymentId: number, method: string) => {
    const res = await api.put(`/api/payments/${paymentId}`, {
      status: "PAID",
      method,
    });
    return res.data.data;
  },
};

export default paymentAPI;
