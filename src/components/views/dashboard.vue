<template>
<div>
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">{{$t("message.dashboard.dashboard")}}</h4> </div>

            </div>
            <div class="row">
            <div class="col-lg-3 col-md-6">
            <div class="white-box">
                <h3 class="box-title">{{$t("message.dashboard.system_info")}}</h3>
                <ul class="country-state">
                    <li>
                        <h5>{{$t("message.dashboard.version")}}: {{information.strVersion}}</h5>
                        <div class="progress">
                            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:100%;"></div>
                        </div>
                    </li>
                    <li>
                        <h5 >{{$t("message.dashboard.hostid")}}: <font size="1">{{information.strHostId}}</font></h5>
                        <div class="progress">
                            <div class="progress-bar progress-bar-inverse" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:100%;"></div>
                        </div>
                    </li>
                    <li>
                        <h5>{{$t("message.dashboard.license")}}: {{information.strLicenseType}}</h5>
                        <div class="progress">
                            <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:100%;"></div>
                        </div>
                    </li>
                    <li>
                        <h5>{{$t("message.dashboard.channel")}}: {{information.strChannelLimit}}</h5>
                        <div class="progress">
                            <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:100%;"></div>
                        </div>
                    </li>
                    <li>
                        <h5>{{$t("message.dashboard.endtime")}}: {{information.strEndtime}}</h5>
                        <div class="progress">
                            <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style="width:100%;"></div>
                        </div>
                    </li>

                </ul>
                 </div>
                 </div>


                    <div class="col-lg-3 col-md-6">
                        <div class="panel">
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h1 class="m-b-0 m-t-0 font-medium">{{runInfo.strCPU}}</h1>
                                        <h5 class="m-t-0">CPU</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-success btn-circle btn-xl pull-right"><i class="icon-graph"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h1 class="m-b-0 m-t-0 font-medium">{{runInfo.strMemory}}</h1>
                                        <h5 class="m-t-0">{{$t("message.dashboard.memory")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-default btn-circle btn-xl pull-right"><i class="icon-graph"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h5 class="m-b-0 m-t-0 font-medium">{{runInfo.strRunTime}}</h5>
                                        <h5 class="m-t-0">{{$t("message.dashboard.running")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-primary btn-circle btn-xl pull-right"><i class="icon-speedometer"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-lg-3 col-md-6">
                        <div class="panel">
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h1 class="m-b-0 m-t-0 font-medium">{{runInfo.strNetworkIn}}</h1>
                                        <h5 class="m-t-0">{{$t("message.dashboard.network_in")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-success btn-circle btn-xl pull-right"><i class="icon-graph"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h1 class="m-b-0 m-t-0 font-medium">{{runInfo.strNetworkOut}}</h1>
                                        <h5 class="m-t-0">{{$t("message.dashboard.network_out")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-success btn-circle btn-xl pull-right"><i class="icon-graph"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h2 class="m-b-0 m-t-0 font-medium">{{runInfo.strFreeSpace}}</h2>
                                        <h5 class="m-t-0">{{$t("message.dashboard.free_space")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-default btn-circle btn-xl pull-right"><i class="icon-screen-desktop"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-3 col-md-6">
                        <div class="panel">

                           <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h1 class="m-b-0 m-t-0 font-medium">{{srcInfo.nSrcOnline}}</h1>
                                        <h5 class="m-t-0">{{$t("message.dashboard.online_cam")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-success btn-circle btn-xl pull-right"><i class="icon-grid"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h1 class="m-b-0 m-t-0 font-medium">{{srcInfo.strSrcCnt}}</h1>
                                        <h5 class="m-t-0">{{$t("message.dashboard.cameras")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-info btn-circle btn-xl pull-right"><i class="icon-grid"></i></button>
                                    </div>
                                </div>
                            </div>

                            <div class="panel-footer">
                                <div class="row">
                                    <div class="col-xs-6">
                                        <h2 class="m-b-0 m-t-0 font-medium">{{runInfo.strTotalSpace}}</h2>
                                        <h5 class="m-t-0">{{$t("message.dashboard.total_space")}}</h5> </div>
                                    <div class="col-xs-6">
                                        <button type="button" class="btn mtbutton btn-default btn-circle btn-xl pull-right"><i class="icon-screen-desktop"></i></button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>





                 </div>
            </div>
            </div>
        </div>
</div>

</template>


<script>
export default {
    name: 'dashboard',
	data(){
        return{
            information:{
                strVersion: "",
                strHostId: "",
                strLicenseType: "",
                strLicenseFull: "",
                strChannelLimit: "",
                strEndtime: ""
            },
            runInfo:{
                strRunTime: "",
                strCPU: "",
                strMemory: "",
                strNetworkIn: "",
                strNetworkOut: "",
                strTotalSpace: "",
                strFreeSpace: ""
            },
            srcInfo:{
                strSrcCnt: "",
                nSrcOnline: 0
            },
            timerRunInfo: undefined 

        }
    },
    beforeDestroy() {
        console.log('Dashboard', "beforeDestroy");
        clearInterval(this.timerRunInfo);

    },
    destroyed() {
        console.log('Dashboard', "destroyed");
    },
    mounted:function(){
        let _this =this;
        this.GetSystemInfo();
        this.GetSrcInfo();
        this.GetRunInfo();
        this.timerRunInfo = setInterval(() => {
                            this.GetRunInfo();
                            }, 5000);
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
                console.log(result);
                if (result.status == 200) 
                {
                    _this.information = result.data;
                }
            }).catch(error => {
                console.log('GetSystemInfo', error);
            });

        },

        GetSrcInfo()
        {
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            var url = root + "/api/v1/GetSrc?session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200) 
                {
                    var data =  result.data;
                    _this.srcInfo.strSrcCnt = data.src.length;
                    _this.srcInfo.nSrcOnline = 0;
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];

                        if(item['bOnline'])
                        {
                            _this.srcInfo.nSrcOnline ++;
                        }
                    }
                }
            }).catch(error => {
                console.log('GetSrc', error);
            });
        },

        GetRunInfo()
        {
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetRunInfo?session="+ this.$store.state.token;
            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200) 
                {
                    _this.runInfo = result.data;
                }
            }).catch(error => {
                console.log('GetRunInfo', error);
            });

        }
    }
}
</script>