-- ============================================
-- 상품 테이블 확장 스크립트
-- Supabase 대시보드 > SQL Editor에서 실행하세요
-- ============================================

-- 1단계: 기존 products 테이블에 새 컬럼 추가
-- ============================================

ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS category_name TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS original_price INTEGER,
ADD COLUMN IF NOT EXISTS size TEXT,
ADD COLUMN IF NOT EXISTS weight TEXT,
ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS badge TEXT,
ADD COLUMN IF NOT EXISTS features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS specifications JSONB DEFAULT '{}';

-- 2단계: 기존 데이터 삭제 후 전체 데이터 다시 입력
-- ============================================

DELETE FROM public.products;

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
);

-- 3단계: 인덱스 추가
-- ============================================

CREATE INDEX IF NOT EXISTS products_category_idx ON public.products(category);

-- ============================================
-- 완료!
-- 9개 상품이 전체 정보와 함께 입력되었습니다.
-- ============================================
