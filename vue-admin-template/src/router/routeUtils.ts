import type { RouteRecordRaw } from 'vue-router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 后端路由数据类型
export interface BackendRoute {
  id: string
  path: string
  name: string
  title: string
  icon?: string
  component: string | null
  parentId: string | null
  sort: number
  isVisible: boolean
  keepAlive: boolean
  type: string
  children?: BackendRoute[]
}

// 组件映射表
const componentMap: Record<string, () => Promise<any>> = {
  // 首页
  '@/view/HomeView.vue': () => import('@/view/HomeView.vue'),

  // 系统管理
  '@/view/system/UserManagement.vue': () => import('@/view/system/UserManagement.vue'),
  '@/view/system/RoleManagement.vue': () => import('@/view/system/RoleManagement.vue'),
  '@/view/system/MenuManagement.vue': () => import('@/view/system/MenuManagement.vue'),
  '@/view/system/StudentManagaement.vue': () => import('@/view/system/StudentManagaement.vue'),

  // 商品管理
  '@/view/CommodityManagement/inventory.vue': () => import('@/view/CommodityManagement/inventory.vue'),
  '@/view/CommodityManagement/purchase.vue': () => import('@/view/CommodityManagement/purchase.vue'),

  // 数据大屏
  '@/view/DataDashboard.vue': () => import('@/view/DataDashboard/DataDashboard.vue'),

  // 404页面
  '@/view/404View.vue': () => import('@/view/404View.vue')
}

/**
 * 将后端路由数据转换为 Vue Router 路由配置
 */
export const transformRoutes = (routes: BackendRoute[]): { layoutRoutes: RouteRecordRaw[], independentRoutes: RouteRecordRaw[] } => {
  const layoutRoutes: RouteRecordRaw[] = []
  const independentRoutes: RouteRecordRaw[] = []

  routes.forEach(route => {
    const transformedRoute = transformRoute(route)

    // 判断是否为独立路由（数据大屏等全屏页面）
    if (isIndependentRoute(route)) {
      independentRoutes.push(transformedRoute)
    } else {
      layoutRoutes.push(transformedRoute)
    }
  })

  return { layoutRoutes, independentRoutes }
}

/**
 * 判断是否为独立路由（不需要布局的页面）
 */
const isIndependentRoute = (route: BackendRoute): boolean => {
  // 数据大屏等全屏页面
  const independentPaths = ['/DataDashboard']
  return independentPaths.includes(route.path)
}

/**
 * 转换单个路由
 */
const transformRoute = (route: BackendRoute): RouteRecordRaw => {
  const routeRecord: any = {
    path: route.path,
    name: route.name,
    meta: {
      title: route.title,
      icon: getIcon(route.icon),
      keepAlive: route.keepAlive,
      isVisible: route.isVisible
    }
  }

  // 处理组件路径
  if (route.component) {
    const component = componentMap[route.component]

    if (component) {
      routeRecord.component = component
    } else {
      console.warn(`❌ 组件映射未找到: ${route.component}`)
    }
  }

  // 递归处理子路由
  if (route.children && route.children.length > 0) {
    routeRecord.children = route.children.map(child => transformRoute(child))

    // 如果有子路由但没有组件，设置重定向到第一个子路由
    if (!route.component && route.children.length > 0) {
      const firstChild = findFirstLeafRoute(route.children)
      if (firstChild) {
        routeRecord.redirect = firstChild.path
      }
    }
  }

  return routeRecord
}

/**
 * 查找第一个叶子路由（有组件的路由）
 */
const findFirstLeafRoute = (routes: BackendRoute[]): BackendRoute | null => {
  for (const route of routes) {
    if (route.component) {
      return route
    }
    if (route.children && route.children.length > 0) {
      const leaf = findFirstLeafRoute(route.children)
      if (leaf) return leaf
    }
  }
  return null
}

/**
 * 获取 Element Plus 图标组件
 */
const getIcon = (iconName?: string) => {
  if (!iconName) return undefined
  return (ElementPlusIconsVue as any)[iconName]
}

/**
 * 添加组件映射（运行时动态添加）
 */
export const addComponentMapping = (componentPath: string, importFn: () => Promise<any>) => {
  componentMap[componentPath] = importFn
}