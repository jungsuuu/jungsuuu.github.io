"use client";

import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/src/features/users/queries";
import { useRoles } from "@/src/features/roles/queries";

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;
  const { data: user, isLoading } = useUser(userId);
  const { data: roles = [] } = useRoles();

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
          <p className="mt-2 text-sm text-slate-500">
            사용자 정보와 상태를 한눈에 확인할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push(`/admin/users/${userId}/edit`)}
            className="rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
          >
            수정
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            뒤로
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
