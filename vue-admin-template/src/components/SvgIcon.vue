<template>
  <svg :style="{ width, height }" aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  // 图标文件名（不带后缀）
  name: {
    type: String,
    required: true
  },
  // 图标颜色
  color: {
    type: String,
    default: 'currentColor'
  },
  // 图标宽度
  width: {
    type: String,
    default: '1em'
  },
  // 图标高度
  height: {
    type: String,
    default: '1em'
  }
})

// 拼接 symbol ID
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style scoped>
.svg-icon {
  /* 默认让图标继承文字颜色 */
  fill: currentColor;
  overflow: hidden;
  vertical-align: -0.15em; /* 调整对齐 */
}
</style>