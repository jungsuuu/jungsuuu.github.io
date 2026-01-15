import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Admin Console Demo
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Next.js 16 + React 19 + TypeScript 기반 관리자 콘솔 데모
            애플리케이션
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">Mock 백엔드</h3>
            <p className="mt-2 text-gray-600">
              메모리 기반 데이터베이스와 네트워크 지연(300-500ms) 시뮬레이션
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">
              Axios + Interceptors
            </h3>
            <p className="mt-2 text-gray-600">
              요청/응답 인터셉터를 통한 인증, 로깅, 에러 정규화
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">
              React Query 캐싱
            </h3>
            <p className="mt-2 text-gray-600">
              같은 조건의 요청은 캐시에서 재사용 (API 호출 최소화)
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">
              Zod + React Hook Form
            </h3>
            <p className="mt-2 text-gray-600">
              타입 안전 검증 (비밀번호 복잡도, 필드 매칭 등)
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">사용자 CRUD</h3>
            <p className="mt-2 text-gray-600">
              사용자 생성/조회/수정/삭제 + 역할 관리
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">감시 로그</h3>
            <p className="mt-2 text-gray-600">
              모든 데이터 변경(생성/수정/삭제) 이력 기록
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center space-x-4">
          <Link
            href="/admin"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Admin Console 열기
          </Link>
          <Link
            href="/examples"
            className="inline-block rounded-lg bg-gray-600 px-8 py-3 text-lg font-semibold text-white hover:bg-gray-700 transition-colors"
          >
            예제 페이지 가기
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 rounded-lg bg-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900">기술 스택</h2>
          <div className="mt-4 grid gap-4 grid-cols-2 md:grid-cols-3">
            <div>
              <p className="font-semibold text-gray-900">Next.js</p>
              <p className="text-sm text-gray-600">16.0.0</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">React</p>
              <p className="text-sm text-gray-600">19.2.0</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">TypeScript</p>
              <p className="text-sm text-gray-600">최신</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Axios</p>
              <p className="text-sm text-gray-600">최신</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">React Query</p>
              <p className="text-sm text-gray-600">@tanstack/react-query</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Zod</p>
              <p className="text-sm text-gray-600">스키마 검증</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">React Hook Form</p>
              <p className="text-sm text-gray-600">폼 상태 관리</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Tailwind CSS</p>
              <p className="text-sm text-gray-600">UI 스타일링</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
