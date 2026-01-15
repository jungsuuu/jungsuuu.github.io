"use client";

import Link from "next/link";
import { ExampleNavigation } from "@/src/components/ExampleNavigation";
import { CodeBlock } from "@/src/components/CodeBlock";

export default function ZodFormPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-rose-50 to-white">
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
          Zod + React Hook Form with Resolver
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          TypeScript에서 안전한 폼 검증을 위해 Zod와 React Hook Form을 함께 사용하는 방법을 배워봅시다.
        </p>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          {/* Code Example 1: Basic Setup */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📦 기본 설정 및 스키마 정의
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  1️⃣ Zod 스키마 정의
                </h3>
                <CodeBlock code={`import { z } from 'zod';

// 사용자 가입 폼 스키마
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수입니다')
    .email('올바른 이메일 형식이 아닙니다'),
  
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/,
      '영문 대문자, 소문자, 숫자를 포함해야 합니다'
    ),
  
  confirmPassword: z.string(),
  
  age: z
    .number()
    .min(18, '18세 이상이어야 합니다')
    .max(120, '올바른 나이를 입력하세요'),
  
  terms: z
    .boolean()
    .refine((val) => val === true, '약관에 동의해야 합니다'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword'],
});

// TypeScript 타입 추론
export type RegisterFormInputs = z.infer<typeof registerSchema>;`} />
              </div>
            </div>
          </div>

          {/* Code Example 2: Form Implementation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📝 React Hook Form 구현
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  2️⃣ Resolver와 함께 사용하기
                </h3>
                <CodeBlock code={`'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormInputs } from './schema';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange', // onChange | onBlur | onSubmit
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      console.log('Form data:', data);
      // API 호출
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('가입 완료!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* 이메일 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이메일
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="example@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* 비밀번호 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호
        </label>
        <input
          {...register('password')}
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          비밀번호 확인
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* 나이 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          나이
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="20"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
        )}
      </div>

      {/* 약관 동의 */}
      <div className="flex items-center">
        <input
          {...register('terms')}
          type="checkbox"
          id="terms"
          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
          이용약관에 동의합니다
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm ml-2">{errors.terms.message}</p>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? '처리 중...' : '가입하기'}
      </button>
    </form>
  );
}`} />
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📚 주요 개념
            </h2>

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🎯 Zod란?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Zod는 TypeScript-first 스키마 검증 라이브러리입니다. 런타임에 데이터의 형태와 유효성을 검증하며, TypeScript의 타입 추론을 활용하여 스키마로부터 자동으로 타입을 생성할 수 있습니다.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  📋 React Hook Form의 Resolver
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Resolver는 React Hook Form이 외부 검증 라이브러리(Yup, Zod 등)를 사용하도록 해주는 어댑터입니다. `@hookform/resolvers` 패키지를 통해 다양한 라이브러리와 통합할 수 있습니다.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm font-mono text-blue-900">
                    resolver: zodResolver(schema)
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  ✨ Zod의 주요 메서드
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">
                      <code className="text-sm">z.string() / z.number() / z.boolean()</code>
                    </p>
                    <p className="text-sm text-gray-600">
                      기본 타입 정의
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">
                      <code className="text-sm">min() / max() / regex()</code>
                    </p>
                    <p className="text-sm text-gray-600">
                      검증 규칙 설정
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">
                      <code className="text-sm">refine() / superRefine()</code>
                    </p>
                    <p className="text-sm text-gray-600">
                      커스텀 검증 로직 추가
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">
                      <code className="text-sm">z.infer&lt;typeof schema&gt;</code>
                    </p>
                    <p className="text-sm text-gray-600">
                      스키마에서 TypeScript 타입 추론
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🔧 React Hook Form 주요 옵션
                </h3>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">mode</p>
                    <p className="text-sm text-gray-600">
                      검증 시점: 'onSubmit' (기본값) | 'onChange' | 'onBlur' | 'onTouched' | 'all'
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">defaultValues</p>
                    <p className="text-sm text-gray-600">
                      폼의 초기값 설정
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">resolver</p>
                    <p className="text-sm text-gray-600">
                      외부 검증 라이브러리 통합
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded border border-gray-200">
                    <p className="font-semibold text-gray-800 mb-2">reValidateMode</p>
                    <p className="text-sm text-gray-600">
                      오류 발생 후 검증 재실행 시점
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  💡 실무 팁
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>
                    <strong>중첩된 객체 검증:</strong> 복잡한 폼 구조는 Zod의 z.object()를 중첩하여 처리
                  </li>
                  <li>
                    <strong>조건부 검증:</strong> refine()이나 superRefine()으로 필드 간 의존성 표현
                  </li>
                  <li>
                    <strong>배열 검증:</strong> z.array()를 사용하여 동적 폼 필드 처리
                  </li>
                  <li>
                    <strong>에러 메시지:</strong> 사용자 친화적인 메시지를 항상 포함
                  </li>
                  <li>
                    <strong>성능:</strong> 'onSubmit' 모드를 기본으로 사용하여 불필요한 검증 최소화
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  📦 설치 및 설정
                </h3>
                <CodeBlock code={`# 필수 라이브러리 설치
npm install react-hook-form zod @hookform/resolvers

# 주요 패키지 설명
# - react-hook-form: 폼 상태 관리
# - zod: 스키마 검증
# - @hookform/resolvers: 검증 라이브러리 통합`} />
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  🎓 학습 포인트
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Zod와 React Hook Form 조합으로 강력한 타입 안정성 확보</li>
                  <li>Resolver 패턴으로 검증 로직을 폼 라이브러리와 분리</li>
                  <li>스키마로부터 자동 생성된 타입으로 개발 효율성 증대</li>
                  <li>복잡한 검증 규칙도 선언적으로 표현 가능</li>
                  <li>런타임 검증으로 안전한 데이터 처리 보장</li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ExampleNavigation currentNumber={14} />
      </div>
    </div>
  );
}
