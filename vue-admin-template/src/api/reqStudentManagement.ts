import server from "@/utils/request";
import type { PaginatedResponse,ApiResponse } from "@/types/api";
// 学生列表请求参数
export interface StudentListRequest {
  page: number;
  limit: number;
  search?: string;
  classID?: string;
  majorId?: string;
  gradeId?: string;
  status?: string;
}
// 学生列表项
export interface StudentListItem {
  id?: string;
  studentId: string;
  name: string;
  gender: '男' | '女'; 
  birthDate: string;
  phone: string;
  email: string;
  idcard?: string;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  classId: string;
  majorId: string;
  grade: string;
  enrollmentDate?: string; 
  status?: 'active' | 'inactive';
  avatar?: string;
  gpa?: number;
  totalCredits?: number;
  createdAt?: string; 
  updatedAt?: string; 
}

// 添加学生的请求类型
export interface AddStudentRequest {
  studentId: string;  // 学号
  name: string;       // 姓名
  gender: '男' | '女'; // 性别
  birthDate: string;  // 出生日期
  phone: string;      // 手机号
  email: string;      // 邮箱
  idcard?: string;    // 身份证号
  address?: string;   // 地址
  emergencyContact?: string;  // 紧急联系人
  emergencyPhone?: string;    // 紧急联系电话
  classId: string;    // 班级ID
  majorId: string;    // 专业ID
  grade: string;      // 年级
  enrollmentDate?: string;  // 入学日期
}
// 获取学生列表
export const getStudentList = (params: StudentListRequest) => 
  server.get('/students', { params }) as unknown as Promise<PaginatedResponse<StudentListItem>>;
//添加学生
export const addStudent = (data: AddStudentRequest) => 
  server.post('/students', data) as unknown as Promise<ApiResponse<StudentListItem>>;

// 更新学生信息
export const updateStudent = (id: string, data: AddStudentRequest) => 
  server.put(`/students/${id}`, data) as unknown as Promise<ApiResponse<StudentListItem>>;
//获取学生信息
export const getStudentInfo = (id: string) => 
  server.get(`/students/${id}`) as unknown as Promise<ApiResponse<StudentListItem>>;
// 删除学生
export const deleteStudent = (id: string) => 
  server.delete(`/students/${id}`) as unknown as Promise<ApiResponse<StudentListItem>>;