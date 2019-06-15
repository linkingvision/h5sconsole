<template>
<div>
    <div id="page-wrapper">

                <div class="container-fluid">
                    <div class="row bg-title">
                        <div class="col-lg-3 col-md-4 col-sm-4 col-xs-4">
                            <h4 class="page-title">{{$t("message.setting.setting")}}</h4> 
                        </div>
                    </div>
                </div>


                <div class="row">
                    <!-- Left sidebar -->
                    <div class="col-md-12">
                        <div class="white-box">
                            <!-- row -->
                            <div class="row">
                                <div class="col-lg-2 col-md-3  col-sm-12 col-xs-12 inbox-panel">
                                    <div> <a href="javascript:void(0)" class="btn btn-default btn-block waves-effect waves-light">{{$t("message.setting.setting")}}</a>
                                        <div class="list-group mail-list m-t-20"> 
                                        <router-link  :to="{name:'devSettingRouter'}">
                                        <a href="javascript:void(0)" class="list-group-item">{{$t("message.setting.device")}} </a> 
                                        </router-link>
                                        <router-link  :to="{name:'devSDKSettingRouter'}">
                                        <a href="javascript:void(0)" class="list-group-item">{{$t("message.setting.devicesdk")}} </a> 
                                        </router-link>
                                        <router-link  :to="{name:'devRTMPPushSettingRouter'}">
                                        <a href="javascript:void(0)" class="list-group-item">{{$t("message.setting.devicertmppush")}} </a> 
                                        </router-link>
                                        <router-link  :to="{name:'userSettingRouter'}">
                                        <a href="javascript:void(0)" class="list-group-item">{{$t("message.setting.user")}} </a> 
                                        </router-link>
                                        <!-- <router-link  :to="{name:'devSearchRouter'}">
                                        <a href="javascript:void(0)" class="list-group-item ">Search</a> 
                                        </router-link>
                                        -->
                                       
                                    </div>

                                    </div>
                                </div>
                                <div class="col-lg-10 col-md-9 col-sm-12 col-xs-12 mail_listing">
                                    <router-view></router-view>
                                </div>
                            </div>
                            <!-- /.row -->
                        </div>
                    </div>
                </div>

    </div>

</div>
</template>   


<script>
//http://bootstrapswitch.site/examples.html
export default {
    name: 'setting',
}
</script>


<style scoped>

</style>