/**
 * Mock 서버 구현
 * axios → http.ts → mockServer 흐름으로 통신 시뮬레이션
 */

import type { Role, RoleInput } from "@/src/features/roles/types";
import type { User } from "@/src/features/users/types";
import {
  addAuditLog,
  auditLogsDB,
  newRoleIdCounter,
  newUserIdCounter,
  roleIdCounter,
  rolesDB,
  userIdCounter,
  usersDB,
} from "./db";

/**
 * 네트워크 지연 시뮬레이션
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * API 에러 응답
 */
interface ApiErrorResponse {
  code: string;
  message: string;
  status?: number;
}

/**
 * Mock 서버 핸들러
 */
export const mockServer = {
  /**
   * GET 요청 처리
   */
  async get(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<unknown> {
    await delay(300);

    // ===== Users =====
    if (endpoint === "/users") {
      let filtered = [...usersDB];

      // 검색 필터
      if (params?.q) {
        const query = String(params.q).toLowerCase();
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query),
        );
      }

      // 역할 필터
      if (params?.roleId) {
        filtered = filtered.filter((u) => u.roleId === String(params.roleId));
      }

      // 활성 상태 필터
      if (params?.isActive !== undefined) {
        const isActive = params.isActive === "true" || params.isActive === true;
        filtered = filtered.filter((u) => u.isActive === isActive);
      }

      return filtered;
    }

    // 특정 사용자 조회
    if (endpoint.startsWith("/users/")) {
      const userId = endpoint.split("/")[2];
      const user = usersDB.find((u) => u.id === userId);
      if (!user) {
        throw {
          code: "NOT_FOUND",
          message: "사용자를 찾을 수 없습니다.",
          status: 404,
        } as ApiErrorResponse;
      }
      return user;
    }

    // ===== Roles =====
    if (endpoint === "/roles") {
      let filtered = [...rolesDB];

      if (params?.q) {
        const query = String(params.q).toLowerCase();
        filtered = filtered.filter((r) => r.name.toLowerCase().includes(query));
      }

      return filtered;
    }

    // 특정 역할 조회
    if (endpoint.startsWith("/roles/")) {
      const roleId = endpoint.split("/")[2];
      const role = rolesDB.find((r) => r.id === roleId);
      if (!role) {
        throw {
          code: "NOT_FOUND",
          message: "역할을 찾을 수 없습니다.",
          status: 404,
        } as ApiErrorResponse;
      }
      return role;
    }

    // ===== Audit Logs =====
    if (endpoint === "/audit-logs") {
      let filtered = [...auditLogsDB].sort(
        (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
      );

      if (params?.q) {
        const query = String(params.q).toLowerCase();
        filtered = filtered.filter((log) =>
          log.message.toLowerCase().includes(query),
        );
      }

      if (params?.action) {
        filtered = filtered.filter(
          (log) => log.action === String(params.action),
        );
      }

      if (params?.entity) {
        filtered = filtered.filter(
          (log) => log.entity === String(params.entity),
        );
      }

      return filtered;
    }

    throw {
      code: "NOT_FOUND",
      message: "엔드포인트를 찾을 수 없습니다.",
      status: 404,
    } as ApiErrorResponse;
  },

  /**
   * POST 요청 처리
   */
  async post(endpoint: string, body?: unknown): Promise<unknown> {
    await delay(500);

    // ===== Users 생성 =====
    if (endpoint === "/users") {
      const input = body as any;

      // 필수 필드 확인
      if (!input.name || !input.email || !input.roleId) {
        throw {
          code: "VALIDATION_ERROR",
          message: "필수 필드를 확인하세요.",
          status: 400,
        } as ApiErrorResponse;
      }

      // 이메일 중복 확인
      if (usersDB.some((u) => u.email === input.email)) {
        throw {
          code: "DUPLICATE_EMAIL",
          message: "이미 존재하는 이메일입니다.",
          status: 409,
        } as ApiErrorResponse;
      }

      // 역할 존재 확인
      if (!rolesDB.find((r) => r.id === input.roleId)) {
        throw {
          code: "INVALID_ROLE",
          message: "유효하지 않은 역할입니다.",
          status: 400,
        } as ApiErrorResponse;
      }

      const newUser: User = {
        id: String(newUserIdCounter),
        name: input.name,
        email: input.email,
        roleId: input.roleId,
        isActive: input.isActive ?? true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      usersDB.push(newUser);

      // 감시 로그 추가
      addAuditLog(
        "CREATE",
        "USER",
        newUser.id,
        `사용자 ${newUser.name}이(가) 생성되었습니다.`,
      );

      return newUser;
    }

    // ===== Roles 생성 =====
    if (endpoint === "/roles") {
      const input = body as RoleInput;

      if (!input.name || !input.permissions || input.permissions.length === 0) {
        throw {
          code: "VALIDATION_ERROR",
          message: "역할명과 권한을 확인하세요.",
          status: 400,
        } as ApiErrorResponse;
      }

      // 역할명 중복 확인
      if (rolesDB.some((r) => r.name === input.name)) {
        throw {
          code: "DUPLICATE_ROLE",
          message: "이미 존재하는 역할명입니다.",
          status: 409,
        } as ApiErrorResponse;
      }

      const newRole: Role = {
        id: String(newRoleIdCounter()),
        name: input.name,
        description: input.description,
        permissions: input.permissions,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      rolesDB.push(newRole);

      addAuditLog(
        "CREATE",
        "ROLE",
        newRole.id,
        `역할 ${newRole.name}이(가) 생성되었습니다.`,
      );

      return newRole;
    }

    throw {
      code: "BAD_REQUEST",
      message: "잘못된 요청입니다.",
      status: 400,
    } as ApiErrorResponse;
  },

  /**
   * PUT 요청 처리
   */
  async put(endpoint: string, body?: unknown): Promise<unknown> {
    await delay(500);

    // ===== Users 수정 =====
    if (endpoint.startsWith("/users/")) {
      const userId = endpoint.split("/")[2];
      const userIndex = usersDB.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        throw {
          code: "NOT_FOUND",
          message: "사용자를 찾을 수 없습니다.",
          status: 404,
        } as ApiErrorResponse;
      }

      const input = body as any;
      const oldUser = usersDB[userIndex];

      // 이메일 중복 확인 (현재 사용자 제외)
      if (input.email && input.email !== oldUser.email) {
        if (usersDB.some((u) => u.email === input.email && u.id !== userId)) {
          throw {
            code: "DUPLICATE_EMAIL",
            message: "이미 존재하는 이메일입니다.",
            status: 409,
          } as ApiErrorResponse;
        }
      }

      // 역할 존재 확인
      if (input.roleId && !rolesDB.find((r) => r.id === input.roleId)) {
        throw {
          code: "INVALID_ROLE",
          message: "유효하지 않은 역할입니다.",
          status: 400,
        } as ApiErrorResponse;
      }

      const updatedUser: User = {
        ...oldUser,
        name: input.name ?? oldUser.name,
        email: input.email ?? oldUser.email,
        roleId: input.roleId ?? oldUser.roleId,
        isActive:
          input.isActive !== undefined ? input.isActive : oldUser.isActive,
        updatedAt: new Date(),
      };

      usersDB[userIndex] = updatedUser;

      addAuditLog(
        "UPDATE",
        "USER",
        userId,
        `사용자 ${updatedUser.name}이(가) 수정되었습니다.`,
      );

      return updatedUser;
    }

    // ===== Roles 수정 =====
    if (endpoint.startsWith("/roles/")) {
      const roleId = endpoint.split("/")[2];
      const roleIndex = rolesDB.findIndex((r) => r.id === roleId);

      if (roleIndex === -1) {
        throw {
          code: "NOT_FOUND",
          message: "역할을 찾을 수 없습니다.",
          status: 404,
        } as ApiErrorResponse;
      }

      const input = body as RoleInput;
      const oldRole = rolesDB[roleIndex];

      if (!input.name || !input.permissions || input.permissions.length === 0) {
        throw {
          code: "VALIDATION_ERROR",
          message: "역할명과 권한을 확인하세요.",
          status: 400,
        } as ApiErrorResponse;
      }

      // 역할명 중복 확인 (현재 역할 제외)
      if (
        input.name !== oldRole.name &&
        rolesDB.some((r) => r.name === input.name)
      ) {
        throw {
          code: "DUPLICATE_ROLE",
          message: "이미 존재하는 역할명입니다.",
          status: 409,
        } as ApiErrorResponse;
      }

      const updatedRole: Role = {
        ...oldRole,
        name: input.name,
        description: input.description,
        permissions: input.permissions,
        updatedAt: new Date(),
      };

      rolesDB[roleIndex] = updatedRole;

      addAuditLog(
        "UPDATE",
        "ROLE",
        roleId,
        `역할 ${updatedRole.name}이(가) 수정되었습니다.`,
      );

      return updatedRole;
    }

    throw {
      code: "BAD_REQUEST",
      message: "잘못된 요청입니다.",
      status: 400,
    } as ApiErrorResponse;
  },

  /**
   * DELETE 요청 처리
   */
  async delete(endpoint: string): Promise<unknown> {
    await delay(400);

    // ===== Users 삭제 =====
    if (endpoint.startsWith("/users/")) {
      const userId = endpoint.split("/")[2];
      const userIndex = usersDB.findIndex((u) => u.id === userId);

      if (userIndex === -1) {
        throw {
          code: "NOT_FOUND",
          message: "사용자를 찾을 수 없습니다.",
          status: 404,
        } as ApiErrorResponse;
      }

      const deletedUser = usersDB[userIndex];
      usersDB.splice(userIndex, 1);

      addAuditLog(
        "DELETE",
        "USER",
        userId,
        `사용자 ${deletedUser.name}이(가) 삭제되었습니다.`,
      );

      return { success: true, message: "사용자가 삭제되었습니다." };
    }

    // ===== Roles 삭제 =====
    if (endpoint.startsWith("/roles/")) {
      const roleId = endpoint.split("/")[2];
      const roleIndex = rolesDB.findIndex((r) => r.id === roleId);

      if (roleIndex === -1) {
        throw {
          code: "NOT_FOUND",
          message: "역할을 찾을 수 없습니다.",
          status: 404,
        } as ApiErrorResponse;
      }

      // 이 역할을 사용하는 사용자가 있는지 확인
      if (usersDB.some((u) => u.roleId === roleId)) {
        throw {
          code: "ROLE_IN_USE",
          message: "이 역할을 사용 중인 사용자가 있어 삭제할 수 없습니다.",
          status: 409,
        } as ApiErrorResponse;
      }

      const deletedRole = rolesDB[roleIndex];
      rolesDB.splice(roleIndex, 1);

      addAuditLog(
        "DELETE",
        "ROLE",
        roleId,
        `역할 ${deletedRole.name}이(가) 삭제되었습니다.`,
      );

      return { success: true, message: "역할이 삭제되었습니다." };
    }

    throw {
      code: "BAD_REQUEST",
      message: "잘못된 요청입니다.",
      status: 400,
    } as ApiErrorResponse;
  },
};
