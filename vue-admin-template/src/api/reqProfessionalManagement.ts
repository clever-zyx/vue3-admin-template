import server from "@/utils/request";
import {type PaginatedResponse } from "@/types/api";
export interface MajorsListRequest {
  page: number;
  limit: number;
  search?: string;
  deparmtent?: string;
  isActive?: string;
}
export interface MajorsListItem {
  id?: string;
  professionalId: string;
  name: string;
  majorId: string;
  grade: string;
  status?: 'active' | 'inactive';
  createdAt?: string; 
  updatedAt?: string; 
}
// 获取专业列表
export const getMajorsList = (params: MajorsListRequest) => 
  server.get('/majors', { params }) as unknown as Promise<PaginatedResponse<MajorsListItem>>