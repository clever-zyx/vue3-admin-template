import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', () => {
  const token =localStorage.getItem('token')


  return { token,  }
})
