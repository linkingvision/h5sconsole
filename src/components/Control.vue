<template>
    <div id="wrapper" class="login_con">
        <div class="control_header">
            <div class="control_header1">
                <div class="control_size"></div>
                <router-link :to="{name:'dashboardRouter'}">
                    <div class="control_fanhui">
                    </div>
                </router-link>
            </div>
        </div>
        <div class="control_content">
            <!-- 1 -->
            <div class="control_cpu">
                <div class="cpu_Network">
                    <div class="play_live_back">
                        <img src="./control-img/cpu@2x.png" alt="">
                    </div>
                    <div class="device">{{this.$t("message.dashboard.an_out")}}</div>
                    <div id="container" style="width:100%;height: 80%; padding-left: 4%;"></div>
                </div>
                <div class="cpu_cpu">
                    
                    <div class="play_live_back">
                        <img src="./control-img/cpu@2x.png" alt="">
                    </div>
                    <div class="device">CPU</div>
                    <div id="container1" style="width:100%;height: 80%; padding-left: 4%;"></div>
                </div>
                <div class="cpu_dev">
                    <div class="play_live_back">
                        <img src="./control-img/cpu@2x.png" alt="">
                    </div>
                    <div class="device">{{this.$t("message.dashboard.device")}}</div>
                    <div class="cpu_dev_sdk">
                        <div class="cpu_sdk">
                            <div class="dev_sdk">
                                <dv-water-level-pond :config="round"/>
                                <div class="containesr_sdks_zi">
                                    <div>{{Hikvision}}</div>
                                    <div>{{total}}{{dev.nHikDevTotal}}{{ge}}</div>
                                </div>
                            </div>
                            <div class="dev_sdk">
                                <dv-water-level-pond :config="round1"/>
                                <div class="containesr_sdks_zi">
                                    <div>{{Dahua}}</div>
                                    <div>{{total}}{{dev.nDhDevTotal}}{{ge}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="cpu_sdk">
                            <div class="dev_sdk">
                                <dv-water-level-pond :config="round2"/>
                                <div class="containesr_sdks_zi">
                                    <div>{{Tiandy}}</div>
                                    <div>{{total}}{{dev.nTdDevTotal}}{{ge}}</div>
                                </div>
                            </div>
                            <div class="dev_sdk">
                                <dv-water-level-pond  :config="round3"/>
                                <div class="containesr_sdks_zi">
                                    <div>GB</div>
                                    <div>{{total}}{{dev.nGbDevTotal}}{{ge}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 2 -->
            <div class="control_play">
                <div class="play_content">
                    <div class="play_live">
                        <div class="play_live_back">
                            <img src="./control-img/play.png" alt="">
                        </div>
                        <div class="play_live_play">
                            <div name='flex' class="videoColor" v-for="r in rows" :key="r">
                                <div class="palace" name="flex" v-for="c in cols" :key="c">
                                    <v-Controlplay v-bind:id="'h'+r+c" :h5id="'tour'+r+c" :rows="rows" :cols="cols" :h5videoid="'hvideo'+r+c">
                                    </v-Controlplay>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="play_info">
                        <div class="info_date">
                            {{dateany}}
                        </div>
                        <div class="info_info">
                            <div class="play_live_back">
                                <img src="./control-img/info@2x.png" alt="">
                            </div>
                            <div class="info_system">
                                <div>{{this.$t("message.dashboard.system_info")}}</div>
                                <div class="flex_nc_ag">
                                    <div class="flex_nc_zong" v-if="capability">
                                        <div class="flex_nc_cpu">
                                            <span class="cpu_zuo" >{{capability[0].name}}:</span>
                                            <span class="cpu_you"> {{capability[0].id}}</span>
                                        </div>
                                        <div class="flex_nc_cpu">
                                            <span class="cpu_zuo">{{capability[1].name}}:</span>
                                            <span class="cpu_you"> {{capability[1].id}}</span>
                                        </div>
                                        <div class="flex_nc_cpu">
                                            <span class="cpu_zuo">{{capability[2].name}}:</span>
                                            <span class="cpu_you"> {{capability[2].id}}</span>
                                        </div>
                                    </div>
                                    <div class="flex_nc_zong" v-if="capability">
                                        <div class="flex_nc_cpu">
                                            <span class="cpu_zuo">{{capability[3].name}}:</span>
                                            <span class="cpu_you"> {{capability[3].id}}</span>
                                        </div>
                                        <div class="flex_nc_cpu">
                                            <span class="cpu_zuo">{{capability[4].name}}:</span>
                                            <span class="cpu_you"> {{capability[4].id}}</span>
                                        </div>
                                        <div class="flex_nc_cpu">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 3 -->
            <div class="control_sdk">
                <div class="sdk_Memory">
                    <div class="sdk_Memory1">
                        <el-progress
                        v-if="strRunTime"
                        type="circle"
                        color="#E66A44"
                        :width='100'
                        :percentage="Number(Math.round((strRunTime.nTotalSpaceByte-strRunTime.nFreeSpaceByte)/strRunTime.nTotalSpaceByte*100))"></el-progress> 
                        <div>{{this.$t("message.dashboard.free_space")}}</div>
                    </div>
                    <div class="sdk_Memory1">
                        <el-progress
                            type="circle"
                            :width='100'
                            v-if="strRunTime"
                            color="#792ACB"
                            :percentage="Number(strRunTime.nMemoryUsage)"></el-progress>
                        <div>{{this.$t("message.dashboard.memory")}}</div>
                    </div>
                </div>
                <div class="sdk_Running">
                    <div class="play_live_back">
                        <img src="./control-img/running@2x.png" alt="">
                    </div>
                    <div class="zong_mve">
                        <div>{{this.$t("message.dashboard.running")}}</div>
                        <div style="color:#04D189;">{{strRunTime.strRunTime}}</div>
                    </div>
                    <div class="zong_mve">
                        <div>{{this.$t("message.dashboard.cameras")}}</div>
                        <div style="color:#275FD0;">{{dev.nCameraTotal}}</div>
                    </div>
                    <div class="zong_mve">
                        <div>{{this.$t("message.dashboard.online_cam")}}</div>
                        <div style="color:#DDB401;">{{dev.nCameraOnline}}</div>
                    </div>
                </div>
                <div class="sdk_sdk">
                    <div class="play_live_back">
                        <img src="./control-img/sdk@2x.png" alt="">
                    </div>
                    <div class="device">{{this.$t("message.dashboard.device")}}</div>
                    <div class="container_sdk">
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config"/>
                            <div class="containesr_sdks_zi">
                                <div>{{this.$t("message.dashboard.Cloud")}}</div>
                                <div>{{total}}{{dev.nCloudTotal}}{{ge}}</div>
                            </div>
                        </div>
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config1"/>
                            <div class="containesr_sdks_zi">
                                <div>RTSP/RTMP</div>
                                <div>{{total}}{{dev.nRTSPRTMPTotal}}{{ge}}</div>
                            </div>
                        </div>
                    
                    </div>
                    <div class="container_sdk">
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config2"/>
                            <div class="containesr_sdks_zi">
                                <div>ONVIF</div>
                                <div>{{total}}{{dev.nONVIFTotal}}{{ge}}</div>
                            </div>
                        </div>
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config3"/>
                            <div class="containesr_sdks_zi">
                                <div>{{this.$t("message.dashboard.RTMP")}}</div>
                                <div>{{total}}{{dev.nRTMPPushTotal}}{{ge}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="control_bottom"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import Controlplay from './Controlplay'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../assets/h5splayerhelper.js'
export default {
    name: 'Control',
    components: {
        'v-Controlplay': Controlplay
    },
    data () {
        return {
            rows: 2,
            cols: 2,
            strRunTime:"",
            title_text:this.$t("message.dashboard.an_out"),
            network_in:this.$t("message.dashboard.network_in"),
            network_out:this.$t("message.dashboard.network_out"),

            total:this.$t("message.dashboard.total"),
            ge:this.$t("message.dashboard.ge"),

            Hikvision:this.$t("message.dashboard.Hikvision"),
            Dahua:this.$t("message.dashboard.Dahua"),
            Tiandy:this.$t("message.dashboard.Tiandy"),
            
            dev:{},
            dateany:"",
            capability:"",
            timersetInterval:"",//定时器
            streamprofile:"main",
            token_index:"",
            config:{
                data: [0],
                shape: 'roundRect',
                waveHeight:10,
                waveNum:2
            },
            config1:{
                data: [0],
                shape: 'roundRect',
                waveHeight:10,
                waveNum:2
            },
            config2:{
                data: [0],
                shape: 'roundRect',
                waveHeight:10,
                waveNum:2
            },
            config3:{
                data: [0],
                shape: 'roundRect',
                waveHeight:10,
                waveNum:2
            },
            round:{
                data: [0],
                shape: 'round',
                waveHeight:10,
                waveNum:2,
                colors:['#2E55E3', '#48A9FB']
            },
            round1:{
                data: [0],
                shape: 'round',
                waveHeight:10,
                waveNum:2,
                colors:['#0FB870', '#05B6CD']
            },
            round2:{
                data: [0],
                shape: 'round',
                waveHeight:10,
                waveNum:2,
                colors:['#D0234D', '#F13E26']
            },
            round3:{
                data: [0],
                shape: 'round',
                waveHeight:10,
                waveNum:2,
                colors:['#2E55E3', '#48A9FB']
            },
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        }
    },
    mounted(){
        this.GetSystemInfo();
        this.GetRunInfo();
        this.GetDeviceSummary();
        this.timedate();
        this.Playall();
        this.timerRunInfo1 = setInterval(() => {
            this.timedate();
        },1000)
        this.timerRunInfo = setInterval(() => {
            this.GetRunInfo();
        }, 5000);
        this.timerRunInfo2 = setInterval(() => {
            this.GetDeviceSummary();
        }, 60000*5);
    },
    beforeDestroy() {
        clearInterval(this.timerRunInfo);
        clearInterval(this.timerRunInfo1);
        clearInterval(this.timerRunInfo2);
        clearInterval(this.timersetInterval);
    },
    methods:{
        //全部开始
        Playall(){
            // this.Allpause();
            var timing=this.region*1000;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            //url
            var token_q=[];
            var vid = '';
            var url = root + "/api/v1/GetSrc?getonline=false&session="+ this.$store.state.token;
            
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    var data =  result.data;
                    if(data.src.length==0){
                        return false;
                    }
                    //return false;
                    for(var i=0; i< data.src.length; i++){
                        token_q.push(data.src[i].strToken);
                        this.token_index=token_q.length;
                        if(i<4){
                            var item = token_q[i];
                            if (i==0) {
                                    vid = 'tour' +11;
                                }else if (i==1) {
                                    vid = 'tour' +12;
                                }
                                else if (i==2) {
                                    vid = 'tour' +21;
                                }
                                else if (i==3) {
                                    vid = 'tour' +22;
                            }
                            this.$root.bus.$emit('controltour', item ,this.streamprofile, vid);
                        }
                    }
                }
            })
            this.timersetInterval=setInterval(function(){
                for(var l=0; l< token_q.length; l++){
                    if(l<4){
                        var item = token_q[l];
                        if (l==0) {
                                vid = 'tour' +11;
                            }else if (l==1) {
                                vid = 'tour' +12;
                            }
                            else if (l==2) {
                                vid = 'tour' +21;
                            }
                            else if (l==3) {
                                vid = 'tour' +22;
                        }
                        this.$root.bus.$emit('controltour', item ,this.streamprofile, vid);

                    }else{
                        break;
                    }
                    token_q.push(token_q[l]);
                }
                if(this.token_index>4){
                    token_q.splice(0,4);
                }else{
                    token_q.splice(0,this.token_index);
                }
            }.bind(this),1000*20)
            
        }, 
        // 时间
        timedate(){
            var mydate = new Date();
            var year=mydate.getFullYear(); //获取完整的年份(4位,1970-????)
            var month=mydate.getMonth()+1; //获取当前月份(0-11,0代表1月)
            var day=mydate.getDate(); //获取当前日(1-31)
            var hour=mydate.getHours(); //获取当前小时数(0-23)
            var minute= mydate.getMinutes(); //获取当前分钟数(0-59)
            var second=mydate.getSeconds(); //获取当前秒数(0-59)
            //获取日期与时间
            this.dateany=year+"."+month+"."+day+" "+" "+hour+":"+minute+":"+second;
        },
        GetSystemInfo() {
            let _this = this;
            var root = process.env.API_ROOT;
            if (root == undefined) {
                root =window.location.protocol + "//" +window.location.host +window.location.pathname;
            }

            var url =root + "/api/v1/GetSystemInfo?session=" + this.$store.state.token;
                // console.log("------------",url)
            this.$http.get(url).then(result => {
                //console.log(result);
                if (result.status == 200) {
                    var data =  result.data;
                    var cpu=[{
                        name:this.$t("message.dashboard.version"),
                        id:data.strVersion
                    },{
                        name:this.$t("message.dashboard.hostid"),
                        id:data.strHostId
                    },{
                        name:this.$t("message.dashboard.license"),
                        id:data.strLicenseType
                    },{
                        name:this.$t("message.dashboard.channel"),
                        id:data.strChannelLimit
                    },{
                        name:this.$t("message.dashboard.endtime"),
                        id:data.strEndtime
                    }]
                    var fun=[{
                        name:this.$t("message.dashboard.devicesdk"),
                        id:data.bDeviceSDK
                    },{
                        name:this.$t("message.dashboard.transcoding"),
                        id:data.bTranscoding
                    },{
                        name:this.$t("message.dashboard.gb28181"),
                        id:data.bGB28181
                    },{
                        name:this.$t("message.dashboard.devicesdkpb"),
                        id:data.bDeviceSDKPb
                    },{
                        name:this.$t("message.dashboard.cluster"),
                        id:data.bCluster
                    },{
                        name:this.$t("message.dashboard.VideoConference"),
                        id:data.bVideoConference
                    },{
                        name:this.$t("message.dashboard.Platform"),
                        id:data.bPlatform
                    }]
                    this.capability=cpu;
                    this.system=fun;
                    // console.log("***********",this.capability,this.system)
                }
            })
            .catch(error => {
            console.log("GetSystemInfo", error);
            });
        },
        //设备
        GetDeviceSummary(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var url = root + "/api/v1/GetDeviceSummary?session="+ this.$store.state.token;
            // console.log("----------",url)
            this.$http.get(url).then(result=>{
                if (result.status == 200) {
                        this.dev=result.data;
                        var Cloud="";
                        var RTSPR="";
                        var ONVIF="";
                        var RTMP="";

                        var Hik=result.data.nHikDevTotal-result.data.nHikDevOnline;
                        var dh=result.data.nDhDevTotal-result.data.nDhDevOnline;
                        var td=result.data.nTdDevTotal-result.data.nTdDevOnline;
                        var gb=result.data.nGbDevTotal-result.data.nGbDevOnline;
                        if(this.dev.nCloudTotal==0){
                            Cloud=0;
                        }else{
                            Cloud=Math.round(this.dev.nCloudOnline/this.dev.nCloudTotal*100)
                        }

                        if(this.dev.nRTSPRTMPTotal==0){
                            RTSPR=0;
                        }else{
                            RTSPR=Math.round(this.dev.nRTSPRTMPOnline/this.dev.nRTSPRTMPTotal*100)
                        }

                        if(this.dev.nONVIFTotal==0){
                            ONVIF=0;
                        }else{
                            ONVIF=Math.round(this.dev.nONVIFOnline/this.dev.nONVIFTotal*100)
                        }

                        if(this.dev.nRTMPPushTotal==0){
                            RTMP=0;
                        }else{
                            RTMP=Math.round(this.dev.nRTMPPushOnline/this.dev.nRTMPPushTotal*100)
                        }
                        // 
                        // console.log("---------",Cloud)
                        this.config={
                                data: [Cloud],
                                shape: 'roundRect',
                                waveHeight:10,
                                waveNum:2
                            };
                        this.config1={
                                data: [RTSPR],
                                shape: 'roundRect',
                                waveHeight:10,
                                waveNum:2
                            };
                        this.config2={
                                data: [ONVIF],
                                shape: 'roundRect',
                                waveHeight:10,
                                waveNum:2
                            };
                        this.config3={
                                data: [RTMP],
                                shape: 'roundRect',
                                waveHeight:10,
                                waveNum:2
                            };
                        this.round={
                            data: [Hik],
                            shape: 'round',
                            waveHeight:10,
                            waveNum:2,
                            colors:['#2E55E3', '#48A9FB']
                        };
                        this.round1={
                                data: [dh],
                                shape: 'round',
                                waveHeight:5,
                                waveNum:2,
                                colors:['#0FB870', '#05B6CD']
                            };
                        this.round2={
                                data: [td],
                                shape: 'round',
                                waveHeight:5,
                                waveNum:2,
                                colors:['#D0234D', '#F13E26']
                            };
                        this.round3={
                                data: [gb],
                                shape: 'round',
                                waveHeight:5,
                                waveNum:2,
                                colors:['#2E55E3', '#48A9FB']
                            };
                        // console.log("设备",this.dev,result.data);
                }
            })
        },
        //流量
        GetRunInfo() {
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var url = root + "/api/v1/GetRunInfo?session="+ this.$store.state.token;
            // console.log("url111",url)
            this.$http.get(url).then(result=>{
                if (result.status == 200) {
                    this.strRunTime=result.data
                    
                    // console.log(this.strRunTime);
                    // console.log(result.data.nNetworkInK)
                    // console.log(result.data.nNetworkOutK)
                    // console.log(result.data.strNetworkIn)
                    this.data.push(result.data.nNetworkInK)
                    this.data1.push(result.data.nNetworkOutK);
                    this.data2.push(result.data.nCPUUsage);
                    this.data.splice(0, 1);
                    this.data1.splice(0, 1);
                    this.data2.splice(0, 1);
                    var pieId = document.getElementById('container');
                    var pieId1 = document.getElementById('container1');
                    if (!pieId||!pieId1){
                        return false;
                    }
                    var myChart = echarts.init(pieId)
                    var myChart1 = echarts.init(pieId1)
                    //根据窗口的大小变动图表 --- 重点
                    window.onresize = function(){
                        myChart.resize();
                        myChart1.resize();
                    }
                    this.flow(myChart);
                    this.cpu(myChart1);
                }
            })
        },
        //流量
        flow(myChart) {
            var base = +new Date();
            var date = [];
            var oneSecond = 1000;
            for (var i = 1; i <= 61; i++) {
                var now = new Date((base += oneSecond));
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            // console.log(this.data)
            // console.log(this.data,this.data1)
            // 基于准备好的dom，初始化echarts实例
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                        return [pt[0], '10%']
                    },
                    formatter:"{b0}<br />{a0}:{c0}Kbps<br />{a1}:{c1}Kbps"
                },
                title: {
                    left: 'center',
                    text: this.title_text,
                    show:false
                },
                legend: {
                        data:[ this.network_in,this.network_out],
                        icon:'rect',
                        x:"200px",
                        textStyle:{
                            fontSize: 12,//字体大小
                            color: '#28BAFD'//字体颜色
                        },
                        itemWidth: 35,
                        itemHeight: 2,
                    },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#28BAFD'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                },
                series: [{
                    name: this.network_in,
                    type: 'line',
                    //曲线
                    // smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#20A0FF'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(11,218,180,0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,.2)'
                            }
                        ])
                    },
                    data: this.data
                }, {
                    name: this.network_out,
                    type: 'line',
                    // smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#DDB401'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(255,156,102,0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,.2)'
                            }
                        ])
                    },
                    data: this.data1
                }, ]
            })
        },
        cpu(myChart) {
            var base = +new Date()
            var oneSecond = 1000
            var date = [];
            for (var i = 1; i <= 61; i++) {
                var now = new Date((base += oneSecond))
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                        return [pt[0], '10%']
                    },
                    formatter:"{b0}<br />{a0}:{c0}%"
                },
                title: {
                    left: 'center',
                    text: 'CPU',
                    show:false
                },
                legend: {
                        data:['CPU'],
                        icon:'rect',
                        itemWidth: 35,
                        itemHeight: 2,
                        x:"200px",
                        textStyle:{
                            fontSize: 12,//字体大小
                            color: '#28BAFD'//字体颜色
                        },
                    },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#28BAFD'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    splitLine: { //网格线
                        "show": false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#ffffff'
                        }
                    }
                },
                series: [{
                    name: 'CPU',
                    type: 'line',
                    // smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#20A0FF'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(11,218,180,0.5)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(255,255,255,.2)'
                            }
                        ])
                    },
                    data: this.data2
                },]
            })
        },
    }
}
</script>


