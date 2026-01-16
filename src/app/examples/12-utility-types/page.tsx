"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function UtilityTypesPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white">
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
            TypeScript: Utility Types
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            TypeScript가 제공하는 내장 Utility Types로 타입 조작을 쉽게
            해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-amber-50 p-8 border border-amber-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Utility Types란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Utility Types</strong>는 TypeScript에서 기본 제공하는
              제네릭 타입들로, 기존 타입을 기반으로 새로운 타입을 만들어냅니다.
              코드 중복을 줄이고 타입 조작을 간단하게 해줍니다.
            </p>
            <p className="mt-4">
              <strong>주요 특징:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>코드 중복 제거</li>
              <li>타입 재사용성 향상</li>
              <li>선택적/필수 속성 변환</li>
              <li>함수 타입 추출</li>
              <li>조건부 타입 처리</li>
            </ul>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ Utility Types의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>DRY 원칙</strong>: 타입 정의 중복 제거
              </li>
              <li>
                • <strong>유지보수성</strong>: 변경 시 한 곳에서만 수정
              </li>
              <li>
                • <strong>타입 안전성</strong>: 컴파일 시점에 검증
              </li>
              <li>
                • <strong>가독성</strong>: 의도 명확한 타입명
              </li>
              <li>
                • <strong>효율성</strong>: 빠른 타입 변환
              </li>
              <li>
                • <strong>패턴화</strong>: 일관된 타입 구조
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>복잡한 타입</strong>: 과도하게 중첩하지 말기
              </li>
              <li>
                • <strong>가독성</strong>: 타입 별칭으로 명확히 하기
              </li>
              <li>
                • <strong>런타임 오버헤드</strong>: 타입은 컴파일 후 제거됨
              </li>
              <li>
                • <strong>IDE 지원</strong>: 복잡한 타입은 IDE 성능 저하
              </li>
              <li>
                • <strong>문서화</strong>: 복잡한 유틸리티 타입 설명 필요
              </li>
              <li>
                • <strong>버전 호환성</strong>: 버전마다 추가되는 타입 확인
              </li>
            </ul>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            주요 Utility Types
          </h2>
          <div className="grid gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❓ Partial & Required
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
}

// 모든 속성을 선택적으로
type UserPartial = Partial<User>;
// { id?: number; name?: string; email?: string; }

const updateUser = (id: number, changes: UserPartial) => {
  // name만 업데이트하고 싶을 때
};

updateUser(1, { name: 'John' }); // ✅ OK

// 모든 속성을 필수로
type UserRequired = Required<User>;
// id, name, email 모두 필수

// 선택적 속성이 있는 경우
interface UserProfile {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

type UserProfileRequired = Required<UserProfile>;
// email, phone도 필수가 됨`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🔒 Readonly</h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
}

// 모든 속성을 읽기 전용으로
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 1,
  name: 'Alice'
};

// ❌ 수정 불가능
user.name = 'Bob'; // Error!

// 개별 속성도 readonly 가능
interface Config {
  readonly apiUrl: string;
  readonly timeout: number;
}

const config: Config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// ❌ 수정 불가능
config.timeout = 3000; // Error!`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 Pick & Omit
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// 특정 속성만 선택
type UserProfile = Pick<User, 'id' | 'name' | 'email'>;
// { id: number; name: string; email: string; }

// API 응답 (password 제외)
const getUserProfile = (): UserProfile => {
  return {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com'
  };
};

// 특정 속성 제외
type UserPublic = Omit<User, 'password'>;
// { id: number; name: string; email: string; phone?: string; }

// API 응답 (password 제외)
const getUser = (): UserPublic => ({
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
});`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📋 Record</h4>
              <CodeBlock
                language="typescript"
                code={`// 상태별 메시지 매핑
type Status = 'pending' | 'success' | 'error';

const statusMessages: Record<Status, string> = {
  pending: '처리 중...',
  success: '완료되었습니다',
  error: '오류가 발생했습니다'
};

// 역할별 권한 설정
type Role = 'admin' | 'user' | 'guest';

interface Permissions {
  read: boolean;
  write: boolean;
  delete: boolean;
}

const rolePermissions: Record<Role, Permissions> = {
  admin: { read: true, write: true, delete: true },
  user: { read: true, write: true, delete: false },
  guest: { read: true, write: false, delete: false }
};

