import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import type { UserInfo } from '@/api/reqUseLogin'
import type { RouteRecordRaw } from 'vue-router'
import { transformRoutes, type BackendRoute } from '@/router/routeUtils'
import { notFoundRoute } from '@/router/baseRoutes'

export const useUserStore = defineStore('useUserStore', () => {
  const token = ref(localStorage.getItem('token') || '')

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  const userInfo = ref<UserInfo | null>(
    localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null
  )

  const setUserInfo = (newUserInfo: UserInfo) => {
    userInfo.value = newUserInfo
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
  }

  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('userInfo')
  }

  // 动态路由相关
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  const hasLoadedRoutes = ref(false) // 标记是否已加载路由
  const userMenus = ref<RouteRecordRaw[]>([]) // 用户菜单数据

  const userRoutes = ref<BackendRoute[]>(
    localStorage.getItem('userRoutes') ? JSON.parse(localStorage.getItem('userRoutes')!) : []
  )

  const setUserRoutes = (newUserRoutes: BackendRoute[]) => {
    userRoutes.value = newUserRoutes
    localStorage.setItem('userRoutes', JSON.stringify(newUserRoutes))
  }

  /**
   * 加载动态路由
   * 将后端返回的路由数据转换并添加到路由表中
   */
  const loadDynamicRoutes = () => {
    if (hasLoadedRoutes.value || !userRoutes.value || userRoutes.value.length === 0) {
      return
    }

    // 转换后端路由数据，区分布局路由和独立路由
    const { layoutRoutes, independentRoutes } = transformRoutes(userRoutes.value)

    // 创建主布局路由（只包含需要布局的页面）
    if (layoutRoutes.length > 0) {
      const layoutRoute: RouteRecordRaw = {
        path: '/',
        name: 'main-layout',
        component: () => import('@/Layout/LayoutView.vue'),
        children: layoutRoutes
      }
      router.addRoute(layoutRoute)
    }

    // 添加独立路由（如数据大屏）
    independentRoutes.forEach(route => {
      router.addRoute(route)
    })

    // 添加 404 通配路由（必须在最后添加）
    router.addRoute(notFoundRoute)

    // 保存动态路由和菜单数据
    dynamicRoutes.value = [...layoutRoutes, ...independentRoutes]
    
    // 菜单数据：布局路由 + 独立路由（但独立路由在菜单中显示，点击时跳转到独立页面）
    const menuRoutes = [...layoutRoutes]
    
    // 将独立路由也添加到菜单中（用户可以从菜单访问）
    independentRoutes.forEach(route => { menuRoutes.push({
        ...route,
        meta: {
          ...route.meta,
          isIndependent: true // 标记为独立路由
        }
      })
    })
    
    userMenus.value = menuRoutes

    // 标记已加载
    hasLoadedRoutes.value = true
  }

  /**
   * 清除动态路由
   */
  const clearDynamicRoutes = () => {
    dynamicRoutes.value = []
    userMenus.value = []
    hasLoadedRoutes.value = false
    userRoutes.value = []
    localStorage.removeItem('userRoutes')
  }

  /**
   * 退出登录
   */
  const lougout = () => {
    clearToken()
    clearUserInfo()
    clearDynamicRoutes()
    router.push('/login')
  }

  return {
    token,
    setToken,
    clearToken,
    userInfo,
    setUserInfo,
    setUserRoutes,
    clearUserInfo,
    lougout,
    dynamicRoutes,
    hasLoadedRoutes,
    userMenus,
    userRoutes,
    loadDynamicRoutes,
    clearDynamicRoutes
  }
})
