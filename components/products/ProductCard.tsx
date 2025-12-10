import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountRate = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full transition-all hover:shadow-lg cursor-pointer">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.badge && (
              <Badge className="absolute top-2 left-2 bg-orange-600">
                {product.badge}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-slate-900">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <>
                <span className="text-orange-600 font-bold text-lg">
                  {discountRate}%
                </span>
                <span className="text-slate-400 text-sm line-through">
                  {product.originalPrice.toLocaleString()}원
                </span>
              </>
            )}
          </div>
          <div className="text-2xl font-bold text-orange-600 mt-1">
            {product.price.toLocaleString()}원
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-slate-500">
            <span>{product.weight}</span>
            <span>{product.stock > 0 ? `재고 ${product.stock}개` : '품절'}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
