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
                    active-text="H5S回放"
                    inactive-text="NVR回放"
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
					<div class="block">
                        <el-date-picker
                            style="width:100%"
                            v-model="xzvalue"
                            type="date"
                            placeholder="选择日期时间"
                            align="right">
                        </el-date-picker>
                    </div>
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
					<div class="videohb h5container" id="videohb" @mouseenter="enter()" @mouseleave="leave()">
						<div id="mseeen" class="h5controls"  style="display:bone; padding:0">
							<button type="button" class="vidbuttion pull-right iconfont icon-roundclosefill" @click="CloseVideo($event)"></button>
							<button type="button" class="vidbuttion pull-right iconfont icon-full" @click="panelFullScreen($event)"></button>
						</div>
						<video class="videoo1" id="gaovideohb" autoplay webkit-playsinline playsinline></video>
                    </div>
					
					<!-- 进度条 -->
					<canvas id="timeline" width="1500" height="92"
						class="time"
                        @mouseup="timetz"
						ondragstart="return false;">
					</canvas>
					<!-- 日期 -->
					<!-- style="width:100%;margin:10px 20px;display: flex;justify-content: center;" -->
					<div style="width:100%;margin:10px 20px;display: flex;justify-content: space-between;">
						<div>
							<el-tooltip placement="top">
								<div slot="content" class="tooltip_zi" style="cursor:pointer;">
									<div :class='Adswitch=false?"co_Baise":"co_black"' style="margin-bottom: 20px;" @click="Adswitch=true">H5S回放</div>
									<div :class='Adswitch=false?"co_Baise":"co_black"' @click="Adswitch=false">NVR回放</div>
								</div>
								<i style="line-height: 46px;font-size: 20px;color:#B2B1B1;margin-left:10px;" class="iconfont icon-filter"></i>
							</el-tooltip>
							
						</div>
						<div style="display: flex;align-items:center;">
							<el-date-picker
								class="fixed_input"
								v-model="value"
								size="mini"
								disabled
								type="datetime"
								placeholder="选择日期时间"
								default-time="00:00:00">
							</el-date-picker>
							<!-- <div class="fixed_input">{{value}}</div> -->
							<!-- <input :value="value" class="fixed_input"/> -->
							<!-- <div style="cursor:pointer;">
								<span @click="region-2">-</span>
								<span  @change="Speed()">{{region}}</span>
								<span @click="region+2">+</span>
							</div> -->
							<el-select v-model="region" size="mini" style="width:70px" @change="Speed()">
								<el-option label="0.5" value="0.5"></el-option>
								<el-option label="1.0" value="1.0"></el-option>
								<el-option label="2.0" value="2.0"></el-option>
								<el-option label="4.0" value="4.0"></el-option>
								<el-option label="8.0" value="8.0"></el-option>
								<el-option label="16.0" value="16.0"></el-option>
							</el-select>
							<i style="font-size: 24px;color:#B2B1B1;margin-left: 10px;" :class="icon" @click="resume()" class="strart"></i>
						</div>
						
						<div style="display: flex;align-items:center;width:18%">
							<!-- 倍速 -->
							<i style="font-size: 24px;color:#B2B1B1;margin-right:10px;" class="el-icon-full-screen" @click="panelFullScreen($event)"></i>
							
							<button class="mr-1" type="button"></button>{{this.$t("message.archive.ManualRecord")}}
							<button class="mr-2" type="button"></button>{{this.$t("message.archive.AlarmRecord")}}
							
						</div>
					</div>

					<!-- 切换九宫格 -->
					<!-- <div class="btn-group blocks" style="margin-top: 20px;">
						
					</div> -->
					
				</div>	

			</div>

		</div>
		
		
		<!-- 使用 -->
    </div>


</div>
</template>
<style>
.el-tooltip__popper.is-dark{
	width: 78px;
	height: 68px;
	background: rgba(255,255,255,0.5);
	/* padding: 10px 20px; */
	text-align: center;	
}
</style>
<script>
	import '../../assets/adapter.js'
	import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../assets/h5splayer.js'
	import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'

	import './js/timeline-canvas1.js'

