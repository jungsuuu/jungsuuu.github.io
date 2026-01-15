"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function UnionTypesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-pink-50 to-white">
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
            TypeScript: Union 타입과 Type Guard
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Union 타입을 통해 여러 가능한 상태를 안전하게 표현하고 처리해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-pink-50 p-8 border border-pink-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Union 타입이란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Union 타입(Union Types)</strong>은 여러 가능한 타입 중
              하나가 될 수 있는 값을 표현합니다. 상태 관리, API 응답 처리,
              조건부 렌더링 등에서 모든 경우를 명확하게 정의하고 누락하지 않도록
              강제합니다.
            </p>
            <p className="mt-4">
              <strong>주요 특징:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>여러 가능한 타입을 명확히 표현</li>
              <li>각 타입에 따른 처리 강제 (Exhaustive checking)</li>
              <li>상태 기반 로직의 타입 안전성</li>
              <li>문자열 리터럴 타입으로 제약</li>
              <li>Discriminated Union 패턴</li>
            </ul>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ Union 타입의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>상태 명확화</strong>: 가능한 모든 상태를 명시
              </li>
              <li>
                • <strong>누락 방지</strong>: switch/if에서 모든 경우 처리 강제
              </li>
              <li>
                • <strong>타입 안전성</strong>: 각 상태에 맞는 데이터만 접근
              </li>
              <li>
                • <strong>코드 신뢰성</strong>: 런타임 예외 사전 방지
              </li>
              <li>
                • <strong>가독성</strong>: 코드 의도가 명확함
              </li>
              <li>
                • <strong>리팩토링</strong>: 상태 추가 시 빠르게 감지
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>복잡한 구조</strong>: 너무 많은 상태는 피하기
              </li>
              <li>
                • <strong>Discriminator 명확화</strong>: 구분 필드 명확히 할 것
              </li>
              <li>
                • <strong>default case</strong>: 모든 경우 처리 필수
              </li>
              <li>
                • <strong>타입 추론</strong>: 때로 명시적 타입 지정 필요
              </li>
              <li>
                • <strong>상태 설계</strong>: 상호 배타적이어야 함
              </li>
              <li>
                • <strong>과도한 제약</strong>: 유연성 vs 안전성 균형
              </li>
            </ul>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Union 타입 패턴
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❌ JavaScript 문제점
              </h4>
              <CodeBlock
                language="javascript"
                code={`// 어떤 타입인지 모음
const processResponse = (response) => {
  if (response.success) {
    // data가 배열? 객체? 숫자?
    console.log(response.data.length);
  } else {
    // error가 객체? 문자열?
    console.log(response.error.message);
  }
};

// 상태 관리 - 혼란스러움
let userState = 'loading';
let user = null;
let error = null;

// 어떤 상태일 때 어떤 값을 사용?
if (userState === 'success') {
  console.log(user?.name); // user가 있을까?
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ✅ Discriminated Union
              </h4>
              <CodeBlock
                language="typescript"
                code={`// 상태별로 명확한 구조
type ApiResponse = 
  | { 
      success: true; 
      data: string[];
    }
  | { 
      success: false; 
      error: { message: string; code: number };
    };

// 타입 안전성 확보!
const processResponse = (res: ApiResponse) => {
  if (res.success) {
    // res는 success: true인 경우만
    console.log(res.data.length); // ✅ 안전!
  } else {
    // res는 success: false인 경우만
    console.log(res.error.message); // ✅ 안전!
  }
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 상태 관리 Union
              </h4>
              <CodeBlock
                language="typescript"
                code={`// 각 상태별 다른 데이터
type UserState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; user: User }
  | { status: 'error'; error: string };

// 모든 경우를 처리해야 함!
function render(state: UserState) {
  switch (state.status) {
    case 'idle':
      return <button>로드</button>;
    case 'loading':
      return <div>로딩...</div>;
    case 'success':
      return <div>{state.user.name}</div>;
    case 'error':
      return <div>에러: {state.error}</div>;
    // ❌ case 빠뜨리면 에러!
  }
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🏷️ 리터럴 Union
              </h4>
              <CodeBlock
                language="typescript"
                code={`// 허용된 값만 명시
type LogLevel = 'error' | 'warn' | 'info' | 'debug';
type Status = 'pending' | 'approved' | 'rejected';
type Size = 'sm' | 'md' | 'lg' | 'xl';

function log(level: LogLevel, message: string) {
  // ❌ 잘못된 값은 컴파일 에러!
  log('trace', 'message');
  
  // ✅ 올바른 값만 사용
  log('error', 'Something went wrong');
  log('info', 'Operation completed');
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🪝 React async 상태
              </h4>
              <CodeBlock
                language="typescript"
                code={`import { useState } from 'react';

type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

const UserCard = ({ userId }: Props) => {
  const [state, setState] = 
    useState<AsyncState<User>>({ status: 'idle' });

  switch (state.status) {
    case 'idle':
      return <button onClick={loadUser}>로드</button>;
    case 'loading':
      return <Spinner />;
    case 'success':
      return <User user={state.data} />;
    case 'error':
      return <Error error={state.error} />;
  }
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔒 Type Guard
              </h4>
              <CodeBlock
                language="typescript"
                code={`type Result<T> = 
  | { ok: true; value: T }
  | { ok: false; error: string };

// Type Predicate
function isSuccess<T>(
  result: Result<T>
): result is { ok: true; value: T } {
  return result.ok === true;
}

// 사용
function handleResult(result: Result<string>) {
  if (isSuccess(result)) {
    // result.value 접근 가능!
    console.log(result.value.length);
  } else {
    // result.error 접근 가능!
    console.log(result.error);
  }
}`}
              />
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">모범 사례</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">✅ Do</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 명확한 Discriminator</li>
                <li>✓ 상호 배타적 상태</li>
                <li>✓ switch 사용 권장</li>
                <li>✓ never 타입 활용</li>
                <li>✓ 문서화</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ 과도한 상태</li>
                <li>✗ 중복 상태</li>
                <li>✗ default 무시</li>
                <li>✗ 타입 단언 (!)</li>
                <li>✗ any 타입</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>📌 never로 검증</li>
                <li>📌 exhaustive check</li>
                <li>📌 공통 필드 활용</li>
                <li>📌 readonly로 불변</li>
                <li>📌 테스트로 확인</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <div className="mt-16 rounded-lg bg-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 예제</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/examples/09-ts-generics"
              className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-blue-600">
                → TypeScript Generics
              </p>
              <p className="text-sm text-gray-600 mt-1">제네릭 활용</p>
            </Link>
            <Link
              href="/examples/10-ts-null-safety"
              className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-blue-600">
                → Null/Undefined Safety
              </p>
              <p className="text-sm text-gray-600 mt-1">안전한 null 처리</p>
            </Link>
            <Link
              href="/examples/06-react-in-typescript"
              className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-blue-600">
                → React + TypeScript
              </p>
              <p className="text-sm text-gray-600 mt-1">실전 활용</p>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={11} />
      </div>
    </div>
  );
}