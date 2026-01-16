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

const reactTypeScriptCode = `import React, { useState, ReactNode, FC } from 'react';

// 1️⃣ 인터페이스를 통한 타입 정의
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'danger' | 'success';
}

interface CardProps {
  title: string;
  user: User;
}

// 2️⃣ Props 타입이 정의된 컴포넌트
const CustomButton: FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
}) => {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
};

// 3️⃣ Props와 State에 타입 정의
const Card: FC<CardProps> = ({ title, user }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>👤 {user.name} ({user.email}) - {user.age}살</p>
    </div>
  );
};

// 4️⃣ 상태 관리에 타입 정의
interface FormData {
  username: string;
  email: string;
  age: number;
}

const UserForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    age: 0,
  });
  const [users, setUsers] = useState<User[]>([]);

  // 5️⃣ 이벤트 핸들러의 타입
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value,
    }));
  };

  const handleAddUser = (): void => {
    if (formData.username && formData.email && formData.age > 0) {
      const newUser: User = {
        id: users.length + 1,
        ...formData,
      };
      setUsers([...users, newUser]);
      setFormData({ username: '', email: '', age: 0 });
    }
  };

  const handleClear = (): void => {
    setFormData({ username: '', email: '', age: 0 });
    setUsers([]);
  };

  return (
    <div className="container">
      <h1>React + TypeScript 예제</h1>

      <div className="form-section">
        <h2>사용자 추가</h2>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          placeholder="이름"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일"
        />
        <input
          type="number"
          name="age"
          value={formData.age || ''}
          onChange={handleInputChange}
          placeholder="나이"
        />
        <div className="button-group">
          <CustomButton label="추가" onClick={handleAddUser} variant="success" />
          <CustomButton label="초기화" onClick={handleClear} variant="danger" />
        </div>
      </div>

      <div>
        <h2>추가된 사용자 ({users.length}명)</h2>
        {users.length === 0 ? (
          <p className="empty-text">아직 추가된 사용자가 없습니다.</p>
        ) : (
          users.map((user) => (
            <Card key={user.id} title={\`사용자 #\${user.id}\`} user={user} />
          ))
        )}
      </div>

      <div className="tips-section">
        <h3>💡 TypeScript 사용 팁</h3>
        <ul>
          <li>✅ Interface로 데이터 구조 정의</li>
          <li>✅ Props의 타입을 명확히 지정</li>
          <li>✅ State의 초기값으로 타입 추론</li>
          <li>✅ 이벤트 핸들러: React.ChangeEvent, React.MouseEvent 등 사용</li>
          <li>✅ 제네릭으로 재사용 가능한 컴포넌트 작성</li>
        </ul>
      </div>
    </div>
  );
};

export default UserForm;
`;
const reactCssCode = `
* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
}

h1, h2, h3 {
  margin: 0 0 12px 0;
}

.form-section {
  background: #f0f9ff;
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

input {
  padding: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.button-group {
  margin-top: 8px;
}

.btn {
  padding: 8px 16px;
  margin-right: 8px;
  margin-bottom: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary {
  background-color: #3b82f6;
}

.btn-danger {
  background-color: #ef4444;
}

.btn-success {
  background-color: #10b981;
}

.btn:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  background: #f9fafb;
}

.card p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.empty-text {
  color: #9ca3af;
}

.tips-section {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}

.tips-section ul {
  margin: 0;
  padding-left: 20px;
}

.tips-section li {
  margin-bottom: 8px;
}
`;

