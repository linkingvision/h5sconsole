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
        <li class="dropdown control_center">
          <i class="iconfont icon-kongzhizhongxin"></i>
          <!-- <span></span> -->
          <a href="#/Control" >
            <router-link :to="{name:'ControlRouter'}">
              <span class="icon_col">{{$t("message.left.Control")}}</span>
            </router-link> 
          </a>
        </li>
        <!-- 搜索 -->
        <li class="dropdown icon_col">
          <el-badge>
            <i class="fa fa-search" type="primary"></i>
          </el-badge>
        </li>
        <li class="dropdown icon_col icon_mao">
          :
        </li>
        <!-- 铃铛 -->
        <li class="dropdown" style="margin: 0px 20px 0 0;color: #fff;">
          <router-link :to="{name:'eventRouter'}">
            <el-badge :value="gEvvalue" :max="999" class="item" data-toggle="dropdown">
              <i class="mdi mdi-bell" type="primary"></i>
            </el-badge>
          </router-link>
        </li>
        
        <li class="dropdown" style="border-left: 1px solid #4D4D4D;height:39px">
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
        <!-- 关于 -->
        <li class="dropdown">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">
            <span class="iconfont icon-category" style="font-size:24px"></span>
          </a>
          <ul class="dropdown-menu dropdown-user animated flipInY">
            <li>
              <a href="javascript:void(0);">
                  <a href="doc/api.html" class="waves-effect" > 
                    <span style="margin:0 5px 0 9px" class="apiab iconfont icon-category"></span>
                    <span class="admin_zi">
                          {{$t("message.header.API")}}
                      </span> 
                  </a>
              </a>
            </li>
            <li role="separator" class="divider"></li>
            <li>
                <span type="text" class="hide-menu" @click="centerDialogVisible = true">
                    <span class="apiab iconfont icon-icon-test1"></span>
                    <span class="admin_zi">
                        {{$t("message.dashboard.about")}}
                    </span>
                </span>
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
          </ul>
          <!-- /.dropdown-user -->
        </li>
        <!-- /.dropdown -->
      </ul>
    </div>
    <!-- /.navbar-header -->
    <!-- /.navbar-top-links -->
    <!-- /.navbar-static-side -->

  </nav>
</template>
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
                    // console.log(_this.information);
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
/* 控制中心 */
.control_center{
  margin-right: 14px;
  font-size:14px;
  font-family:PingFang SC;
  font-weight:600;
  color:rgba(255,255,255,1);
  display: flex;
}


.icon_col{
  color: #fff;;
}
.icon_mao{
  padding-left: 14px;
  font-size: 16px;
  font-weight: 700;
}
a{
  color: #000;
  width: 100%;
}
.apiab{
  font-size: 16px;
  color: #030303;
}
.navbar-top-links>li>a {
    padding: 0 14px;
    line-height: 40px;
    min-height: 40px;
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
  min-width: 26px;
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
  /* justify-content: center; */
  /* align-items:center; */
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
    color: #000;
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
.admin_zi{
    color: #000;
    font-size: 14px;
}
</style>

