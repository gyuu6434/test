'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, MapPin, Calendar, CreditCard, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Order,
  OrderStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
} from '@/lib/types/order';

interface OrderCardProps {
  order: Order;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

function getExpectedDelivery(order: Order): string | null {
  if (order.status === 'cancelled' || order.status === 'delivered') {
    return null;
  }

  const createdDate = new Date(order.created_at);
  const minDays = order.status === 'shipping' ? 1 : 2;
  const maxDays = order.status === 'shipping' ? 2 : 4;

  const minDate = new Date(createdDate);
  minDate.setDate(minDate.getDate() + minDays);

  const maxDate = new Date(createdDate);
  maxDate.setDate(maxDate.getDate() + maxDays);

  const formatShort = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`;

  return `${formatShort(minDate)} ~ ${formatShort(maxDate)}`;
}

export default function OrderCard({ order }: OrderCardProps) {
  const firstItem = order.order_items?.[0];
  const itemCount = order.order_items?.length || 0;
  const expectedDelivery = getExpectedDelivery(order);

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        {/* 주문 헤더 */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-sm text-slate-600">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(order.created_at)}
            </div>
            <Badge className={ORDER_STATUS_COLORS[order.status]}>
              {ORDER_STATUS_LABELS[order.status]}
            </Badge>
          </div>
          <div className="text-xs text-slate-500">
            주문번호: {order.payment_id.slice(0, 12)}...
          </div>
        </div>

        {/* 주문 상품 */}
        <div className="p-4">
          <div className="flex gap-4">
            {/* 상품 이미지 */}
            <div className="relative w-24 h-24 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
              {firstItem?.product_image ? (
                <Image
                  src={firstItem.product_image}
                  alt={firstItem.product_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
              )}
            </div>

            {/* 상품 정보 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-slate-900 truncate">
                    {firstItem?.product_name || '상품 정보 없음'}
                  </h3>
                  {itemCount > 1 && (
                    <p className="text-sm text-slate-500">
                      외 {itemCount - 1}개 상품
                    </p>
                  )}
                </div>
                {firstItem && (
                  <Link
                    href={`/products/${firstItem.product_id}`}
                    className="text-orange-600 hover:text-orange-700 text-sm flex items-center"
                  >
                    상품보기
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>

              {/* 수량 및 금액 */}
              <div className="flex items-center gap-4 text-sm">
                {firstItem && (
                  <span className="text-slate-600">
                    {firstItem.quantity}개
                  </span>
                )}
                <span className="font-bold text-orange-600 text-lg">
                  {formatPrice(order.total_amount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 배송 및 결제 정보 */}
        <div className="px-4 py-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          {/* 배송지 */}
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-700">{order.recipient_name}</div>
              <div className="text-slate-500 text-xs">
                {order.shipping_address}
              </div>
              <div className="text-slate-500 text-xs">{order.recipient_phone}</div>
            </div>
          </div>

          {/* 결제 정보 */}
          <div className="flex items-start gap-2">
            <CreditCard className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-700">결제 정보</div>
              <div className="text-slate-500 text-xs">
                {order.payment_method === 'card' ? '카드결제' : order.payment_method || '카드결제'}
              </div>
              <div className="text-slate-500 text-xs">
                {formatPrice(order.payment_amount)}
              </div>
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="flex items-start gap-2">
            <Truck className="h-4 w-4 text-slate-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-medium text-slate-700">배송 정보</div>
              {order.status === 'delivered' ? (
                <div className="text-green-600 text-xs">
                  {order.delivered_at
                    ? `${formatDate(order.delivered_at)} 배송완료`
                    : '배송완료'}
                </div>
              ) : order.status === 'cancelled' ? (
                <div className="text-red-500 text-xs">주문 취소됨</div>
              ) : (
                <>
                  <div className="text-slate-500 text-xs">
                    제주도 직송 (2~4일 소요)
                  </div>
                  {expectedDelivery && (
                    <div className="text-orange-600 text-xs">
                      예상: {expectedDelivery}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* 배송 메모 */}
        {order.shipping_memo && (
          <>
            <Separator />
            <div className="px-4 py-2 bg-yellow-50 text-sm">
              <span className="text-yellow-700">배송 요청사항: </span>
              <span className="text-yellow-800">{order.shipping_memo}</span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
