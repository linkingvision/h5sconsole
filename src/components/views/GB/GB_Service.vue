<template>
    <div>
       
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="label.eltitle" :visible.sync="editPopup">
            <el-form label-position="right" label-width="180px" :model="editform">
               
               <el-form-item label="strGbID">
                    <input class="editinput" v-model="editform.strGbID"/>
                </el-form-item>
                <el-form-item label="strGbServerIpAddr">
                    <input class="editinput" v-model="editform.strGbServerIpAddr"/>
                </el-form-item>
                <el-form-item label="nGbServerPort">
                    <input class="editinput" v-model="editform.nGbServerPort"/>
                </el-form-item>
                <el-form-item label="nPortRangeMin">
                    <input class="editinput" v-model="editform.nPortRangeMin"/>
                </el-form-item>
                <el-form-item label="nPortRangeMax">
                    <input class="editinput" v-model="editform.nPortRangeMax"/>
                </el-form-item>
                <el-form-item label="strGbStreamProto">
                    <input class="editinput" v-model="editform.strGbStreamProto"/>
                </el-form-item>
                <el-form-item label="strGbServerProto">
                    <input class="editinput" v-model="editform.strGbServerProto"/>
                </el-form-item>
                <el-form-item label="nGbTimeout">
                    <input class="editinput" v-model="editform.nGbTimeout"/>
                </el-form-item>
                <el-form-item label="strPassword">
                    <input class="editinput" v-model="editform.strPassword"/>
                </el-form-item>
                <el-form-item label="bSubAlarm">
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
                <el-form-item label="bSubMobilePosition">
                    <el-select v-model="editform.bSubMobilePosition" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bEnable">
                    <el-select v-model="editform.bEnable" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bEnableAudio">
                    <el-select v-model="editform.bEnableAudio" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="bEnableSSRCCheck">
                    <el-select v-model="editform.bEnableSSRCCheck" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="strRealm">
                    <el-select v-model="editform.strRealm" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                
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
                    label="ID"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="strGbServerIpAddr"
                    label="IP"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="nGbServerPort"
                    label="Port">
                    </el-table-column>
                    <el-table-column
                    prop="nPortRangeMin"
                    label="RangeMin">
                    </el-table-column>

                    <el-table-column
                    prop="nPortRangeMax"
                    label="RangeMax">
                    </el-table-column>
                    <el-table-column
                    prop="bSubAlarm"
                    label="Alarm">
                    </el-table-column>
                    <el-table-column
                    prop="bSubMobilePosition"
                    label="bSubMobilePosition">
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
        activeName: "GBPlatform",//优先显示选项卡
        label:{
            label1:this.$t("message.GB.GBService"),//选2
            eltitle:this.$t("message.setting.Configuration"),//编辑

            label2:this.$t("message.GB.Name"),
            label3:this.$t("message.GB.SIPServerIP"),
            label4:this.$t("message.GB.SIPPort"),
            label5:this.$t("message.GB.SIPServerPort"),
            label6:this.$t("message.GB.SIPUserID"),
            label7:this.$t("message.GB.SIPServerID"),
            label8:this.$t("message.GB.SIPProtocol"),
            label9:this.$t("message.GB.Password"),
            label10:this.$t("message.GB.SIPChannelBaseID"),
            label11:this.$t("message.GB.RegisterPeriod"),
            label12:this.$t("message.GB.KeepaliveTime"),
            label13:this.$t("message.GB.Domain"),

            Index:this.$t("message.table.Index"),
            Token:this.$t("message.table.Token")
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
                `strPassword: ${row.strPassword}<br>
                strGbStreamProto: ${row.strGbStreamProto}<br>
                strGbServerProto: ${row.strGbServerProto}<br>
                strGbServerIpAddr: ${row.strGbServerIpAddr}<br>
                strGbID: ${row.strGbID}<br>
                nPortRangeMin: ${row.nPortRangeMin}<br>
                nPortRangeMax: ${row.nPortRangeMax}<br>
                nGbTimeout: ${row.nGbTimeout}<br>
                nGbServerPort: ${row.nGbServerPort}<br>

                bEnable: ${row.bEnable}<br>
                bEnableAudio: ${row.bEnableAudio}<br>
                bEnableSSRCCheck: ${row.bEnableSSRCCheck}<br>
                bSubAlarm: ${row.bSubAlarm}<br>
                bSubMobilePosition: ${row.bSubMobilePosition}<br>
                strRealm: ${row.strRealm}<br>
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
            console.log(this.edittoken);
            var editform=this.editform;
            var url1 = root + "/api/v1/SetGbConf?enable="+editform.bEnable+
            "&Gbid="+editform.strGbID+
            "&realm="+editform.bSubAlarm+
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
            "&subalarm="+editform.strRealm+
            "&submobileposition="+editform.bSubMobilePosition+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
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
            //console.log(index);
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
    width: 30%;
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