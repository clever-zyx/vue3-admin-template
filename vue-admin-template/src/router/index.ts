import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router/routes";
import { useUserStore } from '@/stores/user/useUser'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

/**
 * 检查 JWT Token 是否过期
 * @param token JWT token 字符串
 * @returns true 表示已过期，false 表示未过期
 */
function isTokenExpired(token: string): boolean {
  try {
    // JWT 格式：header.payload.signature
    const payload = token.split('.')[1]
    if (!payload) return true
    
    // Base64 解码
    const decodedPayload = JSON.parse(atob(payload))
    
    // 检查 exp 字段（过期时间戳，单位：秒）
    if (!decodedPayload.exp) {
      // 如果没有 exp 字段，认为 token 永不过期（或由后端控制）
      return false
    }
    
    // 当前时间戳（秒）
    const currentTime = Math.floor(Date.now() / 1000)
    
    // 如果当前时间大于过期时间，说明已过期
    return currentTime > decodedPayload.exp
  } catch (error) {
    // 解析失败，认为 token 无效
    console.error('Token 解析失败:', error)
    return true
  }
}



router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token
  
  // 如果有 token，检查是否过期
  if (token && isTokenExpired(token)) {
    // Token 已过期，清除并跳转登录
    userStore.clearToken()
    userStore.clearUserInfo()
    
    if (to.path !== '/login') {
      // 记住用户想访问的页面，登录后跳回
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }
  
  
  // 如果已登录且访问登录页，跳转到首页或重定向页面
  if (token && to.path === '/login') {
    const redirect = to.query.redirect as string
    next(redirect || '/')
  } 
  // 如果未登录且不访问登录页，跳转到登录页
  else if (!token && to.path !== '/login') {
    // 记住用户想访问的页面
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } 
  // 其他情况正常放行
  else {
    next()
  }
})

router.afterEach(() => {

})

export default router
