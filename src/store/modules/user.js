import storage from '@/utils/storage'

const state = () => ({
  token: storage.get('token') || null,
  userInfo: storage.get('userInfo') || {},
})

const mutations = {
  setToken(state, token) {
    state.token = token
    storage.set('token', token)
  },
  clearToken(state) {
    state.token = null
    storage.remove('token')
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    storage.set('userInfo', userInfo)
  },
  clearUserInfo(state) {
    state.userInfo = null
    storage.remove('userInfo')
  },
}

const actions = {
  login() {

  },
  logout({ commit }) {
    commit('clearToken')
    commit('clearUserInfo')
  },
}

export default {
  namespaced: true,
  state,
  actions: actions,
  mutations: mutations,
}
