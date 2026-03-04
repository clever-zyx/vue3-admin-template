import server from '@/utils/request';
import type { PaginatedResponse, ApiResponse } from "@/types/api";



export interface RoleListItem {
  id?: string;
  username: string;
  email: string;
  nickname: string;
  roleId: string;
  name: string;
  description?: string;
  status?: 'active' | 'inactive';
  createdAt?: string;
  updatedAt?: string;
}
export interface RoleListRequest {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}
// 获取角色列表
export const getUesRoleList = (params: RoleListRequest) =>
  server.get<PaginatedResponse<RoleListItem>>('/roles', { params })
export interface RoleInfoItem {
  "id": string,
  "name": string,
  "displayName": string,
  "description": string,
  "menuIds":[],
  "isActive": boolean,
  "createdAt": string,
  "updatedAt": string
}
//获取角色详情
export const getRoleInfo = (id: string) =>
  server.get<ApiResponse<RoleInfoItem>>(`/roles/${id}`)
