<template>
<div>
    <div id="page-wrapper">
        <div class="container-fluid">
            <div class="row bg-title">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                    <h4 class="page-title">{{$t("message.Conference.Upload")}} | <span style="color:rgba(95,191,167,1);">{{language}}</span></h4> 
                </div>
            </div>
        </div>
        <div>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1" :to="{name:'avintercomsRouter'}" @click="language=language1" :value='language1'><router-link  :to="{name:'avintercomsRouter'}">{{$t("message.Conference.Videointercom")}}</router-link></el-menu-item>
                <el-menu-item index="2" :to="{name:'uploadRouter'}"  @click="language=language2" :value='language2'><router-link  :to="{name:'uploadRouter'}">{{$t("message.Conference.Upload")}}</router-link></el-menu-item>
                <!-- <el-menu-item index="3">选项3</el-menu-item> -->
            </el-menu>
        </div>
        
        <div class="">
            <router-view></router-view>
        </div>
        <!-- <el-row :gutter="20">
            <el-col :span="24" style="padding-right:0px">
                <div class="grid-content bg-purple">
                    <router-link  :to="{name:'avintercomsRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==1}">
                            <div :class="{setting_tj:index_lj==1}"  @click="setting_ys" class="setting_left">
                                {{$t("message.Conference.Videointercom")}}
                            </div>
                        </a> 
                    </router-link>
                    <router-link  :to="{name:'GBplatformRouter'}">
                        <a href="javascript:void(0)" class="setting_left_a" :class="{setting_tj1:index_lj==2}">
                            <div :class="{setting_tj:index_lj==2}"  @click="setting_ys1" class="setting_left">
                                {{$t("message.GB.GBPlatform")}}
                            </div>
                        </a> 
                    </router-link>
                </div>
            </el-col>
            <el-col :span="24"  style="padding-right:0px">
            </el-col>
        </el-row> -->

    </div>

</div>
</template>   


<script>
export default {
    
    name: 'GB',
    data(){
        return {
            activeIndex: '1',
            
            language:this.$t("message.Conference.Videointercom"),
            language1:this.$t("message.Conference.Videointercom"),
            language2:this.$t("message.Conference.Upload")
        }
    },
    mounted(){
    },
    methods: {
    }
}
</script>


<style scoped>
a{
    padding: 15px 20px;
}
.el-menu-demo{
    background: none;
}
.el-menu-demo >>> .el-menu-item{
    height: 44px;
    line-height: 44px;
    padding: 0;
}
.el-menu-demo >>> .el-menu-item.is-active {
    border: none;
    border-top: 2px solid #5BB7A0;
    color: #5BB7A0;
    background-color: #FFFFFF;
}

</style>