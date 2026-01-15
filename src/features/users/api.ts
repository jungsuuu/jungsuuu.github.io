import { apiDelete, apiGet, apiPost, apiPut } from "@/src/lib/api/http";
import { User, UsersListParams } from "./types";

/**
 * 사용자 목록 조회 (필터 지원)
 */
export async function fetchUsers(params?: UsersListParams) {
  return apiGet<User[]>(
    "/users",
    params as Record<string, string | number | boolean | undefined>,
  );
}

/**
 * 특정 사용자 조회
 */
export async function fetchUser(id: string) {
  return apiGet<User>(`/users/${id}`);
}

/**
 * 사용자 생성
 */
export async function createUser(input: any) {
  const { confirmPassword, ...data } = input;
  return apiPost<User>("/users", data);
}

/**
 * 사용자 수정
 */
export async function updateUser(id: string, input: any) {
  const { confirmPassword, ...data } = input;
  return apiPut<User>(`/users/${id}`, data);
}

/**
 * 사용자 삭제
 */
export async function deleteUser(id: string) {
  return apiDelete<{ success: boolean; message: string }>(`/users/${id}`);
}
