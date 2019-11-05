<template>
<div>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row bg-title">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                    <h4 class="page-title">GB</h4> 
                </div>
            </div>
        </div>

        <el-row :gutter="20">
            <el-col :span="4" style="padding-right:0px">
                <div class="grid-content bg-purple">
                    <div :class="{setting_tj:index_lj==1}"  @click="setting_ys" class="setting_left">
                        <router-link  :to="{name:'GB28181Router'}">
                            <a href="javascript:void(0)" class="setting_left_a">{{$t("message.GB.GB28181")}} </a> 
                        </router-link>
                    </div>
                    <div :class="{setting_tj:index_lj==2}"  @click="setting_ys1" class="setting_left">
                        <router-link  :to="{name:'GBplatformRouter'}">
                            <a href="javascript:void(0)" class="setting_left_a">{{$t("message.GB.GBPlatform")}} </a> 
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
    
    name: 'GB',
    data(){
        return {
            isCollapse: false,
            /*index_xh:[
                {name:this.$t("message.setting.device"),name1:'./setting/devices'},
                {name:this.$t("message.setting.devicesdk"),name1:'./setting/devicesdks'}
            ],*/
            index_lj:"1",
        }
    },
    mounted(){
    },
    methods: {
        setting_ys(){
             this.index_lj=1;
        },
        setting_ys1(){
             this.index_lj=2;
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
.setting_left:hover{
    color: #409EFF;
    /* border-right: 2px solid #409EFF; */
    box-sizing: border-box;
}
.setting_tj{
    color: #409EFF;
    border-right: 2px solid #409EFF;
    box-sizing: border-box;
}
.setting_left .setting_left_a{
    color: #000;
    font-size: 14px;
    padding: 10px 20px;
}
.setting_left .setting_left_a:hover{
    color: #409EFF;
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