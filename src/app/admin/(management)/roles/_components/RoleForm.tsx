"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { roleSchema } from "@/src/features/roles/schema";
import {
  useCreateRole,
  useUpdateRole,
  useRoles,
} from "@/src/features/roles/queries";
import { useState, useEffect } from "react";
import type { RoleFormData } from "@/src/features/roles/schema";

const PERMISSION_OPTIONS = ["read", "create", "update", "delete", "audit"];

interface RoleFormProps {
  onSuccess: () => void;
  editingRoleId?: string | null;
  onEditComplete: () => void;
}

export default function RoleForm({
  onSuccess,
  editingRoleId,
  onEditComplete,
}: RoleFormProps) {
  const { data: roles = [] } = useRoles();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
  });

  const selectedPermissions = watch("permissions") || [];

  // 수정 모드일 때 폼 초기화
  useEffect(() => {
    if (editingRoleId) {
      const role = roles.find((r) => r.id === editingRoleId);
      if (role) {
        reset({
          name: role.name,
          description: role.description,
          permissions: role.permissions,
        });
      }
    } else {
      reset({
        name: "",
        description: "",
        permissions: [],
      });
    }
  }, [editingRoleId, roles, reset]);

  const togglePermission = (permission: string) => {
    if (selectedPermissions.includes(permission)) {
      setValue(
        "permissions",
        selectedPermissions.filter((p) => p !== permission),
      );
    } else {
      setValue("permissions", [...selectedPermissions, permission]);
    }
  };

  const onSubmit = async (data: RoleFormData) => {
    try {
      setServerError("");

      if (editingRoleId) {
        await updateRole.mutateAsync({ id: editingRoleId, input: data });
        alert("역할이 수정되었습니다.");
        onEditComplete();
      } else {
        await createRole.mutateAsync(data);
        alert("역할이 생성되었습니다.");
        onSuccess();
      }
    } catch (error: any) {
      setServerError(error.message || "오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {editingRoleId ? "역할 수정" : "새 역할 추가"}
      </h2>

      {serverError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 역할명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            역할명
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="예: 관리자"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            설명
          </label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="역할 설명"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* 권한 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            권한
          </label>
          <div className="space-y-2">
            {PERMISSION_OPTIONS.map((permission) => (
              <label key={permission} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 capitalize">
                  {permission}
                </span>
              </label>
            ))}
          </div>
          {errors.permissions && (
            <p className="mt-2 text-sm text-red-600">
              {errors.permissions.message}
            </p>
          )}
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={createRole.isPending || updateRole.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {editingRoleId ? "수정" : "추가"}
          </button>
        </div>
      </form>
    </div>
  );
}
