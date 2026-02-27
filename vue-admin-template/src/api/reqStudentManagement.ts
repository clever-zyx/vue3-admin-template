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
//学生信息详情类型
export interface StudentInfo {
  id: string;
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
  status?: 'active' | 'suspended' | 'graduated' | 'dropped';
  avatar?: string;
  gpa?: number;
  totalCredits?: number;
  createdAt?: string;
  updatedAt?: string;
}
// 获取学生列表
export async function getStudentList(params: StudentListRequest) {
  return server.get<PaginatedResponse<StudentListItem>>('/students', { params });
}

// 添加学生
export async function addStudent(data: AddStudentRequest) {
  return server.post<ApiResponse<StudentListItem>>('/students', data);
}

// 更新学生信息
export async function updateStudent(id: string, data: AddStudentRequest) {
  return server.put<ApiResponse<StudentListItem>>(`/students/${id}`, data);
}

// 获取学生信息
export async function getStudentInfo(id: string) {
  return server.get<ApiResponse<StudentInfo>>(`/students/${id}`);
}

// 删除学生
export async function deleteStudent(id: string) {
  return server.delete<ApiResponse<StudentListItem>>(`/students/${id}`);
}