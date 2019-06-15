<template>
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav slimscrollsidebar">
        <div class="sidebar-head">
            <h3><span class="fa-fw open-close"><i class="ti-menu hidden-xs"></i><i class="ti-close visible-xs"></i></span> <span class="hide-menu">{{$t("message.left.navigation")}}</span></h3> </div>
        <ul class="nav" id="side-menu">
            <router-link tag="li" :to="{name:'dashboardRouter'}">
            <a href="#" class="waves-effect"><i class="mdi mdi-view-dashboard fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.dashboard")}}  </span></a>
            </router-link>
            <li class="devider"></li>
            <router-link tag="li" :to="{name:'liveviewRouter'}">
            <a href="#" class="waves-effect"><i class="mdi mdi-camcorder fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.live")}}  </span></a>
            </router-link>
            
            <li >
            <a href="/mediastore" class="waves-effect"><i class="mdi mdi-play-circle fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.playback")}}  </span></a>
            </li>

            <li >
            <a href="/mediastore" class="waves-effect"><i class="mdi mdi-camera fa-fw"  data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.snapshot")}} </span></a>
            </li>

            <li class="devider"></li>
            <router-link tag="li" :to="{name:'devSettingRouter'}">
            <a href="#" class="waves-effect"><i class="mdi mdi-settings fa-fw"  data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.setting")}}  </span></a>
            </router-link>

            <!-- <router-link tag="li" :to="{name:'cloudRouter'}">
            <a href="#" class="waves-effect"><i class="mdi mdi-cloud fa-fw"></i> <span class="hide-menu">{{$t("message.left.cloud")}}</span></a>
            </router-link> -->

            <li class="devider"></li>

            <router-link tag="li" :to="{name:'logoutRouter'}">
            <a  class="waves-effect" ><i class="mdi mdi-logout fa-fw" ></i> <span class="hide-menu">{{$t("message.left.logout")}}</span></a>
            </router-link>

            <li class="devider"></li>
 
        </ul>
    </div>
</div>
</template>


<script>
import * as types from '@/store/types'
export default {
    name: 'vaside'
}
</script>
