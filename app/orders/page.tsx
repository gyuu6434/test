import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Order, OrderItem } from '@/lib/types/order';
import OrderList from '@/components/orders/OrderList';
import EmptyOrders from '@/components/orders/EmptyOrders';

export const metadata = {
  title: '내 주문 | 제주감귤마켓',
  description: '주문 내역을 확인하세요.',
};

async function getOrders(): Promise<Order[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login?redirect=/orders');
  }

  // 주문 목록 조회 (최신순)
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('주문 조회 에러:', error);
    return [];
  }

  if (!orders || orders.length === 0) {
    return [];
  }

  // 각 주문의 주문 상품 조회
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', order.id);

      return {
        ...order,
        order_items: items || [],
      } as Order;
    })
  );

  return ordersWithItems;
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">내 주문</h1>

      {orders.length === 0 ? (
        <EmptyOrders />
      ) : (
        <>
          <div className="mb-4 text-sm text-slate-600">
            총 {orders.length}개의 주문
          </div>
          <OrderList orders={orders} />
        </>
      )}
    </div>
  );
}
