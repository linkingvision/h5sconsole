<template>

<div>
    <div id="page-wrapper">

		<div class="container-fluid">
			<div class="row bg-title">
				<div class="col-lg-9 col-md-4 col-sm-4 col-xs-12">
					<h4 class="page-title">{{$t("message.left.playback")}}</h4>
				</div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <el-switch
                    style="text-align: right;"
                    v-model="Adswitch"
                    active-text="本地回放"
                    inactive-text="设备回放"
                    disabled>
                    </el-switch>
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
					<!-- 日历 -->
					<vue-event-calendar :events="demoEvents" @day-changed="handleDayChanged"></vue-event-calendar>
					<!-- <div class="block">
                        <el-date-picker
                            style="width:100%"
                            v-model="xzvalue"
                            type="date"
                            placeholder="选择日期时间"
                            align="right">
                        </el-date-picker>
                    </div> -->
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
                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                        </span>
                    </el-tree>
                </div>
			</div>
			<!-- 九宫格 -->
			<div class="content-mythe-two">
				<div class="" id="videoPanel" style="width:100%;">
					<div name='flex' class="videoColor" v-for="r in rows" :key="r">
						<div calss="videoflexitem" style="flex:1; border:1px solid black;" name="flex" v-for="c in cols" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)" :key="c">
							<v-pbplayer 
								v-bind:id="'h'+r+c" :h5id="'h'+r+c" 
								:h5videoid="'hvideo'+r+c" 
								:xzvalue="xzvalue" 
								:Adswitch="Adswitch" 
								v-on:titleChanged="updateTitle" 
								v-on:videh5handler="videh5handler1"
								v-on:vv="timetz"
								v-on:h5videoid1="h5videoid1">
							</v-pbplayer>
						</div>
					</div>
					
					<!-- 进度条 -->
					<canvas id="timeline" width="1500" height="92"
						class="time"
						ondragstart="return false;">
					</canvas>
					<!-- 日期 -->
					<div style="width:100%;margin:10px 20px;display: flex;justify-content: center;">
						
						<div class="block">
							<el-date-picker
								v-model="value"
								size="mini"
								type="datetime"
								placeholder="选择日期时间"
								default-time="00:00:00">
							</el-date-picker>
							
						</div>
					</div>
					<div style="margin-top:-49px;">
							<i style="font-size: 30px;color:#535452;margin-left:20px;" :class="icon" @click="resume()" class="strart"></i>
					</div>
                    <div style="margin-top:-35px; text-align: right;">
						<!-- 倍速 -->
						<el-select v-model="region" size="mini" style="width:70px" @change="Speed()">
							<el-option label="0.5" value="0.5"></el-option>
							<el-option label="1.0" value="1.0"></el-option>
							<el-option label="2.0" value="2.0"></el-option>
							<el-option label="4.0" value="4.0"></el-option>
							<el-option label="8.0" value="8.0"></el-option>
							<el-option label="16.0" value="16.0"></el-option>
						</el-select>
                        <button class="mr-1" type="button"></button>本地录像
                        <button class="mr-2" type="button"></button>警高录像
						
                    </div>

					<!-- 切换九宫格 -->
					<div class="btn-group blocks" style="margin-top: 20px;">
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
    </div>


</div>
</template>
<style>
/* 进度条 */
.time{
	cursor: pointer;border:1px solid #2b2f33;background-color: #2b2f33;display: block;width: 100%;font-size: 20px;
}
.__vev_calendar-wrapper .cal-wrapper {
    width: 100%;
    padding: 10px 10px;
}
.available div span:after {
    content: "";
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #2d8cf0;
	
    /* position: absolute;
    top: 1px;
    right: 1px; */
}
</style>


