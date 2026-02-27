// 通用API响应结构
export interface ApiResponse<T = unknown> {
  code: number; // 业务状态码
  success: boolean; // 是否成功
  message: string; // 响应消息
  data: T; // 响应数据（泛型）
}

// 分页信息
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 带分页的响应结构（data 和 pagination 平级）
export interface PaginatedResponse<T> {
  code: number;
  data: T[];
  message: string;
  pagination: Pagination;
  success: boolean;



}

