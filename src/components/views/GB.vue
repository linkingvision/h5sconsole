<template>
<div>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row bg-title">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                    <h4 class="page-title">GB | <span style="color:rgba(95,191,167,1);">{{language}}</span></h4> 
                </div>
            </div>
        </div>

        <el-row :gutter="20">
            <el-col :span="4" style="padding-right:0px">
                <div class="grid-content bg-purple">
                    <router-link  :to="{name:'GB28181Router'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==1}">
                            <div :class="{setting_tj:index_lj==1}"  @click="setting_ys" class="setting_left">
                                {{$t("message.GB.GB28181")}}
                            </div>
                        </a> 
                    </router-link><router-link  :to="{name:'GBplatformRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==2}">
                            <div :class="{setting_tj:index_lj==2}"  @click="setting_ys1" class="setting_left">
                                {{$t("message.GB.GBPlatform")}}
                            </div>
                        </a> 
                    </router-link>
                </div>
            </el-col>
            <el-col :span="20"  style="padding-right:0px">
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
            language:this.$t("message.GB.GB28181")
        }
    },
    mounted(){
    },
    methods: {
        setting_ys(){
             this.index_lj=1;
             this.language=this.$t("message.GB.GB28181");
        },
        setting_ys1(){
             this.index_lj=2;
             this.language=this.$t("message.GB.GBPlatform");
        }
     
    }
}
</script>


<style scoped>
a{
    color: #000;
}
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