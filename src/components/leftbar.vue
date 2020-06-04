<template>
<div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav slimscrollsidebar nav_sid">
        <div class="sidebar-head">
            <h3><span class="fa-fw open-close"><i class="ti-menu hidden-xs"></i><i class="ti-close visible-xs"></i></span> <span class="hide-menu">{{$t("message.left.navigation")}}</span></h3> 
        </div>
        <ul class="nav" id="side-menu">
            <li :class="{co_Baise:Adswitch===1}" @click="Adswitch=1">
                <router-link :to="{name:'dashboardRouter'}" :class="{color_size:Adswitch===1}">
                    <i class="mdi mdi-view-dashboard fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.dashboard")}}  </span>
                </router-link>
            </li>
            <li :class="{co_Baise:Adswitch===2}" @click="Adswitch=2">
                <router-link :to="{name:'liveviewRouter'}" :class="{color_size:Adswitch===2}">
                    <i class="mdi mdi-camcorder fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.live")}}  </span>
                </router-link>
            </li>
            <li  :class="{co_Baise:Adswitch===3}" @click="Adswitch=3">
                <router-link :to="{name:'playbackRouter'}" :class="{color_size:Adswitch===3}">
                    <i class="mdi mdi-play-circle fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.playback")}}  </span>
                </router-link>
             </li>
            <!-- 抓图 -->
            <li :class="{co_Baise:Adswitch===4}" @click="Adswitch=4">
                <router-link :to="{name:'screenshotsRouter'}" :class="{color_size:Adswitch===4}">
                    <i class="mdi mdi-camera-iris fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.snapshot")}}  </span>
                </router-link>
             </li>
             <!-- 归档 -->
             <li :class="{co_Baise:Adswitch===5}" @click="Adswitch=5">
                <router-link :to="{name:'archiveRouter'}" :class="{color_size:Adswitch===5}">
                    <i class="mdi mdi-folder-move fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.archive")}}  </span>
                </router-link>
            </li>
             
            <!-- 音视频对讲 -->
            <li :class="{co_Baise:Adswitch===6}" @click="Adswitch=6">
                <router-link :to="{name:'avintercomsRouter'}" :class="{color_size:Adswitch===6}">
                    <i class="iconfont icon-shipinhuiyi3" style=" margin:0 20px 0 2px;font-size: 17px;" data-icon="v"></i>
                    <span class="hide-menu" style="line-height: 25px;"> {{$t("message.Conference.Upload")}}  </span>
                </router-link>
            </li>
              <!-- 巡更 apps -->
            <li :class="{co_Baise:Adswitch===7}" @click="Adswitch=7">
                <router-link :to="{name:'TourRouter'}" :class="{color_size:Adswitch===7}">
                    <i class="mdi mdi-view-grid fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.tour")}}</span>
                </router-link>
             </li>
             <!-- 高级回放 -->
             <li :class="{co_Baise:Adswitch===8}" @click="Adswitch=8">
                <router-link :to="{name:'AdvancePBRouter'}" :class="{color_size:Adswitch===8}">
                    <i class="mdi mdi-youtube-play fa-fw" data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.AdvancePB")}}  </span>
                </router-link>
             </li>
             <!-- 国标 -->
             <li :class="{co_Baise:Adswitch===9}" @click="Adswitch=9">
                <router-link class="root" :to="{name:'GB28181Router'}" :class="{color_size:Adswitch===9}">
                    <i class="mdi mdi-equal-box fa-fw" data-icon="v"></i> <span class="hide-menu"> GB</span>
                </router-link>
            </li>
             <!-- 监控点 -->
             <li class="root" :class="{co_Baise:Adswitch===10}" @click="Adswitch=10">
                <router-link class="flex_cam" :to="{name:'cameraRouter'}" :class="{color_size:Adswitch===10}">
                    <i class="iconfont icon-shishishipin-" data-icon="v" style=" margin:0 24px 0 2px;font-size: 17px;"></i>
                    <span class="hide-menu" style="line-height: 25px;"> {{$t("message.left.camera")}}</span>
                </router-link>
            </li>
             <!-- 级联 -->
            <li :class="{co_Baise:Adswitch===11}" @click="Adswitch=11">
                <router-link class="root" :to="{name:'cloudsRouter'}" :class="{color_size:Adswitch===11}">
                    <i class="mdi mdi-cloud fa-fw"></i> <span class="hide-menu">{{$t("message.left.cloud")}}</span>
                </router-link>
            </li>
             <!-- 本地查看 -->
            <li class="root"  :class="{co_Baise:Adswitch===12}" @click="Adswitch=12">
                <a href="/mediastore" class="" :class="{color_size:Adswitch===3}"><i class="mdi mdi-folder fa-fw"  data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.screenshots")}} </span></a>
            </li>
            <!-- 样式设置 -->
            <li :class="{co_Baise:Adswitch===13}" @click="Adswitch=13">
                <router-link class="root" :to="{name:'devicesRouter'}" :class="{color_size:Adswitch===13}">
                    <i class="mdi mdi-settings fa-fw"  data-icon="v"></i> <span class="hide-menu"> {{$t("message.left.setting")}}  </span>
                </router-link>
            </li>
        </ul>
    </div>
</div>
</template>
<style scoped>
.nav{
    overflow-y: hidden !important;
}
.nav:hover {
    /*相关样式*/
    overflow-y: auto !important;
}
.flex_cam{
    display: flex !important;
}
.sidebar{
  background: #2d333b;
  padding-top: 40px;
}
.sidebar .sidebar-head{
    /* margin: 0; */
    position: none;
    /* top:50px; */
    background: #2d333b;
    padding-top: 50px;
}
.sidebar .sidebar-head h3{
  color: #FFFFFF;
}
.co_Baise{
    background: #5fbfa7;
}
.color_size{
    color: #FFFFFF !important;
}
.root{
    display: block;
}
#side-menu > li > a.active {
    background: none;
    font-weight: 500;
}
#side-menu > li > a >i{
    margin-right: 20px;
}
#side-menu > li > a {
    background: none;
    color: #c0c2c5;
    font-weight: 500;
}
</style>

<script>
import * as types from '@/store/types'
export default {
    name: 'vaside',
    data (){
        return {
            Adswitch:1,
            root:this.$store.state.root
        }
    },
    mounted(){
        // console.log(this.$store.state.users,this.$store.state.root,this.$store.state.token)
        this.roltroot();
        
    },
    methods:{
        roltroot(){
            if(this.$store.state.root=="Administrator"){
                console.log("管理员",this.$store.state.root)
            }else {
                console.log("操作员",this.$store.state.root)
                $(".root").hide()
                // document.getElementsByClassName("root").style.display="none";
            }
        }
    },
}
</script>
