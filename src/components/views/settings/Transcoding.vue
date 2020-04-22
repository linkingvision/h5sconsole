<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog title="编辑" :visible.sync="editPopup">
            <el-form label-position="right" label-width="140px" :model="editform">
                <el-form-item :label="label.Name">
                    <el-input v-if="editform.Type=='Profile'||editform.Type=='自定义'" v-model="editform.strName" @input="change($event)"></el-input>
                    <el-input v-if="editform.Type=='Default'||editform.Type=='默认'" disabled v-model="editform.strName" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-if="editform.Type=='Profile'||editform.Type=='自定义'" v-model="editform.strToken" @input="change($event)"></el-input>
                    <el-input v-if="editform.Type=='Default'||editform.Type=='默认'" disabled v-model="editform.strToken" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item :label="label.Codec">
                    <el-input disabled v-model="editform.nCodec"></el-input>
                </el-form-item>
                <el-form-item :label="label.Engine">
                    <el-select v-model="editform.nEngine" placeholder="请选择" @input="change($event)">
                        <el-option
                            v-for="item in engine"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="editinput" v-model="form.nEngine"/> -->
                </el-form-item>
                <el-form-item label="Bitrate">
                    <el-input type="number" v-model="editform.nBitrate" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item :label="label.FPSType">
                    <el-select v-model="editform.nFPSType" placeholder="请选择" @input="change($event)">
                        <el-option
                            v-for="item in fpstype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="editinput" v-model="form.nFPSType"/> -->
                </el-form-item>
                <el-form-item label="FPS">
                    <el-input type="number" v-model="editform.nFPS" @input="change($event)"></el-input>
                </el-form-item>
                <el-form-item :label="label.ScaleType">
                    <el-select v-model="editform.nScaleType" placeholder="请选择" @input="change($event)">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="editinput" v-model="form.nScaleType"/> -->
                </el-form-item>
                <!-- v-if="form.Type!='H5_ONVIF'" -->
                <el-form-item label="Width*Height">
                    <el-select v-model="editform.wihe" placeholder="请选择" @input="change($event)">
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
                <el-button @click="editPopup = false">{{$t("message.setting.Cancel")}}</el-button>
                <el-button v-if="editform.Type=='Profile'||editform.Type=='自定义'" type="primary" @click="proedityes">{{$t("message.setting.OK")}}</el-button>
                <el-button v-if="editform.Type=='Default'||editform.Type=='默认'" type="primary" @click="defedityes">{{$t("message.setting.OK")}}</el-button>
            </div>
        </el-dialog>
         <!-- 添加的弹窗 -->
        <el-dialog :title="eltitle" :visible.sync="dialogFormVisible">
            <el-form label-position="right" label-width="140px" :model="form">
                <el-form-item :label="label.Name">
                    <el-input v-model="form.strName"></el-input>
                </el-form-item>
                <el-form-item :label="label.Token">
                    <el-input v-model="form.strToken"></el-input>
                </el-form-item>
                <el-form-item :label="label.Codec">
                    <el-input disabled v-model="form.nCodec"></el-input>
                </el-form-item>
                <el-form-item :label="label.Engine">
                    <el-select v-model="form.nEngine" placeholder="请选择">
                        <el-option
                            v-for="item in engine"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="editinput" v-model="form.nEngine"/> -->
                </el-form-item>
                <el-form-item label="Bitrate">
                    <el-input type="number" v-model="form.nBitrate"></el-input>
                </el-form-item>
                <el-form-item :label="label.FPSType">
                    <el-select v-model="form.nFPSType" placeholder="请选择">
                        <el-option
                            v-for="item in fpstype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="editinput" v-model="form.nFPSType"/> -->
                </el-form-item>
                <el-form-item label="FPS">
                    <el-input type="number" v-model="form.nFPS"></el-input>
                </el-form-item>
                <el-form-item :label="label.ScaleType">
                    <el-select v-model="form.nScaleType" placeholder="请选择">
                        <el-option
                            v-for="item in scaletype"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <input class="editinput" v-model="form.nScaleType"/> -->
                </el-form-item>
                <!-- v-if="form.Type!='H5_ONVIF'" -->
                <el-form-item label="Width*Height">
                    <el-select v-model="form.wihe" placeholder="请选择">
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
                <el-button type="primary" @click="platformyes">{{$t("message.setting.OK")}}</el-button>
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
                        prop="index"
                        :label="label.Index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                    prop="strName"
                    :label="label.Name">
                    </el-table-column>
                    <el-table-column
                    prop="strToken"
                    :label="label.Token"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="nCodec"
                    :label="label.Codec"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="nEngine"
                    :label="label.Engine"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="nFPSType"
                    :label="label.FPSType"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="nScaleType"
                    :label="label.ScaleType"
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
            <el-tab-pane :label="label.label1" name="Profile">
                <!-- 添加 -->
                <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                <!-- 表格 -->
                <el-table
                    :data="tableData2.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage2-1)*pageSize,currentPage2*pageSize)"
                    @select='selectCall'
                    @select-all='select_Call'
                    style="width: 100%">
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
                    prop="strName"
                    :label="label.Name">
                    </el-table-column>
                    <el-table-column
                    prop="strToken"
                    :label="label.Token"
                    min-width="80">
                    </el-table-column>
                    <el-table-column
                    prop="nCodec"
                    :label="label.Codec"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="nEngine"
                    :label="label.Engine"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="nFPSType"
                    :label="label.FPSType"
                    min-width="140">
                    </el-table-column>
                    <el-table-column
                    prop="nScaleType"
                    :label="label.ScaleType"
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
                            <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData2)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button>
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
            label:this.$t("message.setting.Default"),//选1
            label1:this.$t("message.setting.Profile"),//选2
            
            Index:this.$t("message.table.Index"),
            Name:this.$t("message.table.Name"),
            Token:this.$t("message.table.Token"),
            Codec:this.$t("message.table.Codec"),
            Engine:this.$t("message.table.Engine"),
            FPSType:this.$t("message.table.FPSType"),
            ScaleType:this.$t("message.table.ScaleType"),
        },
        //分页
        form: {
            Type:"Default",
            strName:"Profile1",
            strToken:"",
            nCodec:"H5_CODEC_H264",
            nEngine:"H5_SW_ONLY",
            nBitrate:"1024",
            nFPSType:"H5_FPS_AUTO",
            nFPS:"25",
            nScaleType:"H5_SCALE_AUTO",
            wihe:"1920*1080",
        },
        editform: {
            Type:"",
            strName:"",
            strToken:"",
            nCodec:"",
            nEngine:"",
            nBitrate:"",
            nFPSType:"",
            nFPS:"",
            nScaleType:"",
            wihe:"",
        },
        engine: [{
                value: 'H5_SW_ONLY',
                label: 'H5_SW_ONLY'
            }, {
                value: 'H5_GPU_INTEL',
                label: 'H5_GPU_INTEL'
            }, {
                value: 'H5_GPU_NVIDIA',
                label: 'H5_GPU_NVIDIA'
            }
        ],
        fpstype: [{
                value: 'H5_FPS_AUTO',
                label: 'H5_FPS_AUTO'
            }, {
                value: 'H5_FPS_FIXED',
                label: 'H5_FPS_FIXED'
            }, {
                value: 'H5_FPS_DYNAMIC',
                label: 'H5_FPS_DYNAMIC'
            }
        ],
        scaletype: [{
                value: 'H5_SCALE_AUTO',
                label: 'H5_SCALE_AUTO'
            }, {
                value: 'H5_SCALE_FIXED',
                label: 'H5_SCALE_FIXED'
            }, {
                value: 'H5_SCALE_DYNAMIC',
                label: 'H5_SCALE_DYNAMIC'
            }
        ],
        options: [{
                value: '1920*1080',
                label: '1920*1080'
            }, {
                value: '1280*720',
                label: '1280*720'
            }, {
                value: '704*576',
                label: '704*576'
            }, {
                value: '640*480',
                label: '640*480'
            }, {
                value: '320*240',
                label: '320*240'
            }
            
        ],
        
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//1
        currentPage1: 1, // 当前页码
        total1: 0, // 总条数 1

        tableData2: [],//2
        total2: 0, // 总条数 2
        currentPage2: 1, // 当前页码2
      };
    },
    mounted(){
        this.loadstream();
        this.loadstpro();
    },
    methods:{
        loadstream(){
            this.editPopup = false;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetTransProfileDefault?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
            //   return false;
              if(result.status == 200){
                  var itme=result.data.profile;
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          strName:itme[i].strName,
                          strToken:itme[i].strToken,
                          nCodec:itme[i].nCodec,
                          nEngine:itme[i].nEngine,
                          nBitrate:itme[i].nBitrate,
                          nFPSType:itme[i].nFPSType,
                          nFPS :itme[i].nFPS,
                          nScaleType:itme[i].nScaleType,
                          nWidth:itme[i].nWidth,
                          nHeight:itme[i].nHeight,
                      };
                      this.tableData.push(tabledata);
                      
                  }
                  this.total1=this.tableData.length;
              }
            })
        },
        loadstpro(){
            this.editPopup = false;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetTransProfile?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
            //   return false;
              if(result.status == 200){
                  var itme=result.data.profile;
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          index:i+1,
                          strName:itme[i].strName,
                          strToken:itme[i].strToken,
                          nCodec:itme[i].nCodec,
                          nEngine:itme[i].nEngine,
                          nBitrate:itme[i].nBitrate,
                          nFPSType:itme[i].nFPSType,
                          nFPS :itme[i].nFPS,
                          nScaleType:itme[i].nScaleType,
                          nWidth:itme[i].nWidth,
                          nHeight:itme[i].nHeight,
                      };
                      this.tableData2.push(tabledata);
                      
                  }
                  this.total2=this.tableData2.length;
              }
            })
        },
        //查看  编辑
        handleClick(index,row){
           console.log(row,index,this.tableData);
            this.$Modal.info({
                title: '详情',
                content: 
                `strName: ${row.strName}<br>
                strToken: ${row.strToken}<br>
                Codec: ${row.nCodec}<br>
                Engine: ${row.nEngine}<br>
                Bitrate: ${row.nBitrate}<br>
                FPSType: ${row.nFPSType}<br>
                FPS: ${row.nFPS}<br>
                ScaleType: ${row.nScaleType}<br>
                Width: ${row.nWidth}<br>
                Height: ${row.nHeight}<br>
                `
            })
        },
        handleEdit(index,row){
            var index_xlh=((this.currentPage1-1)*10)+index;
            //return false;
            if(this.form.Type=="Default"){
                index_xlh=((this.currentPage1-1)*10)+index;
            }else if(this.form.Type=="Profile"){
                index_xlh=((this.currentPage2-1)*10)+index;
            }
            this.editPopup = true;
            this.edittoken=row.strToken;
            this.editindex=index_xlh;
            this.editform["Type"]=this.form.Type;
            this.editform["index"]=row.index;
            this.editform["strName"]=row.strName;
            this.editform["strToken"]=row.strToken;
            this.editform["nCodec"]=row.nCodec;
            this.editform["nEngine"]=row.nEngine;
            this.editform["nBitrate"]=row.nBitrate;
            this.editform["nFPSType"]=row.nFPSType;
            this.editform["nFPS"]=row.nFPS;
            this.editform["nScaleType"]=row.nScaleType;
            this.editform["wihe"]=row.nWidth+"*"+row.nHeight;
            console.log(this.editform);
            // console.log(this.tableData[index])
        },
        //  编辑 添加 的确定键
        proedityes(){
            // console.log("自定义",this.editindex,this.editform);
            var form=this.editform;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            
            var nWidhei= form.wihe.split("*");
            // return false;
            var url1 = root + "/api/v1/DelTransProfile?token="+form.strToken+"&session="+ this.$store.state.token;
            this.$http.get(url1).then(result=>{
                //console.log("1",result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.Success(nWidhei);
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
        Success(nWidhei){
            var form=this.editform;
            if(form.nBitrate<64||form.nBitrate>10240){
                console.log(form.nBitrate)
                this.$message({
                    message: 'Bitrate值必须在64-10240之间',
                    type: 'warning'
                });
                return false;
            }else if(form.nFPS<1||form.nFPS>30){
                console.log(form.nBitrate)
                this.$message({
                    message: 'FPS值必须在1-30之间',
                    type: 'warning'
                });
                return false;
            }
            console.log("form1",nWidhei[0],nWidhei[1]);
            this.editPopup = false;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/AddTransProfile?name="+encodeURIComponent(form.strName)+
            "&token="+encodeURIComponent(form.strToken)+
            "&fpstype="+encodeURIComponent(form.nFPSType)+
            "&fps="+encodeURIComponent(form.nFPS)+
            "&scaletype="+encodeURIComponent(form.nScaleType)+
            "&width="+encodeURIComponent(nWidhei[0])+
            "&height="+encodeURIComponent(nWidhei[1])+
            "&bitrate="+encodeURIComponent(form.nBitrate)+
            "&engine="+encodeURIComponent(form.nEngine)+
            "&session="+ this.$store.state.token;
            console.log(url)
            this.$http.get(url).then(result=>{
                if(result.status==200){
                  if(result.data.bStatus==true){
                        //this.reload();
                        this.tableData2=[];
                        this.loadstpro();
                    }else{
                        this.$message({
                            message: '编辑失败',
                            type: 'warning'
                        });
                        return false;
                    }
                   
                }
            })
        },
        defedityes(){
            console.log("默认",this.editindex,this.editform);
            var form=this.editform;
            var nWidhei= form.wihe.split("*");
            if(form.nBitrate<64||form.nBitrate>10240){
                console.log(form.nBitrate)
                this.$message({
                    message: 'Bitrate值必须在64-10240之间',
                    type: 'warning'
                });
                return false;
            }else if(form.nFPS<1||form.nFPS>30){
                console.log(form.nBitrate)
                this.$message({
                    message: 'FPS值必须在1-30之间',
                    type: 'warning'
                });
                return false;
            }
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var url = root + "/api/v1/SetTransProfileDefault?fpstype="+encodeURIComponent(form.nFPSType)+
            "&fps="+encodeURIComponent(form.nFPS)+
            "&scaletype="+encodeURIComponent(form.nScaleType)+
            "&width="+encodeURIComponent(nWidhei[0])+
            "&height="+encodeURIComponent(nWidhei[1])+
            "&bitrate="+encodeURIComponent(form.nBitrate)+
            "&engine="+encodeURIComponent(form.nEngine)+
            "&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        this.tableData=[];
                        this.loadstream();
                    }else{
                        this.$message({
                            message: '编辑失败',
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
        },
        platformyes(){
            var form=this.form;
            //return false;
            if(form.nBitrate<64||form.nBitrate>10240){
                console.log(form.nBitrate)
                this.$message({
                    message: 'Bitrate值必须在64-10240之间',
                    type: 'warning'
                });
                return false;
            }else if(form.nFPS<1||form.nFPS>30){
                console.log(form.nBitrate)
                this.$message({
                    message: 'FPS值必须在1-30之间',
                    type: 'warning'
                });
                return false;
            }
            var strs= []; //定义一数组 
                strs=form.wihe.split("*");
            this.dialogFormVisible=false;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/AddTransProfile?name="+encodeURIComponent(form.strName)+
            "&token="+encodeURIComponent(form.strToken)+
            "&fpstype="+encodeURIComponent(form.nFPSType)+
            "&fps="+encodeURIComponent(form.nFPS)+
            "&scaletype="+encodeURIComponent(form.nScaleType)+
            "&width="+encodeURIComponent(strs[0])+
            "&height="+encodeURIComponent(strs[1])+
            "&bitrate="+encodeURIComponent(form.nBitrate)+
            "&engine="+encodeURIComponent(form.nEngine)+
            "&session="+ this.$store.state.token;
            console.log(url)
            this.$http.get(url).then(result=>{
                if(result.status==200){
                  if(result.data.bStatus==true){
                        //this.reload();
                        this.tableData2=[];
                        this.loadstpro();
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
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["strToken"] = uuid(4, 16).toLowerCase();
        },
        //点击删除
        deleteRow(index, row,rows) {
            var index_xlh=((this.currentPage2-1)*10)+index;
            
            console.log(url,row.strToken,index_xlh);
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            //url
            var url = root + "/api/v1/DelTransProfile?token="+encodeURIComponent(row.strToken)+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                console.log(result);
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
            var selectop=this.selectop;
            console.log(selectop)
            // return false;
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
            for(var i=0;i<selectop.length;i++){
                var index=selectop[i].index;
                //return false;
                var url = root + "/api/v1/DelTransProfile?token="+encodeURIComponent(selectop[i].token)+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    console.log(result);
                    console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            // this.reload();
                            this.tableData2=[];
                            this.loadstpro();
                           //row.splice(index, 1);
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
            console.log("INDEX",row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    token:row[i].strToken,
                    index:row[i].index,
                    type:row[i].nFPSType,
                };
                this.selectop.push(selectop);
            }
            
        },
        select_Call(row){
            console.log(row);
            this.selectop=[];
            for(var i=0;i<row.length;i++){
                var selectop={
                    token:row[i].strToken,
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