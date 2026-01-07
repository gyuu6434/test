// 주문 상태 (DB enum과 동일)
export type OrderStatus = 'pending_payment' | 'paid' | 'shipping' | 'delivered' | 'cancelled';

// 주문 테이블 (orders)
export interface Order {
  id: string;
  user_id: string;

  // 배송 정보
  recipient_name: string;
  recipient_phone: string;
  shipping_address: string;
  shipping_zipcode: string;
  shipping_memo?: string | null;

  // 결제 정보
  payment_id: string;
  payment_method?: string | null;
  payment_amount: number;

  // 주문 상태
  status: OrderStatus;

  // 총 금액
  total_amount: number;

  // 타임스탬프
  created_at: string;
  updated_at: string;
  paid_at?: string | null;
  shipped_at?: string | null;
  delivered_at?: string | null;
  cancelled_at?: string | null;

  // 조인된 주문 상품 (select 시)
  order_items?: OrderItem[];
}

// 주문 상품 테이블 (order_items)
export interface OrderItem {
  id: string;
  order_id: string;

  // 상품 정보 (주문 당시 스냅샷)
  product_id: string;
  product_name: string;
  product_image?: string | null;

  // 가격 정보
  price: number;
  quantity: number;
  subtotal: number;

  created_at: string;
}

// 주문 상태 라벨
export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending_payment: '결제 대기',
  paid: '결제 완료',
  shipping: '배송중',
  delivered: '배송완료',
  cancelled: '취소됨',
};

// 주문 상태 색상 (Tailwind CSS 클래스)
export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending_payment: 'bg-yellow-100 text-yellow-800',
  paid: 'bg-blue-100 text-blue-800',
  shipping: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};
