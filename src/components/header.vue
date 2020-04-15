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
            <b class="hidden-xs">{{user}}</b>
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu dropdown-user animated flipInY">
            <li v-if="user!=''&&user!=null">
                <!-- 操作员设置 -->
                <span type="text" class="hide-menu1" @click=" editPopup= true">
                    <span class="apiab iconfont icon-icon-test1"></span>
                    <span class="admin_zi">
                        {{$t("message.left.setting")}}
                    </span>
                </span>
                <el-dialog :title="label.Edit" class="dialog" :visible.sync="editPopup" width="30%" append-to-body>
                    <el-form label-position="right" label-width="160px" :model="form">
                      <el-form-item :label="label.user">
                          <input disabled class="editinput" v-model="form.strUser"/>
                      </el-form-item>
                      <el-form-item :label="label.olPassword">
                          <input class="editinput" v-model="form.olPassword"/>
                      </el-form-item>
                      <el-form-item :label="label.nePassword">
                          <input class="editinput" v-model="form.nePassword"/>
                      </el-form-item>
                      <el-form-item :label="label.nePassword1">
                          <input class="editinput" v-model="form.nePassword1"/>
                      </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                      <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                      <el-button type="primary" @click="edityes">{{$t("message.setting.OK")}}</el-button>
                  </div>
                </el-dialog>
            </li>
            <li  v-if="user!=''&&user!=null" role="separator" class="divider"></li>
            <li>
              <a href="#/app/logout">
                <router-link tag="li" :to="{name:'logoutRouter'}">
                  <a  class="waves-effect" >
                    <div class="iconfont icon-shijian-"></div>
                    <span v-if="user!=''&&user!=null" class="hide-menu"> {{$t("message.header.logout")}}</span>
                    <span v-if="user==''||user==null" class="hide-menu"> {{$t("message.header.login")}}</span>
                  </a>
                </router-link> 
              </a>
            </li>
          </ul>
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
      </ul>
    </div>

  </nav>
</template>
<script>
import * as types from "@/store/types";
import '@/assets/jQuery.md5.js'
export default {
  name: "vheader",
  methods: {},
  data() {
    return {
        user:this.$store.state.users,
        gEvvalue: 0,
        centerDialogVisible:false,
        Operator:false,
        information:{
            strVersion: "",
        },
        editPopup:false,//编辑弹窗
        form: {
          strUser:this.$store.state.users,
          olPassword: "",
          nePassword:"",
          nePassword1:"",
      },
      label:{
          Edit:this.$t("message.table.Edit"),
          user:this.$t("message.setting.username"),
          role:this.$t("message.setting.role"),
          type:this.$t("message.setting.Authority"),
          olPassword:this.$t("message.setting.currentpass"),
          nePassword:this.$t("message.setting.newpass"),
          nePassword1:this.$t("message.setting.confirmpass"),
      },
      options: [{
              value: 'Administrator',
              label: 'Administrator'
          }, {
              value: 'Operator',
              label: 'Operator'
          }
      ],
};
  },
  mounted() {
    // console.log(this.user)
    this.gEventval();
    this.GetSystemInfo();
  },
  methods: {
    edityes(){
      var root = process.env.API_ROOT;
      if (root == undefined){
          root = window.location.protocol + '//' + window.location.host + window.location.pathname;
      }
      //url
      var form=this.form;
      if( form.nePassword!==form.nePassword1){
          this.$message(this.$t("message.setting.Twopassword"));
          return false;
      }
      
      this.editPopup = false;
      var url = root + "/api/v1/UpdateUser?user="+form.strUser+"&oldpassword="+$.md5(form.olPassword)+"&newpassword="+$.md5(form.nePassword)+"&session="+ this.$store.state.token;
      // return false;
      this.$http.get(url).then(result=>{
          if(result.status==200){
              if(result.data.bStatus==true){
                  this.$router.push({ path:'../../login'})
                  this.$store.commit(types.LOGOUT);
                  this.$message(this.$t("message.setting.Changecg"));
              }else{
                  this.$message(this.$t("message.setting.Changesb"));
              }
              
          }
      })
    },
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
.editinput{
    -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 80%;
  }
  .el-dialog__wrapper >>>.el-form-item__content{
        margin-left: 160px !important;
  }
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
.dropdown-menu>li>a{
  background: none;
}
a{
  color: #000;
  width: 100%;
}
.apiab{
  font-size: 16px;
  color: #030303;
  margin-right: 10px;
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
.dialog >>>.el-dialog{
  background: #ffffff;
  padding: 20px 0;
}
.dialog >>>.el-dialog__header{
  text-align: left;
}
.dialog >>>.el-dialog__title{
  color: #229DDD;
}
.dialog >>>.el-dialog__footer{
  text-align: right;
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
  /* margin-left: 8px; */
  
}
.hide-menu1{
  width: 100%;
  /* display: block; */
  /* margin-left: 8px; */
  
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

.apiab {
    padding: 0;
    margin: 0;
}
</style>

