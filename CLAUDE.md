# 제주감귤마켓 1단계 구현 계획

## 프로젝트 개요

**상호명:** 제주감귤마켓
**판매 상품:** 감귤, 한라봉, 천혜향 선물세트 (3~10만원대)
**타겟 고객:** 명절 선물 구매자, 직장인

**1단계 범위:** 제품 목록 페이지 + 제품 상세 페이지
**기술 스택:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui

---

## 구현 순서

### 1. 프로젝트 초기화
```bash
cd c:\VibeBuilder\0.강의\class
npx create-next-app@latest jeju-citrus-market --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd jeju-citrus-market
npx shadcn@latest init
npx shadcn@latest add card button badge separator navigation-menu aspect-ratio
```

### 2. 프로젝트 구조 생성
```
jeju-citrus-market/
├── app/
│   ├── layout.tsx              # 루트 레이아웃 (Header, Footer 포함)
│   ├── page.tsx                # 홈/제품 목록 페이지
│   └── products/[id]/page.tsx  # 제품 상세 페이지
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # 헤더
│   │   └── Footer.tsx          # 푸터
│   └── products/
│       ├── ProductCard.tsx               # 제품 카드
│       ├── ProductGrid.tsx               # 제품 그리드
│       ├── ProductDetail.tsx             # 제품 상세 정보
│       ├── ProductImageGallery.tsx       # 이미지 갤러리
│       └── ProductSpecifications.tsx     # 스펙 테이블
├── lib/
│   ├── types/product.ts        # TypeScript 타입 정의
│   ├── data/products.ts        # Mock 제품 데이터
│   └── utils.ts                # shadcn/ui 유틸리티
└── public/images/products/     # 제품 이미지 (placeholder)
```

### 3. 타입 정의 (`lib/types/product.ts`)
```typescript
export type ProductCategory = 'citrus' | 'hallabong' | 'cheonhyehyang';
export type ProductSize = 'small' | 'medium' | 'large' | 'premium';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  price: number;
  originalPrice?: number;
  size: ProductSize;
  weight: string;
  images: string[];
  badge?: string;
  features: string[];
  specifications: {
    origin: string;
    harvest: string;
    sweetness: number;
    quantity: string;
    packaging: string;
  };
  stock: number;
  isAvailable: boolean;
  createdAt: string;
}
```

### 4. Mock 데이터 작성 (`lib/data/products.ts`)
- 감귤 세트 3종 (3kg/5kg/10kg)
- 한라봉 세트 2종 (3kg/5kg)
- 천혜향 세트 2종 (3kg/5kg)
- 프리미엄 혼합 세트 1종
- **총 9개 제품, 각 제품당 3장의 이미지**
- Placeholder 이미지 사용: `https://placehold.co/600x450/색상코드/white?text=제품명`

### 5. 레이아웃 컴포넌트

#### Header (`components/layout/Header.tsx`)
- 로고: "🍊 제주감귤마켓"
- 네비게이션: 전체 상품, 감귤, 한라봉, 천혜향
- 우측: 로그인/장바구니 (비활성화 상태, "2단계 구현 예정" 툴팁)
- sticky top-0 (스크롤 시 상단 고정)

#### Footer (`components/layout/Footer.tsx`)
- 3단 레이아웃 (회사 정보, 고객센터, 이용안내)
- 사업자 정보 (Mock)
- 반응형 (모바일: 1열, 데스크탑: 3열)

### 6. 제품 목록 페이지 (`app/page.tsx`)

**구성:**
1. Hero Section: 메인 배너 "신선한 제주 감귤을 당신의 식탁으로"
2. 카테고리 필터: 전체/감귤/한라봉/천혜향 (URL 파라미터 사용)
3. 정렬: 낮은 가격순/높은 가격순/인기순
4. ProductGrid 컴포넌트
5. Trust Section: 신뢰 요소 (100% 제주산, 당일 수확 등)

**기능:**
- URL 쿼리 파라미터로 필터링: `/?category=citrus`
- 서버 컴포넌트로 구현 (정적 렌더링)

### 7. 제품 상세 페이지 (`app/products/[id]/page.tsx`)

**레이아웃 (2열):**
- 왼쪽: ProductImageGallery (메인 이미지 + 썸네일 4개)
- 오른쪽: ProductDetail (제품명, 가격, 설명, 특징, 버튼)

**하단 섹션:**
- 상세 정보
- ProductSpecifications (스펙 테이블)
- 배송 정보 (제주도 직송, 2-3일 소요)
- 교환/반품 안내

**기능:**
- 동적 라우팅: `generateStaticParams()` 사용
- 이미지 갤러리: 클라이언트 컴포넌트 (useState로 선택 이미지 관리)
- 장바구니/구매 버튼: 비활성화 상태 ("3단계 구현 예정")

