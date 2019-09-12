<template>
    <div id="page-wrapper" style="background-color: #fff;">
        <!-- 头部 -->
        <!--  -->
        <div class="container-fluid">
            <div class="row bg-title" style="margin-bottom: 0px;">
                <h4 class="page-title">{{$t("message.left.event")}}</h4>
            </div>
        </div>
        <el-table
            :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            style="width: 100%; height: 800px;overflow-y: auto;">
            <el-table-column
                prop="index"
                label="index"
                width="70">
                <template slot-scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column
                prop="Type"
                label="Type"
                width="300">
            </el-table-column>
            <el-table-column
                prop="Token"
                label="Token"
                width="120">
            </el-table-column>
            <el-table-column
                prop="UUID"
                label="UUID"
                width="160">
            </el-table-column>
            <el-table-column
                prop="Time"
                label="Time"
                width="160">
            </el-table-column>
            <el-table-column
                prop="Detail"
                label="Detail">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            style="text-align: center;"
            @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        //分页
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 10,//一页数量
        tableData1: this.EVENT.gEvent,
      }
    },
    mounted(){
        this.gEventval();
    },
    methods:{
        gEventval(){
            setInterval(function(){
                this.total=this.tableData1.length;
            }.bind(this),1000)
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
    }
  };
</script>