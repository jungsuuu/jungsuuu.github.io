"use client";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">대시보드</h1>
      <p className="mt-4 text-gray-600">
        Admin Console에 오신 것을 환영합니다.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">사용자</h3>
          <p className="mt-2 text-3xl font-bold text-blue-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">역할</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">로그</h3>
          <p className="mt-2 text-3xl font-bold text-purple-600">3</p>
        </div>
      </div>
    </div>
  );
}
