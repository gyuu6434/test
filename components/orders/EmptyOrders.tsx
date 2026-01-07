'use client';

import Link from 'next/link';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function EmptyOrders() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <Package className="h-10 w-10 text-orange-500" />
        </div>

        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          주문 내역이 없습니다
        </h2>

        <p className="text-slate-600 mb-6 max-w-md">
          아직 주문하신 상품이 없어요.
          <br />
          신선한 제주 감귤로 맛있는 선물을 준비해 보세요!
        </p>

        <Link href="/">
          <Button className="bg-orange-600 hover:bg-orange-700">
            상품 둘러보기
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>

        {/* 추천 섹션 */}
        <div className="mt-10 pt-8 border-t border-slate-200 w-full max-w-lg">
          <h3 className="text-sm font-medium text-slate-700 mb-4">
            이런 상품은 어떠세요?
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Link
              href="/?category=citrus"
              className="p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2 block">🍊</span>
              <span className="text-sm text-slate-700">감귤 세트</span>
            </Link>
            <Link
              href="/?category=hallabong"
              className="p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2 block">🍊</span>
              <span className="text-sm text-slate-700">한라봉</span>
            </Link>
            <Link
              href="/?category=cheonhyehyang"
              className="p-4 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition-colors"
            >
              <span className="text-2xl mb-2 block">🍋</span>
              <span className="text-sm text-slate-700">천혜향</span>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
