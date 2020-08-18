<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog :title="label.Edit" :visible.sync="editPopup">
            <!-- 1 -->
            <el-form v-if="editform.Type=='cloudmode'" label-position="right" label-width="140px" :model="editform">
                <el-form-item :label="label.Enable">
                    <el-select v-model="editform.bCloudMode" :placeholder="label.pleasechoose">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.MinPort">
                    <el-input v-model="editform.iPortRangeMin"></el-input>
                </el-form-item>
                <el-form-item :label="label.MaxPort">
                    <el-input v-model="editform.iPortRangeMax"></el-input>
                </el-form-item>
                <el-form-item :label="label.PublicIP">
                    <el-input v-model="editform.strCloudPublicIp"></el-input>
                </el-form-item>
            </el-form>
            <!-- 2 -->
            <el-form v-if="editform.Type=='Forwardingmode'" label-position="right" label-width="140px" :model="editform">
                <el-form-item :label="label.Enable">
                    <el-select v-model="editform.bRelayMode" :placeholder="label.pleasechoose">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.IP">
                    <el-input v-model="editform.strRelayPublicIp"></el-input>
                </el-form-item>
                <el-form-item :label="label.Port">
                    <el-input v-model="editform.nRelayPublicPort"></el-input>
                </el-form-item>
                <el-form-item :label="label.user">
                    <el-input v-model="editform.strRelayUser"></el-input>
                </el-form-item>
                <el-form-item :label="label.Password">
                    <el-input v-model="editform.strRelayPasswd"></el-input>
                </el-form-item>
                <el-form-item :label="label.PasswordEncrypt">
                    <el-input disabled v-model="editform.bRelayPasswdEncrypt"></el-input>
                </el-form-item>
            </el-form>
            <!-- 3 -->
            <el-form v-if="editform.Type=='turnmode'" label-position="right" label-width="140px" :model="editform">
                <el-form-item :label="label.Enable">
                    <el-select v-model="editform.bTurnServer" :placeholder="label.pleasechoose">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="label.IP">
                    <el-input v-model="editform.strTurnServerIp"></el-input>
                </el-form-item>
                <el-form-item :label="label.Port">
                    <el-input v-model="editform.nTurnServerPort"></el-input>
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
            
             <el-tab-pane :label="label.CloudMode" name="cloudmode">
                <!-- 表格 -->
                <el-table
                    :data="tableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                    style="width: 100%">
                    <el-table-column
                        prop="bCloudMode"
                        :label="label.Enable"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="strCloudPublicIp"
                    :label="label.PublicIP">
                    </el-table-column>
                    <el-table-column
                    prop="iPortRangeMin"
                    :label="label.MinPort"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="iPortRangeMax"
                    :label="label.MaxPort"
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
                            :placeholder="label.Enterkeywords"/>
                        </template>
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button> -->
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
            <el-tab-pane :label="label.RelayMode" name="Forwardingmode">
                <!-- 表格 -->
                <el-table
                    :data="tableData2.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage2-1)*pageSize,currentPage2*pageSize)"
                    style="width: 100%">
                    <el-table-column
                        prop="bRelayMode"
                        :label="label.Enable"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="strRelayPublicIp"
                    :label="label.IP">
                    </el-table-column>
                    <el-table-column
                    prop="nRelayPublicPort"
                    :label="label.Port"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="strRelayUser"
                    :label="label.user"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="strRelayPasswd"
                    :label="label.Password"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="bRelayPasswdEncrypt"
                    :label="label.PasswordEncrypt"
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
                            :placeholder="label.Enterkeywords"/>
                        </template>
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button> -->
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout="prev, pager, next"
                    @size-change="handleSizeChange2" 
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :total="total2">
                </el-pagination>
            </el-tab-pane>
            <!-- 3 -->
            <el-tab-pane :label="label.TURNServer" name="turnmode">
                <!-- 表格 -->
                <el-table
                    :data="tableData3.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage3-1)*pageSize,currentPage3*pageSize)"
                    style="width: 100%">
                    <el-table-column
                        prop="bTurnServer"
                        :label="label.Enable"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="strTurnServerIp"
                    :label="label.IP">
                    </el-table-column>
                    <el-table-column
                    prop="nTurnServerPort"
                    :label="label.Port"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        min-width="140">
                        <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="search"
                            @change="handlechange(scope.$index,scope.row)"
                            size="mini"
                            :placeholder="label.Enterkeywords"/>
                        </template>
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button> -->
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout="prev, pager, next"
                    @size-change="handleSizeChange3" 
                    @current-change="handleCurrentChange3"
                    :current-page="currentPage3"
                    :total="total3">
                </el-pagination>
            </el-tab-pane>
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
        activeName: 'cloudmode',
        tabPosition: 'button',//选项卡位置
        inputedit:[],
        label:{
            Enterkeywords:this.$t("message.table.Enterkeywords"),
            pleasechoose:this.$t("message.table.pleasechoose"),
            CloudMode:this.$t("message.setting.CloudMode"),
            RelayMode:this.$t("message.setting.RelayMode"),
            TURNServer:this.$t("message.setting.TURNServer"),

            PublicIP:this.$t("message.setting.PublicIP"),
            MinPort:this.$t("message.setting.MinPort"),
            MaxPort:this.$t("message.setting.MaxPort"),
            Password:this.$t("message.setting.password"),
            PasswordEncrypt:this.$t("message.setting.PasswordEncrypt"),
            Enable:this.$t("message.setting.Enable"),
            user:this.$t("message.setting.user"),
            Port:this.$t("message.table.Port"),
            IP:this.$t("message.table.IP"),
            Edit:this.$t("message.table.Edit")
        },
        //分页
        editform: {
            Type:"cloudmode",
            bCloudMode:"",
            strCloudPublicIp:"",
            iPortRangeMin:"",
            iPortRangeMax:"",

            bRelayMode:"",
            strRelayPublicIp:"",
            nRelayPublicPort:"",
            strRelayUser:"",
            strRelayPasswd:"",
            strCloudPort:"",
            bRelayPasswdEncrypt:"",

            bTurnServer:"",
            strTurnServerIp:"",
            nTurnServerPort:""
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

        tableData3: [],//2
        total3: 0, // 总条数 2
        currentPage3: 1, // 当前页码2
        editpasswd:""//编辑的密码
      };
    },
    mounted(){
        this.loadCloud();
        // this.loadRelay();
        // this.loadTurn();
    },
    methods:{
        loadCloud(){
            this.editPopup = false;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetRTCCloudModeInfo?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                // console.log(result)
                // return false;
                if(result.status == 200){
                    var itme=result.data;
                    var tabledata={
                        bCloudMode: itme.bCloudMode+"",
                        strCloudPublicIp:itme.strCloudPublicIp,
                        iPortRangeMin:itme.iPortRangeMin,
                        iPortRangeMax:itme.iPortRangeMax
                    };
                    // console.log(tabledata)
                    this.tableData.push(tabledata);
                    this.total1=this.tableData.length;
                }
            })
        },
        loadRelay(){
            this.editPopup = false;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetRTCRelayModeInfo?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                // console.log(result)
                // return false;
                if(result.status == 200){
                    var itme=result.data;
                    var tabledata={
                        bRelayMode: itme.bRelayMode+"",
                        strRelayPublicIp:itme.strRelayPublicIp,
                        nRelayPublicPort:itme.nRelayPublicPort,
                        strRelayUser:itme.strRelayUser,
                        strRelayPasswd:itme.strRelayPasswd,
                        bRelayPasswdEncrypt:itme.bRelayPasswdEncrypt+""
                    };
                    // console.log(tabledata)
                    this.tableData2.push(tabledata);
                    this.total2=this.tableData2.length;
                }
            })
        },
        loadTurn(){
            this.editPopup = false;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetRTCTurnServerInfo?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                // console.log(result)
                // return false;
                if(result.status == 200){
                    var itme=result.data;
                    var tabledata={
                        bTurnServer: itme.bTurnServer+"",
                        strTurnServerIp:itme.strTurnServerIp,
                        nTurnServerPort:itme.nTurnServerPort
                    };
                    // console.log(tabledata)
                    this.tableData3.push(tabledata);
                    this.total3=this.tableData3.length;
                }
            })
        },
        // 编辑
        handleEdit(index,row){
            
            // console.log(row.bCloudMode);
            // return false
            this.editPopup = true;
            this.editform["bCloudMode"] = row.bCloudMode;
            this.editform["iPortRangeMax"] = row.iPortRangeMax;
            this.editform["iPortRangeMin"] = row.iPortRangeMin;
            this.editform["strCloudPublicIp"] = row.strCloudPublicIp;

            this.editform["bRelayMode"] = row.bRelayMode;
            this.editform["strRelayPublicIp"] = row.strRelayPublicIp;
            this.editform["nRelayPublicPort"] = row.nRelayPublicPort;
            this.editform["strRelayUser"] = row.strRelayUser;
            this.editform["strRelayPasswd"] = row.strRelayPasswd;
            this.editform["bRelayPasswdEncrypt"] = row.bRelayPasswdEncrypt;

            this.editform["bTurnServer"] = row.bTurnServer;
            this.editform["strTurnServerIp"] = row.strTurnServerIp;
            this.editform["nTurnServerPort"] = row.nTurnServerPort;
            // this.editpasswd = row.strPasswd;
            // console.log(this.editform);
            // console.log(this.tableData[index])
        },
        //  编辑 的确定键
        proedityes(){
            var form=this.editform;
    
            // console.log("默认",this.editpasswd,form.strPasswd);
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if(form.Type=='cloudmode'){
                var url = root + "/api/v1/SetRTCCloudModeInfo?cloudmode="+encodeURIComponent(form.bCloudMode)+
                "&cloudpublicip="+encodeURIComponent(form.strCloudPublicIp)+
                "&portrangemin="+encodeURIComponent(form.iPortRangeMin)+
                "&portrangemax="+encodeURIComponent(form.iPortRangeMax)+
                "&session="+ this.$store.state.token;
                // console.log("cloudmode",url);
                // return false
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.editPopup = false;
                            this.tableData=[];
                            this.loadCloud();
                            this.$root.bus.$emit('webrtc',true);
                        }else{
                            this.$message({
                                message:this.$t("message.setting.Editorfailure") ,
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })

            }else if(form.Type=='Forwardingmode'){
                var url = root + "/api/v1/SetRTCRelayModeInfo?relaymode="+encodeURIComponent(form.bRelayMode)+
                "&relaypublicip="+encodeURIComponent(form.strRelayPublicIp)+
                "&relaypublicport="+encodeURIComponent(form.nRelayPublicPort)+
                "&relayuser="+encodeURIComponent(form.strRelayUser)+
                "&relaypasswd="+encodeURIComponent(form.strRelayPasswd)+
                "&relaypasswdencrypt="+encodeURIComponent(form.bRelayPasswdEncrypt)+
                "&session="+ this.$store.state.token;
                // console.log("Forwardingmode",url);
                // return false
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.editPopup = false;
                            this.tableData2=[];
                            this.loadRelay();
                            this.$root.bus.$emit('webrtc',true);
                        }else{
                            this.$message({
                                message:this.$t("message.setting.Editorfailure") ,
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }else if(form.Type=='turnmode'){
                var url = root + "/api/v1/SetRTCTurnServerInfo?turnserver="+encodeURIComponent(form.bTurnServer)+
                "&turnserverip="+encodeURIComponent(form.strTurnServerIp)+
                "&turnserverport="+encodeURIComponent(form.nTurnServerPort)+
                "&session="+ this.$store.state.token;
                // console.log("turnmode",url);
                // return false
                this.$http.get(url).then(result=>{
                    console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.editPopup = false;
                            this.tableData3=[];
                            this.loadTurn();
                            this.$root.bus.$emit('webrtc',true);
                        }else{
                            this.$message({
                                message:this.$t("message.setting.Editorfailure") ,
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
            }
            
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
            this.editform.Type=targetName.name;
            console.log(this.editform.Type);
            if(targetName.name=='cloudmode'){
                this.tableData=[];
                this.loadCloud();
            }else if(targetName.name=='Forwardingmode'){
                this.tableData2=[];
                this.loadRelay();
            }else if(targetName.name=='turnmode'){
                this.tableData3=[];
                this.loadTurn();
            }
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
        },
        handleSizeChange2(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage2 = 1;
            this.pageSize = val;
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
            this.currentPage2 = val;
        },
        handleSizeChange3(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage3 = 1;
            this.pageSize = val;
        },
        handleCurrentChange3(val) {
            console.log(`当前页: ${val}`);
            this.currentPage3 = val;
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