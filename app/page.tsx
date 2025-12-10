import ProductGrid from '@/components/products/ProductGrid';
import { getProductsByCategory } from '@/lib/data/products';
import { Package, Truck, Award, Shield } from 'lucide-react';

interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const category = params.category;
  const products = getProductsByCategory(category);

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

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            신선한 제주 감귤을 당신의 식탁으로
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            제주도에서 직송되는 프리미엄 감귤 선물세트
            <br />
            100% 제주산, 당일 수확한 최상품만을 선별합니다
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {getCategoryTitle()}
            </h2>
            <p className="text-slate-600">총 {products.length}개의 상품</p>
          </div>
        </div>

        <ProductGrid products={products} />
      </div>

      <section className="bg-slate-50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
            제주감귤마켓을 선택해야 하는 이유
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">100% 제주산</h3>
              <p className="text-slate-600 text-sm">
                제주도에서 재배된 정품만을 엄선하여 판매합니다
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">당일 수확</h3>
              <p className="text-slate-600 text-sm">
                주문 즉시 수확하여 신선도를 최대한 유지합니다
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">전국 배송</h3>
              <p className="text-slate-600 text-sm">
                2-3일 이내 전국 어디든 신선하게 배송해드립니다
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-slate-900">품질 보장</h3>
              <p className="text-slate-600 text-sm">
                배송 중 파손 시 100% 교환 및 환불을 보장합니다
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
