"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";

export default function UseStatePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/examples"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <span className="mr-2">←</span>
            예제 목록으로 돌아가기
          </Link>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            useState() 함수 예제
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            React의 가장 기본적인 Hook인 useState를 배워봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-blue-50 p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">useState란?</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>useState</strong>는 함수형 컴포넌트에서 상태(state)를
              관리할 수 있게 해주는 React Hook입니다.
            </p>
            <p>
              <code className="bg-white px-2 py-1 rounded">
                const [state, setState] = useState(initialValue)
              </code>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>state</strong>: 현재 상태값
              </li>
              <li>
                <strong>setState</strong>: 상태를 업데이트하는 함수
              </li>
              <li>
                <strong>initialValue</strong>: 초기 상태값
              </li>
            </ul>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 mb-12">
          <Link
            href="/examples/01-use-state/01-counter"
            className="group rounded-lg bg-white p-8 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              1️⃣ 카운터
            </h3>
            <p className="mt-3 text-gray-600">
              숫자 상태를 관리하여 증감 로직 구현하기
            </p>
          </Link>

          <Link
            href="/examples/01-use-state/02-input"
            className="group rounded-lg bg-white p-8 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              2️⃣ 입력값 관리
            </h3>
            <p className="mt-3 text-gray-600">
              문자열 상태로 입력 필드 제어하기
            </p>
          </Link>

          <Link
            href="/examples/01-use-state/03-toggle"
            className="group rounded-lg bg-white p-8 shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              3️⃣ 토글
            </h3>
            <p className="mt-3 text-gray-600">
              Boolean 상태로 UI 표시 제어하기
            </p>
          </Link>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ 장점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 간단하고 직관적인 API</li>
              <li>• 여러 상태를 독립적으로 관리</li>
              <li>• 자동 re-render</li>
              <li>• 클로저를 통한 안전한 상태 관리</li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 반드시 setter 함수로 상태 변경</li>
              <li>• 조건문 안에서 호출하면 안 됨</li>
              <li>• 렌더링 중에 setState 호출 주의</li>
              <li>• 이전 상태 기반 업데이트 권장</li>
            </ul>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={1} />
      </div>
    </div>
  );
}
