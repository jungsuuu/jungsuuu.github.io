"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const propsCss = `* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
}

h2, h3 {
  margin: 0 0 12px 0;
}

p {
  margin: 0 0 12px 0;
}

.user-card {
  padding: 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: #f9fafb;
  margin-bottom: 12px;
}

.user-card h3 {
  margin-top: 0;
}

.user-card p {
  margin: 8px 0;
}

.selected-info {
  padding: 12px;
  background-color: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 4px;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}`;

const propsCode = `import { useState } from 'react';
import './App.css';

// 자식 컴포넌트: Props를 받아서 표시
function UserCard({ name, age, email, onButtonClick }) {
  return (
    <div className="user-card">
      <h3>{name}</h3>
      <p><strong>나이:</strong> {age}세</p>
      <p><strong>이메일:</strong> {email}</p>
      <button onClick={() => onButtonClick(name)}>
        선택
      </button>
    </div>
  );
}

// 부모 컴포넌트: Props를 전달
export default function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: '김철수', age: 28, email: 'kim@example.com' },
    { id: 2, name: '이영희', age: 25, email: 'lee@example.com' },
    { id: 3, name: '박민준', age: 32, email: 'park@example.com' },
  ];

  return (
    <div className="container">
      <h2>Props 예제</h2>
      <p>부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달합니다.</p>

      <div className="selected-info">
        <strong>선택된 사용자:</strong> {selectedUser || '없음'}
      </div>

      <h3>사용자 목록</h3>
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          age={user.age}
          email={user.email}
          onButtonClick={setSelectedUser}
        />
      ))}
    </div>
  );
}`;

export default function PropsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <Link
          href="/examples"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <span className="mr-2">←</span>
          예제 목록으로 돌아가기
        </Link>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Props
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          React에서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 Props의
          기본 개념을 배워봅시다.
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4 font-semibold">
              📝 코드
            </div>
            <SandpackProvider
              template="react-ts"
              files={{
                "/App.tsx": propsCode,
                "/App.css": propsCss,
              }}
              theme="light"
            >
              <SandpackLayout>
                <SandpackCodeEditor
                  style={{ height: "600px" }}
                  showLineNumbers
                  showRunButton={false}
                />
              </SandpackLayout>
            </SandpackProvider>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4 font-semibold">
              👀 결과
            </div>
            <SandpackProvider
              template="react-ts"
              files={{
                "/App.tsx": propsCode,
                "/App.css": propsCss,
              }}
              theme="light"
            >
              <SandpackLayout>
                <SandpackPreview
                  style={{ height: "600px" }}
                  showOpenInCodeSandbox={false}
                />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 Props 개념 설명
          </h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🎯 Props란?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Props (Properties)는 부모 컴포넌트에서 자식 컴포넌트로 데이터를
                전달하는 방법입니다. 함수의 매개변수처럼 컴포넌트에 값을 전달할
                수 있으며, 자식 컴포넌트는 전달받은 Props를 읽기만 할 수
                있습니다 (읽기 전용).
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                ✨ Props의 특징
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  <strong>단방향 데이터 흐름:</strong> 부모에서 자식으로만 전달
                  가능
                </li>
                <li>
                  <strong>읽기 전용:</strong> 자식은 Props를 직접 수정할 수 없음
                </li>
                <li>
                  <strong>재사용성:</strong> 같은 컴포넌트를 다른 Props로 재사용
                  가능
                </li>
                <li>
                  <strong>함수 전달 가능:</strong> Props로 이벤트 핸들러 함수도
                  전달 가능
                </li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🔧 Props 사용 방법
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto space-y-3">
                <div>
                  <p className="text-blue-400">
                    // 자식 컴포넌트에서 Props 받기
                  </p>
                  <p>
                    function UserCard({"{ name, age, email }"}) {"{"}
                  </p>
                  <p className="ml-4">
                    return &lt;div&gt;{"{name}"}&lt;/div&gt;
                  </p>
                  <p>{"}"}</p>
                </div>
                <div>
                  <p className="text-blue-400">
                    // 부모 컴포넌트에서 Props 전달
                  </p>
                  <p>
                    &lt;UserCard name="홍길동" age={"{25}"}{" "}
                    email="hong@email.com" /&gt;
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                💡 Props vs State
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">Props</p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>✅ 부모에서 자식으로 전달</li>
                    <li>✅ 읽기 전용</li>
                    <li>✅ 변경 불가</li>
                    <li>✅ 여러 자식이 같은 Props 받을 수 있음</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded border border-purple-200">
                  <p className="font-semibold text-purple-900 mb-2">State</p>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>✅ 컴포넌트 내부에서 관리</li>
                    <li>✅ 읽기/쓰기 가능</li>
                    <li>✅ 변경 가능</li>
                    <li>✅ 변경되면 리렌더링</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🎓 학습 포인트
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Props는 부모의 상태를 자식에게 전달하는 방법</li>
                <li>Props를 통해 컴포넌트를 재사용 가능하게 만들 수 있음</li>
                <li>Props 값이 변경되면 자식 컴포넌트가 자동으로 리렌더링됨</li>
                <li>
                  callback 함수를 Props로 전달하면 자식에서 부모의 상태를
                  간접적으로 변경 가능
                </li>
              </ul>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={5} />
      </div>
    </div>
  );
}