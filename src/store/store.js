
import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    xzvalue:new Date(),
    user: {},
    token: null,
    title: '',
    lang: 'en',
    rtc:"WS",
    tour:"WS",
    watermarkstring:"linkingvision",
    watermarktoggle:"",
  },
  mutations: {
    [types.WATERMARKTOGGLE]: (state, data) => {
      localStorage.h5watermarktoggle= data
      state.watermarktoggle=data
    },
    [types.WATERMARKSTRING]: (state, data) => {
      localStorage.h5watermarkstring= data
      state.watermarkstring=data
    },
    //巡更协议
    [types.TRTCSW]: (state, data) => {
      localStorage.h5toursw= data
      state.tour=data
    },
    //实时播放协议
    [types.RTCSW]: (state, data) => {
      localStorage.h5rtcsw= data
      state.rtc=data
    },
    //..
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