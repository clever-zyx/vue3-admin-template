import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

interface UserInfo {
  id: string
  username: string
  email: string
  nickname: string
  avatar: string
  phone: string
  role: string
  isActive: boolean
  lastLoginTime: string
  createdAt: string
  updatedAt: string
  roleDisplayName: string
  permissions: string[]
}

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
    localStorage.getItem('userInfo')  ? JSON.parse(localStorage.getItem('userInfo')!)  : null
  )
  
  const setUserInfo = (newUserInfo: UserInfo) => {
    userInfo.value = newUserInfo
    localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
  }
  
  const clearUserInfo = () => {
    userInfo.value = null
    localStorage.removeItem('userInfo')
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
    clearUserInfo,
    lougout
  }
})
