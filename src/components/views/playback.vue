<template>

<div>
    <div id="page-wrapper">

		<div class="container-fluid">
			<div class="row bg-title">
				<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					<h4 class="page-title">{{$t("message.left.playback")}}</h4>
				</div>
			</div>
		</div>
		<!-- 层级 -->
		<div class="content-mythe">
			<div class="content-mythe-one">
				<!-- 这是原下拉框代码 -->
				<div class="zdg">
                    <!-- 模糊查询搜查 -->
                    <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                    </el-input>
					<!-- show-checkbox 复选按钮-->
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
			<!-- 九宫格 -->
			<div class="content-mythe-two">
				<div class="" id="videoPanel" style="width:100%;">
					<div name='flex' class="videoColor" v-for="r in rows" :key="r">
						<div calss="videoflexitem" style="flex:1; border:1px solid black;" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
						<v-pbplayer v-bind:id="'h'+r+c" :h5id="'h'+r+c" :h5videoid="'hvideo'+r+c" :value="value" v-on:titleChanged="updateTitle($event)"></v-pbplayer>
						</div>
					</div>
					
					<!-- 进度条 -->
					<div class="block">
						<el-slider v-model="timelink" :max="86400000"></el-slider>
					</div>
					<!-- 日期 -->
					<div style="width:100%;margin:10px 20px;display: flex;justify-content: center;">
						<div class="block">
							<el-date-picker
								v-model="value"
								type="datetime"
								placeholder="选择日期时间"
								default-time="00:00:00">
							</el-date-picker>
						</div>
					</div>

					<!-- 切换九宫格 -->
					<div class="btn-group blocks">
						<button type="button" class="btn btn-default layout1x1 waves-effect" data-row="1|1" @click="changePanel($event)">
							</button>
						<button type="button" class="btn btn-default layout2x2 waves-effect" data-row="2|2" @click="changePanel($event)">
							</button>
						<button type="button" class="hidden-xs btn btn-default layout3x3 waves-effect" data-row="3|3" @click="changePanel($event)">
							</button>
						<button type="button" class="hidden-xs btn btn-default layout4x4 waves-effect" data-row="4|4" @click="changePanel($event)">
							</button>
						<button type="button" class="btn btn-default layoutfull waves-effect" @click="panelFullScreen($event)"> </button>
					</div>
					
				</div>	

			</div>

		</div>
		<!-- 使用 -->
		<div>{{value}}</div>
    </div>


</div>
</template>
<style>
/* 进度条 */
.vis-item {
    border:0px;
    background-color: rgb(9, 243, 99);
	height: 30px;
  }
  .vis-item.vis-selected {
    background: #0474f5;
  }
  .time{
		border-right: 2px solid #fb551f;
		position: absolute;
		top: 0;
		left: calc(50% - 1px);
		height: 100%;
		z-index: 2;
	}
</style>


<script>
	import '../../assets/adapter.js'
	import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../assets/h5splayer.js'
	import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'

	import qs from 'qs'
	import Vue from 'vue'
	import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.css'
	import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js'
	import pbplayer from '../../components/widgets/pbplayer'

	function sleep(delay) {
	  var start = (new Date()).getTime();
	  while ((new Date()).getTime() - start < delay) {
		continue;
	  }
	}
