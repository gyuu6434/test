import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">회사 정보</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>상호명: 제주감귤마켓</p>
              <p>대표자: 김제주</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>통신판매업신고: 제2024-제주-00001호</p>
              <p>주소: 제주특별자치도 제주시 감귤로 123</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">고객센터</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>전화: 064-123-4567</p>
              <p>이메일: help@jejumarket.com</p>
              <p>운영시간: 평일 09:00 - 18:00</p>
              <p>점심시간: 12:00 - 13:00</p>
              <p>주말 및 공휴일 휴무</p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-slate-900">이용안내</h3>
            <div className="space-y-2 text-sm text-slate-600">
              <p>배송안내: 제주도 직송, 2-3일 소요</p>
              <p>교환/반품: 수령 후 7일 이내</p>
              <p>신선식품 특성상 단순변심 반품 불가</p>
              <p>배송 중 파손 시 100% 보상</p>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>Copyright 2024 제주감귤마켓. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-orange-600 transition-colors">
              개인정보처리방침
            </Link>
            <Link href="/terms" className="hover:text-orange-600 transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
