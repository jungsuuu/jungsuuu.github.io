import Link from "next/link";

export default function ExamplesPage() {
  const examples = [
    {
      title: "useState() 함수",
      description: "React의 기본 Hook인 useState를 이용한 상태 관리",
      href: "/examples/01-use-state",
    },
    {
      title: "useEffect() 함수",
      description: "Side Effect를 관리하는 useEffect Hook 배우기",
      href: "/examples/02-use-effect",
    },
    {
      title: "useRef() 함수",
      description: "DOM 요소에 접근하고 리렌더링되지 않는 값을 저장하기",
      href: "/examples/03-use-ref",
    },
    {
      title: "useContext() 함수",
      description: "깊은 Component Depth에서 Prop Drilling 없이 값 공유하기",
      href: "/examples/04-use-context",
    },
    {
      title: "Props",
      description: "부모에서 자식 컴포넌트로 데이터 전달하기",
      href: "/examples/05-props",
    },
    {
      title: "React + TypeScript",
      description: "타입 안전성을 높인 React 컴포넌트 개발",
      href: "/examples/06-react-in-typescript",
    },
    {
      title: "TypeScript: 타입 안전성",
      description: "정적 타입으로 런타임 에러를 사전에 방지하기",
      href: "/examples/07-ts-type-safety",
    },
    {
      title: "TypeScript: 인터페이스",
      description:
        "인터페이스로 객체 구조를 명확하게 정의하고 타입 안전성 보장",
      href: "/examples/08-ts-interfaces",
    },
    {
      title: "TypeScript: 제네릭",
      description: "코드 재사용성을 높이면서 타입 안전성 유지하기",
      href: "/examples/09-ts-generics",
    },
    {
      title: "TypeScript: Null 안전성",
      description: "null/undefined 관련 버그를 사전에 방지하기",
      href: "/examples/10-ts-null-safety",
    },
    {
      title: "TypeScript: Union 타입",
      description: "여러 가능한 타입을 명확하게 표현하고 안전하게 처리",
      href: "/examples/11-ts-union-types",
    },
    {
      title: "Typescript: utility types",
      description: "TypeScript가 제공하는 내장 Utility Types를 알아보자.",
      href: "/examples/12-utility-types",
    },
    {
      title: "Array Methods 실무 가이드",
      description: "map, filter, reduce, find, some, every, slice, splice, flat 등 실무에서 자주 사용하는 배열 메서드",
      href: "/examples/13-js-ts-utils",
    },
    {
      title: "Zod + React Hook Form",
      description: "TypeScript 안전 폼 검증: Zod와 React Hook Form의 Resolver 패턴으로 강력한 폼 관리",
      href: "/examples/14-zod-form",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <span className="mr-2">←</span>
            홈으로 돌아가기
          </Link>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            예제 모음
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Admin Console의 다양한 기능들을 학습할 수 있는 예제들입니다.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {examples.map((example, index) => (
            <Link
              key={index}
              href={example.href}
              className="group rounded-lg bg-white p-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {example.title}
              </h3>
              <p className="mt-3 text-gray-600">{example.description}</p>
              <div className="mt-4 text-blue-600 font-medium">더보기 →</div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 rounded-lg bg-blue-50 p-8 border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900">곧 추가될 예제들</h2>
          <ul className="mt-4 space-y-2 text-gray-700">
            <li>• 고급 배열 알고리즘</li>
            <li>• 함수형 프로그래밍 패턴</li>
            <li>• 비동기 처리 (async/await, Promise)</li>
            <li>• 이벤트 처리 및 위임</li>
            <li>• 고급 필터링 및 정렬</li>
            <li>• 대량 작업 처리</li>
            <li>• 권한 관리 및 접근 제어</li>
            <li>• 감시 로그 분석</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
