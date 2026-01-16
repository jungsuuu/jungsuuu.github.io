"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function InterfacesPage() {
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
            TypeScript: 인터페이스 (Interfaces)
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            인터페이스를 통해 객체의 구조를 명확하게 정의하고 타입 안전성을
            보장해봅시다.
          </p>
        </div>

        {/* Explanation */}
        <div className="mb-12 rounded-lg bg-indigo-50 p-8 border border-indigo-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            인터페이스란?
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>인터페이스(Interface)</strong>는 TypeScript에서 객체의
              구조를 정의하는 방법입니다. 어떤 속성들이 필수인지, 선택인지, 어떤
              타입인지를 명확하게 지정하여 코드의 안전성과 가독성을 높입니다.
            </p>
            <p className="mt-4">
              <strong>주요 특징:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>객체의 구조를 명확하게 정의</li>
              <li>필수(required)와 선택(optional) 속성 구분</li>
              <li>메서드 시그니처 정의 가능</li>
              <li>인터페이스 확장(상속) 지원</li>
              <li>코드 자동완성 지원</li>
              <li>함수와 클래스에 계약(contract) 정의</li>
            </ul>
          </div>
        </div>

        {/* Key Points */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ✅ 인터페이스의 이점
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>타입 안전성</strong>: 잘못된 구조의 객체 할당 방지
              </li>
              <li>
                • <strong>IDE 자동완성</strong>: 정확한 속성명과 타입 자동완성
              </li>
              <li>
                • <strong>코드 가독성</strong>: 객체 구조가 명확하게 표현됨
              </li>
              <li>
                • <strong>유지보수성</strong>: 변경 시 영향 범위 명확
              </li>
              <li>
                • <strong>재사용성</strong>: 여러 곳에서 재사용 가능
              </li>
              <li>
                • <strong>문서화</strong>: 타입 정의 자체가 문서 역할
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ⚠️ 주의사항
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>런타임에 제거</strong>: JavaScript로 컴파일되면서 제거
              </li>
              <li>
                • <strong>과도한 정의</strong>: 불필요하게 복잡한 구조 지양
              </li>
              <li>
                • <strong>유니온 vs 인터페이스</strong>: 상황에 맞는 선택 필요
              </li>
              <li>
                • <strong>순환 참조</strong>: 상호 참조 시 주의
              </li>
              <li>
                • <strong>제네릭 활용</strong>: 재사용성을 높이려면 제네릭 활용
              </li>
              <li>
                • <strong>확장 설계</strong>: 향후 확장을 고려한 설계 필요
              </li>
            </ul>
          </div>
        </div>

        {/* Practical UI Examples */}
        <div className="rounded-lg bg-blue-50 p-8 border border-blue-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            실무: React 컴포넌트 인터페이스
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎨 Form Input 컴포넌트
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
}

