-- ============================================
-- 제주감귤마켓 DB 리셋 스크립트
-- Supabase 대시보드 > SQL Editor에서 실행하세요
-- ============================================

-- 1단계: 기존 테이블 및 관련 객체 삭제
-- ============================================

DROP VIEW IF EXISTS order_statistics;

DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS order_status;

DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS update_orders_updated_at() CASCADE;
DROP FUNCTION IF EXISTS update_order_status_timestamps() CASCADE;
DROP FUNCTION IF EXISTS update_products_updated_at() CASCADE;
DROP FUNCTION IF EXISTS decrease_product_stock(TEXT, INTEGER) CASCADE;
DROP FUNCTION IF EXISTS is_admin() CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- 2단계: 프로필 테이블 생성
-- ============================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 3단계: 주문 테이블 생성
-- ============================================

CREATE TYPE order_status AS ENUM (
  'pending_payment',
  'paid',
  'shipping',
  'delivered',
  'cancelled'
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_name VARCHAR(100) NOT NULL,
  recipient_phone VARCHAR(20) NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_zipcode VARCHAR(10) NOT NULL,
  shipping_memo TEXT,
  payment_id VARCHAR(255) UNIQUE NOT NULL,
  payment_method VARCHAR(50),
  payment_amount INTEGER NOT NULL,
  status order_status NOT NULL DEFAULT 'pending_payment',
  total_amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR(50) NOT NULL,
  product_name VARCHAR(200) NOT NULL,
  product_image TEXT,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  subtotal INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_payment_id ON orders(payment_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION update_order_status_timestamps()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND OLD.status != 'paid' THEN
    NEW.paid_at = NOW();
  END IF;
  IF NEW.status = 'shipping' AND OLD.status != 'shipping' THEN
    NEW.shipped_at = NOW();
  END IF;
  IF NEW.status = 'delivered' AND OLD.status != 'delivered' THEN
    NEW.delivered_at = NOW();
  END IF;
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

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR is_admin());

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only admins can update orders"
  ON orders FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete orders"
  ON orders FOR DELETE
  USING (is_admin());

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

CREATE POLICY "Users can create their own order items"
  ON order_items FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can update order items"
  ON order_items FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Only admins can delete order items"
  ON order_items FOR DELETE
  USING (is_admin());

-- 4단계: 상품 테이블 생성 (확장 스키마)
-- ============================================

CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  category_name TEXT,
  description TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  size TEXT,
  weight TEXT,
  images TEXT[] DEFAULT '{}',
  badge TEXT,
  features TEXT[] DEFAULT '{}',
  specifications JSONB DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update product stock"
  ON public.products FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.decrease_product_stock(
  p_product_id TEXT,
  p_quantity INTEGER
)
RETURNS TABLE(success BOOLEAN, new_stock INTEGER, message TEXT) AS $$
DECLARE
  current_stock INTEGER;
  new_stock_value INTEGER;
BEGIN
  SELECT stock INTO current_stock
  FROM public.products
  WHERE id = p_product_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 0, '상품을 찾을 수 없습니다.';
    RETURN;
  END IF;

  IF current_stock < p_quantity THEN
    RETURN QUERY SELECT false, current_stock, '재고가 부족합니다.';
    RETURN;
  END IF;

  new_stock_value := current_stock - p_quantity;

  UPDATE public.products
  SET stock = new_stock_value,
      updated_at = NOW()
  WHERE id = p_product_id;

  RETURN QUERY SELECT true, new_stock_value, '재고가 차감되었습니다.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_products_updated_at();

CREATE INDEX IF NOT EXISTS products_id_idx ON public.products(id);
CREATE INDEX IF NOT EXISTS products_is_available_idx ON public.products(is_available);
CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category);

-- 5단계: 상품 초기 데이터 입력 (전체 정보)
-- ============================================

