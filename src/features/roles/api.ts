import { apiGet, apiPost, apiPut, apiDelete } from "@/src/lib/api/http";
import type { Role, RoleInput, RolesListParams } from "./types";

export async function getRoles(params?: RolesListParams): Promise<Role[]> {
  return apiGet<Role[]>("/roles", params);
}

export async function createRole(input: RoleInput): Promise<Role> {
  return apiPost<Role>("/roles", input);
}

export async function updateRole(id: string, input: RoleInput): Promise<Role> {
  return apiPut<Role>(`/roles/${id}`, input);
}

export async function deleteRole(id: string): Promise<void> {
  return apiDelete<void>(`/roles/${id}`);
}
