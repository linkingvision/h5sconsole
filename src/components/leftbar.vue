<template>
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav slimscrollsidebar">
        <div class="sidebar-head">
            <h3><span class="fa-fw open-close"><i class="ti-menu hidden-xs"></i><i class="ti-close visible-xs"></i></span> <span class="hide-menu">{{$t("message.left.navigation")}}</span></h3> </div>
        <ul class="nav" id="side-menu">
            <router-link tag="li" :to="{name:'dashboardRouter'}">
            <a href="#" class=""><i class="mdi mdi-view-dashboard fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.dashboard")}}  </span></a>
            </router-link>
            <router-link tag="li" :to="{name:'liveviewRouter'}">
            <a href="#" class=""><i class="mdi mdi-camcorder fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.live")}}  </span></a>
            </router-link>
            
			<router-link tag="li" :to="{name:'playbackRouter'}">
			<a href="#" class=""><i class="mdi mdi-play-circle fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.playback")}}  </span></a>
			 </router-link>
            <!-- 抓图 -->
			<router-link tag="li" :to="{name:'screenshotsRouter'}">
			<a href="#" class=""><i class="mdi mdi-camera-iris fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.snapshot")}}  </span></a>
			 </router-link>
             <!-- 归档 -->
			<router-link tag="li" :to="{name:'archiveRouter'}">
			<a href="#" class=""><i class="mdi mdi-folder-move fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.archive")}}  </span></a>
			 </router-link>
             
            
             <!-- 高级回放 -->
			<router-link tag="li" :to="{name:'AdvancePBRouter'}">
			<a href="#" class=""><i class="mdi mdi-youtube-play fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.AdvancePB")}}  </span></a>
			 </router-link>
             <!-- 高级回放 -->
             <!-- <li class="devider"></li>
			<router-link tag="li" :to="{name:'Gaogao1Router'}">
			<a href="#" class="waves-effect"><i class="mdi mdi-play-circle fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.AdvancePB")}}  </span></a>
			 </router-link> -->
             <!-- 国标 -->
			<router-link tag="li" :to="{name:'GB28181Router'}">
			<a href="#" class=""><i class="mdi mdi-equal-box fa-fw" data-icon="v"></i> <span class="hide-menu"> GB</span></a>
			 </router-link>
             <!-- 级联 -->
            <router-link tag="li" :to="{name:'cloudsRouter'}">
            <a href="#" class="waves-effect"><i class="mdi mdi-cloud fa-fw"></i> <span class="hide-menu">{{$t("message.left.cloud")}}</span></a>
            </router-link>
             <!-- 巡更 apps -->
			<router-link tag="li" :to="{name:'TourRouter'}">
			<a href="#" class=""><i class="mdi mdi-view-grid fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.tour")}}</span></a>
			 </router-link>
             <!-- 本地查看 -->
            <li >
            <a href="/mediastore" class=""><i class="mdi mdi-folder fa-fw"  data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.screenshots")}} </span></a>
            </li>
            
            <!-- 事件 -->
			<!-- <router-link tag="li" :to="{name:'eventRouter'}">
			<a href="#" class=""><i class="mdi mdi-bell fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.event")}}  </span></a>
			 </router-link> -->
            <!-- 样式设置 -->
            <router-link tag="li" :to="{name:'devicesRouter'}">
            <a href="#" class=""><i class="mdi mdi-settings fa-fw"  data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.setting")}}  </span></a>
            </router-link>
            <!-- 关闭 -->
            <!-- <router-link tag="li" :to="{name:'logoutRouter'}">
            <a  class="waves-effect" ><i class="mdi mdi-arrow-right-bold-circle fa-fw" ></i> <span class="hide-menu">{{$t("message.left.logout")}}</span></a>
            </router-link> -->

            <!-- <li class="devider"></li> -->
 
        </ul>
    </div>
</div>
</template>
<style scoped>
#side-menu > li > a.active {
    /* background: #f44336; */
    color: #ffffff;
    font-weight: 500;
}
</style>

<script>
import * as types from '@/store/types'
export default {
    name: 'vaside'
}
</script>
