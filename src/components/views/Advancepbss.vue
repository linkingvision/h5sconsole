<template>

<div>
    <div id="page-wrapper">
		<div class="container-fluid">
			<div class="row bg-title">
				<div class="col-lg-9 col-md-4 col-sm-4 col-xs-12">
					<h4 class="page-title">{{$t("message.left.AdvancePB")}}</h4>
				</div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <!-- <el-switch
                    style="text-align: right;"
                    v-model="Adswitch"
                    active-text="H5S回放"
                    inactive-text="NVR回放"
                    disabled>
                    </el-switch> -->
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
                        <!-- <el-date-picker
                            style="width:100%"
                            v-model="xzvalue"
                            type="date"
                            placeholder="选择日期时间"
                            align="right">
                        </el-date-picker> -->
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
                        <span slot-scope="{ data }">
                            <i :class="data.iconclass" style="color:rgb(142, 132, 132);"></i>
                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                        </span>
                    </el-tree>
                </div>
			</div>
			<!-- 九宫格 -->
			<div class="content-mythe-two">
				<div style="width:100%;" id="Fullscreen">
					<div  id="videoPanel">
						<div name='flex' style="position: relative;" class="videoColor" v-for="r in rows" :key="r">
							<div class="palace" name="flex"
								v-bind:id="'h'+r+c"
								@mouseover="hideover(r,c)"
								@mouseout="showout(r,c)"
								v-for="c in cols"
								@contextmenu.prevent="stopVideo($event)" 
								@click="videoClick(r,c,$event)" :key="c">
								<div class="h5videowrapper h5container">
									<video class="videoo1" :id="'gaovideohb'+r+c" autoplay webkit-playsinline playsinline></video>
									<div class="h5controls" style="display:none padding:0px;">
										<button type="button" class="vidbuttion pull-right iconfont icon-roundclosefill" @click="CloseVideo($event)"></button>
										<button type="button" class="vidbuttion pull-right iconfont icon-full" @click="panelFullScreen($event)"></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-for="r in rows" :key="r">
						<div v-for="c in cols" :key="c">
							<div class="tab" :id="'tab'+r+c" >
								<canvas :id="'timeline'+r+c" width="1500" height="92"
									class="time"
									@mousedown ="timelinndown($event)"
									@mouseup="timetz"
									ondragstart="return false;">
								</canvas>
								<div style="width:100%;padding:10px 20px;display: flex;justify-content: space-between;">
									<div>
										<div>
											<div class="back_Choice"  @mouseenter="enter1()" @mouseleave="leave1()">
												<div id="back_Choice" class="back_Choice1">
													<div :class="{co_Baise:Adswitch=='true'}" @click="Adswitchs" class="co_black" >{{$t("message.playback.H5SPlayback")}}</div>
													<div :class="{co_Baise:Adswitch=='false'}" @click="Adswitchs1" class="co_black">{{$t("message.playback.NVRPlayback")}}</div>
												</div>
												<span class="back_zi iconfont icon-filter"></span>
											</div>
											
										</div>
									</div>
									<div style="display: flex;align-items:center;">
										<div>
											<el-date-picker
												class="fixed_input"
												v-model="xzvalue"
												size="mini"
												@change="input_ch"
												type="date"
												placeholder="选择日期时间"
												default-time="00:00:00">
											</el-date-picker>
										</div>
										<Select v-if="r=='1'&&c=='1'" v-model="region" placeholder="1.0" size="small" style="width:70px" @on-change="Speed()">
											<Option value="0.5"></Option>
											<Option value="1.0"></Option>
											<Option value="2.0"></Option>
											<Option value="4.0"></Option>
											<Option value="8.0"></Option>
											<Option value="16.0"></Option>
										</Select>
										<Select v-if="r=='1'&&c=='2'" v-model="region1" placeholder="1.0" size="small" style="width:70px" @on-change="Speed()">
											<Option value="0.5"></Option>
											<Option value="1.0"></Option>
											<Option value="2.0"></Option>
											<Option value="4.0"></Option>
											<Option value="8.0"></Option>
											<Option value="16.0"></Option>
										</Select>
										<Select v-if="r=='2'&&c=='1'" v-model="region2" placeholder="1.0" size="small" style="width:70px" @on-change="Speed()">
											<Option value="0.5"></Option>
											<Option value="1.0"></Option>
											<Option value="2.0"></Option>
											<Option value="4.0"></Option>
											<Option value="8.0"></Option>
											<Option value="16.0"></Option>
										</Select>
										<Select v-if="r=='2'&&c=='2'" v-model="region3" placeholder="1.0" size="small" style="width:70px" @on-change="Speed()">
											<Option value="0.5"></Option>
											<Option value="1.0"></Option>
											<Option value="2.0"></Option>
											<Option value="4.0"></Option>
											<Option value="8.0"></Option>
											<Option value="16.0"></Option>
										</Select>
										<button v-if="r=='1'&&c=='1'" type="button" :class="icon" @click="resume()" class="button_resume"></button>
										<button v-if="r=='1'&&c=='2'" type="button" :class="icon1" @click="resume()" class="button_resume"></button>
										<button v-if="r=='2'&&c=='1'" type="button" :class="icon2" @click="resume()" class="button_resume"></button>
										<button v-if="r=='2'&&c=='2'" type="button" :class="icon3" @click="resume()" class="button_resume"></button>
									</div>
									<div style="display: flex;align-items:center;width:18%">
										<button type="button" class="iconfont icon-yigongge layout" data-row="1|1" @click="changePanel($event)"></button>
										<button type="button" class="iconfont icon-sigongge layout" data-row="2|2" @click="changePanel($event)"></button>
										<i style="font-size: 24px;color:#B2B1B1;margin-right:10px;" class="el-icon-full-screen" @click="panelFullScreen($event)"></i>
										
										<button class="mr-1" type="button"></button>{{$t("message.archive.ManualRecord")}}
										<button class="mr-2" type="button"></button>{{$t("message.archive.AlarmRecord")}}
										
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>	
			</div>
		</div>
    </div>


