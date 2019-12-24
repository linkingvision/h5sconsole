<template>
    <div id="page-wrapper" style="background-color: #fff;">
        <!-- 头部 -->
        <!--  -->
        <div class="container-fluid">
            <div class="row bg-title" style="margin-bottom: 0px;">
                <h4 class="page-title">{{$t("message.left.camera")}}</h4>
            </div>
        </div>
        <!-- shenti -->
        <div class="content">
            <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100%;overflow-y: auto;">
                <el-table-column
                    prop="token"
                    label="token"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="name"
                    width="250">
                </el-table-column>
                <el-table-column
                    width="250"
                    :label="label">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.open_close"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="gbid">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.gbid" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    width="250"
                    label="Audio">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.audio"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    label="edit">
                    <template slot-scope="scope">
                        <div class="button_edi">
                            <button @click="handleEdit(scope.$index,scope.row)" type="button" class="iconfont icon-download"></button>
                            <button @click="handledel(scope.$index,scope.row)" type="button" class="iconfont icon-ashbin"></button>
                        </div>
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
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        label:this.$t('message.camera.open_Close'),
        //分页
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 10,//一页数量
        tableData: [],
        // editPopup:false,//编辑弹窗
        editform: {
            open_close:false,
            audio:false,
        },
      }
    },
    mounted(){
        this.GetSrc();
        this.height_zsy();
    },
    methods:{
        //第一个表格的数据
        GetSrc(){
          var root = process.env.API_ROOT;
          if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
          }
          //url
          var url = root + "/api/v1/GetSrc?getonline=true&session="+ this.$store.state.token;
          //console.log(url)
            this.$http.get(url).then(result=>{
              //console.log("a",result.data.src);
              if(result.status == 200){
                  var itme=result.data.src;
                  for(var i=0;i<itme.length;i++){
                      var tabledata={
                          name:itme[i].strName,
                          token:itme[i].strToken,
                          open_close:false,
                          gbid:"",
                          audio:false,
                      };
                      this.tableData.push(tabledata);
                      this.loadSrc(tabledata,itme[i].strToken);
                  }
                  
                  this.total=this.tableData.length;
              }
            })
            
        },
        loadSrc(tabledata,token){
            var data=tabledata;
            //return false
            var root = process.env.API_ROOT;
            if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetCamera?token="+token+"&session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    if(result.data.bStatus==false){
                    }else{
                        var itme=result.data.cam;
                        for(var i=0; i< itme.length; i++){
                            //console.log(itme,itme[i].bEnableAudio)
                            data["open_close"]=itme[i].bEnable;
                            data["gbid"]=itme[i].strGbID;
                            data["audio"]=itme[i].bEnableAudio;
                            this.tableData.push(data);
                            for(var i=0; i<this.tableData.length; i++){
                                for(var j=i+1; j<this.tableData.length; j++){
                                    if(this.tableData[i]==this.tableData[j]){         //第一个等同于第二个，splice方法删除第二个
                                        this.tableData.splice(j,1);
                                        j--;
                                    }
                                }
                            }
                        }
                    }
                }
            })
        },

        //编辑
        handleEdit(index,row){
            console.log(index,row,row.gbid.length,row.gbid);
            //return false;
            var root = process.env.API_ROOT;
            if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            

            var url1 = root + "/api/v1/DelCamera?token="+row.token+"&session="+ this.$store.state.token;
            console.log("-****************",url1);
            this.$http.get(url1).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var tabledata={
                            name:row.name,
                            token:row.token,
                            open_close:row.open_close,
                            gbid:row.gbid,
                            audio:row.audio,
                        };
                        this.tableData.splice(index, 1,tabledata)
                    }
                    else{
                        this.$message({
                            message: this.$t('message.camera.Editor_failure'),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
            var url=""
            if(row.gbid==""&&row.open_close==true||row.audio==true){
                console.log("1111");
                url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&session="+ this.$store.state.token;
            }else if(row.gbid.length==20){
                url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&gbid="+row.gbid+"&session="+ this.$store.state.token;
            }
            
            console.log(url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    this.$message({
                        message: this.$t('message.camera.Editorial_success'),
                        type: 'success'
                    });
                }
            })

            this.editform["name"]=row.name;
            this.editform["token"]=row.token;
            this.editform["open_close"]=row.open_close;
            this.editform["audio"]=row.audio;
            this.editform["gbid"]=row.gbid;
        },
        //删除
        handledel(index,row){
            console.log(index,row);
            var root = process.env.API_ROOT;
            if (root == undefined){
              root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/DelCamera?token="+row.token+"&session="+ this.$store.state.token;
            console.log("-****************",url);
            this.$http.get(url).then(result=>{
                console.log(result);
                if(result.status==200){
                    if(result.data.bStatus==true){
                        var tabledata={
                            name:row.name,
                            token:row.token,
                            open_close:false,
                            gbid:"",
                            audio:false,
                        };
                        this.tableData.splice(index, 1,tabledata);
                        this.$message({
                            message: this.$t('message.camera.Delete_successful'),
                            type: 'success'
                        });
                    }
                    else{
                        this.$message({
                            message: this.$t('message.camera.Delete_failed'),
                            type: 'warning'
                        });
                        return false;
                    }
                }
            })
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
        height_zsy(){
            var winHeight = $(window).height()-150;//winHeight即浏览器高度
            // console.log("******",winHeight-100);
            $(".content").css("height",winHeight);

        }
    }
  };
</script>
<style scoped>
.button_edi button{
    border: 0;
    background:none;
    font-size: 24px;
    margin-right: 40px;
}
.button_edi button:nth-child(2){
    margin-right: 0;
}
.el-dialog__wrapper >>> .el-dialog{
    width: 20%;
}
.el-table .cell {
    width: 100% !important;
}
.el-input >>> .el-input__inner{
    width: 100%;
    border: 0;
    background-color: #f5f5f5;
    border-radius: 50px;
}
.content{
    padding: 0 20px;
    background: #ffffff;
    margin-bottom: 10px;
}
</style>