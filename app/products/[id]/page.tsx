import { notFound } from 'next/navigation';
import { getProductById, mockProducts } from '@/lib/data/products';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductDetail from '@/components/products/ProductDetail';
import ProductSpecifications from '@/components/products/ProductSpecifications';
import { Separator } from '@/components/ui/separator';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: '상품을 찾을 수 없습니다 | 제주감귤마켓',
    };
  }

  return {
    title: `${product.name} | 제주감귤마켓`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        <div>
          <ProductImageGallery images={product.images} productName={product.name} />
        </div>
        <div>
          <ProductDetail product={product} />
        </div>
      </div>

      <Separator className="my-12" />

      <div className="max-w-4xl mx-auto">
        <ProductSpecifications product={product} />
      </div>
    </div>
  );
}
