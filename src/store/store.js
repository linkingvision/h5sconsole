
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    lang: 'en'
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.h5stoken = data
      state.token = data
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('h5stoken')
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data
    },
    [types.LANG]: (state, data) => {
      localStorage.h5slang = data
      state.lang = data
    }
  }
})