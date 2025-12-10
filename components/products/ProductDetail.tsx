import { Product } from '@/lib/types/product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const discountRate = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <div>
        {product.badge && (
          <Badge className="bg-orange-600 mb-2">{product.badge}</Badge>
        )}
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{product.name}</h1>
        <p className="text-slate-600">{product.description}</p>
      </div>

      <div className="border-t border-b py-6 space-y-3">
        {product.originalPrice && (
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-lg line-through">
              {product.originalPrice.toLocaleString()}원
            </span>
            <Badge variant="destructive" className="bg-red-500">
              {discountRate}% 할인
            </Badge>
          </div>
        )}
        <div className="text-4xl font-bold text-orange-600">
          {product.price.toLocaleString()}원
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>중량: {product.weight}</span>
          <span className="text-slate-300">|</span>
          <span>재고: {product.stock}개</span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-slate-900">상품 특징</h3>
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-orange-600 mr-2">✓</span>
              <span className="text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 pt-4">
        <Button
          size="lg"
          className="w-full bg-orange-600 hover:bg-orange-700"
          disabled
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          장바구니 담기 (3단계 구현 예정)
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          disabled
        >
          바로 구매하기 (3단계 구현 예정)
        </Button>
        <Button
          size="lg"
          variant="ghost"
          className="w-full"
          disabled
        >
          <Heart className="w-5 h-5 mr-2" />
          찜하기
        </Button>
      </div>

      <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 space-y-1">
        <p>배송비: 무료배송</p>
        <p>배송 예정일: 주문 후 2-3일 이내</p>
        <p>제주도에서 직송됩니다</p>
      </div>
    </div>
  );
}
