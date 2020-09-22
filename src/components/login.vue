<template>
    <div>
        <!-- <div class="preloader">
            <div class="cssload-speeding-wheel"></div>
        </div> -->
   
        <section id="wrapper" class="login_con">
            <div class="login_but">
                <router-link :to="{name:'DownloadappRouter'}"><el-button class="but_jump" plain>{{this.$t("message.archive.Download")}}</el-button></router-link>
            </div>
            <!-- <div class="lg-info-panel">
                <div class="inner-panel">
                    <a href="javascript:void(0)" class="p-20 di"><img src="./gallery/WechatIMG@2x.png"/></a>
                </div>
            </div> -->
            <div class="longin_logo"></div>
            <div class="login_box">
                <div class="white-box">
                    <div class="prompt" id="prompt">
                        <i class="iconfont icon-ts-caveat"></i> <span>用户名或密码错误，请您重新输入，剩余次数{{frequency}}次。</span>
                    </div>
                    <div class="prompt" id="prompt1">
                        <i class="iconfont icon-ts-caveat"></i> <span>错误次数过多，账户已锁定 ,请{{lockingdate}}分钟后再试!</span>
                    </div>
                    <form class="form-horizontal new-lg-form" id="loginform" novalidate @submit.stop.prevent="login">
                        <div class="form-group  m-t-20">
                            <div class="col-xs-12 logo_ipt">
                                <span class="logo_icon"></span>
                                <!-- <Label >{{ $t("message.login.username") }}</Label> -->
                                <input class="form-control" type="text" v-model="user" required="" placeholder="Username">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 logo_ipt">
                                
                                <span class="logo_icon1"></span>
                                <!-- <label>{{ $t("message.login.password") }}</label> -->
                                <input class="form-control" type="password" v-model="passwd" required="" placeholder="Password">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 language">
                                <label>{{ $t("message.login.language") }}</label>
                                <Select class="language_size" v-model="model1" @on-change="changeLanguage" >
                                    <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <button class="btn btn-info btn-block" type="submit">{{ $t("message.login.login") }}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <div class="login_butt">
            <div class="login_butt_back"></div>
            <div class="login_butt_size">  {{date}} &copy; linkingvision.com </div>
        </div>
    </div>
</template>

<script>
import * as types from '@/store/types'
import '@/assets/jQuery.md5.js'
export default {
  name: 'Login',
  inject: ['reload'],

    data () {
        return {
            date:new Date().getFullYear(),
            user: '',
            passwd: '',
            session:'',
            langList: [
                    {
                        value: 'en',
                        label: 'English'
                    },
                    {
                        value: 'zhchs',
                        label: '简体中文'
                    }
                ],
            model1: this.$store.state.lang,
            frequency:0,
            lockingdate:0
        }
    },
    mounted(){
        $("#prompt").hide();
        $("#prompt1").hide();
        this.$store.commit(types.TITLE, 'Login')
        
    },
    methods:{
        changeLanguage(value){

            if(value=='en'){
                this.$i18n.locale='en'
            }
            if(value=='zhchs'){
                this.$i18n.locale='zhchs'
            }
            console.log("changeLanguage", value);
            this.$store.commit(types.LANG, value);

        },

        login(){
            // console.log("login");
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            // console.log(root)
            // return false
            $.ajax({
                type: "GET",
                url: root + "/api/v1/Login?user=" +encodeURIComponent( _this.user) + "&password=" +encodeURIComponent( $.md5(_this.passwd)),
                dataType: "json",
                success: function(data){
                    if (data.bStatus == true)
                    {
                        $("#prompt").hide();
                        $("#prompt1").hide();
                        _this.$store.commit(types.LOGIN, data['strSession']);
                        // console.log(data['strSession']);  
                        _this.loginroot(data['strSession']);
                        
                    }else 
                    {
                        console.log(data)
                        if(data.nFaultTimes<=3){
                            _this.frequency=3-data.nFaultTimes;
                            // console.log("data还能错次拉",3-data.nFaultTimes,_this.frequency);
                            $("#prompt").show();
                            $("#prompt1").hide();
                        }else{
                            _this.lockingdate = Math.floor(data.tLockTimeResidue/60);
                            $("#prompt1").show();
                            $("#prompt").hide();
                            console.log("data请等待",_this.lockingdate,data.tLockTimeResidue)
                        }
                        _this.$message(_this.$t("message.login.login_status_failed"));
                    }
                },
                error:function(e){
                    console.log('Login failed!',e);
                }
            });


        },
        //权限
        loginroot(token){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if(this.user==""||this.passwd==""){
                console.log("输入密码",this.user)
                return false
            }
            var url1 = root + "/api/v1/GetUserInfo?user="+encodeURIComponent(this.user)+"&session="+token;
            this.$http.get(url1).then(result=>{
                console.log(result)
                this.$store.commit(types.ROOT, result.data.strUserType);
                this.$store.commit(types.USER, result.data.strUser);
                this.$router.push({
                    path: '/app/dashboard'
                });
                
                location.reload();
            })
            
        }
  }
}
</script>


<style scoped>
.login_butt{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    width: 100%;
    height: 30px;
    position: fixed;
    bottom: 0;
    text-align: center;
}
.login_butt_back{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    position: absolute;
    top: 0;
}
.login_butt_size{
    width: 100%;
    position: absolute;
    top: 0;
    line-height: 30px;
}

/*  */

.language label{
    font-size:16px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(34,38,44,1);
}
.language_size >>> .ivu-select-selection{
    border: 0 ;
    border-bottom:1px solid rgba(226,226,226,1);
    opacity:0.7;
}
/*  */
.logo_ipt{
    display: flex;
    border-bottom:1px solid rgba(226,226,226,1);
    opacity:0.7;
}
.logo_ipt input{
    border: 0;
    background:none;
}
.logo_icon{
    height: 30px;
    background: url("./gallery/login_name.png") no-repeat center center;
    padding:  0 20px;
}
.logo_icon1{
    height: 30px;
    background: url("./gallery/login_pass.png") no-repeat center center;
    padding:  0 20px;
}
.longin_logo{
    width: 100%;
    height: 140px;
    margin: 5% auto 0;
    background: url("./gallery/login_logo.png") no-repeat center center;
}
/* 下载按钮 */
.login_but{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
}
.but_jump{
    font-size:14px;
    /* font-family:PingFang SC; */
    font-weight:500;
    color:rgba(32,137,229,1);
    margin-top: 10px;
    border:1px solid rgba(31,136,229,1);
    border-radius:5px;
    padding: 7px 11px;
}
/*错误提示 */
.prompt{
    font-size:7px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(208,19,19,1);
}

.login_con{
    height: 100%;
    width: 100%;
    background: url("./gallery/login_back.png");
    /* display: flex; */
    position: fixed;
}
.lg-info-panel{
    width: 60% !important;
    background: url("./gallery/cover.png") no-repeat -5px !important;
    background-size: 100%;
    height: 100%;
}
.login_box{
    width: 24%;
    height: 100%;
    margin: 0 auto;
}
.white-box{
    padding: 8% 12%;
    /* margin-top: 10%; */
    box-shadow: none!important;
}
.box-title{
    font-size: 24px;
    color: #333333;
}
.longStatusFailColor {
    color: #e91313 !important;
}

</style>
