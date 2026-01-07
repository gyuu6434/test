-- 주문 상태 enum 타입 정의
CREATE TYPE order_status AS ENUM (
  'pending_payment',  -- 결제 대기
  'paid',            -- 결제 완료
  'shipping',        -- 배송중
  'delivered',       -- 배송완료
  'cancelled'        -- 취소
);

-- 주문 테이블 (orders)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 주문자 정보
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- 배송 정보
  recipient_name VARCHAR(100) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_zipcode VARCHAR(10) NOT NULL,
  shipping_memo TEXT,

  -- 결제 정보
  payment_id VARCHAR(255) UNIQUE NOT NULL, -- 중복 방지를 위한 UNIQUE 제약
  payment_method VARCHAR(50), -- 'card', 'transfer', 'kakaopay' 등
  payment_amount INTEGER NOT NULL, -- 실제 결제 금액

  -- 주문 상태
  status order_status NOT NULL DEFAULT 'pending_payment',

  -- 총 금액
  total_amount INTEGER NOT NULL,

  -- 타임스탬프
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ, -- 결제 완료 시각
  shipped_at TIMESTAMPTZ, -- 배송 시작 시각
  delivered_at TIMESTAMPTZ, -- 배송 완료 시각
  cancelled_at TIMESTAMPTZ -- 취소 시각
);

-- 주문 상품 테이블 (order_items)
-- 한 주문에 여러 상품이 들어갈 수 있음
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 주문 정보
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  -- 상품 정보
  product_id VARCHAR(50) NOT NULL, -- products.id 참조 (현재는 Mock 데이터이므로 VARCHAR)
  product_name VARCHAR(200) NOT NULL, -- 주문 당시 상품명 저장
  product_image TEXT, -- 주문 당시 상품 이미지 URL

  -- 가격 정보 (주문 당시 가격 스냅샷)
  price INTEGER NOT NULL, -- 주문 당시 단가
  quantity INTEGER NOT NULL CHECK (quantity > 0), -- 수량
  subtotal INTEGER NOT NULL, -- 소계 (price * quantity)

  -- 타임스탬프
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_payment_id ON orders(payment_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- orders 테이블에 트리거 적용
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 주문 상태 변경 시 타임스탬프 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_order_status_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  -- 결제 완료
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    NEW.paid_at = NOW();
  END IF;

  -- 배송 시작
  IF NEW.status = 'shipping' AND OLD.status != 'shipping' THEN
    NEW.shipped_at = NOW();
  END IF;

  -- 배송 완료
  IF NEW.status = 'delivered' AND OLD.status != 'delivered' THEN
    NEW.delivered_at = NOW();
  END IF;

  -- 주문 취소
  IF NEW.status = 'cancelled' AND OLD.status != 'cancelled' THEN
    NEW.cancelled_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_order_status_timestamps_trigger
  BEFORE UPDATE ON orders
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION update_order_status_timestamps();

-- 관리자 확인 함수 생성
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (SELECT raw_user_meta_data->>'role' = 'admin'
       FROM auth.users
       WHERE id = auth.uid()),
      false
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Row Level Security (RLS) 설정
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- orders 테이블 RLS 정책

-- 1. 조회: 본인 주문만 조회 가능 (관리자는 모든 주문 조회 가능)
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

-- 2. 생성: 본인 계정으로만 주문 생성 가능
CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 3. 수정: 관리자만 가능
CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- 4. 삭제: 관리자만 가능
CREATE POLICY "Only admins can delete orders"
  ON orders FOR DELETE
  USING (is_admin());

-- order_items 테이블 RLS 정책

-- 1. 조회: 본인 주문의 상품만 조회 가능 (관리자는 모든 상품 조회 가능)
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  USING (
    is_admin() OR
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- 2. 생성: 본인 주문의 상품만 생성 가능
CREATE POLICY "Users can create their own order items"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- 3. 수정: 관리자만 가능
CREATE POLICY "Only admins can update order items"
  ON order_items FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

-- 4. 삭제: 관리자만 가능
CREATE POLICY "Only admins can delete order items"
  ON order_items FOR DELETE
  USING (is_admin());

-- 주문 통계용 뷰 (선택사항)
CREATE VIEW order_statistics AS
SELECT
  DATE(created_at) as order_date,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_sales,
  COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_orders,
  COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_orders
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- 설명 주석 추가
COMMENT ON TABLE orders IS '주문 정보를 저장하는 테이블';
COMMENT ON COLUMN orders.payment_id IS '결제 ID (중복 방지용, UNIQUE 제약)';
COMMENT ON COLUMN orders.status IS '주문 상태 (pending_payment, paid, shipping, delivered, cancelled)';
COMMENT ON TABLE order_items IS '주문 상품 상세 정보 (주문 당시 가격 스냅샷)';
COMMENT ON COLUMN order_items.price IS '주문 당시 단가 (상품 가격이 변경되어도 주문 당시 가격 유지)';
