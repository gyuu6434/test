import { Suspense } from 'react';
import SignupForm from '@/components/auth/SignupForm';
import Script from 'next/script';

export const metadata = {
  title: '회원가입 | 제주감귤마켓',
  description: '제주감귤마켓 회원가입',
};

export default function SignupPage() {
  return (
    <>
      {/* Daum 우편번호 서비스 스크립트 */}
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      <div className="min-h-screen bg-slate-50 py-16">
        <div className="max-w-md mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            회원가입
          </h1>
          <p className="text-sm text-slate-600">
            제주감귤마켓에 오신 것을 환영합니다
          </p>
        </div>

        {/* 회원가입 폼 */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <Suspense fallback={
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          }>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </div>
    </>
  );
}
