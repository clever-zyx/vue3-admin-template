import server from "@/utils/request";
import {type PaginatedResponse } from "@/types/api";
 
export interface ClassListItem {
  id?: string;
  classId: string;
  name: string;
  majorId: string;
  grade: string;
  status?: 'active' | 'inactive';
  createdAt?: string; 
  updatedAt?: string; 
}
export interface ClassListRequest {
  page: number;
  limit: number;
  search?: string;
  majorId?: string;
  gradeId?: string;
  isActive?: string;
}
// 获取班级列表
export async function getClassList(params: ClassListRequest) {
  return server.get<PaginatedResponse<ClassListItem>>('/classes', { params });
}