"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  fetchUser,
  fetchUsers,
  updateUser,
} from "@/src/features/users/api";
import {
  UpdateUserInput,
  User,
  UsersListParams,
} from "@/src/features/users/types";

/**
 * Query key factory for type-safe cache management
 *
 * React Query는 캐시 데이터를 고유한 키(queryKey)로 구분합니다.
 * 이 객체는 키 생성 규칙을 한곳에서 관리하여 일관성을 보장합니다.
 *
 * 예시:
 * - userKeys.all → ['users']
 * - userKeys.lists() → ['users', 'list']
 * - userKeys.list() → ['users', 'list', undefined]
 * - userKeys.detail('123') → ['users', 'detail', '123']
 *
 * as const는 배열/객체의 타입을 고정시켜 타입 안전성을 높입니다.
 */
const userKeys = {
  // 모든 사용자 관련 쿼리의 최상위 키
  // 이 키로 무효화하면 사용자 관련 모든 캐시가 초기화됨
  all: ["users"] as const,

  // 사용자 목록 쿼리용 기본 키
  // lists() → ['users', 'list']
  // 함수 형태: 다른 함수에서 재사용하기 위함
  lists: () => [...userKeys.all, "list"] as const,

  // 파라미터를 포함한 사용자 목록 쿼리 키
  // list() → ['users', 'list', undefined]
  // list({ page: 1 }) → ['users', 'list', { page: 1 }]
  // 같은 파라미터 = 같은 키 = 캐시된 데이터 반환
  list: (params?: UsersListParams) => [...userKeys.lists(), params] as const,

  // 단일 사용자 상세 쿼리용 기본 키
  // details() → ['users', 'detail']
  details: () => [...userKeys.all, "detail"] as const,

  // 특정 ID의 사용자 상세 쿼리 키
  // detail('user-1') → ['users', 'detail', 'user-1']
  // detail('user-2') → ['users', 'detail', 'user-2']
  detail: (id: string) => [...userKeys.details(), id] as const,
};

/**
 * Hook to fetch users list with caching
 * Same params = same queryKey = cached data returned (no new request)
 */
export function useUsers(params?: UsersListParams) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => fetchUsers(params),
    staleTime: 1000 * 60, // 60 seconds
  });
}

/**
 * Hook to fetch single user
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
    staleTime: 1000 * 60,
  });
}

/**
 * Hook to create user
 */
export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: User) => createUser(input),
    onSuccess: () => {
      // Invalidate users list to refetch
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });
}

/**
 * Hook to update user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) =>
      updateUser(id, data),
    onSuccess: (updatedUser) => {
      // Update the specific user in cache
      queryClient.setQueryData(
        ["users", "detail", updatedUser.id],
        updatedUser,
      );

      // Invalidate users list to refetch
      queryClient.invalidateQueries({
        queryKey: ["users", "list"],
      });
    },
  });
}

/**
 * Hook to delete user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      // Invalidate all users queries to refetch
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
}
