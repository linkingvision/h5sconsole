<template>
    <div id="page-wrapper">
        <div v-for="(a,index) in lent" :key="index">
            <div :id="'container'+a"  style="width:100%;height: 400px;"></div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
var Highcharts = require("highcharts");
export default {
    name: "GPU",
    data() {
        return {
            lent:3,
            data1: [0,0,0,0,0,10,1000,50,63,72,4099,550,440,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data2: [0,0,0,0,0,10,1000,50,63,72,4099,550,440,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            data3: [0,0,0,0,0,10,1000,50,63,72,4099,550,440,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            echartsdata:[],
        }
    },
    mounted(){
        this.GPU();
        // this.Gpufo();
    },
    methods:{
        Gpufo(){
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
                    this.lengt=data.intel.length+data.nvidia.length
                    console.log(data.intel.length,data.nvidia.length);
                }
            })
        },
        GPU() {
            var base = +new Date();
            var date = [];
            var oneSecond = 1000;
            for (var i = 1; i <= 64; i++) {
                var now = new Date((base += oneSecond));
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            var lent=this.lent;
            for(var i=1;i<=lent;i++){
                var pieId = document.getElementById('container'+i);
                if (!pieId){
                    return false;
                }
                var myChart = echarts.init(pieId)
                var echdata="this.data"+i
                typeof echdata
                console.log(i,echdata)
                return false;
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
                        data: echdata
                    }, ]
                })
            }
        },
    },
}
</script>