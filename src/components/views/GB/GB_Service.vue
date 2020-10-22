<template>
    <div>
       
        <!-- 编辑弹窗 -->
        
        <el-dialog width="25%" :title="label.eltitle" :visible.sync="editPopup">
            <el-form label-position="left" label-width="120px" :model="editform">
               
               <el-form-item :label="label.GbID">
                    <input class="editinput" v-model="editform.strGbID"/>
                </el-form-item>
                <el-form-item :label="label.GbServerIpAddr">
                    <input class="editinput" v-model="editform.strGbServerIpAddr"/>
                </el-form-item>
                <el-form-item :label="label.GbServerPort">
                    <input class="editinput" v-model="editform.nGbServerPort"/>
                </el-form-item>
                <el-form-item :label="label.PortRangeMin">
                    <input class="editinput" v-model="editform.nPortRangeMin"/>
                </el-form-item>
                <el-form-item :label="label.PortRangeMax">
                    <input class="editinput" v-model="editform.nPortRangeMax"/>
                </el-form-item>
                
                <el-form-item :label="label.GbTimeout">
                    <input class="editinput" v-model="editform.nGbTimeout"/>
                </el-form-item>
                <el-form-item :label="label.Password">
                    <input class="editinput" v-model="editform.strPassword"/>
                </el-form-item>
                <el-form-item :label="label.Realm">
                    <input class="editinput" v-model="editform.strRealm"/>
                </el-form-item>

                <el-collapse v-model="activeNames" class="GBService_active">
                    <el-collapse-item title="更多设置" name="1" id="headswitch">
                        <el-form-item :label="label.GbStreamProto">
                            <!-- <el-input v-model="editform.strGbStreamProto"></el-input> -->
                            <el-select v-model="editform.strGbStreamProto" placeholder="请选择">
                                <el-option
                                    v-for="item in utptcp"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="label.GbServerProto">
                            <!-- <el-input v-model="editform.strGbServerProto"></el-input> -->
                            <el-select v-model="editform.strGbServerProto" placeholder="请选择">
                                <el-option
                                    v-for="item in utptcp"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="label.SubAlarm">
                            <el-select v-model="editform.bSubAlarm" placeholder="请选择">
                                <el-option
                                    v-for="item in scaletype"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <!-- <input class="editinput" v-model="editform.bSubAlarm"/> -->
                        </el-form-item>
                        <el-form-item :label="label.SubMobilePosition">
                            <el-select v-model="editform.bSubMobilePosition" placeholder="请选择">
                                <el-option
                                    v-for="item in scaletype"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="label.Enable ">
                            <el-select v-model="editform.bEnable" placeholder="请选择">
                                <el-option
                                    v-for="item in scaletype"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="label.EnableAudio">
                            <el-select v-model="editform.bEnableAudio" placeholder="请选择">
                                <el-option
                                    v-for="item in scaletype"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="label.EnableSSRCCheck">
                            <el-select v-model="editform.bEnableSSRCCheck" placeholder="请选择">
                                <el-option
                                    v-for="item in scaletype"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-collapse-item> 
                </el-collapse>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="edityes">{{$t("message.camera.save")}}</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" type="border-card" max-height="850">
            <!-- 1 -->
            <el-tab-pane :label="label.label1" name="GBPlatform">
                <el-table
                    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    @select='selectCall'
                    @select-all='select_Call'
                    style="width: 100%">
                    <!-- 隐藏内容 -->
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                    prop="strGbID"
                    :label="label.GbID"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="strGbServerIpAddr"
                    :label="label.GbServerIpAddr"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="nGbServerPort"
                    :label="label.GbServerPort">
                    </el-table-column>
                    <el-table-column
                    prop="nPortRangeMin"
                    :label="label.PortRangeMin">
                    </el-table-column>

                    <el-table-column
                    prop="nPortRangeMax"
                    :label="label.PortRangeMax">
                    </el-table-column>
                    <el-table-column
                    prop="bSubAlarm"
                    :label="label.SubAlarm">
                    </el-table-column>
                    <el-table-column
                    prop="bSubMobilePosition"
                    :label="label.SubMobilePosition">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        width="180">
                        <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="search"
                            @change="handlechange(scope.$index,scope.row)"
                            size="mini"
                            placeholder="输入关键字"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button>
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                            <!-- <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout=" prev, pager, next,total, jumper"
                    @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :total="total1">
                </el-pagination>
               
            </el-tab-pane>
            
        </el-tabs>
        
    </div>
