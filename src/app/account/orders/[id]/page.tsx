import OrderDetail from "@/components/account/order/OrderDetail";


type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params; // ✅ WAJIB await

  return <OrderDetail orderId={id} />;
}