export default {
	name: "gaogao",
	data() {
	  	return {
			demoEvents: [],
			//过滤文字
			region:1.0,//倍速
			icon:"iconfont icon-zantingtingzhi",//暂停图片
            Adswitch:false,//开关
            filterText:"",
			proto: 'WS',
			data:this.listdatag.listdatag,
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
			v1:undefined,
			Gtoken:"",//全局点击节点后token
		}
	},
	mounted() {
		this.updateUI();
        // this.loadDevice();
        // this.loadtest();
        // this.NumberDevice();
		// this.cloudDevice();
		this.funtimeine();
		//this.timetz();
		this.$root.bus.$emit('liveplayproto', "RTC");
	},
	methods:{
		
		//删除并填充东西
		hidt(Gtoken){
			//return false
			var timevalues=this.xzvalue;
            var years = timevalues.getFullYear();
			var months = timevalues.getMonth() + 1;
			console.log(years,months)
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
			var url1 = root + "/api/v1/SearchDeviceRecordCalendar?token="+Gtoken+"&year="+years+"&month="+months+"&session="+ this.$store.state.token;
			 console.log(url1);
			// console.log(Gtoken);
            //return false;
			this.$http.get(url1).then(result=>{
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
								date: years+"/"+months+"/"+day,
								title: i+'day',
							  };
						  //console.log(timeitem1);
						  this.demoEvents.push(timeitem1);
					  }
				  }
			})
		},
				//有用啦
		PlaybackCB(event, userdata)
        {
            console.log("Playback callback ", event,userdata);
            
            var msgevent = JSON.parse(event);
            if (msgevent.type === 'H5S_EVENT_PB_TIME')
            {
				 this.value=msgevent.pbTime.strTime;
				 var time = new Date(msgevent.pbTime.strTime).getTime();
				 $("#timeline").TimeSlider('set_time_to_middle', time);
                // var starf=new Date(this.rowstarf).getTime()/1000;
                // var endd=new Date(msgevent.pbTime.strTime).getTime()/1000;
                // var staefend=endd-starf;
                // this.timelink=staefend;
            }
            
        },
		//树形节点点击
		//开始播放时间  0：00 每天结束时间可能回到第二天清晨
		handleNodeClick(data, checked, indeterminate){
            //关闭视频并改变图标
			if (this.v1 != undefined)
            {
                this.v1.disconnect();
                delete this.v1;
				this.v1 = undefined;
				console.log("上this.v1",this.v1);
            }
            this.icon="iconfont icon-bofang";
            //console.log(data.token);
            //放入视频
			if(data.token==undefined){
				return false;
			}
			// var Gtoken=data.token
			this.Gtoken=data.token;
			// this.hidt(Gtoken);
			
			//时间
			var timevalue=this.xzvalue;
			console.log("timevalue11111",timevalue);
            var year = timevalue.getFullYear();
            var month = timevalue.getMonth() + 1;
			var strDate = timevalue.getDate();
			var strDate1 = timevalue.getDate()-1;
			var localOffset = Math.abs(timevalue.getTimezoneOffset() /60);
			var timevalues=year+"-"+month+"-"+strDate+"T"+"00:00:00"+"+0"+localOffset+":00";
			var timevalues1=year+"-"+month+"-"+strDate1+"T"+"00:00:00"+"+0"+localOffset+":00";
			var timevaluee=year+"-"+month+"-"+strDate+"T"+"23:59:59"+"+0"+localOffset+":00";
			
			console.log("======",strDate,strDate1);
			console.log("timevaluee222222",timevalues,timevaluee,"------",localOffset);

			// return false;
		    var root = process.env.API_ROOT;
		    var wsroot = process.env.WS_HOST_ROOT;
		    if (root == undefined){
		        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		    }
		    if (wsroot == undefined)
		    {
		        wsroot = window.location.host;
			}
			var url = root + "api/v1/SearchDeviceRecordByTime?token="+data.token+"&start="+encodeURIComponent(timevalues1)+"&end="+encodeURIComponent(timevaluee)+"&session="+ this.$store.state.token;
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
              })
              
              //不葫芦不花票
            var pbconf1 = {
				begintime: timevalues,
				endtime: timevaluee,
				autoplay: 'true',
                showposter:"true", //'true' or 'false' show poster
				callback: this.PlaybackCB,
				autoplay: 'true', // 'true' or 'false' for playback autoplay
	            serverpb: false, 
				userdata:  this // user data
			};
			console.log(pbconf1);
			//return false;
        	let conf = {
        		videoid: "gaovideohb",
				protocol: window.location.protocol, //http: or https:
				host: wsroot, //localhost:8080
				rootpath:'/', // '/'
				token:data.token,
				pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
				hlsver:'v1', //v1 is for ts, v2 is for fmp4
				session: this.$store.state.token
        	};
			this.v1 = new H5sPlayerRTC(conf);
			console.log("v111111111111",this.v1)
			//return false;
            this.v1.connect();
        },
        //拉播
		timetz(){
			var timevalue=this.xzvalue;
			var _this=this;
			_this.timedata=[];
			var root = process.env.API_ROOT;
			var wsroot = process.env.WS_HOST_ROOT;
			if (root == undefined){
				root = window.location.protocol + '//' + window.location.host + window.location.pathname;
			}
			if (wsroot == undefined)
			{
				wsroot = window.location.host;
			}
			if(_this.v1==undefined){
				return false;
			}else{
				setTimeout(function(){
					var a = $("#timeline").TimeSlider('returnMouseupTime',null,null,function(time){
						if (_this.v1 != undefined)
						{
							_this.v1.disconnect();
							delete _this.v1;
							_this.v1 = undefined;
							console.log("上this.v1",_this.v1);
						}
						_this.icon="iconfont icon-bofang";
						// 放入视频
						if(_this.Gtoken==undefined){
							return false;
						}
						console.log("timevalue11111",_this.Gtoken);
						// return false;
						var timevalue=new Date(time);
						console.log("timevalue11111",timevalue);
						var year = timevalue.getFullYear();
						var month = timevalue.getMonth() + 1;
						var strDate = timevalue.getDate();
						var getHours = timevalue.getHours();
						var getMinutes = timevalue.getMinutes();
						var getSeconds = timevalue.getSeconds();
						var localOffset = Math.abs(timevalue.getTimezoneOffset() /60);
						var timevalues=year+"-"+month+"-"+strDate+"T"+""+getHours+":"+getMinutes+":"+getSeconds+""+"+0"+localOffset+":00";
						
						var timevaluee=year+"-"+month+"-"+strDate+"T"+"23:59:59"+"+0"+localOffset+":00";
						
						console.log("======",strDate);
						console.log("timevaluee222222",timevalues,timevaluee,"------",localOffset,"**",timevalue);

						var url = root + "api/v1/SearchDeviceRecordByTime?token="+_this.Gtoken+"&start="+encodeURIComponent(timevalues)+"&end="+encodeURIComponent(timevaluee)+"&session="+ _this.$store.state.token;
						console.log(url);
						//  return false;
						_this.$http.get(url).then(result=>{
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
									_this.timedata.push(timeitem);
									
								}
							}
						})
						//不葫芦不花票
						var pbconf1 = {
							begintime: timevalues,
							endtime: timevaluee,
							autoplay: 'true',
							showposter:"true", //'true' or 'false' show poster
							callback: _this.PlaybackCB,
							autoplay: 'true', // 'true' or 'false' for playback autoplay
							serverpb: false, 
							userdata:  _this // user data
						};
						console.log(pbconf1);
						//return false;
						let conf = {
							videoid: "gaovideohb",
							protocol: window.location.protocol, //http: or https:
							host: wsroot, //localhost:8080
							rootpath:'/', // '/'
							token:_this.Gtoken,
							pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
							hlsver:'v1', //v1 is for ts, v2 is for fmp4
							session: _this.$store.state.token
						};
						_this.v1 = new H5sPlayerRTC(conf);
						console.log("v111111111111",_this.v1)
						//return false;
						_this.v1.connect();

						console.log("mouseupTime = "+_this.xzvalue+new Date(time),_this.Gtoken);
						// this.v1
					})
				},100);
			}


			return false;
		},
		//开始
        resume(){
            var strart=this.icon;
            if(strart=="iconfont icon-bofang"){
				this.icon="iconfont icon-zantingtingzhi";
				console.log(this.icon);
                this.v1.pause();
            }
            if(strart=="iconfont icon-zantingtingzhi"){
				this.icon="iconfont icon-bofang";
				console.log(this.icon);
                this.v1.resume();
            }
		},
		//倍速
        Speed(){
            console.log( this.vv);
            this.v1.speed(this.region);
        },

		//timeline
		funtimeine(){
			//console.log(this.timecell);
			$("#timeline").TimeSlider({
				init_cells:this.timedata
			});
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
		//关闭
		CloseVideo(event)
        {
            if (this.v1 != undefined)
            {
                this.v1.disconnect();
                delete this.v1;
				this.v1 = undefined;
				this.$Notice.info({
                    title: "Stop successfully"
                });
            }
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


		panelFullScreen(event) {
		    var elem = document.getElementById('videohb');
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
		updateUIEnterFullScreen(){

            $('div[name="flex"]').height(screen.height / this.rows);
        },
        updateUIExitFullScreen(){
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
            {
                $('div[name="flex"]').height(this.contentHeight / this.rows);
            }
        },
		stopVideo(event){
		    return;
		},
		enter(){
			document.getElementById("mseeen").style.display="block";
		},
		leave(){
			document.getElementById("mseeen").style.display="none";
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
	.co_Baise{
		color: #fff;
	}
	.co_black{
		color: #000;
	}
	/* .tooltip_zi{
		background: rgba(255,255,255,0.5);
    	color: #FFF;
	} */
	.fixed_input{
		width: 180px!important;
	}
	.fixed_input >>> .el-input__inner{
		border: 0px;
		background: none!important;
		color: #B2B1B1;
	}
	.el-input{
		margin-bottom: 10px;
	}
	.el-input >>> .el-input__inner{
		background-color: #FAFAFA;
		border-radius: 50px;
		border: 0;
	}
	.el-select >>> .el-input__inner{
		background: #444343;
		border: 0px;
		border-radius: 25px;
		color: #B2B1B1;
	}
    /* 视频画布 */
    .videohb{
        width: 100%!;
        height: 700px;
        background: #474747;
        position: relative;
    }
    .videoo1{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    /* 进度条 */
    .time{
        cursor: pointer;border:1px solid #2b2f33;background-color: #3E3D3D;display: block;width: 100%;font-size: 20px;
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
	/* 屏内按钮 */
	.h5controls{
		background:url("../views/gallery/videoxlk@2x.png") no-repeat;
		background-size: 300px;
    	background-position-x:right;
		padding:0px;
		box-sizing:content-box;
		z-index:10000;
		width: 100%;
		text-align: right;
		display: none;
		position: absolute;
		top: 0px;
		color: #fff;
	}
	.h5controls button{
		background: none;
		border: 0px;
	}
	.h5controls button:nth-child(1){
		margin-right: 20px;
	}
	.vidbuttion {
		height: 24px;
		width: 24px;
		margin-left: 5px;
		color: #FFFFFF;
	}
	.vidbuttion i{
		color: #FFFFFF;
	}
	.vidbuttion i:hover{
		color: #FFFFFF;
	}
	/* zit1 */
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
        height: 850px;
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
		width: 17%;
		height: auto;
		background-color: #FFFFFF;
		padding: 10px;
	}
	.content-mythe-two{
		width: 82.5%;
		background-color: #3E3D3D;
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
