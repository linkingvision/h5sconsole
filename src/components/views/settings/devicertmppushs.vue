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
                <el-form-item label="Audio">
                    <el-switch
                    v-model="editform.Audio"
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
        <!-- 添加弹窗 -->
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
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" type="border-card" max-height="850">
            <!-- 1 -->
            
             <el-tab-pane :label="label.label" name="first">
                <!-- 添加 -->
                <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                 <!-- 表格 -->
                <el-table
                    :data="tableData.slice((currentPage1-1)*pageSize,currentPage1*pageSize).filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase()))"
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
                        prop="index"
                        label="index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="Name"
                    label="Name">
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
                    layout=" prev, pager, next,total, jumper"
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
            label:"H5_RTMP_PUSH",//选1

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
                value: 'H5_RTMP_PUSH',
                label: 'H5_RTMP_PUSH'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        currentPage1: 1, // 当前页码
        total2: 0, // 总条数 1
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type: 'H5_RTMP_PUSH',
            Name:"Cam1",
            Token:"platform1",
            Username:"admin",
            Password:"12345",
            IP:"192.168.1.1",
            Port:"8000",
            Audio:false,
        },
        editform: {
            Audio:false,
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
          var url = root + "/api/v1/GetSrc?type=H5_RTMP_PUSH&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
            console.log(result);
              if(result.status == 200){
                  var itme=result.data.src;
                  
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          Type:itme[i].nType,
                          Name:itme[i].strName,
                          Token:itme[i].strToken,
                          User:itme[i].strUser,
                          Password:itme[i].strPasswd,
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
            // var list = {
            //     Type:form.Type,
            //     Name:form.Name,
            //     Token:form.Token,
            //     User:form.User,
            //     Password:form.Password,
            //     IP:form.IP,
            //     Port:form.Port,
            //     Audio :form.Audio,
            //     Online:form.Online+"",
            //     bPasswdEncrypt:form.bPasswdEncrypt,
            // }
            // console.log("form", form,list);
            //return false;
            var url1 = root + "/api/v1/DelSrc?token="+this.edittoken+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var list = {
                            index:form.index,
                            Type:form.Type,
                            Name:form.Name,
                            Token:form.Token,
                            User:form.User,
                            Password:form.Password,
                            Audio :form.Audio,
                            Online:form.Online+"",
                            bPasswdEncrypt:form.bPasswdEncrypt,
                            }
                        this.tableData.splice(this.editindex, 1,list)
                        var url = root + "/api/v1/AddRTMPPush?&name="+form.Name+
                        "&token="+form.Token+
                        "&audio="+form.Audio+
                        "&session="+ this.$store.state.token;
                        console.log(url);
                        this.$http.get(url).then(result=>{
                            console.log(result);
                            if(result.status==200){
                            }
                        })
                    }else{
                        this.$message({
                            message: this.$t("message.setting.Editorfailure"),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            
            
            
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
            var url = root + "/api/v1/AddRTMPPush?&name="+form.Name+
            "&token="+form.Token+
            "&audio="+form.Audio+
            "&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus){
                        this.tableData=[];
                        this.loadHIK();
                        // this.reload();
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            
        },
        //查看 编辑 移除
        handleClick(index,row){
           //console.log(row,index,this.tableData);
           this.$Modal.info({
                title: '详情',
                content: 
                `Type: ${row.Type}<br>
                Name: ${row.Name}<br>
                Token: ${row.Token}<br>
                User: ${row.User}<br>
                Password: ${row.Password}<br>
                Audio: ${row.Audio}<br>
                Online: ${row.Online}<br>
                bPasswdEncrypt: ${row.bPasswdEncrypt}<br>
                `
            })
        },
        handleEdit(index,row){
            console.log(index);
            console.log(this.tableData[index]);
            console.log("序列号",((this.currentPage1-1)*10)+index);
            var index_xlh=((this.currentPage1-1)*10)+index;
            //return false;
            this.editPopup = true;
            this.edittoken=row.Token;
            this.editindex=index_xlh;
            
            this.editform["Type"]=row.Type;
            this.editform["index"]=row.index;
            this.editform["Name"]=row.Name;
            this.editform["Token"]=row.Token;
            this.editform["User"]=row.User;
            this.editform["Password"]=row.Password;
            this.editform["Audio"]=row.Audio;
            this.editform["Online"]=row.Online;
            this.editform["bPasswdEncrypt"]=row.bPasswdEncrypt;
            // console.log(this.editform)
            // console.log(this.tableData[index])
            
            
            
            
        },
        //删除
        
        deleteRow(index, row,rows) {
            //var form=this.form;
            console.log(this.edittoken);
            console.log("序列号",((this.currentPage1-1)*10)+index);
            var index_xlh=((this.currentPage1-1)*10)+index;
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
            var url = root + "/api/v1/DelSrc?token="+row.Token+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log(result);
                console.log(this.tableData);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        rows.splice(index_xlh, 1);
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
                var url = root + "/api/v1/DelSrc?token="+token[i].token+"&session="+ this.$store.state.token;
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