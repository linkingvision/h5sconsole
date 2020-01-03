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
                        <div class="flex_beibiao">
                            <div class="beibiao_zi">
                                <img src="./gallery/daId@2x.png"/>
                                <span>{{this.$t("message.dashboard.devicesdk")}}</span>
                            </div>
                            <div style="display: flex;">
                                <div class="beibiao_zi1">在线</div>
                                <div class="beibiao_bg"></div>
                                <div class="beibiao_zi1">不在线</div>
                                <div class="beibiao_bg1"></div>
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
                            <span>{{this.$t("message.dashboard.memory")}}</span>
                        </div>
                        <div class="nr_mory">
                            <div class="nr_mory1">
                                <el-progress
                                type="circle" 
                                width='100'
                                :percentage="Number(Math.round((strRunTime.nTotalSpaceByte-strRunTime.nFreeSpaceByte)/strRunTime.nTotalSpaceByte*100))"></el-progress> 
                                <div>剩余空间</div>
                                <div>{{strRunTime.strFreeSpace}}</div>
                            </div>
                            <div class="nr_mory1">
                                <el-progress
                                type="circle"
                                width='100'
                                color="#FF952C"
                                :percentage="Number(strRunTime.nMemoryUsage)" ></el-progress>
                                <div>总内存</div>
                                <div>(内存共计: {{strRunTime.nTotalMemoryByte}})</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex_nc1">
                        <div class="beibiao_zi">
                            <img src="./gallery/daId@2x.png"/>
                            <span>{{this.$t("message.dashboard.cpudecoder")}}</span>
                        </div>
                        <div class="flex_nc_ag">
                            <div class="flex_nc_cpu" v-for="a in codecInfo" :key="a.id">
                                <span class="cpu_zuo">{{a.name}} </span>
                                <span class="cpu_you"> {{a.id}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex_nc1">
                        <div class="beibiao_zi">
                            <img src="./gallery/daId@2x.png"/>
                            <span>{{this.$t("message.dashboard.capability")}}</span>
                        </div>
                        <div class="nr_function">
                            <div class="nr_kuan" v-for="c in system" :key="c.name">
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
                        <div class="flex_nc_cpu" v-for="b in capability" :key="b.id">
                            <span class="cpu_zuo">{{b.name}} </span>
                            <span class="cpu_you"> {{b.id}}</span>
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
                        <span>{{this.$t("message.dashboard.devicesdk")}}</span>
                    </div>
                    <div class="container_sdk">
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config"/>
                            <div class="containesr_sdks_zi">
                                <div>{{this.$t("message.dashboard.devicesdk")}}</div>
                                <div>一共{{dev.nCloudTotal}}个</div>
                            </div>
                        </div>
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config1"/>
                            <div class="containesr_sdks_zi">
                                <div>RTSP</div>
                                <div>一共{{dev.nRTSPRTMPTotal}}个</div>
                            </div>
                        </div>
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config2"/>
                            <div class="containesr_sdks_zi">
                                <div>ONVIF</div>
                                <div>一共{{dev.nONVIFTotal}}个</div>
                            </div>
                        </div>
                        <div class="containesr_sdks">
                            <dv-water-level-pond :config="config3"/>
                            <div class="containesr_sdks_zi">
                                <div>RTMP</div>
                                <div>一共{{dev.nRTMPPushTotal}}个</div>
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
import echarts from 'echarts'
var Highcharts = require("highcharts");
export default {
  name: "dashboard",
  data() {
    return {
        value:true,
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
        data: [0,0,0,0,0,0,0,0,0,0],
        data1: [0,0,0,0,0,0,0,0,0,0],
        data2: [0,0,0,0,0,0,0,0,0,0],
        codecInfo:"",
        capability:"",
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
            nRTMPPushOnline: "",
        },
        timerRunInfo: undefined,
        title_text:this.$t("message.dashboard.an_out"),
        network_in:this.$t("message.dashboard.network_in"),
        network_out:this.$t("message.dashboard.network_out"),
        strRunTime:"",//运行时间
    };
  },
    beforeDestroy() {
        console.log("Dashboard", "beforeDestroy");
        clearInterval(this.timerRunInfo);
    },
    destroyed() {
        this.config1.data[0]=Math.round(this.dev.nONVIFOnline/this.dev.nONVIFTotal*100);
        console.log('Dashboard', "destroyed");
    },  
    mounted: function() {
        
        // let _this = this;
        this.GetSystemInfo();
        this.GetRunInfo();
        // this.GetSrcInfo();
        this.GetCodecInfo();
        this.GetDeviceSummary();
        this.height_zsy();
        this.height_zsy1();
        this.cpu();
        this.flow();
        this.devhk();
        this.devdh();
        this.devisc();
        this.devtd();
        this.devgb();
        
            
            // console.log("*******",Math.round(this.dev.nONVIFOnline/this.dev.nONVIFTotal*100),this.config.data[0]);
        this.timerRunInfo = setInterval(() => {
            this.GetRunInfo();
            this.cpu();
            this.flow();
        }, 5000);
        this.timerRunInfo = setInterval(() => {
            this.GetDeviceSummary();
            this.devhk();
            this.devdh();
            this.devisc();
            this.devtd();
            this.devgb();
        }, 60000*5);

    },
    methods: {
        //流量
        flow() {
            var base = +new Date();
            var date = [];
            var oneSecond = 1000;
            for (var i = 1; i <= 10; i++) {
                var now = new Date((base += oneSecond));
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            // console.log(this.data)
            
            // console.log(this.data,this.data1)
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('container'))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                        return [pt[0], '10%']
                    }
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
                }, ]
            })
        },
        // cpu
        cpu() {
            var base = +new Date()
            var oneSecond = 1000
            var date = [];
            for (var i = 1; i <= 10; i++) {
                var now = new Date((base += oneSecond))
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('container1'))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function(pt) {
                        return [pt[0], '10%']
                    }
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
                },]
            })
        },
        //海康
        devhk(){
            window.setTimeout(function() {
                // console.log("11111111111111111",this.dev)
                // return false;
                var myChart = echarts.init(document.getElementById('mian'));
                myChart.setOption({
                    tooltip: {
                        show:true,
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:16,
                            fontWeight:400,
                        },
                    },
                    
                    series: [{
                        name: '海康SDK',
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
                            },
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value:this.dev.nHikDevOnline,
                                name: this.$t("message.dashboard.Online"),
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nHikDevTotal-this.dev.nHikDevOnline,
                                name: this.$t("message.dashboard.Not_nline"),
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
                        text: '海康SDK\n共'+this.dev.nHikDevTotal+"个"
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
                            text: '海康SDK\n共'+this.dev.nHikDevTotal+"个"
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //大华
        devdh(){
            // console.log("this.dev)
            window.setTimeout(function() {
                var myChart = echarts.init(document.getElementById('mian1'));
                myChart.setOption({
                    tooltip: {
                        show:true,
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:16,
                            fontWeight:400,
                        },
                    },
                    series: [{
                        name: '大华SDK',
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
                            },
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nDhDevOnline,
                                name: this.$t("message.dashboard.Online"),
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nDhDevTotal-this.dev.nDhDevOnline,
                                name: this.$t("message.dashboard.Not_nline"),
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
                        text: '大华SDK\n共'+this.dev.nDhDevTotal+"个"
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
                            text: '大华SDK\n共'+this.dev.nDhDevTotal+"个"
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //isc
        devisc(){
            window.setTimeout(function() {
                var myChart = echarts.init(document.getElementById('mian2'));
                myChart.setOption({
                    tooltip: {
                        show:true,
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:16,
                            fontWeight:400,
                        },
                    },
                    series: [{
                        name: '海康ISC',
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
                            },
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nHikIscDevOnline,
                                name: this.$t("message.dashboard.Online"),
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nHikIscDevTotal-this.dev.nHikIscDevOnline,
                                name: this.$t("message.dashboard.Not_nline"),
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
                        text: '海康ISC\n共'+this.dev.nHikIscDevTotal+"个"
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
                            text: '海康ISC\n共'+this.dev.nHikIscDevTotal+"个"
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //天地
        devtd(){
            window.setTimeout(function() {
                var myChart = echarts.init(document.getElementById('mian3'));
                myChart.setOption({
                    tooltip: {
                        show:true,
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:16,
                            fontWeight:400,
                        },
                    },
                    series: [{
                        name: '天地SDK',
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
                            },
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nTdDevOnline,
                                name: this.$t("message.dashboard.Online"),
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nTdDevTotal-this.dev.nTdDevOnline,
                                name: this.$t("message.dashboard.Not_nline"),
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
                        text: '天地SDK\n共'+this.dev.nTdDevTotal+"个"
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
                            text: '天地SDK\n共'+this.dev.nTdDevTotal+"个"
                        }
                    })
                });
            }.bind(this), 1000);
        },
        //国标
        devgb(){
            window.setTimeout(function() {
                var myChart = echarts.init(document.getElementById('mian4'));
                myChart.setOption({
                    tooltip: {
                        show:true,
                        
                    },
                    title: {
                        x: 'center',
                        y: 'center',
                        textStyle:{
                            fontSize:16,
                            fontWeight:400,
                        },
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
                            },
                            
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: this.dev.nGbDevOnline,
                                name: this.$t("message.dashboard.Online"),
                                itemStyle: {
                                    color: '#67CFB5'
                                }
                            },
                            {
                                value: this.dev.nGbDevTotal-this.dev.nGbDevOnline,
                                name: this.$t("message.dashboard.Not_nline"),
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
                        text: 'GB\n共'+this.dev.nGbDevTotal+"个"
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
                            text: 'GB\n共'+this.dev.nGbDevTotal+"个"
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
                        var RTSPR="";
                        var ONVIF="";
                        var RTMP="";
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
                        // console.log("设备",this.dev,result.data);
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
                        name:"版本",
                        id:data.strVersion
                    },{
                        name:"主机号",
                        id:data.strHostId
                    },{
                        name:"版权",
                        id:data.strLicenseType
                    },{
                        name:"通道",
                        id:data.strChannelLimit
                    },{
                        name:"版权时间",
                        id:data.strEndtime
                    }]
                    var fun=[{
                        name:"设备SDK",
                        id:data.bDeviceSDK
                    },{
                        name:"转码",
                        id:data.bTranscoding
                    },{
                        name:"国标",
                        id:data.bGB28181
                    },{
                        name:"设备SDK回放",
                        id:data.bDeviceSDKPb
                    },{
                        name:"集群",
                        id:data.bCluster
                    },{
                        name:"视音频协作",
                        id:data.bVideoConference
                    },{
                        name:"平台",
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
                if (result.status == 200) {
                    var data =  result.data;
                    var cpu=[{
                        name:"CPU型号",
                        id:data.strCPUModel
                    },{
                        name:"CPU路数",
                        id:data.nCPU
                    },{
                        name:"CPU核数",
                        id:data.nCPUCore
                    },{
                        name:"CPU编码器",
                        id:data.strHWEncoders
                    },{
                        name:"CPU解码器",
                        id:data.strHWDecoders
                    },{
                        name:"软件编码器",
                        id:data.strSWEncoders
                    },{
                        name:"软件解码器",
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
            console.log("****************", url);

            this.$http.get(url).then(result => {
                console.log(result.data.src.length);

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
#page-wrapper{
    margin-bottom: 20px;
}
.container{
    width: 100%;
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
.container_sdk .containesr_sdks .dv-water-pond-level{
    width: 100%;
    height: 70%;
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
    margin-right: 10px;
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
    height: 40%;
}
.flex_nc .flex_nc1:nth-child(3){
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