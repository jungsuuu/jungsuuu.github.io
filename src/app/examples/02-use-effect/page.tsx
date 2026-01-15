"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

const useEffectCode = `import { useState, useEffect } from 'react';

export default function EffectExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [windowWidth, setWindowWidth] = useState(0);

  // 📌 매번 렌더링될 때마다 실행
  useEffect(() => {
    console.log('렌더링됨! count 또는 name이 변경됨');
  });

  // 📌 컴포넌트 마운트 시에만 실행 (초기화)
  useEffect(() => {
    console.log('컴포넌트가 마운트되었습니다!');
    setWindowWidth(window.innerWidth);
    
    // 정리 함수 (cleanup)
    return () => {
      console.log('컴포넌트가 언마운트되었습니다!');
    };
  }, []);

  // 📌 count가 변경될 때만 실행
  useEffect(() => {
    document.title = \`Count: \${count}\`;
    console.log('count가 변경되었습니다:', count);
  }, [count]);

  // 📌 윈도우 리사이즈 이벤트 (정리 함수 포함)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // 정리 함수: 컴포넌트 언마운트나 effect 재실행 전에 호출
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>useEffect 예제</h1>

      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2>1️⃣ 의존성 배열 없음 (매번 실행)</h2>
        <p>상태가 변경될 때마다 실행됩니다.</p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          카운트 증가: {count}
        </button>
      </div>

      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2>2️⃣ 의존성 배열이 있음 ([count])</h2>
        <p>count가 변경될 때만 실행되고, 문서 제목이 변경됩니다.</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
          style={{
            padding: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            marginRight: '8px',
          }}
        />
        <p>이름을 입력해도 useEffect는 실행되지 않습니다 (count에만 의존)</p>
        <p>👉 브라우저 탭 제목을 확인해보세요! (Count: {count})</p>
      </div>

      <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
        <h2>3️⃣ 윈도우 리사이즈 감지 (정리 함수 포함)</h2>
        <p>윈도우 크기: <strong>{windowWidth}px</strong></p>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          브라우저 크기를 조절하면 리사이즈 이벤트가 감지됩니다.
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#f3f4f6',
        padding: '16px',
        borderRadius: '4px',
      }}>
        <h3>💡 useEffect 의존성 배열 정리</h3>
        <ul>
          <li>📌 <strong>없음</strong>: 매번 렌더링 후 실행</li>
          <li>📌 <strong>[]</strong>: 마운트 시에만 실행 (초기화)</li>
          <li>📌 <strong>[count]</strong>: count가 변경될 때만 실행</li>
          <li>📌 <strong>정리 함수</strong>: 이전 effect 정리 및 언마운트 시 호출</li>
        </ul>
      </div>
    </div>
  );
}`;

export default function UseEffectPage() {
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
            useEffect() 함수 예제
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            React의 Side Effect를 관리하는 Hook인 useEffect를 배워봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-blue-50 p-8 border border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            useEffect란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>useEffect</strong>는 함수형 컴포넌트에서 Side
              Effect(부작용)를 수행할 수 있게 해주는 React Hook입니다.
            </p>
            <p>
              Side Effect란{" "}
              <strong>API 호출, 구독, 타이머 설정, DOM 조작</strong> 등 렌더링
              외의 작업을 말합니다.
            </p>
            <p className="mt-4">
              <code className="bg-white px-2 py-1 rounded">
                useEffect(() =&gt; {"{}"}, [])
              </code>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>
                <strong>콜백 함수</strong>: 실행할 Side Effect 로직
              </li>
              <li>
                <strong>의존성 배열</strong>: effect가 실행되는 조건
              </li>
              <li>
                <strong>정리 함수</strong>: effect 정리 및 메모리 누수 방지
              </li>
            </ul>
          </div>
        </div>

        {/* Dependency Array Guide */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              의존성 배열
            </h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="pb-3 border-b border-green-200">
                <code className="bg-white px-1 rounded">
                  useEffect(() =&gt; {"{}"});
                </code>
                <p className="text-xs mt-1">
                  📍 의존성 없음 - 매번 렌더링 후 실행
                </p>
              </li>
              <li className="pb-3 border-b border-green-200">
                <code className="bg-white px-1 rounded">
                  useEffect(() =&gt; {"{}"}, []);
                </code>
                <p className="text-xs mt-1">📍 빈 배열 - 마운트 시에만 실행</p>
              </li>
              <li>
                <code className="bg-white px-1 rounded">
                  useEffect(() =&gt; {"{}"}, [count]);
                </code>
                <p className="text-xs mt-1">
                  📍 의존성 있음 - count 변경 시 실행
                </p>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              정리 함수 (Cleanup)
            </h3>
            <pre className="bg-white p-3 rounded text-xs overflow-x-auto">
              {`useEffect(() => {
  // effect 실행
  
  return () => {
    // 정리 함수
    // 이전 effect 제거
    // 메모리 누수 방지
  }
}, [])`}
            </pre>
            <p className="text-xs mt-2 text-gray-600">
              이벤트 리스너, 구독, 타이머 등을 정리합니다.
            </p>
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
                "/App.tsx": useEffectCode,
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

        {/* Common Use Cases */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-purple-50 p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ 자주 사용되는 경우
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• API 데이터 페칭</li>
              <li>• 타이머/인터벌 설정</li>
              <li>• 이벤트 리스너 등록</li>
              <li>• 로컬 스토리지 저장</li>
              <li>• 문서 제목 변경</li>
              <li>• 분석 추적 (Analytics)</li>
            </ul>
          </div>

          <div className="rounded-lg bg-red-50 p-6 border border-red-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• 의존성 배열 올바르게 지정</li>
              <li>• 정리 함수로 메모리 누수 방지</li>
              <li>• 무한 루프 주의</li>
              <li>• 비동기 함수 직접 사용 불가</li>
              <li>• 조건부 실행 불가</li>
              <li>• 다른 Hook들은 useEffect 내부에서</li>
            </ul>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={2} />
      </div>
    </div>
  );
}
