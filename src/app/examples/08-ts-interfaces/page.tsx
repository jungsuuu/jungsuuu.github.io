"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function InterfacesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 to-white">
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
            TypeScript: 인터페이스 (Interfaces)
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            인터페이스를 통해 객체의 구조를 명확하게 정의하고 타입 안전성을
            보장해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-indigo-50 p-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            인터페이스란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>인터페이스(Interface)</strong>는 TypeScript에서 객체의
              구조를 정의하는 방법입니다. 어떤 속성들이 필수인지, 선택인지, 어떤
              타입인지를 명확하게 지정하여 코드의 안전성과 가독성을 높입니다.
            </p>
            <p className="mt-4">
              <strong>주요 특징:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>객체의 구조를 명확하게 정의</li>
              <li>필수(required)와 선택(optional) 속성 구분</li>
              <li>메서드 시그니처 정의 가능</li>
              <li>인터페이스 확장(상속) 지원</li>
              <li>코드 자동완성 지원</li>
              <li>함수와 클래스에 계약(contract) 정의</li>
            </ul>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ 인터페이스의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>타입 안전성</strong>: 잘못된 구조의 객체 할당 방지
              </li>
              <li>
                • <strong>IDE 자동완성</strong>: 정확한 속성명과 타입 자동완성
              </li>
              <li>
                • <strong>코드 가독성</strong>: 객체 구조가 명확하게 표현됨
              </li>
              <li>
                • <strong>유지보수성</strong>: 변경 시 영향 범위 명확
              </li>
              <li>
                • <strong>재사용성</strong>: 여러 곳에서 재사용 가능
              </li>
              <li>
                • <strong>문서화</strong>: 타입 정의 자체가 문서 역할
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>런타임에 제거</strong>: JavaScript로 컴파일되면서 제거
              </li>
              <li>
                • <strong>과도한 정의</strong>: 불필요하게 복잡한 구조 지양
              </li>
              <li>
                • <strong>유니온 vs 인터페이스</strong>: 상황에 맞는 선택 필요
              </li>
              <li>
                • <strong>순환 참조</strong>: 상호 참조 시 주의
              </li>
              <li>
                • <strong>제네릭 활용</strong>: 재사용성을 높이려면 제네릭 활용
              </li>
              <li>
                • <strong>확장 설계</strong>: 향후 확장을 고려한 설계 필요
              </li>
            </ul>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            인터페이스 패턴
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🏷️ 기본 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  age: 30,
  isActive: true
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❓ 선택적 속성
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;  // 선택적
  bio?: string;    // 선택적
  avatar?: string; // 선택적
}

const profile: UserProfile = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
  // phone, bio, avatar는 생략 가능
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔄 인터페이스 확장
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: 'John',
  role: 'admin',
  permissions: ['read', 'write']
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📝 메서드 정의
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface Repository {
  find(id: number): User | null;
  findAll(): User[];
  save(user: User): void;
  delete(id: number): boolean;
}

class UserRepository implements Repository {
  find(id: number) { /* 구현 */ }
  findAll() { /* 구현 */ }
  save(user: User) { /* 구현 */ }
  delete(id: number) { /* 구현 */ }
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 Props 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick}>
      {props.label}
    </button>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔗 API 응답 타입
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

type UserResponse = ApiResponse<User>;
type UsersResponse = ApiResponse<User[]>;

const handleResponse = (
  response: UserResponse
) => {
  if (response.success) {
    console.log(response.data);
  }
};`}
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
                <li>✓ 명확한 이름 짓기</li>
                <li>✓ 필수/선택 구분</li>
                <li>✓ 재사용 가능하게 설계</li>
                <li>✓ 인터페이스 확장 활용</li>
                <li>✓ 제네릭으로 유연성</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ any 타입 사용</li>
                <li>✗ 과도하게 중첩</li>
                <li>✗ 모든 것에 인터페이스</li>
                <li>✗ 문서화 부족</li>
                <li>✗ 순환 참조 구조</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>📌 도메인별로 분류</li>
                <li>📌 단일 책임 원칙</li>
                <li>📌 확장성 고려</li>
                <li>📌 버전 관리</li>
                <li>📌 타입 유지보수</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interface vs Type
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📋 Interface</h4>
              <CodeBlock
                language="typescript"
                code={`// 확장 가능
interface User {
  id: number;
  name: string;
}

// 다중 확장
interface Admin extends User,
  Timestamps {
  role: 'admin';
}

// 병합 가능 (Declaration Merging)
interface Config {
  apiUrl: string;
}
interface Config {
  timeout: number;
}
// { apiUrl, timeout } 자동 병합`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🏷️ Type</h4>
              <CodeBlock
                language="typescript"
                code={`// 유니온 타입
type Status = 'pending' | 'done' | 'error';

// 조건부 타입
type IsString<T> = T extends string
  ? true
  : false;

// 더 유연한 조합
type Config = {
  apiUrl: string;
  timeout: number;
} & Timestamps;

// 교집합
type Admin = User & { role: 'admin' };`}
              />
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={8} />
      </div>
    </div>
  );
}