### 8. 주요 컴포넌트

#### ProductCard (`components/products/ProductCard.tsx`)
- shadcn/ui Card 사용
- AspectRatio 4:3
- Badge (베스트, 신상 등)
- 할인가 강조 (원가 취소선)
- Hover 효과 (shadow-lg)

#### ProductImageGallery (`components/products/ProductImageGallery.tsx`)
- 클라이언트 컴포넌트 ('use client')
- 메인 이미지 + 썸네일 그리드
- 썸네일 클릭 시 메인 이미지 변경
- 선택된 썸네일 테두리 강조 (border-orange-600)

#### ProductSpecifications (`components/products/ProductSpecifications.tsx`)
- 테이블 형식 (원산지, 중량, 개수, 수확시기, 당도, 포장)
- 당도 시각화: 10개 바 (sweetness 값만큼 채우기)

### 9. 스타일링

**색상 팔레트:**
- 브랜드 오렌지: `#f97316` (orange-600)
- 배경: white, slate-50
- 텍스트: slate-700, slate-900

**타이포그래피:**
- 한글 폰트: Pretendard (Google Fonts에서 로드)
- 제목: font-bold
- 가격: text-4xl font-bold text-orange-600

**반응형:**
- 모바일: 1열 (grid-cols-1)
- 태블릿: 2열 (md:grid-cols-2)
- 데스크탑: 3열 (lg:grid-cols-3)
- 큰 화면: 4열 (xl:grid-cols-4)

### 10. 이미지 처리

**Placeholder 이미지:**
```typescript
// lib/utils/placeholder.ts
export function getPlaceholderImage(category: ProductCategory, index: number) {
  const colors = {
    citrus: 'FF8C00',
    hallabong: 'FFA500',
    cheonhyehyang: 'FFD700'
  };
  return `https://placehold.co/600x450/${colors[category]}/white?text=${category}+${index}`;
}
```

**Next.js Image 설정:**
```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['placehold.co'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### 11. SEO 및 메타데이터

```typescript
// app/layout.tsx
export const metadata = {
  title: '제주감귤마켓 - 프리미엄 제주 감귤 선물세트',
  description: '제주도 직송 신선한 감귤, 한라봉, 천혜향 선물세트. 명절 선물로 최적화된 프리미엄 제품.',
};

// app/products/[id]/page.tsx
export async function generateMetadata({ params }) {
  const product = mockProducts.find(p => p.id === params.id);
  return {
    title: `${product.name} | 제주감귤마켓`,
    description: product.description,
  };
}
```

---

## 중요 파일 목록

**반드시 생성해야 할 파일:**
1. `lib/types/product.ts` - 타입 정의
2. `lib/data/products.ts` - Mock 데이터 (9개 제품)
3. `app/layout.tsx` - 루트 레이아웃
4. `app/page.tsx` - 제품 목록 페이지
5. `app/products/[id]/page.tsx` - 제품 상세 페이지
6. `components/layout/Header.tsx` - 헤더
7. `components/layout/Footer.tsx` - 푸터
8. `components/products/ProductCard.tsx` - 제품 카드
9. `components/products/ProductGrid.tsx` - 제품 그리드
10. `components/products/ProductDetail.tsx` - 제품 상세 정보
11. `components/products/ProductImageGallery.tsx` - 이미지 갤러리
12. `components/products/ProductSpecifications.tsx` - 스펙 테이블

---

## 완료 기준 체크리스트

- [ ] Next.js 프로젝트 생성 및 shadcn/ui 설치
- [ ] 9개 제품 Mock 데이터 작성
- [ ] Header/Footer 컴포넌트 완성
- [ ] 제품 목록 페이지에서 모든 제품 표시
- [ ] 카테고리 필터링 동작 (URL 파라미터)
- [ ] 제품 카드 클릭 시 상세 페이지 이동
- [ ] 제품 상세 페이지에서 모든 정보 표시
- [ ] 이미지 갤러리 썸네일 클릭 동작
- [ ] 반응형 레이아웃 (모바일/태블릿/데스크탑)
- [ ] TypeScript 에러 없음
- [ ] 페이지 로딩 속도 3초 이내

---

## 향후 확장 대비

**2단계 (구글 로그인):**
- NextAuth.js 설치
- `/app/(auth)/login` 폴더 생성
- `lib/hooks/useAuth.ts` 추가

**3단계 (결제):**
- 장바구니 상태 관리 (Zustand)
- `/app/(shop)/cart` 폴더
- 결제 API 통합 (PortOne 또는 Toss Payments)

**4-5단계:**
- 주문 조회: `/app/(shop)/orders`
- 관리자 대시보드: `/app/(admin)/dashboard`
- 백엔드 API (Firebase/Supabase)로 Mock 데이터 대체
