# Admin Console Demo

Next.js 16 + React 19 + TypeScript 기반 관리자 콘솔 데모 애플리케이션입니다.  
**대상:** React + TypeScript 초급자가 배울 수 있는 실무 패턴을 담은 프로젝트

---

## 🎯 주요 기능

### 1. Mock 백엔드 서버 (실제처럼 동작)
- 메모리 기반 데이터베이스 (Users, Roles, Audit Logs)
- 네트워크 지연 시뮬레이션 (300-500ms)
- REST API 모의: `GET`, `POST`, `PUT`, `DELETE`
- 에러 시나리오: 이메일 중복, 미존재, 검증 오류 등
- 모든 요청이 axios를 거쳐서 실제 백엔드처럼 동작

### 2. Axios 인스턴스 + Interceptors
```typescript
// src/lib/api/axiosInstance.ts
- Request interceptor: 인증 헤더 추가, 요청 로깅
- Response interceptor: 에러 정규화
```
**학습 포인트:** 프로덕션 환경의 HTTP 통신 패턴

### 3. TanStack React Query 캐싱
**같은 파라미터 = 캐시에서 반환 (API 호출 안 함)**

```typescript
useUsers({ roleId: '2' }); // 1번째: 서버에서 요청
useUsers({ roleId: '2' }); // 2번째: 캐시에서 반환
useUsers({ roleId: '3' }); // 3번째: 다른 파라미터이므로 새로운 요청
```

- **staleTime:** 30초 (캐시 유지 시간)
- **gcTime:** 5분 (미사용 캐시 삭제)
- **Invalidation:** 데이터 변경 시 자동으로 캐시 갱신

### 4. Zod + React Hook Form 폼 검증

```typescript
// 비밀번호 규칙: 최소 8자, 대문자, 숫자, 특수문자
const passwordSchema = z
  .string()
  .min(8, '최소 8자')
  .regex(/[A-Z]/, '대문자 포함')
  .regex(/[0-9]/, '숫자 포함')
  .regex(/[!@#$%^&*]/, '특수문자 포함(!@#$%^&*)');

// 비밀번호 일치 검증
.refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});
```

**검증 대상:**
- 사용자: name, email, password, roleId, isActive
- 역할: name, permissions
- 자동 에러 표시 및 폼 제출 차단

### 5. 3가지 도메인 CRUD
- **Users:** 사용자 생성/조회/수정/삭제
- **Roles:** 역할 생성/수정/삭제 (권한 할당)
- **Audit Logs:** 모든 변경 이력 자동 기록

### 6. Admin 대시보드 UI
- 좌측 사이드바 네비게이션
- 반응형 테이블 레이아웃
- 실시간 검색/필터링
- Tailwind CSS 스타일링

---

## 🏗️ 폴더 구조

```
src/
├── features/                    # 도메인 로직
│   ├── users/
│   │   ├── types.ts           # User 타입 정의
│   │   ├── schema.ts          # Zod 검증 스키마
│   │   ├── api.ts             # apiGet/apiPost 래퍼
│   │   └── queries.ts         # React Query 훅
│   ├── roles/
│   │   ├── types.ts
│   │   ├── schema.ts
│   │   ├── api.ts
│   │   └── queries.ts
│   └── auditLogs/
│       ├── types.ts
│       ├── api.ts
│       └── queries.ts
│
├── lib/
│   ├── api/
│   │   ├── axiosInstance.ts   # Axios 인스턴스 + interceptor
│   │   └── http.ts            # apiGet/apiPost/apiPut/apiDelete
│   └── react-query/
│       └── queryClient.ts     # QueryClient 설정
│
├── app/
│   ├── layout.tsx             # 루트 레이아웃 (QueryClientProvider)
│   ├── page.tsx               # 홈 페이지
│   └── admin/
│       ├── layout.tsx         # Admin 레이아웃 (사이드바)
│       ├── page.tsx           # 대시보드
│       ├── users/
│       │   ├── page.tsx       # 사용자 목록
│       │   ├── new/page.tsx   # 사용자 생성
│       │   ├── [id]/page.tsx  # 사용자 상세
│       │   ├── [id]/edit/page.tsx  # 사용자 수정
│       │   └── _components/   # UI 컴포넌트
│       ├── roles/
│       │   ├── page.tsx       # 역할 목록/관리
│       │   └── _components/   # RoleForm 등
│       └── audit-logs/
│           ├── page.tsx       # 로그 조회
│           └── _components/
│
└── mocks/
    ├── db.ts                  # In-memory DB + seed 데이터
    └── mockServer.ts          # Mock API 핸들러
```

---

## 📚 동작 원리 (단계별)

### 데이터 흐름
```
UI 컴포넌트
  ↓
useXxx() (React Query 훅)
  ↓
api.ts (fetchXxx() 함수)
  ↓
http.ts (apiGet/apiPost/apiPut/apiDelete)
  ↓
mockServer (GET/POST/PUT/DELETE)
  ↓
db.ts (메모리 DB)
```

**특징:** 모든 통신이 axios 인스턴스를 거침 → 일관된 에러 처리, 로깅

### 캐싱 예시
```typescript
const { data } = useUsers({ roleId: '2' });    // 호출 1: 서버 요청 (300ms 지연)
const { data } = useUsers({ roleId: '2' });    // 호출 2: 캐시 반환 (즉시)!
                                                // (30초 staleTime 내)
```

