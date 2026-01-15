```md
# Copilot Agent Instructions (Next.js Admin CRUD Demo) - 한글

너는 Next.js 16 + React 19 + TypeScript 기반 프로젝트에서 동작하는 코딩 에이전트야.
목표는 “관리자(Admin) 콘솔” 형태의 데모 앱을 만드는 것.
백엔드는 없으므로 mock-server(지연 Promise)로 **통신하는 것처럼** 보이게 구현한다.
코드는 React + TypeScript 초급자도 이해할 수 있도록 단순하고 설명 가능하게 작성하고,
README.md에는 발표자료로 쓸 수 있게 기능별 요약 설명을 추가한다.

---

## 0) 프로젝트 스펙 (Hard Constraints)
- Node: **v22** 기준으로 레포 설정 (개발 PC는 v24일 수 있음)
- Next.js: **16.0.0**
- React: **19.2.0**
- TypeScript: 사용
- 사용 라이브러리: axios, zod, react-hook-form, @hookform/resolvers, @tanstack/react-query, tailwindcss
- lint/format: **Biome** (ESLint/Prettier 추가 금지)

---

## 1) 구현해야 하는 핵심 기능 (Must Implement)
### (1) 초급자 친화 코드 + README 설명
- 코드 구조/타입/훅 사용이 과하지 않게, “왜 이렇게 하는지”가 보이도록 작성
- README.md에 각 기능(axios, mock-server, form validation, react-query 캐싱, 도메인별 화면)을 짧게 설명

### (2) Admin 콘솔에서 CRUD (Mock 통신)
- 실서버 없음 → `new Promise(resolve => setTimeout(...))` 형태로 통신 지연
- **모든 데이터 변경/조회는 API 레이어를 거치도록** 작성(컴포넌트에서 DB 직접 접근 금지)

### (3) Axios 인스턴스 + Interceptor + API 헬퍼 함수
- axios instance 생성
- request/response interceptor 추가(가짜 auth header, 개발 로그, 에러 정규화)
- 아래 원형의 함수 시그니처는 반드시 지켜서 구현하고 실제로 사용:
  - `apiGet<T>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>`
  - `apiPost<T>(endpoint: string, body?: unknown, params?: Record<string, string | number | boolean | undefined>): Promise<T>`
- CRUD를 위해 필요하면 `apiPut/apiDelete`도 추가 구현 가능(하지만 위 2개가 핵심)

### (4) “최고관리자(super-admin)가 sub-admin 등록” 폼 검증
- zod + react-hook-form + zodResolver(@hookform/resolvers)로 폼 검증 구현
- 비밀번호 규칙 예시(대문자/숫자/특수문자 포함) + confirmPassword 매칭 refine 포함

### (5) TanStack Query 캐싱
- 사용자 조회에서 동일 queryKey/params면 mock-server를 다시 호출하지 않고 캐시 데이터 사용
- staleTime/cacheTime 등을 설정하고 README에 “왜 캐시가 되는지” 예시로 설명

---

## 2) 라우팅/디렉토리 구조 (App Router) - 필수 적용
아래 구조를 기준으로 Next.js App Router를 구성해. “URL=폴더경로”가 직관적으로 보이도록 한다.
언더스코어 폴더(`_components`)는 라우트로 인식되지 않으니 적극 사용한다.

### 추천 구조 (명확한 URL 기반)
```text
src/
└─ app/
   ├─ layout.tsx                 # 전체 앱 레이아웃 (QueryClientProvider 포함)
   ├─ page.tsx                   # / (홈)
   │
   └─ admin/
      ├─ layout.tsx              # /admin 공통 레이아웃 (사이드바, 헤더)
      ├─ page.tsx                # /admin (대시보드)
      │
      ├─ users/
      │  ├─ page.tsx             # /admin/users (사용자 목록)
      │  ├─ new/
      │  │  └─ page.tsx          # /admin/users/new (사용자 등록)
      │  ├─ [id]/
      │  │  ├─ page.tsx          # /admin/users/:id (사용자 상세)
      │  │  └─ edit/
      │  │     └─ page.tsx       # /admin/users/:id/edit (사용자 수정)
      │  └─ _components/          # 라우트에 포함되지 않는 UI 컴포넌트
      │     ├─ UserTable.tsx
      │     ├─ UserForm.tsx
      │     └─ UserDetail.tsx
      │
      ├─ roles/
      │  ├─ page.tsx             # /admin/roles (역할 목록/관리)
      │  └─ _components/
      │     ├─ RoleTable.tsx
      │     └─ RoleForm.tsx
      │
      └─ audit-logs/
         ├─ page.tsx             # /admin/audit-logs (변경 이력 조회)
         └─ _components/
            └─ AuditLogTable.tsx
