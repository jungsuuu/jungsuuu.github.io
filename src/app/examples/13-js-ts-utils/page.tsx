"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { CodeBlock } from "@/src/components/CodeBlock";

const arrayMethodCode = `// Array 메서드들
const numbers = [1, 2, 3, 4, 5];

// map: 배열의 각 요소를 변환
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter: 조건에 맞는 요소만 선택
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// find: 조건에 맞는 첫 번째 요소 찾기
const firstEven = numbers.find(n => n % 2 === 0);
// 2

// reduce: 배열을 하나의 값으로 축약
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// some/every: 조건 확인
const hasEven = numbers.some(n => n % 2 === 0); // true
const allPositive = numbers.every(n => n > 0); // true`;

const stringMethodCode = `// String 메서드들
const text = "hello world";

// split: 문자열을 배열로 변환
const words = text.split(" ");
// ["hello", "world"]

// replace: 문자열 치환
const replaced = text.replace("world", "JS");
// "hello JS"

// slice: 부분 문자열 추출
const sliced = text.slice(0, 5);
// "hello"

// includes: 문자 포함 여부 확인
const hasWorld = text.includes("world"); // true

// toUpperCase/toLowerCase: 대소문자 변환
text.toUpperCase(); // "HELLO WORLD"
text.toLowerCase(); // "hello world"

// trim: 공백 제거
"  hello  ".trim(); // "hello"`;

const objectMethodCode = `// Object 메서드들
const user = { name: "John", age: 30, email: "john@example.com" };

// Object.keys: 키 배열 가져오기
Object.keys(user);
// ["name", "age", "email"]

// Object.values: 값 배열 가져오기
Object.values(user);
// ["John", 30, "john@example.com"]

// Object.entries: [키, 값] 쌍 배열
Object.entries(user);
// [["name", "John"], ["age", 30], ["email", "john@example.com"]]

// Object.assign: 객체 병합
const updated = Object.assign({}, user, { age: 31 });
// { name: "John", age: 31, email: "john@example.com" }

// 스프레드 연산자: 객체 복사/병합
const copy = { ...user };
const merged = { ...user, age: 31 };`;

const destructuringCode = `// 구조분해 (Destructuring)

// 배열 구조분해
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]

// 객체 구조분해
const { name, age } = { name: "John", age: 30, email: "john@example.com" };
// name = "John", age = 30

// 객체 구조분해에서 이름 변경
const { name: userName, age: userAge } = user;

// 함수 파라미터에서 구조분해
function greet({ name, age }) {
  return \`Hello \${name}, you are \${age} years old\`;
}

// 기본값 설정
const { name, role = "user" } = { name: "John" };
// role이 없으면 "user" 사용`;

const arrayMethodCss = `* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin: 0 0 20px 0;
  color: #1f2937;
}

.demo-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.demo-section:last-child {
  border-bottom: none;
}

h4 {
  margin: 0 0 10px 0;
  color: #3b82f6;
  font-size: 14px;
}

p {
  margin: 5px 0;
  color: #4b5563;
}`;

const arrayMethodSandpack = `import './App.css';

export default function ArrayDemo() {
  const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "user" }
  ];

  const names = users.map(u => u.name);
  const admins = users.filter(u => u.role === "admin");
  const alice = users.find(u => u.name === "Alice");
  const total = users.reduce((acc) => acc + 1, 0);

  return (
    <div className="container">
      <h2>📋 Array 메서드 예제</h2>
      
      <div className="demo-section">
        <h4>map() - 이름만 추출</h4>
        <p><strong>결과:</strong> {names.join(", ")}</p>
      </div>

      <div className="demo-section">
        <h4>filter() - Admin 필터링</h4>
        {admins.map(admin => (
          <p key={admin.id}>✓ {admin.name}</p>
        ))}
      </div>

      <div className="demo-section">
        <h4>find() - 특정 사용자 찾기</h4>
        <p>찾은 사용자: {alice?.name} (ID: {alice?.id})</p>
      </div>

      <div className="demo-section">
        <h4>reduce() - 배열 길이</h4>
        <p>총 사용자 수: {total}명</p>
      </div>
    </div>
  );
}`;

const stringMethodCss = `* {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  margin: 0 0 20px 0;
  color: #1f2937;
}

.demo-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.demo-section:last-child {
  border-bottom: none;
}

h4 {
  margin: 0 0 10px 0;
  color: #10b981;
  font-size: 14px;
}

p {
  margin: 5px 0;
  color: #4b5563;
  font-family: 'Courier New', monospace;
  background: #f3f4f6;
  padding: 8px;
  border-radius: 4px;
}`;

