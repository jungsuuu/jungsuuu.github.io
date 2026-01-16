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

        {/* Practical API Examples */}
        <div className="rounded-lg bg-blue-50 p-8 border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">API 타입 안전성</h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔌 Axios 제네릭 설정
              </h4>
              <CodeBlock
                language="typescript"
                code={`// API 응답 구조 정의
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: number;
}

// 타입 안전한 axios 메서드
async function fetchAPI<T>(
  url: string
): Promise<T> {
  const response = await axiosInstance.get<ApiResponse<T>>(url);
  return response.data.data; // 자동으로 T 타입 추론
}

// 사용 예시
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ 컴파일러가 자동으로 타입 추론
const user = await fetchAPI<User>('/users/1');
console.log(user.id); // ✅ OK
console.log(user.email); // ✅ OK
console.log(user.invalid); // ❌ Error - 타입 안전!`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 실무 패턴: 페이지 응답
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 페이지네이션 API
async function fetchUsers(
  page: number
): Promise<PaginatedResponse<User>> {
  return fetchAPI<PaginatedResponse<User>>(
    \`/users?page=\${page}\`
  );
}

// 사용
const result = await fetchUsers(1);
result.items.forEach(user => {
  console.log(user.name); // ✅ User의 속성 자동완성
});
console.log(result.total); // ✅ 페이지 정보도 타입 안전`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 제네릭 API 서비스 클래스
              </h4>
              <CodeBlock
                language="typescript"
                code={`class ApiService<T> {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getList(): Promise<T[]> {
    return fetchAPI<T[]>(this.endpoint);
  }

  async getById(id: number): Promise<T> {
    return fetchAPI<T>(\`\${this.endpoint}/\${id}\`);
  }

  async create(data: Partial<T>): Promise<T> {
    const response = await axiosInstance.post<ApiResponse<T>>(
      this.endpoint,
      data
    );
    return response.data.data;
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const response = await axiosInstance.put<ApiResponse<T>>(
      \`\${this.endpoint}/\${id}\`,
      data
    );
    return response.data.data;
  }
}

// 사용
const userService = new ApiService<User>('/users');
const users = await userService.getList(); // User[]
const user = await userService.getById(1); // User
const newUser = await userService.create({ // User
  name: 'Alice',
  email: 'alice@example.com'
});`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔒 Form 제네릭과 API 통합
              </h4>
              <CodeBlock
                language="typescript"
                code={`// Form 상태와 API 응답을 같은 타입으로 관리
interface FormState<T> {
  data: T;
  loading: boolean;
  error: Error | null;
}

// React Query와 제네릭 활용
function useApiData<T>(url: string) {
  const [state, setState] = useState<FormState<T>>({
    data: {} as T,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchAPI<T>(url)
      .then(data => {
        setState({ data, loading: false, error: null });
      })
      .catch(error => {
        setState({ data: {} as T, loading: false, error });
      });
  }, [url]);

  return state;
}

// 사용
const { data: user, loading } = useApiData<User>('/users/1');
// data는 자동으로 User 타입
console.log(user.name);`}
              />
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ 이렇게 하세요</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ <strong>명확한 제약</strong>: <code>extends</code>로 타입 명시</li>
                  <li>✓ <strong>의미있는 이름</strong>: <code>T</code>는 Type, <code>K</code>는 Key</li>
                  <li>✓ <strong>재사용성</strong>: 같은 로직을 여러 타입에 적용</li>
                  <li>✓ <strong>타입 추론</strong>: 타입 명시 없이도 자동 감지</li>
                  <li>✓ <strong>에러 메시지</strong>: 명확한 제약으로 좋은 에러 메시지</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">❌ 이렇게 하지 마세요</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✗ <strong>과도한 추상화</strong>: 이해하기 어려운 복잡한 제네릭</li>
                  <li>✗ <strong>제약 없는 타입</strong>: 제약 조건 명시 필수</li>
                  <li>✗ <strong>깊은 중첩</strong>: 3단계 이상의 제네릭 중첩은 피하기</li>
                  <li>✗ <strong>any 사용</strong>: 제네릭의 의미를 잃음</li>
                  <li>✗ <strong>일관성 부족</strong>: API 응답 타입을 일관되게 정의</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 API 설계 팁</h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ 안 좋은 예: 제약 없음, 타입 불명확
function fetch<T>(url: string): T {
  // ...
}

// ✅ 좋은 예: 제약 있음, 타입 명확
function fetch<T extends object>(url: string): Promise<T> {
  // ...
}

// ❌ 안 좋은 예: 사용처에서 타입 명시 필요
const user = fetch<User>('/users/1');

// ✅ 좋은 예: 타입 자동 추론
async function getUser(id: number) {
  return fetch<User>(\`/users/\${id}\`);
}
const user = await getUser(1); // User로 자동 추론

// ❌ 안 좋은 예: 응답 타입 구조 불명확
interface ApiResponse<T> {
  result: T;
}

// ✅ 좋은 예: 일관된 응답 구조
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}`}
              />
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={9} />
      </div>
    </div>
  );
}
