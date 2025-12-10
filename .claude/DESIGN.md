# 제주감귤마켓 디자인 시스템

## 브랜드 컬러 팔레트

### 주요 색상 (Primary Colors)

```typescript
const COLORS = {
  light: {
    // 브랜드 오렌지 - 제주 감귤의 생생한 색상
    primary: "#f97316",           // orange-600 (메인 CTA, 강조)
    primaryHover: "#ea580c",      // orange-700 (호버 상태)
    primaryLight: "#fb923c",      // orange-400 (배지, 하이라이트)

    // 배경 및 서피스
    background: "#ffffff",        // 메인 배경
    backgroundAlt: "#f8fafc",     // slate-50 (섹션 배경)
    surface: "#ffffff",           // 카드, 모달 배경

    // 텍스트 색상
    textPrimary: "#0f172a",       // slate-900 (헤드라인)
    textSecondary: "#334155",     // slate-700 (본문)
    textMuted: "#64748b",         // slate-500 (보조 텍스트)
    textInverted: "#ffffff",      // 다크 배경 위 텍스트

    // 공지/알림 바
    announcementBar: "#fff7ed",   // orange-50 (부드러운 오렌지 배경)
    announcementText: "#9a3412",  // orange-800 (높은 가독성)

    // 버튼
    ctaButton: "#f97316",         // 주요 CTA
    ctaButtonHover: "#ea580c",    // CTA 호버
    secondaryButton: "#ffffff",   // 보조 버튼
    secondaryButtonBorder: "#e2e8f0", // slate-200 (보조 버튼 테두리)

    // 상태 색상
    success: "#22c55e",           // green-500 (재고 있음, 배송 가능)
    warning: "#eab308",           // yellow-500 (재고 적음)
    error: "#ef4444",             // red-500 (품절, 에러)
    info: "#3b82f6",              // blue-500 (정보)

    // 테두리 및 구분선
    border: "#e2e8f0",            // slate-200
    borderLight: "#f1f5f9",       // slate-100
    divider: "#cbd5e1",           // slate-300

    // 오버레이
    overlay: "rgba(15, 23, 42, 0.5)", // 반투명 다크 오버레이

    // 카드 및 인터랙션
    cardShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    cardShadowHover: "0 10px 25px -5px rgb(249 115 22 / 0.2)", // 오렌지 그림자
  },
} as const;
```

### 색상 사용 가이드

**오렌지 톤 (브랜드 컬러):**
- `#f97316` (orange-600): 주요 CTA 버튼, 가격 강조, 선택된 상태
- `#fb923c` (orange-400): 배지 (베스트, 신상), 하이라이트
- `#fed7aa` (orange-200): 호버 배경, 미묘한 강조

**중성 톤 (Slate):**
- 배경: `#ffffff`, `#f8fafc`
- 텍스트: `#0f172a` (진함), `#334155` (중간), `#64748b` (연함)
- 테두리: `#e2e8f0`, `#cbd5e1`

---

## 타이포그래피

### 폰트 패밀리

```css
/* 한글 메인 폰트 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

### 폰트 크기 스케일 (Tailwind)

```typescript
const TYPOGRAPHY = {
  // 헤드라인
  displayLarge: "text-5xl font-bold",      // 48px (히어로)
  displayMedium: "text-4xl font-bold",     // 36px (페이지 제목)
  displaySmall: "text-3xl font-bold",      // 30px (섹션 제목)

  // 타이틀
  h1: "text-2xl font-bold",                // 24px
  h2: "text-xl font-semibold",             // 20px
  h3: "text-lg font-semibold",             // 18px

  // 본문
  bodyLarge: "text-base",                  // 16px (기본 본문)
  bodyMedium: "text-sm",                   // 14px (설명)
  bodySmall: "text-xs",                    // 12px (캡션, 메타)

  // 가격 전용
  priceLarge: "text-4xl font-bold",        // 36px (상세 페이지 가격)
  priceMedium: "text-2xl font-bold",       // 24px (카드 가격)

  // 버튼
  buttonLarge: "text-base font-semibold",  // 16px
  buttonMedium: "text-sm font-medium",     // 14px
} as const;
```

### 행간 (Line Height)

```css
.leading-tight { line-height: 1.25; }    /* 헤드라인 */
.leading-normal { line-height: 1.5; }    /* 본문 */
.leading-relaxed { line-height: 1.625; } /* 긴 텍스트 */
```

---

## 스페이싱 시스템

### Tailwind 기반 간격 (4px 단위)

```typescript
const SPACING = {
  // 컴포넌트 내부 여백
  xs: "p-2",    // 8px
  sm: "p-4",    // 16px
  md: "p-6",    // 24px
  lg: "p-8",    // 32px
  xl: "p-12",   // 48px

  // 섹션 간격
  sectionGap: "py-16 lg:py-24",  // 64px/96px

  // 컴포넌트 간격
  stackXs: "space-y-2",   // 8px
  stackSm: "space-y-4",   // 16px
  stackMd: "space-y-6",   // 24px
  stackLg: "space-y-8",   // 32px

  // 그리드 갭
  gridGap: "gap-6 lg:gap-8",  // 24px/32px
} as const;
```

---

## 레이아웃 그리드

### 반응형 브레이크포인트

```typescript
const BREAKPOINTS = {
  sm: "640px",   // 모바일 랜드스케이프
  md: "768px",   // 태블릿
  lg: "1024px",  // 데스크탑
  xl: "1280px",  // 큰 데스크탑
  "2xl": "1536px", // 초대형 화면
} as const;
```

### 제품 그리드

```css
/* 모바일: 1열 */
grid-cols-1

