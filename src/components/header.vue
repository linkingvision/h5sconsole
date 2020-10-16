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
        <li>
          <a href="javascript:void(0)" class="open-close waves-effect waves-light visible-xs">
            <i class="ti-close ti-menu"></i>
          </a>
        </li>
		<!-- 重启 -->
		<li style="margin-right: 10px;">
			<div class="c_Docker" id="Docker"></div>
        </li>
		<li class="dropdown control_center" id="Reboot">
			<el-tooltip :content="label.Reboot" placement="bottom" effect="light">
				<el-button @click="Rebootdialog=true" style="border: none;background: none; color:#fff;line-height: 0.9;padding-right: 10px;" >
					<i style=" font-size: 20px;color:#ea5252;font-weight: 900;" class="iconfont icon-zhongqi"></i>
				</el-button>
			</el-tooltip>
		</li>
        <!-- link模式 -->
        
        <li style="margin-right: 25px;" class="dropdown control_center link_style">
          <el-switch
            @change="linkweblick"
            class="linkwed"
            v-model="value"
            active-color="#5DBFA6">
          </el-switch>
          <span>Linkweb</span>
        </li>
        <!-- 控制中心 -->
        <li class="dropdown control_center">
          <!-- <span></span> -->
            
            <el-tooltip class="item" effect="light" :content="label.Control" placement="bottom">
              <router-link :to="{name:'ControlRouter'}">
                <i class="iconfont icon-kongzhizhongxin"></i>
              </router-link> 
            </el-tooltip>
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
                    <span style="margin-right: 10px; margin-left: -10px;" class="apiab iconfont icon-icon-test"></span>
                    <span class="admin_zi hide-menu">
                        {{label.Change}}
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
                <a href="doc/api.html" class="waves-effect" > 
                  <span  style="margin: 0 10px 0 16px;" class=" apiab iconfont icon-category"></span>
                  <span class="admin_zi">
                        {{$t("message.header.API")}}
                    </span> 
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
                    class="plugin_adout"
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
            <li role="separator" class="divider"></li>
            <li>
              <router-link :to="{name:'DownloadappRouter'}">
                <span class="apiab iconfont icon-download"></span>
                <span class="admin_zi">
                  {{label.Download}}
                </span> 
              </router-link>
            </li>
            <li role="separator" class="divider"></li>
            <li @click="Rebootdialog=true">
                <span class="apiab iconfont icon-zhongqi"></span>
                <span class="admin_zi">
                  {{label.Reboot}}
                </span> 
            </li>
          </ul>
          <!-- /.dropdown-user -->
        </li>
        <el-dialog
            class="plugin"
            :visible.sync="centerDialogVisiblex"
            width="25%"
            append-to-body
            center>
            <div class="plugin_back">
            </div>
            <div class="plugin_size">
                <div>{{label.control1}}</div>
                <router-link :to="{name:'DownloadappRouter'}" class="plugin_size1">
                  {{label.goto}}
              </router-link>
            </div>
        </el-dialog>
        <el-dialog
			class="Rebootdialog"
			title="重启"
			append-to-body
			:visible.sync="Rebootdialog"
			width="30%">
			<div class="Rebootdialog1">
				<div style="">修改后请您重启</div>
				<div slot="footer" class="dialog-footer" style="display: flex;justify-content: flex-end;">
					<el-button type="primary" @click="Reboot">{{label.Reboot}}</el-button>
				</div>
			</div>
        </el-dialog>
      </ul>
    </div>

  </nav>