<script>
	import '../../assets/adapter.js'
	import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../assets/h5splayer.js'
	import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'

	import qs from 'qs'
	import Vue from 'vue'
	import './js/timeline-canvas1.js'
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
	name: "Advancepb",
	components: {
      'v-pbplayer': pbplayer,
	},
	data() {
	  	return {
			demoEvents: [],
			//过滤文字
			region:1.0,//倍速
			icon:"mdi mdi-play-circle fa-fw",//暂停图片
            Adswitch:true,//开关
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
			//进度条
			value:new Date(),
			xzvalue: new Date(),//双向日历
			timedata:[],//数据数组
			timecell:[],//滚动条数组
			vv:undefined,
			v1:undefined,
			Gtoken:"",//全局token
		}
	},
	mounted() {
		this.updateUI();
        this.loadDevice();
        this.loadtest();
        this.NumberDevice();
		this.funtimeine();
		this.updateTitle();
		this.videh5handler1();
		this.timetz();
		this.h5videoid1();
		this.$root.bus.$emit('liveplayproto', "RTC");
	},
	methods:{
		//删除并填充东西
		hidt(Gtoken){
			//return false
			var timevalue=this.xzvalue;
            var year = timevalue.getFullYear();
			var month = timevalue.getMonth() + 1;
			console.log(year,month)
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
			var url = root + "/api/v1/SearchDeviceRecordCalendar?token="+Gtoken+"&year="+year+"&month="+month+"&session="+ this.$store.state.token;
			// console.log(url);
			// console.log(Gtoken);
            //return false;
			this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var data=result.data;
					  for(var i=1;i<data.record.length;i++){
						  var item=data.record[i].bHasRec;
						  //console.log(item);
						  var day = "";
						  if(item===true){
							  day=data.record[i].nDay
						}
						//console.log(day)
						  var timeitem1={
								date: year+"/"+month+"/"+day,
								title: i+'day',
							  };
						  //console.log(timeitem1);
						  this.demoEvents.push(timeitem1);
					  }
				  }
			})
		},
		//han
		handleDayChanged (day) {
			this.xzvalue=new Date(day.date);
			//this.value=new Date(day.date);
			this.$store.state.xzvalue=new Date(day.date);
		   	console.log(this.$store.state.xzvalue)
		},
		//拉播
		timetz(vv){
			var _this=this;
			_this.vv=vv;
			//console.log("010101",this.vv);
			if(this.vv==undefined){
				return false;
			}
			$("#timeline").mouseup(function() {
			   //console.log("010101",_this.value);
				var a = $("#timeline").TimeSlider('returnMouseupTime', null, null, function(time) {
					//console.log("010102",_this.vv);
					var timesjc=Math.floor(new Date(time).getTime()/1000);
					_this.vv.seek(timesjc);
					console.log("mouseupTime = " + timesjc);
				});
			})
		},
		
		
		//开始
        resume(){
            var strart=this.icon;
            console.log(this.vv);
            if(strart=="mdi mdi-pause-circle fa-fw"){
                this.icon="mdi mdi-play-circle fa-fw";
                this.vv.pause();
            }
            if(strart=="mdi mdi-play-circle fa-fw"){
                this.icon="mdi mdi-pause-circle fa-fw";
                this.vv.resume();
            }
		},
		//倍速
        Speed(){
            console.log( this.vv);
            this.vv.speed(this.region);
        },
		//暂时无用
		PlaybackCB(event, userdata)
        {
            console.log("Playback callback ", event,userdata);
            
            var msgevent = JSON.parse(event);
            if (msgevent.type === 'H5S_EVENT_PB_TIME')
            {
            }
            
		},
		
       h5videoid1(h5videoid1){
		   //console.log(h5videoid1);
		   return false
		    var timevalue=this.xzvalue;
            var year = timevalue.getFullYear();
            var month = timevalue.getMonth() + 1;
            var strDate = timevalue.getDate();
            var timevalues=new Date(year+"-"+month+"-"+strDate+" 00:00:00").toISOString();
			var timevaluee=new Date(year+"-"+month+"-"+strDate+" 24:00:00").toISOString();
			//时间
		    var root = process.env.API_ROOT;
        	var wsroot = process.env.WS_HOST_ROOT;
        	if (root == undefined){
        		root = window.location.protocol + '//' + window.location.host + window.location.pathname;
        	}
        	if (wsroot == undefined)
        	{
        		wsroot = window.location.host;
            }
            var pbconf1 = {
				begintime: timevalues,
	            endtime: timevaluee,
				showposter: 'true', //'true' or 'false' show poster
				callback: this.PlaybackCB,
				userdata:  this // user data
			};
        	let conf = {
        		videoid: h5videoid1,
				protocol: window.location.protocol, //http: or https:
				host: wsroot, //localhost:8080
				rootpath:'/', // '/'
				token:row.name,
				pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
				hlsver:'v1', //v1 is for ts, v2 is for fmp4
				session:this.$store.state.token
            };
			this.v1 = new H5sPlayerRTC(conf);
			console.log(this.v1)
       },
		
		//树形节点点击
		handleNodeClick(data, checked, indeterminate){
			
			//console.log(data.token);
			if(data.token==undefined){
				return false;
			}
			var Gtoken=data.token
			this.hidt(Gtoken);
			//时间
            var timevalue=this.xzvalue;
            var year = timevalue.getFullYear();
            var month = timevalue.getMonth() + 1;
            var strDate = timevalue.getDate();
            var timevalues=new Date(year+"-"+month+"-"+strDate+" 00:00:00").toISOString();
            var timevaluee=new Date(year+"-"+month+"-"+strDate+" 24:00:00").toISOString();
            //console.log(timevalues);
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
			var url = root + "api/v1/SearchDeviceRecordByTime?token="+data.token+"&start="+timevalues+"&end="+timevaluee+"&session="+ this.$store.state.token;
            console.log(url);
            //return false;
			this.$http.get(url).then(result=>{
				  if(result.status == 200){
					var data=result.data;
					//var timedata=[];
					//console.log("length",data.record.length);
					for(var i=0;i<data.record.length;i++){
						var item=data.record[i];
						//时间转换
						var starf=new Date(item['strStartTime']).getTime();
						var end=new Date(item['strEndTime']).getTime();
						var starf=new Date(starf);
						var end=new Date(end);
						var timeitem={
								beginTime :starf,
								endTime :end,
								style:{background:"rgba(60,196,60, 0.498039)"}
							  };
						//console.log("录像段时间段颜色",timeitem["style"].background); //录像段时间段颜色
						if(item["nType"]==="H5_REC_MANUAL"){
							timeitem["style"].background="rgba(60,196,60, 0.498039)"
							//console.log("录像段时间段颜色1",timeitem["style"].background);
						}else{
							timeitem["style"].background="rgba(238,17,17, 0.498039)"
							//console.log("录像段时间段颜色2",timeitem["style"].background);
						}
						this.timedata.push(timeitem);
						
					}
				  }
			  })//0.0
            if (data.token) {
                let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
                _this.$root.bus.$emit('pbplayer', data.token, vid);
			}
			
		},

		//timeline
		funtimeine(){
			this.timecell =this.timedata;
			//console.log(this.timecell);
			$("#timeline").TimeSlider({
				init_cells: this.timecell
			});
		},
		//视频播放函数
		updateTitle(playval){
			if(playval==undefined){
				//console.log(playval);
				return false;
			}else{
				//console.log(playval);
				this.value = playval
				var time = new Date(this.value).getTime();
				$("#timeline").TimeSlider('set_time_to_middle', time);
			}
			
		},
		videh5handler1(h5handler){
			console.log("v2",h5handler);
		},

		//un ui
		updateUI()
		{
			$(".events-wrapper").remove();//自己写的删除另一半日历
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

							if(item['bDisable'] == true){
                                // newItem['disabled_me'] =true;
                                topitem['iconclass1'] = 'camera';
                            }

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
                    }
                    this.data.push(srcGroup);
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
	.mr-1{
        width: 15px;
        height: 15px;
        border-radius: 5px;
        border: 0;
		margin: 0 5px;
        vertical-align:middle;
        background-color: rgba(60,196,60);
    }
    .mr-2{
        width: 15px;
        height:15px;
        border-radius: 5px;
        border: 0;
		margin: 0 5px;
        vertical-align:middle;
        background-color: rgba(238,17,17);
    }

	.zdg{
		background-color: #ffffff;
        height: 800px;
        overflow-y:auto;
	}
	.content-mythe{
		width: 100%;
		height: auto;
		display: flex;
		flex-wrap: nowrap;
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