```

- `src/app/admin/layout.tsx`에서 QueryClientProvider가 아니라 “Admin UI(사이드바/탭)”를 구성
- QueryClientProvider는 `src/app/layout.tsx`에서 전체 앱을 감싸도록 구성

---

## 3) Feature(도메인) 확장: 추천 조합 A로 구현 (필수)
기능을 Users 하나로 끝내지 말고 아래 3개 도메인으로 구성한다.

1) **Users**
- 사용자 CRUD
- 사용자에 Role 할당 가능(예: roleId 또는 roleIds)
- 목록 필터 예시: q(검색), roleId, isActive

2) **Roles/Permissions**
- Role CRUD(예: Admin, SubAdmin, Viewer 등)
- User 등록/수정 시 Role 선택 UI 제공(학습용)

3) **Audit Logs**
- 변경 이력 로그
- 예: user 생성/수정/삭제, role 생성/수정/삭제가 발생할 때 로그 기록
- 로그는 읽기 중심(조회 페이지 제공)

---

## 4) 폴더 구조 (비즈니스/공용 코드)
Route(app)와 도메인(features), 공용(lib)을 분리한다.

```text
src/
├─ features/
│  ├─ users/
│  │  ├─ types.ts               # User, UserInput 타입 정의
│  │  ├─ schema.ts              # zod 스키마 (폼 검증)
│  │  ├─ api.ts                 # apiGet/apiPost 래핑 함수
│  │  └─ queries.ts             # useUsers, useCreateUser 등 React Query 훅
│  │
│  ├─ roles/
│  │  ├─ types.ts
│  │  ├─ schema.ts
│  │  ├─ api.ts
│  │  └─ queries.ts
│  │
│  └─ auditLogs/
│     ├─ types.ts
│     ├─ api.ts
│     └─ queries.ts
│
├─ lib/
│  ├─ api/
│  │  ├─ axiosInstance.ts       # axios 인스턴스 + interceptor
│  │  ├─ http.ts                # apiGet / apiPost / apiPut / apiDelete
│  │  └─ errors.ts              # ApiError 타입 정의
│  │
│  └─ react-query/
│     └─ queryClient.ts         # QueryClient 설정
│
└─ mocks/
   ├─ db.ts                     # in-memory DB + seed 데이터
   └─ mockServer.ts             # endpoint별 mock API 처리 + delay
