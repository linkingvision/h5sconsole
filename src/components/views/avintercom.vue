<template>
    <div id="page-wrapper" style="background-color: #fff;">
        <!-- 头部 -->
        <!--  -->
        <div class="container-fluid">
            <div class="bg-title" style="margin-bottom: 0px;">
                <div class="flex_ld">
                    <h4 class="page-title">{{$t("message.Conference.VideoConference")}}</h4>
                    <div>
                        <el-input
                            style="width:200px"
                            v-model="searchTableInfo"
                            size="mini"
                            placeholder="请输入名字"/>
                        <el-button type="success" @click="add()" round size="mini">{{$t("message.Conference.JoinConference")}}</el-button>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- shenti -->
        <div class="content">
            <div class="content_1">
                <!-- 模糊查询搜查 -->
                <div class="input-pin">
                    <el-input
                        placeholder="请输入名字"
                        v-model="filterText">
                    </el-input>
                </div>
                <el-tree
                    :data="data"
                    node-key="id"
                    :filter-node-method="filterNode"
                    ref="tree"
                    highlight-current
                    @node-click="handleNodeClick"
                    :props="defaultProps">
                    <span slot-scope="{ node, data }" style="width:100%;">
                        <div style="width:100%;display: flex;justify-content: space-between;">
                            <span >
                                <!-- <img src="" alt=""> -->
                                <span style="padding-left: 4px;">{{data.label}}</span>
                                <!-- <span  class="black" style="">{{$t("message.live.Videorecording")}}</span> -->
                            </span>
                            <div>
                                <span @click="CallVideoAudio(data)" class="iconfont icon-shishishipin2" style="color:rgb(142, 132, 132);"></span>
                                <span @click="CallAudio(data)" class="iconfont icon-yuyintonghua" style="color:rgb(142, 132, 132);"></span>
                            </div>
                            
                        </div>
                    </span>
                </el-tree>
            </div>
            <div class="content_2">
                <div class="content_name">
                    {{name}}
                </div>
                <!--  -->
                <div class="content_video"  v-on:mouseover="sortAll()" v-on:mouseleave='leave()'>
                    <!-- <img src="./gallery/chart.png"/> -->
                    <video id="h5sVideoRemote" src=""></video>  
                    <div class="content_h5sVideoRemote">
                        
                        <video id="h5sVideoLocal" muted src="" ></video>
                    </div>
                    <div class="content_anniu" >
                        <div class="content_anniu1">
                            <div>
                                <!-- <div>通话时间</div> -->
                                <el-button type="danger" circle class="content_anniu1_Hangup" @click="Hangup">
                                    {{$t("message.Conference.Hang")}}
                                </el-button>
                            </div>
                            <div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div class="content_anniu2">
                        <div class="content_anniu2_frame">
                            <div>
                                <span>{{$t("message.Conference.Call")}}</span>
                                <el-button style="background:none;border:0; padding: 0;" type="success" @click="Hangup()" icon="el-icon-close" circle size="mini"></el-button>
                            </div>
                            <div>
                                <img src="./gallery/shipintonghua@2x.png"/>
                            </div>
                            <div>
                                <el-button style="background:#46C561;" type="success" @click="AnswerVideoAudio()" round size="mini">{{$t("message.Conference.VideoCall")}}</el-button>
                                <el-button style="background:#46C561;" type="success" @click="AnswerAudio()" round size="mini">{{$t("message.Conference.AudioCall")}}</el-button>
                                <el-button style="background:#DC4D36;" type="danger" @click="Hangup()" round size="mini">{{$t("message.Conference.HangUp")}}</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import * as types from '@/store/types'
