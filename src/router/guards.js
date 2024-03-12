import NProgress from 'nprogress'
import { useStore } from '@/store'
NProgress.configure({ showSpinner: false })

// 免登录的页面
export const loginIgnore = ['/adlogin', '/telogin']

// 加载路由守卫
export default function loadGuards(router) {
  router.beforeEach(async (to, from, next) => {
    if (!NProgress.isStarted()) {
      NProgress.start()
    }
    const store = useStore()
    // 存在token说明已经登录
    if (store.state.user.token) {
      // 判断是否有该路由
      const hasRoute = router.hasRoute(to.name)
      if (hasRoute) {
        await store.commit('process/ADD_PROCESS', {
          keepAlive: to.meta.cacheStatus,
          label: to.meta.title,
          value: to.fullPath,
          name: to.name,
        })
        next()
        // 添加一个面包屑
      } else {
        next({ ...to, replace: true })
      }
    } else {
      // 若是不存在免登录路由里，则跳回登录页
      if (!loginIgnore.includes(to.path)) {
        next({
          path: '/telogin',
          replace: true,
        })
      } else {
        next()
      }
    }
  })
  router.afterEach((to) => {
    if (to.meta.cacheStatus) {
      const store = useStore()
      store.commit('process/RESET_PROCESS_CACHE', {
        name: to.name,
        keepAlive: to.meta.cacheStatus,
      })
    }
    NProgress.done()
  })
}
