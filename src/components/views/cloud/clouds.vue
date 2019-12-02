<template>
    <div>
        <!-- 两个表格 -->
        <el-tabs v-model="activeName" style="width: 100%;padding: 0 50px" max-height="850">
            <!-- 1 -->
            
             <el-tab-pane :label="label.label" name="cloud">
                
                 <!-- 表格 -->
                <el-table
                    :data="tableData1.slice((currentPage1-1)*pageSize,currentPage1*pageSize)"
                    border
                    style="width: 100%;">
                    <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    :label="label.label1">
                    </el-table-column>
                    <el-table-column
                    prop="Token"
                    label="Token">
                    </el-table-column>
                    <el-table-column
                    prop="ip"
                    label="ip">
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
export default {
    name:"clouds",
    data(){
        return {
            activeName: 'cloud',//优先显示选项卡
            label:{
                label:this.$t("message.left.cloud"),//选1
                label1:this.$t("message.GB.name"),
            },
            //分页
            pageSize: 10,//一页数量
            currentPage1: 1, // 当前页码
            total2: 0, // 总条数
            tableData1: [],//1
        }
    },
    mounted(){
        this.loadDevice();
    },
    methods:{
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
		   var url = root + "/api/v1/GetCloudDevice?session="+ this.$store.state.token;
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
                      //console.log(result);
                      var itme=result.data.dev;
                      
                      for(var i=0;i<itme.length;i++){
                          var tabledata={
                              Token:itme[i].strToken,
                              name:itme[i].strName,
                              ip:itme[i].strIp,
                          };
                          this.tableData1.push(tabledata);
                      }
                      this.total2=this.tableData1.length;
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
    }
}
</script>
<style scoped>
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