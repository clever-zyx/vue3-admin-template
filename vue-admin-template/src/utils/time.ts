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

