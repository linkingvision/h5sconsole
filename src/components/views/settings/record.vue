<template>
<div class="cont">
    <div class="ziti">{{$t("message.setting.manualstart")}}</div>
    <el-switch
        v-model="value"
         @change="start()"
        active-color="#5FBFA7"
        inactive-color="#E9E9E9">
    </el-switch>
    <!-- <el-button type="danger" @click="start()">{{$t("message.tour.Start")}}</el-button> -->
    <div class="ziti">{{$t("message.setting.manualstop")}}</div>
    <el-switch
        v-model="value1"
         @change="stop()"
        active-color="#5FBFA7"
        inactive-color="#E9E9E9">>
    </el-switch>
    <!-- <el-button type="success" @click="stop()">{{$t("message.tour.stop")}}</el-button> -->
</div>
</template>   


<script>
import '../../../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../../assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../../../assets/h5splayerhelper.js'

export default {
    name: 'record',
    data(){
        return {
            value:false,
            value1:true,
            recordstart:[],
        }
    },
    mounted(){
        this.getsrc();
    },
    methods:{
     getsrc(){
        
        let _this =this;
        var root = process.env.API_ROOT;
        var wsroot = process.env.WS_HOST_ROOT;
        if (root == undefined){
            root = window.location.protocol + '//' + window.location.host + window.location.pathname;
        }
        if (wsroot == undefined)
        {
            wsroot = window.location.host;
        }
        var url = root + "/api/v1/GetSrc&session="+ this.$store.state.token;
        console.log(url);
        //return false;
        this.$http.get(url).then(result=>{
            if(result.status == 200){
                var data=result.data;
                for(var i=0;i<data.src.length;i++){
                    var item=data.src[i];
                    var topData={};
                    topData["token"]=item.strToken;
                    //console.log("token",topData);
                    this.recordstart.push(topData);
                    //console.log("token", this.recordstart);
                }
            }//wei
        })
     },
     start(){
         this.value1=false
         console.log(this.recordstart);
         for(var i=0;i<this.recordstart.length;i++){
            var Token=this.recordstart[i];
            console.log(Token.token);
            let _this =this;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            var url = root + "/api/v1/ManualRecordStart?token="+Token.token+"&session="+ this.$store.state.token;
            // console.log(url);
            //return false;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    const h = this.$createElement;
                    this.$notify({
                    title: '开启录像',
                    message: h('i', { style: 'color: teal'}, '开启成功')
                    });
                }
            })
         }
     },
     stop(){
         this.value=false;
         console.log(this.recordstart);
         for(var i=0;i<this.recordstart.length;i++){
            var Token=this.recordstart[i];
            console.log(Token.token);
            let _this =this;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            var url = root + "/api/v1/ManualRecordStop?token="+Token.token+"&session="+ this.$store.state.token;
            // console.log(url);
            //return false;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    const h = this.$createElement;
                    this.$notify({
                    title: '关闭录像',
                    message: h('i', { style: 'color: teal'}, '关闭成功')
                    });
                }
            })
         }
     },
    }
}
</script>
<style scoped>
.cont{
    padding: 20px;
}

.ziti{
    color: #000;
    font-size: 14px;
    margin: 10px 0;
}
</style>