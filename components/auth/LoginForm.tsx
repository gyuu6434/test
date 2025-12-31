'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // returnUrl 파라미터 가져오기
  const returnUrl = searchParams.get('returnUrl') || '/';

  // returnUrl에 따른 안내 메시지 생성
  const getLoginMessage = () => {
    if (returnUrl.startsWith('/checkout')) {
      return {
        title: '구매를 위해 로그인이 필요합니다',
        description: '안전한 결제와 주문 관리를 위해 로그인해주세요.'
      };
    } else if (returnUrl.startsWith('/my-orders')) {
      return {
        title: '주문 내역 확인을 위해 로그인이 필요합니다',
        description: '고객님의 주문 정보를 확인하려면 로그인해주세요.'
      };
    }
    return null;
  };

  const loginMessage = getLoginMessage();

  // 이미 로그인된 사용자는 리다이렉트
  useEffect(() => {
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push(returnUrl);
      }
    }
    checkUser();
  }, [supabase, router, returnUrl]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?returnUrl=${encodeURIComponent(returnUrl)}`,
        },
      });

      if (error) {
        console.error('Google login error:', error);
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
      // 성공 시 구글 로그인 페이지로 자동 이동됨
    } catch (err) {
      console.error('Login error:', err);
      setError('로그인 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* returnUrl 안내 메시지 */}
      {loginMessage && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-orange-900 mb-1">
                {loginMessage.title}
              </h3>
              <p className="text-sm text-orange-700">
                {loginMessage.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 구글 로그인 버튼 */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full bg-white border-2 border-slate-200 text-slate-700
                   hover:bg-slate-50 hover:border-slate-300
                   px-6 py-4 rounded-lg font-semibold text-base
                   transition-all duration-200
                   disabled:bg-slate-100 disabled:cursor-not-allowed
                   shadow-sm hover:shadow-md
                   flex items-center justify-center gap-3"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            로그인 중...
          </span>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            구글로 로그인
          </>
        )}
      </button>

      {/* 회원가입 링크 */}
      <div className="text-center text-sm text-slate-600">
        계정이 없으신가요?{' '}
        <button
          type="button"
          onClick={() => router.push('/signup')}
          className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
        >
          회원가입
        </button>
      </div>

      {/* 안내 문구 */}
      <p className="text-xs text-slate-500 text-center">
        로그인 시 <a href="/terms" className="text-orange-600 hover:underline">이용약관</a> 및{' '}
        <a href="/privacy" className="text-orange-600 hover:underline">개인정보처리방침</a>에 동의하게 됩니다.
      </p>
    </div>
  );
}
