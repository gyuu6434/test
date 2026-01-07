'use client';

import Image from 'next/image';
import { Product } from '@/lib/types/product';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface OrderSummaryProps {
  product: Product;
}

export default function OrderSummary({ product }: OrderSummaryProps) {
  const deliveryFee = 0; // 무료배송
  const totalPrice = product.price + deliveryFee;

  const discountRate = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 lg:sticky lg:top-8 space-y-6">
      {/* 헤더 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">주문 상품</h2>
      </div>

      <Separator />

      {/* 상품 정보 */}
      <div className="space-y-4">
        {/* 상품 이미지 및 기본 정보 */}
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-start gap-2">
              {product.badge && (
                <Badge className="bg-orange-500 text-white text-xs">
                  {product.badge}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs text-slate-500 border-slate-300">
                {product.categoryName}
              </Badge>
            </div>

            <h3 className="font-semibold text-slate-900 leading-snug">
              {product.name}
            </h3>

            <div className="text-sm text-slate-600">
              <p>중량: {product.weight}</p>
              <p>수량: 1개</p>
            </div>
          </div>
        </div>

        {/* 상품 특징 간략 표시 */}
        {product.features && product.features.length > 0 && (
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-slate-700">상품 특징</p>
            <ul className="space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-slate-600 flex items-start gap-1">
                  <span className="text-orange-600 mt-0.5">•</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Separator />

      {/* 가격 정보 */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">상품 금액</span>
          <div className="text-right">
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString()}원
              </div>
            )}
            <div className="font-semibold text-slate-900">
              {product.price.toLocaleString()}원
            </div>
          </div>
        </div>

        {product.originalPrice && discountRate > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">할인 금액</span>
            <span className="font-semibold text-red-500">
              -{(product.originalPrice - product.price).toLocaleString()}원 ({discountRate}%)
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">배송비</span>
          <span className="font-semibold text-green-600">
            {deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString()}원`}
          </span>
        </div>
      </div>

      <Separator />

      {/* 총 결제 금액 */}
      <div className="bg-orange-50 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-slate-900">총 결제 금액</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">
              {totalPrice.toLocaleString()}
              <span className="text-base">원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 배송 정보 안내 */}
      <div className="space-y-2 pt-2">
        <p className="text-xs font-semibold text-slate-700">배송 안내</p>
        <ul className="space-y-1 text-xs text-slate-600">
          <li className="flex items-start gap-1">
            <span className="text-orange-600 mt-0.5">•</span>
            <span>제주도 직송, 2-3일 이내 배송</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-orange-600 mt-0.5">•</span>
            <span>5만원 이상 구매 시 무료배송</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-orange-600 mt-0.5">•</span>
            <span>신선 식품으로 수령 즉시 확인 필요</span>
          </li>
        </ul>
      </div>

      {/* 교환/반품 안내 */}
      <div className="bg-slate-50 rounded-lg p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-700">교환/반품 안내</p>
        <ul className="space-y-1 text-xs text-slate-600">
          <li className="flex items-start gap-1">
            <span className="text-slate-400 mt-0.5">•</span>
            <span>신선 식품 특성상 단순 변심 반품 불가</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-slate-400 mt-0.5">•</span>
            <span>배송 중 파손/변질 시 교환 가능</span>
          </li>
          <li className="flex items-start gap-1">
            <span className="text-slate-400 mt-0.5">•</span>
            <span>수령 후 24시간 이내 고객센터 연락</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
