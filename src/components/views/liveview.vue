<template>
<div>
    <div id="page-wrapper"  >
        <div id="watermarktoggle"></div>
        <!-- Header -->
        <div class="container-fluid ">
            <div class="row bg-title">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h4 class="page-title">{{$t("message.live.liveview")}}</h4>
                </div>
                <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                    <el-button class="pull-right" @click="drawer = true" size="mini" type="primary" icon="ti-settings text-white" circle>
                    </el-button>
                </div>
            </div>
        </div>



        <el-drawer
        :title="title"
            size="16%"
            :visible.sync="drawer"
            :direction="direction">
            <div class="slimscrollright">
                <div class="r-panel-body">
                    <ul  class="m-t-20">
                        <li><b>{{$t("message.live.protocol")}}: {{proto}}</b>
                        <div class="row">
                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                <button class="btn btn-block btn-success" @click="changeWS($event)">WEBSOCKET</button>
                            </div>
                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                <button class="btn btn-block btn-info"  @click="changeRTC($event)">WEBRTC</button>
                            </div>
                        </div>
                        </li>
                        <li><b>{{$t("message.live.waterprint")}}: </b>
                              <el-input
                                    size="mini"
                                    placeholder="请输入内容"
                                    v-model="watermarkstring">
                                </el-input>
                        </li>
                        <div class="row">
                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                <button class="btn btn-block btn-success" @click="waterprintoff($event)">打开水印</button>
                            </div>
                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                <button class="btn btn-block btn-info"  @click="waterprintno($event)">关闭水印</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </el-drawer>
        
        <!-- Video -->
        <div class="row">
            <!-- Device tree -->
            <div class="col-sm-3">
                <div class="zdg">
                    <!-- 模糊查询搜查 -->
                    <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                    </el-input>
                    <el-tree
                        :data="data"
                        accordion
                        node-key="id"
                        :filter-node-method="filterNode"
                        ref="tree"
                        highlight-current
                        @node-click="handleNodeClick"
                        :props="defaultProps">
                        <span slot-scope="{ node, data }">
                            <i :class="data.iconclass" style="color:rgb(142, 132, 132);"></i>
                            <span style="padding-left: 4px;">{{data.label}}</span>
                        </span>
                    </el-tree>
                </div>
            </div>

            <!-- Video 1 4 9 16 -->
            <div class="col-sm-9" id="videoPanel">
                <div name='flex' class="videoColor" v-for="r in rows" :key="r">
                    <div calss="videoflexitem" style="flex:1; border:1px solid black;" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
                    <v-liveplayer v-bind:id="'h'+r+c" :h5id="'h'+r+c" :h5videoid="'hvideo'+r+c"></v-liveplayer>
                    </div>
                </div>
                <div class="btn-group blocks">
                    <el-button type="button" class="layout1x1" data-row="1|1" @click="changePanel($event)">
                        </el-button>
                    <el-button type="button" class="layout2x2" data-row="2|2" @click="changePanel($event)">
                        </el-button>
                    <el-button type="button" class="hidden-xs layout3x3" data-row="3|3" @click="changePanel($event)">
                        </el-button>
                    <el-button type="button" class="hidden-xs  layout4x4" data-row="4|4" @click="changePanel($event)">
                        </el-button>
                    <el-button type="button" class="layoutfull" @click="panelFullScreen($event)"> </el-button>
                </div>
            </div>
            
            

        </div><!-- Video -->

    </div>
    

</div>
</template>

<script>
import * as types from '@/store/types'
import '../../assets/material/js/custom.min.js'
import '../../assets/adapter.js'
import '../../assets/h5splayer.js'

import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'
import qs from 'qs'
import Vue from 'vue'
import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.css'
import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js'
import Liveplayer from '../../components/widgets/liveplayer'

