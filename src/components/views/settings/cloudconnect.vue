<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="label.Edit" :visible.sync="editPopup">
            <el-form label-position="right" label-width="140px" :model="editform">
                <el-form-item :label="label.user">
                    <el-input v-model="editform.strUser"></el-input>
                </el-form-item>
                <el-form-item :label="label.password">
                    <el-input type="password" v-model="editform.strPasswd"></el-input>
                </el-form-item>
                <el-form-item :label="label.name">
                    <el-input v-model="editform.strServerName"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="editform.strServerToken"></el-input>
                </el-form-item>
                <el-form-item :label="label.IP">
                    <el-input v-model="editform.strCloudIp"></el-input>
                </el-form-item>
                <el-form-item :label="label.Port">
                    <el-input v-model="editform.strCloudPort"></el-input>
                </el-form-item>
                <el-form-item :label="label.KeepaliveTime">
                    <el-input v-model="editform.nKeepaliveTime"></el-input>
                </el-form-item>
                <el-form-item :label="label.Enable">
                    <el-select v-model="editform.bEnable" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.SSL">
                    <el-select v-model="editform.bSSL" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.EdgeTranscoding">
                    <el-select v-model="editform.bEdgeTranscoding" placeholder="请选择">
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
                <el-button type="primary" @click="proedityes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" type="border-card" max-height="850" @tab-click="removeTab">
            <!-- 1 -->
            
             <el-tab-pane :label="label.label" name="Default">
                <!-- 表格 -->
                <el-table
                    :data="tableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                    style="width: 100%">
                    <el-table-column
                        prop="strUser"
                        :label="label.user"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="strServerName"
                    :label="label.name">
                    </el-table-column>
                    <el-table-column
                    prop="strServerToken"
                    :label="label.Token"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="strCloudIp"
                    :label="label.IP"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="strCloudPort"
                    :label="label.Port"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="bOnline"
                    :label="label.Online"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="bSSL"
                    :label="label.SSL"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        min-width="140">
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
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout="prev, pager, next"
                    @size-change="handleSizeChange1" 
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :total="total1">
                </el-pagination>
            </el-tab-pane>
            <!-- 2 -->
        </el-tabs>
        
    </div>
