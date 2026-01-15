"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const typeSafetyCode = `import { useState } from 'react';

// ❌ JavaScript - 타입이 없어서 런타임 에러 발생 가능
const BadUserList = () => {
  const [users, setUsers] = useState([]);
  
  const renderUser = (user) => {
    // user.name이 없으면 undefined 에러!
    return <div>{user.name.toUpperCase()}</div>;
  };
  
  return <div>{users.map(renderUser)}</div>;
};

// ✅ TypeScript - 타입 안전성으로 에러를 사전에 방지
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const GoodUserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  
  const renderUser = (user: User) => {
    // IDE가 자동완성을 제공하고, 잘못된 속성은 에러!
    return <div>{user.name.toUpperCase()}</div>;
  };
  
  return <div>{users.map(renderUser)}</div>;
};

export default function Demo() {
  const [selectedTab, setSelectedTab] = useState('typescript');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>✅ TypeScript: 타입 안전성 (Type Safety)</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '16px', color: '#555' }}>
          TypeScript는 정적 타입을 제공하여 컴파일 시점에 에러를 발견합니다.
        </p>
      </div>

      <div style={{
        marginBottom: '20px',
        padding: '16px',
        backgroundColor: '#fef3c7',
        borderLeft: '4px solid #f59e0b',
        borderRadius: '4px'
      }}>
        <strong>📊 장점:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>존재하지 않는 속성 접근 방지</li>
          <li>잘못된 타입의 값 할당 방지</li>
          <li>IDE 자동완성 지원</li>
          <li>런타임 에러 사전 방지</li>
          <li>코드 리팩토링 시 안전성 보장</li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>예제 비교:</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#dc2626', marginBottom: '10px' }}>❌ JavaScript 문제점:</h3>
          <pre style={{
            backgroundColor: '#fee2e2',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            border: '1px solid #fca5a5'
          }}>
{<code style={{ fontSize: '14px', color: '#7f1d1d' }}>
{String.raw\`
const user = { id: 1 };

// 런타임에만 에러 발생!
console.log(user.name.toUpperCase()); 
// TypeError: Cannot read property 'toUpperCase' of undefined

// IDE가 경고하지 않음 - 개발 시 발견 불가
user.email = 123; // 이런 실수도 쉽게 발생
\`}
</code>}
          </pre>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#059669', marginBottom: '10px' }}>✅ TypeScript 해결책:</h3>
          <pre style={{
            backgroundColor: '#dcfce7',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            border: '1px solid #86efac'
          }}>
{<code style={{ fontSize: '14px', color: '#15803d' }}>
{String.raw\`
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = { id: 1 };

// ❌ 컴파일 에러! (IDE에서 즉시 표시)
console.log(user.name.toUpperCase());

// ❌ 타입 에러! (IDE에서 경고)
user.email = 123;

// ✅ 올바른 코드만 실행됨
const validUser: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com'
};
\`}
</code>}
          </pre>
        </div>
      </div>

      <div style={{
        backgroundColor: '#e0f2fe',
        padding: '16px',
        borderRadius: '4px',
        borderLeft: '4px solid #0284c7'
      }}>
        <strong>💡 핵심:</strong> TypeScript는 에러를 개발 시점에 발견하므로 배포 후 버그 발생 위험을 크게 줄입니다.
      </div>
    </div>
  );
}
`;

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

        {/* Live Playground */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Live Playground
          </h2>
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <SandpackProvider
              template="react-ts"
              files={{
                "/App.tsx": typeSafetyCode,
              }}
            >
              <SandpackLayout>
                <SandpackCodeEditor
                  showLineNumbers
                  wrapContent
                  style={{ height: "700px" }}
                />
                <SandpackPreview style={{ height: "700px" }} />
              </SandpackLayout>
            </SandpackProvider>
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

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            타입 안전성 패턴
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
  age: number;
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 30
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔍 속성 접근 검증
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ TypeScript 오류!
user.phone; // Property does not exist

// ✅ 올바른 속성 접근
user.email; // string
user.age;   // number

// ❌ 타입 불일치 오류!
user.age = "30"; // Type 'string' is not assignable to type 'number'`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📝 함수 파라미터 타입
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ JavaScript - 타입 불명확
const renderUser = (user) => {
  return user.name.toUpperCase();
};

// ✅ TypeScript - 명확한 타입
const renderUser = (user: User): string => {
  return user.name.toUpperCase();
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 배열 타입 안전성
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ any[] - 타입 미보호
const users: any[] = [];
users.push("string"); // 잘못된 타입 추가 가능

// ✅ User[] - 타입 보호
const users: User[] = [];
users.push({ id: 1, name: 'John' }); // 에러!
users.push({
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 30
}); // ✅ OK`}
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
                <li>✓ 명확한 타입 정의</li>
                <li>✓ 함수의 반환 타입 명시</li>
                <li>✓ 제네릭 활용</li>
                <li>✓ union 타입으로 유효한 값만 허용</li>
                <li>✓ readonly 키워드로 불변성</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ any 타입 남용</li>
                <li>✗ 타입 체크 없는 단언 (as)</li>
                <li>✗ unknown 타입 무시</li>
                <li>✗ null/undefined 처리 생략</li>
                <li>✗ 복잡한 타입 과용</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>📌 strict 모드 활성화</li>
                <li>📌 타입 추론 활용</li>
                <li>📌 유틸리티 타입 활용</li>
                <li>📌 타입 가드 구현</li>
                <li>📌 테스트로 검증</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={7} />
      </div>
    </div>
  );
}