export default {
    name: "liveview",
    components: {
        'v-liveplayer': Liveplayer
    },
    data() {
            return {
                //过滤文字
                filterText:"",
                rows: 3,
                cols: 3,
                selectCol: 1,
                selectRow: 1,
                proto: this.$store.state.rtc,
                contentHeight: '',
                contentWidth: '',
                data:[],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    token:"token",
                    iconclass:"iconclass"
                },
                watermarkstring:this.$store.state.watermarkstring,//水印、
                drawer: false,//右侧栏
                direction: 'rtl',//右侧栏
                watermarktoggle:this.$store.state.watermarktoggle,
                title:this.$t("message.live.setting"),
            };

    },
    computed:{
        count(){
            return this.$store.state.rtc,this.$store.state.watermarkstring,this.$store.state.watermarktoggle;
        }
    },
    mounted() {
        this.updateUI();
        this.loadDevice();
        this.loadtest();
        this.NumberDevice();
        this.addWaterMarker();
        document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
        this.$root.bus.$emit('liveplayproto',this.proto);
    },
    methods: {
        
        //水印
        waterprintoff(){
            this.$store.commit(types.WATERMARKSTRING, this.watermarkstring);
            console.log(this.watermarktoggle);

            this.watermarktoggle = "block";
            var watermarktoggle=this.watermarktoggle;
            this.$store.commit(types.WATERMARKTOGGLE, watermarktoggle);

            this.addWaterMarker();
            this.$store.state.watermarktoggle="block";
            document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
        }, 
        waterprintno(){
            console.log(this.watermarktoggle);

            this.watermarktoggle = "none";
            var watermarktoggle=this.watermarktoggle;
            this.$store.commit(types.WATERMARKTOGGLE, watermarktoggle);
            document.getElementById("watermarktoggle").style.display=this.watermarktoggle;
        },
        addWaterMarker(){
            var date=new Date();
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var dates=Y+M+D;
            var watermarkstring= this.watermarkstring;
            console.log(watermarkstring);

            var can = document.createElement('canvas');
            var body = document.body;
            body.appendChild(can);
            can.width=300; //画布的宽
            can.height=200;//画布的高度
            can.style.display='none';
            var cans = can.getContext('2d');
            cans.rotate(-20*Math.PI/180); //画布里面文字的旋转角度
            cans.font = "16px Microsoft JhengHei"; //画布里面文字的字体
            cans.fillStyle = "rgba(17, 17, 17, 0.50)";//画布里面文字的颜色
            cans.textAlign = 'left'; //画布里面文字的水平位置
            cans.textBaseline = 'Middle'; //画布里面文字的垂直位置
            cans.fillText(watermarkstring,can.width/3,can.height/2); //画布里面文字的间距比例
            document.getElementById("watermarktoggle").style.backgroundImage="url("+can.toDataURL("image/png")+")";
        },
        //树形节点点击
        handleNodeClick(data, checked, indeterminate){
            console.log(data.token);
            console.log(data.streamprofile);
            let _this =this;
            if (data.token) {
                let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
                console.log(vid);
                _this.$root.bus.$emit('liveplay', data.token,data.streamprofile, vid);
            }
        },

        updateUI()
        {
            $(".content").innerHeight($('.content-wrapper').innerHeight() - $('.content-header').outerHeight() - $('.main-header').innerHeight());
            //$('div[name="flex"]').height(($(".content").height() - 50) / this.rows);
            if($(document.body).width() < 768)
            {
                this.contentHeight = $(document.body).height()*0.4;
            }else
            {
                this.contentHeight = $(document.body).height()*0.8;
            }
            $('div[name="flex"]').height(this.contentHeight / this.rows);
            //this.contentHeight = $(document.body).height()*0.8;
            let _this = this;
            if (H5siOS() === true)
            {
                $('.h5video').prop("controls", true);
            }

            /*$(".right-side-toggle").on("click", function () {
                $(".right-sidebar").slideDown(50).toggleClass("shw-rside");
                $(".fxhdr").on("click", function () {
                    body.toggleClass("fix-header"); 
                });
                $(".fxsdr").on("click", function () {
                    body.toggleClass("fix-sidebar");
                });
                var fxhdr = $('.fxhdr');
                console.log(fxhdr);
                if (body.hasClass("fix-header")) {
                    fxhdr.attr('checked', true);
                } else {
                    fxhdr.attr('checked', false);
                }
            });*/
        },
        updateUIEnterFullScreen(){

            $('div[name="flex"]').height(screen.height / this.rows);
        },
        updateUIExitFullScreen(){
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
            {
                $('div[name="flex"]').height(this.contentHeight / this.rows);
            }
        },
        //测试机仓
        loadtest(){
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
		    //url
            var url = root + "/api/v1/GetSrcWithoutDevice?session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                if(result.status == 200){
					var data =  result.data;
                    var srcGroup = {children: []};
                    srcGroup.label=this.$t('message.live.camera');
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                         var item = data.src[i];
                        if(item['nOriginalType'] == 'H5_CH_GB'){
                            continue;
                        }else{
                            // 主副流
                            var node=[{
                            token : item['strToken'],
                            streamprofile : "main",
                            label :this.$t('message.live.mainstream'),
                            iconclass : 'mdi mdi-playlist-play fa-fw'
                            },{
                            token : item['strToken'],
                            streamprofile : "sub",
                            label :this.$t('message.live.substream'),
                            iconclass : 'mdi mdi-playlist-play fa-fw'
                            }]
                            var newItem ={
                                    token : item['strToken'],
                                    label : item['strName'],
                                    iconclass : 'mdi mdi-camcorder fa-fw',
                                    children:node};
                            //console.log("itme",item['bOnline'],item)
                            if(!item['bOnline'])
                                newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                            if(item['nType'] == 'H5_CLOUD')
                                newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';
                            
                        

                        srcGroup.children.push(newItem);
                        }
                    }
                    this.data.push(srcGroup);
				  } 
            })

        },
        //写作业
        loadDevice() {
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
		   //url
		   var url = root + "/api/v1/GetDevice?session="+ this.$store.state.token;

			  //重组
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var srcData = [];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var srclevel=[];
						  srclevel["strToken"]=item.strToken;
						  srclevel["strName"]=item.strName;
						  this.loadSrc(srclevel,srcData);
					  }
				  }
			  })
		},
        loadSrc(srclevel, srcData) {

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

            var url = root + "/api/v1/GetDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        // 主副流
                        var node=[{
                          token : item['strToken'],
                          streamprofile : "main",
                          label :this.$t('message.live.mainstream'),
                          iconclass : 'mdi mdi-playlist-play fa-fw'
                        },{
                          token : item['strToken'],
                          streamprofile : "sub",
                          label :this.$t('message.live.substream'),
                          iconclass : 'mdi mdi-playlist-play fa-fw'
                        }]
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'mdi mdi-camcorder fa-fw',
                                children:node};

                        if(!item['bOnline'])
                            newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                        if(item['nType'] == 'H5_CLOUD')
                            newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                       srcGroup.children.push(newItem);
                    }
                    this.data.push(srcGroup);
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },
        //数字仓机
        NumberDevice() {
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
		   //url
		   var url = root + "/api/v1/GetGbDevice?session="+ this.$store.state.token;

			  //重组
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var srcData = [];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var srclevel=[];
						  srclevel["strToken"]=item.strToken;
						  srclevel["strName"]=item.strName;
						  this.NumberSrc(srclevel,srcData);
					  }
				  }
			  })
		},
        NumberSrc(srclevel, srcData) {

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

            var url = root + "/api/v1/GetGbDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        // 主副流
                        var node=[{
                          token : item['strToken'],
                          streamprofile : "main",
                          label :this.$t('message.live.mainstream'),
                          iconclass : 'mdi mdi-playlist-play fa-fw'
                        },{
                          token : item['strToken'],
                          streamprofile : "sub",
                          label :this.$t('message.live.substream'),
                          iconclass : 'mdi mdi-playlist-play fa-fw'
                        }]
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'mdi mdi-camcorder fa-fw',
                                children:node};

                        if(!item['bOnline'])
                            newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                        if(item['nType'] == 'H5_CLOUD')
                            newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                       srcGroup.children.push(newItem);
                    }
                    this.data.push(srcGroup);
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },

        changePanel(event) {
            let data = $(event.target).data('row');
            let cols = data.split('|')[1];
            let rows = data.split('|')[0];
            //this.map.clear();
            let _this = this;
            Object.assign(this.$data, {
                rows: parseInt(rows),
                cols: parseInt(cols)
            });
            Vue.nextTick(function () {
                //$('div[name="flex"]').height(($(".content").height() - 50) / rows);
                $('div[name="flex"]').height(_this.contentHeight / rows);
            })
        },

        changeWS(event) {
            this.proto = "WS";
            var proto=this.proto;
            this.$store.commit(types.RTCSW, proto);
            this.$root.bus.$emit('liveplayproto', "WS");
        },
        changeRTC(event) {
            this.proto = "RTC";
            var proto=this.proto;
            this.$store.commit(types.RTCSW, proto);
            this.$root.bus.$emit('liveplayproto', "RTC");
        },

        panelFullScreen(event) {
            var elem = document.getElementById('videoPanel');
            //var elem = $("#videoPanel");
            console.log('panelFullScreen', event);
            if (
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
            ) {
                if (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                ) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    console.log("========  updateUIExitFullScreen");
                    this.updateUIExitFullScreen();
                } else {
                     console.log('panelFullScreen3');

                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                    this.updateUIEnterFullScreen();
                    if (document.addEventListener)
                    {
                        document.addEventListener('webkitfullscreenchange', this.updateUIExitFullScreen, false);
                        document.addEventListener('mozfullscreenchange', this.updateUIExitFullScreen, false);
                        document.addEventListener('fullscreenchange', this.updateUIExitFullScreen, false);
                        document.addEventListener('MSFullscreenChange', this.updateUIExitFullScreen, false);
                    }
                }
            } else {
                console.log('Fullscreen is not supported on your browser.');
            }
        },

        videoClick(r, c, $event) {
            this.selectCol = c;
            this.selectRow = r;
            console.log(r, c);
            if ($($event.target).parent().hasClass('videoClickColor')) {
                $($event.target).parent().removeClass('videoClickColor');
            } else {
                $('#videoPanel div[class*="videoClickColor"]').removeClass('videoClickColor');
                $('#videoPanel>div').eq(r - 1).children('div').eq(c - 1).addClass('videoClickColor');
                //$('#videoPanel>div').eq(r - 1).children('div').eq(c - 1).children(".h5videowrapper").children(".h5video").style.opacity = "0.25";
            }
        },
        stopVideo(event){
            return;
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
.el-button+.el-button {
    margin-left: 0;
}
.el-drawer__header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding: 10px 20px;
    background-color: #f44336;
}
.slimscrollright{
    padding: 0 24px;
}
.m-t-20 li{
    margin-bottom: 10px;
}
/* 水印 */
#watermarktoggle{
    position: fixed;
    z-index: 100;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: block;
    pointer-events: none;
}
/* gao */
.zdg{
    background-color: #ffffff;
    height: 800px;
    overflow-y:auto;
}
.content-header .breadcrumb {
    font-size: 1.5rem;
    position: static;
    float: left;
}
.content{
    min-height: 50px;
}