</template>
<script>
import uuid from '@/store/uuid'
  export default {
    name:"GB",
    inject:["reload"],
    data() {
      return {
        activeNames: [],//左边
        activeName: "GBPlatform",//优先显示选项卡
        label:{
            label1:this.$t("message.GB.GBService"),//选2
            eltitle:this.$t("message.setting.Configuration"),//编辑

            GbID:this.$t("message.GB.GbID"),
            GbServerIpAddr:this.$t("message.GB.GbServerIpAddr"),
            GbServerPort:this.$t("message.GB.GbServerPort"),
            PortRangeMin:this.$t("message.GB.PortRangeMin"),
            PortRangeMax:this.$t("message.GB.PortRangeMax"),
            GbStreamProto:this.$t("message.GB.GbStreamProto"),
            GbServerProto:this.$t("message.GB.GbServerProto"),
            GbTimeout:this.$t("message.GB.GbTimeout"),
            Password:this.$t("message.GB.Password"),
            Realm:this.$t("message.GB.Realm"),
            SubAlarm:this.$t("message.GB.SubAlarm"),
            SubMobilePosition:this.$t("message.GB.SubMobilePosition"),
            Enable:this.$t("message.GB.Enable"),
            EnableAudio:this.$t("message.GB.EnableAudio"),
            EnableSSRCCheck:this.$t("message.GB.EnableSSRCCheck"),
        },
        //分页
        search:"",//搜索
        currentPage: 1, // 当前页码
        total1: 0, // 总条数
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            name:"Platform1",
            Token:"platform1",
            strGbServerIpAddr:"192.168.1.100",
            nGbServerPort:"5060",
            strGbID:"34020000002000000100",
            strGbServerID:"34020000002000000001",
            strGbProto:"UDP",
            strGbDomain:"3402000000",
            strGbServerPassword:"3402000000",
            strGbIDChBase:"34020000001320000001",
            nGbKeepaliveTime:"10",
            nGbRegisterPeriod:"120",
            nGbLocalPort:"50600"
        },
        editform: {
            bEnable:"",
            strGbID:"",
            strRealm:"",
            strPassword:"",
            strGbServerProto:"",
            strGbStreamProto:"",
            strGbServerIpAddr:"",
            nGbServerPort:"",
            nGbTimeout:"",
            nPortRangeMin:"",
            nPortRangeMax:"",
            bEnableAudio:"",
            bEnableSSRCCheck:"",
            bSubAlarm:"",
            bSubMobilePosition:""
        },
        scaletype:[
            {
                value: "true",
                label: "true"
            },{
                value: "false",
                label: "false"
            }
        ],
        utptcp:[
            {
                value: "UDP",
                label: "UDP"
            },{
                value: "TCP",
                label: "TCP"
            }
        ],
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//2
        selectop:[]//选择那几个
      };
    },
    mounted(){
        this.loadplatform();
    },
    methods:{
        handlechange(){},
        //第一个表格的数据
        loadplatform(){
            if(this.$store.state.root=="Operator"){
                return false
            }
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
           var url = root + "/api/v1/GetGbConf?session="+ this.$store.state.token;
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
                        var itme=result.data;
                        console.log(itme);
                        var tabledata=[{
                            bEnable:itme.bEnable+"",
                            strGbID:itme.strGbID,
                            strRealm:itme.strRealm+"",
                            strPassword:itme.strPassword,
                            strGbServerProto:itme.strGbServerProto,
                            strGbStreamProto:itme.strGbStreamProto,
                            strGbServerIpAddr:itme.strGbServerIpAddr,
                            nGbServerPort:itme.nGbServerPort,
                            nGbTimeout:itme.nGbTimeout,
                            nPortRangeMin:itme.nPortRangeMin,
                            nPortRangeMax:itme.nPortRangeMax,
                            bEnableAudio:itme.bEnableAudio+"",
                            bEnableSSRCCheck:itme.bEnableSSRCCheck+"",
                            bSubAlarm:itme.bSubAlarm+"",
                            bSubMobilePosition:itme.bSubMobilePosition+""
                        }];
                        this.tableData=tabledata;
                         console.log(this.tabledata)
                        this.total1=this.tableData.length;
				  }
			  })
        },
        //查看
        handleClick(index,row){
            
            // KeepaliveTime: ${row.KeepaliveTime}<br>
           console.log(row,index,this.tableData);
            this.$Modal.info({
                title: '详情',
                content: 
                `${this.$t("message.GB.Password")}: ${row.strPassword}<br>
                ${this.$t("message.GB.GbStreamProto")}: ${row.strGbStreamProto}<br>
                ${this.$t("message.GB.GbServerProto")}: ${row.strGbServerProto}<br>
                ${this.$t("message.GB.GbServerIpAddr")}: ${row.strGbServerIpAddr}<br>
                ${this.$t("message.GB.GbID")}: ${row.strGbID}<br>
                ${this.$t("message.GB.PortRangeMin")}: ${row.nPortRangeMin}<br>
                ${this.$t("message.GB.PortRangeMax")}: ${row.nPortRangeMax}<br>
                ${this.$t("message.GB.GbTimeout")}: ${row.nGbTimeout}<br>
                ${this.$t("message.GB.GbServerPort")}: ${row.nGbServerPort}<br>

                ${this.$t("message.GB.Enable")}: ${row.bEnable}<br>
                ${this.$t("message.GB.EnableAudio")}: ${row.bEnableAudio}<br>
                ${this.$t("message.GB.EnableSSRCCheck")}: ${row.bEnableSSRCCheck}<br>
                ${this.$t("message.GB.SubAlarm")}: ${row.bSubAlarm}<br>
                ${this.$t("message.GB.SubMobilePosition")}: ${row.bSubMobilePosition}<br>
                ${this.$t("message.GB.Realm")}: ${row.strRealm}<br>
                `
            })
        },
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["Token"] = uuid(4, 16).toLowerCase();
        },
        //  编辑 的确定键
        edityes(){
            console.log(this.editindex);
            //return false;
            this.editPopup = false;
            console.log(this.editform);
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
            var editform=this.editform;
            var url1 = root + "/api/v1/SetGbConf?enable="+editform.bEnable+
            "&Gbid="+editform.strGbID+
            "&realm="+editform.strRealm+
            "&password="+editform.strPassword+
            "&Gbserverproto="+editform.strGbServerProto+
            "&Gbstreamproto="+editform.strGbStreamProto+
            "&GbserverIpaddr="+editform.strGbServerIpAddr+
            "&Gbserverport="+editform.nGbServerPort+
            "&Gbtimeout="+editform.nGbTimeout+
            "&portrangemin="+editform.nPortRangeMin+
            "&portrangemax="+editform.nPortRangeMax+
            "&enableaudio="+editform.bEnableAudio+
            "&enableSSRCcheck="+editform.bEnableSSRCCheck+
            "&subalarm="+editform.bSubAlarm+
            "&submobileposition="+editform.bSubMobilePosition+"&session="+ this.$store.state.token;
            
            console.log(url1);
            this.$http.get(url1).then(result=>{
                console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.$root.bus.$emit('webrtc',true);
                        // console.log("1222",result);
                        this.loadplatform();
                    }else{
                        this.$message({
                            message: this.$t("message.setting.Editorfailure"),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            console.log("form",editform)
            
            
        },
        //编辑 移除
        handleEdit(index,row){
            console.log(row);
            this.editPopup = true;
            this.edittoken=row.Token;
            console.log("序列号",((this.currentPage-1)*10)+index);

            this.editform["bEnable"]=row.bEnable;
            this.editform["bEnableAudio"]=row.bEnableAudio;
            this.editform["bEnableSSRCCheck"]=row.bEnableSSRCCheck;
            this.editform["bSubAlarm"]=row.bSubAlarm;
            this.editform["bSubMobilePosition"]=row.bSubMobilePosition;
            this.editform["nGbServerPort"]=row.nGbServerPort;
            this.editform["nGbTimeout"]=row.nGbTimeout;
            this.editform["nPortRangeMax"]=row.nPortRangeMax;
            this.editform["nPortRangeMin"]=row.nPortRangeMin;
            this.editform["strGbID"]=row.strGbID;
            this.editform["strGbServerIpAddr"]=row.strGbServerIpAddr;
            this.editform["strGbServerProto"]=row.strGbServerProto;
            this.editform["strGbStreamProto"]=row.strGbStreamProto;
            this.editform["strPassword"]=row.strPassword;
            this.editform["strRealm"]=row.strRealm;
            console.log(this.editform)
            // console.log(this.tableData[index])
            
            
            
        },
        selectCall(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].Token)
                var selectop={
                    token:row[i].Token
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].Token)
                var selectop={
                    token:row[i].Token,
                };
                this.selectop.push(selectop);
            }
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
        }
    }
  };
