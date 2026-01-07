'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product, ProductCategory, ProductSize } from '@/lib/types/product';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Supabase 반환 타입 (snake_case)
interface SupabaseProduct {
  id: string;
  name: string;
  category: string;
  category_name: string;
  description: string;
  price: number;
  original_price?: number;
  size: string;
  weight: string;
  images: string[];
  badge?: string;
  features: string[];
  specifications: {
    origin: string;
    harvest: string;
    sweetness: number;
    quantity: string;
    packaging: string;
  };
  stock: number;
  is_available: boolean;
  created_at: string;
}

// snake_case → camelCase 변환 함수
function transformProduct(p: SupabaseProduct): Product {
  return {
    id: p.id,
    name: p.name,
    category: p.category as ProductCategory,
    categoryName: p.category_name,
    description: p.description,
    price: p.price,
    originalPrice: p.original_price,
    size: p.size as ProductSize,
    weight: p.weight,
    images: p.images,
    badge: p.badge,
    features: p.features,
    specifications: p.specifications,
    stock: p.stock,
    isAvailable: p.is_available,
    createdAt: p.created_at,
  };
}

export default function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!productId) {
        console.log('CheckoutContent - No productId provided');
        setLoading(false);
        return;
      }

      console.log('CheckoutContent - Fetching product:', productId);

      const supabase = createClient();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) {
        console.error('CheckoutContent - Error fetching product:', error);
        setProduct(null);
      } else if (data) {
        console.log('CheckoutContent - Product found:', data);
        setProduct(transformProduct(data));
      } else {
        console.log('CheckoutContent - Product not found');
        setProduct(null);
      }

      setLoading(false);
    }

    fetchProduct();
  }, [productId]);

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto" />
          <p className="text-slate-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // 상품을 찾지 못함
  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-slate-900">상품 정보를 찾을 수 없습니다</h2>
          <p className="text-slate-600">잘못된 접근입니다. 상품 페이지에서 다시 시도해주세요.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">이전으로</span>
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">주문/결제</h1>
          <p className="mt-2 text-slate-600">배송 정보를 입력하고 주문을 완료하세요.</p>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 좌측: 배송 정보 입력 폼 */}
          <div className="lg:col-span-2">
            <CheckoutForm product={product} />
          </div>

          {/* 우측: 주문 요약 */}
          <div className="lg:col-span-1">
            <OrderSummary product={product} />
          </div>
        </div>

        {/* 하단 안내사항 */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="font-semibold text-lg text-slate-900 mb-4">주문 시 유의사항</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>제주도 직송 상품으로 주문 후 2-3일 이내 배송됩니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>신선 식품 특성상 배송 완료 후 교환/반품이 어려울 수 있습니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>배송 중 파손이나 변질이 발견되면 즉시 고객센터로 연락 주시기 바랍니다.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>명절 기간에는 배송이 지연될 수 있습니다.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