<style scoped>
/* 返回 */
.control_fanhui{
    width: 5%;
    height: 100%;
    background: url("./control-img/fanhui.png") no-repeat;
    position: absolute;
    right: 0;
    top: 0;
}
/* 标题 */
.device{
    padding: 10px 0 0 10px;
    font-size:22px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(40,186,253,1);
}
/* 水桶 */
.cpu_dev_sdk{
    width: 100%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-around;
}
.cpu_sdk{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-around;
}
.dev_sdk{
    width: 80px;
    height: 80px;
    text-align: center;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.containesr_sdks_zi{
    text-align: center;
    font-size:12px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
}

.container_sdk{
    width: 100%;
    height: 45%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
.dv-water-pond-level{
    height: 100%;
}
.containesr_sdks{
    width: 25%;
    height: 70%;
    text-align: center;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
}
/* 在线时间 */
.zong_mve{
    display: flex;
    width: 100%;
    height: 30%;
    line-height: 60px;
    padding-left: 17%;
}
.zong_mve div{
    width: 50%;
}
.zong_mve div:nth-child(1){
    font-size:18px;
    color: #28BAFD;
}
.zong_mve div:nth-child(2){
    font-size:28px;
}
/* 进度条 */
.data-pictrue>>> svg path:first-child{
    stroke: #000;
}
/* 四宫格 */
.play_live_play{
    width: 100%;
    height: 100%;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    padding: 3%;
    position: absolute;
}
.videoColor{
    width: 100%;
    height: 48%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.palace{
    width: 48%;
    height: 100%;
    /* border:1px solid black; */
}
.login_con{
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("./control-img/control_background.png") no-repeat center;
}
/* 顶部 */
.control_header{
    width: 100%;
    height: 60px;
    background: url("./control-img/top@2x.png") no-repeat;
}
.control_header1{
    width: 100%;
    height: 90px;
    background: url("./control-img/topcen@2x.png") no-repeat center;
}
.control_size{
    width: 100%;
    height: 50px;
    background: url("./control-img/H5s.png") no-repeat center;
    background-size: 18%;
}
/* 内容 */
.control_content{
    width: 100%;
    height: 93%;
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    margin-top: -10px;
}
/* 1 */
.control_cpu{
    width: 25%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.cpu_Network{
    width: 100%;
    height: 33%;
    position: relative;
    box-sizing: border-box;
}
.cpu_cpu{
    width: 100%;
    height: 33%;
    position: relative;
    box-sizing: border-box;
}
.cpu_dev{
    width: 100%;
    height: 33%;
    position: relative;
    box-sizing: border-box;
}
/* 2 */
.control_play{
    width: 48%;
    height: 100%;
    padding-top: 15px;
}
.play_content{
    width: 100%;
    height: 100%;
}
.play_live{
    width: 100%;
    height: 70%;
    position: relative;
    /* background: url("./control-img/play.png") no-repeat center;
    background-size: 90%; */
}
.play_live_back{
    width: 100%;
    height: 100%;
    position: absolute;
}
.play_live_back img{
    width: 100%;
    height: 100%;
}
.play_info{
    width: 100%;
    height: 100%;
}
.info_date{
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size:28px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(4,209,137,1);
    background: url("./control-img/date@2x.png") no-repeat center;
}
.info_info{
    width: 100%;
    height: 21%;
    position: relative;
    font-size:22px;
    font-family:PingFang SC;
    font-weight:500;
    color:#28BAFD;
}
.info_info_back{
    width: 100%;
    height: 100%;
    margin-top: -7px;
}
.info_info_back img{
    width: 100%;
    height: 100%;
}
.info_system{width: 100%;
    height: 100%;
    padding: 20px 30px 0;
    position: absolute;
}
.flex_nc_ag{
    width: 100%;
    height: 90%;
    font-size:16px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(40,186,253,1);
    display: flex;
    justify-content: space-around;
}
.flex_nc_ag .flex_nc_zong{
    width: 45%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.flex_nc_cpu{
    word-wrap: break-word;word-break: break-all;overflow: hidden;
    width: 100%;
    height: 30%;
}
/* 3 */
.control_sdk{
    width: 25%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
}
.sdk_Memory{
    width: 100%;
    height: 21%;
    display: flex;
    justify-content: space-between;
}
.sdk_Memory1{
    width: 49%;
    height: 100%;
    background: url("./control-img/memory@2x.png") no-repeat;
    background-size: 100%;
    text-align: center;
    padding-top: 5%;
}
.sdk_Memory1{
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(40,186,253,1);
}
.sdk_Running{
    width: 100%;
    height: 24.5%;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    position: relative;
}
.sdk_sdk{
    width: 100%;
    height: 53.4%;
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    position: relative;
}
/* 底部 */
.control_bottom{
    width: 100%;
    height: 40px;
    position: fixed;
    bottom: 0px;
    background: url("./control-img/bottom@2x.png") no-repeat center;
}
</style>
