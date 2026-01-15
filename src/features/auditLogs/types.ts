/**
 * AuditLog 도메인 타입 정의
 */

export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT";
export type AuditEntity = "USER" | "ROLE" | "PERMISSION";

export interface AuditLog {
  id: string;
  action: AuditAction;
  entity: AuditEntity;
  entityId: string;
  actorId: string;
  actorName: string;
  message: string;
  timestamp: Date;
  changes?: Record<string, unknown>;
}

export interface AuditLogsListParams {
  q?: string;
  action?: AuditAction;
  entity?: AuditEntity;
  dateFrom?: string;
  dateTo?: string;
}