// 동적 객체 타입
const userMap: Record<string, number> = {
  'alice': 25,
  'bob': 30,
  'charlie': 35
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔄 Exclude & Extract
              </h4>
              <CodeBlock
                language="typescript"
                code={`// Union 타입에서 특정 타입 제외
type Status = 'pending' | 'success' | 'error' | 'idle';

type ErrorStatus = Exclude<Status, 'success' | 'pending'>;
// 'error' | 'idle'

const handleError = (status: ErrorStatus) => {
  // status는 'error' | 'idle'만 가능
};

// Union 타입에서 특정 타입 추출
type SuccessStatus = Extract<Status, 'success' | 'pending'>;
// 'success' | 'pending'

// 함수 타입에서 원하는 타입만
type FetchResult = string | number | boolean;

type StringResult = Extract<FetchResult, string>;
// string

type NonBoolResult = Exclude<FetchResult, boolean>;
// string | number`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                💼 함수 타입 추출
              </h4>
              <CodeBlock
                language="typescript"
                code={`// 함수 정의
function getUserById(id: number, name: string): { id: number; name: string } {
  return { id, name };
}

// 함수의 파라미터 타입 추출
type GetUserParams = Parameters<typeof getUserById>;
// [id: number, name: string]

// 함수의 반환 타입 추출
type GetUserReturn = ReturnType<typeof getUserById>;
// { id: number; name: string }

// 클래스 생성자 파라미터
class User {
  constructor(name: string, email: string) {}
}

type UserConstructorParams = ConstructorParameters<typeof User>;
// [name: string, email: string]

// 클래스 인스턴스 타입
type UserInstance = InstanceType<typeof User>;
// User`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ⚡ NonNullable & Awaited
              </h4>
              <CodeBlock
                language="typescript"
                code={`// null과 undefined 제외
type Value = string | number | null | undefined;

type NonNullValue = NonNullable<Value>;
// string | number

// Promise 타입 풀기
type PromiseResult = Promise<string>;

type ResolvedValue = Awaited<PromiseResult>;
// string

// 중첩된 Promise도 풀기
type NestedPromise = Promise<Promise<number>>;

type FullyResolved = Awaited<NestedPromise>;
// number

// 실제 사용
const fetchUser = async (): Promise<User> => {
  return { id: 1, name: 'Alice' };
};

type FetchUserReturn = Awaited<ReturnType<typeof fetchUser>>;
// User`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔤 문자열 조작
              </h4>
              <CodeBlock
                language="typescript"
                code={`// 첫 글자 대문자
type Greeting = Capitalize<'hello'>;
// 'Hello'

// 첫 글자 소문자
type Lower = Uncapitalize<'Hello'>;
// 'hello'

// 모두 대문자
type Upper = Uppercase<'hello'>;
// 'HELLO'

// 모두 소문자
type Lowercase = Lowercase<'HELLO'>;
// 'hello'

// 실제 사용
type HttpMethod = 'get' | 'post' | 'put' | 'delete';

type HttpMethodUpper = Uppercase<HttpMethod>;
// 'GET' | 'POST' | 'PUT' | 'DELETE'

function request(method: HttpMethodUpper) {
  // method는 대문자로만 가능
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🎨 조합 활용</h4>
              <CodeBlock
                language="typescript"
                code={`interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// 생성 시 필요한 필드만
type CreateProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

// 수정 시 모든 필드 선택적
type UpdateProductInput = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

// API 응답 (민감 정보 제외)
type ProductResponse = Pick<Product, 'id' | 'name' | 'price' | 'stock'>;

// 읽기 전용 응답
type ReadonlyProduct = Readonly<Product>;

// 함수 타입
const createProduct = (input: CreateProductInput): Product => {
  return { ...input, id: 1, createdAt: new Date(), updatedAt: new Date() };
};

const updateProduct = (id: number, input: UpdateProductInput): Product => {
  return { ...defaultProduct, ...input, id };
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
                <li>✓ 적절한 유틸리티 선택</li>
                <li>✓ 타입 별칭으로 명명</li>
                <li>✓ 변수로 중복 제거</li>
                <li>✓ 문서화</li>
                <li>✓ 조합 활용</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ 과도하게 중첩</li>
                <li>✗ 복잡한 변환</li>
                <li>✗ inline 사용</li>
                <li>✗ 명시 누락</li>
                <li>✗ 이해 불가능한 타입</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>📌 기본 유틸리티부터 시작</li>
                <li>📌 조합으로 복잡 타입 만들기</li>
                <li>📌 제네릭과 함께 사용</li>
                <li>📌 조건부 타입 활용</li>
                <li>📌 테스트로 검증</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Utility Types 비교표 */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Utility Types 요약
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">타입</th>
                  <th className="px-4 py-2 text-left">설명</th>
                  <th className="px-4 py-2 text-left">예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                <tr>
                  <td className="px-4 py-2 font-mono">Partial&lt;T&gt;</td>
                  <td className="px-4 py-2">모든 속성 선택적</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Partial&lt;User&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Required&lt;T&gt;</td>
                  <td className="px-4 py-2">모든 속성 필수</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Required&lt;User&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Readonly&lt;T&gt;</td>
                  <td className="px-4 py-2">모든 속성 읽기만</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Readonly&lt;User&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Pick&lt;T, K&gt;</td>
                  <td className="px-4 py-2">특정 속성만 선택</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Pick&lt;User, 'id' | 'name'&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Omit&lt;T, K&gt;</td>
                  <td className="px-4 py-2">특정 속성 제외</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Omit&lt;User, 'password'&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Record&lt;K, T&gt;</td>
                  <td className="px-4 py-2">키-값 타입</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Record&lt;Status, string&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Exclude&lt;T, U&gt;</td>
                  <td className="px-4 py-2">유니온에서 제외</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Exclude&lt;Status, 'error'&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">Extract&lt;T, U&gt;</td>
                  <td className="px-4 py-2">유니온에서 추출</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    Extract&lt;Status, 'success'&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">NonNullable&lt;T&gt;</td>
                  <td className="px-4 py-2">null/undefined 제외</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    NonNullable&lt;string | null&gt;
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">ReturnType&lt;T&gt;</td>
                  <td className="px-4 py-2">함수 반환 타입</td>
                  <td className="px-4 py-2 font-mono text-xs">
                    ReturnType&lt;typeof func&gt;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={12} />
      </div>
    </div>
  );
}