</div>
</template>

<style>
	.el-tooltip__popper.is-dark{
		width: 78px;
		height: 68px;
		background: rgba(255,255,255,0.5);
		text-align: center;	
	}
	
</style>

<script>
import Vue from 'vue'
import '../../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'
import * as types from '../../store/types'
import './js/timeline-canvas1.js'
export default {
	name: "gaogao",
	data() {
		return {
			demoEvents: [],
			//过滤文字
			rows: 2,
			cols: 2,
			selectCol: 1,
			selectRow: 1,
			selectCol1: 1,
			selectRow1: 1,
			contentHeight: '',
            contentWidth: '',
			region:1.0,//倍速
			region1:1.0,//倍速
			region2:1.0,//倍速
			region3:1.0,//倍速
			icon:"iconfont icon-bofang",//暂停图片
			icon1:"iconfont icon-bofang",//暂停图片
			icon2:"iconfont icon-bofang",//暂停图片
			icon3:"iconfont icon-bofang",//暂停图片
			Adswitch:this.$store.state.Adswitch,//开关
			filterText:"",
			proto: 'WS',
			data:this.regionaldata.regionaldata,
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
			v2:undefined,
			v3:undefined,
			v4:undefined,
			Gtoken:"",//全局点击节点后token
			SGtoken:["","","",""],//四宫点击节点后token
			id:""
		}
	},
	mounted() {
		console.log(this.Adswitch);
		this.updateUI();
		// this.goolsh();
		this.functlist();
		this.funtimeine();
		this.$root.bus.$emit('liveplayproto', "RTC")
	},
	methods:{
		Adswitchs(){
			var open="true";
			this.Adswitch=open;
			console.log(open,"111")
			this.$store.commit(types.ADSWITCH,open);
			this.$store.state.Adswitch=open;
		},
		Adswitchs1(){
			var open="false";
			this.Adswitch=open;
			console.log(open,"222")
			this.$store.commit(types.ADSWITCH,open);
			this.$store.state.Adswitch=open;
		},
		//显示第一个数轴
		functlist(){
			$('.tab').each(function (e) {
			if (e == 0)
				$(this).show();//首次加载的时候默认显示第一个
			else
				$(this).hide();
			});
		},
		
		//点击确定键
		input_ch(){
			var data=this.Gtoken;
			// console.log("日历",data,this.Gtoken,this.Adswitch);
			// return false;
			this.Play(data);
		},
		//树形节点点击
		//开始播放时间  0：00 每天结束时间可能回到第二天清晨
		handleNodeClick(data, checked, indeterminate){
			if(data.disabled_me){
				return false
			}
			console.log(data);
			var data=data.token;
			if(data==undefined){
				return false;
			}
			if(this.selectRow=="1"&&this.selectCol=="1"){
				this.SGtoken.splice(0, 1,data);
				this.Gtoken=this.SGtoken[0];
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				this.SGtoken.splice(1, 1,data);
				this.Gtoken=this.SGtoken[1];
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				this.SGtoken.splice(2, 1,data);
				this.Gtoken=this.SGtoken[2];
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				this.SGtoken.splice(3, 1,data);
				this.Gtoken=this.SGtoken[3];
			}
			console.log("play",this.SGtoken,"token",this.Gtoken);
			// return false;
			this.Play(data);
		},
		//拉播
		timelinndown(err){
			console.log('a',err)
			if(this.selectRow=="1"&&this.selectCol=="1"){
				if(this.v1 != undefined){
					this.v1.pause();
				}
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				if(this.v2 != undefined){
					this.v2.pause();
				}
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				if(this.v3 != undefined){
					this.v3.pause();
				}
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				if(this.v4 != undefined){
					this.v4.pause();
				}
			}
        },
		timetz(){
			var _this=this;
			var timevalue=this.xzvalue;
			_this.timedata=[];
			// return false
			var root = process.env.API_ROOT;
			var wsroot = process.env.WS_HOST_ROOT;
			if (root == undefined){
				root = window.location.protocol + '//' + window.location.host + window.location.pathname;
			}
			if (wsroot == undefined)
			{
				wsroot = window.location.host;
			}
			if(_this.Gtoken==undefined||_this.Gtoken==""){
				return false;
			}
			setTimeout(function(){
				var a = $("#timeline"+_this.selectRow+_this.selectCol).TimeSlider('returnMouseupTime',null,null,function(time){
					console.log("time",time,_this.Gtoken)
					// return false;
					// 放入视频
					// return false;
					var timevalue=new Date(time);
					var year = timevalue.getFullYear();
					var month = timevalue.getMonth() + 1;
					var strDate = timevalue.getDate();
					var strDate1 = timevalue.getDate()+1;
					var strDate2 = timevalue.getDate()-1;
					var getHours = timevalue.getHours();
					var getMinutes = timevalue.getMinutes();
					var getSeconds = timevalue.getSeconds();
					var localOffset = Math.abs(timevalue.getTimezoneOffset() /60);
					var timevalues=year+"-"+month+"-"+strDate+"T"+""+getHours+":"+getMinutes+":"+getSeconds+""+"+0"+localOffset+":00";
					
					var timevaluee=year+"-"+month+"-"+strDate+"T"+"23:59:59"+"+0"+localOffset+":00";

					var timevalues1=year+"-"+month+"-"+strDate2+"T"+""+getHours+":"+getMinutes+":"+getSeconds+""+"+0"+localOffset+":00";
					
					var timevaluee1=year+"-"+month+"-"+strDate1+"T"+"23:59:59"+"+0"+localOffset+":00";
					
					// console.log("======",strDate1);
					// console.log("timevaluee222222",timevalues,timevaluee,"------",localOffset,"**",timevalue);
					var url=""
					if(_this.Adswitch=="false"){
						url = url = root + "api/v1/SearchDeviceRecordByTime?token="+_this.Gtoken+"&start="+encodeURIComponent(timevalues1)+"&end="+encodeURIComponent(timevaluee1)+"&session="+ _this.$store.state.token;
					}else{
						url = root + "api/v1/Search?type=record&token="+_this.Gtoken
						+"&start="+encodeURIComponent(timevalues1)+"&end="+encodeURIComponent(timevaluee)+"&session="+ _this.$store.state.token;
					}
					// console.log(url);
					//  return false;
					_this.$http.get(url).then(result=>{
						if(result.status == 200){
							var data=result.data;
							var timedata1=[];
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
								// _this.timedata.push(timeitem);
								timedata1.push(timeitem);
								// console.log(timedata1)
								
								$("#timeline"+_this.selectRow+_this.selectCol).TimeSlider('init',timevalue,timedata1);
								
							}
						}
					})
					if(_this.selectRow=="1"&&_this.selectCol=="1"){
						_this.selectCol1 = _this.selectCol;
						_this.selectRow1 = _this.selectRow;
						if (_this.v1 != undefined)
						{
							_this.v1.disconnect();
							delete _this.v1;
							_this.v1 = undefined;
							console.log("上this.v1",_this.v1);
						}
						var pbconf1 = {
							begintime: timevalues,
							endtime: timevaluee,
							autoplay: 'true',
							showposter:"true", //'true' or 'false' show poster
							callback: _this.PlaybackCB,
							serverpb: _this.Adswitch, 
							userdata:  _this // user data
						};
						let conf = {
							videoid: "gaovideohb"+_this.selectRow+_this.selectCol,
							protocol: window.location.protocol, //http: or https:
							host: wsroot, //localhost:8080
							rootpath:'/', // '/'
							token:_this.Gtoken,
							pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
							hlsver:'v1', //v1 is for ts, v2 is for fmp4
							session: _this.$store.state.token
						};
						_this.$nextTick (()=>{
							_this.v1 = new H5sPlayerRTC(conf);
							//return false;
							_this.v1.connect();
							_this.icon="iconfont icon-zantingtingzhi";
						})
					}else if(_this.selectRow=="1"&&_this.selectCol=="2"){
						_this.selectCol1 = _this.selectCol;
						_this.selectRow1 = _this.selectRow;
						if (_this.v2 != undefined)
						{
							_this.v2.disconnect();
							delete _this.v2;
							_this.v2 = undefined;
						}
						var pbconf1 = {
							begintime: timevalues,
							endtime: timevaluee,
							autoplay: 'true',
							showposter:"true", //'true' or 'false' show poster
							callback: _this.PlaybackCB1,
							serverpb: _this.Adswitch, 
							userdata:  _this // user data
						};
						let conf2 = {
							videoid: "gaovideohb"+_this.selectRow+_this.selectCol,
							protocol: window.location.protocol, //http: or https:
							host: wsroot, //localhost:8080
							rootpath:'/', // '/'
							token:_this.Gtoken,
							pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
							hlsver:'v1', //v1 is for ts, v2 is for fmp4
							session: _this.$store.state.token
						};
						
						_this.$nextTick (()=>{
							_this.v2 = new H5sPlayerRTC(conf);
							//return false;
							_this.v2.connect();
							_this.icon="iconfont icon-zantingtingzhi";
						})
					}else if(_this.selectRow=="2"&&_this.selectCol=="1"){
						_this.selectCol1 = _this.selectCol;
						_this.selectRow1 = _this.selectRow;
						if (_this.v3 != undefined)
						{
							_this.v3.disconnect();
							delete _this.v3;
							_this.v3 = undefined;
							console.log("上this.v1",_this.v1);
						}
						var pbconf1 = {
							begintime: timevalues,
							endtime: timevaluee,
							autoplay: 'true',
							showposter:"true", //'true' or 'false' show poster
							callback: _this.PlaybackCB2,
							serverpb: _this.Adswitch, 
							userdata:  _this // user data
						};
						let conf3 = {
							videoid: "gaovideohb"+_this.selectRow+_this.selectCol,
							protocol: window.location.protocol, //http: or https:
							host: wsroot, //localhost:8080
							rootpath:'/', // '/'
							token:_this.Gtoken,
							pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
							hlsver:'v1', //v1 is for ts, v2 is for fmp4
							session: _this.$store.state.token
						};
						
						_this.$nextTick (()=>{
							_this.v3 = new H5sPlayerRTC(conf);
							//return false;
							_this.v3.connect();
							_this.icon="iconfont icon-zantingtingzhi";
						})
					}else if(_this.selectRow=="2"&&_this.selectCol=="2"){
						_this.selectCol1 = _this.selectCol;
						_this.selectRow1 = _this.selectRow;
						if (_this.v4 != undefined)
						{
							_this.v4.disconnect();
							delete _this.v4;
							_this.v4 = undefined;
							console.log("上this.v1",_this.v1);
						}
						var pbconf1 = {
							begintime: timevalues,
							endtime: timevaluee,
							autoplay: 'true',
							showposter:"true", //'true' or 'false' show poster
							callback: _this.PlaybackCB3,
							serverpb: _this.Adswitch, 
							userdata:  _this // user data
						};
						let conf4 = {
							videoid: "gaovideohb"+_this.selectRow+_this.selectCol,
							protocol: window.location.protocol, //http: or https:
							host: wsroot, //localhost:8080
							rootpath:'/', // '/'
							token:_this.Gtoken,
							pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
							hlsver:'v1', //v1 is for ts, v2 is for fmp4
							session: _this.$store.state.token
						};
						_this.$nextTick (()=>{
							_this.v4 = new H5sPlayerRTC(conf);
							//return false;
							_this.v4.connect();
							_this.icon="iconfont icon-zantingtingzhi";
						})
					}
				})
			},100);
		},
		//开始
		resume(){
			var strart=this.icon;
			var strart1=this.icon1;
			var strart2=this.icon2;
			var strart3=this.icon3;
			console.log(strart);
			if(this.selectRow=="1"&&this.selectCol=="1"){
				if(this.v1 != undefined){
					//iconfont icon-zantingtingzhi  iconfont icon-bofang
					if(strart=="iconfont icon-zantingtingzhi"){
						this.icon="iconfont icon-bofang";
						console.log(this.icon);
						this.v1.pause();
					}
					if(strart=="iconfont icon-bofang"){
						this.icon="iconfont icon-zantingtingzhi";
						console.log(this.icon);
						this.v1.resume();
					}
				}
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				if(this.v2 != undefined){
					//iconfont icon-zantingtingzhi  iconfont icon-bofang
					if(strart1=="iconfont icon-zantingtingzhi"){
						this.icon1="iconfont icon-bofang";
						console.log(this.icon);
						this.v2.pause();
					}
					if(strart1=="iconfont icon-bofang"){
						this.icon1="iconfont icon-zantingtingzhi";
						console.log(this.icon);
						this.v2.resume();
					}
				}
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				if(this.v3 != undefined){
					//iconfont icon-zantingtingzhi  iconfont icon-bofang
					if(strart2=="iconfont icon-zantingtingzhi"){
						this.icon2="iconfont icon-bofang";
						console.log(this.icon);
						this.v3.pause();
					}
					if(strart2=="iconfont icon-bofang"){
						this.icon2="iconfont icon-zantingtingzhi";
						console.log(this.icon);
						this.v3.resume();
					}
				}
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				if(this.v4 != undefined){
					//iconfont icon-zantingtingzhi  iconfont icon-bofang
					if(strart3=="iconfont icon-zantingtingzhi"){
						this.icon3="iconfont icon-bofang";
						console.log(this.icon);
						this.v4.pause();
					}
					if(strart3=="iconfont icon-bofang"){
						this.icon3="iconfont icon-zantingtingzhi";
						console.log(this.icon);
						this.v4.resume();
					}
				}
			}
		},
		//倍速
		Speed(){
			if(this.selectRow=="1"&&this.selectCol=="1"){
				if(this.v1 != undefined){
					this.v1.speed(this.region);
				}
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				if(this.v2 != undefined){
					this.v2.speed(this.region1);
				}
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				if(this.v3 != undefined){
					this.v3.speed(this.region2);
				}
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				if(this.v4 != undefined){
					this.v4.speed(this.region3);
				}
			}
		},
		//关闭
		CloseVideo(event)
		{
			var timevalue=new Date();
			var timedata1=[];
			if(this.selectRow=="1"&&this.selectCol=="1"){
				if (this.v1 != undefined)
				{
					this.v1.disconnect();
					delete this.v1;
					this.v1 = undefined;
					this.$Notice.info({
						title: "Stop successfully"
					});
					this.Gtoken=''
					this.SGtoken[0]=''
					$("#timeline"+this.selectRow+this.selectCol).TimeSlider('init',timevalue,timedata1);
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
					// console.log(this.Gtoken)
				}
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				if (this.v2 != undefined)
				{
					this.v2.disconnect();
					delete this.v2;
					this.v2 = undefined;
					this.$Notice.info({
						title: "Stop successfully"
					});
					this.Gtoken=''
					this.SGtoken[1]=''
					$("#timeline"+this.selectRow+this.selectCol).TimeSlider('init',timevalue,timedata1);
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
					
				}
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				if (this.v3 != undefined)
				{
					this.v3.disconnect();
					delete this.v3;
					this.v3 = undefined;
					this.$Notice.info({
						title: "Stop successfully"
					});
					this.Gtoken=''
					this.SGtoken[2]=''
					$("#timeline"+this.selectRow+this.selectCol).TimeSlider('init',timevalue,timedata1);
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
					
				}
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				if (this.v4 != undefined)
				{
					this.v4.disconnect();
					delete this.v4;
					this.v4 = undefined;
					this.$Notice.info({
						title: "Stop successfully"
					});
					this.Gtoken=''
					this.SGtoken[3]=''
					$("#timeline"+this.selectRow+this.selectCol).TimeSlider('init',timevalue,timedata1);
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
					$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
					
				}
			}
			
		},
		//timeline
		funtimeine(){
			// console.log(this.cols*this.rows);
			for(var i=1;i<=this.rows;i++){
				for(var l=1;l<=this.cols;l++){
					// console.log("#timeline"+i+l);
					$("#timeline"+i+l).TimeSlider({
						init_cells:this.timedata
					});
				}
			}
			
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
				this.contentHeight = $(document.body).height()*0.5;
			}
			$('div[name="flex"]').height(this.contentHeight / this.rows);
			$('.content-mythe-one').height(this.contentHeight / this.rows*2.4);
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
		panelFullScreen(event) {
			var elem = document.getElementById('Fullscreen');
			// document.getElementById("fixed_input").style.display="none";
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
					$(".layout").css("display",  "block");
					console.log("========  updateUIExitFullScreen");
					this.updateUIExitFullScreen();
				} else {
					console.log('panelFullScreen3');
					$(".layout").css("display",  "none");
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

			$('div[name="flex"]').height(screen.height / this.rows-100);
		},
		updateUIExitFullScreen(){
			if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
			{
				$('div[name="flex"]').height(this.contentHeight / this.rows);
			}
		},
		videoClick(r, c, $event) {
			$("video").removeClass('h5videoh');
            $("#gaovideohb"+r+c).addClass('h5videoh');
			$('.tab').hide();//隐藏所有内容
			$("#tab"+r+c).show();//显示当前选中项
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
			if(this.selectRow=="1"&&this.selectCol=="1"){
				console.log(this.SGtoken[0]);
				this.Gtoken=this.SGtoken[0];
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				console.log(this.SGtoken[1]);
				this.Gtoken=this.SGtoken[1];
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				console.log(this.SGtoken[2]);
				this.Gtoken=this.SGtoken[2];
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				console.log(this.SGtoken[3]);
				this.Gtoken=this.SGtoken[3];
			}
		},
		//点击宫格
		changePanel(event) {
			// return false;
			window.setTimeout(function() {
				this.functlist();
			}.bind(this),50)
            let data = $(event.target).data('row');
            let _this = this;
            let cols = data.split('|')[1];
            let rows = data.split('|')[0];
            //this.map.clear();
            Object.assign(this.$data, {
                rows: parseInt(rows),
                cols: parseInt(cols)
            });
			// this.funtimeine();
			// clearInterval(this.PlaybackCB);
			if (this.v2 != undefined)
			{
				this.v2.disconnect();
				delete this.v2;
				this.v2 = undefined;
				this.$Notice.info({
					title: "Stop successfully"
				});
				$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
				$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
				
			}
			if (this.v3 != undefined)
			{
				this.v3.disconnect();
				delete this.v3;
				this.v3 = undefined;
				this.$Notice.info({
					title: "Stop successfully"
				});
				$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
				$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
				
			}
			if (this.v4 != undefined)
			{
				this.v4.disconnect();
				delete this.v1;
				this.v4 = undefined;
				this.$Notice.info({
					title: "Stop successfully"
				});
				$("#gaovideohb"+this.selectRow+this.selectCol).get(0).load();
				$("#gaovideohb"+this.selectRow+this.selectCol).get(0).poster = '';
				
			}
			Vue.nextTick(function () {
				// console.log(_this.contentHeight / rows);
                //$('div[name="flex"]').height(($(".content").height() - 50) / rows);
				$('div[name="flex"]').height(_this.contentHeight / rows);
				
				$("#timeline12").TimeSlider({init_cells:_this.timedata});
				$("#timeline21").TimeSlider({init_cells:_this.timedata});
				$("#timeline22").TimeSlider({init_cells:_this.timedata});
			})
		},
		stopVideo(event){
		    return;
		},
		Play(data){
			var token=data;
			//关闭视频并改变图标
			
			this.icon="iconfont icon-zantingtingzhi";
			this.icon1="iconfont icon-zantingtingzhi";
			this.icon2="iconfont icon-zantingtingzhi";
			this.icon3="iconfont icon-zantingtingzhi";
			//console.log(data.token);
			//放入视频
			if(token==undefined){
				return false;
			}
			// var Gtoken=data.token
			
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
			var url=""
			if(this.Adswitch=="false"){
				
				url = root + "api/v1/SearchDeviceRecordByTime?token="+token
				+"&start="+encodeURIComponent(timevalues1)+"&end="+encodeURIComponent(timevaluee)+"&session="+ this.$store.state.token;
			}else{
				url = root + "api/v1/Search?type=record&token="+token
				+"&start="+encodeURIComponent(timevalues1)+"&end="+encodeURIComponent(timevaluee)+"&session="+ this.$store.state.token;
			}
			
			//return false;
			this.$http.get(url).then(result=>{
				console.log(url,result);
				if(result.status == 200){
					var data=result.data;
					var timedata1=[];
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
						timedata1.push(timeitem);
						// console.log("4545454",timeitem)
						$("#timeline"+this.selectRow+this.selectCol).TimeSlider('init',timevalue,timedata1);
					}
				}
			})
			// return false;
			if(this.selectRow=="1"&&this.selectCol=="1"){
				this.selectCol1 = this.selectCol;
            	this.selectRow1 = this.selectCol;
				if (this.v1 != undefined)
				{
					this.v1.disconnect();
					delete this.v1;
					this.v1 = undefined;
					console.log("上this.v1",this.v1);
				}
				var pbconf1 = {
					begintime: timevalues,
					endtime: timevaluee,
					autoplay: 'true',
					showposter:"true", //'true' or 'false' show poster
					callback: this.PlaybackCB,
					serverpb: this.Adswitch, 
					userdata:  this // user data
				};
				let conf = {
					videoid: "gaovideohb"+this.selectRow+this.selectCol,
					protocol: window.location.protocol, //http: or https:
					host: wsroot, //localhost:8080
					rootpath:'/', // '/'
					token:token,
					pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
					hlsver:'v1', //v1 is for ts, v2 is for fmp4
					session: this.$store.state.token
				};
				this.v1 = new H5sPlayerRTC(conf);
				console.log("v111111111111",this.v1)
				//return false;
				this.v1.connect();
			}else if(this.selectRow=="1"&&this.selectCol=="2"){
				this.selectCol1 = this.selectCol;
            	this.selectRow1 = this.selectCol;
				if (this.v2 != undefined)
				{
					this.v2.disconnect();
					delete this.v2;
					this.v2 = undefined;
				}
				var pbconf1 = {
					begintime: timevalues,
					endtime: timevaluee,
					autoplay: 'true',
					showposter:"true", //'true' or 'false' show poster
					callback: this.PlaybackCB1,
					serverpb: this.Adswitch, 
					userdata:  this // user data
				};
				let conf2 = {
					videoid: "gaovideohb"+this.selectRow+this.selectCol,
					protocol: window.location.protocol, //http: or https:
					host: wsroot, //localhost:8080
					rootpath:'/', // '/'
					token:token,
					pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
					hlsver:'v1', //v1 is for ts, v2 is for fmp4
					session: this.$store.state.token
				};
				this.v2 = new H5sPlayerRTC(conf2);
				console.log("v22222222222222222",this.v2)
				//return false;
				this.v2.connect();
			}else if(this.selectRow=="2"&&this.selectCol=="1"){
				this.selectCol1 = this.selectCol;
            	this.selectRow1 = this.selectCol;
				if (this.v3 != undefined)
				{
					this.v3.disconnect();
					delete this.v3;
					this.v3 = undefined;
					console.log("上this.v1",this.v1);
				}
				var pbconf1 = {
					begintime: timevalues,
					endtime: timevaluee,
					autoplay: 'true',
					showposter:"true", //'true' or 'false' show poster
					callback: this.PlaybackCB2,
					serverpb: this.Adswitch, 
					userdata:  this // user data
				};
				let conf3 = {
					videoid: "gaovideohb"+this.selectRow+this.selectCol,
					protocol: window.location.protocol, //http: or https:
					host: wsroot, //localhost:8080
					rootpath:'/', // '/'
					token:token,
					pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
					hlsver:'v1', //v1 is for ts, v2 is for fmp4
					session: this.$store.state.token
				};
				this.v3 = new H5sPlayerRTC(conf3);
				//return false;
				this.v3.connect();
			}else if(this.selectRow=="2"&&this.selectCol=="2"){
				this.selectCol1 = this.selectCol;
            	this.selectRow1 = this.selectCol;
				if (this.v4 != undefined)
				{
					this.v4.disconnect();
					delete this.v4;
					this.v4 = undefined;
					console.log("上this.v1",this.v1);
				}
				var pbconf1 = {
					begintime: timevalues,
					endtime: timevaluee,
					autoplay: 'true',
					showposter:"true", //'true' or 'false' show poster
					callback: this.PlaybackCB3,
					serverpb: this.Adswitch, 
					userdata:  this // user data
				};
				let conf4 = {
					videoid: "gaovideohb"+this.selectRow+this.selectCol,
					protocol: window.location.protocol, //http: or https:
					host: wsroot, //localhost:8080
					rootpath:'/', // '/'
					token:token,
					pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
					hlsver:'v1', //v1 is for ts, v2 is for fmp4
					session: this.$store.state.token
				};
				this.v4 = new H5sPlayerRTC(conf4);
				//return false;
				this.v4.connect();
			}
			
			
		},
		//有用啦
		PlaybackCB(event, userdata)
		{
			var msgevent = JSON.parse(event);
			if (msgevent.type === 'H5S_EVENT_PB_TIME')
			{
				//  this.value=msgevent.pbTime.strTime;
				var time = new Date(msgevent.pbTime.strTime).getTime();
				// $("#timeline12").TimeSlider('set_time_to_middle', time);
				$("#timeline11").TimeSlider('set_time_to_middle', time);
			}
			
		},
		PlaybackCB1(event, userdata)
		{
			var msgevent = JSON.parse(event);
			if (msgevent.type === 'H5S_EVENT_PB_TIME')
			{
				//  this.value=msgevent.pbTime.strTime;
				var time = new Date(msgevent.pbTime.strTime).getTime();
				// $("#timeline12").TimeSlider('set_time_to_middle', time);
				$("#timeline12").TimeSlider('set_time_to_middle', time);
			}
			
		},
		PlaybackCB2(event, userdata)
		{
			console.log("Playback callback ",11111111111111111);
			var msgevent = JSON.parse(event);
			if (msgevent.type === 'H5S_EVENT_PB_TIME')
			{
				//  this.value=msgevent.pbTime.strTime;
				var time = new Date(msgevent.pbTime.strTime).getTime();
				// $("#timeline12").TimeSlider('set_time_to_middle', time);
				$("#timeline21").TimeSlider('set_time_to_middle', time);
			}
			
		},
		PlaybackCB3(event, userdata)
		{
			console.log("Playback callback ",11111111111111111);
			var msgevent = JSON.parse(event);
			if (msgevent.type === 'H5S_EVENT_PB_TIME')
			{
				//  this.value=msgevent.pbTime.strTime;
				var time = new Date(msgevent.pbTime.strTime).getTime();
				// $("#timeline12").TimeSlider('set_time_to_middle', time);
				$("#timeline22").TimeSlider('set_time_to_middle', time);
			}
			
		},
		enter(){
			document.getElementsByClassName("h5controls").style.display="block";
		},
		leave(){
			document.getElementsByClassName("h5controls").style.display="none";
		},
		enter1(){
			$(".back_Choice1").css("display","block");
			// document.getElementById("back_Choice").style.display="block";
		},
		leave1(){
			$(".back_Choice1").css("display","none");
			// document.getElementById("back_Choice").style.display="none";
		},
		//隐藏按钮
		hideover(r,c){
			$("#h"+r +""+c+" .h5videowrapper").children(".h5controls").css("display",  "block");
		},
		showout(r,c){
			$("#h"+r +""+c+" .h5videowrapper").children(".h5controls").css("display",  "none");
		},
		//回访，模式
		hback(){
			this.Adswitch=true;
		},
		nvrback(){
			this.Adswitch=false;
		},
		//模糊查询
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		}
		

	},//模糊查询
	beforeDestroy() {
        //console.log(this.h5id, "beforeDestroy");
		if (this.v1 != undefined)
		{
			this.v1.disconnect();
			delete this.v1;
			this.v1 = undefined;
		}
		if (this.v2 != undefined)
		{
			this.v2.disconnect();
			delete this.v2;
			this.v2 = undefined;
		}
		if (this.v3 != undefined)
		{
			this.v3.disconnect();
			delete this.v3;
			this.v3 = undefined;
		}
		if (this.v4 != undefined)
		{
			this.v4.disconnect();
			delete this.v4;
			this.v4 = undefined;
		}
    },
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	}
}
</script>

