import Link from "next/link";

const examples = [
  { number: 1, title: "useState()", path: "/examples/01-use-state" },
  { number: 2, title: "useEffect()", path: "/examples/02-use-effect" },
  { number: 3, title: "useRef()", path: "/examples/03-use-ref" },
  { number: 4, title: "useContext()", path: "/examples/04-use-context" },
  { number: 5, title: "Props", path: "/examples/05-props" },
  { number: 6, title: "React in TypeScript", path: "/examples/06-react-in-typescript" },
  { number: 7, title: "TS Type Safety", path: "/examples/07-ts-type-safety" },
  { number: 8, title: "TS Interfaces", path: "/examples/08-ts-interfaces" },
  { number: 9, title: "TS Generics", path: "/examples/09-ts-generics" },
  { number: 10, title: "TS Null Safety", path: "/examples/10-ts-null-safety" },
  { number: 11, title: "TS Union Types", path: "/examples/11-ts-union-types" },
  { number: 12, title: "Utility Types", path: "/examples/12-utility-types" },
  { number: 13, title: "JS/TS Utils", path: "/examples/13-js-ts-utils" },
  { number: 14, title: "Zod + React Hook Form", path: "/examples/14-zod-form" },
];

interface ExampleNavigationProps {
  currentNumber: number;
}

export function ExampleNavigation({ currentNumber }: ExampleNavigationProps) {
  const currentIndex = currentNumber - 1;
  const previousExample = currentIndex > 0 ? examples[currentIndex - 1] : null;
  const nextExample = currentIndex < examples.length - 1 ? examples[currentIndex + 1] : null;

  return (
    <div className="mt-16 rounded-lg bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">다른 예제 보기</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {previousExample ? (
          <Link
            href={previousExample.path}
            className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
          >
            <p className="font-semibold text-blue-600">← 이전글 보기</p>
            <p className="text-sm text-gray-600 mt-1">
              {previousExample.number}. {previousExample.title}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 opacity-50">
            <p className="font-semibold text-gray-400">← 이전글 보기</p>
            <p className="text-sm text-gray-400 mt-1">처음 예제입니다</p>
          </div>
        )}

        {nextExample ? (
          <Link
            href={nextExample.path}
            className="rounded-lg bg-white p-4 hover:shadow-md transition-shadow"
          >
            <p className="font-semibold text-blue-600">다음글 보기 →</p>
            <p className="text-sm text-gray-600 mt-1">
              {nextExample.number}. {nextExample.title}
            </p>
          </Link>
        ) : (
          <div className="rounded-lg bg-gray-50 p-4 opacity-50">
            <p className="font-semibold text-gray-400">다음글 보기 →</p>
            <p className="text-sm text-gray-400 mt-1">마지막 예제입니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
