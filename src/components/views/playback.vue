<template>
    <div>
        <div id="page-wrapper">
            <!-- 头部 -->
            <div class="container-fluid">
                <div class="row bg-title" style="margin-bottom: 0px;">
                    <h4 class="page-title">{{$t("message.left.playback")}}</h4>
                </div>
            </div>
            <!-- 内容 -->
            <div class="content-mythe">
                <div class="content-mythe-one">
                    <!-- 时间表 -->
                    <div class="block">
                        <el-date-picker
                            v-model="value"
                            type="datetimerange"
                            :picker-options="pickerOptions"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['0:00:00', '24:00:00']">
                        </el-date-picker>
                    </div>
                    <!-- 模糊查询搜查 -->
                    <el-input
                        placeholder="输入关键字进行过滤"
                        v-model="filterText">
                    </el-input>
                    <!-- 这是原下拉框代码 -->
                    <el-tree
                        :data="data"
                        show-checkbox
                        node-key="id"
						:check-strictly="true"
                        :filter-node-method="filterNode"
                        ref="tree"
                        highlight-current
                        :props="defaultProps">
                        <span slot-scope="{ node, data }">
                            <i :class="data.iconclass" style="color:rgb(142, 132, 132);"></i>
                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                            <!-- <span style="padding-left: 4px;">{{data.label}}</span> -->
                        </span>
                    </el-tree>
                   
                </div>
                <!-- 表格 -->
                <div class="content-mythe-two">
                     <!-- 查询按钮 -->
                    <div style="margin: 10px 20px;display: flex;justify-content: space-between;">
                        <el-button @click="getCheckedNodes"  icon="el-icon-search">{{$t("message.archive.search")}}</el-button>
                        <el-button size="mini" @click="tableDatak">{{$t("message.archive.Clear")}}</el-button>
                    </div>
                    <!-- 有按钮 -->
                    <el-table
                        :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        style="width: 100%;">
                        <el-table-column
                            prop="token"
                            :label="label.label2" >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.token }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="Token">
                             <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="starf"
                            :label="label.label3">
                             <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span>{{ scope.row.starf }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="end"
                            :label="label.label4">
                             <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span>{{ scope.row.end }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="end"
                            label="Type">
                             <template slot-scope="scope">
                                <span>{{ scope.row.type }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            width=310px>
                            <template slot-scope="scope">
                                <div class="button_edi">
                                    <a :href="scope.row.url" :download="scope.row.urlto"><button type="button" class="iconfont icon-download"></button></a>
                                    <button type="button" class="iconfont icon-play" @click="Refresh1(scope.$index, scope.row)" data-toggle="modal" data-target="#myModal"></button>
                                </div>
                                <!-- <el-button
                                size="mini"
                                type="success"><a :href="scope.row.url" :download="scope.row.urlto">{{$t("message.archive.Download")}}</a></el-button>
                                <el-button size="mini" style="font-size: 25px;" icon="el-icon-caret-right" circle @click="Refresh1(scope.$index, scope.row)" data-toggle="modal" data-target="#myModal"></el-button> -->
                            </template>
                         </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-pagination
                        style="text-align: center;"
                        layout="prev, pager, next"
                        @size-change="handleSizeChange" 
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- bootstrap模态框1 -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="Close()">
                            &times;
                        </button>
                        <h4 class="modal-title" id="myModalLabel">
                            {{$t("message.archive.Playback")}}
                        </h4>
                        <!-- 开始结束时间 -->
                        <div class="kai">
                            <span>{{$t("message.archive.StartTime")}}:{{rowstarf}}</span>
                            <span>{{$t("message.archive.EndTime")}}:{{rowend}}</span>
                        </div>
                    </div>
                    <div class="modal-body text-center">
                        <video class="videoo" id="pbplayarch"></video>
                        <div class="block">
						    <el-slider v-model="timelink" :max="max" @change="timelinn(timelink)" :show-tooltip="false"></el-slider>
					    </div>
                        <!-- <el-button style="font-size: 25px;" :icon="icon" size="mini" circle  @click="resume()" class="strart"></el-button> -->
                        <i style="font-size: 30px; margin: 0 20px;" :class="icon" @click="resume()" class="strart"></i>
                        <!-- 倍速 -->
                        <el-select v-model="region" size="mini" style="width:70px" @change="Speed()">
                            <el-option label="0.5" value="0.5"></el-option>
                            <el-option label="1.0" value="1.0"></el-option>
                            <el-option label="2.0" value="2.0"></el-option>
                            <el-option label="4.0" value="4.0"></el-option>
                            <el-option label="8.0" value="8.0"></el-option>
                            <el-option label="16.0" value="16.0"></el-option>
                        </el-select>
                        <!-- 实时时间 -->
                        <span>{{displayc}}</span>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
    </div>
</template>
<script>
import '../../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC} from '../../assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'
export default {
    
    name:"playback",
    data() {
        return {
            label:{
                label2:this.$t("message.archive.Name"),
                label3:this.$t("message.archive.StartTime"),
                label4:this.$t("message.archive.EndTime"),
            },
            timelink:0,//滑块
            max:0,//滑块最大值
            value: [new Date(new Date().getTime()- 3600 * 1000 * 1), new Date()],
            //分页
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10,//一页数量
            search: '',
            filterText: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label',
                token:"token",
                iconclass:"iconclass"
            },
            tableData1: [],
             pickerOptions: {
                shortcuts: [{
                    text: this.$t("message.archive.Onehour"),
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 1);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: this.$t("message.archive.Oneday"),
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: this.$t("message.archive.Oneweek"),
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: this.$t("message.archive.Onemonth"),
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            v1: undefined,//视频内容
            region:1.0,//倍速
            icon:"mdi mdi-pause-circle fa-fw",//暂停图片
            displayc:"",//实时时间
            rowstarf:"",//跟进进度条开始时间
            rowend:"",//进度条结束时间
        }
    },
    mounted(){
        this.loadDevice();
        this.NumberDevice();
        this.loadtest();
        this.cloudDevice();
    },
    methods:{
        PlaybackCB(event, userdata)
        {
            console.log("Playback callback ", event,userdata);
            
            var msgevent = JSON.parse(event);
            if (msgevent.type === 'H5S_EVENT_PB_TIME')
            {
                this.displayc=msgevent.pbTime.strTime;
                var starf=new Date(this.rowstarf).getTime()/1000;
                var endd=new Date(msgevent.pbTime.strTime).getTime()/1000;
                var staefend=endd-starf;
                this.timelink=staefend;
            }
            
        },
        //播放
        Refresh1(index, row){
            console.log(index, row);
            this.rowstarf=row.starf;
            this.rowend=row.end;
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
				begintime: row.starf,
				endtime: row.end,
				showposter: 'true', //'true' or 'false' show poster
				callback: this.PlaybackCB,
				serverpb: 'true',
				userdata:  this // user data
            };
            console.log(row.name);
        	let conf = {
        		videoid: "pbplayarch",
				protocol: window.location.protocol, //http: or https:
				host: wsroot, //localhost:8080
				rootpath:'/', // '/'
				token:row.name,
				pbconf: pbconf1, //This is optional, if no pbconf, this will be live.
				hlsver:'v1', //v1 is for ts, v2 is for fmp4
				session:this.$store.state.token
            };
            var end=new Date(row.end).getTime();
            var starf=new Date(row.starf).getTime();
            var starfend=(end-starf)/1000;//时间差
            console.log(starfend);
            this.max=starfend;
            this.v1 = new H5sPlayerRTC(conf);
            this.v1.connect();
            setTimeout(function(){
				this.v1.start();
			}.bind(this),500);
        },
        //开始
        resume(){
            var strart=this.icon;
            console.log(strart);
            if(strart=="mdi mdi-pause-circle fa-fw"){
                this.icon="mdi mdi-play-circle fa-fw";
                this.v1.pause();
            }
            if(strart=="mdi mdi-play-circle fa-fw"){
                this.icon="mdi mdi-pause-circle fa-fw";
                this.v1.resume();
            }
        },
        //
       timelinn(timelink){
           console.log(timelink);
           this.v1.seek(timelink);
       },

        //倍速
        Speed(){
            console.log( this.region);
            this.v1.speed(this.region);
        },
        //关闭
        
        Close(){
            
            if (this.v1 != undefined)
            {
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
        },
        // 表格归档 下载 刷新

        //按钮搜索
        getCheckedNodes() {
            var nodes=this.$refs.tree.getCheckedNodes();
            if(nodes.length==1){
				var idname=nodes[0].token;
				var idname1=nodes[0].label;
            }else{
                this.$message(this.$t("message.archive.Pleaseselectone"));
                return false;
            }
            var timevalue=this.value;
            var timevalues=timevalue[0].toISOString();
            var timevaluee=timevalue[1].toISOString();
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
            console.log(idname);
			var url = root + "/api/v1/Search?type=record&token="+idname+"&start="+timevalues+"&end="+timevaluee+"&session="+ this.$store.state.token;
			console.log(url);
			
            this.$http.get(url).then(result=>{
				  if(result.status == 200){
                    this.$Notice.info({
                        title: "Query successful"
                    })
					var data=result.data;
					for(var i=0;i<data.record.length;i++){
                        var item=data.record[i];
                        var urlto=item["strPath"].split("/");
                        // console.log("下载名称",this.Myurl,urlto);
						// console.log("开始时间",item["strStartTime"]);
						// console.log("结束时间",item["strEndTime"]);
						var timeitem={
                                name: idname,
                                token: idname1,
								starf : item["strStartTime"],
                                end : item["strEndTime"],
                                type: item['nType'],
                                percentage:0,
                                url:item["strPath"],
                                urlto:urlto[urlto.length-1],
                                strFileName:"",
                              };
                              if(item['nType']=="H5_REC_MANUAL"){
                                    timeitem["type"] = this.$t("message.archive.ManualRecord");
                              }
                              if(item['nType']=="H5_REC_ALARM "){
                                    timeitem["type"] = this.$t("message.archive.AlarmRecord");
                              }
                              if(item['nType']=="H5_REC_SCHEDULE "){
                                    timeitem["type"] = this.$t("message.archive.Schedulerecord");
                              }else{
                                   timeitem["type"] = this.$t("message.archive.ManualRecord");
                              }
							  //console.log(timeitem);
                              //填充
                              this.tableData1.push(timeitem);
                    }
                    
                    this.total=this.tableData1.length;
                    console.log("length",this.total)
				  }
			  }).catch(error => {
                console.log('Snapshot failed!', error);
                this.$Notice.info({
                    title: "Query failed !"
                })
            });
        },
        //清空表格
        tableDatak(){
            this.tableData1=[];
            this.total=0;
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
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
                            var newItem ={
                                    token : item['strToken'],
                                    label : item['strName'],
                                    iconclass1:"",
                                    iconclass : 'mdi mdi-camcorder fa-fw',};

                            if(!item['bOnline'])
                                newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                            if(item['nType'] == 'H5_CLOUD')
                                newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                            if(item['bDisable'] == true){
                                // newItem['disabled_me'] =true;
                                newItem['iconclass1'] = 'camera';
                            }
                        

                        srcGroup.children.push(newItem);
                        }
                    }
                    this.data.push(srcGroup);
				  } 
            })

        },
        // 机舱
        loadOneDevice(toplevels)
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
                                id : i,
                                token:item['strToken'],
                                label : item['strName'],
                                iconclass1:"",
                                iconclass:"mdi mdi-camcorder fa-fw"
							  };
                              topGroup.children.push(topitem);
                              if(!item['bOnline'])
                                topitem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                              if(item['nType'] == 'H5_CLOUD')
                                topitem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                            if(item['bDisable'] == true){
                                // newItem['disabled_me'] =true;
                                topitem['iconclass1'] = 'camera';
                            }
                      }
                       this.data.push(topGroup);
                       
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
                      
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var toplevel=[];
						  toplevel["strToken"]=item.strToken;
						  toplevel["strName"]=item.strName;
                          this.loadOneDevice(toplevel);
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


        //模糊查询
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
    },
     //模糊查询
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    
}
</script>
<style scoped>
    
    a{
        color: #797979;
        text-align: center;
    }
    .videoo{
        width: 100%
    }
    .kai{
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    .content-mythe{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
        /* align-items:flex-start; */
	}
	.content-mythe-one{
		min-width: 20%;
		height: 800px;
		background-color: #FFFFFF;
		padding: 10px;
        position: relative;
        overflow-y:auto
	}
	.content-mythe-two{
		width: 76%;
		background-color: #FFFFFF;
	}
    /* 按钮 */
    .butt-plains{
        position: absolute;
        bottom: 30px;
        right: 10px;
    }
</style>