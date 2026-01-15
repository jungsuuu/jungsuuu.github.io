"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const themeContextCode = `'use client';

import { createContext, useState } from 'react';

// Context 생성
export const ThemeContext = createContext();

// Context Provider 컴포넌트
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}`;

const appCode = `'use client';

import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from './ThemeContext';
import Level1 from './Level1';

// App 컴포넌트 (Provider 내부에서 Context 사용)
function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div 
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        color: '#000000',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease'
      }}
    >
      <h2>useContext 예제 (최상위 App)</h2>
      <p>테마: Light/Dark를 Context로 관리합니다</p>
      <p style={{ fontSize: '14px', color: theme === 'dark' ? '#ccc' : '#666' }}>
        Level 4에서 "테마 변경" 버튼을 클릭하면 이 배경색이 토글됩니다!
      </p>
      <Level1 />
    </div>
  );
}

// Root 컴포넌트 (Provider로 App을 감쌈)
export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}`

const level1Code = `'use client';

import Level2 from './Level2';

// Depth 1 - 중간 컴포넌트
export default function Level1() {
  return (
    <div style={{ 
      padding: '15px', 
      margin: '10px 0',
      border: '2px solid #3b82f6',
      borderRadius: '4px',
      backgroundColor: '#eff6ff'
    }}>
      <h3>Level 1 Component</h3>
      <p>Depth: 1단계 | Context를 사용하지 않음</p>
      <p style={{ fontSize: '12px', color: '#666' }}>↓ Level2를 import 해서 렌더링</p>
      <Level2 />
    </div>
  );
}`;

const level2Code = `'use client';

import Level3 from './Level3';

// Depth 2 - 중간 컴포넌트
export default function Level2() {
  return (
    <div style={{ 
      padding: '15px', 
      margin: '10px 0',
      border: '2px solid #10b981',
      borderRadius: '4px',
      backgroundColor: '#f0fdf4'
    }}>
      <h3>Level 2 Component</h3>
      <p>Depth: 2단계 | Context를 사용하지 않음</p>
      <p style={{ fontSize: '12px', color: '#666' }}>↓ Level3를 import 해서 렌더링</p>
      <Level3 />
    </div>
  );
}`;

const level3Code = `'use client';

import Level4 from './Level4';

// Depth 3 - 중간 컴포넌트
export default function Level3() {
  return (
    <div style={{ 
      padding: '15px', 
      margin: '10px 0',
      border: '2px solid #f59e0b',
      borderRadius: '4px',
      backgroundColor: '#fffbeb'
    }}>
      <h3>Level 3 Component</h3>
      <p>Depth: 3단계 | Context를 사용하지 않음</p>
      <p style={{ fontSize: '12px', color: '#666' }}>↓ Level4를 import 해서 렌더링</p>
      <Level4 />
    </div>
  );
}`;

const level4Code = `'use client';

import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

// Context 타입 정의
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

