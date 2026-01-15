"use client";

import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Console</h1>
        </div>

        <nav className="space-y-2 p-6">
          <Link
            href="/admin"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition"
          >
            대시보드
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition"
          >
            사용자 관리
          </Link>
          <Link
            href="/admin/roles"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition"
          >
            역할 관리
          </Link>
          <Link
            href="/admin/audit-logs"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded transition"
          >
            감시 로그
          </Link>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
