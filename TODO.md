# TODO: 단계별 작업 체크리스트

## Phase 1: 프로젝트 초기화

### 1-1. Next.js 프로젝트 생성
```bash
cd c:\VibeBuilder\0.강의\class
npx create-next-app@latest jeju-citrus-market
```
**설정 옵션:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router
- ❌ src/ directory (No)
- ✅ Import alias (@/*)

### 1-2. shadcn/ui 설치
```bash
cd jeju-citrus-market
npx shadcn@latest init
```
**설정:**
- Style: Default
- Base color: Slate
- CSS variables: Yes

### 1-3. shadcn/ui 컴포넌트 추가
```bash
npx shadcn@latest add card
npx shadcn@latest add button
npx shadcn@latest add badge
npx shadcn@latest add separator
npx shadcn@latest add aspect-ratio
```

### 1-4. 폴더 구조 생성
```bash
mkdir -p components/layout
mkdir -p components/products
mkdir -p lib/types
mkdir -p lib/data
mkdir -p lib/utils
mkdir -p public/images/products
```

### 1-5. Tailwind 커스터마이징
- `tailwind.config.ts`에 브랜드 오렌지 색상 추가
- Pretendard 폰트 설정 (`app/layout.tsx`)

---

## Phase 2: 데이터 레이어

### 2-1. TypeScript 타입 정의
**파일:** `lib/types/product.ts`

**작업:**
- [ ] `ProductCategory` 타입 정의
- [ ] `ProductSize` 타입 정의
- [ ] `Product` 인터페이스 정의 (id, name, category, price, images, specifications 등)

### 2-2. Mock 데이터 작성
**파일:** `lib/data/products.ts`

**작업:**
- [ ] 감귤 세트 3개 (3kg/5kg/10kg) - 3만원대, 5만원대, 8만원대
- [ ] 한라봉 세트 2개 (3kg/5kg) - 5만원대, 8만원대
- [ ] 천혜향 세트 2개 (3kg/5kg) - 6만원대, 9만원대
- [ ] 프리미엄 혼합 세트 1개 - 10만원대
- [ ] 각 제품에 3장의 이미지 URL (placeholder)
- [ ] 각 제품에 특징 4-5개, 스펙 정보 입력

### 2-3. 유틸리티 함수
**파일:** `lib/utils/placeholder.ts`

**작업:**
- [ ] `getPlaceholderImage()` 함수 작성 (카테고리별 색상 코드)

---

## Phase 3: 레이아웃 컴포넌트

### 3-1. Header 컴포넌트
**파일:** `components/layout/Header.tsx`

**작업:**
- [ ] 로고 ("🍊 제주감귤마켓")
- [ ] 네비게이션 링크 (전체 상품, 감귤, 한라봉, 천혜향)
- [ ] 로그인/장바구니 버튼 (비활성화, disabled)
- [ ] sticky top-0 스타일
- [ ] 반응형 레이아웃 (모바일: 햄버거 메뉴 고려)

### 3-2. Footer 컴포넌트
**파일:** `components/layout/Footer.tsx`

**작업:**
- [ ] 3단 레이아웃 (회사 정보, 고객센터, 이용안내)
- [ ] Mock 사업자 정보 입력
- [ ] 반응형 (모바일 1열, 데스크탑 3열)
- [ ] 배경색 slate-50, border-t

### 3-3. 루트 레이아웃 통합
**파일:** `app/layout.tsx`

**작업:**
- [ ] Header/Footer 컴포넌트 import 및 배치
- [ ] 메타데이터 설정 (title, description)
- [ ] Pretendard 폰트 로드
- [ ] `<html lang="ko">` 설정

---

## Phase 4: 제품 목록 페이지

### 4-1. ProductCard 컴포넌트
**파일:** `components/products/ProductCard.tsx`

**작업:**
- [ ] shadcn/ui Card 컴포넌트 활용
- [ ] AspectRatio 4:3로 이미지 표시
- [ ] Badge 표시 (베스트, 신상 등)
- [ ] 카테고리명, 제품명, 가격 표시
- [ ] 할인가 있으면 원가 취소선
- [ ] Hover 효과 (shadow-lg)
- [ ] Link로 `/products/${product.id}` 연결

### 4-2. ProductGrid 컴포넌트
**파일:** `components/products/ProductGrid.tsx`

**작업:**
- [ ] `products` prop 받기
- [ ] Grid 레이아웃 (grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4)
- [ ] ProductCard 맵핑

### 4-3. 홈/제품 목록 페이지
**파일:** `app/page.tsx`

**작업:**
- [ ] Hero Section (배너 텍스트: "신선한 제주 감귤을 당신의 식탁으로")
- [ ] 카테고리 필터 (전체/감귤/한라봉/천혜향) - URL 파라미터 사용
- [ ] 정렬 드롭다운 (낮은 가격순/높은 가격순/인기순)
- [ ] Mock 데이터 import 및 필터링 로직
- [ ] ProductGrid 컴포넌트 통합
- [ ] Trust Section (100% 제주산, 신선 배송 등 신뢰 요소)
- [ ] 반응형 레이아웃

---

## Phase 5: 제품 상세 페이지

### 5-1. ProductImageGallery 컴포넌트
**파일:** `components/products/ProductImageGallery.tsx`

**작업:**
- [ ] 'use client' 지시어 추가
- [ ] `images` prop 받기
- [ ] useState로 선택된 이미지 인덱스 관리
- [ ] 메인 이미지 표시 (AspectRatio 1:1)
- [ ] 썸네일 그리드 (grid-cols-4)
- [ ] 썸네일 클릭 시 메인 이미지 변경
- [ ] 선택된 썸네일 테두리 강조 (border-orange-600)

### 5-2. ProductDetail 컴포넌트
**파일:** `components/products/ProductDetail.tsx`

**작업:**
- [ ] `product` prop 받기
- [ ] Badge 표시
- [ ] 제품명 (text-3xl font-bold)
- [ ] 가격 표시 (할인가 강조, 원가 취소선)
- [ ] 할인율 Badge
- [ ] 제품 설명
- [ ] 주요 특징 리스트 (체크 아이콘 + 텍스트)
- [ ] 장바구니/구매 버튼 (disabled, "단계 구현 예정" 표시)
- [ ] 배송 정보 박스 (배경 slate-50)

### 5-3. ProductSpecifications 컴포넌트
**파일:** `components/products/ProductSpecifications.tsx`

**작업:**
- [ ] `specifications`, `weight` prop 받기
- [ ] 테이블 형식 (원산지, 중량, 개수, 수확시기, 당도, 포장)
- [ ] 당도 시각화 (10개 바, sweetness 값만큼 채우기)
- [ ] 짝수 줄 배경색 slate-50

### 5-4. 제품 상세 페이지
**파일:** `app/products/[id]/page.tsx`

**작업:**
- [ ] `generateStaticParams()` 함수 작성 (모든 제품 ID 반환)
- [ ] `generateMetadata()` 함수 작성 (동적 메타데이터)
- [ ] Mock 데이터에서 제품 찾기
- [ ] 404 처리 (제품 없을 경우 notFound())
- [ ] Breadcrumb (홈 > 제품 > 카테고리 > 제품명)
- [ ] 2열 레이아웃 (왼쪽: 이미지, 오른쪽: 상세 정보)
- [ ] ProductImageGallery 컴포넌트 통합
- [ ] ProductDetail 컴포넌트 통합
- [ ] Tabs Section (상세정보, 스펙, 배송정보, 교환/반품)
- [ ] ProductSpecifications 컴포넌트 통합
- [ ] 반응형 (모바일: 1열, 데스크탑: 2열)

---

## Phase 6: 스타일링 및 마무리

### 6-1. 전역 스타일 조정
**파일:** `app/globals.css`

**작업:**
- [ ] Tailwind 기본 스타일 유지
- [ ] 커스텀 스크롤바 스타일 (선택적)
- [ ] 링크 기본 스타일 (hover 효과)

### 6-2. Next.js 설정
**파일:** `next.config.js`

**작업:**
- [ ] images.domains에 'placehold.co' 추가
- [ ] images.formats에 'image/avif', 'image/webp' 추가

### 6-3. 404 페이지
**파일:** `app/not-found.tsx`

**작업:**
- [ ] 404 에러 페이지 디자인
- [ ] 홈으로 돌아가기 버튼

### 6-4. 로딩 상태
**파일:** `app/loading.tsx`, `app/products/[id]/loading.tsx`

**작업:**
- [ ] 스켈레톤 UI 또는 스피너
- [ ] 레이아웃 유지

---

## Phase 7: 테스트 및 최적화

### 7-1. 기능 테스트
- [ ] 제품 목록 페이지 접속 → 9개 제품 표시 확인
- [ ] 카테고리 필터 클릭 → 필터링 동작 확인
- [ ] 제품 카드 클릭 → 상세 페이지 이동 확인
- [ ] 이미지 갤러리 → 썸네일 클릭 시 메인 이미지 변경 확인
- [ ] 브라우저 뒤로가기 → 정상 동작 확인

### 7-2. 반응형 테스트
- [ ] 모바일 (375px) → 1열 레이아웃
- [ ] 태블릿 (768px) → 2열 레이아웃
- [ ] 데스크탑 (1024px+) → 3-4열 레이아웃
- [ ] Header 네비게이션 모바일 대응 확인

### 7-3. 코드 품질
- [ ] `npm run lint` → 에러 없음
- [ ] `npm run type-check` → TypeScript 에러 없음
- [ ] 불필요한 console.log 제거
- [ ] 주석 정리

### 7-4. 성능 최적화
- [ ] Next.js Image 컴포넌트 사용 확인
- [ ] 페이지 로딩 속도 3초 이내 확인
- [ ] Lighthouse 점수 확인 (Performance 80+ 목표)

---

## 완료 후 확인사항

### 최종 체크리스트
- [ ] 모든 페이지가 정상적으로 렌더링되는가?
- [ ] 모든 링크가 정상적으로 동작하는가?
- [ ] 반응형 레이아웃이 모든 화면 크기에서 정상인가?
- [ ] TypeScript 에러가 없는가?
- [ ] ESLint 경고가 최소화되었는가?
- [ ] 이미지가 모두 표시되는가?
- [ ] 비활성화된 버튼에 적절한 안내가 있는가?
- [ ] 404 페이지가 동작하는가?
- [ ] SEO 메타데이터가 설정되었는가?

### 제출 전 마지막 점검
```bash
npm run build
npm run start
```
- [ ] 빌드 에러 없음
- [ ] 프로덕션 모드에서 정상 동작

---

## 다음 단계 준비 (2-5단계 예정)

### 2단계: 구글 로그인
- NextAuth.js 설치 및 설정
- Google OAuth Provider 연동
- 사용자 세션 관리

### 3단계: 결제
- 장바구니 상태 관리 (Zustand)
- PortOne 또는 Toss Payments 연동
- 결제 페이지 구현

### 4단계: 내 주문 조회
- 주문 내역 페이지
- 주문 상세 페이지
- 배송 추적

### 5단계: 관리자 대시보드
- 관리자 인증 및 권한
- 상품 관리 (CRUD)
- 주문 관리
- 통계 대시보드