// Depth 4 - Context를 사용하는 컴포넌트
export default function Level4() {
  const context = useContext(ThemeContext) as ThemeContextType | null;
  const { theme = 'light', toggleTheme = () => {} } = context || {};

  return (
    <div style={{ 
      padding: '15px', 
      margin: '10px 0',
      border: '2px solid #ef4444',
      borderRadius: '4px',
      backgroundColor: '#fef2f2'
    }}>
      <h3>Level 4 Component (Context 사용)</h3>
      <p>Depth: 4단계 | Context에서 값을 가져옴! 🎯</p>
      
      <div style={{
        padding: '12px',
        backgroundColor: '#f3f4f6',
        color: '#333',
        borderRadius: '4px',
        marginBottom: '12px',
        border: '1px solid #d1d5db'
      }}>
        <strong>현재 테마: {theme.toUpperCase()}</strong>
        <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
          ↑ 위의 App 배경색을 확인하세요!
        </p>
      </div>

      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 16px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        테마 변경
      </button>
    </div>
  );
}`;


export default function UseContextPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white">
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
          useContext() Hook
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          React의 useContext를 사용하여 깊은 Component Depth에서 Prop Drilling
          없이 값을 공유하는 방법을 배워봅시다.
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Code Editor */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white p-4 font-semibold">
              📝 코드
            </div>
            <SandpackProvider
              template="react-ts"
              files={{
                "/ThemeContext.tsx": themeContextCode,
                "/App.tsx": appCode,
                "/Level1.tsx": level1Code,
                "/Level2.tsx": level2Code,
                "/Level3.tsx": level3Code,
                "/Level4.tsx": level4Code,
              }}
              theme="light"
            >
              <SandpackLayout>
                <SandpackCodeEditor
                  style={{ height: "650px" }}
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
                "/ThemeContext.tsx": themeContextCode,
                "/App.tsx": appCode,
                "/Level1.tsx": level1Code,
                "/Level2.tsx": level2Code,
                "/Level3.tsx": level3Code,
                "/Level4.tsx": level4Code,
              }}
              theme="light"
            >
              <SandpackLayout>
                <SandpackPreview
                  style={{ height: "650px" }}
                  showOpenInCodeSandbox={false}
                />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </div>

        {/* CodeSandbox Link */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🔗 CodeSandbox에서 편집하기
          </h3>
          <p className="text-gray-600 mb-4">
            더 큰 화면에서 코드를 편집하고 싶다면 CodeSandbox에서 열어보세요.
          </p>
          <a
            href="https://codesandbox.io/p/sandbox/react-usecontext-example-y8jp4k"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            CodeSandbox에서 열기 →
          </a>
        </div>

        {/* Documentation */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📚 useContext 개념 설명
          </h2>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🎯 useContext란?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                useContext는 Context에 저장된 값을 컴포넌트에서 쉽게 사용할 수
                있게 해주는 Hook입니다. 깊은 Component 구조에서 props를 매번
                전달해야 하는 &quot;Prop Drilling&quot; 문제를 해결합니다.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                💡 Prop Drilling vs Context API
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded border border-red-200">
                  <p className="font-semibold text-red-900 mb-2">
                    ❌ Prop Drilling
                  </p>
                  <p className="text-sm text-red-700">
                    App → Level1 → Level2 → Level3 → Level4
                    <br />
                    모든 레벨을 거쳐 props를 전달해야 함
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">
                    ✅ Context API
                  </p>
                  <p className="text-sm text-green-700">
                    Provider에서 감싸고 useContext로 바로 접근
                    <br />
                    중간 컴포넌트를 거칠 필요 없음
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                🔧 기본 사용법
              </h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto space-y-3">
                <div>
                  <p className="text-blue-400">// 1. Context 생성</p>
                  <p>const MyContext = createContext();</p>
                </div>
                <div>
                  <p className="text-blue-400">// 2. Provider로 감싸기</p>
                  <p>&lt;MyContext.Provider value={"{data}"}&gt;</p>
                  <p> {"{children}"}</p>
                  <p>&lt;/MyContext.Provider&gt;</p>
                </div>
                <div>
                  <p className="text-blue-400">// 3. Context 값 사용</p>
                  <p>const data = useContext(MyContext);</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                ✨ 주요 사용 사례
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>테마 설정 (Light/Dark Mode)</li>
                <li>사용자 인증 정보</li>
                <li>다국어 지원 (i18n)</li>
                <li>전역 상태 관리</li>
                <li>UI 설정값 (폰트 사이즈, 색상 등)</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                ⚠️ 주의사항
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>
                  Context 값이 변경되면 Consumer 컴포넌트들이 모두 리렌더링됨
                </li>
                <li>성능 최적화가 필요한 경우 useMemo를 함께 사용</li>
                <li>너무 많은 값을 하나의 Context에 저장하지 않기</li>
                <li>복잡한 상태 관리는 Redux, Zustand 등의 라이브러리 고려</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={4} />      </div>
    </div>
  );
}