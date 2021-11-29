import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      setItem(TOKEN_KEY, user)
    }
  },
  actions: {
  },
  modules: {
  }
})
