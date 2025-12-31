'use client';

import { useState } from 'react';

interface AddressData {
  zonecode: string; // 우편번호
  address: string; // 기본주소
  addressType: string; // 주소 타입 (R: 도로명, J: 지번)
  bname: string; // 법정동/법정리 이름
  buildingName: string; // 건물명
}

interface AddressSearchProps {
  onComplete: (data: {
    postcode: string;
    address: string;
    detailAddress: string;
  }) => void;
  defaultPostcode?: string;
  defaultAddress?: string;
  defaultDetailAddress?: string;
}

// Daum Postcode 타입 정의
declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: AddressData) => void;
        width: string;
        height: string;
      }) => {
        open: () => void;
      };
    };
  }
}

export default function AddressSearch({
  onComplete,
  defaultPostcode = '',
  defaultAddress = '',
  defaultDetailAddress = '',
}: AddressSearchProps) {
  const [postcode, setPostcode] = useState(defaultPostcode);
  const [address, setAddress] = useState(defaultAddress);
  const [detailAddress, setDetailAddress] = useState(defaultDetailAddress);

  const handleSearch = () => {
    // 스크립트가 로드되지 않았으면 로드될 때까지 대기
    if (typeof window === 'undefined') {
      alert('잠시 후 다시 시도해주세요.');
      return;
    }

    if (!window.daum) {
      // 스크립트를 동적으로 로드
      const script = document.createElement('script');
      script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.onload = () => {
        // 로드 완료 후 바로 실행
        openPostcode();
      };
      script.onerror = () => {
        alert('주소 검색 서비스를 불러오는데 실패했습니다. 인터넷 연결을 확인해주세요.');
      };
      document.head.appendChild(script);
      return;
    }

    openPostcode();
  };

  const openPostcode = () => {
    if (!window.daum) return;

    new window.daum.Postcode({
      oncomplete: (data: AddressData) => {
        // 도로명 주소 또는 지번 주소를 가져옴
        const fullAddress = data.address;
        const extraAddress = data.bname
          ? `, ${data.bname}`
          : data.buildingName
          ? `, ${data.buildingName}`
          : '';

        setPostcode(data.zonecode);
        setAddress(fullAddress + extraAddress);

        // 부모 컴포넌트에 전달
        onComplete({
          postcode: data.zonecode,
          address: fullAddress + extraAddress,
          detailAddress: detailAddress,
        });

        // 상세주소 입력란에 포커스
        setTimeout(() => {
          document.getElementById('detailAddress')?.focus();
        }, 100);
      },
      width: '100%',
      height: '100%',
    }).open();
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDetailAddress(value);

    // 부모 컴포넌트에 전달
    onComplete({
      postcode,
      address,
      detailAddress: value,
    });
  };

  return (
    <div className="space-y-3">
      {/* 우편번호 */}
      <div>
        <label htmlFor="postcode" className="block text-sm font-semibold text-slate-900 mb-2">
          우편번호 <span className="text-orange-600">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="postcode"
            value={postcode}
            readOnly
            className="flex-1 px-4 py-3 border border-slate-200 rounded-lg
                       bg-slate-50 text-slate-900
                       focus:outline-none"
            placeholder="우편번호"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg
                       font-medium text-sm
                       hover:bg-slate-800
                       transition-colors duration-200
                       whitespace-nowrap"
          >
            주소 검색
          </button>
        </div>
      </div>

      {/* 기본주소 */}
      <div>
        <label htmlFor="address" className="block text-sm font-semibold text-slate-900 mb-2">
          기본주소 <span className="text-orange-600">*</span>
        </label>
        <input
          type="text"
          id="address"
          value={address}
          readOnly
          className="w-full px-4 py-3 border border-slate-200 rounded-lg
                     bg-slate-50 text-slate-900
                     focus:outline-none"
          placeholder="주소 검색 버튼을 클릭하세요"
        />
      </div>

      {/* 상세주소 */}
      <div>
        <label htmlFor="detailAddress" className="block text-sm font-semibold text-slate-900 mb-2">
          상세주소 <span className="text-orange-600">*</span>
        </label>
        <input
          type="text"
          id="detailAddress"
          value={detailAddress}
          onChange={handleDetailAddressChange}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent
                     transition-all duration-200
                     text-slate-900 placeholder-slate-400"
          placeholder="상세주소를 입력하세요 (예: 101동 1001호)"
          disabled={!address}
        />
        <p className="mt-1 text-xs text-slate-500">
          동/호수, 층수 등 상세한 주소를 입력해주세요.
        </p>
      </div>
    </div>
  );
}
