import { createClient } from '@/lib/supabase/server';
import { Package, Truck, Award, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Product {
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

interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const category = params.category;

  // Supabase에서 제품 목록 가져오기
  const supabase = await createClient();
  let query = supabase.from('products').select('*').eq('is_available', true);

  if (category) {
    query = query.eq('category', category);
  }

  const { data: products, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  const getCategoryTitle = () => {
    switch (category) {
      case 'citrus':
        return '감귤';
      case 'hallabong':
        return '한라봉';
      case 'cheonhyehyang':
        return '천혜향';
      default:
        return '전체 상품';
    }
  };

  const getDiscountRate = (price: number, originalPrice?: number) => {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            신선한 제주감귤을<br className="md:hidden" /> 당신의 식탁으로
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed">
            제주도에서 직송되는 프리미엄 감귤 선물세트
            <br />
            100% 제주산, 당일 수확한 최상품만을 선별합니다
          </p>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {getCategoryTitle()}
              </h2>
              <p className="text-slate-500">총 {products?.length || 0}개의 상품</p>
            </div>
          </div>

          {/* Product Grid */}
          {!products || products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">해당하는 상품이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product: Product) => {
                const discountRate = getDiscountRate(product.price, product.original_price);

                return (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <Card className="h-full bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-orange-200 hover:-translate-y-1 cursor-pointer">
                      <CardHeader className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          {product.badge && (
                            <Badge className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                              {product.badge}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent className="p-6 space-y-3">
                        <h3 className="font-semibold text-lg text-slate-900 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center gap-2">
                          {product.original_price && (
                            <>
                              <span className="text-orange-600 font-bold text-lg">
                                {discountRate}%
                              </span>
                              <span className="text-sm text-slate-400 line-through">
                                {product.original_price.toLocaleString()}원
                              </span>
                            </>
                          )}
                        </div>
                        <div className="text-2xl font-bold text-orange-600">
                          {product.price.toLocaleString()}원
                        </div>
                      </CardContent>

                      <CardFooter className="px-6 pb-6 pt-0">
                        <div className="flex items-center justify-between w-full text-sm text-slate-500">
                          <span>{product.weight}</span>
                          <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                            {product.stock > 0 ? `재고 ${product.stock}개` : '품절'}
                          </span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            제주감귤마켓을 선택해야 하는 이유
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">100% 제주산</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                제주도에서 재배된 정품만을 엄선하여 판매합니다
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">당일 수확</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                주문 즉시 수확하여 신선도를 최대한 유지합니다
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">전국 배송</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                2-3일 이내 전국 어디든 신선하게 배송해드립니다
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">품질 보장</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                배송 중 파손 시 100% 교환 및 환불을 보장합니다
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
