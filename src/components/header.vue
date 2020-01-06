<template>
  <nav class="navbar navbar-default navbar-static-top m-b-0">
    <div class="navbar-header">
      <ul class="nav navbar-top-links navbar-left">
        <div class="logo_ilh">
          <!-- Logo -->
            <span class="hidden-xs">
              <!--This is dark logo text-->
              <router-link :to="{name:'dashboardRouter'}"><img src="./gallery/WechatIMG@2x.png" alt="home" class="dark-logo" /></router-link>
            </span>
        </div>
      </ul>
      <ul class="nav navbar-top-links navbar-right pull-right" style="line-height: 40px; height: 40px;">
        <!-- 铃铛 -->
        <li class="dropdown" style="margin: 0px 20px 0 0;color: #fff;">
          <router-link :to="{name:'eventRouter'}">
            <el-badge :value="gEvvalue" :max="999" class="item" data-toggle="dropdown">
              <i class="mdi mdi-bell" type="primary"></i>
            </el-badge>
          </router-link>
          <!-- <ul class="dropdown-menu mailbox animated bounceInDown">
                            <li>
                                <div class="drop-title">{{$t("message.header.alarm")}}</div>
                            </li>
                            <li>
                                <div class="message-center">

                                </div>
                            </li>
                            <li>
                                <a class="text-center" href="javascript:void(0);"> <strong>{{$t("message.header.see_alarm")}}</strong> <i class="fa fa-angle-right"></i> </a>
                            </li>
          </ul>-->
        </li>
        <!-- 搜索 -->
        <li class="dropdown" style="color: #fff;border-right: 1px solid #4D4D4D; padding: 0px 20px; height: 40px;">
          <el-badge>
            <i class="fa fa-search" type="primary"></i>
          </el-badge>
        </li>

        <!-- <li>
          <form role="search" class="app-search hidden-sm hidden-xs m-r-10">
            <input type="text" class="form-control" />
            <a href>
              <i class="fa fa-search"></i>
            </a>
          </form>
        </li> -->

        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <span class="iconfont icon-yonghu1"></span>
            <b class="hidden-xs">admin</b>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu dropdown-user animated flipInY">
            <li>
              <a href="javascript:void(0);">
                <router-link tag="li" :to="{name:'usersettingsRouter'}">
                  <a href="#" class="waves-effect"><div class="rou_img"></div><span class="hide-menu"> {{$t("message.left.setting")}}  </span></a>
                </router-link>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
              <a href="#/app/logout">
                <router-link tag="li" :to="{name:'logoutRouter'}">
                  <a  class="waves-effect" ><div class="rou_img1"></div><span class="hide-menu"> {{$t("message.left.logout")}}</span></a>
                </router-link> 
              </a>
            </li>
          </ul>
          <!-- /.dropdown-user -->
        </li>
        <li class="a">
            
            <el-button type="text" class="about" @click="centerDialogVisible = true">{{$t("message.dashboard.about")}}</el-button>
            <el-dialog
                :visible.sync="centerDialogVisible"
                width="30%"
                append-to-body
                center>
                <div class="about_flex">
                    <div>
                        <img class="adout_img" src="./gallery/logo@2x.png"/>
                    </div>
                    <div style="margin: 20px 0 10px 20px; text-align: center;">
                        <img src="./gallery/H5SCONSOLE@2x.png" style="margin: 0px 0 16px 0px;"/>
                        <div>{{$t("message.dashboard.version")}}: {{information.strVersion}}</div>
                    </div>
                </div>
                <div class="about_but">
                  <a href="https://linkingvision.cn/" target="_blank">
                    <div class="about_but1">{{$t("message.dashboard.about")}}</div>
                  </a>
                </div>
            </el-dialog>
        </li>
        <!-- /.dropdown -->
      </ul>
    </div>
    <!-- /.navbar-header -->
    <!-- /.navbar-top-links -->
    <!-- /.navbar-static-side -->

  </nav>
</template>
<style scoped>

</style>
<script>
import * as types from "@/store/types";
export default {
  name: "vheader",
  methods: {},
  data() {
    return {
        gEvvalue: 0,
        centerDialogVisible:false,
        information:{
            strVersion: "",
        },
    };
  },
  mounted() {
    this.gEventval();
    this.GetSystemInfo();
  },
  methods: {
      GetSystemInfo()
        {
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            var url = root + "/api/v1/GetSystemInfo?session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                //console.log(result);
                if (result.status == 200) 
                {
                    _this.information = result.data;
                    console.log(_this.information);
                }
            }).catch(error => {
                console.log('GetSystemInfo', error);
            });

        },
    gEventval() {
      setInterval(
        function() {
          this.gEvvalue = this.EVENT.gEvent.length;
        }.bind(this),
        1000
      );
    }
  }
};
</script>
<style scoped>
a{
  color: #000;
  width: 100%;
}
.navbar-top-links>li>a {
    padding: 0 14px;
    line-height: 40px;
    min-height: 0;
}
/* logo */
.logo_ilh{
  line-height: 40px;
}
.dark-logo{
  height: 26px;
  margin-left: 20px;
}
/* 铃铛 */
.el-badge >>> .el-badge__content.is-fixed {
    top: 12px;
}
.el-badge >>> .el-badge__content{
  width: 26px;
  border: 0px;
  border-right: 9px;
}
.el-badge >>> .mdi{
  font-size: 20px;
}
.el-badge >>> .fa{
  font-size: 17px;
}
/*  */
.top-left-part {
    width: 20%;
    float: left;
    border-right: 1px solid rgba(0,0,0,.08);
}

.el-dialog__wrapper >>> .el-dialog{
    background: #292929;
}

.el-dialog__wrapper >>>  .el-dialog--center .el-dialog__body {
    padding: 1px 30px;
}
/* admin */
.hidden-xs{
  font-size: 14px;
}
.el-button{
  font-size: 14px;
}
.navbar-top-links .dropdown-user{
  width: 104px !important;
  text-align: center;
}
.dropdown-menu{
  min-width: 100px;
}
.hide-menu{
  width: 100%;
  /* display: block; */
  margin-left: 8px;
  
}
.waves-effect{
  display: flex;
  align-items:center;
}
.rou_img{
  background: url("./gallery/shezhi-3@2x.png") no-repeat;
  background-size: 100%;
  background-position:center center; 
  width: 14px;
  height: 14px;
}
.rou_img1{
  background: url("./gallery/tuichu@2x.png") no-repeat;
  background-size: 100%;
  width: 14px;
  height: 14px;
}

.navbar-header {
  width: 100%;
  height: 70px;
  background:rgba(41,41,41,1);
  border: 0;
}
.about{
    text-align: center;
    line-height: 40px;
    color: #ffffff;
    margin: 0 16px;
    padding: 0;

}
.about_flex{
    display: flex;
    justify-content:center;
    margin: 46px 0;
}
.about_but{
    text-align: center;
    margin-bottom: 50px;
}
.about_but1{
  width: 150px;
  padding: 10px 35px;
  border-radius: 50px;
  border: 2px solid #5FBFA7;
  margin: 0 auto;
  color: #5FBFA7;

}
</style>