/* 태블릿: 2열 */
md:grid-cols-2

/* 데스크탑: 3열 */
lg:grid-cols-3

/* 큰 화면: 4열 */
xl:grid-cols-4
```

### 컨테이너 너비

```typescript
const CONTAINER = {
  default: "max-w-7xl mx-auto px-6 lg:px-10",  // 1280px
  narrow: "max-w-4xl mx-auto px-6",            // 896px (상세 페이지)
  wide: "max-w-[1440px] mx-auto px-6 lg:px-12", // 1440px (전체 폭)
} as const;
```

---

## 컴포넌트 스타일

### 버튼

```typescript
const BUTTON_STYLES = {
  primary: `
    bg-orange-600 text-white
    hover:bg-orange-700
    px-6 py-3 rounded-lg
    font-semibold text-sm
    transition-colors duration-200
    shadow-sm hover:shadow-md
  `,

  secondary: `
    bg-white text-slate-900
    border-2 border-slate-200
    hover:border-orange-600 hover:text-orange-600
    px-6 py-3 rounded-lg
    font-semibold text-sm
    transition-all duration-200
  `,

  ghost: `
    bg-transparent text-orange-600
    hover:bg-orange-50
    px-4 py-2 rounded-lg
    font-medium text-sm
    transition-colors duration-200
  `,
} as const;
```

### 카드 (ProductCard)

```typescript
const CARD_STYLES = {
  base: `
    bg-white rounded-xl
    border border-slate-200
    overflow-hidden
    transition-all duration-300
  `,

  hover: `
    hover:shadow-lg
    hover:border-orange-200
    hover:-translate-y-1
  `,

  imageContainer: `
    relative aspect-[4/3]
    overflow-hidden
    bg-slate-50
  `,

  badge: `
    absolute top-3 left-3
    bg-orange-500 text-white
    px-3 py-1 rounded-full
    text-xs font-semibold
    shadow-sm
  `,

  content: `
    p-6 space-y-3
  `,

  price: `
    text-2xl font-bold text-orange-600
  `,

  originalPrice: `
    text-sm text-slate-400 line-through
  `,
} as const;
```

### 배지 (Badge)

```typescript
const BADGE_STYLES = {
  best: "bg-orange-500 text-white",
  new: "bg-blue-500 text-white",
  sale: "bg-red-500 text-white",
  soldout: "bg-slate-400 text-white",
} as const;
```

---

## 이미지 처리

### Placeholder 이미지

```typescript
export function getPlaceholderImage(
  category: "citrus" | "hallabong" | "cheonhyehyang",
  index: number
) {
  const colors = {
    citrus: "FF8C00",      // 다크 오렌지
    hallabong: "FFA500",   // 오렌지
    cheonhyehyang: "FFD700", // 골드
  };

  const labels = {
    citrus: "제주감귤",
    hallabong: "한라봉",
    cheonhyehyang: "천혜향",
  };

  return `https://placehold.co/600x450/${colors[category]}/white?text=${labels[category]}+${index}`;
}
```

### Next.js Image 최적화

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['placehold.co'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
};
```

### 이미지 비율

```typescript
const IMAGE_RATIOS = {
  product: "aspect-[4/3]",       // 제품 카드
  hero: "aspect-[21/9]",         // 히어로 배너
  gallery: "aspect-square",      // 갤러리 썸네일
  detail: "aspect-[3/2]",        // 상세 이미지
} as const;
```

---

## 애니메이션 및 트랜지션

### Framer Motion 기본 설정

```typescript
import { motion } from "framer-motion";

const ANIMATIONS = {
  // 페이드인
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },

  // 카드 호버
  cardHover: {
    whileHover: { y: -4, transition: { duration: 0.2 } },
  },

  // 스태거 애니메이션 (제품 그리드)
  stagger: {
    container: {
      animate: {
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },
} as const;
```

### CSS 트랜지션