const stringMethodSandpack = `import './App.css';

export default function StringDemo() {
  const email = "hello@example.com";
  const tags = "react,typescript,javascript";
  const text = "  hello world  ";

  const [username, domain] = email.split("@");
  const tagArray = tags.split(",");
  const hasReact = tags.includes("react");
  const upper = text.toUpperCase().trim();

  return (
    <div className="container">
      <h2>📝 String 메서드 예제</h2>
      
      <div className="demo-section">
        <h4>split() - 이메일 분석</h4>
        <p>전체: {email}</p>
        <p>사용자명: {username}</p>
        <p>도메인: {domain}</p>
      </div>

      <div className="demo-section">
        <h4>split() & join() - 태그 변환</h4>
        <p>원본: {tags}</p>
        <p>배열로: [{tagArray.map(t => \`"\${t}"\`).join(", ")}]</p>
      </div>

      <div className="demo-section">
        <h4>includes() - 검색</h4>
        <p>"react" 포함 여부: {hasReact ? "✅ 있음" : "❌ 없음"}</p>
      </div>

      <div className="demo-section">
        <h4>toUpperCase() & trim()</h4>
        <p>원본: "{text}"</p>
        <p>변환: "{upper}"</p>
      </div>
    </div>
  );
}`;

export default function JsUtilsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/examples"
            className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
          >
            ← Examples
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            JS/TS 자주 사용하는 함수들
          </h1>
          <p className="text-gray-600">
            배열, 문자열, 객체 등에서 자주 사용하는 메서드들을 정리했습니다.
          </p>
        </div>

        {/* Array Methods */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1️⃣ Array 메서드
          </h2>
          <p className="text-gray-600 mb-4">
            배열을 다루는 가장 기본적인 메서드들입니다. map, filter, reduce는 리액트에서도 매우 자주 사용됩니다.
          </p>
          <CodeBlock code={arrayMethodCode} language="typescript" />
        </section>

        {/* Array Interactive Demo */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Array 메서드 실습
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <SandpackProvider
              template="react-ts"
              files={{
                "/App.tsx": arrayMethodSandpack,
                "/App.css": arrayMethodCss,
              }}
            >
              <SandpackLayout>
                <SandpackCodeEditor
                  showLineNumbers={true}
                  showInlineErrors={true}
                  wrapContent={true}
                  style={{ height: 500 }}
                />
                <SandpackPreview style={{ height: 500 }} />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </section>

        {/* String Methods */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2️⃣ String 메서드
          </h2>
          <p className="text-gray-600 mb-4">
            문자열을 처리하는 메서드들입니다. split, replace, includes는 매일 사용합니다.
          </p>
          <CodeBlock code={stringMethodCode} language="typescript" />
        </section>

        {/* String Interactive Demo */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            String 메서드 실습
          </h3>
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <SandpackProvider
              template="react-ts"
              files={{
                "/App.tsx": stringMethodSandpack,
                "/App.css": stringMethodCss,
              }}
            >
              <SandpackLayout>
                <SandpackCodeEditor
                  showLineNumbers={true}
                  showInlineErrors={true}
                  wrapContent={true}
                  style={{ height: 500 }}
                />
                <SandpackPreview style={{ height: 500 }} />
              </SandpackLayout>
            </SandpackProvider>
          </div>
        </section>

        {/* Object Methods */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3️⃣ Object 메서드 & 스프레드 연산자
          </h2>
          <p className="text-gray-600 mb-4">
            객체를 다루는 메서드들입니다. 리액트에서 상태를 업데이트할 때도 자주 사용됩니다.
          </p>
          <CodeBlock code={objectMethodCode} language="typescript" />
        </section>

        {/* Destructuring */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4️⃣ 구조분해 (Destructuring)
          </h2>
          <p className="text-gray-600 mb-4">
            배열이나 객체에서 필요한 값을 쉽게 추출하는 문법입니다. 모던 자바스크립트의 필수 문법입니다.
          </p>
          <CodeBlock code={destructuringCode} language="typescript" />
        </section>

        {/* Quick Tips */}
        <section className="mb-12 bg-blue-50 rounded-lg border-l-4 border-blue-500 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 꿀팁</h3>
          <ul className="space-y-2 text-blue-900">
            <li>
              <strong>map vs forEach:</strong> map은 새 배열을 반환하고, forEach는 부작용만 실행합니다. 리액트에서는 map을 더 자주 씁니다.
            </li>
            <li>
              <strong>filter + map:</strong> 조건에 맞는 요소를 변환하려면 filter 후 map을 사용하세요.
            </li>
            <li>
              <strong>reduce:</strong> 배열을 단일 값으로 축약할 때 강력합니다. 합계, 개수, 그룹화 등에 사용됩니다.
            </li>
            <li>
              <strong>스프레드 연산자:</strong> 객체나 배열을 복사할 때는 항상 스프레드 연산자({`{...obj}`})를 사용하세요.
            </li>
          </ul>
        </section>

        {/* Navigation */}
        <ExampleNavigation currentNumber={13} />
      </div>
    </div>
  );
}