import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('useThemeStore', () => {
  // 暗黑模式状态
  const isDark = ref<boolean>(
    localStorage.getItem('isDark') === 'true' || false
  )

  // 主题颜色
  const themeColor = ref<string>(
    localStorage.getItem('themeColor') || '#409EFF'
  )

  // 设置暗黑模式
  const setDarkMode = (dark: boolean) => {
    isDark.value = dark
    localStorage.setItem('isDark', String(dark))
    
    // 应用暗黑模式
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // 设置主题颜色
  const setThemeColor = (color: string) => {
    themeColor.value = color
    localStorage.setItem('themeColor', color)
    
    // 应用主题颜色到 CSS 变量
    document.documentElement.style.setProperty('--el-color-primary', color)
    
    // 生成主题色的各种变体
    for (let i = 1; i <= 9; i++) {
      document.documentElement.style.setProperty(
        `--el-color-primary-light-${i}`,
        lightenColor(color, i / 10)
      )
    }
    
    document.documentElement.style.setProperty(
      '--el-color-primary-dark-2',
      darkenColor(color, 0.2)
    )
  }

  // 初始化主题
  const initTheme = () => {
    setDarkMode(isDark.value)
    setThemeColor(themeColor.value)
  }

  return {
    isDark,
    themeColor,
    setDarkMode,
    setThemeColor,
    initTheme
  }
})

// 颜色变亮
function lightenColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount))
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00FF) + (255 - ((num >> 8) & 0x00FF)) * amount))
  const b = Math.min(255, Math.floor((num & 0x0000FF) + (255 - (num & 0x0000FF)) * amount))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

// 颜色变暗
function darkenColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.max(0, Math.floor((num >> 16) * (1 - amount)))
  const g = Math.max(0, Math.floor(((num >> 8) & 0x00FF) * (1 - amount)))
  const b = Math.max(0, Math.floor((num & 0x0000FF) * (1 - amount)))
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

