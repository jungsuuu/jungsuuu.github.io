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

const arrayMethodCode = `// 실무: 상품 목록 처리
const products = [
  { id: 1, name: "노트북", price: 1500000, inStock: true },
  { id: 2, name: "마우스", price: 45000, inStock: false },
  { id: 3, name: "키보드", price: 120000, inStock: true },
  { id: 4, name: "모니터", price: 350000, inStock: true }
];

// map: 상품 정보 변환 (API 응답 포맷팅)
const productList = products.map(p => ({
  ...p,
  discountedPrice: Math.floor(p.price * 0.9) // 10% 할인
}));

// filter: 재고 있는 상품만 (카테고리 필터)
const inStockProducts = products.filter(p => p.inStock);

// find: 특정 상품 검색
const laptop = products.find(p => p.name === "노트북");

// reduce: 총 가격 계산 (장바구니 금액)
const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

// some/every: 조건 확인
const hasOutOfStock = products.some(p => !p.inStock);
const allAffordable = products.every(p => p.price < 2000000);`;

const stringMethodCode = `// 실무: 사용자 입력 검증 및 처리
const userInput = "  john.doe@example.com  ";
const searchQuery = "JavaScript,React, TypeScript";
const phoneNumber = "01012345678";

// trim: 입력값 공백 제거 (폼 검증)
const email = userInput.trim();

// includes: 특정 문자 포함 여부 (이메일 검증)
const isValidEmail = email.includes("@");

// split: 검색어 파싱 (쉼표로 구분된 태그)
const tags = searchQuery.split(",").map(t => t.trim());
// ["JavaScript", "React", "TypeScript"]

// slice: 휴대폰번호 일부 마스킹
const masked = phoneNumber.slice(0, 3) + "****" + phoneNumber.slice(-4);
// "010****5678"

// replace: URL 처리 (쿼리스트링 인코딩)
const url = "https://example.com/search?q=hello world";
const encodedUrl = url.replace(" ", "%20");

// toLowerCase: 대소문자 통일 (검색 시 사용)
const normalizedSearch = searchQuery.toLowerCase();`;

const objectMethodCode = `// 실무: API 응답 처리 및 상태 업데이트
const apiResponse = {
  id: 1,
  username: "john_doe",
  email: "john@example.com",
  role: "user",
  createdAt: "2024-01-15"
};

const userDefaults = { theme: "light", notifications: true };
const formErrors = { email: "Invalid format", password: "Too short" };

// Object.keys: 유효성 검사 (에러 필드 확인)
const hasErrors = Object.keys(formErrors).length > 0;

// Object.entries: 동적 폼 렌더링 (에러 표시)
const errorList = Object.entries(formErrors);
// [["email", "Invalid format"], ["password", "Too short"]]

// 스프레드 연산자: 상태 업데이트 (리액트)
const updatedUser = { ...apiResponse, role: "admin" };

// 여러 객체 병합 (기본값 + 사용자 설정)
const userSettings = { ...userDefaults, ...{ theme: "dark" } };
// { theme: "dark", notifications: true }

// 중첩 객체 업데이트
const nestedUpdate = {
  ...apiResponse,
  profile: { ...apiResponse.profile, bio: "Developer" }
};`;

