# 결제 오류 해결 가이드

## 문제 진단 방법

### 1. 서버 콘솔 로그 확인
개발 서버 터미널에서 `[VerifyPayment]`로 시작하는 로그를 확인하세요.

```bash
npm run dev
```

### 2. 브라우저 콘솔 확인
F12 → Console 탭에서 `[PaymentSuccess]`로 시작하는 로그를 확인하세요.

---

## 자주 발생하는 오류

### Case 1: "결제 정보를 확인할 수 없습니다" (PortOne API 오류)

**원인:**
- PortOne API Secret이 잘못됨
- PortOne 테스트/운영 환경 불일치
- PortOne API 서버 오류

**해결:**
1. `.env.local` 파일 확인:
   ```bash
   PORTONE_API_SECRET=your-secret-here
   ```
2. PortOne 대시보드에서 API Secret 재확인
3. 개발 서버 재시작: `npm run dev`

**로그 예시:**
```
[VerifyPayment] PortOne API error: {
  status: 401,
  statusText: 'Unauthorized',
  body: '...'
}
```

---

### Case 2: "주문 정보를 확인할 수 없습니다" (customData 파싱 오류)

**원인:**
- PortOne에 전달한 customData가 JSON 형식이 아님
- customData가 비어있음

**해결:**
1. `lib/hooks/usePortOnePayment.ts` 확인:
   ```typescript
   customData: JSON.stringify({
     productId: product.id,
     name: shipping.name,
     // ...
   })
   ```
2. customData에 `productId`가 포함되어 있는지 확인

**로그 예시:**
```
[VerifyPayment] Failed to parse customData: SyntaxError
Raw data: undefined
```

---

### Case 3: "상품 정보를 찾을 수 없습니다"

**원인:**
- customData의 productId가 잘못됨
- Mock 데이터에 해당 상품이 없음

**해결:**
1. `lib/data/products.ts`에서 상품 ID 확인
2. 결제 시 올바른 상품 ID가 전달되는지 확인

**로그 예시:**
```
[VerifyPayment] Product not found: invalid-product-id
```

---

### Case 4: "결제 금액이 일치하지 않습니다"

**원인:**
- 클라이언트에서 전달한 금액과 서버의 실제 상품 가격이 다름
- 보안 공격 시도 (가격 조작)

**해결:**
1. 상품 가격이 변경되었는지 확인
2. 캐시 문제 → 브라우저 새로고침

**로그 예시:**
```
[VerifyPayment] Payment amount mismatch: {
  expected: 35000,
  actual: 1000
}
```

---

### Case 5: "주문 정보 저장에 실패했습니다" (Database 오류)

**원인:**
- Supabase orders 테이블이 생성되지 않음
- RLS 정책 오류
- 컬럼 타입 불일치

**해결:**
1. Supabase SQL Editor에서 마이그레이션 실행:
   ```sql
   -- supabase/migrations/20250107010000_create_orders_table.sql
   ```
2. Supabase 대시보드 → Table Editor → orders 테이블 확인
3. RLS 정책 확인

**로그 예시:**
```
[VerifyPayment] Database insert error: {
  code: '42P01',
  message: 'relation "public.orders" does not exist'
}
```

---

### Case 6: "재고 차감 RPC 오류"

**원인:**
- `decrease_product_stock` RPC 함수가 생성되지 않음
- products 테이블이 생성되지 않음

**해결:**
1. Supabase SQL Editor에서 마이그레이션 실행:
   ```sql
   -- supabase/migrations/20250107020000_create_products_table.sql
   ```
2. Supabase 대시보드 → Database → Functions 확인

**로그 예시:**
```
[VerifyPayment] Stock RPC error: {
  message: 'function decrease_product_stock() does not exist'
}
```

---

### Case 7: "상품의 재고가 부족합니다"

**원인:**
- products 테이블의 stock이 0
- 동시 주문으로 재고 소진

**해결:**
1. Supabase 대시보드 → Table Editor → products
2. 해당 상품의 stock 값 확인 및 증가
3. 또는 Mock 데이터 재삽입:
   ```sql
   -- products 테이블 데이터 재삽입
   ```

**로그 예시:**
```
[VerifyPayment] Stock unavailable: {
  stock: 0,
  isAvailable: true
}
```

---

## 디버깅 체크리스트

### 환경 변수 확인
- [ ] `.env.local` 파일 존재
- [ ] `PORTONE_API_SECRET` 설정됨
- [ ] `NEXT_PUBLIC_PORTONE_STORE_ID` 설정됨
- [ ] `NEXT_PUBLIC_PORTONE_CHANNEL_KEY` 설정됨
- [ ] 개발 서버 재시작함

### 데이터베이스 확인
- [ ] orders 테이블 생성됨
- [ ] products 테이블 생성됨
- [ ] decrease_product_stock 함수 생성됨
- [ ] RLS 정책 활성화됨
- [ ] products 테이블에 데이터 있음 (stock > 0)

### PortOne 설정 확인
- [ ] PortOne 대시보드에서 채널 생성됨
- [ ] 테스트 결제 가능한 상태
- [ ] Store ID, Channel Key, API Secret 일치

---

## 테스트 결제 시나리오

### 정상 플로우
1. 상품 페이지 접속
2. "결제하기" 클릭
3. 배송 정보 입력
4. PortOne 결제창에서 테스트 카드 입력
5. 결제 완료 후 `/payment/success` 리다이렉트
6. "주문 완료" 화면 표시

### 서버 로그 (정상)
```
[VerifyPayment] Starting verification: { paymentId: 'ORDER-...', orderId: 'ORDER-...' }
[VerifyPayment] User authenticated: uuid
[VerifyPayment] Fetching payment from PortOne API
[VerifyPayment] Payment fetched: { id: '...', status: 'PAID', amount: 35000 }
[VerifyPayment] Checking payment status
[VerifyPayment] Parsing customData
[VerifyPayment] customData parsed: { productId: 'citrus-3kg' }
[VerifyPayment] Fetching product: citrus-3kg
[VerifyPayment] Product found: { id: 'citrus-3kg', name: '제주 감귤 3kg 선물세트', price: 35000 }
[VerifyPayment] Verifying amount
[VerifyPayment] Checking stock
[VerifyPayment] Checking for duplicate order
[VerifyPayment] Inserting order into database
[VerifyPayment] Order inserted: ORDER-...
[VerifyPayment] Decreasing stock
[VerifyPayment] Stock decreased: { product: '제주 감귤 3kg 선물세트', remaining: 99 }
[VerifyPayment] Verification completed successfully
```

---

## 긴급 복구 방법

### 데이터베이스 초기화
```sql
-- 1. 기존 테이블 삭제
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;

-- 2. 마이그레이션 재실행
-- supabase/migrations/20250107010000_create_orders_table.sql
-- supabase/migrations/20250107020000_create_products_table.sql
```

### 재고 초기화
```sql
UPDATE public.products SET stock = 100 WHERE id = 'citrus-3kg';
UPDATE public.products SET stock = 80 WHERE id = 'citrus-5kg';
-- ... (나머지 상품들)
```

---

## 추가 도움

문제가 계속되면 다음 정보를 함께 제공해주세요:
1. 브라우저 콘솔 로그 (F12)
2. 서버 콘솔 로그
3. Supabase Table Editor 스크린샷
4. PortOne 대시보드 결제 내역
