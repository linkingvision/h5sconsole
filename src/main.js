// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangZhCHS from '../static/lang/zhchs'
import LangZhCHT from '../static/lang/zhcht'

import 'jquery'
import 'jquery-ui'
/* import ampleadmin */
import './assets/material/bootstrap/dist/css/bootstrap.min.css'
import './assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css'
import './assets/material/css/animate.css'
import './assets/material/css/style.css'
import './assets/material/css/colors/default.css'
// import './assets/material/css/colors/megna-dark.css'
import './assets/plugins/bower_components/jquery/dist/jquery.min'
import './assets/material/bootstrap/dist/js/bootstrap.min'
import './assets/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min'
import './assets/material/js/jquery.slimscroll'
import './assets/material/js/waves'
import './assets/material/js/custom.min'
import './assets/plugins/bower_components/styleswitcher/jQuery.style.switcher'

import './assets/icon/iconfont.css'//字体图标

import axios from '@/http'
import store from '@/store/store'
import VeeValidate from 'vee-validate'
const config = {
    //errorBagName: 'errorBags', // change if property conflicts.
    fieldsBagName: 'fieldBags',
};

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as types from '@/store/types'

import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'
Vue.use(vueEventCalendar, {locale: 'zh'}) //可以设置语言，支持中文和英文


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(VeeValidate, config)
//Vue.use(VeeValidate)
Vue.use(iView)

import event from '@/components/views/js/event'
Vue.prototype.EVENT = event
Vue.prototype.$http = axios
Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const bus = new Vue()
Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zhchs',
  messages: {
    'en': LangEn,
    'zhchs': LangZhCHS,
    'zhcht': LangZhCHT
  }
})

i18n.locale = store.state.lang

/* this.$i18n.locale='zhCHS' */
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
  data: {
    bus
  }
})
