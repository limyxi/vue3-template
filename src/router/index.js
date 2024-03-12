import { createRouter, createWebHistory } from 'vue-router'
import { toRaw } from 'vue'
// import loadGuards from './guards'
import constantRoutes from './modules/constant'
import views from './modules/layout'
// import viewRoutes from './modules/asyncRoutes'
import { useStore } from '@/store'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
})

// 获取所有组件
const modules = import.meta.glob('../views/**/*.vue')

// 加载路由
export async function loadRoutes() {
  const store = useStore()
  let viewRoutes = toRaw(store.getters.viewRoutes)

  if (viewRoutes.length) {
    generateDynamicRoutes(viewRoutes)
  } else {
    viewRoutes = await store.dispatch('menu/generateRoutes')
    generateDynamicRoutes(viewRoutes)
  }
}



// 动态添加路由
export function generateDynamicRoutes(list = []) {
  list = list.map((item) => {
    return {
      ...item,
      component: modules[`../views/${item.viewPath}.vue`],
    }
  })

  views.children = views.children.concat(list)
  router.addRoute(views)

  // 在动态路由添加后，在将404添加进入，解决刷新是找不到路由跳转404
  router.addRoute({
    path: '/:pathMatch(.*)',
    redirect: '/404',
  })
}

// loadGuards(router)

export default router