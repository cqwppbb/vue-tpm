﻿import {createRouter, createWebHistory} from 'vue-router'
// import {useUserStore} from '../stores/modules/user';
// import router from '../routers/router';
// createRouter 创建路由实例
// 配置 history 模式
// 1. history模式：createWebHistory     地址栏不带 #
// 2. hash模式：   createWebHashHistory 地址栏带 #
// console.log(import.meta.env.DEV)

// vite 中的环境变量 import.meta.env.BASE_URL  就是 vite.config.js 中的 base 配置项
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, // 登录页
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
        redirect: '/login',
      children: [
        {
          path: '/pm/modify',
          component: () => import('@/views/pm/PmModify.vue'),
        },
        {
          path: '/pm/push',
          component: () => import('@/views/pm/PmPush.vue')
        },
        {
          path: '/pm/record',
          component: () => import('@/views/pm/PmModifyRecord.vue')
        },
        {
          path: '/pm/status',
          component: () => import('@/views/pm/PmFinishRecord.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})
//
// 登录访问拦截 => 默认是直接放行的
// 根据返回值决定，是放行还是拦截
// 返回值：
// 1. undefined / true  直接放行
// 2. false 拦回from的地址页面
// 3. 具体路径 或 路径对象  拦截到对应的地址
//    '/login'   { name: 'login' }
// router.beforeEach((to) => {
//   // 如果没有token, 且访问的是非登录页，拦截到登录，其他情况正常放行
//   const userStore = useUserStore();
//   console.log(userStore.token)
//   if (!userStore.token && to.path !== '/login') return '/login'
//   if (to.matched.length ===0) return '/login'
// })

export default router
