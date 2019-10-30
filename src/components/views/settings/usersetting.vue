<template>
    <div>
        <!-- 编辑弹窗 -->
        
        <el-dialog title="编辑" :visible.sync="editPopup">
            <el-form label-position="right" label-width="140px" :model="editform">
                <el-form-item :label="label.label5">
                    <input class="editinput" v-model="editform.name"/>
                </el-form-item>
                <el-form-item :label="label.label6">
                    <input type="password" class="editinput" v-model="editform.Password"/>
                </el-form-item>
                <el-form-item :label="label.label7">
                    <input type="password" class="editinput" v-model="editform.Passwordx"/>
                </el-form-item>
                <el-form-item :label="label.label8">
                    <input type="password" class="editinput" v-model="editform.Passwordxx"/>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPopup = false">取 消</el-button>
                <el-button type="primary" @click="edityes">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" style="width: 100%;padding: 0 50px;" max-height="850">
            <!-- 1 -->
            
             <el-tab-pane :label="label.label" name="first">
                 <!-- 表格 -->
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="Name"
                    :label="label.label2">
                    </el-table-column>
                    <el-table-column
                    prop="User"
                    :label="label.label3">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        :label="label.label4"
                        min-width="140">
                        <template slot-scope="scope">
                            <el-button @click="handleEdit(scope.$index,scope.row)" type="text" size="small">{{$t("message.setting.Change")}}</el-button>
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
import '@/assets/jQuery.md5.js'
  export default {
    inject:["reload"],
    data() {
      return {
        search: '',//搜索
        activeName: 'first',
        tabPosition: 'button',//选项卡位置
        inputedit:[],
        label:{
            label:"User",//选1

            label2:this.$t("message.setting.user"),
            label3:this.$t("message.setting.role"),
            label4:this.$t("message.setting.action"),

            label5:this.$t("message.setting.name"),
            label6:this.$t("message.setting.currentpass"),
            label7:this.$t("message.setting.newpass"),
            label8:this.$t("message.setting.confirmpass"),
        },
        //分页
        pageSize: 10,//一页数量
        currentPage1: 1, // 当前页码
        total2: 0, // 总条数 1
        dialogFormVisible: false,//添加弹窗
        editPopup:false,//编辑弹窗
        editform: {
            label3:"anmin,"
        },
        edittoken:"",//编辑时要删除的token
        editindex:"",//编辑时所在索引
        tableData: [
            {Name:"admin",User:"Administrator"},
        ],//1
      };
    },
    mounted(){
    },
    methods:{
        //  编辑  添加 的确定键
        edityes(){
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
            if(form.Passwordx===form.Passwordxx){
                var cmd = "user=" + form.name + "&oldpassword=" 
                            + $.md5(form.Password) + "&newpassword=" + $.md5(form.Passwordx);

                var url1 = root + "/api/v1/UpdateUser?"+cmd+"&session="+ this.$store.state.token;
                this.$http.get(url1).then(result=>{
                    console.log("1",result);
                    if(result.status==200){
                        if(result.data.bStatus==true){
                            this.$router.push({ path:'../../login'  })
                            this.$message(this.$t("message.setting.Changecg"));
                        }else{
                            this.$message(this.$t("message.setting.Changesb"));
                        }
                        
                    }
                })
            }else{
                this.$message(this.$t("message.setting.Twopassword"));
                this.editPopup=true;//编辑弹窗
            }
            
            
        },
        //编辑
        
        handleEdit(index,row){
            this.editPopup = true;
            this.edittoken=row.Token;
            this.editindex=index;
            this.editform["name"]=this.tableData[index].Name;
            this.editform["Password"]="12345";
            this.editform["Passwordx"]="12345";
            this.editform["Passwordxx"]="12345";
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