-- ============================================
-- 상품 이미지 업데이트 (Unsplash 무료 이미지)
-- Supabase 대시보드 > SQL Editor에서 실행하세요
-- ============================================

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=450&fit=crop'
  ]
WHERE id = 'citrus-3kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=450&fit=crop'
  ]
WHERE id = 'citrus-5kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&h=450&fit=crop'
  ]
WHERE id = 'citrus-10kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1514012882563-5fc6cd890f29?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&h=450&fit=crop'
  ]
WHERE id = 'hallabong-3kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1514012882563-5fc6cd890f29?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=600&h=450&fit=crop'
  ]
WHERE id = 'hallabong-5kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?w=600&h=450&fit=crop'
  ]
WHERE id = 'cheonhyehyang-3kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1482012792084-a0c3725f289f?w=600&h=450&fit=crop'
  ]
WHERE id = 'cheonhyehyang-5kg';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=600&h=450&fit=crop'
  ]
WHERE id = 'mixed-premium';

UPDATE public.products SET
  images = ARRAY[
    'https://images.unsplash.com/photo-1597714026720-8f74c62310ba?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&h=450&fit=crop'
  ]
WHERE id = 'citrus-economy';

-- 확인
SELECT id, name, images[1] as first_image FROM public.products;
