"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/src/features/users/schema";
import { useCreateUser } from "@/src/features/users/queries";
import { useRoles } from "@/src/features/roles/queries";
import { useState } from "react";
import type { CreateUserFormData } from "@/src/features/users/schema";

export default function NewUserPage() {
  const router = useRouter();
  const { data: roles = [] } = useRoles();
  const createUser = useCreateUser();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      isActive: true,
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    try {
      setServerError("");
      await createUser.mutateAsync(data as any);
      alert("사용자가 성공적으로 생성되었습니다.");
      router.push("/admin/users");
    } catch (error: any) {
      setServerError(error.message || "사용자 생성 중 오류가 발생했습니다.");
    }
  };

  const passwordValue = watch("password");

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">새 사용자 추가</h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
        {serverError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="홍길동"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* 이메일 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="hong@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* 역할 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              역할
            </label>
            <select
              {...register("roleId")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">역할을 선택하세요</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="mt-1 text-sm text-red-600">
                {errors.roleId.message}
              </p>
            )}
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="최소 8자, 대문자, 숫자, 특수문자 포함"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              최소 8자, 대문자 1개, 숫자 1개, 특수문자(!@#$%^&*) 1개 필수
            </p>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호 확인
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* 활성 상태 */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register("isActive")}
                defaultChecked
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">활성 상태</span>
            </label>
          </div>

          {/* 버튼 */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={createUser.isPending}
              className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {createUser.isPending ? "추가 중..." : "추가"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