export default {
	name: "playback",
	components: {
      'v-pbplayer': pbplayer,
	},
	data() {
	  	return {
			timelink:0,//进度条
			//过滤文字
            filterText:"",
			rows: 1,
			cols: 1,
			selectCol: 1,
			selectRow: 1,
			proto: 'WS',
			contentHeight: '',
			contentWidth: '',
			data:[],
			defaultProps: {
				children: 'children',
				label: 'label',
				token:"token",
				iconclass:"iconclass"
			},
            value:new Date(),//日期
			timeGroup:[],
		}
	},
	mounted() {
		this.updateUI();
		this.loadDevice();
		this.NumberDevice();
	},
	methods:{
		//选中
		
		//树形节点点击
		handleNodeClick(data, checked, indeterminate){
			console.log(data.token);
			if(data.token==undefined){
				return false;
			}
			//时间
			var val=this.value;
			 var rqstarf=new Date(val);
            console.log(rqstarf);
            //年月日
            var y = rqstarf.getFullYear();
            var m = rqstarf.getMonth()+1;
			var d = rqstarf.getDate();
			 var rq=y+'-'+m+'-'+d;
			console.log(rq);
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
			var url = root + "api/v1/SearchDeviceRecordByTime?token=device1--33&start="+rq+"T000101%2b08&end="+rq+"T235959%2b08&session="+ this.$store.state.token;
			console.log(url);
			this.$http.get(url).then(result=>{
				  if(result.status == 200){
					var data=result.data;
					var timedata=[];
					console.log("length",data.record.length);
					for(var i=0;i<data.record.length;i++){
						var item=data.record[i];
						//时间转换
						var starf=new Date(item['strStartTime']).getTime();
						var end=new Date(item['strEndTime']).getTime();
						var starf=new Date(starf);
						var end=new Date(end);
						var timeitem={
								id:i+1,
								start :starf,
								end :end,
							  };
						this.timeGroup.push(timeitem);
					}
				  }
			  })
			
            if (data.token) {
                let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
                _this.$root.bus.$emit('pbplayer', data.token, vid);
            }
        },
		//视频播放函数
		updateTitle(e){
			this.value = e;//视频时间
			
    	},
		

		//un ui
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

		    $(".right-side-toggle").on("click", function () {
		        $(".right-sidebar").slideDown(50).toggleClass("shw-rside");
		        $(".fxhdr").on("click", function () {
		            body.toggleClass("fix-header"); /* Fix Header JS */
		        });
		        $(".fxsdr").on("click", function () {
		            body.toggleClass("fix-sidebar"); /* Fix Sidebar JS */
		        });

		        /* ===== Service Panel JS ===== */

		        var fxhdr = $('.fxhdr');
		        if (body.hasClass("fix-header")) {
		            fxhdr.attr('checked', true);
		        } else {
		            fxhdr.attr('checked', false);
		        }
		    });
		},


		//load src

		loadOneDevice(toplevels, topData)
		{
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
			var url = root + "/api/v1/GetDeviceSrc?token="+ toplevels.strToken + "&session=" + this.$store.state.token;

			this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var data=result.data;
					  var topGroup={children:[]};
					  topGroup.label=toplevels.strName;
					  topGroup.iconclass="mdi mdi-view-sequential fa-fw";
					  for(var i = 0; i < data.src.length; i++){
						  var item=data.src[i];
						  var topitem={
								token : item['strToken'],
								label : item['strName'],
								iconclass : 'mdi mdi-camcorder fa-fw',
							  };
							  if(!item['bOnline'])
                                topitem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                              if(item['nType'] == 'H5_CLOUD')
								topitem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                       		topGroup.children.push(topitem);
                    }
                    this.data.push(topGroup);
				  }
			}).catch(error => {
                console.log('GetSrc failed', error);
            });
		},

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
					  var topData=[];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var toplevel=[];
						  toplevel["strToken"]=item.strToken;
						  toplevel["strName"]=item.strName;
						  this.loadOneDevice(toplevel,topData);

					  }
				  }
			  })
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
		    this.proto = "WS";
		    this.$root.bus.$emit('liveplayproto', "WS");
		},
		changeRTC(event) {
		    this.$root.bus.$emit('liveplayproto', "RTC");
		    this.proto = "RTC";
		},
        //模糊查询
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

	},//模糊查询
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
}
</script>
<style scoped>
	

	.zdg{
		background-color: #ffffff;
		height: -webkit-fill-available;
	}
	.content-mythe{
		width: 100%;
		height: auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-start;
	}
	.content-mythe-one{
		min-width: 20%;
		height: auto;
		background-color: #FFFFFF;
		padding: 10px;
	}
	.content-mythe-two{
		width: 76%;
		background-color: #FFFFFF;
		display: flex;
	}
	.content-mythe-two .content-mythe-twos{
		max-width: 33%;
		height: auto;
		background-color: #f5f5f5;
		border: #FFFFFF solid 1px;
		box-sizing: border-box;
		color: #FFFFFF;
		margin-bottom: 20px;
	}
	/* 视频 */
	.h5video{
	   object-fit: fill;
	   width: 100%;
	   height: auto;
	}

	.h5videowrapper{
		padding: 0px;
		height: 100%;
		width: 100%;
	}
	/* 九宫格布局 */
	div[name='flex'] {
	    display: flex;
	    border-bottom: 0px !important;

	}

	div[name='flex']+[name='flex'] {
	    border-left: 0px !important;
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
	}
	.layoutfull:hover {
	    background: url('../../assets/img/layout/fullscreen.png') #7a7878;
	    background-size: 32px 32px;
	    color: rgb(187, 184, 184);
	    height: 32px;
	    width: 32px;
	}


	/* i标签 */
	.custom-tree-node{
		font-size: 16px;
	}
	i{
		color: 	#008B8B;
	}
</style>