div[name='flex'] {
    display: flex;
    border-bottom: 0px !important;

}

div[name='flex']+[name='flex'] {
    border-left: 0px !important;
}

#videoPanel>div:nth-last-child(2) {
    border-bottom: 1px solid rgb(22, 22, 22) !important;
}


#videoPanel:-webkit-full-screen {
    background-color: rgb(73, 74, 75) !important;
	display: block;
	width: 100%;
    height: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: auto;
	margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
	box-shadow: 0px 0px 50px #000;
}


#videoPanel:-moz-full-screen {
    background-color: rgb(73, 74, 75) !important;
	display: block;
	width: 100%;
    height: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: auto;
	margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
	box-shadow: 0px 0px 50px #000;
}

div[name="flex"]:hover {
    /*background-color: #3c8dbc;*/
    cursor: pointer;
}

.videoClickColor {
    background-color: #616263 !important;
    opacity: 0.80;
}

.videoColor {
    background-color: rgb(73, 74, 75) !important;
}

.pre-scrollable {
    max-height: 480px;
    overflow-y: scroll;
}

.layout1x1 {
    background: url('../../assets/img/layout/1x1.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout1x1:hover {
    background: url('../../assets/img/layout/1x1.png') #7a7878;
    background-size: 32px 32px;
    color: rgb(187, 184, 184);
    height: 32px;
    width: 32px;
}

.layout2x2 {
    background: url('../../assets/img/layout/2x2.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout2x2:hover {
    background: url('../../assets/img/layout/2x2.png') #7a7878;
    background-size: 32px 32px;
    color: rgb(187, 184, 184);
    height: 32px;
    width: 32px;
}

.layout3x3 {
    background: url('../../assets/img/layout/3x3.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout3x3:hover {
    background: url('../../assets/img/layout/3x3.png') #7a7878;
    background-size: 32px 32px;
    color: rgb(187, 184, 184);
    height: 32px;
    width: 32px;
}

.layout4x4 {
    background: url('../../assets/img/layout/4x4.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout4x4:hover {
    background: url('../../assets/img/layout/4x4.png') #7a7878;
    background-size: 32px 32px;
    color: rgb(187, 184, 184);
    height: 32px;
    width: 32px;
}

.layoutfull {
    background: url('../../assets/img/layout/fullscreen.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layoutfull:hover {
    background: url('../../assets/img/layout/fullscreen.png') #7a7878;
    background-size: 32px 32px;
    color: rgb(187, 184, 184);
    height: 32px;
    width: 32px;
}

</style>
