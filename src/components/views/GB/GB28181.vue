<template>
    <div>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" type="border-card" max-height="850">
            <!-- 1 -->
            
             <el-tab-pane :label="label.label" name="GB28181">
                
                 <!-- 表格 -->
                <el-table
                    :data="tableData1.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="nType :">
                                    <span>{{ props.row.nType }}</span>
                                </el-form-item>
                                <el-form-item label="strName :">
                                    <span>{{ props.row.strName }}</span>
                                </el-form-item>
                                <el-form-item label="strToken :">
                                    <span>{{ props.row.strToken }}</span>
                                </el-form-item>
                                <el-form-item label="strUser :">
                                    <span>{{ props.row.strUser }}</span>
                                </el-form-item>
                                <el-form-item label="strPasswd :">
                                    <span>{{ props.row.strPasswd }}</span>
                                </el-form-item>
                                <el-form-item label="bPasswdEncrypt :">
                                    <span>{{ props.row.bPasswdEncrypt }}</span>
                                </el-form-item>
                                <el-form-item label="strDevIpAddress :">
                                    <span>{{ props.row.strDevIpAddress }}</span>
                                </el-form-item>
                                <el-form-item label="strDevPort :">
                                    <span>{{ props.row.strDevPort }}</span>
                                </el-form-item>
                                <el-form-item label="bEnableAudio :">
                                    <span>{{ props.row.bEnableAudio }}</span>
                                </el-form-item>
                                <el-form-item label="bOnline :">
                                    <span>{{ props.row.bOnline }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    :label="label.Name"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="Token"
                    :label="label.Token"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="bOnline"
                    :label="label.Online">
                    </el-table-column>
                    <el-table-column
                    prop="nType"
                    :label="label.Type">
                    </el-table-column>
                    <el-table-column
                        :label="label.Edit">
                        <template slot-scope="scope">
                            <div class="button_edi">
                                <el-button type="text" size="small" @click="handleRefresh(scope.$index,scope.row)">刷新</el-button>
                                <el-button type="text" size="small" @click="handlerestart(scope.$index,scope.row)">重启</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    style="text-align: center;"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                    :current-page="currentPage1"
                    :page-size="pageSize"
                    layout=" prev, pager, next,total, jumper"
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
        activeName: 'GB28181',//优先显示选项卡
        label:{
            label:this.$t("message.GB.GB28181"),//选1
            Name:this.$t("message.table.Name"),
            Token:this.$t("message.table.Token"),
            Online:this.$t("message.table.Online"),
            Type:this.$t("message.table.Type"),
            Edit:this.$t("message.table.Edit"),
        },
        //分页
        pageSize: 10,//一页数量
        currentPage1: 1, // 当前页码
        total2: 0, // 总条数
        tableData1: [],//1
      };
    },
    mounted(){
        this.loadDevice();
    },
    methods:{
        //第二个表格的数据
        loadDevice(){
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
		   var url = root + "/api/v1/GetGbDevice?session="+ this.$store.state.token;
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
                      //console.log(result);
                      var itme=result.data.dev;
                      
                      for(var i=0;i<itme.length;i++){
                          var tabledata={
                              Token:itme[i].strToken,
                              name:itme[i].strName,
                              nType:itme[i].nType,
                              strUser:itme[i].strUser,
                              strPasswd:itme[i].strPasswd,
                              bPasswdEncrypt:itme[i].bPasswdEncrypt+"",
                              strDevIpAddress:itme[i].strDevIpAddress,
                              strDevPort:itme[i].strDevPort,
                              bEnableAudio:itme[i].bEnableAudio+"",
                              bOnline:itme[i].bOnline+"",
                          };
                          this.tableData1.push(tabledata);
                      }
                      this.total2=this.tableData1.length;
				  }
			  })
        },
        //刷新
        handleRefresh(index,row){
            var root = process.env.API_ROOT;
            if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/RefreshGbDevice?token="+row.token+"&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    this.$message({
                        message: this.$t('message.GB.Refreshsuccess'),
                        type: 'success'
                    });
                }
            })
        },
        //重启
        handlerestart(index,row){
            var root = process.env.API_ROOT;
            if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/RebootGbDevice?token="+row.token+"&session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    this.$message({
                        message: this.$t('message.GB.Restartsuccessfully'),
                        type: 'success'
                    });
                }
            })
        },
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
<style scoped>
.button_edi button{
    border: 0;
    background:none;
    font-size: 14px;
    margin-right: 40px;
}
.button_edi button:nth-child(2){
    margin-right: 0;
}

  .el-dialog {
    width: 30%;
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