<template>
  <div>
    <div id="page-wrapper">
        <!-- 头部 -->
        <!--  -->
        <div class="container-fluid">
            <div class="bg-title" style="margin-bottom: 0px;">
                <div class="flex_ld">
                    <h4 class="page-title">{{$t("message.dashboard.dashboard")}}</h4>
                </div>
            </div>
            
        </div>
        <!-- shenti -->
        <div class="container">
            <div class="container_flex">
                <div class="flex_llcpu">
                    <div class="flex_cpu">
                        <div>
                            <div class="beibiao_zi">
                                <img src="./gallery/daId@2x.png"/>
                                <span>{{this.$t("message.dashboard.an_out")}}</span>
                            </div>
                            <div id="container" style="width:100%;height: 80%;"></div>
                        </div>
                        <div>
                            <div class="beibiao_zi">
                                <img src="./gallery/daId@2x.png"/>
                                <span>CPU</span>
                            </div>
                            <div id="container1"  style="width:100%;height: 80%;"></div>
                        </div>
                    </div>
                    <div class="flex_bei">
                        
                        <div style="display: flex; justify-content: space-between;">
                            <div class="flex_beibiao" style="width:90%">
                                <div class="beibiao_zi">
                                    <img src="./gallery/daId@2x.png"/>
                                    <span>{{this.$t("message.dashboard.device")}}</span>
                                </div>
                                <div style="display: flex;">
                                    <div class="beibiao_zi1">{{this.$t("message.dashboard.Online")}}</div>
                                    <div class="beibiao_bg"></div>
                                    <div class="beibiao_zi1">{{this.$t("message.dashboard.Offline")}}</div>
                                    <div class="beibiao_bg1"></div>
                                </div>
                            </div>
                            <div class="more" style="padding: 6px 20px 0 0;">
                                <router-link  :to="{name:'DeviceRouter'}">
                                    <a class="A_More" href="javascript:void(0)">
                                        <div>
                                            更多<i class="el-icon-d-arrow-right"></i>
                                        </div>
                                    </a> 
                                </router-link>
                                <!-- <div class="A_More">
                                    更多<i class="el-icon-d-arrow-right"></i>
                                </div> -->
                            </div>
                        </div>
                        <div class="flex_beisdk">
                            <div id="mian"></div>
                            <div id="mian1"></div>
                            <div id="mian2"></div>
                            <div id="mian3"></div>
                            <div id="mian4"></div>
                        </div>
                    </div>
                </div>
                <div class="flex_nc">
                    <div class="flex_nc1">
                        <div class="beibiao_zi">
                            <img src="./gallery/daId@2x.png"/>
                            <span>{{this.$t("message.dashboard.DiskMemory")}}</span>
                        </div>
                        <div class="nr_mory">
                            <div class="nr_mory1">
                                <el-progress
                                v-if="strRunTime"
                                type="circle" 
                                :width='100'
                                :percentage="Number(Math.round((strRunTime.nTotalSpaceByte-strRunTime.nFreeSpaceByte)/strRunTime.nTotalSpaceByte*100))"></el-progress> 
                                <div>{{this.$t("message.dashboard.free_space")}}</div>
                                <div>{{strRunTime.strFreeSpace}}</div>
                            </div>
                            <div class="nr_mory1">
                                <el-progress
                                type="circle"
                                :width='100'
                                v-if="strRunTime"
                                color="#FF952C"
                                :percentage="Number(strRunTime.nMemoryUsage)"></el-progress>
                                <div>{{this.$t("message.dashboard.memory")}}</div>
                                <div>({{this.$t("message.dashboard.TotalMemory")}}: {{(strRunTime.nTotalMemoryByte/1024/1024/1024).toFixed(1)}}G)</div>
                            </div>
                            <div class="nr_mory1">
                                <el-progress
                                    type="circle"
                                    :width='100'
                                    v-if="strRunTime"
                                    color="#792ACB"
                                    :percentage="Number(Math.round((strRunTime.nRecordTotalSpaceByte-strRunTime.nRecordFreeSpaceByte)/strRunTime.nRecordTotalSpaceByte*100))"></el-progress>
                                <div>{{this.$t("message.dashboard.Storage")}}</div>
                                <div>({{(strRunTime.nRecordTotalSpaceByte/1024/1024/1024).toFixed(1)}}G)</div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="flex_nc1">
                        <div class="beibiao_zi">
                            <img src="./gallery/daId@2x.png"/>
                            <span>{{this.$t("message.dashboard.codec_info")}}</span>
                        </div>
                        <div class="flex_nc_ag">
                            <div class="flex_nc_cpu" v-for="(a,index) in codecInfo" :key="index">
                                <span class="cpu_zuo">{{a.name}}:</span>
                                <span class="cpu_you"> {{a.id}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex_nc1">
                        <div class="beibiao_zi">
                            <div style="display: flex; justify-content: space-between;">
                                <div>
                                    <img src="./gallery/daId@2x.png"/>
                                    <span>{{this.$t("message.dashboard.GPU_info")}}</span>
                                </div>
                                <div>
                                    <router-link  :to="{name:'GPURouter'}">
                                        <a class="A_More" href="javascript:void(0)">
                                            <div>
                                                更多<i class="el-icon-d-arrow-right"></i>
                                            </div>
                                        </a> 
                                    </router-link>
                                    <!-- <div class="A_More">
                                        更多<i class="el-icon-d-arrow-right"></i>
                                    </div> -->
                                </div>
                            </div>
                        </div>
                        <div class="flex_nc_ag">
                            <div class="flex_iv">
                                <div>Intel: {{Gpulen.nIndex}}</div>
                                <div>NVIDIA: {{Gpulen.nvidia}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex_nc1">
                        <div class="beibiao_zi">
                            <img src="./gallery/daId@2x.png"/>
                            <span>{{this.$t("message.dashboard.capability")}}</span>
                        </div>
                        <div class="nr_function">
                            <div class="nr_kuan" v-for="(c,index) in system" :key="index">
                                <span>{{c.name}}</span>
                                <el-switch
                                v-model="c.id"
                                disabled
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container_zong">
                <div class="container_srd">
                    <div class="beibiao_zi">
                        <img src="./gallery/daId@2x.png"/>
                        <span>{{this.$t("message.dashboard.system_info")}}</span>
                    </div>
                    <div class="flex_nc_ag">
                        <div class="flex_nc_cpu" v-for="(b,index) in capability" :key="index">
                            <span class="cpu_zuo">{{b.name}}:</span>
                            <span v-if="b.name!='主机号'&&b.name!='Hostid'" class="cpu_you" > {{b.id}}</span>
                            
                            <input v-if="b.name=='主机号'||b.name=='Hostid'" id="foo" type="text" :value="b.id"/>
                            <i data-clipboard-target="#foo" @click="copylink(b.id)" style="margin-left: 10px;" v-if="b.name=='主机号'||b.name=='Hostid'" class="copy iconfont icon-fuzhi"></i>
                        </div>
                    </div>
                </div>
                <div class="container_srd">
                    <div class="beibiao_zi">
                        <img src="./gallery/daId@2x.png"/>
                        <span>{{this.$t("message.dashboard.running")}}</span>
                    </div>
                    <div class="zong_flex">
                        <div class="zong_mve">
                            <div>{{this.$t("message.dashboard.running")}}</div>
                            <div>{{strRunTime.strRunTime}}</div>
                        </div>
                        <div class="zong_mve">
                            <div>{{this.$t("message.dashboard.cameras")}}</div>
                            <div>{{dev.nCameraTotal}}</div>
                        </div>
                        <div class="zong_mve">
                            <div>{{this.$t("message.dashboard.online_cam")}}</div>
                            <div>{{dev.nCameraOnline}}</div>
                        </div>
                    </div>
                    <div class="zong_img">
                        <img src="./gallery/chart.png"/>
                    </div>
                </div>
                <div class="container_srd">
                    <div class="beibiao_zi">
                        <img src="./gallery/daId@2x.png"/>
                        <span>{{this.$t("message.dashboard.device")}}</span>
                    </div>
                    <div class="container_sdk">
                        <div class="containesr_sdks" v-for="(da,index) in devbucket" :key="index">
                            <div class="sdk_back">
                                <!-- <div class="sdk_back1" :id="'aa'+index">
                                </div> -->
                                <div class="sdk_szie">{{da.percentage}}%</div>
                            </div>
                            <div class="containesr_sdks_zi">
                                <div>{{da.name}}</div>
                                <div>{{total}} {{da.total1}} {{ge}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div id="container" style="width:49%"></div> -->
    </div>
  </div>
</template>


<script>
import Vue from 'vue'
import echarts from 'echarts'
var Highcharts = require("highcharts");
export default {
  name: "dashboard",
    data() {
        return {
            value:true,
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data2: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            codecInfo:"",
            capability:"",
            devbucket:[],
            system:"",
            dev:{
                nCameraTotal: "",
                nCameraOnline: "",
                nHikDevTotal: "",
                nHikDevOnline: "",
                nDhDevTotal: "",
                nDhDevOnline: "",
                nHikIscDevTotal: "",
                nHikIscDevOnline: "",
                nTdDevTotal: "",

                nTdDevOnline: "",
                nGbDevTotal: "",
                nGbDevOnline: "",

                nCloudTotal: "",
                nCloudOnline: "",

                nRTSPRTMPTotal: "",
                nRTSPRTMPOnline: "",

                nONVIFTotal: "",
                nONVIFOnline: "",

                nRTMPPushTotal: "",
                nRTMPPushOnline: ""
            },
            timerRunInfo: undefined,
            title_text:this.$t("message.dashboard.an_out"),
            network_in:this.$t("message.dashboard.network_in"),
            network_out:this.$t("message.dashboard.network_out"),

            Hikvision:this.$t("message.dashboard.Hikvision"),
            Dahua:this.$t("message.dashboard.Dahua"),
            Tiandy:this.$t("message.dashboard.Tiandy"),

            total:this.$t("message.dashboard.total"),
            ge:this.$t("message.dashboard.ge"),

            Online:this.$t("message.dashboard.Online"),
            Offline:this.$t("message.dashboard.Offline"),

            strRunTime:"",//运行时间
            Gpulen:{
                nIndex:"",
                nvidia:""
            }
        };
    },
    destroyed() {
    },
    beforeDestroy() {
        clearInterval(this.timerRunInfo);
        clearInterval(this.timerRunInfo1)
    },
    mounted: function() {
        
        // let _this = this;
        this.GetSystemInfo();
        this.GetRunInfo();
        // this.GetSrcInfo();
        this.GetCodecInfo();
        this.GetDeviceSummary();
        // this.height_zsy();
        this.height_zsy1();
        this.cpu();
        this.flow();
        this.devhk();
        this.devdh();
        this.devisc();
        this.devtd();
        this.devgb();
        this.Gpu();
        this.timerRunInfo = setInterval(() => {
            this.GetRunInfo();
            this.cpu();
            this.flow();
        }, 5000);
        this.timerRunInfo1 = setInterval(() => {
            this.GetDeviceSummary();
            this.devhk();
            this.devdh();
            this.devisc();
            this.devtd();
            this.devgb();
        }, 60000*5)

    },
    methods: {
        // 复制
        copylink(id){
            
            var clipboard = new this.clipboard('.copy');
            //成功回调
            var _this=this;
            clipboard.on('success', function(e) {
                console.info('Action:',e.action);
                console.info('Text:', e.text);
                console.info('Trigger:', e.trigger);  
                e.clearSelection();
                _this.$message(_this.$t("message.dashboard.Copysuccessful"))
            });
            //失败回调
            clipboard.on('error', function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        },
        //GPU
        Gpu(){
            let _this = this;
            var root = process.env.API_ROOT;
            if (root == undefined) {
                root =window.location.protocol + "//" +window.location.host +window.location.pathname;
            }

            var url =root + "/api/v1/GetGPUInfo?session=" + this.$store.state.token;
                // console.log("------------",url)
            this.$http.get(url).then(result => {
                if (result.status == 200) {
                    var data = result.data;
                    this.Gpulen.nIndex=data.intel.length;
                    this.Gpulen.nvidia=data.nvidia.length;
                }
            })
        },
        //流量
        flow() {
            var base = +new Date();
            var date = [];
            var oneSecond = 1000;
            for (var i = 1; i <= 64; i++) {
                var now = new Date((base += oneSecond));
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            // console.log(this.data)
            // console.log(this.data,this.data1)
            // 基于准备好的dom，初始化echarts实例
            var pieId = document.getElementById('container');
            if (!pieId){
                return false;
            }
            var myChart = echarts.init(pieId)
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
                        itemWidth: 35,
                        itemHeight: 2
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
                    }
                },
                series: [{
                    name: this.network_in,
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#0BDAB4'
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
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#FF9C66'
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
                } ]
            })
        },
        // cpu
        cpu() {
            var base = +new Date()
            var oneSecond = 1000
            var date = [];
            for (var i = 1; i <= 64; i++) {
                var now = new Date((base += oneSecond))
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            var pieId = document.getElementById('container1');
            if (!pieId){
                return false;
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(pieId)
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
                        itemHeight: 2
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
                    }
                },
                series: [{
                    name: 'CPU',
                    type: 'line',
                    smooth: true,
                    symbol: 'none',
                    sampling: 'average',
                    itemStyle: {
                        color: '#0BDAB4'
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
                }]
            })
        },
        //海康
        devhk(){
            window.setTimeout(function() {
                // console.log("11111111111111111",this.dev)
                // return false;
                var pieId=document.getElementById('mian')
                if (!pieId){
                    return false;
                }
                var myChart = echarts.init(pieId);
                myChart.setOption({
                    tooltip: {
                        show:true
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:12,
                            fontWeight:400
                        }
                    },
                    
                    series: [{
                        name: this.Hikvision,
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },
                                formatter:'{b}\n{c}'
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value:this.dev.nHikDevOnline,
                                name: this.Online,
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nHikDevTotal-this.dev.nHikDevOnline,
                                name: this.Offline,
                                itemStyle: {
                                    color: '#FFC05D'
                                }
                            }
                        ]
                    }]
                })
                myChart.setOption({
                    title: {
                        show: true,
                        text: this.Hikvision+'\n'+this.total+this.dev.nHikDevTotal+this.ge
                    }
                })
                
                myChart.on('mouseover', () => {
                    myChart.setOption({
                        title: {
                            show: false
                        }
                    })
                });

                myChart.on('mouseout', () => {
                    myChart.setOption({
                        title: {
                            show: true,
                            text: this.Hikvision+'\n'+this.total+this.dev.nHikDevTotal+this.ge
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //大华
        devdh(){
            // console.log("this.dev)
            window.setTimeout(function() {
                var pieId=document.getElementById('mian1')
                if (!pieId){
                    return false;
                }
                var myChart = echarts.init(pieId);
                myChart.setOption({
                    tooltip: {
                        show:true
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:12,
                            fontWeight:400
                        }
                    },
                    series: [{
                        name: this.Dahua,
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },
                                formatter:'{b}\n{c}'
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nDhDevOnline,
                                name: this.Online,
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nDhDevTotal-this.dev.nDhDevOnline,
                                name: this.Offline,
                                itemStyle: {
                                    color: '#FFC05D'
                                }
                            }
                        ]
                    }]
                })
                myChart.setOption({
                    title: {
                        show: true,
                        text: this.Dahua+'\n'+this.total+this.dev.nDhDevTotal+this.ge
                    }
                })
                
                myChart.on('mouseover', () => {
                    myChart.setOption({
                        title: {
                            show: false
                        }
                    })
                });

                myChart.on('mouseout', () => {
                    myChart.setOption({
                        title: {
                            show: true,
                            text: this.Dahua+'\n'+this.total+this.dev.nDhDevTotal+this.ge
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //isc
        devisc(){
            window.setTimeout(function() {
                var pieId=document.getElementById('mian2')
                if (!pieId){
                    return false;
                }
                var myChart = echarts.init(pieId);
                myChart.setOption({
                    tooltip: {
                        show:true
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:12,
                            fontWeight:400
                        }
                    },
                    series: [{
                        name: 'iSecure Center',
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },
                                formatter:'{b}\n{c}'
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nHikIscDevOnline,
                                name: this.Online,
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nHikIscDevTotal-this.dev.nHikIscDevOnline,
                                name: this.Offline,
                                itemStyle: {
                                    color: '#FFC05D'
                                }
                            }
                        ]
                    }]
                })
                myChart.setOption({
                    title: {
                        show: true,
                        text: 'iSecure Center\n'+this.total+this.dev.nHikIscDevTotal+this.ge
                    }
                })
                
                myChart.on('mouseover', () => {
                    myChart.setOption({
                        title: {
                            show: false
                        }
                    })
                });

                myChart.on('mouseout', () => {
                    myChart.setOption({
                        title: {
                            show: true,
                            text: 'iSecure Center\n'+this.total+this.dev.nHikIscDevTotal+this.ge
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //天地
        devtd(){
            window.setTimeout(function() {
                var pieId=document.getElementById('mian3')
                if (!pieId){
                    return false;
                }
                var myChart = echarts.init(pieId);
                myChart.setOption({
                    tooltip: {
                        show:true
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:12,
                            fontWeight:400
                        }
                    },
                    series: [{
                        name:this.Tiandy,
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },
                                formatter:'{b}\n{c}'
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nTdDevOnline,
                                name: this.Online,
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nTdDevTotal-this.dev.nTdDevOnline,
                                name: this.Offline,
                                itemStyle: {
                                    color: '#FFC05D'
                                }
                            }
                        ]
                    }]
                })
                myChart.setOption({
                    title: {
                        show: true,
                        text: this.Tiandy+'\n'+this.total+this.dev.nTdDevTotal+this.ge
                    }
                })
                
                myChart.on('mouseover', () => {
                    myChart.setOption({
                        title: {
                            show: false
                        }
                    })
                });

                myChart.on('mouseout', () => {
                    myChart.setOption({
                        title: {
                            show: true,
                            text: this.Tiandy+'\n'+this.total+this.dev.nTdDevTotal+this.ge
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //国标
        devgb(){
            window.setTimeout(function() {
                var pieId=document.getElementById('mian4')
                if (!pieId){
                    return false;
                }
                var myChart = echarts.init(pieId);
                myChart.setOption({
                    tooltip: {
                        show:true
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:12,
                            fontWeight:400
                        }
                    },
                    series: [{
                        name: 'GB',
                        type: 'pie',
                        radius: ['60%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                },
                                formatter:'{b}\n{c}'
                            }
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nGbDevOnline,
                                name: this.Online,
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nGbDevTotal-this.dev.nGbDevOnline,
                                name: this.Offline,
                                itemStyle: {
                                    color: '#FFC05D'
                                }
                            }
                        ]
                    }]
                })
                myChart.setOption({
                    title: {
                        show: true,
                        text: 'GB\n'+this.total+this.dev.nGbDevTotal+this.ge
                    }
                })
                
                myChart.on('mouseover', () => {
                    myChart.setOption({
                        title: {
                            show: false
                        }
                    })
                });

                myChart.on('mouseout', () => {
                    myChart.setOption({
                        title: {
                            show: true,
                            text: 'GB\n'+this.total+this.dev.nGbDevTotal+this.ge
                        }
                    })
                });
            }.bind(this), 1000);
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
                    // console.log(result.data.nNetworkInK)
                    // console.log(result.data.nNetworkOutK)
                    // console.log(result.data.strNetworkIn)
                    this.data.push(result.data.nNetworkInK)
                    this.data1.push(result.data.nNetworkOutK);
                    this.data2.push(result.data.nCPUUsage);
                    this.data.splice(0, 1);
                    this.data1.splice(0, 1);
                    this.data2.splice(0, 1);
                }
            })
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
                        var RTSPRx="";
                        var ONVIFx="";
                        var RTMPx="";
                        if(this.dev.nCloudTotal==0){
                            Cloud=0;
                        }else{
                            Cloud=Math.round(this.dev.nCloudOnline/this.dev.nCloudTotal*100)
                        }

                        if(this.dev.nRTSPRTMPTotal==0){
                            RTSPRx=0;
                        }else{
                            RTSPRx=Math.round(this.dev.nRTSPRTMPOnline/this.dev.nRTSPRTMPTotal*100)
                        }

                        if(this.dev.nONVIFTotal==0){
                            ONVIFx=0;
                        }else{
                            ONVIFx=Math.round(this.dev.nONVIFOnline/this.dev.nONVIFTotal*100)
                        }

                        if(this.dev.nRTMPPushTotal==0){
                            RTMPx=0;
                        }else{
                            RTMPx=Math.round(this.dev.nRTMPPushOnline/this.dev.nRTMPPushTotal*100)
                        }
                        // console.log(Cloud,RTSPRx,ONVIFx,RTMPx)
                        var databuk=[{
                            name:this.$t("message.dashboard.Cloud"),
                            total1:this.dev.nCloudTotal,
                            percentage:Cloud
                        },{
                            name:'RTSP/RTMP',
                            total1:this.dev.nRTSPRTMPTotal,
                            percentage:RTSPRx
                        },{
                            name:'ONVIF',
                            total1:this.dev.nONVIFTotal,
                            percentage:ONVIFx
                        },{
                            name:this.$t("message.dashboard.RTMP"),
                            total1:this.dev.nRTMPPushTotal,
                            percentage:RTMPx
                        }]
                        this.devbucket=databuk
                }
            })
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
        //cpu
        GetCodecInfo() {
            let _this = this;
            var root = process.env.API_ROOT;
            if (root == undefined) {
                root =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname;
            }

            var url =
                root + "/api/v1/GetCodecInfo?session=" + this.$store.state.token;
                // console.log("------------",url)
            this.$http.get(url).then(result => {
                //console.log(result);
                // name:this.$t("message.dashboard.gpuencoder"),
                // id:data.strHWEncoders
                // name:this.$t("message.dashboard.gpudecoder"),
                // id:data.strHWDecoders

                if (result.status == 200) {
                    var data =  result.data;
                    var cpu=[{
                        name:this.$t("message.dashboard.cpumodel"),
                        id:data.strCPUModel
                    },{
                        name:this.$t("message.dashboard.PhysicalCPU"),
                        id:data.nCPU
                    },{
                        name:this.$t("message.dashboard.CPUCore"),
                        id:data.nCPUCore
                    },{
                        name:this.$t("message.dashboard.cpuencoder"),
                        id:data.strSWEncoders
                    },{
                        name:this.$t("message.dashboard.cpudecoder"),
                        id:data.strSWDecoders
                    }]
                    this.codecInfo = cpu;
                    // console.log("--------------",cpu,this.codecInfo);
                }
            })
            .catch(error => {
            console.log("GetSystemInfo", error);
            });
        },

        GetSrcInfo() {
            let _this = this;
            var root = process.env.API_ROOT;
            if (root == undefined) {
                root =
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname;
            }

            var url = root + "/api/v1/GetSrc?session=" + this.$store.state.token;

            this.$http.get(url).then(result => {

                if (result.status == 200) {
                    var data = result.data;
                    _this.srcInfo.strSrcCnt = data.src.length;
                    _this.srcInfo.nSrcOnline = 0;
                    for (var i = 0; i < data.src.length; i++) {
                    var item = data.src[i];

                    if (item["bOnline"]) {
                        _this.srcInfo.nSrcOnline++;
                    }
                    }

                    // console.log("---------------------", _this.srcInfo.nSrcOnline);
                }
            })
            .catch(error => {
            console.log("GetSrc", error);
            });
        },

    
        height_zsy(){
            var winHeight = $(window).height()-100;//winHeight即浏览器高度
            // console.log("******",winHeight-100);
            $(".container").css("height",winHeight);

        },
        height_zsy1(){
            var winHeight = $(window).height();//winHeight即浏览器高度
            // console.log("******",winHeight-100);
            this.timerRunInfo = setInterval(() => {
            $("rect").css("height","98%");
            },1000)

        }
    }
};
</script>
<style scoped>
.sdk_szie{
    width: 76%;
    position: absolute;
}
.sdk_back{
    text-align: center;
    padding: 45% 6px;
    font-size:22px;
    font-family:Arial Black;
    font-weight:400;
    color:rgba(25,198,240,1);
    width: 100%;
    height: 72%;
    background: url('./gallery/dash_shuitong.png')no-repeat;
    background-size: 85%;
    position: relative;
}
.sdk_back1{
    width: 76%;
    height: 60%;
    background: url('./gallery/dash_bucket.png');
    position: absolute;
    bottom: 11px;
}
/* copy */
#foo{
    border: 0;
    width: 60%;
}
/* a标签 */
.A_More{
    font-size:14px;
    color: #66CDB4; 
    font-family:PingFang SC;
}
.flex_iv{
    display: flex; justify-content: space-around;width:100%;
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
}

#page-wrapper{
    margin-bottom: 20px;
}
.container{
    width: 100%;
    height: 900px;
    padding: 0;
}
.container_flex{
    display: flex;
    justify-content: space-between;
    height: 70%;
    width: 100%;
    /* padding: 10px; */
    margin-bottom: 10px;
}
.container_zong{
    height: 30%;
    width: 100%;
    display: flex;
    justify-content: space-between;

}
.flex_llcpu{
    width:70%;
    height: 100%;
    margin-right: 10px;
}
/* 下边 */
.container_zong .container_srd{
    width: 25%;
    padding: 10px;
    background-color: #ffffff;
}
.container_zong .container_srd:nth-child(3){
    width: 49%;
}
.zong_flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    margin: 10px 10px;
}
.zong_img{
    width: 100%;
    text-align: center;
}
.zong_img img{
    width: 100%;
}
.zong_flex .zong_mve div{
    margin-bottom: 10px;
}
.container_sdk{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 90%;
    margin-top: 20px;
}
.containesr_sdks{
    width: 14%;
    height: 100%;
    /* text-align: center */
}
.containesr_sdks_zi{
    text-align: center;
}
.containesr_sdks_zi div:nth-child(1){
    margin: 5px 0;
}

/* cpu */

.flex_cpu{
    width: 100%;
    height: 60%;
    /* padding: 10px; */
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
}
.flex_cpu div{
    width: 49.5%;
    margin-bottom: 10px;
    background-color: #ffffff;
    padding: 5px;
}
/* 设备 */
.flex_bei{
    width:100%;
    height: 40%;
    background-color: #ffffff;
    /* display: flex; */
}
.flex_beisdk{
    width: 100%;
    height: 80%;
    display: flex;
}
.flex_beisdk div{
    width: 20%;
    height: 100%;
}
.flex_beibiao{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
}
.beibiao_zi{
    font-size:16px;
    font-weight:400;
    margin: 0 10px;
    color:rgba(51,51,51,1);
}
.beibiao_zi1{
    font-size:12px;
    font-weight:400;
    margin-right: 10px;
    color:rgba(51,51,51,1);
}
.beibiao_bg{
    width: 15px;
    height: 15px;
    margin-right: 10px;
    background-color: #5FBFA7;
}
.beibiao_bg1{
    width: 15px;
    height: 15px;
    margin-right: 10px;
    background-color: #FFC15E;
}
/* 内存 */
.flex_nc{
    width: 30%;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    align-content:space-between;
    /* padding: 10px; */
}
.nr_mory{
    margin-top:20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    height: 85%;
}
.nr_mory1{
    height: 85%;
}
.flex_nc_ag{
    margin: 5px 0;
    /* height:90%; */
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    /* align-content: space-between; */
}
.flex_nc_cpu{
    width: 100%;
    margin: 0 0 0 10px;
    margin-bottom: 10px;
}
.cpu_zuo{
    font-size:12px;
    /* font-family:PingFang SC; */
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-right: 8px;
}
.cpu_you{
    font-size:12px;
    /* font-family:PingFang SC; */
    font-weight:400;
    color:rgba(51,51,51,1);
}
/* 功能列表 */
.flex_nc .flex_nc1{
    width: 100%;
    background-color: #ffffff;
}
.flex_nc .flex_nc1:nth-child(1){
    width: 100%;
    background-color: #ffffff;
    height: 32%;
}

.flex_nc .flex_nc1:nth-child(2){
    height: 30%;
}
.flex_nc .flex_nc1:nth-child(3){
    height: 10%;
}
.flex_nc .flex_nc1:nth-child(4){
    height: 25%;
}
.nr_function{
    display: flex;
    width: 100%;
    height: 80%;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;
    padding: 5px;
    margin-top: 10px;
}
.nr_function .nr_kuan{
    display: flex;
    justify-content: space-between;
    width: 32%;
    font-size:14px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
}
.nr_function .nr_kuan span{
    margin-left: 10px;
}
</style>