INSERT INTO public.products (
  id, name, category, category_name, description, price, original_price,
  size, weight, images, badge, features, specifications, stock, is_available
) VALUES
(
  'citrus-3kg',
  '제주 감귤 3kg 선물세트',
  'citrus',
  '감귤',
  '제주도에서 직송되는 신선한 감귤입니다. 당도 높고 과즙이 풍부한 프리미엄 감귤만을 선별했습니다.',
  35000,
  45000,
  'small',
  '3kg',
  ARRAY[
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+3kg+1',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+3kg+2',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+3kg+3'
  ],
  '베스트',
  ARRAY['100% 제주산 감귤', '당일 수확 후 직송', '고당도 프리미엄 등급', '선물용 포장 제공'],
  '{"origin": "제주도 서귀포", "harvest": "11월~2월", "sweetness": 8, "quantity": "약 30~35개", "packaging": "선물용 박스 포장"}'::jsonb,
  100,
  true
),
(
  'citrus-5kg',
  '제주 감귤 5kg 프리미엄 세트',
  'citrus',
  '감귤',
  '가족과 함께 즐기기 좋은 5kg 대용량 감귤 세트입니다. 프리미엄 등급만을 선별하여 포장했습니다.',
  55000,
  70000,
  'medium',
  '5kg',
  ARRAY[
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+5kg+1',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+5kg+2',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+5kg+3'
  ],
  '인기',
  ARRAY['대용량 가족용 구성', '엄선된 프리미엄 감귤', '신선도 보장', '무료 배송'],
  '{"origin": "제주도 서귀포", "harvest": "11월~2월", "sweetness": 9, "quantity": "약 50~60개", "packaging": "프리미엄 박스 포장"}'::jsonb,
  80,
  true
),
(
  'citrus-10kg',
  '제주 감귤 10kg 특대 세트',
  'citrus',
  '감귤',
  '최고 등급의 감귤만을 모은 특대 세트입니다. 대가족 또는 단체 선물용으로 적합합니다.',
  98000,
  120000,
  'large',
  '10kg',
  ARRAY[
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+10kg+1',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+10kg+2',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+10kg+3'
  ],
  NULL,
  ARRAY['특대 용량 구성', '최고 등급만 선별', '단체 선물 최적화', '전국 무료 배송'],
  '{"origin": "제주도 서귀포", "harvest": "11월~2월", "sweetness": 9, "quantity": "약 100~120개", "packaging": "특대형 프리미엄 박스"}'::jsonb,
  50,
  true
),
(
  'hallabong-3kg',
  '제주 한라봉 3kg 선물세트',
  'hallabong',
  '한라봉',
  '제주의 대표 고급 감귤인 한라봉입니다. 독특한 향과 풍부한 과즙이 특징입니다.',
  48000,
  60000,
  'small',
  '3kg',
  ARRAY[
    'https://placehold.co/600x450/FFA500/white?text=Hallabong+3kg+1',
    'https://placehold.co/600x450/FFA500/white?text=Hallabong+3kg+2',
    'https://placehold.co/600x450/FFA500/white?text=Hallabong+3kg+3'
  ],
  '프리미엄',
  ARRAY['제주 한라봉 특산품', '높은 당도와 향', '선물용 고급 포장', '신선 보장'],
  '{"origin": "제주도 제주시", "harvest": "12월~3월", "sweetness": 10, "quantity": "약 15~18개", "packaging": "고급 선물 박스"}'::jsonb,
  60,
  true
),
(
  'hallabong-5kg',
  '제주 한라봉 5kg 프리미엄 세트',
  'hallabong',
  '한라봉',
  '엄선된 최고급 한라봉으로 구성된 5kg 세트입니다. 명절 선물로 인기가 높습니다.',
  78000,
  95000,
  'medium',
  '5kg',
  ARRAY[
    'https://placehold.co/600x450/FFA500/white?text=Hallabong+5kg+1',
    'https://placehold.co/600x450/FFA500/white?text=Hallabong+5kg+2',
    'https://placehold.co/600x450/FFA500/white?text=Hallabong+5kg+3'
  ],
  '베스트',
  ARRAY['최고급 한라봉', '명절 선물 추천', '풍부한 과즙', '프리미엄 포장'],
  '{"origin": "제주도 제주시", "harvest": "12월~3월", "sweetness": 10, "quantity": "약 25~30개", "packaging": "프리미엄 선물 박스"}'::jsonb,
  40,
  true
),
(
  'cheonhyehyang-3kg',
  '제주 천혜향 3kg 선물세트',
  'cheonhyehyang',
  '천혜향',
  '달콤하고 향긋한 천혜향입니다. 껍질이 얇고 과육이 부드러워 먹기 편합니다.',
  52000,
  65000,
  'small',
  '3kg',
  ARRAY[
    'https://placehold.co/600x450/FFD700/white?text=Cheonhyehyang+3kg+1',
    'https://placehold.co/600x450/FFD700/white?text=Cheonhyehyang+3kg+2',
    'https://placehold.co/600x450/FFD700/white?text=Cheonhyehyang+3kg+3'
  ],
  '신상',
  ARRAY['프리미엄 천혜향', '높은 당도', '부드러운 과육', '고급 선물 포장'],
  '{"origin": "제주도 서귀포", "harvest": "1월~4월", "sweetness": 10, "quantity": "약 15~18개", "packaging": "고급 선물 박스"}'::jsonb,
  70,
  true
),
(
  'cheonhyehyang-5kg',
  '제주 천혜향 5kg 프리미엄 세트',
  'cheonhyehyang',
  '천혜향',
  '최고급 천혜향으로만 구성된 프리미엄 세트입니다. 달콤한 향과 맛이 일품입니다.',
  85000,
  105000,
  'medium',
  '5kg',
  ARRAY[
    'https://placehold.co/600x450/FFD700/white?text=Cheonhyehyang+5kg+1',
    'https://placehold.co/600x450/FFD700/white?text=Cheonhyehyang+5kg+2',
    'https://placehold.co/600x450/FFD700/white?text=Cheonhyehyang+5kg+3'
  ],
  '인기',
  ARRAY['최고급 천혜향', '풍부한 향', '선물용 최적', '신선도 보장'],
  '{"origin": "제주도 서귀포", "harvest": "1월~4월", "sweetness": 10, "quantity": "약 25~30개", "packaging": "프리미엄 선물 박스"}'::jsonb,
  45,
  true
),
(
  'mixed-premium',
  '제주 프리미엄 혼합 선물세트',
  'citrus',
  '프리미엄 혼합',
  '감귤, 한라봉, 천혜향을 한 번에 즐길 수 있는 프리미엄 혼합 세트입니다. 다양한 맛을 경험하고 싶은 분께 추천합니다.',
  95000,
  120000,
  'premium',
  '5kg',
  ARRAY[
    'https://placehold.co/600x450/FF6347/white?text=Premium+Mix+1',
    'https://placehold.co/600x450/FF6347/white?text=Premium+Mix+2',
    'https://placehold.co/600x450/FF6347/white?text=Premium+Mix+3'
  ],
  '프리미엄',
  ARRAY['3종 감귤 혼합 구성', '최고급 등급만 선별', '프리미엄 선물 포장', '다양한 맛 경험'],
  '{"origin": "제주도 전역", "harvest": "11월~4월", "sweetness": 9, "quantity": "감귤 10개, 한라봉 8개, 천혜향 7개", "packaging": "특별 프리미엄 박스"}'::jsonb,
  30,
  true
),
(
  'citrus-economy',
  '제주 감귤 가정용 2kg',
  'citrus',
  '감귤',
  '가정에서 부담 없이 즐기기 좋은 가정용 감귤입니다. 합리적인 가격에 신선한 감귤을 만나보세요.',
  25000,
  NULL,
  'small',
  '2kg',
  ARRAY[
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+Economy+1',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+Economy+2',
    'https://placehold.co/600x450/FF8C00/white?text=Citrus+Economy+3'
  ],
  NULL,
  ARRAY['가정용 알뜰 구성', '신선한 제주 감귤', '합리적인 가격', '간편 포장'],
  '{"origin": "제주도 서귀포", "harvest": "11월~2월", "sweetness": 8, "quantity": "약 20~25개", "packaging": "간편 박스 포장"}'::jsonb,
  150,
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  category_name = EXCLUDED.category_name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  size = EXCLUDED.size,
  weight = EXCLUDED.weight,
  images = EXCLUDED.images,
  badge = EXCLUDED.badge,
  features = EXCLUDED.features,
  specifications = EXCLUDED.specifications,
  stock = EXCLUDED.stock,
  is_available = EXCLUDED.is_available;

-- ============================================
-- 완료!
-- 테이블: profiles, orders, order_items, products
-- ============================================
