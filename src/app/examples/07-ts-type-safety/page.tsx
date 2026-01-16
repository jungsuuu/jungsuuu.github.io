"use client";

import { CodeBlock } from "@/src/components/CodeBlock";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import Link from "next/link";

export default function TypeSafetyPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
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
            TypeScript: 타입 안전성 (Type Safety)
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            정적 타입을 통해 컴파일 시점에 에러를 발견하고 더 안전한 코드를
            작성해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-blue-50 p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            타입 안전성이란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>TypeScript의 타입 안전성</strong>은 개발 시점에 타입
              오류를 감지하여 런타임 에러를 사전에 방지합니다. JavaScript처럼
              런타임에 에러가 발생하는 것이 아니라, IDE가 즉시 문제를
              지적해줍니다.
            </p>
            <p className="mt-4">
              <strong>주요 이점:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>존재하지 않는 속성 접근 방지</li>
              <li>잘못된 타입의 값 할당 방지</li>
              <li>IDE 자동완성 지원으로 개발 생산성 향상</li>
              <li>코드 리팩토링 시 안전성 보장</li>
              <li>배포 후 버그 발생 위험 감소</li>
            </ul>
          </div>
        </div>


        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ 타입 안전성의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>개발 시간 오류 감지</strong>: 런타임 전에 타입 오류
                발견
              </li>
              <li>
                • <strong>자동완성 지원</strong>: IDE가 정확한 자동완성 제공
              </li>
              <li>
                • <strong>코드 가독성</strong>: 타입이 명확해서 코드 이해 용이
              </li>
              <li>
                • <strong>리팩토링 안전성</strong>: 타입 체크로 안전한 변경
              </li>
              <li>
                • <strong>버그 감소</strong>: 타입 관련 버그 사전 방지
              </li>
              <li>
                • <strong>자동 문서화</strong>: 타입 정의 자체가 문서 역할
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>학습곡선</strong>: 초보자에게는 다소 어려울 수 있음
              </li>
              <li>
                • <strong>추가 설정</strong>: 컴파일 과정이 필요
              </li>
              <li>
                • <strong>타입 정의 시간</strong>: 초기 개발 속도 저하 가능
              </li>
              <li>
                • <strong>과도한 any 사용</strong>: any는 타입 안전성을 무효화
              </li>
              <li>
                • <strong>복잡한 타입</strong>: 고급 타입은 이해하기 어려움
              </li>
              <li>
                • <strong>라이브러리 호환성</strong>: 일부 라이브러리는 타입
                미지원
              </li>
            </ul>
          </div>
        </div>

        {/* ANY Type Danger */}
        <div className="rounded-lg bg-red-50 p-8 border border-red-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">⚠️ any 타입의 위험성</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🚨 any는 타입 체크를 무효화합니다
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ 위험한 코드: any 사용
const users: any[] = [];

// 컴파일 타임: 모두 통과 ✓
users.push("John");           // 문자열 추가
users.push({ name: 'Alice' }); // 객체 추가
users.push(123);              // 숫자 추가
users.push(null);             // null 추가
users.push(undefined);        // undefined 추가

// 런타임에서 에러 발생!
users.forEach(user => {
  console.log(user.name);    // ❌ Runtime Error!
  // 문자열에는 name 속성이 없음
  // 숫자에는 name 속성이 없음
  // null에는 속성이 없음
});

// ✅ 올바른 코드: 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [];

// 컴파일 타임: 오류 감지! ❌
users.push("John");           // Error: not assignable to User
users.push(123);              // Error: not assignable to User
users.push({ name: 'Alice' }); // Error: missing id and email
users.push(null);             // Error: not assignable to User

