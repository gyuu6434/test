import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: '로그인 | 제주감귤마켓',
  description: '제주감귤마켓 로그인',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-md mx-auto px-6">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            로그인
          </h1>
          <p className="text-sm text-slate-600">
            제주감귤마켓에 오신 것을 환영합니다
          </p>
        </div>

        {/* 로그인 폼 */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <Suspense fallback={
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            </div>
          }>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
