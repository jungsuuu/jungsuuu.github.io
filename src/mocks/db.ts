/**
 * In-memory 데이터베이스
 * 서버 재시작 시 초기화됨 (정상)
 */

import type { User } from "@/src/features/users/types";
import type { Role } from "@/src/features/roles/types";
import type {
  AuditLog,
  AuditAction,
  AuditEntity,
} from "@/src/features/auditLogs/types";

// 역할 데이터
export let rolesDB: Role[] = [
  {
    id: "1",
    name: "최고관리자",
    description: "모든 권한",
    permissions: ["read", "create", "update", "delete", "audit"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    name: "부관리자",
    description: "기본 관리 권한",
    permissions: ["read", "create", "update"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    name: "조회자",
    description: "조회만 가능",
    permissions: ["read"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

// 사용자 데이터
export let usersDB: User[] = [
  {
    id: "1",
    name: "최고관리자",
    email: "admin@example.com",
    roleId: "1",
    isActive: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "홍길동",
    email: "hong@example.com",
    roleId: "2",
    isActive: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "김철수",
    email: "kim@example.com",
    roleId: "3",
    isActive: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
];

// 감시 로그 데이터
export let auditLogsDB: AuditLog[] = [
  {
    id: "1",
    action: "LOGIN",
    entity: "USER",
    entityId: "1",
    actorId: "1",
    actorName: "최고관리자",
    message: "최고관리자가 로그인했습니다.",
    timestamp: new Date("2024-02-10T10:00:00"),
  },
  {
    id: "2",
    action: "CREATE",
    entity: "USER",
    entityId: "2",
    actorId: "1",
    actorName: "최고관리자",
    message: "사용자 홍길동이 생성되었습니다.",
    timestamp: new Date("2024-02-09T14:30:00"),
  },
  {
    id: "3",
    action: "UPDATE",
    entity: "ROLE",
    entityId: "2",
    actorId: "1",
    actorName: "최고관리자",
    message: "역할 부관리자가 수정되었습니다.",
    timestamp: new Date("2024-02-08T09:15:00"),
  },
];

// ID 카운터
export let userIdCounter = 4;
export let roleIdCounter = 4;
export let auditLogIdCounter = 4;

export const newUserIdCounter = () => userIdCounter++;
export const newRoleIdCounter = () => roleIdCounter++;
export const newAuditLogIdCounter = () => auditLogIdCounter++;

/**
 * 감시 로그 추가 유틸리티
 */
export function addAuditLog(
  action: AuditAction,
  entity: AuditEntity,
  entityId: string,
  message: string,
  actorId: string = "1",
  actorName: string = "최고관리자",
) {
  const log: AuditLog = {
    id: String(auditLogIdCounter++),
    action,
    entity,
    entityId,
    actorId,
    actorName,
    message,
    timestamp: new Date(),
  };
  auditLogsDB.push(log);
  return log;
}