const Input = (props: InputProps) => {
  return (
    <div>
      {props.label && <label>{props.label}</label>}
      <input
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        disabled={props.disabled}
      />
      {props.error && <span className="error">{props.error}</span>}
    </div>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📋 Table/List 데이터 구조
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'guest';
}

interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

const UserTable = (props: TableProps<User>) => {
  return (
    <table>
      {props.data.map(row => (
        <tr key={row.id} onClick={() => props.onRowClick?.(row)}>
          {props.columns.map(col => (
            <td key={String(col.key)}>
              {col.render ? col.render(row[col.key]) : row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 Modal/Dialog 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface DialogProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
  children: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
}

const Dialog = (props: DialogProps) => {
  if (!props.isOpen) return null;
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{props.title}</h2>
        <div>{props.children}</div>
        <div className="modal-actions">
          <button onClick={props.onClose}>
            {props.cancelLabel || 'Cancel'}
          </button>
          {props.onConfirm && (
            <button onClick={props.onConfirm}>
              {props.confirmLabel || 'Confirm'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔘 버튼 컴포넌트 Props
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={\`btn btn-\${variant} btn-\${size}\`}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎁 Card 컴포넌트 구조
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface CardProps {
  title: string;
  description?: string;
  image?: string;
  badges?: string[];
  footer?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Card = (props: CardProps) => {
  return (
    <div className="card" onClick={props.onClick}>
      {props.image && (
        <img src={props.image} alt={props.title} />
      )}
      <div className="card-body">
        <h3>{props.title}</h3>
        {props.description && <p>{props.description}</p>}
        {props.badges && (
          <div className="badges">
            {props.badges.map(badge => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        )}
        {props.children}
      </div>
      {props.footer && <div className="card-footer">{props.footer}</div>}
    </div>
  );
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📊 Pagination 상태 관리
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface PaginationState {
  currentPage: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

interface PaginationProps extends PaginationState {
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  maxVisible?: number;
}

const Pagination = ({
  currentPage,
  pageSize,
  total,
  onPageChange
}: PaginationProps) => {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={currentPage === i + 1 ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};`}
              />
            </div>
          </div>
        </div>

        {/* Basic Patterns */}
        <div className="rounded-lg bg-purple-50 p-8 border border-purple-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            기초 인터페이스 패턴
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🏷️ 기본 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

const user: User = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  isActive: true
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                ❓ 선택적 속성
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

const profile: UserProfile = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
  // 선택적 속성은 생략 가능
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🔄 인터페이스 확장
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface BaseUser {
  id: number;
  name: string;
}

interface Admin extends BaseUser {
  role: 'admin';
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: 'John',
  role: 'admin',
  permissions: ['read', 'write']
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🪝 상태 관리 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface State<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UserState extends State<User> {
  selectedId: number | null;
}

const [state, setState] = useState<UserState>({
  data: null,
  loading: false,
  error: null,
  selectedId: null
});`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                🎯 제네릭 인터페이스
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const handleUserResponse = (
  response: ApiResponse<User>
) => {
  if (response.success && response.data) {
    console.log(response.data.name);
  }
};`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                📝 이벤트 핸들러 타입
              </h4>
              <CodeBlock
                language="typescript"
                code={`interface FormSubmitEvent {
  target: HTMLFormElement;
  preventDefault: () => void;
}

interface FormHandlers {
  onSubmit: (e: FormSubmitEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const handleSubmit: FormHandlers['onSubmit'] = (e) => {
  e.preventDefault();
};`}
              />
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            실무 Best Practices
          </h2>
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ 이렇게 하세요</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ <strong>명확한 Props</strong>: 모든 props를 인터페이스로 정의</li>
                  <li>✓ <strong>선택/필수 구분</strong>: ?를 사용해 선택적 props 표시</li>
                  <li>✓ <strong>단일 책임</strong>: 하나의 인터페이스는 한 가지 목적</li>
                  <li>✓ <strong>확장성</strong>: 미래 확장을 고려한 설계</li>
                  <li>✓ <strong>일관된 네이밍</strong>: Props, State, Event 명확히 구분</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">❌ 이렇게 하지 마세요</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✗ <strong>any 사용</strong>: 타입 안전성 상실</li>
                  <li>✗ <strong>과도한 선택성</strong>: 모든 props를 선택적으로</li>
                  <li>✗ <strong>너무 많은 props</strong>: 컴포넌트 복잡도 증가</li>
                  <li>✗ <strong>충동적 설계</strong>: 미래 확장 고려 부족</li>
                  <li>✗ <strong>불명확한 타입</strong>: string | number보다 구체적으로</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">💡 Props 설계 패턴</h4>
              <CodeBlock
                language="typescript"
                code={`// ❌ 안 좋은 예: 모든 것이 선택적, 명확하지 않은 타입
interface BadButtonProps {
  label?: string;
  onClick?: any;
  className?: string;
  style?: any;
}

// ✅ 좋은 예: 필수/선택 명확, 구체적 타입
interface GoodButtonProps {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// ❌ 너무 많은 props
interface ComplexInputProps {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  // ... 10개 이상
}

// ✅ 좋은 예: 묶어서 정리
interface BaseInputProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

interface InputProps extends BaseInputProps {
  label?: string;
  error?: string;
  required?: boolean;
}

interface AdvancedInputProps extends InputProps {
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">🎯 공통 패턴</h4>
              <CodeBlock
                language="typescript"
                code={`// 상태 기반 Props 확장
interface BaseProps {
  className?: string;
}

interface LoadingProps extends BaseProps {
  isLoading: true;
}

interface SuccessProps extends BaseProps {
  isLoading: false;
  data: User;
}

type ContentProps = LoadingProps | SuccessProps;

// 이렇게 하면 isLoading 값에 따라 data 필수 여부가 결정됨
const Content = (props: ContentProps) => {
  if (props.isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{props.data.name}</div>;
};`}
              />
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="rounded-lg bg-gray-50 p-8 border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Interface vs Type
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">📋 Interface</h4>
              <CodeBlock
                language="typescript"
                code={`// 확장 가능
interface User {
  id: number;
  name: string;
}

// 다중 확장
interface Admin extends User,
  Timestamps {
  role: 'admin';
}

// 병합 가능 (Declaration Merging)
interface Config {
  apiUrl: string;
}
interface Config {
  timeout: number;
}
// { apiUrl, timeout } 자동 병합`}
              />
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">🏷️ Type</h4>
              <CodeBlock
                language="typescript"
                code={`// 유니온 타입
type Status = 'pending' | 'done' | 'error';

// 조건부 타입
type IsString<T> = T extends string
  ? true
  : false;

// 더 유연한 조합
type Config = {
  apiUrl: string;
  timeout: number;
} & Timestamps;

// 교집합
type Admin = User & { role: 'admin' };`}
              />
            </div>
          </div>
        </div>

        {/* Related Examples */}
        <ExampleNavigation currentNumber={8} />
      </div>
    </div>
  );
}