export default function ReactTypeScriptPage() {
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
            React + TypeScript 예제
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            TypeScript를 활용하여 React 애플리케이션을 더 안전하고 효율적으로
            개발해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-blue-50 p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            React + TypeScript란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>TypeScript</strong>는 JavaScript에 정적 타입을 추가한
              언어입니다. React와 함께 사용하면 컴포넌트의 Props, State, 이벤트
              핸들러 등에 명확한 타입을 지정하여 개발 시간에 오류를 발견할 수
              있습니다.
            </p>
            <p className="mt-4">
              <strong>주요 개념:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>
                <code className="bg-white px-2 py-1 rounded">Interface</code>:
                객체의 구조를 정의
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">Type</code>: 타입
                alias를 정의
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">Props의 타입</code>
                : 컴포넌트 입력값의 타입 정의
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">State의 타입</code>
                : useState에 제네릭으로 타입 지정
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">Event 타입</code>:
                React.ChangeEvent, React.MouseEvent 등
              </li>
              <li>
                <code className="bg-white px-2 py-1 rounded">
                  Generic (제네릭)
                </code>
                : 재사용 가능한 컴포넌트 작성
              </li>
            </ul>
          </div>
        </div>

        {/* TypeScript 타입 정의 섹션 */}
        <div className="mb-12 rounded-lg bg-blue-50 p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📋 TypeScript: 타입 정의 (한 번만 작성)
          </h2>
          <p className="text-gray-700 mb-6">
            TypeScript는 사용하기 전에 타입을 먼저 정의합니다. 하지만 이 정의는 **한 번만** 작성하면 이후 모든 곳에서 재사용됩니다.
          </p>

          <CodeBlock
            language="typescript"
            code={`// 📋 API 응답 타입 정의 (한 번만 정의)
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}`}
          />
        </div>

        {/* Axios Comparison */}
        <div className="mb-12 rounded-lg bg-indigo-50 p-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            실무: JavaScript vs TypeScript (API 호출)
          </h2>
          <p className="text-gray-700 mb-6">
            위에서 정의한 타입을 사용하여 API를 호출합니다. 실제 코드 로직은 거의 동일합니다!
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* JavaScript Version */}
            <div>
              <div className="bg-red-100 border border-red-300 rounded-lg px-3 py-2 mb-3">
                <h4 className="font-semibold text-red-900">❌ JavaScript</h4>
              </div>
              <CodeBlock
                language="javascript"
                code={`// 📡 API 호출 (타입 정의 없음)
async function fetchUser(id) {
  const response = await axios.get(
    \`/api/users/\${id}\`
  );
  return response.data;
}

// 사용
const user = await fetchUser(1);
console.log(user.name);
// 🚨 위험! user가 뭔지 모름

console.log(user.email.toLowerCase());
// 🚨 런타임 에러 가능!`}
              />
            </div>

            {/* TypeScript Version */}
            <div>
              <div className="bg-green-100 border border-green-300 rounded-lg px-3 py-2 mb-3">
                <h4 className="font-semibold text-green-900">✅ TypeScript</h4>
              </div>
              <CodeBlock
                language="typescript"
                code={`// 📡 API 호출 (위의 타입 재사용)
async function fetchUser(
  id: number
): Promise<User> {
  const response = await axios.get<ApiResponse<User>>(
    \`/api/users/\${id}\`
  );
  return response.data.data;
}

// 사용
const user = await fetchUser(1);
console.log(user.name);
// ✅ 안전! User 타입으로 보장

console.log(user.email.toLowerCase());
// ✅ 타입 보장, IDE 지원`}
              />
            </div>
          </div>
        </div>

        {/* Issues and Benefits */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-red-50 p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ JavaScript의 문제점
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>타입 불명확</strong>: response.data가 뭔지 모름
              </li>
              <li>
                <strong>런타임 에러</strong>: 존재하지 않는 속성 접근
              </li>
              <li>
                <strong>IDE 지원 부족</strong>: 자동완성 불가능
              </li>
              <li>
                <strong>리팩토링 위험</strong>: API 구조 변경 시 미감지
              </li>
              <li>
                <strong>배열/객체 혼동</strong>: 타입 불명확
              </li>
              <li>
                <strong>null/undefined 처리</strong>: 명시되지 않음
              </li>
              <li>
                <strong>디버깅 어려움</strong>: 런타임에야 발견
              </li>
              <li>
                <strong>팀 협업 어려움</strong>: API 구조를 문서로 설명 필요
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ TypeScript의 장점
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>타입 명확</strong>: User 타입으로 정확히 정의
              </li>
              <li>
                <strong>컴파일 타임 검사</strong>: 배포 전에 발견
              </li>
              <li>
                <strong>IDE 자동완성</strong>: user. 입력 시 모든 속성 표시
              </li>
              <li>
                <strong>안전한 리팩토링</strong>: 타입 변경 시 즉시 감지
              </li>
              <li>
                <strong>배열/객체 구분</strong>: User[] vs User 명확
              </li>
              <li>
                <strong>명시적 null 처리</strong>: User | null로 표현
              </li>
              <li>
                <strong>쉬운 디버깅</strong>: 타입 에러로 신속히 파악
              </li>
              <li>
                <strong>팀 협업 용이</strong>: 타입이 문서 역할
              </li>
            </ul>
          </div>
        </div>

        {/* Practical Example */}
        <div className="rounded-lg bg-blue-50 p-8 border border-blue-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🪝 React Hook으로 데이터 가져오기 (동일한 로직)
          </h2>
          <p className="text-gray-700 mb-6">
            Hook의 로직은 JavaScript와 TypeScript가 거의 동일합니다. 다만 타입만 추가됩니다.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❌ JavaScript Hook
              </h4>
              <CodeBlock
                language="javascript"
                code={`function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          \`/api/users/\${id}\`
        );
        setUser(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetch();
  }, [id]);

  return { user, loading, error };
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ✅ TypeScript Hook
              </h4>
              <CodeBlock
                language="typescript"
                code={`function useUser(id: number): {
  user: User | null;
  loading: boolean;
  error: Error | null;
} {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get<ApiResponse<User>>(
          \`/api/users/\${id}\`
        );
        setUser(res.data.data);
      } catch (err) {
        setError(err as Error);
      }
    };
    fetch();
  }, [id]);

  return { user, loading, error };
}`}
              />
            </div>
          </div>
        </div>

        {/* Hook 사용 비교 */}
        <div className="rounded-lg bg-yellow-50 p-8 border border-yellow-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            🎯 Hook 사용 방식 비교
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❌ JavaScript - 불확실함
              </h4>
              <CodeBlock
                language="javascript"
                code={`const { user, loading } = useUser(1);

{loading ? (
  <div>Loading...</div>
) : (
  <div>
    {/* 🚨 user.name이 있나? */}
    <p>{user?.name}</p>
    <p>{user?.email}</p>
    {/* 🚨 IDE가 도와줄 수 없음 */}
  </div>
)}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ✅ TypeScript - 명확함
              </h4>
              <CodeBlock
                language="typescript"
                code={`const { user, loading } = useUser(1);

{loading ? (
  <div>Loading...</div>
) : user ? (
  <div>
    {/* ✅ user.name이 확실함 */}
    <p>{user.name}</p>
    <p>{user.email}</p>
    {/* ✅ IDE 자동완성 지원 */}
  </div>
) : null}`}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ TypeScript 사용의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>개발 시간 오류 감지</strong>: 런타임 전에 타입 오류
                발견
              </li>
              <li>
                • <strong>자동완성 지원</strong>: IDE가 더 정확한 자동완성 제공
              </li>
              <li>
                • <strong>코드 가독성</strong>: Props/State의 구조가 명확함
              </li>
              <li>
                • <strong>리팩토링 안전성</strong>: 타입 체크로 안전한 변경
              </li>
              <li>
                • <strong>자동 문서화</strong>: 타입 정의 자체가 문서 역할
              </li>
              <li>
                • <strong>버그 감소</strong>: 타입 관련 버그 사전 방지
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항 및 학습곡선
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
                • <strong>라이브러리 호환성</strong>: 일부 라이브러리는 타입
                지원 없음
              </li>
              <li>
                • <strong>복잡한 타입</strong>: 고급 타입은 복잡할 수 있음
              </li>
              <li>
                • <strong>Any 남용 금지</strong>: any 사용은 타입 안전성 저하
              </li>
            </ul>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            자주 사용하는 패턴
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 Props 타입 정의
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface Props {
  label: string;
  value?: number;
  onChange?: (val: number) => void;
}

const MyComponent: FC<Props> = ({ label, value }) => {
  return <div>{label}: {value}</div>;
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 State 타입 정의
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
}

const [users, setUsers] = 
  useState<User[]>([]);`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🖱️ Event 핸들러 타입
              </h4>
              <CodeBlock
                language="typescript"
                code={`const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  console.log(e.target.value);
};

const handleClick = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  console.log('clicked');
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔄 제네릭 (Generics)
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const [response, setResponse] = 
  useState<ApiResponse<User> | null>(null);`}
              />
            </div>
          </div>
        </div>

        {/* 타입 정의 비교 */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interface vs Type
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📝 Interface</h4>
              <CodeBlock
                language="typescript"
                code={`// 확장 가능
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  role: 'admin';
}

// 병합 가능
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
};`}
              />
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={6} />
      </div>
    </div>
  );
}
