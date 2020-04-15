<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog close="dialog" :title="label.Edit" :visible.sync="editPopup">
            <!-- 1 -->
            <el-form label-position="right" label-width="160px" :model="editform" v-if="form.switch=='first'">
                <el-form-item :label="label.user">
                    <input disabled class="editinput" v-model="editform.strUser"/>
                </el-form-item>
                <el-form-item :label="label.olPassword">
                    <input class="editinput" v-model="editform.strPasswd"/>
                </el-form-item>
                <el-form-item :label="label.nePassword">
                    <input class="editinput" v-model="editform.Newpassword"/>
                </el-form-item>
                <el-form-item :label="label.confirmpass1">
                    <input class="editinput" v-model="editform.Newpassword1"/>
                </el-form-item>
            </el-form>
            <!-- 2 -->
            <el-form label-position="right" label-width="140px" :model="editform" v-if="form.switch!='first'">
                <div class="tree_flex">
                    <div class="ed_tree">
                        <el-tree
                            :data="camdata" 
                            show-checkbox
                            :check-strictly="true"
                            ref="tree">
                            <span slot-scope="{ node, data }" style="width:100%;">
                                    <div style="width:100%;display: flex;justify-content: space-between;">
                                        <span >
                                            <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                        </span>
                                    </div>
                                </span>
                        </el-tree>
                    </div>
                    <div class="tow_node_root">
                            <div>
                                <!-- 按钮  -->
                                <el-button class="button_addpv" @click="edaddcam" type="success" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                            </div>
                            <div>
                                <el-button class="button_addpv" @click="eddlcam" type="success" round size="mini">{{$t("message.setting.DeleteAll")}}</el-button>
                            </div>
                        </div>
                    <div class="ed_tree">
                        <!--  show-checkbox :check-strictly="true" -->
                        <el-tree
                            :data="camroledata" 
                            show-checkbox
                            :check-strictly="true"
                            :props="defaultrole"
                            ref="tree1">
                            <span slot-scope="{ node, data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span >
                                        <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strRoleToken}}</span>
                                    </span>
                                </div>
                            </span>
                        </el-tree>
                    </div>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="edityes" v-if="form.switch=='first'">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        
        <el-dialog :title="eltitle" :visible.sync="dialogFormVisible">
            <!-- 1 -->
            <el-form label-position="right" label-width="160px" :model="form"  v-if="form.switch=='first'">
                <el-form-item :label="label.user">
                    <input class="editinput" v-model="form.strUser"/>
                </el-form-item>
                <el-form-item :label="label.Password">
                    <input class="editinput" v-model="form.strPasswd"/>
                </el-form-item>
                <el-form-item :label="label.confirmpass">
                    <input class="editinput" v-model="form.strPasswd1"/>
                </el-form-item>
                <!-- <el-form-item :label="label.role">
                    <input class="editinput" v-model="form.strRoleToken"/>
                </el-form-item> -->
                <el-form-item :label="label.role">
                    <el-select v-model="form.strRoleToken" placeholder="请选择">
                        <el-option
                            v-for="item in Role"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 2 -->
            <el-form label-position="right" label-width="140px" :model="form"  v-if="form.switch!='first'">
                <el-form-item :label="label.user" class="role">
                    <input class="editinput" v-model="form.strRoleToken"/>
                </el-form-item>
                <el-form-item label-width="160px" :label="label.Videoroot" class="role">

                </el-form-item>
                <div class="el_tree">
                    <el-tree
                        :data="camdata" 
                        show-checkbox
                        :check-strictly="true"
                        ref="tree">
                        <span slot-scope="{ node, data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span >
                                        <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                    </span>
                                </div>
                            </span>
                    </el-tree>
                </div>
                <el-form-item :label="label.operroot">
                    <el-select v-model="form.strRole" placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button type="primary" @click="platformyes"  v-if="form.switch=='first'">{{$t("message.setting.OK")}}</el-button>
                <el-button type="primary" @click="platformyes1" v-if="form.switch!='first'">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" type="border-card" max-height="850" @tab-click="removeTab">
            <!-- 1 -->
            <el-tab-pane :label="label.label" name="first">
                 <!-- 表格 -->
                 <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                <el-table
                    :data="tableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    highlight-current-row
                    @select='selectCall'
                    @select-all='select_Call'
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                    type="index"
                    width="70">
                    </el-table-column>
                    <el-table-column
                    prop="strUser"
                    :label="label.label2"
                    min-width="30">
                    </el-table-column>
                    <el-table-column
                    prop="strRole"
                    :label="label.label3"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                        min-width="50"
                        fixed="right"
                        :label="label.label4">
                        <template slot="header" slot-scope="scope">
                            <el-input
                            v-model="search"
                            @change="handlechange(scope.$index,scope.row)"
                            size="mini"
                            placeholder="输入关键字"/>
                        </template>
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Detail")}}</el-button>
                            <!-- <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.edit")}}</el-button> -->
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Change")}}</el-button>
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
            </el-tab-pane>
            <!-- 2 -->
             <el-tab-pane :label="label.label_role" name="role">
                 <!-- 表格 -->
                 <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                <el-table
                    @select='selectCall'
                    @select-all='select_Call'
                    :data="tableData1.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    prop="strRoleToken"
                    :label="label.roleuser"
                    min-width="30">
                    </el-table-column>
                    <el-table-column
                    prop="bConfig"
                    :label="label.Confroot"
                    min-width="50">
                    </el-table-column>
                    <el-table-column
                    prop="bOperate"
                    :label="label.operroot"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                        min-width="50"
                        class="size"
                        fixed="right">
                        <template slot-scope="scope">
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
            <!-- 3 -->
            <el-tab-pane :label="label.label_system" name="system">
                <div>
                    {{$t("message.setting.Watchvideo")}}
                </div>
                <el-switch
                    @change="anonymoued"
                    v-model="anonymous"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </el-tab-pane>
            
        </el-tabs>
        
    </div>
