import { toRaw } from 'vue'

export default {
  // 用户token
  token: (state) => state.user.token,
  // 菜单是否折叠
  menuCollapse: (state) => state.menu.collapse,
  // 菜单列表
  menuGroup: (state) => toRaw(state.menu.menuGroup),
  // 路由列表
  viewRoutes: (state) => toRaw(state.menu.viewRoutes),
}
