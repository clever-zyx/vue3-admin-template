
// import { HomeFilled, Histogram, Tools } from '@element-plus/icons-vue'




// export const baseRoutes = [
//   {
//     path: '/',
//     name: 'main-layout',
//     component: () => import('@/Layout/LayoutView.vue'),
//     children: [
//       {
//         path: '',
//         name: 'home',
//         meta: {
//           title: '首页',
//           icon: HomeFilled,
//           keepAlive: true,
//         },
//         component: () => import('@/view/HomeView.vue'),
//       },
//       {
//         path: '/system',
//         name: 'system',
//         meta: {
//           title: '系统管理',
//           icon: Tools,
//           keepAlive: true,
//         },
//         redirect: '/system/UserManagement',
//         children: [
//           {
//             path: '/system/Management',
//             name: 'Management',
//             meta: {
//               title: '权限管理',
//               icon: Histogram,
//               keepAlive: true,
//             },
//             redirect: '/system/UserManagement',
//             children: [
//               {
//                 path: '/system/UserManagement',
//                 name: 'UserManagement',
//                 meta: {
//                   title: '用户管理',
//                   icon: Histogram,
//                   keepAlive: true,
//                 },
//                 component: () => import('@/view/system/UserManagement.vue'),
//               },
//               {
//                 path: '/system/RoleManagement',
//                 name: 'RoleManagement',
//                 meta: {
//                   title: '角色管理',
//                   icon: Histogram,
//                   keepAlive: true,
//                 },
//                 component: () => import('@/view/system/RoleManagement.vue'),
//               }, {
//                 path: '/system/MenuManagement',
//                 name: 'MenuManagement',
//                 meta: {
//                   title: '菜单管理',
//                   icon: Histogram,
//                   keepAlive: true,
//                 },
//                 component: () => import('@/view/system/MenuManagement.vue'),
//               },
//             ]
//           },
//           {
//             path: '/system/StudentManagement',
//             name: 'StudentManagement',
//             meta: {
//               title: '学生管理',
//               icon: Histogram,
//               keepAlive: true,
//             },
//             component: () => import("@/view/system/StudentManagaement.vue")
//           },
//         ]
//       },
//       {
//         path: 'CommodityManagement',
//         name: 'CommodityManagement',
//         meta: {
//           title: '商品管理',
//           icon: Histogram,
//           keepAlive: true,
//         },
//         redirect: '/CommodityManagement/inventory',
//         children: [
//           {
//             path: '/CommodityManagement/inventory',
//             name: 'inventory',
//             meta: {
//               title: '库存管理',
//               icon: Histogram,
//               keepAlive: true,
//             },
//             component: () => import('@/view/CommodityManagement/inventory.vue'),
//           },
//           {
//             path: '/CommodityManagement/sales',
//             name: 'sales',
//             meta: {
//               title: '销售管理',
//               icon: Histogram,
//               keepAlive: true,
//             },
//             component: () => import('@/view/CommodityManagement/purchase.vue'),
//           },
//         ]
//       }
//     ]
//   },
//   {
//     path: '/DataDashboard',
//     name: 'Data',
//     meta: {
//       title: '数据大屏',
//       icon: Histogram,
//       keepAlive: true,
//       showInMenu: true, // 标记需要在菜单中显示
//     },
//     component: () => import('@/view/DataDashboard/DataDashboard.vue'),
//   },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/view/LoginView.vue'),
//   },
//   {
//     path: '/404',
//     name: '404',
//     component: () => import('@/view/404View.vue'),
//   },
//   {
//     path: '/:pathMatch(.*)*',
//     redirect: '/404',
//   }
// ]

// // 导出菜单列表（包含主布局的子路由 + 标记为显示在菜单中的独立路由）
// export const menuList = [
//   ...(routes[0]?.children || []),
//   ...routes.filter(route => route.meta?.showInMenu)
// ]
// src/router/staticRoutes.ts
import type { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/LoginView.vue'),
    meta: {
      title: '登录',
      requiresAuth: false
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/view/404View.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false
    }
  },
  // 如果数据大屏所有人都能访问，也放这里
  {
    path: '/DataDashboard',
    name: 'DataDashboard',
    component: () => import('@/view/DataDashboard/DataDashboard.vue'),
    meta: {
      title: '数据大屏',
      requiresAuth: true, // 需要登录但不需要特殊权限
      showInMenu: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]
