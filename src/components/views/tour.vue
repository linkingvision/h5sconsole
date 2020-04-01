<template>
<div>
    <div id="page-wrapper"  >
        <!-- <div id="watermarktoggle"></div> -->
        <!-- Header -->
        <div class="container-fluid ">
            <div class="row bg-title">
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <h4 class="page-title">{{$t("message.left.tour")}}</h4>
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
                    </ul>
                </div>
            </div>
        </el-drawer>
        
        <!-- Video -->
        <el-row :gutter="20">
            <el-col :span="5">
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
                        :props="defaultProps">
                        <span slot-scope="{ node, data }">
                            <i :class="data.iconclass" style="color:rgb(142, 132, 132);"></i>
                            <span style="padding-left: 4px;">{{data.label}}</span>
                        </span>
                    </el-tree>
                </div>
            </el-col>

            <!-- Video 1 4 9 16 -->
            <el-col :span="19">
                <div id="videoPanel">
                    <div name='flex' class="videoColor" v-for="r in rows" :key="r">
                        <div calss="videoflexitem" style="flex:1; border:1px solid black;" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
                        <v-liveplayer v-bind:id="'h'+r+c" :h5id="'tour'+r+c" :h5videoid="'hvid'+r+c"></v-liveplayer>
                        </div>
                    </div>
                    <div>
                        <el-button size="mini" @click="Playall">{{$t("message.tour.Start")}}</el-button>
                        <el-button size="mini" @click="Allpause">{{$t("message.tour.stop")}}</el-button>
                        <el-select v-model="region" size="mini" style="width:70px" @change="Speed()">
                            <el-option label="20" value="20"></el-option>
                            <el-option label="30" value="30"></el-option>
                            <el-option label="60" value="60"></el-option>
                        </el-select>
                        <el-select v-model="streamprofile" size="mini" style="width:120px">
                            <el-option :label="label.label2" value="main"></el-option>
                            <el-option :label="label.label3" value="sub"></el-option>
                        </el-select>
                        <el-select v-model="proto" size="mini" style="width:120px" @change="changeWS">
                            <el-option label="WS" value="WS"></el-option>
                            <el-option label="RTC" value="RTC"></el-option>
                        </el-select>
                    </div>
                    <div class="btn-group blocks">
                        <el-button type="button" class="hidden-xs layout3x3" data-row="3|3" @click="changePanel($event)">
                        </el-button>
                        <el-button type="button" class="layoutfull" @click="panelFullScreen($event)"> </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
            

        </div><!-- Video -->


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
import Liveplayer from '../../components/widgets/tourplayer'
export default {
    name: "tour",
    components: {
        'v-liveplayer': Liveplayer
    },
    data() {
            return {
                //过滤文字
                label:{
                    label2:this.$t("message.live.mainstream"),//选3
                    label3:this.$t("message.live.substream"),//选3
                },
                filterText:"",
                rows: 3,
                cols: 3,
                selectCol: 1,
                selectRow: 1,
                proto:"WS",
                contentHeight: '',
                contentWidth: '',
                data:this.listdatag.listdatag,
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    token:"token",
                    iconclass:"iconclass",
                },
                drawer: false,//右侧栏
                direction: 'rtl',//右侧栏
                title:this.$t("message.live.setting"),
                region:20,//几秒钟更换
                streamprofile:"main",//码流
                proto: this.$store.state.tour,//协议
                h5playev1:[],//内容
                timersetInterval:"",//定时器
                token_index:"",//删除个数
            };

    },
    computed:{
        count(){
            return this.$store.state.tour;
        }
    },
    mounted() {
        
        this.updateUI();
        // this.loadDevice();
        // this.loadtest();
        // this.NumberDevice();
        // this.cloudDevice();
        this.$root.bus.$emit('liveplayproto',this.proto);
    },
    methods: {
       
        //全部开始
        Playall(){
            this.Allpause();
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
            
            //console.log("44",url);
            this.$http.get(url).then(result=>{
                //console.log("a",result);
                if(result.status == 200){
                    var data =  result.data;
                    //console.log(data);
                    //return false;
                    for(var i=0; i< data.src.length; i++){
                        token_q.push(data.src[i].strToken);
                        this.token_index=token_q.length;
                        if(i<9){
                            var item = token_q[i];
                            if (i==0) {
                                    vid = 'tour' +11;
                                }else if (i==1) {
                                    vid = 'tour' +12;
                                }
                                else if (i==2) {
                                    vid = 'tour' +13;
                                }
                                else if (i==3) {
                                    vid = 'tour' +21;
                                }
                                else if (i==4) {
                                    vid = 'tour' +22;
                                }
                                else if (i==5) {
                                    vid = 'tour' +23;
                                }

                                else if (i==6) {
                                    vid = 'tour' +31;
                                }
                                else if (i==7) {
                                    vid = 'tour' +32;
                                }
                                else if (i==8) {
                                    vid = 'tour' +33;
                            }
                            this.$root.bus.$emit('livetour', item ,this.streamprofile, vid);
                        }
                    }
                    //console.log("00000000",token_q);
                }
            })
            
            this.timersetInterval=setInterval(function(){
                for(var l=0; l< token_q.length; l++){
                    if(l<9){
                        var item = token_q[l];
                        if (l==0) {
                                vid = 'tour' +11;
                            }else if (l==1) {
                                vid = 'tour' +12;
                            }
                            else if (l==2) {
                                vid = 'tour' +13;
                            }
                            else if (l==3) {
                                vid = 'tour' +21;
                            }
                            else if (l==4) {
                                vid = 'tour' +22;
                            }
                            else if (l==5) {
                                vid = 'tour' +23;
                            }

                            else if (l==6) {
                                vid = 'tour' +31;
                            }
                            else if (l==7) {
                                vid = 'tour' +32;
                            }
                            else if (l==8) {
                                vid = 'tour' +33;
                        }
                        //console.log("i",vid);
                        this.$root.bus.$emit('livetour', item ,this.streamprofile, vid);

                    }else{
                        break;
                    }
                    token_q.push(token_q[l]);
                    //console.log("-----------------",token_q[l]);
                }
                if(this.token_index>9){
                    token_q.splice(0,9);
                }else{
                    token_q.splice(0,this.token_index);
                }
                
                //console.log("==================",token_q);

            }.bind(this),timing)
            this.$once('hook:beforeDestroy', () => {            
                clearInterval(timersetInterval);                                    
            })
            
        }, 
        //全部暂停
        Allpause(){
            this.$root.bus.$emit('liveplaystop');
            clearInterval(this.timersetInterval);
            //console.log("b");
        },
        //快换时间
        Speed(){
            console.log( this.region);
            //this.v1.speed(this.region);
        },
        //水印
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
            var url = root + "/api/v1//GetSrcCamera?session="+ this.$store.state.token;
            //console.log(url);
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
                            var newItem ={
                                    token : item['strToken'],
                                    label : item['strName'],
                                    iconclass : 'mdi mdi-camcorder fa-fw'};
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
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'mdi mdi-camcorder fa-fw'};

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
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'mdi mdi-camcorder fa-fw'};

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

                //级联
        cloudDevice() {
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
		   var url = root + "/api/v1/GetCloudDevice?session="+ this.$store.state.token;

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
						  this.cloudSrc(srclevel,srcData);
					  }
				  }
			  })
		},
        cloudSrc(srclevel, srcData) {

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

            var url = root + "/api/v1/GetCloudDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                iconclass : 'mdi mdi-camcorder fa-fw',};

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
        changeWS(event) {
            //this.proto = "WS";
            console.log(this.proto);
            var proto=this.proto;
            this.$store.commit(types.TRTCSW, proto);
            this.$root.bus.$emit('liveplayproto',proto);
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
    beforeDestroy() {
        clearInterval(this.timersetInterval);        
        this.timersetInterval = null;
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

#videoPanel>div:nth-last-child(3) {
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
