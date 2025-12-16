# TODO: 단계별 작업 체크리스트

## Phase 1: 프로젝트 초기화 ✅

### 1-1. Next.js 프로젝트 생성 ✅
### 1-2. shadcn/ui 설치 ✅
### 1-3. shadcn/ui 컴포넌트 추가 ✅
### 1-4. 폴더 구조 생성 ✅
### 1-5. Tailwind 커스터마이징 ✅

---

## Phase 2: 데이터 레이어 ✅

### 2-1. TypeScript 타입 정의 ✅
**파일:** `lib/types/product.ts`
- [x] `ProductCategory` 타입 정의
- [x] `ProductSize` 타입 정의
- [x] `Product` 인터페이스 정의

### 2-2. 데이터 연동 ✅
- [x] Supabase 연동 완료 (Mock 데이터 대체)
- [x] Products 테이블 스키마 설계
- [x] 샘플 데이터 5개 등록

---

## Phase 3: 레이아웃 컴포넌트 ✅

### 3-1. Header 컴포넌트 ✅
**파일:** `components/layout/Header.tsx`
- [x] 로고 ("🍊 제주감귤마켓")
- [x] 네비게이션 링크 (전체 상품, 감귤, 한라봉, 천혜향)
- [x] 로그인/장바구니 버튼 (비활성화)
- [x] sticky top-0 스타일
- [x] 반응형 레이아웃

### 3-2. Footer 컴포넌트 ✅
**파일:** `components/layout/Footer.tsx`
- [x] 3단 레이아웃 (회사 정보, 고객센터, 이용안내)
- [x] Mock 사업자 정보 입력
- [x] 반응형 (모바일 1열, 데스크탑 3열)
- [x] 개인정보처리방침/이용약관 링크 추가

### 3-3. 루트 레이아웃 통합 ✅
**파일:** `app/layout.tsx`
- [x] Header/Footer 컴포넌트 배치
- [x] 메타데이터 설정
- [x] Pretendard 폰트 로드
- [x] `<html lang="ko">` 설정

---

## Phase 4: 제품 목록 페이지 ✅

### 4-1. ProductCard 컴포넌트 ✅
### 4-2. ProductGrid 컴포넌트 ✅

### 4-3. 홈/제품 목록 페이지 ✅
**파일:** `app/page.tsx`
- [x] Hero Section
- [x] 카테고리 필터 (URL 파라미터)
- [x] Supabase 연동
- [x] 로딩 화면 추가
- [x] 반응형 레이아웃
- [x] 모바일 줄바꿈 개선

---

## Phase 5: 제품 상세 페이지 ✅

### 5-1. ProductImageGallery 컴포넌트 ✅
### 5-2. ProductDetail 컴포넌트 ✅
### 5-3. ProductSpecifications 컴포넌트 ✅

### 5-4. 제품 상세 페이지 ✅
**파일:** `app/products/[id]/page.tsx`
- [x] 동적 라우팅
- [x] SEO 메타데이터 (Open Graph, Twitter Card)
- [x] 2열 레이아웃
- [x] 반응형

---

## Phase 6: 스타일링 및 마무리 ✅

### 6-1. 전역 스타일 조정 ✅
### 6-2. Next.js 설정 ✅
- [x] images.unsplash.com 호스트 추가

### 6-3. 추가 페이지 ✅
- [x] 개인정보처리방침 (`app/privacy/page.tsx`)
- [x] 이용약관 (`app/terms/page.tsx`) - 교환/환불 규정 포함

### 6-4. 로딩 상태 ✅
- [x] `app/loading.tsx` 생성

---

## Phase 7: 테스트 및 최적화

### 7-1. 기능 테스트
- [ ] 제품 목록 페이지 접속 확인
- [ ] 카테고리 필터 동작 확인
- [ ] 제품 카드 클릭 → 상세 페이지 이동 확인
- [ ] 이미지 갤러리 동작 확인

### 7-2. 반응형 테스트
- [ ] 모바일 (375px)
- [ ] 태블릿 (768px)
- [ ] 데스크탑 (1024px+)

### 7-3. 코드 품질
- [ ] `npm run lint` 에러 없음
- [ ] `npm run build` 성공

---

## 다음 단계 (2-5단계 예정)

### 2단계: 구글 로그인
- NextAuth.js 설치 및 설정
- Google OAuth Provider 연동

### 3단계: 결제
- 장바구니 상태 관리 (Zustand)
- PortOne 또는 Toss Payments 연동

### 4단계: 내 주문 조회
- 주문 내역/상세 페이지

### 5단계: 관리자 대시보드
- 상품 관리 (CRUD)
- 주문 관리
