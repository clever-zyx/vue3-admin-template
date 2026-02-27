import server from "@/utils/request";
import type{ PaginatedResponse,ApiResponse } from "@/types/api";

export type UserListItem = {
  id?: string;
  username: string;
  email: string;
  nickname?: string;
  phone?: string;
  role: string;
  avatar?: string;
  isActive?: boolean;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}
export interface UserListRequest {
  page: number;
  limit: number;
  search?: string;
  role?: string;
  status?: string;
}
// 获取用户列表
export async function getUserList(params: UserListRequest) {
  return server.get<PaginatedResponse<UserListItem>>('/users', { params });
}
export interface updateUserRequest{
  username: string;
  email: string;
  password?: string;
  nickname: string;
  phone: string;
  role: string;
  isActive: boolean;
}
// 添加用户
export async function addUser(data: updateUserRequest) {
  return server.post<ApiResponse<UserListItem>>('/users', data);
}
//修改用户信息
export async function updateUser(id: string, data: updateUserRequest) {
  return server.put<ApiResponse<UserListItem>>(`/users/${id}`, data);
}
// 用户详情信息
export async function getUserInfo(id: string) {
  return server.get<ApiResponse<UserListItem>>(`/users/${id}`);
}