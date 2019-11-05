<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="eltitle" :visible.sync="editPopup">
            <el-form label-position="right" label-width="140px" :model="editform">
                    
                <el-form-item label="Type">
                    <el-select v-model="form.Type" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Name">
                    <input class="editinput" v-model="editform.Name"/>
                </el-form-item>
                <el-form-item label="Token">
                    <input class="editinput" v-model="editform.Token"/>
                </el-form-item>
                <el-form-item label="Username">
                    <input class="editinput" v-model="editform.User"/>
                </el-form-item>
                <el-form-item label="Password">
                    <input class="editinput" v-model="editform.Password"/>
                </el-form-item>
                <el-form-item label="IP">
                    <input class="editinput" v-model="editform.IP"/>
                </el-form-item>
                <el-form-item label="Port">
                    <input class="editinput" v-model="editform.Port"/>
                </el-form-item>
                <el-form-item label="Audio">
                    <el-switch
                    v-model="form.Audio"
                    active-text="ON"
                    inactive-text="OFF">
                    </el-switch>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="edityes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" style="width: 100%;padding: 0 50px;" max-height="850">
            <!-- 1 -->
            
             <el-tab-pane :label="label.label" name="first">
                <!-- 添加 -->
                <div>
                    <el-button type="text" @click="addto" >{{$t("message.setting.ADD")}}</el-button>
                    <el-button type="text" @click="deleteselect">{{$t("message.setting.DeleteAll")}}</el-button>
                </div>
                <el-dialog :title="eltitle" :visible.sync="dialogFormVisible">
                    <el-form label-position="right" label-width="140px" :model="form">
                    
                        <el-form-item label="Type">
                          <el-select v-model="form.Type" placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="Name">
                            <input class="editinput" v-model="form.Name"/>
                        </el-form-item>
                        <el-form-item label="Token">
                            <input class="editinput" v-model="form.Token"/>
                        </el-form-item>
                        <el-form-item label="Username">
                            <input class="editinput" v-model="form.Username"/>
                        </el-form-item>
                        <el-form-item label="Password">
                            <input class="editinput" v-model="form.Password"/>
                        </el-form-item>
                        <el-form-item label="IP">
                            <input class="editinput" v-model="form.IP"/>
                        </el-form-item>
                        <el-form-item label="Port">
                            <input class="editinput" v-model="form.Port"/>
                        </el-form-item>
                        <el-form-item label="Audio">
                          <el-switch
                            v-model="form.Audio"
                            active-text="ON"
                            inactive-text="OFF">
                          </el-switch>
                        </el-form-item>
                        
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                        <el-button type="primary" @click="platformyes">{{$t("message.setting.OK")}}</el-button>
                    </div>
                </el-dialog>
                 <!-- 表格 -->
                <el-table
                    :data="tableData.slice((currentPage1-1)*pageSize,currentPage1*pageSize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))"
                    border
                    @select='selectCall'
                    @select-all='select_Call'
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="nType :">
                                    <span>{{ props.row.Type }}</span>
                                </el-form-item>
                                <el-form-item label="strName :">
                                    <span>{{ props.row.Name }}</span>
                                </el-form-item>
                                <el-form-item label="strToken :">
                                    <span>{{ props.row.Token }}</span>
                                </el-form-item>
                                <el-form-item label="strUser :">
                                    <span>{{ props.row.User }}</span>
                                </el-form-item>
                                <el-form-item label="strPasswd :">
                                    <span>{{ props.row.Password }}</span>
                                </el-form-item>
                                <el-form-item label="bPasswdEncrypt :">
                                    <span>{{ props.row.bPasswdEncrypt }}</span>
                                </el-form-item>
                                <el-form-item label="strDevIpAddress :">
                                    <span>{{ props.row.IP }}</span>
                                </el-form-item>
                                <el-form-item label="strDevPort :">
                                    <span>{{ props.row.Port }}</span>
                                </el-form-item>
                                <el-form-item label="bEnableAudio :">
                                    <span>{{ props.row.Audio }}</span>
                                </el-form-item>
                                <el-form-item label="bOnline :">
                                    <span>{{ props.row.Online }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="Name"
                    label="Name">
                    </el-table-column>
                    <el-table-column
                    prop="IP"
                    label="IP"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="Port"
                    label="Port">
                    </el-table-column>
                    <el-table-column
                    prop="User"
                    label="User">
                    </el-table-column>
                    <el-table-column
                    prop="Online"
                    label="Online">
                    </el-table-column>
                    <el-table-column
                    prop="Type"
                    label="Type"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="Token"
                    label="Token">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        min-width="140">
                        <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="search"
                            size="mini"
                            @change="handlechange(scope.$index,scope.row)"
                            placeholder="输入关键字"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button>
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                            <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button>
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
                    :total="total2">
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
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'first',
        tabPosition: 'button',//选项卡位置
        inputedit:[],
        label:{
            label:"H5_DEV",//选1

            label2:this.$t("message.GB.Name"),
            label3:this.$t("message.GB.SIPServerIP"),
            label4:this.$t("message.GB.SIPServerPort"),
            label5:this.$t("message.GB.SIPPort"),
            label6:this.$t("message.GB.SIPUserID"),
            label7:this.$t("message.GB.SIPServerID"),
            label8:this.$t("message.GB.Password"),
            label9:this.$t("message.GB.SIPProtocol"),
            label10:this.$t("message.GB.SIPChannelBaseID"),
            label11:this.$t("message.GB.RegisterPeriod"),
            label12:this.$t("message.GB.KeepaliveTime"),
        },
        options: [{
                value: 'H5_DEV_HIK',
                label: 'H5_DEV_HIK'
            }, {
                value: 'H5_DEV_DH',
                label: 'H5_DEV_DH'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        currentPage1: 1, // 当前页码
        total2: 0, // 总条数 1
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type: 'H5_DEV_HIK',
            Name:"Device1",
            Token:"platform1",
            Username:"admin",
            Password:"12345",
            IP:"192.168.1.1",
            Port:"8000",
            Audio:false,
        },
        editform: {
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//1
        selectop:[],//选择那几个
      };
    },
    mounted(){
        this.loadHIK();
    },
    methods:{
        //第一个表格的数据
        loadHIK(){
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
          var url = root + "/api/v1/GetDevice?getonline=false&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
              if(result.status == 200){
                  var itme=result.data.dev;
                  console.log(result);
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          Type:itme[i].nType,
                          Name:itme[i].strName,
                          Token:itme[i].strToken,
                          User:itme[i].strUser,
                          Password:itme[i].strPasswd,
                          IP:itme[i].strDevIpAddress,
                          Port:itme[i].strDevPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt,
                      };
                      this.tableData.push(tabledata);
                      //console.log(tabledata);
                  }
                  this.total2=this.tableData.length;
              }
            })
          },
        
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["Token"] = uuid(4, 16).toLowerCase();
        },
        //  编辑  添加 的确定键
        edityes(){
            console.log(this.editindex);
            //return false;
            this.editPopup = false;
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
            var form=this.editform;
            var list = {
                            Type:form.Type,
                            Name:form.Name,
                            Token:form.Token,
                            User:form.User,
                            Password:form.Password,
                            IP:form.IP,
                            Port:form.Port,
                            Audio :form.Audio,
                            Online:form.Online+"",
                            bPasswdEncrypt:form.bPasswdEncrypt,
                            }
            console.log("form", form,list);
            //return false;
            var url1 = root + "/api/v1/DelDevice?token="+this.edittoken+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var list = {
                            Type:form.Type,
                            Name:form.Name,
                            Token:form.Token,
                            User:form.User,
                            Password:form.Password,
                            IP:form.IP,
                            Port:form.Port,
                            Audio :form.Audio,
                            Online:form.Online+"",
                            bPasswdEncrypt:form.bPasswdEncrypt,
                            }
                        this.tableData.splice(this.editindex, 1,list)
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            
            if(form.Type=="H5_DEV_HIK"){
              var url = root + "/api/v1/AddDeviceHik?&name="+form.Name+
              "&token="+form.Token+
              "&user="+form.Username+
              "&password="+form.Password+
              "&ip="+form.IP+
              "&port="+form.Port+
              "&audio="+form.Audio+
              "&session="+ this.$store.state.token;
              console.log(url);
              this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                }
              })
            }else if(form.Type=="H5_DEV_DH"){
                console.log(form.Type)
                var url = root + "/api/v1/AddDeviceDh?&name="+form.Name+
                "&token="+form.Token+
                "&user="+form.Username+
                "&password="+form.Password+
                "&ip="+form.IP+
                "&port="+form.Port+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                    }
                })
            }
            
        },
        platformyes(){
            this.dialogFormVisible=false;
            console.log(this.form)
            //return false;
            var form=this.form;
            
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            console.log(form.Type)
            if(form.Type=="H5_DEV_HIK"){
              var url = root + "/api/v1/AddDeviceHik?&name="+form.Name+
              "&token="+form.Token+
              "&user="+form.Username+
              "&password="+form.Password+
              "&ip="+form.IP+
              "&port="+form.Port+
              "&audio="+form.Audio+
              "&session="+ this.$store.state.token;
              console.log(url);
              this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.tableData=[];
                        this.loadHIK();
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        return false;
                    }
                  
                }
              })
            }else if(form.Type=="H5_DEV_DH"){
                console.log(form.Type)
                var url = root + "/api/v1/AddDeviceDh?&name="+form.Name+
                "&token="+form.Token+
                "&user="+form.Username+
                "&password="+form.Password+
                "&ip="+form.IP+
                "&port="+form.Port+
                "&audio="+form.Audio+
                "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                        this.tableData=[];
                        this.loadHIK();
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        return false;
                    }
                    }
                })
            }
            
        },
        //查看 编辑 移除
        handleClick(index,row){
           //console.log(row,index,this.tableData);
           this.$Modal.info({
                title: '详情',
                content: 
                `Type: ${this.tableData[index].Type}<br>
                Name: ${this.tableData[index].Name}<br>
                Token: ${this.tableData[index].Token}<br>
                User: ${this.tableData[index].User}<br>
                Password: ${this.tableData[index].Password}<br>
                IP: ${this.tableData[index].IP}<br>
                Port: ${this.tableData[index].Port}<br>
                Audio: ${this.tableData[index].Audio}<br>
                Online: ${this.tableData[index].Online}<br>
                bPasswdEncrypt: ${this.tableData[index].bPasswdEncrypt}<br>
                `
            })
        },
        handleEdit(index,row){
            console.log(index);
            console.log(this.tableData[index]);
            //return false;
            this.editPopup = true;
            this.edittoken=row.Token;
            this.editindex=index;
            
            this.editform["Type"]=this.tableData[index].Type;
            this.editform["Name"]=this.tableData[index].Name;
            this.editform["Token"]=this.tableData[index].Token;
            this.editform["User"]=this.tableData[index].User;
            this.editform["Password"]=this.tableData[index].Password;
            this.editform["IP"]=this.tableData[index].IP;
            this.editform["Port"]=this.tableData[index].Port;
            this.editform["Audio"]=this.tableData[index].Audio;
            this.editform["Online"]=this.tableData[index].Online;
            this.editform["bPasswdEncrypt"]=this.tableData[index].bPasswdEncrypt;
            // console.log(this.editform)
            // console.log(this.tableData[index])
            
            
            
            
        },
        //删除
        deleteRow(index, row,rows) {
            //var form=this.form;
            console.log(this.edittoken);
            //return false;
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
            var url = root + "/api/v1/DelDevice?token="+row.Token+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log(result);
                console.log(this.tableData);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        rows.splice(index, 1);
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        //全选删除
        deleteselect(){
            var token=this.selectop;
            console.log(token)
            //return false;
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
            for(var i=0;i<token.length;i++){
                var url = root + "/api/v1/DelDevice?token="+token[i].token+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    console.log(result);
                    console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                           this.reload();
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }
            
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
        //搜索
        handlechange(){},
        //分页

        handleSizeChange1(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
        },
    },
  };
</script>
<style>
  
  .el-dialog {
    width: 30%;
  }
  /* 弹框input */
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