</script>
<style>
.el-dialog {
    width: 25%;
    max-height: 800px;
    overflow-y: auto;
}
.el-dialog::-webkit-scrollbar {/*滚动条整体样式*/
    width: 8px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 8px;
    scrollbar-arrow-color:red;
}
.el-dialog::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218,0.2);
    box-shadow: inset 0 0 5px rgba(218, 218, 218,0.2);
    background: rgba(218, 218, 218,0.2);
    scrollbar-arrow-color:red;
}
.el-dialog::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(218, 218, 218,0.2);
    box-shadow: inset 0 0 5px rgba(218, 218, 218,0.2);
    border-radius: 0;
    background: rgba(218, 218, 218,0.1);
}
/* 收缩框 */
.el-collapse{
    border: none;
    background: none;
}

.el-collapse-item__header{
    border: none;
    padding: 0 7px;
    font-size: 15px;
}
.el-collapse-item__wrap{
    background: none;
    border-bottom: none;
}
.GBService_active .el-collapse-item__content{
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    
}
.GBService_active .el-collapse-item__content .el-form-item{
    width: 50%;
    padding: 0 2px;
}

.button_edi button{
    border: 0;
    background:none;
    font-size: 24px;
    margin-right: 40px;
}
.button_edi button:nth-child(2){
    margin-right: 0;
}
  .editinput{
      -webkit-appearance: none;
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .demo-table-expand {
    font-size: 0;
    background: #e1e1e1;
  }
  .demo-table-expand label {
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>