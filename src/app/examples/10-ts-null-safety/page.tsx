"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function NullSafetyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-cyan-50 to-white">
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
            TypeScript: Null/Undefined 안전성
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            strictNullChecks를 활용하여 null과 undefined 관련 버그를 사전에
            방지해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-cyan-50 p-8 border border-cyan-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Null/Undefined 안전성이란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>TypeScript의 strictNullChecks</strong>는 null과 undefined
              타입을 엄격하게 관리하여 "Cannot read property of undefined" 같은
              런타임 에러를 개발 중에 미리 발견합니다.
            </p>
            <p className="mt-4">
              <strong>주요 특징:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>null과 undefined를 명시적으로 처리</li>
              <li>옵셔널 체이닝(?.) 지원</li>
              <li>Nullish Coalescing(??) 연산자</li>
              <li>명확한 null 체크 강제</li>
              <li>타입 가드를 통한 안전한 처리</li>
            </ul>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ Null Safety의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>런타임 에러 방지</strong>: 개발 중에 null 관련 버그
                발견
              </li>
              <li>
                • <strong>명시적 처리</strong>: null 가능성을 코드에서 명확히
                표현
              </li>
              <li>
                • <strong>옵셔널 체이닝</strong>: 깊은 객체 접근 안전성
              </li>
              <li>
                • <strong>Nullish Coalescing</strong>: 정확한 기본값 설정
              </li>
              <li>
                • <strong>타입 가드</strong>: 조건부 타입 좁히기
              </li>
              <li>
                • <strong>코드 신뢰성</strong>: null/undefined 처리 강제
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>엄격한 체크</strong>: 모든 null 가능성을 처리해야 함
              </li>
              <li>
                • <strong>초기 개발 속도</strong>: null 처리로 코드 증가
              </li>
              <li>
                • <strong>타입 단언 남용</strong>: ! 연산자 사용 피하기
              </li>
              <li>
                • <strong>라이브러리 호환성</strong>: 타입 정의 없는 라이브러리
                주의
              </li>
              <li>
                • <strong>옵셔널 vs undefined</strong>: 의도 명확히 하기
              </li>
              <li>
                • <strong>함수 반환값</strong>: null 가능성 명시 필요
              </li>
            </ul>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Null Safety 패턴
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❌ JavaScript 문제점
              </h4>
              <CodeBlock
                language="javascript"
                code={`// 런타임 에러 위험!
const user = fetchUser(); // null일 수도

// TypeError 발생
const email = user.email;

// 복잡한 null 체크
let phone;
if (user && user.profile && 
    user.profile.contact) {
  phone = user.profile.contact.phone;
} else {
  phone = 'No phone';
}

// falsy 값 문제
const age = user.age || 0; // age가 0이면 덮어씀!`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ✅ 옵셔널 체이닝
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  profile?: {
    contact?: {
      phone?: string;
    };
  };
}

const user: User | null = fetchUser();

// ✅ 옵셔널 체이닝 - 안전하게 접근
const email = user?.email; // string | undefined
const phone = user?.profile?.contact?.phone;
// string | undefined

// ✅ 옵셔널 메서드 호출
user?.printInfo();

// ✅ 옵셔널 배열 접근
const firstItem = array?.[0];`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ?? Nullish Coalescing
              </h4>
              <CodeBlock
                language="typescript"
                code={`const age = user?.age ?? 18;
// age가 undefined/null이면 18

// 0도 유효한 값
const count = user?.postCount ?? 0;
// count가 0이어도 0 유지!

// 비교: || 연산자 문제
const wrongAge = user?.age || 18;
// age가 0이면 18으로 대체됨 (버그!)

// 여러 값 체크
const nickname = 
  user?.nickname ?? 
  user?.name ?? 
  'Anonymous';`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🛡️ 타입 가드</h4>
              <CodeBlock
                language="typescript"
                code={`// null 체크
if (user !== null) {
  // 이 블록에서 user는 User 타입
  console.log(user.email); // 안전!
}

// 타입 좁히기 함수
function processUser(user: User | null): void {
  if (!user) {
    console.log('사용자 없음');
    return;
  }
  
  // 이 블록에서 user는 User 타입
  console.log(user.email);
}

// 타입 술어 (Type Predicate)
function isUser(value: any): value is User {
  return value && 
    typeof value.id === 'number' &&
    typeof value.name === 'string';
}

if (isUser(data)) {
  console.log(data.email); // 안전!
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ⚡ React에서 활용
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface UserCardProps {
  user: User | null;
}

const UserCard = ({ user }: UserCardProps) => {
  // ✅ null 체크 후 렌더링
  if (!user) {
    return <div>사용자를 찾을 수 없습니다</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>이메일: {user.email}</p>
      <p>나이: {user.age ?? '미공개'}</p>
      <p>전화: {
        user.profile?.contact?.phone ?? '미등록'
      }</p>
    </div>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🚫 피해야 할 패턴
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ Non-null assertion - 위험!
const email = user!.email; // 확실하지 않으면 금지

// ❌ any 사용
const data: any = fetchData();

// ❌ 명시적 타입 확인 없음
function getAge(user: User) {
  return user.age; // undefined 가능성 무시
}

// ✅ 명시적으로 undefined 처리
function getAge(user: User): number | undefined {
  return user.age;
}

function getAgeWithDefault(user: User): number {
  return user.age ?? 0;
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
                <li>✓ strictNullChecks 활성화</li>
                <li>✓ 옵셔널 체이닝 사용</li>
                <li>✓ ?? 연산자 활용</li>
                <li>✓ null 체크 함수화</li>
                <li>✓ 타입 가드 구현</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Non-null assertion (!)</li>
                <li>✗ any 타입</li>
                <li>✗ || 연산자로 기본값</li>
                <li>✗ null 체크 생략</li>
                <li>✗ 깊은 체인 without 체크</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>📌 isLoading 상태로 대체</li>
                <li>📌 기본값과 null 구분</li>
                <li>📌 함수 반환값 명시</li>
                <li>📌 초기값 설정 철저히</li>
                <li>📌 테스트로 edge case 확인</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <div className="mt-16 rounded-lg bg-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 예제</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/examples/08-ts-interfaces"
              className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-blue-600">
                → TypeScript Interfaces
              </p>
              <p className="text-sm text-gray-600 mt-1">타입 정의 기본</p>
            </Link>
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
              href="/examples/11-ts-union-types"
              className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
            >
              <p className="font-semibold text-blue-600">→ Union 타입</p>
              <p className="text-sm text-gray-600 mt-1">
                Union 타입과 Type Guard
              </p>
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={10} />
      </div>
    </div>
  );
}
