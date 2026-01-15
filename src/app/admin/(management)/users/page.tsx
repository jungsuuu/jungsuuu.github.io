"use client";

import Link from "next/link";
import { useUsers } from "@/src/features/users/queries";
import { useDeleteUser } from "@/src/features/users/queries";
import { useRoles } from "@/src/features/roles/queries";
import { useState } from "react";

export default function UsersPage() {
  const { data: users = [], isLoading } = useUsers();
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
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      상세
                    </Link>
                    <Link
                      href={`/admin/users/${user.id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      수정
                    </Link>
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
    </div>
  );
}
