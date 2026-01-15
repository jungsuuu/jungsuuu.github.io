"use client";

import { useRouter } from "next/navigation";
import { useRoles, useDeleteRole } from "@/src/features/roles/queries";
import { useState } from "react";
import RoleForm from "./_components/RoleForm";

export default function RolesPage() {
  const { data: roles = [], isLoading } = useRoles();
  const deleteRole = useDeleteRole();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingRole, setEditingRole] = useState<string | null>(null);

  const handleDelete = (roleId: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deleteRole.mutate(roleId);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">역할 관리</h1>
        <button
          onClick={() => {
            setEditingRole(null);
            setShowForm(!showForm);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? "닫기" : "+ 역할 추가"}
        </button>
      </div>

      {/* 폼 */}
      {showForm && (
        <div className="mb-8">
          <RoleForm
            onSuccess={() => setShowForm(false)}
            editingRoleId={editingRole}
            onEditComplete={() => {
              setEditingRole(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {/* 테이블 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : roles.length === 0 ? (
        <div className="text-center py-8 text-gray-500">역할이 없습니다.</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  이름
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  설명
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  권한
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {role.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {role.description || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => {
                        setEditingRole(role.id);
                        setShowForm(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(role.id)}
                      className="text-red-600 hover:underline"
                      disabled={deleteRole.isPending}
                    >
                      {deleteRole.isPending ? "삭제 중..." : "삭제"}
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
