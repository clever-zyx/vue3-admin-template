/**
 * 根据当前时间获取问候语
 * @returns {string} 返回对应时间段的问候语
 */
export const getTimeGreeting = (): string => {
  const hour = new Date().getHours()

  if (hour >= 8 && hour <= 11) {
    return '上午好'
  } else if (hour === 12) {
    return '中午好'
  } else if (hour >= 13 && hour <= 19) {
    return '下午好'
  } else {
    return '晚上好'
  }
}

// src/utils/time.ts 或 src/view/DataDashboard/utils/time.ts

/**
 * 格式化日期时间
 * @param date 日期对象，默认为当前时间
 * @param format 格式字符串，默认为 'YYYY.MM.DD HH:mm'
 * @returns 格式化后的时间字符串
 */
export function formatDateTime(date: Date = new Date(), format: string = 'YYYY.MM.DD HH:mm'): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 创建实时时间的 composable
 * @param format 时间格式
 * @param interval 更新间隔（毫秒），默认1000ms
 */
import { onMounted, onUnmounted, ref } from 'vue'
export function useRealTime(format: string = 'YYYY.MM.DD HH:mm', interval: number = 1000) {
  const currentTime = ref(formatDateTime(new Date(), format))
  let timer: number | null = null

  const startTimer = () => {
    timer = window.setInterval(() => {
      currentTime.value = formatDateTime(new Date(), format)
    }, interval)
  }

  const stopTimer = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  onMounted(() => {
    startTimer()
  })

  onUnmounted(() => {
    stopTimer()
  })

  return {
    currentTime,
    startTimer,
    stopTimer
  }
}