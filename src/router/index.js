import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/views/dashboard'
import Liveview from '@/components/views/liveview'
import Playback from '@/components/views/playback'
import Setting from '@/components/views/setting'
import DevSetting from '@/components/views/setting/device'
import DevSDKSetting from '@/components/views/setting/devicesdk'
import DevRTMPPush from '@/components/views/setting/devicertmppush'
import DevSearch from '@/components/views/setting/devsearch'
import UserSetting from '@/components/views/setting/usersetting'
import H5S from '@/components/h5s'
import Login from '@/components/login'
import Logout from '@/components/logout'
import store from '@/store/store'
import * as types from '@/store/types'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/app/dashboard'
  },
  {
    path: '/app',
    name: 'h5s',
    component: H5S,
    children: [
      {
        path: '/app/liveview',
        name: 'liveviewRouter',
        component: Liveview
      },
      {
        path: '/app/playback',
        name: 'playbackRouter',
        component: Playback
      },
      {
        path: '/app/snapshot',
        name: 'snapshotRouter',
        redirect: {name: 'dashboardRouter'}
      },
      {
        path: '/app/dashboard',
        name: 'dashboardRouter',
        component: Dashboard
      },
      {
        path: '/app/setting',
        name: 'settingRouter',
        meta: {
          requireAuth: true
        },
        component: Setting,
        children: [
          {
            path: '/app/setting/device',
            name: 'devSettingRouter',
            component: DevSetting,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/app/setting/user',
            name: 'userSettingRouter',
            component: UserSetting,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/app/setting/devicesdk',
            name: 'devSDKSettingRouter',
            component: DevSDKSetting,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/app/setting/devicertmppush',
            name: 'devRTMPPushSettingRouter',
            component: DevRTMPPush,
            meta: {
              requireAuth: true
            }
          },
          {
            path: '/app/setting/devsearch',
            name: 'devSearchRouter',
            component: DevSearch,
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      {
        path: '/app/cloud',
        name: 'cloudRouter',
        meta: {
          requireAuth: true
        },
        redirect: {name: 'dashboardRouter'}
      },
      {
        path: '/app/logout',
        name: 'logoutRouter',
        component: Logout
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginRouter',
    component: Login
  }
];

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('h5stoken')) {
  store.commit(types.LOGIN, window.localStorage.getItem('h5stoken'))
}

if (window.localStorage.getItem('h5slang')) {
  console.log('h5slang', window.localStorage.getItem('h5slang'))
  store.commit(types.LANG, window.localStorage.getItem('h5slang'))
}

const Router = new VueRouter({
  routes
});

Router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
})

export default Router;
