import * as ElIconModules from '@element-plus/icons-vue'
import { useStore } from '@/store'
const store = useStore()
export function loadElementPlusIcons(app) {
  const iconList = []
  for (let key in ElIconModules) {
    iconList.push(key)
    app.component(key, ElIconModules[key])
  }
  // 存下所有的图标集合，用于项目中图标的选择
  store.commit('app/setIcons', iconList)
}
