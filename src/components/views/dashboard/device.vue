<template>
    <div id="page-wrapper">
        <div class="container">
            <div class="flex_beibiao">
                <div class="beibiao_zi">
                    <img src="../gallery/daId@2x.png"/>
                    <span>{{this.$t("message.dashboard.device")}}</span>
                </div>
                <div style="display: flex;">
                    <div class="beibiao_zi1">{{this.$t("message.dashboard.Online")}}</div>
                    <div class="beibiao_bg"></div>
                    <div class="beibiao_zi1">{{this.$t("message.dashboard.Offline")}}</div>
                    <div class="beibiao_bg1"></div>
                </div>
            </div>
            <div class="flex_beisdk">
                    <div id="devsdk0" class="beisdk"></div>
                    <div id="devsdk1" class="beisdk"></div>
                    <div id="devsdk2" class="beisdk"></div>
                    <div id="devsdk3" class="beisdk"></div>
                    <div id="devsdk4" class="beisdk"></div>
                    <div id="devsdk5" class="beisdk"></div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
var Highcharts = require("highcharts");
export default {
    name: "device",
    data() {
        return {
            length:"",
            dev:{},
            Hikvision:this.$t("message.dashboard.Hikvision"),
            Dahua:this.$t("message.dashboard.Dahua"),
            Tiandy:this.$t("message.dashboard.Tiandy"),
            Uniview:this.$t("message.dashboard.Uniview"),

            total:this.$t("message.dashboard.total"),
            ge:this.$t("message.dashboard.ge"),

            Online:this.$t("message.dashboard.Online"),
            Offline:this.$t("message.dashboard.Offline"),
        }
    },
    beforeDestroy() {
        clearInterval(this.timerRunInfo1);
    },
    mounted(){
        this.GetDeviceSummary();
        this.timerRunInfo1 = setInterval(() => {
            this.GetDeviceSummary();
        }, 60000*5);
    },
    methods:{
        //设备
        GetDeviceSummary(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var num=0;
            var url = root + "/api/v1/GetDeviceSummary?session="+ this.$store.state.token;
            // console.log("----------",url)
            this.$http.get(url).then(result=>{
                if (result.status == 200) {
                    // this.dev=result.data;
                    var data=result.data;
                    for(var i in data){
                    　　num++;
                    }
                    var devdata=[{
                            name:this.Hikvision,
                            Total:data.nHikDevTotal,
                            Online:data.nHikDevOnline,
                        },{
                            name:this.Dahua,
                            Total:data.nDhDevTotal,
                            Online:data.nDhDevOnline,
                        },{
                            name:"iSecure Center",
                            Total:data.nHikIscDevTotal,
                            Online:data.nHikIscDevOnline,
                        },{
                            name:this.Tiandy,
                            Total:data.nTdDevTotal,
                            Online:data.nTdDevOnline,
                        },{
                            name:"GB",
                            Total:data.nGbDevTotal,
                            Online:data.nGbDevOnline,
                        },{
                            name:this.Uniview,
                            Total:data.nUnvDevTotal,
                            Online:data.nUnvDevOnline,
                    }];
                    
                    this.length=devdata.length;
                    for(var i=0;i<devdata.length;i++){
                        this.devimage(devdata[i],i);
                    }
                    // console.log(data)
                }
            })
        },
        //海康
        devimage(devdata,leng){
            // console.log(devdata,leng,'devive'+leng);
            var pieId=document.getElementById("devsdk"+leng)
            // console.log(pieId,'devsdk'+leng);
            // return false
            if (!pieId){
                return false;
            }
            var myChart = echarts.init(pieId);
            myChart.setOption({
                tooltip: {
                    show:true,
                },
                title: {
                    x: 'center',
                    y: 'center',
                    textStyle:{
                        fontSize:12,
                        fontWeight:400,
                    },
                },
                
                series: [{
                    name: devdata.name,
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
                            value:devdata.Online,
                            name: this.Online,
                            itemStyle: {
                                color: '#67CFB5'
                            }
                        },
                        {
                            value: devdata.Total-devdata.Online,
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
                    text: devdata.name+'\n'+this.total+devdata.Total+this.ge
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
                        text: devdata.name+'\n'+this.total+devdata.Total+this.ge
                    }
                })
            });
        },
    },
}
</script>
<style scoped>
.container{
    width: 100%;
    background-color: #FFFFFF;
    min-height: 860px;
    padding: 30px 30px;
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
.flex_beisdk{
    width: 100%;
    height: 80%;
    display: flex;
    flex-flow: wrap;
    /* justify-content: space-around; */
}
.flex_beisdk .beisdk{
    width: 20%;
    height: 200px;
}
.flex_beisdk .beisdk div{
    width: 100%;
    height: 100%;
}
</style>