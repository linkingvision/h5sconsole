// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
import axios from '@/http'
import store from '@/store/store'
import VeeValidate from 'vee-validate'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import * as types from '@/store/types'

Vue.use(VeeValidate)
Vue.use(iView)

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
