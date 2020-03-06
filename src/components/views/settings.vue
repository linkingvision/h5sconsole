<template>
<div>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row bg-title">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                    <h4 class="page-title">{{$t("message.setting.setting")}} | <span style="color:rgba(95,191,167,1);">{{language}}</span></h4> 
                </div>
            </div>
        </div>

        <el-row :gutter="20">
            <el-col :span="4" style="padding-right:0px">
                <div class="grid-content bg-purple">
                    <router-link  :to="{name:'devicesRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==1}">
                            <div :class="{setting_tj:index_lj==1}"  @click="setting_ys" class="setting_left">
                                {{$t("message.setting.device")}} 
                            </div>
                        </a> 
                    </router-link>
                    <router-link  :to="{name:'devicesdksRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==2}">
                            <div :class="{setting_tj:index_lj==2}"  @click="setting_ys1" class="setting_left">
                                {{$t("message.setting.devicesdk")}}
                            </div>
                        </a> 
                    </router-link>
                    <router-link  :to="{name:'devicertmppushsRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==3}">
                            <div :class="{setting_tj:index_lj==3}"  @click="setting_ys2" class="setting_left">
                                {{$t("message.setting.devicertmppush")}}
                            </div>
                         </a> 
                    </router-link>
                    <router-link  :to="{name:'usersettingsRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==4}">
                            <div :class="{setting_tj:index_lj==4}"  @click="setting_ys3" class="setting_left">
                                {{$t("message.setting.user")}}
                            </div>
                        </a> 
                    </router-link>
                    <router-link  :to="{name:'recordsRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==5}">
                            <div :class="{setting_tj:index_lj==5}"  @click="setting_ys4" class="setting_left">{{$t("message.setting.record")}}</div>
                        </a> 
                    </router-link>
                    <router-link  :to="{name:'RegionalRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==6}">
                            <div :class="{setting_tj:index_lj==6}"  @click="setting_ys5" class="setting_left">
                                {{$t("message.setting.Regional")}} 
                            </div>
                        </a> 
                    </router-link>
                    <router-link  :to="{name:'TranscodingRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==7}">
                            <div :class="{setting_tj:index_lj==7}"  @click="setting_ys6" class="setting_left">
                                {{$t("message.setting.Transcoding")}} 
                            </div>
                        </a> 
                    </router-link>
                </div>
            </el-col>
            <el-col style="padding:0px;" :span="20">
                <div class="grid-content bg-purple">
                    <router-view></router-view>
                </div>
            </el-col>
        </el-row>
    </div>

</div>
</template>   


<script>
export default {
    
    name: 'settings',
    data(){
        return {
            isCollapse: false,
            /*index_xh:[
                {name:this.$t("message.setting.device"),name1:'./setting/devices'},
                {name:this.$t("message.setting.devicesdk"),name1:'./setting/devicesdks'}
            ],*/
            index_lj:"1",
            language:this.$t("message.setting.device"),
        }
    },
    mounted(){
    },
    methods: {
        setting_ys(){
             this.index_lj=1;
             this.language=this.$t("message.setting.device");
        },
        setting_ys1(){
             this.index_lj=2;
             this.language=this.$t("message.setting.devicesdk");
        },
        setting_ys2(){
             this.index_lj=3;
             this.language=this.$t("message.setting.devicertmppush");
        },
        setting_ys3(){
             this.index_lj=4;
             this.language=this.$t("message.setting.user");
        },
        setting_ys4(){
             this.index_lj=5;
             this.language=this.$t("message.setting.record");
        },
        setting_ys5(){
             this.index_lj=6;
             this.language=this.$t("message.setting.Regional");
        },
        setting_ys6(){
             this.index_lj=7;
             this.language=this.$t("message.setting.Transcoding");
        },
     
    }
}
</script>


<style scoped>
a{
    font-size: 14px;
    color: #000;
}
/* 左边的点击后显示的颜色 */
/* .el-menu-item.is-active {
    color: #409EFF;
    border-right: 1px solid #409eff;
} */
.el-button {
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
    box-sizing: border-box;
}
/*布局 */
.setting_left{
    margin-bottom: 5px;
    padding: 10px 0;
    padding-left: 29%;
    box-sizing: border-box;
    font-size: 16px;
}
/* 点击变换颜色 */
.setting_tj{
    border-left: 3px solid rgba(95,191,167,1);
    box-sizing: border-box;
    background-color: #FAFAFA;
}
.setting_tj1{
    color:rgba(95,191,167,1) !important;
}


.setting_left .setting_left_a{
    color: #000;
    font-size: 14px;
    padding: 10px 20px;
}
.setting_left .setting_left_a:hover{
    color:rgba(95,191,167,1) !important;
}

/* 布局 */
 .el-row {
    margin-bottom: 20px;
    height: 800px;
    /* background-color: #ffffff; */
    overflow-y: auto;
  }
  .el-col {
    border-radius: 4px;
    height: 800px;
    overflow-y: auto;
    background-color: #ffffff;
  border-left: 5px solid #F8F6F9;
  }
  .bg-purple-dark {
    background: #ffffff;
  }
  .bg-purple {
    background-color: #ffffff!important;
  }
  .bg-purple-light {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #ffffff;
  }
</style>