import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/components/views/dashboard'
import Liveview from '@/components/views/liveview'
import Archive from '@/components/views/archive'
import AdvancePB from '@/components/views/Advancepbs'
import Gaogao1 from '@/components/views/gaogao1'
import Sreenshots from '@/components/views/screenshots'
import Playback from '@/components/views/playback'
import camera from '@/components/views/camera'
import avintercom from '@/components/views/avintercom'

import Tour from '@/components/views/tour'
//import AdvancePB from '@/components/views/Advancepb'
import Event from '@/components/views/event'


import cloud from '@/components/views/cloud'
import clouds from '@/components/views/cloud/clouds'

import Settings from '@/components/views/settings'
import devices from '@/components/views/settings/devices'
import devicesdks from '@/components/views/settings/devicesdks'
import devicertmppushs from '@/components/views/settings/devicertmppushs'
import records from '@/components/views/settings/record'
import usersettings from '@/components/views/settings/usersetting'

import GB from '@/components/views/GB'
import GB28181 from '@/components/views/GB/GB28181'
import GBplatform from '@/components/views/GB/GBplatform'

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
        path: '/app/camera',
        name: 'cameraRouter',
        component: camera
      },
      {
        path: '/app/avintercom',
        name: 'avintercomRouter',
        component: avintercom
      },
      {
        path: '/app/AdvancePB',
        name: 'AdvancePBRouter',
        component: AdvancePB
      },
      {
        path: '/app/GB',
        name: 'GBRouter',
        meta: {
          requireAuth: true
        },
        component: GB,
        children: [
          //1
          {
            path: '/app/GB/GB28181',
            name: 'GB28181Router',
            component: GB28181,
            meta: {
              requireAuth: true
            }
          },
          //2
          {
            path: '/app/GB/GBplatform',
            name: 'GBplatformRouter',
            component: GBplatform,
            meta: {
              requireAuth: true
            }
          },
        ]
      },
      {
        path: '/app/Gaogao1',
        name: 'Gaogao1Router',
        component: Gaogao1
      },
      {
        path: '/app/archive',
        name: 'archiveRouter',
        component: Archive
      },
      {
        path: '/app/event',
        name: 'eventRouter',
        component: Event
      },
      {
        path: '/app/Tour',
        name: 'TourRouter',
        component: Tour
      },
      {
        path: '/app/screenshots',
        name: 'screenshotsRouter',
        component: Sreenshots
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
        path: '/app/cloud',
        name: 'cloudRouter',
        component: cloud,
        meta: {
          requireAuth: true
        },
        children: [
          //1
          {
            path: '/app/cloud/clouds',
            name: 'cloudsRouter',
            component: clouds,
            meta: {
              requireAuth: true
            }
          }
        ]
      },
      //样式   管理
      {
        path: '/app/settings',
        name: 'settingsRouter',
        meta: {
          requireAuth: true
        },
        component: Settings,
        children: [
          //1
          {
            path: '/app/setting/devices',
            name: 'devicesRouter',
            component: devices,
            meta: {
              requireAuth: true
            }
          },
          //2
          {
            path: '/app/setting/devicesdks',
            name: 'devicesdksRouter',
            component: devicesdks,
            meta: {
              requireAuth: true
            }
          },
          //3
          {
            path: '/app/setting/devicertmppushs',
            name: 'devicertmppushsRouter',
            component: devicertmppushs,
            meta: {
              requireAuth: true
            }
          },
          //4
          {
            path: '/app/setting/records',
            name: 'recordsRouter',
            component: records,
            meta: {
              requireAuth: true
            }
          },
          //5
          {
            path: '/app/setting/usersettings',
            name: 'usersettingsRouter',
            component: usersettings,
            meta: {
              requireAuth: true
            }
          },
        ]
      },
      // {
      //   path: '/app/cloud',
      //   name: 'cloudRouter',
      //   meta: {
      //     requireAuth: true
      //   },
      //   redirect: {name: 'dashboardRouter'}
      // },
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
  store.commit(types.LANG, window.localStorage.getItem('h5slang'))
}
if (window.localStorage.getItem('h5rtcsw')) {
  store.commit(types.RTCSW, window.localStorage.getItem('h5rtcsw'))
}
if (window.localStorage.getItem('watermarkstring')) {
  store.commit(types.WATERMARKSTRING, window.localStorage.getItem('watermarkstring'))
}
if (window.localStorage.getItem('h5watermarktoggle')) {
  store.commit(types.WATERMARKTOGGLE, window.localStorage.getItem('h5watermarktoggle'))
}
//巡更
if (window.localStorage.getItem('h5toursw')) {
  store.commit(types.WATERMARKTOGGLE, window.localStorage.getItem('h5toursw'))
}
//视频会议
if (window.localStorage.getItem('h5conference')) {
  store.commit(types.CONFERENCE, window.localStorage.getItem('h5conference'))
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
