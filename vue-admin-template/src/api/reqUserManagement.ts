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
export const getUserList=(params: UserListRequest)=>
 server.get<PaginatedResponse<UserListItem>>('/users', { params });

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
export const addUser=(data: updateUserRequest)=>
 server.post<ApiResponse<UserListItem>>('/users', data);

//修改用户信息
export const updateUser=(id: string, data: updateUserRequest)=> 
  server.put<ApiResponse<UserListItem>>(`/users/${id}`, data);


// 用户详情信息
export const getUserInfo = (id: string) => 
  server.get<ApiResponse<UserListItem>>(`/users/${id}`);