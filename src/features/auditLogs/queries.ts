"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "./api";
import type { AuditLogsListParams } from "./types";

export function useAuditLogs(params?: AuditLogsListParams) {
  return useQuery({
    queryKey: ["auditLogs", params],
    queryFn: () => getAuditLogs(params),
    staleTime: 30 * 1000, // 30초
  });
}
