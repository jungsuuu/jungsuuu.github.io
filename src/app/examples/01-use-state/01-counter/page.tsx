"use client";

import Link from "next/link";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const counterCss = `* {
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

.count-display {
  font-size: 24px;
  color: #3b82f6;
}

button {
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

.btn-reset {
  background-color: #6b7280;
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

const counterCode = `import { useState } from 'react';
import './App.css';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>카운터 (숫자 상태 관리)</h1>
      
      <div className="section">
        <p>현재 카운트: <strong className="count-display">{count}</strong></p>
        <button className="btn-primary" onClick={() => setCount(count + 1)}>
          ➕ 증가
        </button>
        <button className="btn-danger" onClick={() => setCount(count - 1)}>
          ➖ 감소
        </button>
        <button className="btn-reset" onClick={() => setCount(0)}>
          🔄 초기화
        </button>
      </div>

      <div className="tips-section">
        <h3>💡 useState 사용 팁</h3>
        <ul>
          <li>✅ 숫자: count 처럼 증감 로직에 사용</li>
          <li>✅ 상태 변경 시 컴포넌트가 자동으로 re-render됩니다</li>
        </ul>
      </div>
    </div>
  );
}`;

export default function CounterPage() {
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
            1️⃣ 카운터 - 숫자 상태 관리
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            useState를 사용하여 숫자 상태를 관리하는 카운터 예제입니다.
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
                "/App.tsx": counterCode,
                "/App.css": counterCss,
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
            <li>• <strong>useState(initialValue)</strong>: 초기값과 함께 상태 선언</li>
            <li>• <strong>상태 업데이트</strong>: setCount(newValue)로 상태 변경</li>
            <li>• <strong>자동 리렌더링</strong>: 상태 변경 시 컴포넌트 재렌더링</li>
            <li>• <strong>불변성</strong>: 이전 상태 기반 업데이트 권장</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
