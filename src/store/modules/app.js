import storage from '@/utils/storage'

const state = () => ({
  // 全局默认尺寸
  elementSize: 'default',
  // 国际化
  lang: 'zh',
  // 所有图标集合
  icons: [],
  // 默认分页条数
  pageSize: 20
})

const mutations = {
  setElementSize(state, size) {
    state.elementSize = size
    storage.set('elementSize', size)
  },
  setLang(state, lang) {
    state.lang = lang
    storage.set('lang', lang)
  },
  setIcons(state, icons) {
    state.icons = icons
    storage.set('icons', icons)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
