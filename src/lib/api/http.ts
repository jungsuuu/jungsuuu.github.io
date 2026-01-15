import axiosInstance from "./axiosInstance";
import { mockServer } from "@/src/mocks/mockServer";

export interface ApiError {
  code: string;
  message: string;
  status?: number;
}

/**
 * GET 요청 헬퍼 (제네릭 타입 지원)
 * mock 엔드포인트를 mock server로 라우팅
 */
export async function apiGet<
  T,
  P extends Record<string, any> = Record<string, any>,
>(endpoint: string, params?: P): Promise<T> {
  try {
    // Mock 엔드포인트는 mockServer로 라우팅
    if (
      endpoint.startsWith("/users") ||
      endpoint.startsWith("/roles") ||
      endpoint.startsWith("/audit-logs")
    ) {
      return mockServer.get(
        endpoint,
        params as Record<string, string | number | boolean | undefined>,
      ) as Promise<T>;
    }

    // 실제 API 호출
    const response = await axiosInstance.get<T>(endpoint, { params });
    return response as T;
  } catch (error) {
    throw error as ApiError;
  }
}

/**
 * POST 요청 헬퍼 (제네릭 타입 지원)
 * mock 엔드포인트를 mock server로 라우팅
 */
export async function apiPost<
  T,
  B extends Record<string, any> = Record<string, any>,
>(
  endpoint: string,
  body?: B,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  try {
    // Mock 엔드포인트는 mockServer로 라우팅
    if (
      endpoint.startsWith("/users") ||
      endpoint.startsWith("/roles") ||
      endpoint.startsWith("/audit-logs")
    ) {
      return mockServer.post(endpoint, body) as Promise<T>;
    }

    // 실제 API 호출
    const response = await axiosInstance.post<T>(endpoint, body, { params });
    return response as T;
  } catch (error) {
    throw error as ApiError;
  }
}

/**
 * PUT 요청 헬퍼 (제네릭 타입 지원)
 * mock 엔드포인트를 mock server로 라우팅
 */
export async function apiPut<
  T,
  B extends Record<string, any> = Record<string, any>,
>(
  endpoint: string,
  body?: B,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  try {
    // Mock 엔드포인트는 mockServer로 라우팅
    if (
      endpoint.startsWith("/users") ||
      endpoint.startsWith("/roles") ||
      endpoint.startsWith("/audit-logs")
    ) {
      return mockServer.put(endpoint, body) as Promise<T>;
    }

    // 실제 API 호출
    const response = await axiosInstance.put<T>(endpoint, body, { params });
    return response as T;
  } catch (error) {
    throw error as ApiError;
  }
}

/**
 * DELETE 요청 헬퍼 (제네릭 타입 지원)
 * mock 엔드포인트를 mock server로 라우팅
 */
export async function apiDelete<
  T,
  P extends Record<string, any> = Record<string, any>,
>(endpoint: string, params?: P): Promise<T> {
  try {
    // Mock 엔드포인트는 mockServer로 라우팅
    if (
      endpoint.startsWith("/users") ||
      endpoint.startsWith("/roles") ||
      endpoint.startsWith("/audit-logs")
    ) {
      return mockServer.delete(endpoint) as Promise<T>;
    }

    // 실제 API 호출
    const response = await axiosInstance.delete<T>(endpoint, { params });
    return response as T;
  } catch (error) {
    throw error as ApiError;
  }
}
