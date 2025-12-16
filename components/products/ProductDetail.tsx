'use client';

import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Check } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const discountRate = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* 상품명 및 배지 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {product.badge && (
            <Badge className="bg-orange-600">{product.badge}</Badge>
          )}
          <Badge variant="outline" className="text-slate-500 border-slate-300">
            {product.categoryName || '감귤'}
          </Badge>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          {product.name}
        </h2>

        {/* 별점 및 리뷰 수 */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-slate-600">4.9</span>
          <span className="text-slate-300">|</span>
          <span className="text-sm text-slate-500">128개의 리뷰</span>
        </div>
      </div>

      {/* 가격 정보 */}
      <div className="border-t border-b py-6 space-y-3">
        {product.originalPrice && (
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="bg-red-500 text-lg px-3 py-1">
              {discountRate}%
            </Badge>
            <span className="text-slate-400 text-xl line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
          </div>
        )}
        <div className="text-4xl md:text-5xl font-bold text-orange-600">
          {product.price.toLocaleString()}
          <span className="text-2xl">원</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4 text-green-500" />
            중량: {product.weight}
          </span>
          <span className="text-slate-300">|</span>
          <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
            {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
          </span>
        </div>
      </div>

      {/* 상품 설명 */}
      <div className="space-y-2">
        <p className="text-slate-600 leading-relaxed">{product.description}</p>
      </div>

      {/* 상품 특징 */}
      {product.features && product.features.length > 0 && (
        <div className="space-y-3 bg-slate-50 rounded-xl p-5">
          <h3 className="font-semibold text-lg text-slate-900">상품 특징</h3>
          <ul className="space-y-2">
            {product.features.slice(0, 4).map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 구매 버튼 영역 */}
      <div className="space-y-3 pt-4">
        <Button
          size="lg"
          className={`w-full h-14 text-lg ${
            product.stock > 0
              ? 'bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/30'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? (
            <>
              <ShoppingCart className="w-5 h-5 mr-2" />
              구매하기
            </>
          ) : (
            '품절'
          )}
        </Button>
        <p className="text-center text-xs text-slate-400">
          * 결제 기능은 3단계에서 구현 예정입니다
        </p>
      </div>

      {/* 간단한 배송 정보 */}
      <div className="bg-orange-50 rounded-xl p-5 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">배송비</span>
          <span className="font-semibold text-slate-900">무료배송</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">배송 예정</span>
          <span className="font-semibold text-slate-900">주문 후 2-3일 이내</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">출고지</span>
          <span className="font-semibold text-orange-600">제주도 직송</span>
        </div>
      </div>
    </div>
  );
}
