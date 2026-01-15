/**
 * Role 도메인 타입 정의
 */

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleInput {
  name: string;
  description?: string;
  permissions: string[];
}

export interface RolesListParams {
  q?: string;
}
