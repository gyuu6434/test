-- 재고 차감을 위해 products 테이블에 UPDATE 정책 추가
-- 인증된 사용자가 재고를 업데이트할 수 있도록 허용

-- 기존 UPDATE 정책 삭제 (있으면)
DROP POLICY IF EXISTS "Authenticated users can update product stock" ON public.products;

-- 인증된 사용자가 재고를 업데이트할 수 있는 정책 추가
CREATE POLICY "Authenticated users can update product stock"
  ON public.products
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