<style scoped>
/* 边框 */
.h5videoh{
    border: 1px solid #f44336 !important;
    box-sizing: border-box;
    -moz-box-sizing:border-box;
    -webkit-box-sizing:border-box;
}
/* 视频上按钮 */
.h5videowrapper{
    padding: 0px;
    height: 100%;
    width: 100%;
}
.h5container {
    position:relative;
    display:inline-block;
}
.vidbuttion {
    height: 24px;
    width: 24px;
    padding:0px;
    margin: 0px;
    margin-left: 5px;
    opacity: 0.9;
    padding: 0 2px;
    color:#FFFFFF;
    font-size: 18px;
    background: none;
    border: 0;

}
.h5container > .h5controls {
    position:absolute;
    top:0;
    background:url("./gallery/videoxlk@2x.png") no-repeat;
    background-size: 320px;
    background-position-x:right;
    padding:0px;
    box-sizing:content-box;
    z-index:10000;
    width: 100%;
    height: 32px;
    display:none;
}



/* 四宫格 */
.palace{
    flex: 1 1 25%;
    border:1px solid black;
}
#videoPanel{
    background-color: #ffffff;
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
div[name='flex'] {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 0px !important;
}
div[name='flex']+[name='flex'] {
    border-left: 0px !important;
}
div[name="flex"]:hover {
    /*background-color: #3c8dbc;*/
    cursor: pointer;
}
.videoColor {
    /* width: 1500px; */
    background-color: #333333 !important;
}