</template>
<script>
import * as types from "@/store/types";
import '@/assets/jQuery.md5.js'
import {H5sPlayerCanvas,H5sPlayerCanvasGetLinkWebVersion} from '../assets/linkplayer.js'
import Vue from 'vue'
import { Loading } from 'element-ui';
export default {
  name: "vheader",
  methods: {},
  data() {
    return {
		Rebootdialog:false,
        value:'',
        user:this.$store.state.users,
        gEvvalue: 0,
        centerDialogVisible:false,
        centerDialogVisiblex:false,
        Operator:false,
        information:{
            strVersion: ""
        },
        editPopup:false,//编辑弹窗
        form: {
          strUser:this.$store.state.users,
          olPassword: "",
          nePassword:"",
          nePassword1:""
      },
      label:{
          Edit:this.$t("message.table.Edit"),
          user:this.$t("message.setting.username"),
          role:this.$t("message.setting.role"),
          type:this.$t("message.setting.Authority"),
          olPassword:this.$t("message.setting.currentpass"),
          nePassword:this.$t("message.setting.newpass"),
          nePassword1:this.$t("message.setting.confirmpass"),
          Change:this.$t("message.setting.Change"),
          Download:this.$t("message.archive.Download"),
          Control:this.$t("message.left.Control"),
          goto:this.$t("message.header.goto"),
          control1:this.$t("message.header.control"),
          Reboot:this.$t("message.header.Reboot")
      },
      options: [{
              value: 'Administrator',
              label: 'Administrator'
          }, {
              value: 'Operator',
              label: 'Operator'
          }
      ]
    };
  },
  mounted() {
	$("#Reboot").hide()
    if (window.ActiveXObject || "ActiveXObject" in window){
        this.$store.state.link="true"
        this.value=true;
        $(".linkwed").css("pointer-events", "none");
        console.log("ie")
        var _this=this
        H5sPlayerCanvasGetLinkWebVersion(function(strVer){
          console.log(strVer); 
        }, 
        function(){
          _this.centerDialogVisiblex=true;
          console.log('Please install LinkWeb 111!'); 
        });
    }else{
        if(this.$store.state.link=="true"){
            this.value=true;
        }else if(this.$store.state.link=="false"){
            this.value=false
        }
        $(".link_style").hide();
        console.log("not ie")
    }
    this.gEventval();
	this.GetSystemInfo();
	this.dockerdata();
	var _this=this
	_this.$root.bus.$on('webrtc', function(token){
		$("#Reboot").show();
	});
  },
  methods: {
	dockerdata(){
		var root = process.env.API_ROOT;
		if (root == undefined){
			root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		}
		var url = root + "/api/v1/GetEnableLinkagent?session="+ this.$store.state.token;
		// console.log(url)
		this.$http.get(url).then(result=>{
			console.log(result)
			if(result.status==200){
				console.log(result)
				if(result.data.enable){
					document.getElementById('Docker').style.display='block'
				}
			}
		})
	},
	Reboot(){
		var root = process.env.API_ROOT;
		if (root == undefined){
			root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		}
		var url = root + "/api/v1/Restart?session="+ this.$store.state.token;
		this.$http.get(url).then(result=>{
			if(result.status==200){
				if(result.data.bStatus){
					console.log("重启",result.data.bStatus)
				}
			}
		})
		
		var loading = Vue.prototype.$loading({
			lock: true,
			text: '重启',
			background:"RGBA(0, 0, 0, 0.5)",
			target: '.Rebootdialog1'  // 需要loading的元素的类名
		})
		setTimeout(()=>{
			this.$nextTick(()=>{
				loading.close();
				this.$router.push({ path:'../../login'})
			})
		},1000*30)
	},
    linkweblick(){
      var link=this.value;
      // return false;
      if(link==false){
        this.centerDialogVisiblex=false;
        this.$store.commit(types.LINK, "false");
        this.$store.state.link="false"
        var a="false"
        this.$root.bus.$emit('liveplaylink',a)
      }else if(link==true){
        var _this=this
        H5sPlayerCanvasGetLinkWebVersion(function(strVer){
          console.log(strVer); 
        }, 
        function(){
          _this.centerDialogVisiblex=true;
          console.log('Please install LinkWeb 111!'); 
        });
        var a="true"
        this.$store.commit(types.LINK, "true");
        this.$store.state.link="true"
        this.$root.bus.$emit('liveplaylink',a)
      }
    },
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
.c_Docker{
    width: 35px;
	height: 40px;
    background: url("./gallery/Docker.png") center center no-repeat;
	background-size: 75%;
    display: none;
}

.Rebootdialog >>>.el-dialog__body{
	padding: 20px 10px;
}
.Rebootdialog .Rebootdialog1{
	padding: 30px 20px;
}

.plugin >>> .el-dialog{
  background: #FFFFFF;
}
.plugin >>>.el-dialog__header{
  padding: 0;
}
.plugin_back{
  width: 100%;
  height: 200px;
  background: url("./gallery/header_tk.png") no-repeat center;

}
.plugin_size{
  font-size:16px;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(1,1,1,1);
  text-align: center;
}
.plugin_size1{
  font-size:14px;
  font-family:PingFang SC;
  font-weight:500;
  color:rgba(0,144,255,1);
}
/*  */
.linkwed{
  width: 30px;
	height: 40px;
	margin-right: 8px;
}
.linkwed>>>.el-switch__core{
	height: 15px;
}
.linkwed>>>.el-switch__core:after{
	width: 11px;
	height: 11px;
}
.linkwed.is-checked >>>.el-switch__core::after{
	left: 100%;
	margin-left: -11px;
}
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
  .plugin_adout >>>.el-form-item__content{
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
}
.navbar-top-links>li>a {
    padding: 0 10px;
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
.plugin_adout >>> .el-dialog{
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
.plugin_adout >>>  .el-dialog--center .el-dialog__body {
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
  min-width: 130px;
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
  background:#0b0d10;
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

