import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // 如果后端接口有 /api 前缀就注释掉
      },
    },
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式（重点，决定了后面怎么调用）
      symbolId: 'icon-[name]',
    }),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({ importStyle: 'sass' }),
        // 自动注册图标组件
        (componentName) => {
          if (componentName.startsWith('Icon')) {
            return { name: componentName, from: '@element-plus/icons-vue' }
          }
        }
      ],
    }),

  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content: string, filePath: string) => {
          // 避免在 variable.scss 文件中注入自己，防止循环引用
          if (filePath.includes('variable.scss')) {
            return content
          }
          return `@use "@/style/variable.scss" as *;\n${content}`
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
