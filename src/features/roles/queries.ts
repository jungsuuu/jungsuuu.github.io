"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRoles, createRole, updateRole, deleteRole } from "./api";
import type { RoleInput, RolesListParams } from "./types";

export function useRoles(params?: RolesListParams) {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: () => getRoles(params),
    staleTime: 30 * 1000,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: RoleInput) => createRole(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: RoleInput }) =>
      updateRole(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
