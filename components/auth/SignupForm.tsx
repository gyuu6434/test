'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AddressSearch from './AddressSearch';

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  // returnUrl 파라미터 가져오기
  const returnUrl = searchParams.get('returnUrl') || '/';

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [error, setError] = useState('');

  // 구글 로그인 사용자 정보 가져오기
  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // 로그인하지 않은 사용자는 메인 페이지로 리다이렉트
        router.push('/');
        return;
      }

      // 이미 프로필이 있는지 확인
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single();

      if (profile) {
        // 이미 프로필이 있으면 메인 페이지로 리다이렉트
        router.push('/');
        return;
      }

      // 구글에서 가져온 이름을 기본값으로 설정
      if (user.user_metadata?.full_name) {
        setName(user.user_metadata.full_name);
      } else if (user.user_metadata?.name) {
        setName(user.user_metadata.name);
      }
    }

    loadUserData();
  }, [supabase, router]);

  // 전화번호 포맷팅 (010-0000-0000)
  const formatPhoneNumber = (value: string) => {
    // 숫자만 추출
    const numbers = value.replace(/[^\d]/g, '');

    // 최대 11자리까지만
    const limited = numbers.slice(0, 11);

    // 포맷팅
    if (limited.length <= 3) {
      return limited;
    } else if (limited.length <= 7) {
      return `${limited.slice(0, 3)}-${limited.slice(3)}`;
    } else {
      return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  // 전화번호 유효성 검사
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  // 주소 검색 완료 핸들러
  const handleAddressComplete = (data: {
    postcode: string;
    address: string;
    detailAddress: string;
  }) => {
    setPostcode(data.postcode);
    setAddress(data.address);
    setDetailAddress(data.detailAddress);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 유효성 검사
    if (!name.trim()) {
      setError('이름을 입력해주세요.');
      return;
    }

    if (!isValidPhone(phone)) {
      setError('전화번호를 올바르게 입력해주세요. (010-0000-0000)');
      return;
    }

    if (!postcode || !address) {
      setError('주소 검색 버튼을 클릭하여 주소를 입력해주세요.');
      return;
    }

    if (!detailAddress.trim()) {
      setError('상세주소를 입력해주세요.');
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('로그인 정보를 찾을 수 없습니다.');
        setLoading(false);
        return;
      }

      // 전체 주소 조합
      const fullAddress = `[${postcode}] ${address}, ${detailAddress.trim()}`;

      // profiles 테이블에 저장
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          name: name.trim(),
          phone: phone,
          address: fullAddress,
        });

      if (insertError) {
        console.error('Profile insert error:', insertError);
        setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        setLoading(false);
        return;
      }

      // returnUrl 또는 메인 페이지로 이동
      router.push(returnUrl);
      router.refresh();
    } catch (err) {
      console.error('Signup error:', err);
      setError('회원가입 중 오류가 발생했습니다.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 에러 메시지 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* returnUrl 안내 메시지 */}
      {returnUrl !== '/' && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          회원가입 완료 후 요청하신 페이지로 이동합니다.
        </div>
      )}

      {/* 이름 */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
          이름 <span className="text-orange-600">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
                     transition-all duration-200
                     text-slate-900 placeholder-slate-400"
          placeholder="홍길동"
          required
        />
      </div>

      {/* 전화번호 */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
          전화번호 <span className="text-orange-600">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
                     transition-all duration-200
                     text-slate-900 placeholder-slate-400"
          placeholder="010-0000-0000"
          required
        />
        <p className="mt-1 text-xs text-slate-500">
          하이픈(-)을 포함한 형식으로 입력해주세요.
        </p>
      </div>

      {/* 주소 */}
      <AddressSearch
        onComplete={handleAddressComplete}
        defaultPostcode={postcode}
        defaultAddress={address}
        defaultDetailAddress={detailAddress}
      />

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-600 text-white hover:bg-orange-700
                   px-6 py-4 rounded-lg font-semibold text-base
                   transition-colors duration-200
                   disabled:bg-slate-300 disabled:cursor-not-allowed
                   shadow-sm hover:shadow-md"
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
            처리 중...
          </span>
        ) : (
          '가입 완료'
        )}
      </button>

      {/* 안내 문구 */}
      <p className="text-xs text-slate-500 text-center">
        회원가입 시 <a href="/terms" className="text-orange-600 hover:underline">이용약관</a> 및{' '}
        <a href="/privacy" className="text-orange-600 hover:underline">개인정보처리방침</a>에 동의하게 됩니다.
      </p>
    </form>
  );
}
