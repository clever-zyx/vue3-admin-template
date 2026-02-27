/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  // 可以添加更多环境变量类型
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

