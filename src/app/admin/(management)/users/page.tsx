"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsers, useUser, useUpdateUser } from "@/src/features/users/queries";
import { useDeleteUser } from "@/src/features/users/queries";
import { useRoles } from "@/src/features/roles/queries";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/src/features/users/schema";
import type { UpdateUserFormData } from "@/src/features/users/schema";
import type { User } from "@/src/features/users/types";
import type { Role } from "@/src/features/roles/types";

export default function UsersPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-gray-500">로딩 중...</div>}>
      <UsersPageContent />
    </Suspense>
  );
}

function UsersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedUserId = searchParams.get("id");

  const { data: users = [], isLoading } = useUsers();
  const { data: selectedUser } = useUser(selectedUserId || "");
  const { data: roles = [] } = useRoles();
  const deleteUser = useDeleteUser();
  const [searchQuery, setSearchQuery] = useState("");

  // 역할명 조회 헬퍼
  const getRoleName = (roleId: string) => {
    return roles.find((r) => r.id === roleId)?.name || "미지정";
  };

  // 필터된 사용자 목록
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">사용자 관리</h1>
        <Link
          href="/admin/users/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + 사용자 추가
        </Link>
      </div>

      {/* 검색창 */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="이름 또는 이메일로 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 테이블 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : filteredUsers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">사용자가 없습니다.</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  이메일
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  역할
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  생성일
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {getRoleName(user.roleId)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.isActive ? "활성" : "비활성"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => router.push(`/admin/users?id=${user.id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      상세
                    </button>
                    <button
                      onClick={() => router.push(`/admin/users?id=${user.id}&mode=edit`)}
                      className="text-green-600 hover:underline"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("정말 삭제하시겠습니까?")) {
                          deleteUser.mutate(user.id);
                        }
                      }}
                      className="text-red-600 hover:underline"
                      disabled={deleteUser.isPending}
                    >
                      {deleteUser.isPending ? "삭제 중..." : "삭제"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 사용자 상세 정보 및 수정 섹션 */}
      {selectedUserId && selectedUser && (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* 상세 정보 */}
          {!searchParams.get("mode") && (
            <UserDetailSection 
              user={selectedUser} 
              roles={roles}
              onClose={() => router.push("/admin/users")}
              onEdit={() => router.push(`/admin/users?id=${selectedUserId}&mode=edit`)}
            />
          )}
          
          {/* 수정 폼 */}
          {searchParams.get("mode") === "edit" && (
            <UserEditSection 
              user={selectedUser} 
              roles={roles}
              onClose={() => router.push("/admin/users")}
            />
          )}
        </div>
      )}
    </div>
  );
}

// 사용자 상세 정보 컴포넌트
function UserDetailSection({ 
  user, 
  roles,
  onClose, 
  onEdit 
}: { 
  user: User; 
  roles: Role[];
  onClose: () => void;
  onEdit: () => void;
}) {
  const roleName = roles.find((r) => r.id === user.roleId)?.name || "미지정";

  return (
    <div className="min-h-full rounded-3xl bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Users / Detail
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            사용자 상세
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            수정
          </button>
          <button
            onClick={onClose}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            닫기
          </button>
        </div>
      </div>

      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              이름
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              이메일
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              역할
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
              {roleName}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              상태
            </p>
            <div
              className={`mt-2 inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                user.isActive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {user.isActive ? "활성" : "비활성"}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-xl border border-slate-200 bg-white p-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              생성일
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {new Date(user.createdAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              수정일
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {new Date(user.updatedAt).toLocaleDateString("ko-KR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 사용자 수정 폼 컴포넌트
function UserEditSection({ 
  user, 
  roles,
  onClose
}: { 
  user: User;
  roles: Role[];
  onClose: () => void;
}) {
  const router = useRouter();
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
    reset({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      isActive: user.isActive,
    });
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserFormData) => {
    try {
      setServerError("");
      await updateUser.mutateAsync({ id: user.id, data: data as any });
      alert("사용자가 성공적으로 수정되었습니다.");
      onClose();
    } catch (error: any) {
      setServerError(error.message || "사용자 수정 중 오류가 발생했습니다.");
    }
  };

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
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          닫기
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
              onClick={onClose}
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
