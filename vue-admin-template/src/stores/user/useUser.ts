import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import type { UserInfo } from '@/api/reqUseLogin'
import type { RouteRecordRaw } from 'vue-router'
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
  //路由
  const dynamicRoutes = ref<RouteRecordRaw[]>([])
  const hasLoadedRoutes = ref(false) // 标记是否已加载路由
  const userMenus = ref<any[]>([]) // 用户菜单数据

  const userRoutes = ref<any>(
    localStorage.getItem('userRoutes') ? JSON.parse(localStorage.getItem('userRoutes')!) : null
  )
  const setUserRoutes = (newUserRoutes: any) => {
    userRoutes.value = newUserRoutes
    localStorage.setItem('userRoutes', JSON.stringify(newUserRoutes))
  }

  const lougout = () => {
    clearToken()
    clearUserInfo()
  
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
  }
})
