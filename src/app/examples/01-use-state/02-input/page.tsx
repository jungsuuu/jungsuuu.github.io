"use client";

import Link from "next/link";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const inputCss = `* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
}

h1 {
  margin: 0 0 20px 0;
}

.section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

input {
  padding: 8px;
  margin-right: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}

.greeting {
  margin-top: 8px;
  color: #333;
}

.tips-section {
  background-color: #f3f4f6;
  padding: 16px;
  border-radius: 4px;
}

.tips-section h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

ul {
  margin: 0;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}`;

const inputCode = `import { useState } from 'react';
import './App.css';

export default function InputExample() {
  const [name, setName] = useState('');

  return (
    <div className="container">
      <h1>입력값 관리 (문자열 상태)</h1>
      
      <div className="section">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
        {name && <p className="greeting">안녕하세요, <strong>{name}</strong>님! 👋</p>}
      </div>

      <div className="tips-section">
        <h3>💡 useState 사용 팁</h3>
        <ul>
          <li>✅ 문자열: name 처럼 입력값 관리에 사용</li>
          <li>✅ onChange 이벤트로 입력값 실시간 추적</li>
          <li>✅ 상태 변경 시 컴포넌트가 자동으로 re-render됩니다</li>
        </ul>
      </div>
    </div>
  );
}`;

export default function InputPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/examples/01-use-state"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <span className="mr-2">←</span>
            useState 목록으로 돌아가기
          </Link>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            2️⃣ 입력값 관리 - 문자열 상태
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            useState를 사용하여 문자열 상태를 관리하는 입력값 예제입니다.
          </p>
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
                "/App.tsx": inputCode,
                "/App.css": inputCss,
              }}
            >
              <SandpackLayout>
                <SandpackCodeEditor
                  showLineNumbers={true}
                  showInlineErrors={true}
                  wrapContent={true}
                  style={{ height: 600 }}
                />
                <SandpackPreview style={{ height: 600 }} />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>

        {/* Key Points */}
        <div className="rounded-lg bg-green-50 p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            💡 핵심 개념
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>onChange 핸들러</strong>: 입력 필드의 변경을 감지</li>
            <li>• <strong>e.target.value</strong>: 입력 필드의 현재 값 가져오기</li>
            <li>• <strong>실시간 상태 추적</strong>: 입력할 때마다 상태 업데이트</li>
            <li>• <strong>조건부 렌더링</strong>: name이 있을 때만 인사말 표시</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
