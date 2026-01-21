import server from "@/utils/request";

export const useLogin = (parms) => server.post('/auth/login', parms, {
  skipErrorHandler: true // 跳过全局错误处理，由登录页面自己处理
})
