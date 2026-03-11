import server from "@/utils/request";
import type { ApiResponse } from "@/types/api";

// 登录请求参数类型
export interface LoginRequest {
  username: string; // 用户名或邮箱
  password: string; // 密码
}
// 用户信息类型
export interface UserInfo {
  id?: string | number;
  username?: string;
  email?: string;
  role?: string;
  routes:[]
  [key: string]: unknown; // 允许其他字段
}
// 登录响应数据类型
export interface LoginData {
  token: string; // 认证令牌
  user: UserInfo; // 用户信息
}


export const useLogin = (params: LoginRequest) => 
  server.post<ApiResponse<LoginData>>('/auth/login', params)

export const useLogout = () => server.post('/auth/logout')
