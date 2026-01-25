
import { HomeFilled, Histogram,Tools } from '@element-plus/icons-vue'

export const routes = [
  {
    path: '/',
    name: 'main-layout',
    component: () => import('@/Layout/LayoutView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        meta: {
          title: '首页',
          icon: HomeFilled,
          keepAlive: true,
        },
        component: () => import('@/view/HomeView.vue'),
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          title: '系统管理',
          icon: Tools,
          keepAlive: true,
        },
        redirect: '/system/RoleManagement',
        children: [
          {
            path: '/system/RoleManagement',
            name: 'RoleManagement',
            meta: {
              title: '权限管理',
              icon: Histogram,
              keepAlive: true,
            },
            component: () => import('@/view/system/RoleManagement.vue'),
          },
          {
            path: '/system/UserManagement',
            name: 'UserManagement',
            meta: {
              title: '用户管理',
              icon: Histogram,
              keepAlive: true,
            },
            component: () => import('@/view/system/UserManagement.vue'),
          },
        ]
      }
    ]
  },
  {
    path: '/DataDashboard',
    name: 'Data',
    meta: {
      title: '数据大屏',
      icon: Histogram,
      keepAlive: true,
      showInMenu: true, // 标记需要在菜单中显示
    },
    component: () => import('@/view/DataDashboard.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/LoginView.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/view/404View.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }
]

// 导出菜单列表（包含主布局的子路由 + 标记为显示在菜单中的独立路由）
export const menuList = [
  ...(routes[0]?.children || []),
  ...routes.filter(route => route.meta?.showInMenu)
]
