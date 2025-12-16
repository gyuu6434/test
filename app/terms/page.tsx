import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 | 제주감귤마켓",
  description: "제주감귤마켓 서비스 이용약관",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* 헤더 */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">이용약관</h1>
          <p className="text-slate-500">시행일: 2024년 1월 1일</p>
        </div>

        <div className="space-y-10">
          {/* 제1장 총칙 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 pb-2 border-b-2 border-orange-500">제1장 총칙</h2>

            {/* 제1조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제1조 (목적)
              </h3>
              <p className="text-slate-700 leading-relaxed">
                이 약관은 제주감귤마켓(이하 &quot;회사&quot;)이 운영하는 인터넷 쇼핑몰(이하 &quot;몰&quot;)에서
                제공하는 인터넷 관련 서비스(이하 &quot;서비스&quot;)를 이용함에 있어 회사와 이용자의 권리·의무 및
                책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            {/* 제2조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제2조 (정의)
              </h3>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li><strong>&quot;몰&quot;</strong>이란 회사가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 거래할 수 있도록 설정한 가상의 영업장을 말합니다.</li>
                <li><strong>&quot;이용자&quot;</strong>란 &quot;몰&quot;에 접속하여 이 약관에 따라 &quot;몰&quot;이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li><strong>&quot;회원&quot;</strong>이란 &quot;몰&quot;에 회원등록을 한 자로서, 계속적으로 &quot;몰&quot;이 제공하는 서비스를 이용할 수 있는 자를 말합니다.</li>
                <li><strong>&quot;비회원&quot;</strong>이란 회원에 가입하지 않고 &quot;몰&quot;이 제공하는 서비스를 이용하는 자를 말합니다.</li>
              </ul>
            </section>

            {/* 제3조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제3조 (약관 등의 명시와 설명 및 개정)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;은 이 약관의 내용과 상호 및 대표자 성명, 영업소 소재지 주소, 전화번호, 모사전송번호, 전자우편주소, 사업자등록번호, 통신판매업신고번호, 개인정보보호책임자 등을 이용자가 쉽게 알 수 있도록 &quot;몰&quot;의 초기 서비스화면에 게시합니다.</li>
                <li>&quot;몰&quot;은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회·배송책임·환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다.</li>
                <li>&quot;몰&quot;은 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「전자문서 및 전자거래기본법」, 「전자금융거래법」, 「전자서명법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「소비자기본법」 등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</li>
              </ul>
            </section>
          </div>

          {/* 제2장 서비스 이용 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 pb-2 border-b-2 border-orange-500">제2장 서비스 이용</h2>

            {/* 제4조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제4조 (서비스의 제공 및 변경)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                &quot;몰&quot;은 다음과 같은 업무를 수행합니다.
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>재화 또는 용역에 대한 정보 제공 및 구매계약의 체결</li>
                <li>구매계약이 체결된 재화 또는 용역의 배송</li>
                <li>기타 &quot;몰&quot;이 정하는 업무</li>
              </ul>
            </section>

            {/* 제5조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제5조 (서비스의 중단)
              </h3>
              <p className="text-slate-700 leading-relaxed">
                &quot;몰&quot;은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는
                서비스의 제공을 일시적으로 중단할 수 있습니다. 이 경우 &quot;몰&quot;은 이용자에게 통지합니다.
              </p>
            </section>

            {/* 제6조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제6조 (회원가입)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>이용자는 &quot;몰&quot;이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</li>
                <li>&quot;몰&quot;은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.</li>
              </ul>
            </section>
          </div>

          {/* 제3장 구매계약 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 pb-2 border-b-2 border-orange-500">제3장 구매계약</h2>

            {/* 제7조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제7조 (구매신청)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                &quot;몰&quot; 이용자는 &quot;몰&quot;상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며,
                &quot;몰&quot;은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>재화 등의 검색 및 선택</li>
                <li>받는 분의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력</li>
                <li>약관내용, 청약철회권이 제한되는 서비스, 배송료·설치비 등의 비용부담과 관련한 내용에 대한 확인</li>
                <li>이 약관에 동의하고 위 확인사항을 거부하거나 확인하는 표시(예: 마우스 클릭)</li>
                <li>재화등의 구매신청 및 이에 관한 확인 또는 &quot;몰&quot;의 확인에 대한 동의</li>
                <li>결제방법의 선택</li>
              </ul>
            </section>

            {/* 제8조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제8조 (계약의 성립)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;은 제7조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다.
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>신청 내용에 허위, 기재누락, 오기가 있는 경우</li>
                    <li>미성년자가 담배, 주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우</li>
                    <li>기타 구매신청에 승낙하는 것이 &quot;몰&quot; 기술상 현저히 지장이 있다고 판단하는 경우</li>
                  </ul>
                </li>
                <li>&quot;몰&quot;의 승낙이 제12조제1항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다.</li>
              </ul>
            </section>

            {/* 제9조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제9조 (결제방법)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                &quot;몰&quot;에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-slate-700 font-medium">신용카드</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-slate-700 font-medium">실시간 계좌이체</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-slate-700 font-medium">무통장 입금</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-slate-700 font-medium">카카오페이</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-slate-700 font-medium">네이버페이</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-slate-700 font-medium">토스페이</span>
                </div>
              </div>
            </section>
          </div>

          {/* 제4장 배송 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 pb-2 border-b-2 border-orange-500">제4장 배송</h2>

            {/* 제10조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제10조 (배송)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;은 이용자와 재화 등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 7일 이내에 재화 등을 배송할 수 있도록 주문제작, 포장 등 기타의 필요한 조치를 취합니다.</li>
                <li>&quot;몰&quot;은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다.</li>
              </ul>
              <div className="bg-orange-50 p-5 rounded-xl border border-orange-200 mt-4">
                <h4 className="font-bold text-slate-900 mb-3">배송 안내</h4>
                <ul className="text-slate-700 space-y-2 text-sm">
                  <li>• <strong>배송 지역:</strong> 전국 (일부 도서산간 제외)</li>
                  <li>• <strong>배송 기간:</strong> 주문 후 2~3일 (제주도 직송)</li>
                  <li>• <strong>배송비:</strong> 50,000원 이상 무료배송 / 미만 시 3,000원</li>
                  <li>• <strong>배송 방법:</strong> 택배 (CJ대한통운, 로젠택배)</li>
                </ul>
              </div>
            </section>
          </div>

          {/* 제5장 교환/환불 규정 - 중요! */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 pb-2 border-b-2 border-orange-500">제5장 교환 및 환불</h2>

            {/* 제11조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제11조 (청약철회 등)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                &quot;몰&quot;과 재화등의 구매에 관한 계약을 체결한 이용자는 「전자상거래 등에서의 소비자보호에 관한 법률」
                제13조 제2항에 따른 계약내용에 관한 서면을 받은 날(그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진
                경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다)부터 7일 이내에는 청약의 철회를 할 수 있습니다.
              </p>

              {/* 교환/환불 규정 강조 박스 */}
              <div className="bg-orange-50 p-6 rounded-xl border-2 border-orange-300">
                <h4 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm">!</span>
                  교환/환불 규정 (신선식품 특별 조항)
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <h5 className="font-semibold text-green-700 mb-2">✓ 교환/환불 가능한 경우</h5>
                    <ul className="text-slate-600 space-y-1 text-sm">
                      <li>• 상품 수령 후 24시간 이내 품질 이상 발견 시 (사진 증빙 필요)</li>
                      <li>• 배송 중 파손, 변질된 경우</li>
                      <li>• 주문한 상품과 다른 상품이 배송된 경우</li>
                      <li>• 표시된 중량보다 현저히 부족한 경우 (10% 이상)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg border border-orange-200">
                    <h5 className="font-semibold text-red-700 mb-2">✗ 교환/환불 불가능한 경우</h5>
                    <ul className="text-slate-600 space-y-1 text-sm">
                      <li>• 상품 수령 후 24시간 경과 시</li>
                      <li>• 고객 부주의로 인한 상품 훼손</li>
                      <li>• 단순 변심에 의한 교환/환불 (신선식품 특성상)</li>
                      <li>• 상품 포장을 개봉하여 사용한 경우</li>
                      <li>• 냉장 보관 미흡으로 인한 변질</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 제12조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제12조 (환불 절차)
              </h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">1</div>
                  <h4 className="font-semibold text-slate-900 mb-1">문의 접수</h4>
                  <p className="text-slate-600 text-sm">고객센터 또는<br />카카오톡 문의</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">2</div>
                  <h4 className="font-semibold text-slate-900 mb-1">사진 증빙</h4>
                  <p className="text-slate-600 text-sm">문제 상품<br />사진 첨부</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">3</div>
                  <h4 className="font-semibold text-slate-900 mb-1">검토 및 승인</h4>
                  <p className="text-slate-600 text-sm">담당자 확인 후<br />처리 안내</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-lg font-bold mx-auto mb-3">4</div>
                  <h4 className="font-semibold text-slate-900 mb-1">환불 완료</h4>
                  <p className="text-slate-600 text-sm">승인 후 3영업일<br />이내 환불</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-4">
                <p className="text-slate-600 text-sm">
                  <strong>환불 방법:</strong> 결제 수단에 따라 환불 방법이 상이합니다.
                  신용카드 결제 시 카드사 승인 취소, 계좌이체 시 동일 계좌로 환불됩니다.
                </p>
              </div>
            </section>

            {/* 제13조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제13조 (청약철회 등의 효과)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;은 이용자로부터 재화 등을 반환받은 경우 3영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다.</li>
                <li>이 경우 &quot;몰&quot;이 이용자에게 재화등의 환급을 지연한 때에는 그 지연기간에 대하여 「전자상거래 등에서의 소비자보호에 관한 법률 시행령」제21조의2에서 정하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다.</li>
                <li>&quot;몰&quot;은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다.</li>
              </ul>
            </section>
          </div>

          {/* 제6장 기타 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 pb-2 border-b-2 border-orange-500">제6장 기타</h2>

            {/* 제14조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제14조 (개인정보보호)
              </h3>
              <p className="text-slate-700 leading-relaxed">
                &quot;몰&quot;은 이용자의 개인정보 수집 시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다.
                자세한 내용은 개인정보처리방침을 참고해 주시기 바랍니다.
              </p>
            </section>

            {/* 제15조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제15조 (회사의 의무)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화·용역을 제공하는데 최선을 다하여야 합니다.</li>
                <li>&quot;몰&quot;은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.</li>
                <li>&quot;몰&quot;은 상품이나 용역에 대하여 「표시·광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시·광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.</li>
              </ul>
            </section>

            {/* 제16조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제16조 (회원의 의무)
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                이용자는 다음 행위를 하여서는 안 됩니다.
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2">
                <li>신청 또는 변경시 허위 내용의 등록</li>
                <li>타인의 정보 도용</li>
                <li>&quot;몰&quot;에 게시된 정보의 변경</li>
                <li>&quot;몰&quot;이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>&quot;몰&quot; 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>&quot;몰&quot; 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              </ul>
            </section>

            {/* 제17조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제17조 (분쟁해결)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.</li>
                <li>&quot;몰&quot;은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다.</li>
                <li>&quot;몰&quot;과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다.</li>
              </ul>
            </section>

            {/* 제18조 */}
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
                제18조 (재판권 및 준거법)
              </h3>
              <ul className="list-decimal pl-6 text-slate-600 space-y-2">
                <li>&quot;몰&quot;과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.</li>
                <li>&quot;몰&quot;과 이용자 간에 제기된 전자상거래 소송에는 대한민국 법률을 적용합니다.</li>
              </ul>
            </section>
          </div>

          {/* 사업자 정보 */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-4 text-lg">사업자 정보</h3>
            <div className="grid gap-4 md:grid-cols-2 text-sm text-slate-600">
              <div className="space-y-2">
                <p><span className="font-medium text-slate-900">상호:</span> 제주감귤마켓</p>
                <p><span className="font-medium text-slate-900">대표:</span> 라핀</p>
                <p><span className="font-medium text-slate-900">사업자등록번호:</span> 000-00-00000</p>
                <p><span className="font-medium text-slate-900">통신판매업신고:</span> 제0000-제주-0000호</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium text-slate-900">주소:</span> 제주특별자치도 제주시 감귤로 123</p>
                <p><span className="font-medium text-slate-900">고객센터:</span> 1588-0000</p>
                <p><span className="font-medium text-slate-900">이메일:</span> support@jejucitrus.kr</p>
                <p><span className="font-medium text-slate-900">개인정보보호책임자:</span> 라핀</p>
              </div>
            </div>
          </div>

          {/* 푸터 */}
          <div className="border-t border-slate-200 pt-8 mt-10">
            <p className="text-slate-500 text-sm">
              본 이용약관은 2024년 1월 1일부터 시행됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
