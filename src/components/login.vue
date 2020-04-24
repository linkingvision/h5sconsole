<template>
    <div>
    <!--  <div class="preloader">
    <div class="cssload-speeding-wheel"></div>
    </div>
    -->
    <section id="wrapper" class="login_con">
        <div class="lg-info-panel">
            <div class="inner-panel">
                <a href="javascript:void(0)" class="p-20 di"><img src="./gallery/WechatIMG@2x.png"/></a>
                
            </div>
        </div>
        <div class="login_box">
            <div class="white-box">
                <h3 class="box-title m-b-0">{{ $t("message.login.signin") }}</h3>
                <div class="prompt" id="prompt">
                    <i class="iconfont icon-ts-caveat"></i> <span>用户名或密码错误，请您重新输入，剩余次数{{frequency}}次。</span>
                </div>
                <div class="prompt" id="prompt1">
                    <i class="iconfont icon-ts-caveat"></i> <span>错误次数过多，账户已锁定 ,请{{lockingdate}}分钟后再试!</span>
                </div>
                <form class="form-horizontal new-lg-form" id="loginform" novalidate @submit.stop.prevent="login">
                    <div class="form-group  m-t-20">
                        <div class="col-xs-12">
                            <Label >{{ $t("message.login.username") }}</Label>
                            <input class="form-control" type="text" v-model="user" required="" placeholder="Username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                            <label>{{ $t("message.login.password") }}</label>
                            <input class="form-control" type="password" v-model="passwd" required="" placeholder="Password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                            <button class="btn btn-info btn-lg btn-block btn-rounded text-uppercase waves-effect waves-light" type="submit">{{ $t("message.login.login") }}</button>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-xs-12">
                                <label>{{ $t("message.login.language") }}</label>
                                <Select v-model="model1" @on-change="changeLanguage" >
                                    <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    
    </section>
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
            lockingdate:0,
        }
    },
    mounted(){
        $("#prompt").hide();
        $("#prompt1").hide();
        this.$store.commit(types.TITLE, 'Login');
        
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
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                if (redirect == '/login')
                {
                    redirect = '/';
                }
                this.$router.push({
                    path: redirect
                });
                
                location.reload();
            })
            
        },
  }
}
</script>


<style scoped>
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
    display: flex;
}
.lg-info-panel{
    width: 60% !important;
    background: url("./gallery/cover.png") no-repeat -5px !important;
    background-size: 100%;
    height: 100%;
    position: fixed;
}
.login_box{
    width: 40%;
    height: 100%;
    position: fixed;
    right: 0;
}
.white-box{
    padding: 22%;
    margin-top: 10%;
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