.layout{
	border: 0;
	background: none;
	font-size: 20px;color:#B2B1B1;margin-right:10px;
}

	.button_resume{
		background: none;
		border: 0px;
		font-size: 24px;
		color:#B2B1B1;
		margin-left: 10px;
	}
	/* 切换播放模式 */
	.co_Baise{
		color: #fff !important;
	}
	.co_black{
		color: #000;
	}
	.back_zi{
		line-height: 46px;font-size: 20px;color:#B2B1B1;margin-left:10px;
	}
	.back_Choice{
		width: 120px;
		position: relative;
		cursor:pointer;
	}
	.back_Choice1{
		border-radius:10px; 
		display: none;
		width: auto;
		position: absolute;
		top: -60px;
		left: -20px;
		background:rgba(255,255,255,0.5);
		padding: 10px 20px;
	}
	.back_Choice1 div:nth-child(1){
		margin-bottom: 10px;
	}
	/* .tooltip_zi{
		background: rgba(255,255,255,0.5);
    	color: #FFF;
	} */
	/* 数据input框 */
	.fixed_input{
		width: 130px!important;
		cursor:pointer;
	}
	
	.fixed_input >>> .el-input__inner{
		border: 0px;
		background: none!important;
		color: #B2B1B1;
	}
	.el-input >>> .el-input__inner{
		background-color: #FAFAFA;
		border-radius: 50px;
		border: 0;
	}
	.ivu-select >>> .ivu-select-selection{
		background: #444343;
		border: 0px;
		border-radius: 25px;
		color: #B2B1B1;
	}
	/* .el-select >>> .el-input__inner{
		background: #444343;
		border: 0px;
		border-radius: 25px;
		color: #B2B1B1;
	} */
    /* 视频画布 */
    .videohb{
        width: 100%!;
        height: 81%;
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
		/* height: 850px; */
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: flex-start;
	}
	.content-mythe-one{
		width: 17%;
		height: 990px;
		background-color: #FFFFFF;
		padding: 10px;
	}
	.content-mythe-two{
		width: 82.5%;
		height: 100%;
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

	/* i标签 */
	.custom-tree-node{
		font-size: 16px;
	}
	i{
		color: 	#008B8B;
	}
</style>
