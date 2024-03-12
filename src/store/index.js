import { createStore } from 'vuex'
import getters from './getters'

const files = import.meta.globEager('./modules/*.js')

let modules = {}
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
  modules[moduleName] = module
})


export const store = createStore({
  modules,
  getters,
  mutations: {},
  actions: {},
})

export function useStore() {
  return store
}

export default store