// 올바른 것만 추가 가능
users.push({
  id: 1,
  name: 'John',
  email: 'john@example.com'  // ✅ OK
});`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                💥 any로 인한 실제 버그
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ 실무 예제: API 응답 처리
async function fetchUsers() {
  const response = await fetch('/api/users');
  const data: any = await response.json();
  
  return data.users; // undefined일 수 있음
}

async function processUsers() {
  const users = await fetchUsers();
  
  // 런타임 에러!
  users.forEach(user => {
    console.log(user.name); // user가 undefined면 에러
    console.log(user.email.toLowerCase()); // email이 없으면 에러
  });
}

// ✅ 타입 안전한 코드
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  users: User[];
  total: number;
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  const data: ApiResponse = await response.json();
  
  return data.users; // 명확한 타입
}

async function processUsers() {
  const users = await fetchUsers(); // User[]로 보장
  
  // 안전한 접근
  users.forEach(user => {
    console.log(user.name); // ✅ string
    console.log(user.email.toLowerCase()); // ✅ 안전
  });
}`}
              />
            </div>
          </div>
        </div>

        {/* Practical Patterns */}
        <div className="rounded-lg bg-blue-50 p-8 border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            타입 안전성 패턴
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔌 API 응답 타입 정의
              </h4>
              <CodeBlock
                language="typescript"
                code={`// API 응답 구조 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}

// 도메인 모델 정의
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
}

// 사용할 때는 제네릭으로 명확하게
async function getUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  const result: ApiResponse<User> = await response.json();
  
  if (!result.success || !result.data) {
    throw new Error(result.error || 'Failed to fetch user');
  }
  
  return result.data; // User 타입 보장
}

// 사용
const user = await getUser(1);
console.log(user.name); // ✅ name은 string
console.log(user.role); // ✅ role은 'admin' | 'user' | 'guest'
console.log(user.invalid); // ❌ Error: 속성이 없음`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 컴포넌트 Props 검증
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ any Props - 타입 체크 불가
const Button = (props: any) => {
  return <button onClick={props.onClick}>{props.children}</button>;
};

// 런타임 에러 발생 가능
<Button onClick="not a function" children={123} />;

// ✅ 타입 정의된 Props
interface ButtonProps {
  onClick: () => void; // 함수만 가능
  children: React.ReactNode;
  disabled?: boolean;
  variant?: 'primary' | 'secondary'; // 특정 값만 가능
}

const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={\`btn btn-\${props.variant}\`}
    >
      {props.children}
    </button>
  );
};

// 컴파일 타임에 에러 감지
<Button onClick="not a function" />; // ❌ Error
<Button onClick={() => {}} children={123} />; // ❌ Error
<Button onClick={() => {}} variant="invalid" />; // ❌ Error

// 올바른 사용
<Button onClick={() => {}} children="Click me" variant="primary" />; // ✅ OK`}
              />
            </div>
          </div>
        </div>

        {/* Comparison Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            기초 패턴: any vs 타입 정의
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🏷️ 인터페이스 정의
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};

// ✅ 자동완성 지원
user.id;    // number
user.name;  // string
user.email; // string`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔍 타입 검증
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ 타입 미스매치 감지
user.id = "123";     // Error
user.age = 30;       // Error
user.email = true;   // Error

// ✅ 올바른 할당
user.id = 1;
user.name = 'Alice';
user.email = 'alice@example.com';`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📝 함수 타입 안전성
              </h4>
              <CodeBlock
                language="typescript"
                code={`const renderUser = (user: User): string => {
  return \`\${user.name} (\${user.email})\`;
};

// ✅ 올바른 호출
renderUser(user);

// ❌ 타입 오류 감지
renderUser("invalid");
renderUser({ name: 'John' });
renderUser(null);`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 배열 타입 안전성
              </h4>
              <CodeBlock
                language="typescript"
                code={`const users: User[] = [];

// ✅ 올바른 추가
users.push({
  id: 1,
  name: 'John',
  email: 'john@example.com'
});

// ❌ 타입 오류 감지
users.push("string");
users.push(123);
users.push({ name: 'Alice' });

// 안전한 반복
users.forEach(u => {
  console.log(u.name); // ✅ string
});`}
              />
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">실무 Best Practices</h2>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ 이렇게 하세요</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ <strong>명시적 타입 정의</strong>: 모든 변수와 함수에 타입 선언</li>
                  <li>✓ <strong>제네릭 활용</strong>: 재사용 가능한 타입 작성</li>
                  <li>✓ <strong>Union 타입</strong>: 유효한 값만 허용</li>
                  <li>✓ <strong>Type Guard</strong>: 런타임 타입 검증</li>
                  <li>✓ <strong>Readonly 사용</strong>: 불변성 보장</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">❌ 이렇게 하지 마세요</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✗ <strong>any 타입</strong>: 모든 타입 체크 무효화</li>
                  <li>✗ <strong>타입 단언 (as)</strong>: 컴파일러 무시하기</li>
                  <li>✗ <strong>타입 체크 생략</strong>: null/undefined 처리 부족</li>
                  <li>✗ <strong>복잡한 타입</strong>: 읽기 어려운 타입 정의</li>
                  <li>✗ <strong>일관성 부족</strong>: 타입 정의 규칙 부재</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={7} />
      </div>
    </div>
  );
}
