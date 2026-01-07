-- Create products table for inventory management
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies (모든 사용자가 상품 조회 가능)
CREATE POLICY "Anyone can view products"
  ON public.products
  FOR SELECT
  USING (true);

-- Create function to decrease product stock
CREATE OR REPLACE FUNCTION public.decrease_product_stock(
  product_id TEXT,
  quantity INTEGER
)
RETURNS TABLE(success BOOLEAN, new_stock INTEGER, message TEXT) AS $$
DECLARE
  current_stock INTEGER;
  new_stock_value INTEGER;
BEGIN
  -- 현재 재고 조회 (FOR UPDATE로 락 걸기)
  SELECT stock INTO current_stock
  FROM public.products
  WHERE id = product_id
  FOR UPDATE;

  -- 상품이 존재하지 않는 경우
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, 0, '상품을 찾을 수 없습니다.';
    RETURN;
  END IF;

  -- 재고 부족 확인
  IF current_stock < quantity THEN
    RETURN QUERY SELECT false, current_stock, '재고가 부족합니다.';
    RETURN;
  END IF;

  -- 재고 차감
  new_stock_value := current_stock - quantity;

  UPDATE public.products
  SET stock = new_stock_value,
      updated_at = NOW()
  WHERE id = product_id;

  -- 성공 응답
  RETURN QUERY SELECT true, new_stock_value, '재고가 차감되었습니다.';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically update updated_at
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

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS products_id_idx ON public.products(id);
CREATE INDEX IF NOT EXISTS products_is_available_idx ON public.products(is_available);

-- Insert initial product data (Mock 데이터와 동기화)
INSERT INTO public.products (id, name, price, stock, is_available) VALUES
  ('citrus-3kg', '제주 감귤 3kg 선물세트', 35000, 100, true),
  ('citrus-5kg', '제주 감귤 5kg 프리미엄 세트', 55000, 80, true),
  ('citrus-10kg', '제주 감귤 10kg 특대 세트', 98000, 50, true),
  ('hallabong-3kg', '제주 한라봉 3kg 선물세트', 48000, 60, true),
  ('hallabong-5kg', '제주 한라봉 5kg 프리미엄 세트', 78000, 40, true),
  ('cheonhyehyang-3kg', '제주 천혜향 3kg 선물세트', 52000, 70, true),
  ('cheonhyehyang-5kg', '제주 천혜향 5kg 프리미엄 세트', 85000, 45, true),
  ('mixed-premium', '제주 프리미엄 혼합 선물세트', 95000, 30, true),
  ('citrus-economy', '제주 감귤 가정용 2kg', 25000, 150, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  stock = EXCLUDED.stock,
  is_available = EXCLUDED.is_available;
