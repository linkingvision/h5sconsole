<template>
    <div>
        <div id="page-wrapper">
            <!-- 头部 -->
            <div class="container-fluid">
                <div class="row bg-title" style="margin-bottom: 0px;">
                    <h4 class="page-title">{{$t("message.left.archive")}}</h4>
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
                    <!-- accordion -->
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
                            :label="label.Name"
                            min-width="50" >
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.token }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            :label="label.Token">
                             <template slot-scope="scope">
                                <span>{{ scope.row.name }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="starf"
                            :label="label.StartTime">
                             <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span>{{ scope.row.starf }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="end"
                            :label="label.EndTime">
                             <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span>{{ scope.row.end }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="end"
                            :label="label.Type"
                            min-width="50">
                             <template slot-scope="scope">
                                <span>{{ scope.row.type }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            min-width="160">
                            <template slot-scope="scope">
                                <div class="button_edi">
                                    <el-tooltip class="item" effect="dark" :content="content.content1" placement="top-start">
                                        <button type="button" class="iconfont icon-guiding" @click="handleEdit(scope.$index, scope.row)"></button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="content.content2" placement="top-start">
                                        <button type="button" class="iconfont icon-history" @click="Refresh(scope.row)"></button>
                                    </el-tooltip>
                                        <el-progress type="circle" style="margin: 0 0 0 16px;" :percentage="scope.row.percentage" :stroke-width="2" :width="35"></el-progress>
                                    <el-tooltip class="item" effect="dark" :content="content.content3" placement="top-start">
                                        <a :href="scope.row.url" :download="scope.row.urlto"><button style="margin: 0 16px;" class="iconfont icon-download"></button></a>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" :content="content.content4" placement="top-start">
                                        <el-button size="mini" style="font-size: 25px;" @click="Refresh1(scope.$index, scope.row)" data-toggle="modal" data-target="#myModal" class="iconfont icon-play"></el-button>
                                    </el-tooltip>
                                </div>
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
        <div class="modal fade"  data-backdrop="static" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                        <video class="videoo" id="playarch"></video>
                        <div class="block">
						    <el-slider v-model="timelink" :max="max" @change="timelinn(timelink)" :show-tooltip="false"></el-slider>
					    </div>
                        <!-- <el-button style="font-size: 25px;" :icon="icon" size="mini" circle  @click="resume()" class="strart"></el-button> -->
                        <i style="font-size: 30px; margin: 0 20px;" :class="icon" @click="resume1()" class="strart"></i>
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
    
    name:"archive",
    data() {
        return {
            content:{
                content1:this.$t("message.archive.archive"),
                content2:this.$t("message.archive.Refresh"),
                content3:this.$t("message.archive.Download"),
                content4:this.$t("message.archive.Playback")
            },
            label:{
                Name:this.$t("message.table.Name"),
                Token:this.$t("message.table.Token"),
                StartTime:this.$t("message.table.StartTime"),
                EndTime:this.$t("message.table.EndTime"),
                Type:this.$t("message.table.Type")
            },
            timelink:0,//滑块
            value: [new Date(new Date().getTime()- 3600 * 1000 * 1), new Date()],
            //分页
            currentPage: 1, // 当前页码
            total: 0, // 总条数
            pageSize: 10,//一页数量
            search: '',
            filterText: '',
            data:this.regionaldata.regionaldata,
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
            rename:"",//刷新的名字
            redata:"",//刷新的数据
            rebfb:"",//刷新的百分比
            rerow:[],
            max:100
        }
    },
    mounted(){
        // this.loadDevice();
        // this.cloudDevice();
        // this.NumberDevice();
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
                console.log("=============",staefend,endd,starf)
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
            console.log("aaaaaaaaaaaaaa===",row.starf,row.end);
            //return false;
            var pbconf1 = {
				begintime: row.starf,
	            endtime: row.end,
				showposter: 'true', //'true' or 'false' show poster
				callback: this.PlaybackCB,
				userdata:  this // user data
			};
        	let conf = {
        		videoid: "playarch",
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
            this.max=starfend;
            console.log("++++++++++++",row.end,row.starf);
            console.log("==============",starfend,this.max);
            //return false;
            
            this.v1 = new H5sPlayerRTC(conf);
            this.v1.connect();
            setTimeout(function(){
				this.v1.start();
			}.bind(this),500);
        },
        //开始
        resume1(){
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
        //拉播
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
                this.timelink=0;
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
        },
        // 表格归档 下载 刷新

        Refresh(row){
            console.log(row);
            
            //3m刷新数据
            this.rename=row.name;
            this.redata=row.strFileName;
            this.rerow=row;
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
            setInterval(function(){
                var url1 = root + "/api/v1/GetArchiveStatus?token="+row.name+"&filename="+row.strFileName+"&session="+ this.$store.state.token;
                
                this.$http.get(url1).then(result1=>{
                    if (result1.status == 200)
                    {
                        console.log(result1.data.nPercentage);
                        row.percentage=result1.data.nPercentage;
                    }
                    
                    }).catch(error => {
                        console.log('GetArchiveStatus failed!', error);
                        this.$Notice.info({
                            title: "Refresh failed!"
                        })
                    });
                }.bind(this),3000)
            
            
        },
        handleEdit(index, row) {
            console.log(index,row);
            
            var end=new Date(row.end).getTime();
            var starf=new Date(row.starf).getTime();
            var rqstarf=new Date(starf);
            //时间差
            var starfend=(end-starf)/1000;
            //年月日
            var y = rqstarf.getFullYear();
            var m = rqstarf.getMonth()+1;
            var d = rqstarf.getDate();
            //时分秒
            var h = rqstarf.getHours();
            var mm = rqstarf.getMinutes();
            var s = rqstarf.getSeconds();
            var rq=y+'-'+m+'-'+d;
            var sj=h+'-'+mm+'-'+s;
            var roww=row.name;
            //url
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
			var url = root + "/api/v1/Archive?token="+roww+"&start1="+rq+"&start2="+sj+"&duration="+starfend+"&speed=4&session="+ this.$store.state.token;
           
            this.$http.get(url).then(result=>{
                if (result.status == 200){
                    
                    this.$Notice.info({
                            title: "Archive in progressing"
                    })
                    var data=result.data;
                    var strFileName=data.strFileName;
                    row.strFileName=strFileName;//下载的地址
                    var strUrl=data.strUrl;
                    row.url=strUrl;//下载的地址
                    var urlto=strUrl.split("/");
                    row.urlto=urlto[urlto.length-1];//下载文件
                }
            }).catch(error => {
                console.log('Snapshot failed!', error);
                this.$Notice.info({
                    title: "Archive failed !"
                })
            });
        },
        //按钮搜索
        getCheckedNodes() {
            console.log("node值",this.$refs.tree.getCheckedNodes());
            var nodes=this.$refs.tree.getCheckedNodes();
            if(nodes.length==1){
            var idname=nodes[0].token;
            var idname1=nodes[0].label;
            }else{
                alert("请选择一个");
                return false;
            }
            var timevalue=this.value;
            // var timevalues=timevalue[0].toISOString();
            // var timevaluee=timevalue[1].toISOString();
            var starfs=new Date(timevalue[0]).getTime();
            var endds=new Date(timevalue[1]).getTime();
            var ks=new Date(starfs).toISOString()+"08:00";
            var jss=new Date(endds).toISOString()+"08:00";
            //var kss=ks.getTimezoneOffset()/60;
            //console.log(kss);
            console.log(ks,jss);
            //return false;
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
			var url = root + "api/v1/SearchDeviceRecordByTime?token="+idname+"&start="+ks+"&end="+jss+"&session="+ this.$store.state.token;
            console.log(url);
            //return false;
            this.$http.get(url).then(result=>{
				  if(result.status == 200){
                    this.$Notice.info({
                        title: "Query successful"
                    })
					var data=result.data;
					for(var i=0;i<data.record.length;i++){
						var item=data.record[i];
						var timeitem={
                                name: idname,
                                token: idname1,
								starf : item['strStartTime'],
                                end : item['strEndTime'],
                                type: item['nType'],
                                percentage:0,
                                url:'',
                                urlto:'',
                                strFileName:""
                              };
                              if(item['nType']=="H5_REC_MANUAL"){
                                    timeitem["type"] = this.$t("message.archive.ManualRecord");
                              }else{
                                    timeitem["type"] = this.$t("message.archive.AlarmRecord");
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
        

		
        //模糊查询
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },
     //模糊查询
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    }
    
}
</script>
<style scoped>
    a{
        color: #797979;
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