"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/src/features/users/schema";
import { useUser, useUpdateUser } from "@/src/features/users/queries";
import { useRoles } from "@/src/features/roles/queries";
import { useEffect, useState } from "react";
import type { UpdateUserFormData } from "@/src/features/users/schema";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { data: user, isLoading } = useUser(userId);
  const { data: roles = [] } = useRoles();
  const updateUser = useUpdateUser();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (!user || isLoading) {
      return;
    }

    reset({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      isActive: user.isActive,
    });
  }, [isLoading, reset, user]);

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      setServerError("");
      await updateUser.mutateAsync({ id: userId, data: data as any });
      alert("사용자가 성공적으로 수정되었습니다.");
      router.push(`/admin/users/${userId}`);
    } catch (error: any) {
      setServerError(error.message || "사용자 수정 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">로딩 중...</div>;
  }

  if (!user) {
    return (
      <div className="text-center py-8 text-gray-500">
        사용자를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="min-h-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Users / Edit
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            사용자 수정
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            정보 변경 사항을 저장하기 전에 다시 확인하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          목록으로
        </button>
      </div>

      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
        {serverError && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                이름
              </label>
              <input
                type="text"
                {...register("name")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                {...register("email")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              역할
            </label>
            <select
              {...register("roleId")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            >
              <option value="">역할을 선택하세요</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="mt-2 text-sm text-rose-600">
                {errors.roleId.message}
              </p>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                비밀번호 (선택)
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-700">활성 상태</p>
              <p className="text-xs text-slate-500">
                활성화 시 로그인 및 기능 접근이 가능합니다.
              </p>
            </div>
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                {...register("isActive")}
                className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-2 focus:ring-sky-200"
              />
              활성
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              type="submit"
              disabled={updateUser.isPending}
              className="min-w-[180px] rounded-full bg-sky-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              {updateUser.isPending ? "수정 중..." : "변경사항 저장"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="min-w-[140px] rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
