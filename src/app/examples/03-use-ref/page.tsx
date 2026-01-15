"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const useRefCss = `* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
}

h2 {
  margin: 0 0 15px 0;
}

p {
  margin-bottom: 15px;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  margin-right: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  width: 250px;
}

button {
  padding: 10px 16px;
  margin-right: 8px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-primary {
  background-color: #3b82f6;
}

.btn-danger {
  background-color: #ef4444;
}`;

const useRefCode = `import { useRef } from 'react';
import './App.css';

export default function RefExample() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    inputRef.current.value = '';
  };

  return (
    <div className="container">
      <h2>useRef - Input Focus 예제</h2>
      
      <p>
        useRef를 사용하여 DOM 요소에 직접 접근하고 포커스를 제어합니다.
      </p>

      <input
        ref={inputRef}
        type="text"
        placeholder="텍스트를 입력하세요"
      />

      <button className="btn-primary" onClick={handleFocus}>
        포커스
      </button>

      <button className="btn-danger" onClick={handleClear}>
        초기화
      </button>
    </div>
  );
}`;

export default function UseRefPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
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
          useRef() Hook
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          React의 useRef Hook을 사용하여 DOM 요소에 직접 접근하고, 리렌더링되지
          않는 값을 저장하는 방법을 배워봅시다.
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
                "/App.tsx": useRefCode,
                "/App.css": useRefCss,
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
                "/App.tsx": useRefCode,
                "/App.css": useRefCss,
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
            📚 useRef 개념 설명
          </h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🎯 useRef란?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                useRef는 DOM 요소에 직접 접근하거나 컴포넌트가 리렌더링되지
                않으면서 값을 저장해야 할 때 사용합니다. useState와 다르게 값이
                변경되어도 컴포넌트를 리렌더링하지 않습니다.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                ✨ 주요 사용 사례
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  텍스트 입력값이나 비디오 제어처럼 DOM 요소에 접근이 필요할 때
                </li>
                <li>
                  타이머나 인터벌 ID처럼 리렌더링되지 않아야 하는 값을 저장할 때
                </li>
                <li>이전 props나 state 값을 비교하고 싶을 때</li>
                <li>외부 라이브러리(예: D3.js)와 통합할 때</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                💡 useState vs useRef
              </h3>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <p className="font-semibold text-gray-800 mb-2">useState</p>
                <ul className="list-disc list-inside text-gray-600 text-sm mb-4">
                  <li>값이 변경되면 컴포넌트가 리렌더링됨</li>
                  <li>새로운 값이 렌더링될 때마다 다시 생성됨</li>
                  <li>UI 업데이트가 필요한 경우 사용</li>
                </ul>

                <p className="font-semibold text-gray-800 mb-2">useRef</p>
                <ul className="list-disc list-inside text-gray-600 text-sm">
                  <li>값이 변경되어도 리렌더링되지 않음</li>
                  <li>컴포넌트 생명 주기 동안 동일한 객체 유지</li>
                  <li>DOM 접근이나 내부 값 저장이 필요한 경우 사용</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🔧 기본 문법
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
                {`const ref = useRef(initialValue);

// ref.current에 접근
ref.current  // 현재 값

// DOM 요소에 연결
<input ref={ref} />`}
              </div>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={3} />
      </div>
    </div>
  );
}