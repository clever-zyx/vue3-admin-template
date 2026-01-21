import axios from "axios";
import { ElMessage } from 'element-plus';
import { useUserStore } from "@/stores/user/useUser";
const server = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 使用代理路径，不需要完整URL
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
// 添加请求拦截器
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const usertoken = useUserStore();
  const token = usertoken.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
server.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  return response.data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  // 如果请求配置中设置了 skipErrorHandler，则跳过全局错误处理
  if (error.config?.skipErrorHandler) {
    return Promise.reject(error);
  }

  if (error.response) {
    const status = error.response.status;
    const responseData = error.response.data;

    // 将错误信息附加到 error 对象上，方便组件获取
    error.statusCode = status;
    error.errorMessage = responseData?.message;

    // 只处理需要全局处理的状态码
    switch (status) {
      case 401:
        // 登录状态失效，跳转到登录页
        ElMessage.error('登录状态失效');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        // window.location.href = '/Login';
        break;
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
    // 网络错误
    ElMessage.error('网络连接失败，请检查网络设置');
  }

  return Promise.reject(error);
});
export default server;