</template>
<script>
import uuid from '@/store/uuid'
import '@/assets/jQuery.md5.js'
  export default {
    inject:["reload"],
    data() {
      return {
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'Default',
        tabPosition: 'button',//选项卡位置
        inputedit:[],
        label:{
            label:this.$t("message.setting.CloudConnect"),//选1
            Edit:this.$t("message.table.Edit"),
            user:this.$t("message.setting.user"),
            name:this.$t("message.setting.name"),
            Token:this.$t("message.table.Token"),
            IP:this.$t("message.table.IP"),
            Port:this.$t("message.table.Port"),
            Online:this.$t("message.table.Online"),
            SSL:this.$t("message.setting.SSL"),
            password:this.$t("message.setting.password"),
            KeepaliveTime:this.$t("message.setting.KeepaliveTime"),
            Enable:this.$t("message.setting.Enable"),
            EdgeTranscoding:this.$t("message.setting.EdgeTranscoding")
        },
        //分页
        editform: {
            strUser:"",
            strServerName:"",
            strServerToken:"",
            bEdgeTranscoding:"",
            bEnable:"",
            bOnline:"",
            bSSL:"",
            nKeepaliveTime:"",
            strCloudIp:"",
            strCloudPort:"",
            strPasswd:"12345"
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
        pageSize: 10,//一页数量
        editPopup:false,//编辑弹窗
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//1
        currentPage1: 1, // 当前页码
        total1: 0, // 总条数 1

        tableData2: [],//2
        total2: 0, // 总条数 2
        currentPage2: 1, // 当前页码2
        editpasswd:""//编辑的密码
      };
    },
    mounted(){
        this.loadstream();
    },
    methods:{
        loadstream(){
            this.editPopup = false;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetCloudClientInfo?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
            //   return false;
                if(result.status == 200){
                    var itme=result.data;
                    // console.log(result)
                    var tabledata={
                        strUser: itme.strUser,
                        strServerName:itme.strServerName,
                        strServerToken:itme.strServerToken,
                        bEdgeTranscoding:itme.bEdgeTranscoding+"",
                        bEnable:itme.bEnable,
                        bOnline:itme.bOnline+"",
                        bSSL:itme.bSSL+"",
                        nKeepaliveTime:itme.nKeepaliveTime,
                        strCloudIp:itme.strCloudIp,
                        strCloudPort:itme.strCloudPort,
                        strPasswd:itme.strPasswd
                    };
                    console.log(tabledata)
                    this.tableData.push(tabledata);
                    this.total1=this.tableData.length;
                }
            })
        },
        //查看  编辑
        handleClick(index,row){
           console.log(row,index,this.tableData);
            this.$Modal.info({
                title: '详情',
                content: 
                `User: ${row.strUser}<br>
                ServerName: ${row.strServerName}<br>
                ServerToken: ${row.strServerToken}<br>
                EdgeTranscoding: ${row.bEdgeTranscoding}<br>
                Enable: ${row.bEnable}<br>
                Online: ${row.bOnline}<br>
                SSL: ${row.bSSL}<br>
                KeepaliveTime: ${row.nKeepaliveTime}<br>
                CloudIp: ${row.strCloudIp}<br>
                CloudPort: ${row.strCloudPort}<br>
                `
            })
        },
        handleEdit(index,row){
            this.editPopup = true;
            this.editform["strUser"]=row.strUser;
            this.editform["strServerName"]=row.strServerName;
            this.editform["strServerToken"]=row.strServerToken;
            this.editform["bEdgeTranscoding"]=row.bEdgeTranscoding+"";
            this.editform["bEnable"]=row.bEnable+"";
            this.editform["bOnline"]=row.bOnline;
            this.editform["bSSL"]=row.bSSL+"";
            this.editform["nKeepaliveTime"]=row.nKeepaliveTime;
            this.editform["strCloudIp"]=row.strCloudIp;
            this.editform["strCloudPort"]=row.strCloudPort;
            this.editform["strPasswd"]=row.strPasswd;
            this.editpasswd = row.strPasswd;
            // console.log(this.editform);
            // console.log(this.tableData[index])
        },
        //  编辑 添加 的确定键
        proedityes(){
            var form=this.editform;
    
            console.log("默认",this.editpasswd,form.strPasswd);
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var passwordol=""
            if(this.editpasswd==form.strPasswd){
                passwordol=this.editpasswd
            }else if(this.editpasswd!=form.strPasswd){
                passwordol=$.md5(form.strPasswd)
            }
            console.log("默认",passwordol);
            // return false
            var url = root + "/api/v1/SetCloudInfo?enable="+encodeURIComponent(form.bEnable)+
            "&servername="+encodeURIComponent(form.strServerName)+
            "&servertoken="+encodeURIComponent(form.strServerToken)+
            "&cloudip="+encodeURIComponent(form.strCloudIp)+
            "&cloudport="+encodeURIComponent(form.strCloudPort)+
            "&ssl="+encodeURIComponent(form.bSSL)+
            "&user="+encodeURIComponent(form.strUser)+
            "&password="+encodeURIComponent(passwordol)+
            "&keepalivetime="+encodeURIComponent(form.nKeepaliveTime)+
            "&edgetranscoding="+encodeURIComponent(form.bEdgeTranscoding)+
            "&session="+ this.$store.state.token;
            console.log(url);
            // return false
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.editPopup = false;
                        this.tableData=[];
                        this.loadstream();
                    }else{
                        this.$message({
                            message:this.$t("message.setting.Editorfailure") ,
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },

        selectCall(row){
            console.log("INDEX",row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    token:row[i].strToken,
                    index:row[i].index,
                    type:row[i].nFPSType
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    token:row[i].strToken
                };
                this.selectop.push(selectop);
            }
        },
        //选项卡
        removeTab(targetName) {
            this.form.Type=targetName.label;
            console.log(targetName.label);
        },
        //分页
        change (e) {
            this.$forceUpdate()
        },
        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
        }
    },
  };
</script>
<style>
  .el-select{
      width: 100%;
  }
  .el-dialog {
    width: 30%;
    
  }
  /* 弹框input */
  .el-input >>> .el-input__inner{
        -webkit-appearance: none;
        background-color: #FFF!important;
        background-image: none;
        border-radius: 4px!important;
        border: 1px solid #DCDFE6!important;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266!important;
        display: inline-block;
        font-size: inherit!important;
        height: 40px!important;
        line-height: 40px!important;
        outline: 0;
        padding: 0 15px!important;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%!important;
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