```css
/* 기본 트랜지션 */
transition-all duration-200 ease-in-out

/* 색상 변경 */
transition-colors duration-200

/* 그림자 */
transition-shadow duration-300
```

---

## 접근성 (Accessibility)

### 포커스 스타일

```css
/* 키보드 포커스 */
focus:outline-none
focus-visible:ring-2
focus-visible:ring-orange-600
focus-visible:ring-offset-2
```

### ARIA 레이블

```typescript
// 버튼
<button aria-label="장바구니에 추가">
  <ShoppingCartIcon />
</button>

// 이미지
<Image
  src="..."
  alt="제주 감귤 5kg 선물세트 상세 이미지"
/>

// 네비게이션
<nav aria-label="메인 네비게이션">
  ...
</nav>
```

### 색상 대비율

- **AAA 등급 (7:1)**: 본문 텍스트 (`#0f172a` on `#ffffff`)
- **AA 등급 (4.5:1)**: 보조 텍스트, 버튼 (`#334155` on `#ffffff`)
- **대형 텍스트 (3:1)**: 헤드라인 (`#f97316` on `#ffffff`)

---

## 다크 모드 (향후 확장)

```typescript
const COLORS_DARK = {
  dark: {
    primary: "#fb923c",           // 밝은 오렌지
    background: "#0f172a",        // slate-900
    surface: "#1e293b",           // slate-800
    textPrimary: "#f1f5f9",       // slate-100
    textSecondary: "#cbd5e1",     // slate-300
    border: "#334155",            // slate-700
  },
} as const;
```

```css
/* Tailwind dark: 접두사 */
dark:bg-slate-900
dark:text-slate-100
dark:border-slate-700
```

---

## 파일 구조

```
jeju-citrus-market/
├── styles/
│   ├── globals.css              # Tailwind + 글로벌 스타일
│   └── design-tokens.ts         # 디자인 토큰 상수
├── lib/
│   └── constants/
│       ├── colors.ts            # 색상 정의
│       ├── typography.ts        # 타이포그래피
│       └── animations.ts        # 애니메이션 프리셋
└── components/
    └── ui/                      # shadcn/ui 컴포넌트
```

---

## 사용 예시

### ProductCard 컴포넌트

```tsx
<motion.div
  className="bg-white rounded-xl border border-slate-200 overflow-hidden
             hover:shadow-lg hover:border-orange-200 hover:-translate-y-1
             transition-all duration-300"
  whileHover={{ y: -4 }}
>
  {/* 이미지 */}
  <div className="relative aspect-[4/3] bg-slate-50">
    <Image src="..." alt="..." fill className="object-cover" />
    <span className="absolute top-3 left-3 bg-orange-500 text-white
                     px-3 py-1 rounded-full text-xs font-semibold">
      베스트
    </span>
  </div>

  {/* 컨텐츠 */}
  <div className="p-6 space-y-3">
    <h3 className="text-lg font-semibold text-slate-900">
      제주 감귤 5kg 선물세트
    </h3>

    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-orange-600">
        39,000원
      </span>
      <span className="text-sm text-slate-400 line-through">
        49,000원
      </span>
    </div>

    <button className="w-full bg-orange-600 text-white hover:bg-orange-700
                       px-6 py-3 rounded-lg font-semibold text-sm
                       transition-colors duration-200">
      장바구니 담기
    </button>
  </div>
</motion.div>
```

---

## 브랜드 가이드라인

### 로고 사용

```tsx
// 헤더 로고
<div className="flex items-center gap-2">
  <span className="text-2xl">🍊</span>
  <span className="text-xl font-bold text-slate-900">
    제주감귤마켓
  </span>
</div>
```

### 톤 앤 매너

- **친근하고 신뢰감 있는 톤**
- **제주도의 신선함과 프리미엄 품질 강조**
- **명절 선물에 적합한 고급스러움**

### 카피라이팅 예시

```
✅ "당일 수확한 신선한 제주 감귤을 당신의 식탁으로"
✅ "100% 제주산, 프리미엄 선물세트"
✅ "소중한 분께 전하는 제주의 마음"

❌ "저렴한 감귤 대량 판매"
❌ "할인 폭탄 이벤트"
```

---

## 체크리스트

- [ ] Tailwind CSS 및 Pretendard 폰트 설정
- [ ] 색상 토큰 (`colors.ts`) 생성
- [ ] shadcn/ui 컴포넌트 커스터마이징 (orange-600 테마)
- [ ] 반응형 그리드 테스트 (1/2/3/4열)
- [ ] 호버/포커스 상태 확인
- [ ] 다크 배경에서 텍스트 가독성 확인
- [ ] 접근성 검사 (Lighthouse, axe DevTools)

---

**마지막 업데이트:** 2025-12-11
**디자인 시스템 버전:** 1.0.0
