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
    conference:"",
    root:null,
    users:null,
    Adswitch:"false",
    link:'false'
  },
  mutations: {
    // LINK模式
    [types.LINK]: (state, data) => {
      localStorage.h5link= data
      state.link=data
    },

    [types.WATERMARKTOGGLE]: (state, data) => {
      localStorage.h5watermarktoggle= data
      state.watermarktoggle=data
    },
    [types.WATERMARKSTRING]: (state, data) => {
      localStorage.watermarkstring= data
      state.watermarkstring=data
    },
    //回放
    [types.ADSWITCH]: (state, data) => {
      localStorage.h5adswitch= data
      state.Adswitch=data
    },
    // 视频会议
    [types.CONFERENCE]: (state, data) => {
      localStorage.h5conference= data
      state.conference=data
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
    //用户名
    [types.USER]: (state, data) => {
      localStorage.h5suser = data
      state.users = data
    },
    [types.ROOT]: (state, data) => {
      localStorage.h5sroot = data
      state.root = data
    },
    
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('h5stoken')
      state.token = null
      localStorage.removeItem('h5suser')
      state.users = null
      localStorage.removeItem('h5sroot')
      state.root = null
      localStorage.removeItem('h5link')
      state.link = 'false'
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