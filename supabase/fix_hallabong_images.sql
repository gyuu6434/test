-- ============================================
-- 한라봉 상품 이미지 수정
-- Supabase 대시보드 > SQL Editor에서 실행하세요
-- ============================================

-- 한라봉 3kg
UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&h=450&fit=crop'
  ]
WHERE id = 'hallabong-3kg';

-- 한라봉 5kg
UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&h=450&fit=crop'
  ]
WHERE id = 'hallabong-5kg';

-- 확인
SELECT id, name, images FROM public.products WHERE id LIKE 'hallabong%';
