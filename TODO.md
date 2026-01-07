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

## Phase 8: 구글 로그인 및 회원가입 ✅

### 8-1. Supabase 인증 설정 ✅
**관련 파일:** `lib/supabase/client.ts`, `lib/supabase/server.ts`
- [x] Supabase Auth 클라이언트 설정
- [x] 서버 컴포넌트용 클라이언트 설정

### 8-2. 구글 OAuth 로그인 ✅
**관련 파일:** `lib/hooks/useAuth.ts`, `app/auth/callback/route.ts`
- [x] Google OAuth Provider 연동
- [x] 로그인 콜백 라우트 구현
- [x] 프로필 존재 여부 확인 로직 추가
- [x] 신규 사용자 → `/signup` 리다이렉트
- [x] 기존 사용자 → 메인 페이지 리다이렉트

### 8-3. 회원가입 페이지 ✅
**관련 파일:**
- `app/(auth)/signup/page.tsx`
- `components/auth/SignupForm.tsx`
- `components/auth/AddressSearch.tsx`

**구현 기능:**
- [x] 이름 입력 (Google 이름 자동 입력)
- [x] 전화번호 입력 (010-0000-0000 자동 포맷팅)
- [x] Daum 우편번호 서비스 연동
- [x] 우편번호 검색 기능
- [x] 기본주소 자동 입력
- [x] 상세주소 필수 입력
- [x] 폼 유효성 검사
- [x] Supabase profiles 테이블 저장
- [x] 가입 완료 후 메인 페이지 이동

### 8-4. 로그인 흐름 개선 ✅
**로그인 플로우:**
1. Google 로그인 클릭
2. Google OAuth 인증
3. `/auth/callback`으로 리다이렉트
4. profiles 테이블에서 사용자 프로필 확인
   - 프로필 없음 → `/signup` 페이지로 이동 (추가 정보 입력)
   - 프로필 있음 → 메인 페이지로 이동

### 8-5. 주소 검색 기능 ✅
**Daum Postcode API:**
- [x] 동적 스크립트 로딩
- [x] 우편번호 자동 입력
- [x] 도로명/지번 주소 자동 입력
- [x] 상세주소 입력란 자동 포커스
- [x] 에러 처리 (스크립트 로드 실패)

### 8-6. Supabase 데이터베이스 스키마 ✅
**profiles 테이블:**
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  phone text not null,
  address text not null,
  created_at timestamp with time zone default now()
);
```

**RLS 정책:**
- [x] 본인 프로필만 조회/수정 가능
- [x] INSERT 시 본인 ID만 허용

---

## Phase 9: 결제 시스템 구현 ✅

### 9-1. 결제 페이지 구현 ✅
**관련 파일:**
- `app/payment/page.tsx`
- `components/checkout/CheckoutContent.tsx`
- `components/checkout/CheckoutForm.tsx`

**구현 기능:**
- [x] 결제 페이지 레이아웃 (상품 정보 + 배송 정보 + 결제)
- [x] 배송 정보 입력 폼 (이름, 전화번호, 주소)
- [x] Daum 우편번호 검색 연동
- [x] 개인정보 수집 동의 체크박스
- [x] 보호된 라우트 (로그인 필수)
- [x] 로그인 후 원래 페이지로 리다이렉트

### 9-2. PortOne 결제 연동 ✅
**관련 파일:**
- `lib/hooks/usePortOnePayment.ts`
- `.env.local` (환경 변수)

**구현 기능:**
- [x] PortOne SDK 동적 로딩
- [x] 결제 요청 (KG이니시스 테스트)
- [x] customData에 상품ID/배송정보 JSON 전달
- [x] 결제 완료 후 `/payment/success` 리다이렉트

**환경 변수:**
```
NEXT_PUBLIC_PORTONE_STORE_ID=store-66574616-...
NEXT_PUBLIC_PORTONE_CHANNEL_KEY=channel-key-...
PORTONE_API_SECRET=mQzHuDU...
```

### 9-3. 결제 검증 및 주문 저장 ✅
**관련 파일:**
- `app/payment/success/page.tsx`
- `app/payment/success/actions.ts`

**검증 플로우:**
1. [x] URL 파라미터에서 paymentId, orderId 추출
2. [x] PortOne API로 결제 정보 조회 (진위 확인)
3. [x] 결제 상태 확인 (PAID)
4. [x] customData 파싱 (Double-encoded JSON 처리)
5. [x] Supabase에서 상품 정보 조회
6. [x] 결제 금액 검증 (상품 가격과 일치)
7. [x] 재고 확인
8. [x] 중복 주문 확인
9. [x] 주문 정보 DB 저장
10. [x] 재고 차감
11. [x] 성공/실패 화면 표시

**보안:**
- [x] 서버 사이드에서만 결제 검증 (Server Actions)
- [x] 금액 위조 방지 (서버에서 실제 가격 확인)
- [x] 재고 차감 실패 시 주문 롤백

### 9-4. 데이터베이스 스키마 ✅
**orders 테이블:**
```sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  order_id text unique not null,
  payment_id text not null,
  product_id text not null,
  product_name text not null,
  amount integer not null,
  quantity integer not null default 1,
  status text not null default 'paid',
  shipping_name text not null,
  shipping_phone text not null,
  shipping_postcode text not null,
  shipping_address text not null,
  shipping_detail_address text not null,
  created_at timestamp with time zone default now()
);
```

**products 테이블 (재고 관리):**
```sql
create table products (
  id text primary key,
  name text not null,
  price integer not null,
  stock integer not null default 0,
  is_available boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

**RLS 정책:**
- [x] orders: 본인 주문만 조회/생성 가능
- [x] products: 누구나 조회 가능, 인증 사용자 재고 업데이트 가능

**마이그레이션 파일:**
- `supabase/migrations/20250107010000_create_orders_table.sql`
- `supabase/migrations/20250107020000_create_products_table.sql`
- `supabase/migrations/20250107030000_add_products_update_policy.sql`

### 9-5. 트러블슈팅 가이드 ✅
**파일:** `PAYMENT_TROUBLESHOOTING.md`
- [x] 자주 발생하는 오류 및 해결 방법
- [x] 디버깅 체크리스트
- [x] 테스트 결제 시나리오
- [x] 긴급 복구 방법 (DB 초기화)

---

## 다음 단계 (4-5단계 예정)

### 4단계: 내 주문 조회
- 주문 내역 페이지 (`/orders`)
- 주문 상세 페이지 (`/orders/[id]`)
- 배송 상태 확인

### 5단계: 관리자 대시보드
- 상품 관리 (CRUD)
- 주문 관리
- 통계 대시보드
