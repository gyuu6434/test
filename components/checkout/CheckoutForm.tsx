'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/lib/types/product';
import AddressSearch from '@/components/auth/AddressSearch';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { getUserProfileWithShipping } from '@/lib/supabase/profile';

interface CheckoutFormProps {
  product: Product;
}

interface ShippingInfo {
  name: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress: string;
  message: string;
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    phone: '',
    postcode: '',
    address: '',
    detailAddress: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [privacyError, setPrivacyError] = useState('');

  // 로그인한 사용자의 프로필 정보 자동 로드
  useEffect(() => {
    async function loadUserProfile() {
      if (!authLoading && user) {
        setLoadingProfile(true);
        const profile = await getUserProfileWithShipping(user.id);

        if (profile) {
          const newShippingInfo = {
            name: profile.name || '',
            phone: profile.phone || '',
            postcode: profile.postcode || '',
            address: profile.address || '',
            detailAddress: profile.detail_address || '',
            message: '',
          };

          setShippingInfo(newShippingInfo);
        }
        setLoadingProfile(false);
      } else if (!authLoading) {
        setLoadingProfile(false);
      }
    }

    loadUserProfile();
  }, [user, authLoading]);

  const handleAddressComplete = (data: {
    postcode: string;
    address: string;
    detailAddress: string;
  }) => {
    setShippingInfo((prev) => ({
      ...prev,
      postcode: data.postcode,
      address: data.address,
      detailAddress: data.detailAddress,
    }));

    // 주소 관련 에러 제거
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.postcode;
      delete newErrors.address;
      delete newErrors.detailAddress;
      return newErrors;
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 입력 시 해당 필드 에러 제거
    if (errors[name as keyof ShippingInfo]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ShippingInfo];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    // 이름 검증
    if (!shippingInfo.name.trim()) {
      newErrors.name = '받으시는 분 성함을 입력해주세요.';
    } else if (shippingInfo.name.trim().length < 2) {
      newErrors.name = '이름은 최소 2자 이상이어야 합니다.';
    }

    // 연락처 검증
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!shippingInfo.phone) {
      newErrors.phone = '연락처를 입력해주세요.';
    } else if (!phoneRegex.test(shippingInfo.phone.replace(/-/g, ''))) {
      newErrors.phone = '올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)';
    }

    // 주소 검증
    if (!shippingInfo.postcode) {
      newErrors.postcode = '우편번호를 입력해주세요.';
    }
    if (!shippingInfo.address) {
      newErrors.address = '주소를 입력해주세요.';
    }
    if (!shippingInfo.detailAddress.trim()) {
      newErrors.detailAddress = '상세주소를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // 첫 번째 에러 필드로 스크롤
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // 개인정보 동의 확인
    if (!agreedToPrivacy) {
      setPrivacyError('개인정보 수집 및 이용에 동의해주세요.');
      // 동의 체크박스로 스크롤
      const privacyElement = document.getElementById('privacy-agreement');
      privacyElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // TODO: 실제 주문 처리 로직 (3단계에서 구현)
    alert('주문이 완료되었습니다!\n\n(실제 결제 기능은 3단계에서 구현됩니다.)');
    console.log('주문 정보:', {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
      shipping: shippingInfo,
    });

    // 홈으로 리다이렉트
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 lg:p-8 space-y-8">
      {/* 프로필 로딩 중 표시 */}
      {loadingProfile && (
        <div className="flex items-center justify-center gap-2 p-4 bg-orange-50 rounded-lg">
          <Loader2 className="w-5 h-5 animate-spin text-orange-600" />
          <span className="text-sm text-slate-700">저장된 정보를 불러오는 중...</span>
        </div>
      )}

      {/* 로그인하지 않은 사용자 안내 */}
      {!authLoading && !user && !loadingProfile && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>💡 팁:</strong> 로그인하시면 이전에 입력한 배송 정보를 자동으로 불러올 수 있습니다.
          </p>
        </div>
      )}

      {/* 로그인한 사용자 안내 */}
      {!authLoading && user && !loadingProfile && shippingInfo.name && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✅ <strong>{shippingInfo.name}</strong>님의 저장된 배송 정보를 불러왔습니다.
          </p>
        </div>
      )}