import '../../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack,H5sConference} from '../../assets/h5splayer.js'
import '../../assets/platform.js'
import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'

  export default {
    data() {
      return {
        filterText:"",
        searchTableInfo:this.$store.state.conference,
        v1:undefined,
        data:[],
        name:'',
        id:"",
        defaultProps: {
            children: 'children',
            label: 'label',
            token:"token",
            iconclass:"iconclass"
        },
      }
    },
    computed:{
        count(){
            return this.$store.state.conference;
        }
    },
    mounted(){
        // this.list();
    },
    methods:{
        //拨打视频语音电话
        CallVideoAudio(data){
            this.name=data.label;
            // this.id=data.id;
            console.log("CallVideoAudio",data.id);
	        this.v1.call(true,data.id);
        },
        //拨打语音电话
        CallAudio(data){
            this.name=data.label;
            // this.id=data.id;
            console.log("CallAudio",data.id);
            this.v1.call(false, data.id);
        },
        //接通视频
        AnswerVideoAudio(){
            console.log("AnswerVideoAudio",this.id);
            $(".content_anniu2").css("display","none");
            this.v1.answer(true,this.id);
        },
        //接通语音
        AnswerAudio(){
            console.log("AnswerAudio",this.id);
            $(".content_anniu2").css("display","none");
            this.v1.answer(false, this.id);
        },

        //挂断
        Hangup(){
            console.log("Hangup");
            this.v1.hangup();
            $(".content_anniu2").css("display","none");
        },
        // 添加用户
        add(){
            if( this.searchTableInfo!=""){
                if (this.v1 != undefined)
                {
                    this.v1.disconnect();
                    delete this.v1;
                    this.v1 = undefined;
                }
                // this.data=[];
                this.list();
                this.$store.commit(types.CONFERENCE, this.searchTableInfo);
            }else{
                this.$message({
                    message: this.$t("message.Conference.Nickname"),
                    type: 'warning'
                });
            }
            
        },
        //获取列表
        list(){
            this.data=[];
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            // console.log("11111111111111",process.env.API_ROOT)
            var conf1 = {
                localvideoid:'h5sVideoLocal',
                remotevideoid:'h5sVideoRemote',
                protocol: window.location.protocol, //http: or https:
                host: wsroot, //localhost:8080
                rootpath:'/', // '/'
                callback: this.EventCB, 
                userdata: null, // user data
                name:this.searchTableInfo,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token //session got from login
            };
            console.log(conf1);
            this.v1 = new H5sConference(conf1);
            this.v1.connect();
        },
        sortAll(){
            $(".content_anniu").css("display","block");
            // console.log("1548");
        },
        leave(){
            $(".content_anniu").css("display","none");
            // console.log("456787");
        },
        //点击事件
        handleNodeClick(data){
            // console.log("点击",data)
        },
        EventCB(event, userdata){
            var msgevent = JSON.parse(event);
            if (msgevent.type === 'CFE_EVENT_PEER_CALL')
            {
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].id==msgevent.peerCall.strId){
                        console.log("对方id",this.data[i].label)
                        this.name=this.data[i].label;
                    }
                }
                $(".content_anniu2").css("display","block");
                this.id=msgevent.peerCall.strId;
                console.log("****************",msgevent.peerCall.strId);
            }
            if (msgevent.type === 'CFE_EVENT_PEER_ADD')
            {
                console.log("****************",msgevent.peerAdd.strId);
                var newItem ={
                    label:msgevent.peerAdd.strName,
                    id:msgevent.peerAdd.strId,
                };
                this.data.push(newItem);
                // for(var i=0; i<this.data.length; i++){
                //     for(var j=i+1; j<this.data.length; j++){
                //         if(this.data[i].id==this.data[j].id){
                //             this.data.splice(j,1);
                //             j--;
                //         }
                //     }
                // }
                
                console.log("****************",newItem,this.data);
            }
            if (msgevent.type === 'CFE_EVENT_PEER_DEL')
            {
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].id==msgevent.peerDel.strId){
                        this.data.splice(i,1);
                        // console.log("对方id",this.data[i].label)
                    }
                }
                console.log("****************",msgevent.peerDel.strId);
            }
        },
        //模糊查询
        filterNode(value, data, node) {
            // 如果什么都没填就直接返回
            if (!value) return true;
            // 如果传入的value和data中的label相同说明是匹配到了
            if (data.label.indexOf(value) !== -1) {
            return true;
            }
            // 否则要去判断它是不是选中节点的子节点
            return this.checkBelongToChooseNode(value, data, node);
        },
        // 判断传入的节点是不是选中节点的子节点
        checkBelongToChooseNode(value, data, node) {
            const level = node.level;
            // 如果传入的节点本身就是一级节点就不用校验了
            if (level === 1) {
            return false;
            }
            // 先取当前节点的父节点
            let parentData = node.parent;
            // 遍历当前节点的父节点
            let index = 0;
            while (index < level - 1) {
            // 如果匹配到直接返回
            if (parentData.data.label.indexOf(value) !== -1) {
                return true;
            }
            // 否则的话再往上一层做匹配
            parentData = parentData.parent;
            index ++;
            }
            // 没匹配到返回false
            return false;
        },
    },
     //模糊查询
    watch: {
      filterText(val) {
        console.log("filter",val);
        this.$refs.tree.filter(val);
      }
    },
  };
