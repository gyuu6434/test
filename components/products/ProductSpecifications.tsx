import { Product } from '@/lib/types/product';

interface ProductSpecificationsProps {
  product: Product;
}

// 기본 스펙 값
const defaultSpecifications = {
  origin: '제주도',
  harvest: '11월 - 2월',
  sweetness: 8,
  quantity: '약 30-40개',
  packaging: '고급 선물 박스',
};

export default function ProductSpecifications({ product }: ProductSpecificationsProps) {
  // specifications가 없을 경우 기본값 사용
  const specifications = product.specifications || defaultSpecifications;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">상품 상세 정보</h2>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody className="divide-y">
            <tr>
              <th className="bg-slate-50 px-6 py-4 text-left font-semibold text-slate-900 w-1/3">
                원산지
              </th>
              <td className="px-6 py-4 text-slate-700">{specifications.origin || '제주도'}</td>
            </tr>
            <tr>
              <th className="bg-slate-50 px-6 py-4 text-left font-semibold text-slate-900">
                중량
              </th>
              <td className="px-6 py-4 text-slate-700">{product.weight}</td>
            </tr>
            <tr>
              <th className="bg-slate-50 px-6 py-4 text-left font-semibold text-slate-900">
                개수
              </th>
              <td className="px-6 py-4 text-slate-700">{specifications.quantity || '-'}</td>
            </tr>
            <tr>
              <th className="bg-slate-50 px-6 py-4 text-left font-semibold text-slate-900">
                수확시기
              </th>
              <td className="px-6 py-4 text-slate-700">{specifications.harvest || '-'}</td>
            </tr>
            <tr>
              <th className="bg-slate-50 px-6 py-4 text-left font-semibold text-slate-900">
                당도
              </th>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-8 h-3 rounded ${
                          index < (specifications.sweetness || 8)
                            ? 'bg-orange-600'
                            : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-700 font-medium">
                    {specifications.sweetness || 8}/10
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th className="bg-slate-50 px-6 py-4 text-left font-semibold text-slate-900">
                포장
              </th>
              <td className="px-6 py-4 text-slate-700">{specifications.packaging || '선물 박스'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="space-y-4 bg-slate-50 rounded-lg p-6">
        <h3 className="font-semibold text-lg text-slate-900">배송 안내</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>배송지역: 전국 (제주도 및 도서산간 지역 포함)</li>
          <li>배송비: 무료배송</li>
          <li>배송기간: 주문 후 2-3일 이내 (제주도에서 직송)</li>
          <li>배송방법: 신선 냉장 택배</li>
        </ul>
      </div>

      <div className="space-y-4 bg-slate-50 rounded-lg p-6">
        <h3 className="font-semibold text-lg text-slate-900">교환/반품 안내</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>교환/반품 기간: 상품 수령 후 7일 이내</li>
          <li>신선식품 특성상 단순 변심에 의한 반품은 불가능합니다</li>
          <li>배송 중 파손되거나 상한 상품은 100% 교환 또는 환불해드립니다</li>
          <li>교환/반품 문의: 고객센터 064-123-4567</li>
        </ul>
      </div>
    </div>
  );
}