```

- `features/*/api.ts`는 `apiGet/apiPost/...`를 호출하는 “도메인 API 함수”
- `features/*/queries.ts`는 React Query 훅(`useUsers`, `useRoles`, `useAuditLogs` 등)
- 컴포넌트는 가능한 `src/app/admin/.../_components`에 배치(학습자에게 “페이지-컴포넌트”가 보이게)

---

## 5) Mock Server 요구사항 (실서버처럼 보이게)
### (1) In-memory DB + Seed
- `src/mocks/db.ts`에서 users/roles/auditLogs 배열 유지
- ID는 안정적으로 증가하는 형태(예: number id auto increment)
- seed 데이터 약간 넣기(Users 3~5명, Roles 3개, Logs 몇 개)

### (2) Delay(지연) 필수
- `delay(ms)` 유틸로 모든 요청에 200~600ms 정도 지연을 랜덤/고정으로 적용

### (3) 라우팅(핸들러) 구현
`src/mocks/mockServer.ts`에서 endpoint 기반으로 동작하게 구현한다.

- Users
  - `GET /users` (params: q, roleId, isActive)
  - `POST /users` (create)
  - `PUT /users/:id` (update)
  - `DELETE /users/:id` (delete)

- Roles
  - `GET /roles`
  - `POST /roles`
  - `PUT /roles/:id`
  - `DELETE /roles/:id`

- Audit Logs
  - `GET /audit-logs` (params: q, action, entity, dateFrom/dateTo 정도는 옵션)

### (4) 에러 시나리오 (학습용)
- users: duplicate email → 409 같은 느낌의 에러 코드
- users/roles: not found → 404 느낌
- 서버 에러 형태는 통일: `{ code: string; message: string }`

### (5) “모든 통신은 axios helper를 통해”
- 컴포넌트에서 mockServer 직접 호출 금지
- `http.ts`에서 endpoint를 보고 mockServer로 forwarding하는 방식 권장(초급자에게 쉬움)

---

## 6) Axios 규칙 (필수)
### axiosInstance.ts
- baseURL: `/api` (실제 서버처럼 보이게)
- request interceptor:
  - `x-demo-auth: super-admin` 헤더 추가(가짜 인증)
  - 개발 환경에서 method + url 콘솔 로그(너무 과하지 않게)
- response interceptor:
  - 성공: data를 반환(혹은 http.ts에서 unwrap)
  - 실패: `ApiError { code: string; message: string; status?: number }`로 정규화

### http.ts
- 아래 2개는 반드시 export + 사용
  - `apiGet<T>(endpoint, params?)`
  - `apiPost<T>(endpoint, body?, params?)`
- 필요 시:
  - `apiPut<T>(endpoint, body?, params?)`
  - `apiDelete<T>(endpoint, params?)`
- 제네릭 타입을 정확히 사용하고 `any`는 피한다.

---

## 7) React Query 규칙 (필수)
- `src/lib/react-query/queryClient.ts`에서 QueryClient 생성
- `src/app/layout.tsx`에서 QueryClientProvider로 앱 전체 감싸기

### Query Key 규칙
- Users: `['users', params]`
- Roles: `['roles']` 또는 `['roles', params]`
- AuditLogs: `['auditLogs', params]`

### 캐싱(요구사항 5 충족)
- Users 조회 훅 `useUsers(params)`:
  - `staleTime`을 30s~60s 정도로 설정하여 동일 params면 캐시 활용
  - README에 “같은 params로 다시 렌더링/이동 시 서버 호출이 줄어든다” 예시 작성

### Mutation 후 처리
- 성공 시 invalidateQueries로 간단하게 처리(초급자에게 명확)
  - 예: user 생성/수정/삭제 시 `invalidateQueries({ queryKey: ['users'] })`
  - role 변경 시도 관련 리스트 invalidate
- Audit log는 데이터 변경 시 mockServer에서 함께 기록하고,
  - 로그 페이지에서 조회 시 캐싱 적용

---

## 8) UI 요구사항 (Tailwind, 단순/명확)
- Admin 레이아웃: 좌측 사이드바(Users / Roles / Audit Logs)
- Users 페이지:
  - 테이블(이름/이메일/Role/활성/생성일/액션)
  - 생성 버튼 → `/admin/users/new`로 이동(또는 모달, 하지만 초급자 친화면 페이지 분리 권장)
- Roles 페이지:
  - Role 목록/생성/수정/삭제(간단)
- Audit Logs:
  - 테이블(시간/액션/엔티티/대상ID/메시지/actor)

접근성:
- form label 연결, 버튼 텍스트 명확

---

## 9) Zod + React Hook Form 폼 (super-admin이 sub-admin 등록)
필드 예시:
- name: 최소 2자
- email: 이메일 형식
- roleId: roles에서 선택(기본 sub-admin 역할)
- password: 최소 8자, 대문자 1 + 숫자 1 + 특수문자 1 포함
- confirmPassword: password와 일치(refine)
- isActive: 기본 true

제출 흐름:
- zodResolver → 검증 통과 시 create user mutation 호출
- 성공 시 안내 메시지(간단) + 이동(`/admin/users`) 또는 폼 reset

---

## 10) README.md (발표용 요약 섹션 필수)
README에 아래 섹션을 포함해.
1. Tech Stack(버전 포함)
2. 데모가 보여주는 것(요구사항 5개 매핑)
3. Mock server 개념(딜레이 + in-memory DB)
4. Axios instance + interceptors(왜 쓰는지)
5. Zod + RHF validation 흐름(입력→검증→submit)
6. React Query 캐싱 예시(queryKey + staleTime로 “같은 값은 캐시 사용”)
7. 실행 방법(Node 22, install, dev)
8. Biome 스크립트(린트/포맷)

짧은 bullet 위주 + 작은 코드 스니펫만(과한 긴 코드 금지)

---

## 11) Biome 규칙 (필수)
- Biome으로 포맷/린트가 깨지지 않게
- import 정리, unused 제거
- type import 적극 활용
- `any` 지양, unknown → 좁히기

---

## 12) 최종 산출물 기대치
- Admin 콘솔에서 Users/Roles/Audit Logs가 실제로 동작해야 함
- 모든 통신은 axios helper → http.ts → mockServer 흐름으로 통일
- React Query 캐싱이 눈에 보이게 동작(동일 params에서 재호출 감소)
- 초급자가 따라 할 수 있는 수준의 코드와 README 설명

바로 구현을 시작해.
```
