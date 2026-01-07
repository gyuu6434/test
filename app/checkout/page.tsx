'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import CheckoutContent from '@/components/checkout/CheckoutContent';

function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto" />
        <p className="text-slate-600">상품 정보를 불러오는 중...</p>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  );
}
