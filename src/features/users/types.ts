/**
 * User 도메인 타입 정의
 */

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  roleId: string;
  isActive: boolean;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  roleId: string;
  isActive: boolean;
}

export interface UsersListParams {
  q?: string;
  roleId?: string;
  isActive?: boolean;
}
