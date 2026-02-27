import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig
} from "axios";
import { ElMessage } from 'element-plus';
import { useUserStore } from "@/stores/user/useUser";
import router from '@/router';

// 扩展 AxiosRequestConfig 以支持自定义配置
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipErrorHandler?: boolean;
  }
}

// 创建 axios 实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    const token = userStore.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: unknown) => {
    // 类型守卫：检查是否是 axios 错误
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    // 如果请求配置中设置了 skipErrorHandler，则跳过全局错误处理
    if (error.config?.skipErrorHandler) {
      return Promise.reject(error);
    }

    if (error.response) {
      const status = error.response.status;

      // 只处理需要全局处理的状态码
      switch (status) {
        case 401: {
          // 登录状态失效，清除所有用户信息并跳转到登录页
          ElMessage.error('登录状态失效，请重新登录');
          const userStore = useUserStore();
          userStore.clearToken();
          userStore.clearUserInfo();

          // 记住当前页面，登录后跳回
          const currentPath = window.location.pathname + window.location.search;
          router.push({
            path: '/login',
            query: { redirect: currentPath }
          });
          break;
        }
        case 500:
          ElMessage.error('服务器内部错误，请稍后重试');
          break;
        case 502:
          ElMessage.error('网关错误，请稍后重试');
          break;
        case 503:
          ElMessage.error('服务暂时不可用，请稍后重试');
          break;
        // 400, 409, 422 等业务相关错误让组件自己处理
      }
    } else if (error.request) {
      // 网络错误（包括后台服务未启动）
      ElMessage.error('无法连接到服务器，请检查网络或稍后重试');

      // 如果有token，说明用户之前是登录状态，现在无法连接服务器
      const userStore = useUserStore();
      if (userStore.token) {
        userStore.clearToken();
        userStore.clearUserInfo();

        const currentPath = window.location.pathname + window.location.search;
        router.push({
          path: '/login',
          query: { redirect: currentPath }
        });
      }
    }

    return Promise.reject(error);
  }
);

// 创建类型安全的请求包装器
interface TypedAxiosInstance extends AxiosInstance {
  <T = unknown>(config: AxiosRequestConfig): Promise<T>;
  <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

const server = axiosInstance as TypedAxiosInstance;

export default server;