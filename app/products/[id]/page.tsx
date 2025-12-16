import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductDetail from '@/components/products/ProductDetail';
import ProductSpecifications from '@/components/products/ProductSpecifications';
import { Separator } from '@/components/ui/separator';
import { Product, ProductCategory, ProductSize } from '@/lib/types/product';
import { Star, Package, Truck, Gift } from 'lucide-react';

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

// Mock 리뷰 데이터
const mockReviews = [
  { id: 1, name: "김**", rating: 5, comment: "당도가 정말 높아요! 선물용으로 딱입니다. 포장도 고급스럽고 받으시는 분이 정말 좋아하셨어요.", date: "2024.12.10" },
  { id: 2, name: "이**", rating: 5, comment: "포장이 깔끔하고 신선해요. 제주 감귤 특유의 향이 너무 좋습니다.", date: "2024.12.08" },
  { id: 3, name: "박**", rating: 4, comment: "배송이 빨라서 좋았어요. 신선하게 잘 도착했습니다.", date: "2024.12.05" },
];

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;

  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('name, description, images')
    .eq('id', id)
    .single();

  if (!data) {
    return {
      title: '상품을 찾을 수 없습니다 | 제주감귤마켓',
    };
  }

  const title = `${data.name} | 제주감귤마켓`;
  const description = data.description.length > 150
    ? data.description.substring(0, 150) + '...'
    : data.description;
  const productImage = data.images?.[0] || '/images/og-default.png';

  return {
    title,
    description,
    keywords: ['제주감귤', '감귤선물세트', '한라봉', '천혜향', '제주특산물', '명절선물', data.name],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'ko_KR',
      siteName: '제주감귤마켓',
      images: [
        {
          url: productImage,
          width: 600,
          height: 450,
          alt: data.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [productImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Supabase에서 상품 데이터 조회
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  const product = transformProduct(data);

  // 할인율 계산
  const discountRate = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // 카테고리별 캐치프레이즈
  const getCatchphrase = () => {
    switch (product.category) {
      case 'citrus':
        return '제주 햇살 가득 담은 프리미엄 감귤';
      case 'hallabong':
        return '달콤함이 톡톡 터지는 제주 한라봉';
      case 'cheonhyehyang':
        return '향긋한 풍미가 일품인 제주 천혜향';
      default:
        return '제주의 신선함을 담은 프리미엄 선물';
    }
  };

  return (
    <div className="min-h-screen">
      {/* 1. 혜택 배너 섹션 */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm md:text-base">
            {discountRate > 0 && (
              <span className="flex items-center gap-1 text-orange-600 font-bold">
                <span className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs">SALE</span>
                {discountRate}% 할인
              </span>
            )}
            <span className="flex items-center gap-1 text-slate-700">
              <Truck className="w-4 h-4" />
              무료배송
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <Package className="w-4 h-4" />
              제주 직송 2-3일
            </span>
            <span className="flex items-center gap-1 text-slate-700">
              <Gift className="w-4 h-4" />
              선물포장 무료
            </span>
          </div>
        </div>
      </section>

      {/* 2. 핵심 메시지 섹션 */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-orange-600 text-sm font-medium mb-2">
            {product.categoryName || '감귤'} 선물세트
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            "{getCatchphrase()}"
          </h1>
          <p className="text-slate-500">
            소중한 분께 건강하고 달콤한 제주의 맛을 선물하세요
          </p>
        </div>
      </section>

      {/* 3. 메인 콘텐츠: 이미지 + 상품 정보 */}
      <section className="bg-white pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <ProductImageGallery images={product.images} productName={product.name} />
            </div>
            <div>
              <ProductDetail product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. 고객 후기 섹션 */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">고객 후기</h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-600">4.9점</span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-600">128개의 리뷰</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-slate-900">{review.name}</span>
                  <span className="text-sm text-slate-400">{review.date}</span>
                </div>
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
              리뷰 더보기 →
            </button>
          </div>
        </div>
      </section>

      {/* 5. 핵심 특징 섹션 */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
            제주감귤마켓만의 특별함
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center p-6 bg-orange-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🍊</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">100% 제주산</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                제주도에서 재배된 정품만을 엄선하여<br />
                최상의 품질을 보장합니다
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📦</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">당일 수확 직송</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                주문 즉시 수확하여 신선함을<br />
                그대로 전달해드립니다
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎁</span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">프리미엄 포장</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                고급스러운 선물 포장으로<br />
                특별한 마음을 전하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 6. 상세 스펙 및 배송 안내 */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <ProductSpecifications product={product} />
        </div>
      </section>
    </div>
  );
}
