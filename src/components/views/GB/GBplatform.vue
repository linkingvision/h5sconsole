<template>
    <div>
       
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="label.eltitle" :visible.sync="editPopup">
            <el-form label-position="right" label-width="180px" :model="editform">
               
               <el-form-item :label="label.label2">
                    <input class="editinput" v-model="editform.name"/>
                </el-form-item>
                <el-form-item label="Token">
                    <input class="editinput" v-model="editform.Token"/>
                </el-form-item>
                <el-form-item :label="label.label3">
                    <input class="editinput" v-model="editform.strGbServerIpAddr"/>
                </el-form-item>
                <el-form-item :label="label.label4">
                    <input class="editinput" v-model="editform.nGbLocalPort"/>
                </el-form-item>
                <el-form-item :label="label.label5">
                    <input class="editinput" v-model="editform.nGbServerPort"/>
                </el-form-item>
                <el-form-item :label="label.label6">
                    <input class="editinput" v-model="editform.strGbID"/>
                </el-form-item>
                <el-form-item :label="label.label7">
                    <input class="editinput" v-model="editform.strGbServerID"/>
                </el-form-item>
                <el-form-item :label="label.label8">
                    <input class="editinput" v-model="editform.strGbProto"/>
                </el-form-item>
                <el-form-item :label="label.label13">
                    <input class="editinput" v-model="editform.strGbDomain"/>
                </el-form-item>
                <el-form-item :label="label.label9">
                    <input class="editinput" v-model="editform.strGbServerPassword"/>
                </el-form-item>
                <el-form-item :label="label.label10">
                    <input class="editinput" v-model="editform.strGbIDChBase"/>
                </el-form-item>
                <el-form-item :label="label.label11">
                    <input class="editinput" v-model="editform.nGbKeepaliveTime"/>
                </el-form-item>
                <el-form-item :label="label.label12">
                    <input class="editinput" v-model="editform.nGbRegisterPeriod"/>
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
                <!-- 添加 -->
                <!-- <div style="color:#000">
                    <el-button style="color:#000" type="text" @click="addto" >{{$t("message.setting.ADD")}}</el-button>
                    <el-button style="color:#000" type="text" @click="deleteselect">{{$t("message.setting.DeleteAll")}}</el-button>
                </div> -->
                <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                <el-dialog :title="label.eltitle" :visible.sync="dialogFormVisible">
                    <el-form label-position="right" label-width="180px" :model="form">
                    
                        <el-form-item :label="label.label2">
                            <input class="editinput" v-model="form.name"/>
                        </el-form-item>
                        <el-form-item label="Token">
                            <input class="editinput" v-model="form.Token"/>
                        </el-form-item>
                        <el-form-item :label="label.label3">
                            <input class="editinput" v-model="form.strGbServerIpAddr"/>
                        </el-form-item>
                        <el-form-item :label="label.label4">
                            <input class="editinput" v-model="form.nGbLocalPort"/>
                        </el-form-item>
                        <el-form-item :label="label.label5">
                            <input class="editinput" v-model="form.nGbServerPort"/>
                        </el-form-item>
                        <el-form-item :label="label.label6">
                            <input class="editinput" v-model="form.strGbID"/>
                        </el-form-item>
                        <el-form-item :label="label.label7">
                            <input class="editinput" v-model="form.strGbServerID"/>
                        </el-form-item>
                        <el-form-item :label="label.label8">
                            <input class="editinput" v-model="form.strGbProto"/>
                        </el-form-item>
                        <el-form-item :label="label.label13">
                            <input class="editinput" v-model="form.strGbDomain"/>
                        </el-form-item>
                        <el-form-item :label="label.label9">
                            <input class="editinput" v-model="form.strGbServerPassword"/>
                        </el-form-item>
                        <el-form-item :label="label.label10">
                            <input class="editinput" v-model="form.strGbIDChBase"/>
                        </el-form-item>
                        <el-form-item :label="label.label11">
                            <input class="editinput" v-model="form.nGbKeepaliveTime"/>
                        </el-form-item>
                        <el-form-item :label="label.label12">
                            <input class="editinput" v-model="form.nGbRegisterPeriod"/>
                        </el-form-item>
                        
                    </el-form>
                   
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                        <el-button type="primary" @click="platformyes">{{$t("message.setting.ADD")}}</el-button>
                    </div>
                </el-dialog>
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
                        prop="index"
                        :label="label.Index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    :label="label.label2"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="Token"
                    :label="label.Token"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="strGbServerIpAddr"
                    :label="label.label3">
                    </el-table-column>
                    <el-table-column
                    prop="nGbServerPort"
                    :label="label.label5">
                    </el-table-column>
                    <el-table-column
                    prop="bRegStatus"
                    :label="label.Online">
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
                            <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button>
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
            label1:this.$t("message.GB.GBPlatform"),//选2
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
            label11:this.$t("message.GB.KeepaliveTime"),
            label12:this.$t("message.GB.RegisterPeriod"),
            label13:this.$t("message.GB.Domain"),
            Online:this.$t("message.table.Online"),

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
        },
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
		    if (root == undefined){
		        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		    }
		    //url
            var url = root + "/api/v1/GetGbPlatform?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    var itme=result.data.platform;
                    console.log(itme);
                    this.loadplatforms(itme)
                    
                }
            })
        },
        loadplatforms(itme,bianji,editindex){
            var itme=itme
            var _this=this
            var root = process.env.API_ROOT;
		    if (root == undefined){
		        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		    }
            for(var i=0;i<itme.length;i++){
                if(itme[i].strToken==undefined){
                    return false
                }
                console.log("****",itme[i].strToken)
                var url = root + "/api/v1/GetGbRegStatus?token="+itme[i].strToken+"&session="+ this.$store.state.token;
                $.ajax({
                    type: 'get',
                    url: url,  
                    async: false,  
                    success: function(data){ 
                        console.log(data)
                        var tabledata={
                            index:i+1,
                            Token:itme[i].strToken,
                            name:itme[i].strName,
                            strGbServerIpAddr:itme[i].strGbServerIpAddr,
                            nGbServerPort:itme[i].nGbServerPort,
                            nGbLocalPort:itme[i].nGbLocalPort,
                            strGbID:itme[i].strGbID,
                            strGbDomain:itme[i].strGbDomain,
                            strGbServerID:itme[i].strGbServerID,
                            strGbServerPassword:itme[i].strGbServerPassword,
                            strGbProto:itme[i].strGbProto,
                            strGbIDChBase:itme[i].strGbIDChBase,
                            nGbRegisterPeriod:itme[i].nGbRegisterPeriod,
                            nGbKeepaliveTime:itme[i].nGbKeepaliveTime,
                            bRegStatus:data.bRegStatus+""
                        };
                        if(bianji=='bianji'){
                            _this.tableData.splice(editindex, 1,tabledata)
                        }else{
                            _this.tableData.push(tabledata);
                            _this.total1=_this.tableData.length;
                        }
                    }
                })

            }
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
            var url1 = root + "/api/v1/DelGbPlatform?token="+this.edittoken+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var list = [{
                            index:editform.index,
                            strToken:editform.Token,
                            strName:editform.name,
                            Token:editform.Token,
                            name:editform.name,
                            strGbServerIpAddr:editform.strGbServerIpAddr,
                            nGbServerPort:editform.nGbServerPort,
                            nGbLocalPort:editform.nGbLocalPort,
                            strGbID:editform.strGbID,
                            strGbServerID:editform.strGbServerID,
                            strGbServerPassword:editform.strGbServerPassword,
                            strGbProto:editform.strGbProto,
                            strGbIDChBase:editform.strGbIDChBase,
                            nGbRegisterPeriod:editform.nGbRegisterPeriod,
                            nGbKeepaliveTime:editform.nGbKeepaliveTime,
                            strGbDomain:editform.strGbDomain,
                        }]
                        var url = root + "/api/v1/AddGbPlatform?name="
                        +encodeURIComponent(editform.name)+
                        "&token="+encodeURIComponent(editform.Token)+
                        "&localport="+encodeURIComponent(editform.nGbLocalPort)+
                        "&gbid="+encodeURIComponent(editform.strGbID)+
                        "&gbserverid="+encodeURIComponent(editform.strGbServerID)+
                        "&gbdomain="+encodeURIComponent(editform.strGbDomain)+
                        "&gbserverpw="+encodeURIComponent(editform.strGbServerPassword)+
                        "&gbproto="+encodeURIComponent(editform.strGbProto)+
                        "&gbserverip="+encodeURIComponent(editform.strGbServerIpAddr)+
                        "&gbserverport="+encodeURIComponent(editform.nGbServerPort)+
                        "&gbidchbase="+encodeURIComponent(editform.strGbIDChBase)+
                        "&registerperiod="+encodeURIComponent(editform.nGbRegisterPeriod)+
                        "&keepalivetime="+encodeURIComponent(editform.nGbKeepaliveTime)+
                        "&session="+ this.$store.state.token;
                        //console.log(url);
                        this.$http.get(url).then(result=>{
                            if(result.status==200){
                                if(result.data.bStatus){
                                    this.loadplatforms(list,"bianji",this.editindex)
                                }else{
                                    console.log("添加失败")
                                }
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
            console.log("form",editform)
            
            
        },
        platformyes(){
            this.dialogFormVisible=false;
            
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
            console.log(form);
            var url = root + "/api/v1/AddGbPlatform?name="
            +encodeURIComponent(form.name)+
            "&token="+encodeURIComponent(form.Token)+
            "&localport="+encodeURIComponent(form.nGbLocalPort)+
            "&gbid="+encodeURIComponent(form.strGbID)+
            "&gbserverid="+encodeURIComponent(form.strGbServerID)+
            "&gbdomain="+encodeURIComponent(form.strGbDomain)+
            "&gbserverpw="+encodeURIComponent(form.strGbServerPassword)+
            "&gbproto="+encodeURIComponent(form.strGbProto)+
            "&gbserverip="+encodeURIComponent(form.strGbServerIpAddr)+
            "&gbserverport="+encodeURIComponent(form.nGbServerPort)+
            "&gbidchbase="+encodeURIComponent(form.strGbIDChBase)+
            "&registerperiod="+encodeURIComponent(form.nGbRegisterPeriod)+
            "&keepalivetime="+encodeURIComponent(form.nGbKeepaliveTime)+
            "&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    console.log(result.data);
                    if(result.data.bStatus){
                        this.reload();
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
                `${this.$t("message.GB.Name")}: ${row.name}<br>
                Token: ${row.Token}<br>
                ${this.$t("message.GB.SIPServerIP")}: ${row.strGbServerIpAddr }<br>
                ${this.$t("message.GB.SIPServerPort")}: ${row.nGbServerPort }<br>
                ${this.$t("message.GB.SIPPort")}: ${row.nGbLocalPort  }<br>
                ${this.$t("message.GB.SIPUserID")}: ${row.strGbID }<br>
                ${this.$t("message.GB.SIPServerID")}: ${row.strGbServerID }<br>
                ${this.$t("message.GB.Domain")}: ${row.strGbDomain }<br>
                ${this.$t("message.GB.Password")}: ${row.strGbServerPassword }<br>
                ${this.$t("message.GB.SIPProtocol")}: ${row.strGbProto  }<br>
                ${this.$t("message.GB.SIPChannelBaseID")}: ${row.strGbIDChBase }<br>
                ${this.$t("message.GB.RegisterPeriod")}: ${row.nGbRegisterPeriod }<br>
                ${this.$t("message.GB.KeepaliveTime")}: ${row.nGbKeepaliveTime }<br>
                `
            })
        },
        handleEdit(index,row){
            //console.log(index);
            this.editPopup = true;
            this.edittoken=row.Token;
            console.log("序列号",((this.currentPage-1)*10)+index);
            var index_xlh=((this.currentPage-1)*10)+index;
            this.editindex=index_xlh;

            this.editform["name"]=row.name;
            this.editform["index"]=row.index;
            this.editform["Token"]=row.Token;
            this.editform["strGbServerIpAddr"]=row.strGbServerIpAddr;
            this.editform["nGbServerPort"]=row.nGbServerPort;
            this.editform["strGbID"]=row.strGbID;
            this.editform["strGbServerID"]=row.strGbServerID;
            this.editform["strGbProto"]=row.strGbProto;
            this.editform["strGbDomain"]=row.strGbDomain;
            this.editform["strGbServerPassword"]=row.strGbServerPassword;
            this.editform["strGbIDChBase"]=row.strGbIDChBase;
            this.editform["nGbKeepaliveTime"]=row.nGbKeepaliveTime;
            this.editform["nGbRegisterPeriod"]=row.nGbRegisterPeriod;
            this.editform["nGbLocalPort"]=row.nGbLocalPort;
            console.log(this.editform)
            // console.log(this.tableData[index])
            
            
            
        },
        //删除
        deleteRow(index, row,rows) {
            //var form=this.form;
            // console.log(row,index,rows,this.currentPage);
            console.log("序列号",((this.currentPage-1)*10)+index);
            var index_xlh=((this.currentPage-1)*10)+index;
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
            var url = root + "/api/v1/DelGbPlatform?token="+encodeURIComponent(row.Token)+"&session="+ this.$store.state.token;
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
                var url = root + "/api/v1/DelGbPlatform?token="+encodeURIComponent(token[i].token)+"&session="+ this.$store.state.token;
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