### 폼 검증 흐름
```
사용자 입력
  ↓
React Hook Form (상태 관리)
  ↓
Zod (검증)
  ↓
에러 표시 또는 제출
```

---

## 🚀 시작하기

### 필수 요구사항
- **Node.js:** v22 (또는 v24+)
- **npm 또는 yarn**

### 설치 및 실행

```bash
# 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에서 http://localhost:3000 열기

**홈 페이지** → Admin Console 링크 클릭 → `/admin` 접속

### 사용 가능한 명령

```bash
# 개발 서버
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 코드 포맷팅 (Biome)
npm run format

# 린트 검사 (Biome)
npm run lint
```

---

## 📦 기술 스택

| 라이브러리 | 버전 | 용도 |
|----------|------|------|
| **Next.js** | 16.0.0 | React 프레임워크 |
| **React** | 19.2.0 | UI 라이브러리 |
| **TypeScript** | 최신 | 타입 안전성 |
| **Axios** | 최신 | HTTP 클라이언트 |
| **React Query** | @tanstack/react-query | 데이터 캐싱 |
| **Zod** | 최신 | 스키마 검증 |
| **React Hook Form** | 최신 | 폼 상태 관리 |
| **Tailwind CSS** | 최신 | 스타일링 |
| **Biome** | 최신 | 린트/포매팅 |

---

---

## 💡 초급자를 위한 주요 학습 포인트

### 1. API 헬퍼 (타입 안전 HTTP)
```typescript
// axios를 직접 호출하는 대신
const response = await apiGet<User[]>('/users');  // 타입 지정!
```

### 2. Query Key (캐시 식별)
```typescript
// 같은 키 = 같은 캐시 항목
const userKeys = {
  lists: () => ['users', 'list'],
  list: (params) => [...userKeys.lists(), params],
};
```

### 3. Mutation + 캐시 무효화
```typescript
onSuccess: () => {
  // 최신 데이터를 강제로 다시 요청
  queryClient.invalidateQueries({ queryKey: ['users'] });
}
```

### 4. 폼 검증 파이프라인
```
사용자 입력 → React Hook Form (상태) → Zod (검증) → 제출
```

### 5. Interceptor로 횡단 관심사 처리
```typescript
// 모든 요청에 자동으로 인증 헤더 추가
axiosInstance.interceptors.request.use((config) => {
  config.headers['x-demo-auth'] = 'super-admin';
  return config;
});
```

---

## 🧪 Mock Server 테스트 시나리오

### 시나리오 1: 이메일 중복
```
1. 사용자 생성: john@example.com
2. 같은 이메일로 다시 생성 시도
3. 에러: "이미 존재하는 이메일입니다."
```

### 시나리오 2: 캐시 동작
```
1. 사용자 목록 로드 (요청 1) → 300ms 지연
2. 같은 목록 다시 로드 (요청 2) → 즉시 완료 (캐시)!
3. 새 사용자 생성 → 캐시 무효화
4. 사용자 목록 다시 로드 (요청 3) → 300ms 지연 다시 발생
```

### 시나리오 3: 폼 검증
```
비밀번호: "weakpass"     ❌ 대문자 없음
비밀번호: "Weakpass123"  ✅ 유효함 (8자+, 대문자, 숫자 포함)
```

---

## 🔗 API 엔드포인트

모든 엔드포인트는 `mockServer.ts`를 통해 시뮬레이션됩니다:

```
GET    /users              # 사용자 목록 (필터 지원)
POST   /users              # 사용자 생성
PUT    /users/:id          # 사용자 수정
DELETE /users/:id          # 사용자 삭제

GET    /roles              # 역할 목록
POST   /roles              # 역할 생성
PUT    /roles/:id          # 역할 수정
DELETE /roles/:id          # 역할 삭제

GET    /audit-logs         # 감시 로그 조회
```

**GET /users 쿼리 파라미터:**
- `q`: 이름/이메일로 검색
- `roleId`: 역할 필터
- `isActive`: 활성 상태 필터

---

## 📝 발표자 팁

1. **홈 페이지에서 시작** → 기능 개요 설명
2. **Admin Users 이동** → 비어있는 상태 보여주기
3. **사용자 생성** → 폼 검증 시연 (잘못된 비밀번호 입력)
4. **두 번째 사용자 생성** → 캐시 적중 보여주기 (300ms 지연 없음!)
5. **수정/삭제** → mutation과 재요청 시연
6. **개발자 도구 열기** → axios interceptor 콘솔 로그 확인

---

## 🎓 초급자 친화적 코드 특징

- **최소한의 주석:** 코드 구조 자체가 명확함
- **일관된 네이밍:** `useUsers`, `useCreateUser` 패턴
- **작은 파일 크기:** 각 컴포넌트는 단일 책임
- **TypeScript 사용:** `any` 타입 없음
- **친절한 에러 메시지:** 사용자 입장의 메시지

---

## 📌 주의사항

### Mock Server 재시작 시 데이터 초기화
서버를 재시작하면 모든 데이터가 초기값으로 돌아갑니다. (메모리 기반이므로 정상)

### 실제 백엔드 연결
`src/lib/api/http.ts`의 라우팅 로직을 수정하면 실제 서버로 변경 가능합니다.

---

## 📄 라이선스

교육용 프로젝트. 자유롭게 사용, 수정, 배포 가능합니다.

**Questions?** Refer to the code comments and AGENT.md for implementation details.
