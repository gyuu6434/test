import { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 제주감귤마켓",
  description: "제주감귤마켓 개인정보처리방침 안내",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* 헤더 */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">개인정보처리방침</h1>
          <p className="text-slate-500">시행일: 2024년 1월 1일</p>
        </div>

        <div className="space-y-10">
          <p className="text-slate-700 leading-relaxed">
            제주감귤마켓(이하 &quot;회사&quot;)은 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등
            관련 법령에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록
            다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          {/* 제1조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제1조 (개인정보의 수집 및 이용 목적)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
              용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li><strong>회원 가입 및 관리:</strong> 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정이용 방지, 가입의사 확인, 연령확인, 불만처리 등 민원처리, 고지사항 전달</li>
              <li><strong>재화 또는 서비스 제공:</strong> 물품배송, 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 요금결제 및 정산</li>
              <li><strong>마케팅 및 광고에 활용:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
            </ul>
          </section>

          {/* 제2조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제2조 (수집하는 개인정보의 항목)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">필수 수집 항목</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• 회원가입: 이름, 이메일주소, 비밀번호, 휴대전화번호</li>
                  <li>• 상품구매: 배송지 정보(수령인명, 주소, 연락처), 결제정보</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-3">선택 수집 항목</h3>
                <ul className="text-slate-600 space-y-2 text-sm">
                  <li>• 마케팅 수신 동의 시: 이메일, 휴대전화번호</li>
                </ul>
              </div>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-3">자동 수집 항목</h3>
              <p className="text-slate-600 text-sm">
                IP주소, 쿠키, 방문일시, 서비스 이용기록, 불량 이용 기록, 기기정보
              </p>
            </div>
          </section>

          {/* 제3조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제3조 (개인정보의 보유 및 이용기간)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은
              개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">보유 항목</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">보유 기간</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">근거 법령</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">회원 정보</td>
                    <td className="px-4 py-3">회원 탈퇴 시까지</td>
                    <td className="px-4 py-3">-</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="px-4 py-3">계약 또는 청약철회 기록</td>
                    <td className="px-4 py-3">5년</td>
                    <td className="px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">대금결제 및 재화 공급 기록</td>
                    <td className="px-4 py-3">5년</td>
                    <td className="px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="px-4 py-3">소비자 불만 또는 분쟁처리 기록</td>
                    <td className="px-4 py-3">3년</td>
                    <td className="px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">표시·광고에 관한 기록</td>
                    <td className="px-4 py-3">6개월</td>
                    <td className="px-4 py-3">전자상거래법</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3">웹사이트 방문기록</td>
                    <td className="px-4 py-3">3개월</td>
                    <td className="px-4 py-3">통신비밀보호법</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제4조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제4조 (개인정보의 제3자 제공)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 원칙적으로 이용자의 개인정보를 제1조에서 명시한 목적 범위 내에서 처리하며,
              이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다.
              단, 다음의 경우에는 개인정보를 제3자에게 제공할 수 있습니다.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>이용자가 사전에 제3자 제공에 동의한 경우</li>
              <li>법령 등에 의해 제공이 요구되는 경우</li>
              <li>서비스의 제공에 관한 계약의 이행을 위하여 필요한 개인정보로서 경제적/기술적인 사유로 통상의 동의를 받는 것이 현저히 곤란한 경우</li>
              <li>개인을 식별하기에 특정할 수 없는 상태로 가공하여 이용하는 경우</li>
            </ul>
          </section>

          {/* 제5조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제5조 (개인정보처리의 위탁)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 text-sm rounded-lg overflow-hidden">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">수탁업체</th>
                    <th className="border-b border-slate-200 px-4 py-3 text-left font-semibold text-slate-900">위탁업무 내용</th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-3">택배사 (CJ대한통운, 로젠택배 등)</td>
                    <td className="px-4 py-3">상품 배송</td>
                  </tr>
                  <tr className="border-b border-slate-100 bg-slate-50">
                    <td className="px-4 py-3">PG사 (토스페이먼츠, NHN KCP 등)</td>
                    <td className="px-4 py-3">결제 처리</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">클라우드 서비스 제공업체</td>
                    <td className="px-4 py-3">데이터 보관 및 서버 운영</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 제6조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제6조 (정보주체의 권리·의무 및 행사방법)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <span className="text-slate-700">개인정보 열람 요구</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <span className="text-slate-700">오류 등 정정 요구</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <span className="text-slate-700">삭제 요구</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                <span className="text-slate-700">처리정지 요구</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm">
              위 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며,
              회사는 이에 대해 지체없이 조치하겠습니다.
            </p>
          </section>

          {/* 제7조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제7조 (개인정보의 파기)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는
              지체없이 해당 개인정보를 파기합니다.
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
              <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
            </ul>
          </section>

          {/* 제8조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제8조 (개인정보의 안전성 확보조치)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">관리적 조치</h3>
                <p className="text-slate-600 text-sm">내부관리계획 수립·시행, 정기적 직원 교육</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">기술적 조치</h3>
                <p className="text-slate-600 text-sm">접근권한 관리, 접근통제시스템 설치, 암호화, 보안프로그램 설치</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">물리적 조치</h3>
                <p className="text-slate-600 text-sm">전산실, 자료보관실 등의 접근통제</p>
              </div>
            </div>
          </section>

          {/* 제9조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제9조 (쿠키의 설치·운영 및 거부)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는
              &apos;쿠키(cookie)&apos;를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의
              컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자의 PC 컴퓨터 내 하드디스크에 저장되기도 합니다.
            </p>
            <p className="text-slate-600">
              이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서, 이용자는 웹브라우저에서 옵션을
              설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의
              저장을 거부할 수도 있습니다.
            </p>
          </section>

          {/* 제10조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제10조 (개인정보 보호책임자)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의
              불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">개인정보 보호책임자</h3>
              <div className="space-y-2 text-slate-700">
                <p><span className="font-medium">성명:</span> 라핀</p>
                <p><span className="font-medium">직책:</span> 대표</p>
                <p><span className="font-medium">연락처:</span> privacy@jejucitrus.kr</p>
              </div>
            </div>
          </section>

          {/* 제11조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제11조 (권익침해 구제방법)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              개인정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회,
              한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-900">개인정보분쟁조정위원회</p>
                <p className="text-slate-600 text-sm">(국번없이) 1833-6972</p>
                <p className="text-orange-600 text-sm">www.kopico.go.kr</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-900">개인정보침해신고센터</p>
                <p className="text-slate-600 text-sm">(국번없이) 118</p>
                <p className="text-orange-600 text-sm">privacy.kisa.or.kr</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-900">대검찰청</p>
                <p className="text-slate-600 text-sm">(국번없이) 1301</p>
                <p className="text-orange-600 text-sm">www.spo.go.kr</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-medium text-slate-900">경찰청</p>
                <p className="text-slate-600 text-sm">(국번없이) 182</p>
                <p className="text-orange-600 text-sm">ecrm.cyber.go.kr</p>
              </div>
            </div>
          </section>

          {/* 제12조 */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 border-l-4 border-orange-500 pl-4">
              제12조 (개인정보처리방침 변경)
            </h2>
            <p className="text-slate-700 leading-relaxed">
              이 개인정보처리방침은 2024년 1월 1일부터 적용됩니다.
              이전의 개인정보처리방침은 아래에서 확인하실 수 있습니다.
            </p>
          </section>

          {/* 푸터 */}
          <div className="border-t border-slate-200 pt-8 mt-10">
            <p className="text-slate-500 text-sm">
              본 개인정보처리방침은 2024년 1월 1일부터 시행됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
