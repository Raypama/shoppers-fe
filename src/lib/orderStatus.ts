// src/lib/orderStatus.ts

export const statusTabMap: Record<string, string> = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  DELIVERED: "completed",
  COMPLETED: "completed",
  CANCELED: "canceled",
};

export const statusLabelMap: Record<string, string> = {
  PENDING: "Waiting Payment",
  PAID: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELED: "Canceled",
};

export const tabs = [
  { key: "all", label: "All" },
  { key: "pending", label: "Waiting Payment" },
  { key: "paid", label: "Processing" },
  { key: "shipped", label: "Shipped" },
  { key: "completed", label: "Completed" },
  { key: "canceled", label: "Canceled" },
];
