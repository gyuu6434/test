import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "제주감귤마켓 - 프리미엄 제주 감귤 선물세트",
  description: "제주도 직송 신선한 감귤, 한라봉, 천혜향 선물세트. 명절 선물로 최적화된 프리미엄 제품.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased" style={{ fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
