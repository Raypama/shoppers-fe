export interface Payment {
  id: number;
  order_id: number;
  provider: string | null;
  status: "PENDING" | "PAID" | "FAILED";
  transaction_id: string;
  amount: string;
  paid_at: string | null;
  order: {
    id: number;
    payment_method: string | null;
    status: string;
    total_amount: string;
    shipping_cost: string;
  };
}