      {/* 배송지 정보 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">배송지 정보</h2>

        <div className="space-y-5">
          {/* 받으시는 분 */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
              받으시는 분 <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={shippingInfo.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
                         transition-all duration-200
                         text-slate-900 placeholder-slate-400
                         ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="이름을 입력하세요"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* 연락처 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
              연락처 <span className="text-orange-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
                         transition-all duration-200
                         text-slate-900 placeholder-slate-400
                         ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
              placeholder="010-1234-5678"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
            <p className="mt-1 text-xs text-slate-500">
              배송 시 연락을 위해 필요합니다.
            </p>
          </div>

          {/* 주소 검색 컴포넌트 */}
          <div>
            <AddressSearch
              onComplete={handleAddressComplete}
              defaultPostcode={shippingInfo.postcode}
              defaultAddress={shippingInfo.address}
              defaultDetailAddress={shippingInfo.detailAddress}
            />
            {(errors.postcode || errors.address || errors.detailAddress) && (
              <div className="mt-2 space-y-1">
                {errors.postcode && <p className="text-sm text-red-500">{errors.postcode}</p>}
                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                {errors.detailAddress && <p className="text-sm text-red-500">{errors.detailAddress}</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 배송 메시지 */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-6">배송 메시지</h2>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
            배송 메시지 <span className="text-slate-400 font-normal">(선택)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={shippingInfo.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
                       transition-all duration-200
                       text-slate-900 placeholder-slate-400
                       resize-none"
            placeholder="배송 시 요청사항을 입력하세요 (예: 부재 시 경비실에 맡겨주세요)"
            maxLength={200}
          />
          <p className="mt-1 text-xs text-slate-500 text-right">
            {shippingInfo.message.length}/200
          </p>
        </div>
      </div>

      {/* 개인정보 수집 및 이용 동의 */}
      <div id="privacy-agreement" className="pt-4 border-t border-slate-200">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">개인정보 수집 및 이용 동의</h2>

          <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm text-slate-700">
            <p className="font-semibold">수집 항목</p>
            <p>이름, 연락처, 배송지 주소</p>

            <p className="font-semibold mt-3">수집 목적</p>
            <p>상품 배송, 배송 관련 연락</p>

            <p className="font-semibold mt-3">보유 기간</p>
            <p>주문 완료 후 5년 (전자상거래법)</p>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white border-2 rounded-lg transition-colors duration-200"
               style={{ borderColor: privacyError ? '#ef4444' : '#e2e8f0' }}>
            <input
              type="checkbox"
              id="privacy-checkbox"
              checked={agreedToPrivacy}
              onChange={(e) => {
                setAgreedToPrivacy(e.target.checked);
                if (e.target.checked) {
                  setPrivacyError('');
                }
              }}
              className="mt-0.5 w-5 h-5 rounded border-slate-300 text-orange-600
                         focus:ring-2 focus:ring-orange-600 focus:ring-offset-0
                         cursor-pointer"
            />
            <label htmlFor="privacy-checkbox" className="flex-1 cursor-pointer">
              <span className="text-slate-900 font-medium">
                개인정보 수집 및 이용에 동의합니다. <span className="text-orange-600">*</span>
              </span>
              <a
                href="/privacy"
                onClick={(e) => e.stopPropagation()}
                className="ml-2 text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                자세히 보기
              </a>
            </label>
          </div>

          {privacyError && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <span>⚠</span>
              <span>{privacyError}</span>
            </p>
          )}
        </div>
      </div>

      {/* 주문하기 버튼 */}
      <div className="pt-4 border-t border-slate-200">
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg bg-orange-600 hover:bg-orange-700 shadow-lg shadow-orange-600/30"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {product.price.toLocaleString()}원 결제하기
        </Button>
        <p className="mt-3 text-center text-xs text-slate-400">
          * 실제 결제 기능은 3단계에서 구현 예정입니다
        </p>
      </div>
    </form>
  );
}