const destructuringCode = `// 실무: API 응답 처리 및 컴포넌트 Props

// API 응답에서 필요한 데이터만 추출
const apiUser = { id: 1, name: "John", email: "john@example.com", phone: "010-1234-5678" };
const { name, email } = apiUser;

// 배열 구조분해: 페이지네이션 처리
const [currentPage, ...otherPages] = [1, 2, 3, 4, 5];

// 기본값 설정: 선택적 필드
const { name, role = "user", isActive = true } = apiUser;

// 이름 변경: 변수명 충돌 피하기
const response = { data: { id: 1, name: "Product" } };
const { data: productData } = response;

// 함수 파라미터에서 구조분해 (리액트 컴포넌트)
function UserCard({ id, name, email, role = "user" }) {
  return \`\${name} (\${email}) - \${role}\`;
}

// 중첩 구조분해: 복잡한 응답 객체
const user = {
  id: 1,
  profile: { name: "John", avatar: "url" },
  settings: { theme: "dark", notifications: true }
};
const { profile: { name }, settings: { theme } } = user;`;

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
  const products = [
    { id: 1, name: "노트북", price: 1500000, category: "전자기기", inStock: true },
    { id: 2, name: "마우스", price: 45000, category: "주변기기", inStock: false },
    { id: 3, name: "키보드", price: 120000, category: "주변기기", inStock: true },
    { id: 4, name: "모니터", price: 350000, category: "전자기기", inStock: true }
  ];

  // map: 가격에 10% 할인 적용
  const saleProducts = products.map(p => ({
    ...p,
    salePrice: Math.floor(p.price * 0.9)
  }));

  // filter: 재고 있는 상품만
  const availableProducts = products.filter(p => p.inStock);

  // find: 가장 비싼 상품 찾기
  const mostExpensive = products.reduce((max, p) => p.price > max.price ? p : max);

  // reduce: 재고 상품의 총 금액
  const totalInventoryValue = availableProducts.reduce((sum, p) => sum + p.price, 0);

  // some/every: 검증
  const hasOutOfStock = products.some(p => !p.inStock);

  return (
    <div className="container">
      <h2>🛒 쇼핑몰: Array 메서드 활용</h2>
      
      <div className="demo-section">
        <h4>map() - 할인 상품 생성</h4>
        {saleProducts.slice(0, 2).map(p => (
          <p key={p.id}>{p.name}: {p.salePrice.toLocaleString()}원 (원가: {p.price.toLocaleString()}원)</p>
        ))}
      </div>

      <div className="demo-section">
        <h4>filter() - 재고 있는 상품</h4>
        <p>재고: {availableProducts.length}개</p>
        {availableProducts.map(p => (
          <p key={p.id}>✓ {p.name}</p>
        ))}
      </div>

      <div className="demo-section">
        <h4>reduce() - 재고 금액 계산</h4>
        <p>총액: {totalInventoryValue.toLocaleString()}원</p>
        <p>평균: {Math.floor(totalInventoryValue / availableProducts.length).toLocaleString()}원</p>
      </div>

      <div className="demo-section">
        <h4>some() - 품절 상품 확인</h4>
        <p>품절 상품 있음: {hasOutOfStock ? "🔴 있음" : "🟢 없음"}</p>
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
  // 실무: 회원가입 폼 검증
  const userEmail = "  john.doe@example.com  ";
  const searchKeywords = "javascript, react,  typescript";
  const phoneNumber = "01012345678";
  const bio = "   Web Developer with 5 years experience   ";

  // trim: 입력값 공백 제거
  const cleanEmail = userEmail.trim();
  const cleanBio = bio.trim();

  // split: 검색어 파싱 (쉼표로 구분된 태그)
  const keywords = searchKeywords.split(",").map(k => k.trim());

  // includes: 유효성 검사
  const isValidEmail = cleanEmail.includes("@") && cleanEmail.includes(".");
  const hasJavaScript = keywords.some(k => k.includes("javascript"));

  // slice: 휴대폰번호 마스킹
  const maskedPhone = phoneNumber.slice(0, 3) + "****" + phoneNumber.slice(-4);

  // replace: 특수문자 제거
  const cleanedBio = cleanBio.replace(/[^a-zA-Z0-9\\s]/g, "");

  // toLowerCase: 검색 정규화
  const searchQuery = "React".toLowerCase();

  return (
    <div className="container">
      <h2>✏️ 회원가입: String 메서드 활용</h2>
      
      <div className="demo-section">
        <h4>trim() - 입력값 정제</h4>
        <p>입력: \\"{userEmail}\\"</p>
        <p>정제: \\"{cleanEmail}\\"</p>
      </div>

      <div className="demo-section">
        <h4>split() - 검색어 파싱</h4>
        <p>입력: \\"{searchKeywords}\\"</p>
        <p>파싱됨: [{keywords.join(", ")}]</p>
      </div>

      <div className="demo-section">
        <h4>includes() - 유효성 검사</h4>
        <p>이메일 유효: {isValidEmail ? "✅ 유효" : "❌ 무효"}</p>
        <p>JavaScript 포함: {hasJavaScript ? "✅ 있음" : "❌ 없음"}</p>
      </div>

      <div className="demo-section">
        <h4>slice() & replace() - 마스킹</h4>
        <p>전화번호: {maskedPhone} (마스킹됨)</p>
        <p>소개: {cleanedBio}</p>
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
            실무에서는 API 응답 처리, 필터링, 계산 등에 자주 사용됩니다. 쇼핑몰의 상품 목록을 처리하는 예제를 봐보세요.
          </p>
          <CodeBlock code={arrayMethodCode} language="typescript" />
        </section>

        {/* String Methods */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2️⃣ String 메서드
          </h2>
          <p className="text-gray-600 mb-4">
            사용자 입력 검증, 데이터 정제, 마스킹 등에서 매일 마주칩니다. 회원가입 폼 검증 예제를 확인해보세요.
          </p>
          <CodeBlock code={stringMethodCode} language="typescript" />
        </section>

        {/* Object Methods */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3️⃣ Object 메서드 & 스프레드 연산자
          </h2>
          <p className="text-gray-600 mb-4">
            API 응답 처리, 리액트 상태 업데이트, 폼 데이터 병합 등에 필수적입니다. 이뮬레이션해서 사용해보세요.
          </p>
          <CodeBlock code={objectMethodCode} language="typescript" />
        </section>

        {/* Destructuring */}
        <section className="mb-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4️⃣ 구조분해 (Destructuring)
          </h2>
          <p className="text-gray-600 mb-4">
            리액트 컴포넌트 Props, API 응답 처리, 함수 파라미터에서 자주 사용합니다. 코드를 더 깔끔하고 읽기 쉽게 만들어줍니다.
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