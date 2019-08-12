<template>

<div>
    <div id="page-wrapper">

		<div class="container-fluid">
			<div class="row bg-title">
				<div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
					<h4 class="page-title">Playback</h4>
				</div>
				<div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
					<button class="right-side-toggle waves-effect waves-light btn-info btn-circle pull-right m-l-20"><i class="ti-settings text-white"></i></button>

				</div>
			</div>
		</div>
		<!-- 层级 -->
		<div class="content-mythe">
			<div class="content-mythe-one">

				<!-- 这是原下拉框代码 -->
			  <div class="sidebar-nav">
				  <div class="box box-solid">
					  <div class="box-header">
						  <h5 class="box-title"><b>{{$t("message.live.device")}}</b></h5>
						  <div class="box-tools">
						  </div>
					  </div>
					  <div class="box-body no-padding pre-scrollable">
						  <div id="treeview"></div>
					  </div>
				  </div>
			  </div><!--/.well -->
			</div>
			<!-- 九宫格 -->
			<div class="content-mythe-two">
				<div class="" id="videoPanel" style="width: 90%;">
					<div>
            <!-- 九宫格 -->
						<div name='flex' class="videoColor" v-for="r in rows" :key="r">
							<div calss="videoflexitem" style="flex:1; border:1px solid black;" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
							<v-liveplayer v-bind:id="'h'+r+c" :h5id="'h'+r+c" :h5videoid="'hvideo'+r+c">

							</v-liveplayer>
							</div>
						</div>
            <!-- 按钮 -->
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
            <!-- 进度条 -->
            <div id="visualization"></div>
					</div>
				</div>

			</div>

		</div>
		<!-- 使用 -->

    </div>


</div>
</template>


<script>
	import '../../assets/adapter.js'
  import timeline from '../../assets/vis-css.js'
	import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../assets/h5splayer.js'
	import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'

	import qs from 'qs'
	import Vue from 'vue'
	import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.css'
	import 'patternfly-bootstrap-treeview/dist/bootstrap-treeview.min.js'
	import Pblive from '../../components/widgets/pblive';

	function sleep(delay) {
	  var start = (new Date()).getTime();
	  while ((new Date()).getTime() - start < delay) {
		continue;
	  }
	}

export default {
	name: "playback",
	components: {
	    'v-liveplayer': Pblive
	},
	data() {

	  return {
		  rows: 2,
		  cols: 2,
		  selectCol: 1,
		  selectRow: 1,
		  proto: 'WS',
		  contentHeight: '',
		  contentWidth: '',
      progres:[{
				id: 1,
				content: 'item 1',
				start: '2014-04-20',
        end: '2014-04-24'
			},
			{
				id: 2,
				content: 'item 2',
				start: '2014-04-17',
        end: '2014-04-19'
			},
			{
				id: 3,
				content: 'item 4',
				start: '2014-04-25',
				end: '2014-04-26'
			},

		] }
	},
	mounted() {
		this.updateUI();
		this.loadDevice();
    this.progress();
	},
	methods:{
		//视频播放函数
    progress(){
      var container = document.getElementById('visualization');
      console.log(container);
      var items=this.progres;
      console.log(items);
      var options = {};
      console.log(options);
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
					  var topGroup={nodes:[]};
					  topGroup.text=toplevels.strName;
					  for(var i = 0; i < data.src.length; i++){
						  var item=data.src[i];
						  var topitem={
								token : item['strToken'],
								text : item['strName'],
								icon : 'mdi mdi-camcorder fa-fw',
							  };
							  topGroup.nodes.push(topitem);
					  }
					   topData.push(topGroup);
					   let options = {
					   	levels: 1, //展现级别
					   	color:"#666666",
					   	expandIcon:'glyphicon glyphicon-chevron-right',
					   	collapseIcon: 'glyphicon glyphicon-chevron-down',
					   	nodeIcon: 'mdi mdi-view-sequential fa-fw',
					   	showBorder:false,
					   	selectedColor:"#3c3c3c",
					   	backColor:"#FFFFFF",
					   	selectedBackColor: "#ffffff",
					   	onhoverColor:"#FFFFFF",
					   	data: topData,
					   	onNodeSelected: function (event, data) {
					   		console.log(data.token);
					   		$(".asss").show();
					   		if (data.token) {
					   			let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
					   			_this.$root.bus.$emit('pblive', data.token, vid);
					   			return;
					   		}
					   	},
					   };

					   $('#treeview').treeview(options);
				  }
			})
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
					  console.log("data",data.dev,data.dev.length);
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var toplevel=[];
						  toplevel["strToken"]=item.strToken;
						  toplevel["strName"]=item.strName;
						  console.log(toplevel);
						  this.loadOneDevice(toplevel,topData);

					  }
				  }
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

	}
}
</script>
<style scoped>
	.content-mythe{
		width: 100%;
		height: auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: flex-start;
	}
	.content-mythe-one{
		min-width: 17%;
		height: auto;
		background-color: #FFFFFF;
		padding: 10px;
	}
	.content-mythe-two{
		width: 80%;
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
  @import '../../assets/vis-js.min.css';
</style>
