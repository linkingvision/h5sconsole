<template>
    <div>
    <!--  <div class="preloader">
    <div class="cssload-speeding-wheel"></div>
    </div>
    -->
    <section id="wrapper" class="new-login-register">
        <div class="lg-info-panel">
                <div class="inner-panel">
                    <a href="javascript:void(0)" class="p-20 di"><img src="../assets/img/logo.png"></a>
                    <div class="lg-content">
                        <h2>H5S CONSOLE</h2>
                        <p class="text-muted">{{ $t("message.login.high_perf") }}</p>
                    </div>
                </div>
        </div>
        <div class="new-login-box">
                    <div class="white-box">
                        <h3 class="box-title m-b-0">{{ $t("message.login.signin") }}</h3>
                        <small id='loginStatusId'>{{loginStatus}}</small>
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
    data () {
        return {
            user: '',
            passwd: '',
            session:'',
            loginStatus: '',
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
            model1: this.$store.state.lang
        }
    },
    mounted(){
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
            console.log("login");
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            console.log('passwd md5', $.md5(_this.passwd));
            $.ajax({
                type: "GET",
                url: root + "/api/v1/Login?user=" + _this.user + "&password=" + $.md5(_this.passwd),
                dataType: "json",
                success: function(data){
                    console.log(data);
                    if (data['bStatus'] == true)
                    {
                        console.log('session', data['strSession']);
                        _this.$store.commit(types.LOGIN, data['strSession']);
                        let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                        console.log('redirect', redirect);
                        if (redirect == '/login')
                        {
                            redirect = '/';
                        }
                        _this.$router.push({
                            path: redirect
                        });
                    }else 
                    {
                        _this.loginStatus = this.$t("message.login.login_status_failed");
                        $('#loginStatusId').addClass('longStatusFailColor');
                    }
                },
                error:function(e){
                    console.log('Login failed!');
                    _this.loginStatus = this.$t("message.login.login_status_failed");
                    $('#loginStatusId').addClass('longStatusFailColor');

                }
            });


      }
  }
}
</script>


<style scoped>

.longStatusFailColor {
    color: #e91313 !important;
}

</style>
