import server from "@/utils/request";
import type { ApiResponse } from "@/types/api";
import type { BackendRoute } from "@/router/routeUtils";

// 登录请求参数类型
export interface LoginRequest {
  username: string; // 用户名或邮箱
  password: string; // 密码
}

// 用户信息类型
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  nickname?: string;
  avatar?: string;
  phone?: string;
  roles?: string[];
  isActive?: boolean;
  lastLoginTime?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: unknown; // 允许其他字段
}

// 角色信息类型
export interface RoleInfo {
  id: string;
  name: string;
  displayName: string;
  description?: string;
}

// 权限信息类型
export interface PermissionInfo {
  menus: string[];
  buttons: string[];
}

// 登录响应数据类型
export interface LoginData {
  token: string; // 认证令牌
  user: UserInfo; // 用户信息
  routes: BackendRoute[]; // 动态路由
  permissions: PermissionInfo; // 权限信息
  roles: RoleInfo[]; // 角色信息
}

export const useLogin = (params: LoginRequest) => 
  server.post<ApiResponse<LoginData>>('/auth/login', params)

export const useLogout = () => server.post('/auth/logout')
