# 포트원(PortOne) 결제 연동 가이드

## 개요

제주감귤마켓에 포트원(PortOne) 결제 시스템이 연동되었습니다.

## 구현된 기능

### 1. 결제 프로세스
- ✅ 상품 상세 페이지에서 "구매하기" 클릭
- ✅ 결제 페이지(/checkout)로 이동
- ✅ 배송 정보 입력 및 개인정보 동의
- ✅ 포트원 결제 창 호출
- ✅ 결제 완료 후 서버 검증
- ✅ Supabase에 주문 정보 저장

### 2. 주요 파일

#### 클라이언트 사이드
- `lib/hooks/usePortOnePayment.ts` - 포트원 결제 훅
- `components/checkout/CheckoutForm.tsx` - 결제 폼 컴포넌트
- `app/checkout/page.tsx` - 결제 페이지

#### 서버 사이드
- `app/api/payments/verify/route.ts` - 결제 검증 API
- `supabase/migrations/20260107_create_orders_tables.sql` - 주문 테이블 스키마

## 환경 변수 설정

`.env.local` 파일에 다음 변수들이 추가되었습니다:

```env
# PortOne 설정
NEXT_PUBLIC_PORTONE_STORE_ID=store-66574616-59c7-420f-82ed-53b94e9d1d44
NEXT_PUBLIC_PORTONE_CHANNEL_KEY=channel-key-a4c37384-01a1-4110-94cc-b20badad6a00
```

## Supabase 데이터베이스 설정

### 1. Orders 테이블 구조

포트원 결제 정보를 저장하기 위해 다음 테이블들이 필요합니다:

#### `orders` 테이블
```sql
- id (UUID, PK)
- user_id (UUID, FK to auth.users)
- payment_id (VARCHAR, UNIQUE) - 포트원 결제 ID
- payment_method (VARCHAR) - 결제 방법 (card, transfer 등)
- payment_amount (INTEGER) - 실제 결제 금액
- total_amount (INTEGER) - 총 주문 금액
- status (order_status enum) - 주문 상태
- recipient_name (VARCHAR) - 받는 사람 이름
- recipient_phone (VARCHAR) - 받는 사람 연락처
- shipping_address (TEXT) - 배송 주소
- shipping_zipcode (VARCHAR) - 우편번호
- shipping_memo (TEXT) - 배송 메모
- created_at, updated_at, paid_at 등
```

#### `order_items` 테이블
```sql
- id (UUID, PK)
- order_id (UUID, FK to orders)
- product_id (VARCHAR) - 상품 ID
- product_name (VARCHAR) - 주문 당시 상품명
- product_image (TEXT) - 상품 이미지 URL
- price (INTEGER) - 주문 당시 단가
- quantity (INTEGER) - 수량
- subtotal (INTEGER) - 소계
```

### 2. 마이그레이션 실행

**로컬 Supabase 사용 시:**
```bash
npx supabase start
npx supabase db reset
```

**원격 Supabase 사용 시:**
1. Supabase 대시보드 접속
2. SQL Editor 열기
3. `supabase/migrations/20260107_create_orders_tables.sql` 파일 내용 복사
4. SQL Editor에 붙여넣고 실행

## 포트원 대시보드 설정

### 1. 테스트 환경 설정
- 포트원 대시보드(https://admin.portone.io) 로그인
- "개발자센터" > "API/Webhook" 메뉴
- "테스트 환경" 활성화
- 상점 ID와 채널 키 확인

### 2. Webhook 설정 (선택사항)
결제 완료 후 서버로 Webhook을 받으려면:
- Webhook URL: `https://your-domain.com/api/payments/webhook`
- 이벤트: `payment.paid`, `payment.failed` 등

### 3. 결제 수단 설정
- "결제 수단" 메뉴에서 사용할 결제 수단 활성화
- 테스트 모드에서는 테스트 카드 번호 사용 가능

## 테스트 방법

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 테스트 시나리오
1. 로그인 (필수)
2. 상품 상세 페이지에서 "구매하기" 클릭
3. 배송 정보 입력
4. 개인정보 동의 체크
5. "결제하기" 버튼 클릭
6. 포트원 결제 창에서 테스트 카드로 결제

### 3. 테스트 카드 번호
포트원 테스트 환경에서 사용 가능한 카드 번호:
- 카드번호: 아무 16자리 숫자
- 유효기간: 미래 날짜
- CVC: 아무 3자리 숫자
- 비밀번호: 아무 2자리 숫자

### 4. 결제 확인
- 개발자 도구 Console 확인
- Supabase 대시보드에서 `orders` 테이블 확인
- 포트원 대시보드 "결제 내역" 확인

## 주의사항

### 1. 로그인 필수
- 현재 구현은 로그인한 사용자만 결제 가능
- 비로그인 결제는 향후 추가 가능

### 2. 단일 상품 결제만 지원
- 현재는 한 번에 하나의 상품만 구매 가능
- 장바구니 기능은 향후 추가 예정

### 3. 보안
- API Secret Key는 서버에서만 사용
- 클라이언트에 노출되는 키는 `NEXT_PUBLIC_*` prefix 사용
- 실제 운영 환경에서는 환경변수 암호화 권장

### 4. 에러 처리
- 결제 실패 시 사용자에게 명확한 메시지 표시
- 서버 검증 실패 시 고객센터 안내
- 네트워크 에러 재시도 로직 구현

## 다음 단계

### 1. 주문 조회 페이지
- `/orders` 페이지 추가
- 사용자별 주문 내역 조회
- 주문 상태 확인 및 추적

### 2. 관리자 대시보드
- 주문 관리 페이지
- 배송 상태 업데이트
- 주문 통계 및 리포트

### 3. 추가 기능
- 장바구니 결제
- 다양한 결제 수단 (카카오페이, 네이버페이 등)
- 정기 결제 (구독)
- 환불 처리

## 참고 문서

- [포트원 공식 문서](https://developers.portone.io/)
- [포트원 Browser SDK](https://developers.portone.io/docs/ko/sdk/javascript-sdk)
- [포트원 REST API](https://developers.portone.io/api/rest-v2)

## 문제 해결

### 결제 창이 열리지 않는 경우
1. 브라우저 팝업 차단 해제
2. 환경변수 확인 (storeId, channelKey)
3. 개발자 도구 Console 에러 확인

### 결제는 완료되었는데 DB에 저장되지 않는 경우
1. Supabase orders 테이블 존재 여부 확인
2. RLS 정책 확인 (로그인 사용자만 INSERT 가능)
3. API route 로그 확인

### 로그인 후에도 결제가 안 되는 경우
1. Supabase 인증 상태 확인
2. middleware.ts에서 /checkout 경로 보호 확인
3. useAuth 훅에서 user 정보 확인
