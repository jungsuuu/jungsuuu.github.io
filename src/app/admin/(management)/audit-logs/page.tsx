"use client";

import { useAuditLogs } from "@/src/features/auditLogs/queries";
import { useState } from "react";

export default function AuditLogsPage() {
  const { data: logs = [], isLoading } = useAuditLogs();
  const [filterAction, setFilterAction] = useState("");
  const [filterEntity, setFilterEntity] = useState("");

  // 필터 적용
  const filteredLogs = logs.filter((log) => {
    if (filterAction && log.action !== filterAction) return false;
    if (filterEntity && log.entity !== filterEntity) return false;
    return true;
  });

  const actions = Array.from(new Set(logs.map((l) => l.action)));
  const entities = Array.from(new Set(logs.map((l) => l.entity)));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">감시 로그</h1>

      {/* 필터 */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            액션
          </label>
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">ALL</option>
            {actions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            엔티티
          </label>
          <select
            value={filterEntity}
            onChange={(e) => setFilterEntity(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">ALL</option>
            {entities.map((entity) => (
              <option key={entity} value={entity}>
                {entity}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 테이블 */}
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">로딩 중...</div>
      ) : filteredLogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">로그가 없습니다.</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  시간
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  액션
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  엔티티
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  실행자
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  메시지
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900">
                    {new Date(log.timestamp).toLocaleString("ko-KR")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                      {log.entity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{log.entityId}</td>
                  <td className="px-6 py-4 text-gray-600">{log.actorName}</td>
                  <td className="px-6 py-4 text-gray-900">{log.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
