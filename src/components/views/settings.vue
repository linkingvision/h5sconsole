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
                    <!-- <div>
                        <el-button type="info">设置</el-button>
                    </div> -->
                    <div :class="{setting_tj:index_lj==1}"  @click="setting_ys" class="setting_left">
                        <router-link  :to="{name:'devicesRouter'}">
                            <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==1}">{{$t("message.setting.device")}} </a> 
                        </router-link>
                    </div>
                    <div :class="{setting_tj:index_lj==2}"  @click="setting_ys1" class="setting_left">
                        <router-link  :to="{name:'devicesdksRouter'}">
                            <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==2}">{{$t("message.setting.devicesdk")}} </a> 
                        </router-link>
                    </div>
                    <div :class="{setting_tj:index_lj==3}"  @click="setting_ys2" class="setting_left">
                        <router-link  :to="{name:'devicertmppushsRouter'}">
                            <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==3}">{{$t("message.setting.devicertmppush")}} </a> 
                        </router-link>
                    </div>
                    <div :class="{setting_tj:index_lj==4}"  @click="setting_ys3" class="setting_left">
                        <router-link  :to="{name:'usersettingsRouter'}">
                            <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==4}">{{$t("message.setting.user")}} </a> 
                        </router-link>
                    </div>
                    <div :class="{setting_tj:index_lj==5}"  @click="setting_ys4" class="setting_left">
                        <router-link  :to="{name:'recordsRouter'}">
                            <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==5}">{{$t("message.setting.record")}} </a> 
                        </router-link>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                
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
     
    }
}
</script>


<style scoped>
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
    text-align: right;
    padding: 10px 0;
    border-right: 2px solid #eee;
    box-sizing: border-box;
}
/* 点击变换颜色 */
.setting_tj{
    border-right: 2px solid rgba(95,191,167,1);
    box-sizing: border-box;
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
    height: 800px; background-color: #ffffff;
    overflow-y: auto;
  }
  .el-col {
    border-radius: 4px;
    height: 800px;
    overflow-y: auto;
    background-color: #ffffff;
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
    /* padding: 10px 0; */
    background-color: #ffffff;
  }
</style>