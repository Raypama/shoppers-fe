type OrderItem = {
  id: number;
  product_name_snapshot: string;
  price_snapshot: string;
  quantity: number;
  product?: {
    media?: {
      url: string;
    }[];
  };
};

type Order = {
  id: number;
  status: string;
  total_amount: string;
  shipping_cost: string;
  items: OrderItem[];
};