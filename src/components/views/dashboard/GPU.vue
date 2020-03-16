<template>
    <div id="page-wrapper">
        <div class="container">
            <div v-for="(a,index) in lent" :key="index" class="container_flex">
                <div class="beibiao_zi">
                    <img src="../gallery/daId@2x.png"/>
                    <span>{{nvidiadata1[index]}}</span>
                </div>
                <div :id="'container'+a" style="width: 100%;height: 100%;"></div>
            </div>
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
            lent:12,
            data:[
                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},

                {data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                data1: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
            ],
            Gpudata:[],
            Gpu_in:this.$t("message.dashboard.gpudecoder"),
            Gpu_out:this.$t("message.dashboard.gpuencoder"),
            title_text:this.$t("message.dashboard.an_out"),
            nvidiadata1:[],
        }
    },
    mounted(){
        this.Gpufo();
        this.timerRunInfo = setInterval(() => {
            this.Gpufo();
        }, 5000);
        
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
                    /**var data={
                        "intel": [],
                        "nvidia": [
                            {
                            "nIndex": 0,
                            "strName": "GeForce GTX 1660 Ti1111"
                            },
                            {
                            "nIndex": 1,
                            "strName": "GeForce GTX 1660222"
                            },
                            {
                            "nIndex": 1,
                            "strName": "GeForce GTX 166033"
                            }
                        ]
                    }**/
                    this.Gpudata=data;
                    // var lengthin=data.intel.length;
                    // var lengthnv=data.nvidia.length;
                    this.lent=data.nvidia.length;
                    this. Gpuul(data);
                }
            })
        },
        Gpuul(datafo){
            let _this = this;
            var root = process.env.API_ROOT;
            if (root == undefined) {
                root =window.location.protocol + "//" +window.location.host +window.location.pathname;
            }

            var url =root + "/api/v1/GetGPULoad?session=" + this.$store.state.token;
            this.$http.get(url).then(result => {
                if (result.status == 200) {
                    var data = result.data;
                    /***var data={
                        "bSupportIntel": false,
                        "bSupportNVIDIA": true,
                        "intel": [],
                        "nvidia": [
                            {
                            "nIndex": 0,
                            "nEncodeUsage": 3,
                            "nDecodeUsage": 2
                            },
                            {
                            "nIndex": 1,
                            "nEncodeUsage": 30,
                            "nDecodeUsage": 20
                            },
                            {
                            "nIndex": 1,
                            "nEncodeUsage": 80,
                            "nDecodeUsage": 60
                            }
                        ]
                    }**/
                    var nvidiadata=[];
                    // return false;
                    for(var i=0;i<data.nvidia.length;i++){
                        if(datafo.nvidia[i].nIndex==data.nvidia[i].nIndex){
                            var dataroot={
                                nIndex:data.nvidia[i].nIndex,
                                strName:datafo.nvidia[i].strName,
                                nEncodeUsage:data.nvidia[i].nEncodeUsage,
                                nDecodeUsage:data.nvidia[i].nDecodeUsage,
                            }
                            nvidiadata.push(dataroot);
                            this.nvidiadata1.push(datafo.nvidia[i].strName);
                        }
                    }
                    var lengthnv=nvidiadata.length;
                    for(var i=0;i<nvidiadata.length;i++){
                        this.data[i].data.push(nvidiadata[i].nEncodeUsage);
                        this.data[i].data.splice(0, 1);
                        this.data[i].data1.push(nvidiadata[i].nDecodeUsage);
                        this.data[i].data1.splice(0, 1);
                        console.log("******",i)
                        this.GPUnv(lengthnv,nvidiadata,i);
                    }
                }
            })
        },
        GPUnv(lengthnv,nvidiadata,l){
            // console.log(nvidiadata)
            // return false;
            var base = +new Date();
            var date = [];
            var _this=this;
            var oneSecond = 1000;
            for (var i = 1; i <= 64; i++) {
                var now = new Date((base += oneSecond));
                date.push(
                    [('0' + now.getSeconds()).slice(-2) + 's']
                )
            }
            var pieId = document.getElementById('container'+(l+1));
            if (!pieId){
                return false;
            }
            var myChart = echarts.init(pieId)
            // return false;
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
                    text: nvidiadata[l].strName,
                    show:false
                },
                legend: {
                        data:[ this.Gpu_in,this.Gpu_out],
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
                    name: this.Gpu_in,
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
                    data: this.data[l].data
                }, {
                    name: this.Gpu_out,
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
                    data: this.data[l].data
                }, ]
            })
        },
    },
}
</script>
<style scoped>
.container{
    width: 100%;
    background-color: #FFFFFF;
    min-height: 900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 30px 30px;
}
.container .container_flex{
    width: 50%;
    height: 400px;
}
</style>