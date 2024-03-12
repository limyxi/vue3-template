import { handleMenu } from '@/utils/menu.js'
import { routerList } from '@/utils/menuList.js'
import storage from '@/utils/storage'

const state = () => ({
  // 菜单
  menuGroup: [],
  // 路由
  viewRoutes: [],
  collapse: false,
})

const mutations = {
  setMenuGroup(state, list) {
    state.menuGroup = list
    storage.set('menuGroup', list)
  },
  clearMenuGroup(state) {
    state.menuGroup = []
    storage.remove('menuGroup')
  },
  setViewRoutes(state, list) {
    state.viewRoutes = list
    storage.set('viewRoutes', list)
  },
  clearViewRoutes(state) {
    state.viewRoutes = []
    storage.remove('viewRoutes')
  },
  setCollapse(state, collapse) {
    state.collapse = collapse
    storage.set('collapse', collapse)
  }
}

const actions = {
  async generateRoutes({ commit, rootGetters }) {
    return new Promise((resolve) => {
      // 本地模拟动态获取
      setTimeout(() => {
        // 获取菜单
        const menuList = handleMenu(routerList, 'menu')
        // 设置菜单组
        commit('setMenuGroup', menuList)

        // 获取路由
        const routeList = handleMenu(routerList, 'route')
        // 设置视图路由
        commit('setViewRoutes', routeList)

        resolve(routeList)
      }, 0)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
