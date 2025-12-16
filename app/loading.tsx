export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100">
      <div className="flex flex-col items-center gap-6">
        {/* 빙글빙글 도는 감귤 아이콘 */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
          <span className="absolute inset-0 flex items-center justify-center text-2xl">
            🍊
          </span>
        </div>

        {/* 로딩 텍스트 */}
        <p className="text-lg font-medium text-slate-700">
          맛있는 감귤 가져오는 중...
        </p>
      </div>
    </div>
  );
}
