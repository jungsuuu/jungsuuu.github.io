"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function GenericsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-violet-50 to-white">
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
            TypeScript: 제네릭 (Generics)
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            제네릭을 사용하여 코드를 재사용 가능하면서도 타입 안전성을
            유지해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-violet-50 p-8 border border-violet-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">제네릭이란?</h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>제네릭(Generics)</strong>은 TypeScript에서 코드를 재사용
              가능하게 만들면서도 타입 안전성을 유지하는 방법입니다. 마치 함수의
              매개변수처럼, 타입을 매개변수화하여 다양한 타입을 처리할 수
              있습니다.
            </p>
            <p className="mt-4">
              <strong>주요 특징:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>코드 중복 제거 (DRY 원칙)</li>
              <li>타입 안전성 유지</li>
              <li>자동 타입 추론</li>
              <li>유연한 재사용 가능한 컴포넌트</li>
              <li>프레임워크 및 라이브러리 패턴 구현</li>
            </ul>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ 제네릭의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>코드 재사용</strong>: 한 번 작성하고 여러 타입에 사용
              </li>
              <li>
                • <strong>타입 안전성</strong>: 컴파일 시점에 타입 검증
              </li>
              <li>
                • <strong>자동 추론</strong>: TypeScript가 타입을 자동으로 추론
              </li>
              <li>
                • <strong>유연성</strong>: 제약 조건으로 유연한 제어 가능
              </li>
              <li>
                • <strong>라이브러리 패턴</strong>: React, Array 등에서 광범위
                사용
              </li>
              <li>
                • <strong>유지보수성</strong>: 변경 시 한 곳에서만 수정
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>학습곡선</strong>: 처음에는 개념이 복잡할 수 있음
              </li>
              <li>
                • <strong>과도한 추상화</strong>: 너무 복잡하게 만들지 말기
              </li>
              <li>
                • <strong>제약 조건</strong>: 명확한 제약을 정의해야 함
              </li>
              <li>
                • <strong>가독성</strong>: 너무 깊은 중첩은 피할 것
              </li>
              <li>
                • <strong>디버깅</strong>: 제네릭 타입 에러는 복잡할 수 있음
              </li>
              <li>
                • <strong>성능</strong>: 런타임 오버헤드는 없지만 컴파일 시간
                증가
              </li>
            </ul>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">제네릭 패턴</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔧 제네릭 함수
              </h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ JavaScript - 타입 불명확
function getFirst(items) {
  return items[0];
}

// ✅ TypeScript - 제네릭
function getFirst<T>(items: T[]): T {
  return items[0];
}

const firstNum = getFirst([1, 2, 3]); // number
const firstStr = getFirst(['a', 'b']); // string`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📋 제네릭 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface User {
  id: number;
  name: string;
}

// 다양한 타입으로 재사용
const userRes: ApiResponse<User> = {
  success: true,
  data: { id: 1, name: 'Alice' }
};

const numbersRes: ApiResponse<number[]> = {
  success: true,
  data: [1, 2, 3]
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ⚙️ 제네릭 클래스
              </h4>
              <CodeBlock
                language="typescript"
                code={`class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
const top = numberStack.pop(); // number | undefined`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🔒 제약 조건</h4>
              <CodeBlock
                language="typescript"
                code={`// T는 반드시 length 속성을 가져야 함
function getLength<T extends { length: number }>(
  item: T
): number {
  return item.length;
}

getLength('hello'); // ✅ OK
getLength([1, 2, 3]); // ✅ OK
getLength(123); // ❌ Error

// keyof로 객체 키 제약
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  return obj[key];
}

const user = { id: 1, name: 'Alice' };
getProperty(user, 'name'); // ✅ OK
getProperty(user, 'email'); // ❌ Error`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🪝 커스텀 훅 제네릭
              </h4>
              <CodeBlock
                language="typescript"
                code={`import { useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}

// 사용
const [user, setUser] = useLocalStorage<User>(
  'user',
  { id: 0, name: '' }
);`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 조건부 제네릭
              </h4>
              <CodeBlock
                language="typescript"
                code={`// T가 string이면 string, 아니면 number
type StringOrNumber<T> = 
  T extends string ? string : number;

// API 응답 추출
type ResponseData<T> = 
  T extends Promise<infer U> ? U : T;

type A = ResponseData<Promise<string>>; 
// A는 string

// 배열 요소 타입 추출
type ArrayElement<T> = 
  T extends (infer E)[] ? E : T;

type B = ArrayElement<number[]>;
// B는 number`}
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
                <li>✓ 명확한 이름 지정</li>
                <li>✓ 필요한 만큼만 추상화</li>
                <li>✓ 제약 조건 명시</li>
                <li>✓ 기본값 설정</li>
                <li>✓ 문서화</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">❌ Don't</h4>
              <ul className="space-y-2 text-gray-700">
                <li>✗ 과도한 추상화</li>
                <li>✗ 깊은 중첩</li>
                <li>✗ 제약 없는 any</li>
                <li>✗ 복잡한 타입</li>
                <li>✗ 문서 부족</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Tips</h4>
              <ul className="space-y-2 text-gray-700">
                <li>📌 T, U, K 등 관례 따르기</li>
                <li>📌 extends로 제약 명시</li>
                <li>📌 infer로 타입 추출</li>
                <li>📌 기본 타입 변수 설정</li>
                <li>📌 테스트로 검증</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={9} />
      </div>
    </div>
  );
}
