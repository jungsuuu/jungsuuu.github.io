import { apiGet } from "@/src/lib/api/http";
import type { AuditLog, AuditLogsListParams } from "./types";

export async function getAuditLogs(
  params?: AuditLogsListParams,
): Promise<AuditLog[]> {
  return apiGet<AuditLog[]>("/audit-logs", params);
}
