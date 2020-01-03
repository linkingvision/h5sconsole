<template>
    <div>
      <!-- 编辑弹窗 -->
        <el-dialog :title="eltitle" :visible.sync="editPopup">
          <el-form label-position="right" label-width="140px" :model="editform">
          
              <el-form-item label="Type">
                <el-select v-model="editform.Type" placeholder="请选择">
                </el-select>
              </el-form-item>
              <el-form-item label="Name">
                  <input class="editinput" v-model="editform.Name"/>
              </el-form-item>
              <el-form-item label="Token">
                  <input class="editinput" v-model="editform.Token"/>
              </el-form-item>
              <el-form-item label="Username" v-if="editform.Type!='H5_FILE'">
                  <input class="editinput" v-model="editform.Username"/>
              </el-form-item>
              <el-form-item label="Password" v-if="editform.Type!='H5_FILE'">
                  <input class="editinput" v-model="editform.Password"/>
              </el-form-item>
              <el-form-item label="IP" v-if="editform.Type==='H5_ONVIF'">
                  <input class="editinput" v-model="editform.IP"/>
              </el-form-item>
              <el-form-item label="Port" v-if="editform.Type==='H5_ONVIF'">
                  <input class="editinput" v-model="editform.Port"/>
              </el-form-item>
              <el-form-item label="URL" v-if="editform.Type!='H5_ONVIF'">
                  <input class="editinput" v-model="editform.URL"/>
              </el-form-item>
              <el-form-item label="Audio" v-if="editform.Type!='H5_FILE'">
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
        <!-- 添加的弹窗 -->
        <el-dialog :title="eltitle" :visible.sync="dialogFormVisible">
                    <el-form label-position="right" label-width="140px" :model="form">
                    
                        <el-form-item label="Type">
                          <input class="editinput" v-model="form.Type"/>
                        </el-form-item>
                        <el-form-item label="Name">
                            <input class="editinput" v-model="form.Name"/>
                        </el-form-item>
                        <el-form-item label="Token">
                            <input class="editinput" v-model="form.Token"/>
                        </el-form-item>
                        <el-form-item label="Username" v-if="form.Type!='H5_FILE'">
                            <input class="editinput" v-model="form.Username"/>
                        </el-form-item>
                        <el-form-item label="Password" v-if="form.Type!='H5_FILE'">
                            <input class="editinput" v-model="form.Password"/>
                        </el-form-item>
                        <el-form-item label="IP" v-if="form.Type==='H5_ONVIF'">
                            <input class="editinput" v-model="form.IP"/>
                        </el-form-item>
                        <el-form-item label="Port" v-if="form.Type==='H5_ONVIF'">
                            <input class="editinput" v-model="form.Port"/>
                        </el-form-item>
                        <el-form-item label="URL" v-if="form.Type!='H5_ONVIF'">
                            <input class="editinput" v-model="form.URL"/>
                        </el-form-item>
                        <el-form-item label="Audio" v-if="form.Type!='H5_FILE'">
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
        <el-tabs v-model="activeName" style="width: 100%;padding: 0 50px;" max-height="850"  @tab-click="removeTab">
            <!-- 1 -->
             <el-tab-pane :label="label.label" name="H5_STREAM">
               <!-- 添加 -->
               <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                 <!-- 表格 -->
                <el-table
                    :data="tableData.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
                                <el-form-item label="strUrl :">
                                    <span>{{ props.row.strUrl }}</span>
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
                    @size-change="handleSizeChange1" 
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage"
                    :total="total">
                </el-pagination>
            </el-tab-pane>
            <!-- 2 -->
            <el-tab-pane :label="label.label1" name="H5_ONVIF">
                <!-- 添加 -->
                <div class="button_edi">
                    <button @click="addto" type="button" class="iconfont icon-add"></button>
                    <button @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                 <!-- 表格 -->
                <el-table
                    :data="tableData1.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
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
                        prop="index"
                        label="index"
                        width="100">
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
                            <el-button @click.native.prevent="deleteRow(scope.$index,scope.row, tableData1)" type="text" size="small">{{$t("message.setting.DeleteAll")}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout=" prev, pager, next,total, jumper"
                    @size-change="handleSizeChange2" 
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage1"
                    :total="total1">
                </el-pagination>
            </el-tab-pane>
            <!-- 3 -->
            <el-tab-pane :label="label.label2" name="H5_FILE">
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
                                <el-form-item label="bOnline :">
                                    <span>{{ props.row.Online }}</span>
                                </el-form-item>
                                <el-form-item label="strUrl :">
                                    <span>{{ props.row.strUrl }}</span>
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
                    layout=" prev, pager, next,total, jumper"
                    @size-change="handleSizeChange3" 
                    @current-change="handleCurrentChange3"
                    :current-page="currentPage2"
                    :total="total2">
                </el-pagination>
            </el-tab-pane>
            <!-- 4 -->
            <el-tab-pane :label="label.label3" name="全部">
              <!-- 添加 -->
                <div>
                    <!-- <el-button type="text" @click="deleteselect">删除</el-button> -->
                </div>
                 <!-- 表格 -->
                <el-table
                    :data="tableData3.filter(data => !search || data.Name.toLowerCase().includes(search.toLowerCase())).slice((currentPage3-1)*pageSize,currentPage3*pageSize)"
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
                    <!-- <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column> -->
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
                    label="Token"
                    min-width="140">
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination
                    style="text-align: center;"
                    layout=" prev, pager, next,total, jumper"
                    @size-change="handleSizeChange4" 
                    @current-change="handleCurrentChange4"
                    :current-page="currentPage3"
                    :total="total3">
                </el-pagination>
            </el-tab-pane>
            
        </el-tabs>
        
    </div>
</template>
<script>
import uuid from '@/store/uuid'

  export default {
    inject:["reload"],
    data() {
      return {
        eltitle:this.$t("message.setting.Configuration"),
        search: '',//搜索
        activeName: 'H5_STREAM',//优先显示选项卡
        inputedit:[],
        label:{
            label:"H5_STREAM",//选1
            label1:"H5_ONVIF",//选2
            label2:"H5_FILE",//选2
            label3:this.$t("message.setting.all"),//选3
        },
        options: [{
                value: 'H5_STREAM',
                label: 'H5_STREAM'
            }, {
                value: 'H5_ONVIF',
                label: 'H5_ONVIF'
            }, {
                value: 'H5_FILE',
                label: 'H5_FILE'
            }
        ],
        //分页
        pageSize: 10,//一页数量
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        form: {
            Type:"H5_STREAM",
            Name:"Cam1",
            Token:"",
            Username:"admin",
            Password:"12345",
            URL:"rtsp://192.168.1.1/stream",
            Audio:"false",
            IP:"192.168.1.1",
            Port:"80",
        },
        editform: {
            Audio:"false",
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [],//1
        total: 0, // 总条数 1
        currentPage: 1, // 当前页码1
        tableData1: [],//2
        total1: 0, // 总条数 2
        currentPage1: 1, // 当前页码2
        tableData2: [],//3
        total2: 0, // 总条数 3
        currentPage2: 1, // 当前页码3
        tableData3: [],//4
        total3: 0, // 总条数 4
        currentPage3: 1, // 当前页码4
        selectop:[],//选择啦那几个
      };
    },
    mounted(){
      this.loadstream();
      //this.loadonvif();
      //this.loadfile();
      //this.loadqb();
    },
    methods:{
        
        //第一个表格的数据
        loadstream(){
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
          var url = root + "/api/v1/GetSrc?type=H5_STREAM&session="+ this.$store.state.token;
          //console.log(url)
            this.$http.get(url).then(result=>{
              //console.log("a",result);
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
                          IP:itme[i].strSrcIpAddress,
                          Port:itme[i].strSrcPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          strUrl:itme[i].strUrl,
                          bPasswdEncrypt:itme[i].bPasswdEncrypt,
                      };
                      this.tableData.push(tabledata);
                      console.log(tabledata);
                      
                  }
                  this.total=this.tableData.length;
                  console.log(this.tabledata);
              }
            })
        },
        //第二个表格的数据
        loadonvif(){
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
          var url = root + "/api/v1/GetSrc?type=H5_ONVIF&session="+ this.$store.state.token;
          //   console.log("------------",url)
            this.$http.get(url).then(result=>{
              //console.log("a",result);
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
                          IP:itme[i].strSrcIpAddress,
                          Port:itme[i].strSrcPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt,
                      };
                      this.tableData1.push(tabledata);
                      //console.log(tabledata);
                  }
                  this.total1=this.tableData1.length;
              }
            })
        },
        //第三个表格的数据
        loadfile(){
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
          var url = root + "/api/v1/GetSrc?type=H5_FILE&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
              //console.log("a",result);
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
                          IP:itme[i].strSrcIpAddress,
                          Port:itme[i].strSrcPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          strUrl:itme[i].strUrl,
                          bPasswdEncrypt:itme[i].bPasswdEncrypt,
                      };
                      this.tableData2.push(tabledata);
                      console.log(tabledata);
                  }
                  this.total2=this.tableData2.length;
              }
            })
        },
        //第四个表格的数据
        loadqb(){
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
          var url = root + "/api/v1/GetSrc?session="+ this.$store.state.token;
          //console.log("444",url);
            this.$http.get(url).then(result=>{
              //console.log("a",result);
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
                          IP:itme[i].strSrcIpAddress,
                          Port:itme[i].strSrcPort,
                          Audio :itme[i].bEnableAudio,
                          Online:itme[i].bOnline+"",
                          bPasswdEncrypt:itme[i].bPasswdEncrypt,
                      };
                      this.tableData3.push(tabledata);
                      
                      //console.log(tabledata);
                  }
                  this.total3=this.tableData3.length;
              }
            })
        },
        handleClick(index,row){
           //console.log(row,index,this.tableData);
           this.$Modal.info({
                title: '详情',
                content: 
                `${this.$t("message.GB.Name")}: ${this.tableData[index].name}<br>
                Token: ${this.tableData[index].Token}<br>
                ${this.$t("message.GB.SIPServerIP")}: ${this.tableData[index].strGbServerIpAddr }<br>
                ${this.$t("message.GB.SIPServerPort")}: ${this.tableData[index].nGbServerPort }<br>
                ${this.$t("message.GB.SIPPort")}: ${this.tableData[index].nGbLocalPort  }<br>
                ${this.$t("message.GB.SIPUserID")}: ${this.tableData[index].strGbID }<br>
                ${this.$t("message.GB.SIPServerID")}: ${this.tableData[index].strGbServerID }<br>
                ${this.$t("message.GB.Password")}: ${this.tableData[index].strGbServerPassword }<br>
                ${this.$t("message.GB.SIPProtocol")}: ${this.tableData[index].strGbProto  }<br>
                ${this.$t("message.GB.SIPChannelBaseID")}: ${this.tableData[index].strGbIDChBase }<br>
                ${this.$t("message.GB.RegisterPeriod")}: ${this.tableData[index].nGbRegisterPeriod }<br>
                ${this.$t("message.GB.KeepaliveTime")}: ${this.tableData[index].nGbKeepaliveTime }<br>
                `
            })
        },//  编辑  添加 的确定键
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
                index:form.index,
                Type:form.Type,
                Name:form.Name,
                Token:form.Token,
                User:form.Username,
                Password:form.Password,
                IP:form.IP,
                Port:form.Port,
                Audio :form.Audio,
                Online:form.Online+"",
                bPasswdEncrypt:form.bPasswdEncrypt,
            }
            console.log("form",form);
           
            //return false;
            var url1 = root + "/api/v1/DelSrc?token="+this.edittoken+"&session="+ this.$store.state.token;
            
            if(form.Type=="H5_STREAM"){
                this.$http.get(url1).then(result=>{
                    //console.log("1",result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            console.log("*************************",result.data.bStatus)
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
              var url = root + "/api/v1/AddSrcRTSP?&name="+form.Name+
              "&token="+form.Token+
              "&user="+form.Username+
              "&password="+encodeURIComponent(form.Password)+
              "&audio="+form.Audio+
              "&url="+encodeURIComponent(form.URL)+
              "&session="+ this.$store.state.token;
              console.log("++++++++++++++++",url);
              this.$http.get(url).then(result=>{
                //console.log(result);
                if(result.status==200){
                  if(result.data.bStatus==true){
                        this.tableData=[];
                        this.loadstream();
                        //this.reload();
                    }else{
                        this.$message({
                            message: '编辑失败',
                            type: 'warning'
                        });
                        return false;
                    }
                   
                }
              })
            }else if(form.Type=="H5_ONVIF"){
                console.log("onvif++++++++++++",url1);
                this.$http.get(url1).then(result=>{
                    //console.log("1",result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            console.log("*************************",result.data.bStatus)
                            this.tableData1.splice(this.editindex, 1,list)
                        }else{
                            console.log("*************************3",result.data.bStatus)
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
                // return false
                var url = root + "/api/v1/AddSrcONVIF?&name="
                +form.Name+
                "&token="+form.Token+
                "&user="+form.Username+
                "&password="+encodeURIComponent(form.Password)+
                "&audio="+form.Audio+
                "&ip="+form.IP+
                "&port="+form.Port+
                "&session="+ this.$store.state.token;
                console.log("onvif++++++++++++1",url);
                this.$http.get(url).then(result=>{
                    //console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            console.log("*************************1",result.data.bStatus)
                            this.tableData1=[];
                            this.loadonvif();
                        }else{
                            console.log("*************************2",result.data.bStatus)
                            this.$message({
                                message: '编辑失败',
                                type: 'warning'
                            });
                            return false;
                        }
                        
                    }
                })
            }else if(form.Type=="H5_FILE"){
                this.$http.get(url1).then(result=>{
                    //console.log("1",result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.tableData2.splice(this.editindex, 1,list)
                        }else{
                            this.$message({
                                message: '删除失败',
                                type: 'warning'
                            });
                            return false;
                        }
                    }
                })
                console.log("H5_FILE",form.Audio);
                var url = root + "/api/v1/AddSrcFile?&name="
                +form.Name+
                "&token="+form.Token+
                "&url="+form.URL+
                "&session="+ this.$store.state.token;
                //console.log(url);
                this.$http.get(url).then(result=>{
                    //console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            //this.reload();
                            this.tableData2=[];
                            this.loadfile();
                        }else{
                            this.$message({
                                message: '编辑失败',
                                type: 'warning'
                            });
                            return false;
                        }
                        
                    }
                })
            }
            
            
        },
        platformyes(){
            this.dialogFormVisible=false;
            //console.log(this.form)
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
            //console.log(form.Type)
            if(form.Type=="H5_STREAM"){
              console.log("stream",form.Audio);
              var url = root + "/api/v1/AddSrcRTSP?&name="+form.Name+
              "&token="+form.Token+
              "&user="+form.Username+
              "&password="+encodeURIComponent(form.Password)+
              "&audio="+form.Audio+
              "&url="+encodeURIComponent(form.URL)+
              "&session="+ this.$store.state.token;
              console.log("---------------------",url);
              this.$http.get(url).then(result=>{
                //console.log(result);
                if(result.status==200){
                  if(result.data.bStatus==true){
                        //this.reload();
                        this.tableData=[];
                        this.loadstream();
                    }else{
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        return false;
                    }
                   
                }
              })
            }else if(form.Type=="H5_ONVIF"){
                console.log("H5_ONVIF",form.Audio);
                var url = root + "/api/v1/AddSrcONVIF?&name="
                +form.Name+
                "&token="+form.Token+
                "&user="+form.Username+
                "&password="+encodeURIComponent(form.Password)+
                "&audio="+form.Audio+
                "&ip="+form.IP+
                "&port="+form.Port+
                "&session="+ this.$store.state.token;
                //console.log(url);
                this.$http.get(url).then(result=>{
                    //console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            //this.reload();
                            this.tableData1=[];
                            this.loadonvif();
                        }else{
                            this.$message({
                                message: '添加失败',
                                type: 'warning'
                            });
                            return false;
                        }
                        
                    }
                })
            }else if(form.Type=="H5_FILE"){
                console.log("H5_FILE",form.Audio);
                var url = root + "/api/v1/AddSrcFile?&name="
                +form.Name+
                "&token="+form.Token+
                "&url="+form.URL+
                "&session="+ this.$store.state.token;
                //console.log(url);
                this.$http.get(url).then(result=>{
                    //console.log(result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            //this.reload();
                            this.tableData2=[];
                            this.loadfile();
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
        //查看  编辑
        handleClick(index,row){
           console.log(row,index,this.tableData);
            this.$Modal.info({
                title: '详情',
                content: 
                `Type: ${row.Type}<br>
                Name: ${row.Name}<br>
                Token: ${row.Token}<br>
                User: ${row.User}<br>
                Password: ${row.Password}<br>
                IP: ${row.IP}<br>
                IP: ${row.strUrl}<br>
                Port: ${row.Port}<br>
                Audio: ${row.Audio}<br>
                Online: ${row.Online}<br>
                bPasswdEncrypt: ${row.bPasswdEncrypt}<br>
                `
            })
        },
        handleEdit(index,row){
            console.log(index,row);
            console.log(row.Audio,row.strUrl);
            var index_xlh="";
            //return false;
            if(this.form.Type=="H5_ONVIF"){
                console.log("序列号H5_ONVIF",this.currentPage1,((this.currentPage1-1)*10)+index);
                index_xlh=((this.currentPage1-1)*10)+index;
            }else if(this.form.Type=="H5_FILE"){
                console.log("序列号H5_FILE",this.currentPage2,((this.currentPage2-1)*10)+index);
                index_xlh=((this.currentPage2-1)*10)+index;
            }else if(this.form.Type=="H5_STREAM"){
                console.log("序列号H5_STREAM",this.currentPage,((this.currentPage-1)*10)+index);
                index_xlh=((this.currentPage-1)*10)+index;
            }
            
            console.log("序列号1",index_xlh);
            // console.log(this.tableData[index]);
            //return false;
            this.editPopup = true;
            this.edittoken=row.Token;
            this.editindex=index_xlh;
            this.editform["Type"]=row.Type;
            this.editform["index"]=row.index;
            this.editform["Name"]=row.Name;
            this.editform["Token"]=row.Token;
            this.editform["Username"]=row.User;
            this.editform["Password"]=row.Password;
            this.editform["IP"]=row.IP;
            this.editform["Port"]=row.Port;
            this.editform["URL"]=row.strUrl;
            this.editform["Audio"]=row.Audio;
            this.editform["Online"]=row.Online;
            this.editform["bPasswdEncrypt"]=row.bPasswdEncrypt;
            console.log(this.editform)
            // console.log(this.tableData[index])
        },
        //点击添加时随机获取到token数据
        addto(){
            this.dialogFormVisible=true;
            this.form["Token"] = uuid(4, 16).toLowerCase();
        },
        //点击删除
        deleteRow(index, row,rows) {
          //var form=this.form;
            console.log(rows,this.form.Type,index);
            var index_xlh="";
            //return false;
            if(this.form.Type=="H5_ONVIF"){
                console.log("序列号H5_ONVIF",this.currentPage1,((this.currentPage1-1)*10)+index);
                index_xlh=((this.currentPage1-1)*10)+index;
            }else if(this.form.Type=="H5_FILE"){
                console.log("序列号H5_FILE",this.currentPage2,((this.currentPage2-1)*10)+index);
                index_xlh=((this.currentPage2-1)*10)+index;
            }else if(this.form.Type=="H5_STREAM"){
                console.log("序列号H5_STREAM",this.currentPage,((this.currentPage-1)*10)+index);
                index_xlh=((this.currentPage-1)*10)+index;
            }
            
            console.log("序列号1",index_xlh);
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
            var selectop=this.selectop;
            var row=[];
            
            console.log(selectop)
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
            for(var i=0;i<selectop.length;i++){
                // if(selectop[i].type=="H5_STREAM"){
                //     row=this.tableData;
                // }else if(selectop[i].type=="H5_ONVIF"){
                //     row=this.tableData1;
                // }
                // else if(selectop[i].type=="H5_FILE"){
                //     row=this.tableData2;
                // }
                console.log(selectop[i].index,row);
                var index=selectop[i].index;
                //return false;
                var url = root + "/api/v1/DelSrc?token="+selectop[i].token+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    console.log(result);
                    console.log(this.tableData);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                           this.reload();
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
                console.log(row[i].Token)
                var selectop={
                    token:row[i].Token,
                    index:row[i].index,
                    type:row[i].Type,
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
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange1(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
        //2
        handleSizeChange2(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage1 = 1;
            this.pageSize = val;
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
            this.currentPage1 = val;
            console.log(`当前页: ${this.currentPage1 }`);
        },
        //3
        handleSizeChange3(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage2 = 1;
            this.pageSize = val;
        },
        handleCurrentChange3(val) {
            console.log(`当前页: ${val}`);
            this.currentPage2 = val;
        },
        //4
        handleSizeChange4(val) {
            console.log(`每页 ${val} 条`);
            this.currentPage3 = 1;
            this.pageSize = val;
        },
        handleCurrentChange4(val) {
            console.log(`当前页: ${val}`);
            this.currentPage3 = val;
        },
        //有用
        removeTab(targetName) {
            this.form.Type=targetName.label;
            console.log(targetName.label);
            
            if(targetName.label=="H5_ONVIF"){
                this.tableData1=[];
                this.loadonvif();
            }else if(targetName.label=="H5_FILE"){
                this.tableData2=[];
                this.loadfile();
            }else if(targetName.label=="全部"||targetName.label=="All"){
                this.tableData3=[];
                this.loadqb();
            }else if(targetName.label=="H5_STREAM"){
                this.tableData=[];
                this.loadstream();
            }
            
            //this.reload();
        },
    },
  };
</script>
<style>
  .el-dialog {
    width: 30%;
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