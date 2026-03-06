<template>
  <el-drawer v-model="visible" title="主题设置" direction="rtl" size="300px">
    <div class="settings-container">
      <!-- 暗黑模式切换 -->
      <div class="setting-item">
        <div class="setting-label">
          <el-icon><Moon /></el-icon>
          <span>暗黑模式</span>
        </div>
        <el-switch v-model="isDark" @change="toggleDarkMode" />
      </div>

      <el-divider />

      <!-- 主题颜色选择 -->
      <div class="setting-item">
        <div class="setting-label">
          <el-icon><Brush /></el-icon>
          <span>主题颜色</span>
        </div>
        <el-color-picker v-model="themeColor" @change="changeThemeColor" :predefine="predefineColors" />
      </div>

      <el-divider />

      <!-- 预设颜色快捷选择 -->
      <div class="setting-item">
        <div class="setting-label">
          <span>预设主题</span>
        </div>
        <div class="preset-colors">
          <div v-for="color in predefineColors" :key="color" class="color-item" :style="{ backgroundColor: color }"
            @click="selectPresetColor(color)" :class="{ active: themeColor === color }">
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Moon, Brush } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/theme/useTheme'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark, themeColor } = storeToRefs(themeStore)

const visible = defineModel<boolean>('visible', { default: false })

// 预设颜色
const predefineColors = ref([
  '#409EFF', // Element Plus 默认蓝色
  '#67C23A', // 绿色
  '#E6A23C', // 橙色
  '#F56C6C', // 红色
  '#909399', // 灰色
  '#722ED1', // 紫色
  '#13C2C2', // 青色
  '#EB2F96', // 粉色
])

// 切换暗黑模式
const toggleDarkMode = (value: boolean) => {
  themeStore.setDarkMode(value)
}

// 改变主题颜色
const changeThemeColor = (value: string | null) => {
  if (value) {
    themeStore.setThemeColor(value)
  }
}

// 选择预设颜色
const selectPresetColor = (color: string) => {
  themeColor.value = color
  themeStore.setThemeColor(color)
}
</script>

<style scoped lang="scss">
.settings-container {
  padding: 10px;

  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .setting-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: var(--el-text-color-primary);
    }
  }

  .preset-colors {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    width: 100%;
    margin-top: 10px;

    .color-item {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid transparent;

      &:hover {
        transform: scale(1.1);
      }

      &.active {
        border-color: var(--el-text-color-primary);
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>

