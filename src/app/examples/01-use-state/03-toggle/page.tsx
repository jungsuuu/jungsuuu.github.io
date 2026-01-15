"use client";

import Link from "next/link";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const toggleCss = `* {
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

button {
  padding: 8px 16px;
  margin-bottom: 12px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-toggle-hidden {
  background-color: #9ca3af;
}

.btn-toggle-visible {
  background-color: #10b981;
}

.hidden-content {
  background-color: #dbeafe;
  border: 2px solid #3b82f6;
  padding: 12px;
  border-radius: 4px;
  margin-top: 8px;
}

.hidden-content p {
  margin: 8px 0;
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

const toggleCode = `import { useState } from 'react';
import './App.css';

export default function ToggleExample() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container">
      <h1>토글 (Boolean 상태)</h1>
      
      <div className="section">
        <button 
          className={isVisible ? 'btn-toggle-visible' : 'btn-toggle-hidden'}
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? '✓ 숨기기' : '📖 보기'}
        </button>
        
        {isVisible && (
          <div className="hidden-content">
            <p>🎉 <strong>숨겨진 요소가 나타났습니다!</strong></p>
            <p>Boolean 상태값으로 요소를 동적으로 보여주거나 숨길 수 있습니다.</p>
            <p>현재 상태: {isVisible ? '표시중' : '숨김중'}</p>
          </div>
        )}
      </div>

      <div className="tips-section">
        <h3>💡 useState 사용 팁</h3>
        <ul>
          <li>✅ Boolean: isVisible 처럼 UI 표시 제어에 사용</li>
          <li>✅ 토글: !isVisible으로 true/false 전환</li>
          <li>✅ 조건부 렌더링: {'{isVisible && <div>...</div>}'} 패턴 사용</li>
          <li>✅ 상태 변경 시 컴포넌트가 자동으로 re-render됩니다</li>
        </ul>
      </div>
    </div>
  );
}`;

export default function TogglePage() {
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
            3️⃣ 토글 - Boolean 상태
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            useState를 사용하여 Boolean 상태를 관리하는 토글 예제입니다.
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
                "/App.tsx": toggleCode,
                "/App.css": toggleCss,
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
            <li>• <strong>Boolean 상태</strong>: true/false로 UI 표시 제어</li>
            <li>• <strong>토글 연산자</strong>: !isVisible으로 상태 반전</li>
            <li>• <strong>조건부 렌더링</strong>: {'{isVisible && <Element />}'} 패턴</li>
            <li>• <strong>동적 스타일</strong>: 상태에 따라 버튼 색상 변경</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