</script>
<style scoped>
.content{
    display: flex;
    justify-content: space-between;
    /* padding: 0 20px; */
    margin-bottom: 10px;
    background: #f7f7f7;
    width: 100%;
    height: 900px;
}
.content .content_1{
    width: 19.5%;
    height: 98%;
    background: #ffffff;
}
.content .content_2{
    width: 80%;
    height: 98%;
    padding: 20px;
    background: #ffffff;
}
.content .content_2 .content_name{
    width: 100%;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-bottom: 30px;
    /* height: 20%; */
}
.content .content_2 .content_video{
    width: 100%;
    height: 93%;
    position: relative;
    background: url("./gallery/shipintonghua@2x.png") #e6e6e6 no-repeat;
    background-size: 10%;
    background-position: center center;
}
.content_h5sVideoRemote{
    position: absolute;
    height: 200px;
    width: 250px;
    background-color: #f7f7f7;
    bottom: 10px;
    right: 10px;
}
#h5sVideoRemote{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.content .content_2 .content_video #h5sVideoLocal{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
.content .content_2 .content_video .content_anniu{
    display: none;
    width: 100%;
    
}
.content_anniu1{
    width: 50%;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    align-items:center;
    justify-content: space-between;
    right: 20px;
    bottom: 20px;
    text-align: center;
}
.content_anniu1_Hangup{
    width: 60px;
    height: 60px;
}

.content_anniu2{
    display: none;
    width: 100%;
    position: absolute;
    top: 0;
    text-align: center;
    background: rgba(0,0,0,0.5);
    height: 100%;
}
.content_anniu2_frame{
    width: 30%;
    text-align: center;
    margin: 14% auto 0;
    background-color: #292929;
    padding: 10px;
    color: #fff;
}
.content_anniu2_frame div:nth-child(3){
    margin-top: 20px;
}
.content_anniu2_frame div:nth-child(2) img{
    height: 154px;
    width: 140px;
}
.content_anniu2_frame div:nth-child(1){
    display: flex;
    width: 100%;
    margin-bottom: 10px;
    justify-content: space-between;
}
.camera{
    width: 18px;
    height: 18px;
    background-image: url("./gallery/jiankongdian.svg") !important;
}
/* 左边数据栏 */
.el-input >>> .el-input__inner {
    -webkit-appearance: none;
    /* background:url("./gallery/ksr.png") no-repeat; */
    background-color: #FAFAFA;
    background-size: 100%;
    border-radius: 50px;
    border: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 38px;
    line-height: 40px;
    outline: 0;
    padding: 0 30px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.input-pin{
    padding:16px 24px;
    text-align: center；
}
</style>