</template>
<script>
import * as types from '@/store/types'
import uuid from '@/store/uuid'
import '@/assets/jQuery.md5.js'
  export default {
    inject:["reload"],
    data() {
        return {
            camdata:this.regionaldata.regionaldata,
            camroledata:[],
            eltitle:this.$t("message.setting.Configuration"),
            anonymous:false,//匿名
            search: '',//搜索
            activeName: 'first',
            tabPosition: 'button',//选项卡位置
            inputedit:[],
            label:{
                Edit:this.$t("message.table.Edit"),

                label:this.$t("message.setting.user"),//选1
                label_role:this.$t("message.setting.Rolemanagement"),//选1
                label_system:this.$t("message.setting.SystemManagement"),//选1

                user:this.$t("message.setting.username"),
                Password:this.$t("message.setting.password"),
                role:this.$t("message.setting.role"),
                type:this.$t("message.setting.Authority"),
                olPassword:this.$t("message.setting.currentpass"),
                nePassword:this.$t("message.setting.newpass"),
                confirmpass:this.$t("message.setting.confirmpassword"),
                confirmpass1:this.$t("message.setting.confirmpass"),

                roleuser:this.$t("message.setting.RoleName"),
                Confroot:this.$t("message.setting.Configure"),
                operroot:this.$t("message.setting.Operation"),
                Videoroot:this.$t("message.setting.Camera"),

                label2:this.$t("message.setting.user"),
                label3:this.$t("message.setting.role"),
                label4:this.$t("message.setting.action"),

                label5:this.$t("message.setting.name"),
                label6:this.$t("message.setting.currentpass"),
                label7:this.$t("message.setting.newpass"),
                label8:this.$t("message.setting.confirmpass"),
            },
            options: [{
                    value: 'Administrator',
                    label: 'Administrator'
                }, {
                    value: 'Operator',
                    label: 'Operator'
                }
            ],
            Role:[],
            defaultrole:{
                children: 'cam',
                label: 'strRoleToken',
            },
            defaultProps: {
                children: 'node',
                label: 'strName',
                cam:"cam",
            },
            //分页
            pageSize: 10,//一页数量
            dialogFormVisible: false,//添加弹窗
            editPopup:false,//编辑弹窗
            form: {
                switch:"first",
                strUser:"Operator",
                strPasswd: "12345",
                strPasswd1:"12345",
                strUserType: "Operator",
                
                strRole:"Administrator",
                strRoleToken:"Administrator",

            },
            editform: {
                strUser:"",
                strPasswd: "",
                strUserType: "",
                Newpassword:"",
                Newpassword1:"",
            },
            edittoken:"",//编辑时要删除的token
            editindex:"",//编辑时所在索引
            
            tableData: [],//1
            currentPage: 1, // 当前页码
            total: 0, // 总条数 1

            tableData1: [],
            currentPage1: 1, // 当前页码
            total1: 0, // 总条数 1
            selectop:[],//选择那几个
        };
    },
    mounted(){
        this.usesre();
        this.rolesre();
    },
    methods:{
        // 第一个表格列表
        usesre(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url1 = root + "/api/v1/GetUserList?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                // console.log("***",result);
                if(result.status==200){
                    this.tableData=result.data.users;
                }
            })
        },
        // 第二个表格列表
        rolesre(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url1 = root + "/api/v1/GetRoleList?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                // console.log("***",result);
                if(result.status==200){
                    // this.tableData2=result.data.users;
                    this.tableData1=[];
                    var data=result.data.roles;
                    for(var i=0;i<data.length;i++){
                        var datasrc={
                            strRoleToken:data[i].strRoleToken,
                            bConfig:data[i].permission.bConfig+"",
                            bOperate:data[i].permission.bOperate+"",
                        }
                        // console.log("**--*",datasrc);
                        var Role={
                            value: data[i].strRoleToken,
                            label: data[i].strRoleToken
                        }
                        this.Role.push(Role);
                        this.tableData1.push(datasrc);
                    }
                }
            })
        },

        addto(){
            this.dialogFormVisible=true;
        },
        //点击删除
        deleteselect() {
            var selectop=this.selectop;
            var form=this.form;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if(this.form.switch=="first"){
                console.log("1")
                for(var i=0;i<selectop.length;i++){
                    var url = root + "/api/v1/DeleteUser?user="+selectop[i].strUser+"&session="+ this.$store.state.token;
                    this.$http.get(url).then(result=>{
                        if(result.status==200){
                            if(result.data.bStatus==true){
                                this.tableData=[];
                                this.usesre();
                            }else{
                                this.$message({
                                    message: "删除失败",
                                    type: 'warning'
                                });
                                return false;
                            }
                        }
                    })
                }
            }else{
                for(var i=0;i<selectop.length;i++){
                    var url = root + "/api/v1/DeleteRole?roletoken="+selectop[i].strRoleToken+"&session="+ this.$store.state.token;
                    this.$http.get(url).then(result=>{
                        if(result.status==200){
                            if(result.data.bStatus==true){
                                this.tableData1=[];
                                this.rolesre();
                            }else{
                                this.$message({
                                    message: "删除失败",
                                    type: 'warning'
                                });
                                return false;
                            }
                        }
                    })
                }
            }
        },
        // 详情
        handleClick(index,row){
           //console.log(row,index,this.tableData);
           this.$Modal.info({
                title: '详情',
                content: 
                `${this.label.user}: ${row.strUser}<br>
                ${this.label.role}: ${row.strRole}<br>`
            })
        },
        //  编辑  添加 的确定键
        edityes(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var form=this.editform;
            if( form.Newpassword!==form.Newpassword1){
                this.$message(this.$t("message.setting.Twopassword"));
                return false;
            }
            // console.log(form)
            // return false;
            this.editPopup = false;
            var url1 = root + "/api/v1/UpdateUser?user="+form.strUser+"&oldpassword="+$.md5(form.strPasswd)+"&newpassword="+$.md5(form.Newpassword)+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                console.log("1",result,url1);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.$router.push({ path:'../../login'})
                        this.$store.commit(types.LOGOUT);
                        this.$message(this.$t("message.setting.Changecg"));
                    }else{
                        this.$message(this.$t("message.setting.Changesb"));
                    }
                    
                }
            })
        },
        platformyes1(){
            var tokencheked=this.$refs.tree.getCheckedNodes();
            // console.log(tokencheked)
            // return false;
            this.dialogFormVisible=false;
            var form=this.form;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/CreateRole?roletoken="+form.strRoleToken+"&role="+form.strRole+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                // console.log("***",result,form,url);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.tableData1=[];
                        this.rolesre();
                        for(var i=0 ;i<tokencheked.length;i++){
                            this.addcam(tokencheked[i].token,form.strRoleToken,tokencheked[i].label);
                        }
                    }else{
                        this.$message({
                            message: "添加失败",
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        edaddcam(){
            var tokencheked=this.$refs.tree.getCheckedNodes();
            var tokencheked1=this.$refs.tree1.getCheckedNodes();
            console.log(tokencheked,tokencheked1)
            // return false;
            for(var i=0 ;i<tokencheked.length;i++){
                for(var l=0 ;l<tokencheked1.length;l++){
                    this.addcam(tokencheked[i].token,tokencheked1[l].strRoleToken,tokencheked[i].label);
                }
            }
        },
        addcam(token,roletoken,name){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            console.log(token,roletoken,name);
            // return false;
            var url = root + "/api/v1/AddCamToRole?roletoken="+roletoken+"&camtoken="+token+"&cam="+name+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status==200){
                    if(result.data.bStatus==true){
                        // this.editPopup=false
                        var cam={
                            strRoleToken:name,
                            strCamName:token,
                        }
                        if(this.camroledata.length!=0){
                            this.camroledata[0].cam.push(cam)
                        }
                        
                    }else{
                        this.$message({
                            message: "摄像机"+name+"添加失败",
                            type: 'warning'
                        });
                        // return false;
                    }
                }
            })
        },
        
        platformyes(){
            var form=this.form;
            // console.log(form);
            // return false;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if( form.strPasswd1!==form.strPasswd){
                this.$message(this.$t("message.setting.Twopassword"));
                return false;
            }
            if( form.strPasswd==""&&form.strPasswd1==""){
                this.$message(this.$t("message.setting.Creationfailed"));
                return false;
            }
            this.dialogFormVisible=false;
            // console.log(form.strPasswd,$.md5(form.strPasswd))
            var url = root + "/api/v1/CreateUser?user="+form.strUser+"&password="+$.md5(form.strPasswd)+"&roletoken="+form.strRoleToken+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                // console.log("***",result,form,url);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.usesre();
                    }else{
                        this.$message({
                            message: this.$t("message.setting.Creationfailed"),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        //编辑
        handleEdit(index,row){
            // console.log(row)
            this.editPopup = true;
            this.editindex=index;
            this.editform["strUser"]=row.strUser;
            this.editform["strUserType"]=row.strUserType;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            this.camroledata=[];
            if(this.form.switch!='first'){
                var url = root + "/api/v1/GetRoleInfo?roletoken="+row.strRoleToken+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    if(result.status==200){
                        var data=result.data;
                        var roledata={
                                strRoleToken:data.strRoleToken,
                                strRole: data.strRole,
                                cam:[]
                            }
                        var camdata=data.cams;
                        for(var l=0; l<camdata.length;l++){
                            var camrole={
                                strRoleToken:data.cams[l].strCamName,
                                strCamName:data.cams[l].strCamToken,
                            }
                            roledata.cam.push(camrole);
                        }
                        this.camroledata.push(roledata);
                    }
                })
            }

        },
        //删除摄像机
        eddlcam(){
            var tokencheked=this.$refs.tree1.getCheckedNodes();
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            
            var camdata=this.camroledata[0].cam;
            for(var i=1;i<tokencheked.length;i++){
                for(var l=0 ; l<camdata.length;l++){
                    if(tokencheked[i].strCamName==camdata[l].strCamName){
                        camdata.splice(l,1);
                        var url = root + "/api/v1/DelCamInRole?roletoken="+tokencheked[0].strRoleToken+"&camtoken="+tokencheked[i].strCamName+"&session="+ this.$store.state.token;
                        this.$http.get(url).then(result=>{
                            if(result.status==200){
                                if(result.data.bStatus==true){
                                    // this.editPopup=false
                                }else{
                                    this.$message({
                                        message: tokencheked[i].strRoleToken,
                                        type: 'warning'
                                    });
                                    // return false;
                                }
                            }
                        })
                    }
                }
            }

        },
        // 是否匿名浏览
        anonymou(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url1 = root + "/api/v1/GetAnonymousView?session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                if(result.status==200){
                    this.anonymous=result.data.bAnonymousView
                }
            })
        },
        anonymoued(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }console.log(this.anonymous)
            // return false
            var url1 = root + "/api/v1/SetAnonymousView?enable="+this.anonymous+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                if(result.status==200){
                    this.anonymou();
                }
            })
        },
        // 选中函数
        selectCall(row){
            // console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                // console.log(row[i].Token)
                var selectop={
                    strUser:row[i].strUser,
                    strPasswd:row[i].strPasswd,
                    strUserType:row[i].strUserType,
                    strRoleToken:row[i].strRoleToken
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            // console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                console.log(row[i].Token)
                var selectop={
                    strUser:row[i].strUser,
                    strPasswd:row[i].strPasswd,
                    strUserType:row[i].strUserType,
                    strRoleToken:row[i].strRoleToken
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
        removeTab(targetName) {
            console.log(targetName.name);
            this.form.switch=targetName.name
            if(targetName.name=="first"){
                console.log(targetName.name,"1514515151");
                this.Role=[];
                this.tableData1=[];
                this.rolesre();
            }
            if(targetName.name=="system"){
                this.anonymou();
            }
        },
        handlechange(){},
    },
  };
</script>
<style scoped>
.el-table>>> .size{
    font-weight: 700;
}
/* 编辑   的 两个按钮 */
.ed_tree{
    width: 40%;
    height: 280px;
    overflow: scroll;
    border-radius: 4px;
    border:1px solid #DCDFE6;
    padding: 10px;
    margin-bottom: 20px;
}
.ed_tree::-webkit-scrollbar{
    display: none;
}
.tow_node_root div{
    margin-bottom: 25px;
}
.tree_flex{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.button_addpv{
    background: #65BAA5;
}


.el-tree{
    margin: 0;
}
.el_tree{
    width: 78%;
    margin-left: 22%;
    height: 200px;
    overflow: scroll;
    border-radius: 4px;
    border:1px solid #DCDFE6;
    padding: 10px;
    margin-bottom: 20px;
}
.el_tree::-webkit-scrollbar{
    display: none;
}
.role{
    margin: 0;
}

  .el-dialog__wrapper>>> .el-dialog {
    width: 35%;
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
 /* .el-table >>> .cell{
      color: #000!important;font-weight: 700!important;
  } */
</style>
