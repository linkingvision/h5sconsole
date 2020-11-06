<template>
    <div id="page-wrapper" style="background-color: #fff;">
        <!-- 头部 -->
        <!--  -->
        <div class="container-fluid">
            <div class="bg-title" style="margin-bottom: 0px;">
                <div class="flex_ld">
                    <h4 class="page-title">{{$t("message.left.camera")}}</h4>
                    <el-input
                        style="width:200px"
                        v-model="searchTableInfo"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                </div>
            </div>
            
        </div>
        <!-- shenti -->
        <div class="content">
            <div class="content_1">
                <el-tree
                    :data="data"
                    node-key="id"
                    ref="tree"
                    highlight-current
                    @node-click="handleNodeClick"
                    :props="defaultProps">
                    <span slot-scope="{ data }">
                        <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                        <!-- <img src="" alt=""> -->
                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                    </span>
                </el-tree>
            </div>
            <div class="content_2">
                <el-table
                    :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                    style="width: 100%;overflow-y: auto;">
                    <el-table-column
                        prop="token"
                        :label="label.Token"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        :label="Name1"
                        width="250">
                    </el-table-column>
                    <el-table-column
                        width="250"
                        :label="open_Close">
                        <template slot-scope="scope">
                            <el-switch
                                @change="openchange"
                                v-model="scope.row.open_close"
                                :disabled="scope.row.disabled"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="label.GBID">
                        <template slot-scope="scope">
                            <el-input @blur='openchange' v-model="scope.row.gbid" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="250"
                        :label="audio">
                        <template slot-scope="scope">
                            <el-switch
                                @change="openchange"
                                v-model="scope.row.audio"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="save">
                        <template slot-scope="scope">
                            <div class="button_edi">
                                <button @click="handleEdit(scope.$index,scope.row)" type="button" class=" camera"></button>
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
    </div>
</template>

<script>
  export default {
    data() {
      return {
        open_Close:this.$t('message.camera.open_Close'),
        Name1:this.$t('message.camera.name'),
        audio:this.$t('message.camera.audio'),
        save:this.$t('message.camera.save'),
        label:{
            Token:this.$t('message.table.Token'),
            GBID:this.$t('message.table.GBID')
        },
        //分页
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 10,//一页数量
        tableData: [],
        data:[],
        defaultProps: {
            children: 'children',
            label: 'label',
            token:"token",
            iconclass:"iconclass"
        },
        // editPopup:false,//编辑弹窗
        editform: {
            open_close:false,
            audio:false
        },
        searchTableInfo:""
      }
    },
    mounted(){
        // this.GetSrc();
        if(this.$store.state.root=="Operator"){
            console.log("nihencai")
        }else{
            this.loadtest();
            this.loadDevice();
            this.NumberDevice();
        }
        // this.height_zsy();
    },
    methods:{
        //修改后提示
        openchange(){
            this.$message({
                message: '修改后请保存',
                type: 'warning',
                center: true
            });
        },
        //第一个表格的数据
        GetSrc(){
          var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
          //url
          var url = root + "/api/v1/GetSrc?session="+ this.$store.state.token;
          console.log("url111",url)
            this.$http.get(url).then(result=>{
              //console.log("a",result.data.src);
              if(result.status == 200){
                var itme=result.data.src;
                var tabledata={};
                for(var i=0;i<itme.length;i++){
                    tabledata={
                        name:itme[i].strName,
                        token:itme[i].strToken,
                        open_close:true,
                        gbid:"",
                        audio:false,
                        disabled:false
                    };
                    if(itme[i].nType!="H5_CH_DEV"){
                        // console.log(itme[i].nType)
                        tabledata["disabled"]=true;
                    }
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
            // console.log(url);
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
        //树形节点点击
        handleNodeClick(data, checked, indeterminate){
            this.tableData=[];
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var data =  data.children1;
            var tabledata={};
            for(var i=0; i< data.length; i++){
                console.log(data[i].nType)
                console.log(data[i].token)
                console.log(data[i].label)
                // return false;
                tabledata={
                    name:data[i].label,
                    token:data[i].token,
                    open_close:true,
                    gbid:"",
                    audio:false,
                    disabled:false
                };
                if(data[i].nType!="H5_CH_DEV"){
                    // console.log(itme[i].nType)
                    tabledata["disabled"]=true;
                }
                this.tableData.push(tabledata);
                this.loadSrc(tabledata,data[i].token);
               
            }
            this.total=this.tableData.length;
        },
        //测试机仓
        loadtest(){
            let _this =this;
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
            var url = root + "/api/v1//GetSrcCamera?session="+ this.$store.state.token;
            console.log(url);
            this.$http.get(url).then(result=>{
                if(result.status == 200){
					var data =  result.data;
                    var srcGroup = {children1: []};
                    srcGroup.label=this.$t('message.live.camera');
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                         var item = data.src[i];
                        if(item['nOriginalType'] == 'H5_CH_GB'){
                            continue;
                        }else{
                            var newItem ={
                                    token : item['strToken'],
                                    label : item['strName'],
                                    nType : item['nType']};
                            srcGroup.children1.push(newItem);
                        }
                    }
                    this.data.push(srcGroup);
				  } 
            })

        },
        //sdk
        loadDevice() {
		    let _this =this;
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
		   var url = root + "/api/v1/GetDevice?session="+ this.$store.state.token;
            console.log("*******",url)
			  //重组
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var srcData = [];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var srclevel=[];
						  srclevel["strToken"]=item.strToken;
						  srclevel["strName"]=item.strName;
						  this.loadSrcdev(srclevel,srcData);
					  }
				  }
			  })
		},
        loadSrcdev(srclevel, srcData) {

            let _this =this;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }

            var url = root + "/api/v1/GetDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;
            // console.log("*******",url)
            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children1: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                nType : item['nType']};
                       srcGroup.children1.push(newItem);
                    }
                    this.data.push(srcGroup);
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },
        //数字仓机
        NumberDevice() {
		    let _this =this;
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

			  //重组
			  this.$http.get(url).then(result=>{
				  if(result.status == 200){
					  var srcData = [];
					  var data=result.data;
					  for(var i = 0; i < data.dev.length; i++){
						  var item=data.dev[i];
						  var srclevel=[];
						  srclevel["strToken"]=item.strToken;
						  srclevel["strName"]=item.strName;
						  this.NumberSrc(srclevel,srcData);
					  }
				  }
			  })
		},
        NumberSrc(srclevel, srcData) {

            let _this =this;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }

            var url = root + "/api/v1/GetGbDeviceSrc?token="+ srclevel.strToken + "&session=" + this.$store.state.token;

            this.$http.get(url).then(result => {
                if (result.status == 200)
                {
                    var data =  result.data;
                    var srcGroup = {children1: []};
                    srcGroup.label=srclevel.strName;
                    srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
                    for(var i=0; i< data.src.length; i++){
                        var item = data.src[i];
                        
                        var newItem ={
                                token : item['strToken'],
                                label : item['strName'],
                                nType : item['nType']};
                       srcGroup.children1.push(newItem);
                    }
                    this.data.push(srcGroup);
                }
            }).catch(error => {
                console.log('GetSrc failed', error);
            });
        },
        //编辑
        handleEdit(index,row){
            console.log(index,row,row.gbid.length,row.gbid);
            var index_xlh=((this.currentPage-1)*10)+index;
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
                        this.tableData.splice(index_xlh, 1,tabledata)

                        var url=""
                        if(row.gbid==""){
                            console.log("&&row.open_close==true||row.audio==true");
                            url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&session="+ this.$store.state.token;
                        }else if(row.gbid.length==20){
                            console.log("222");
                            url = root + "/api/v1/AddCamera?token="+row.token+"&enable="+row.open_close+"&audio="+row.audio+"&gbid="+row.gbid+"&session="+ this.$store.state.token;
                        }
                        
                        console.log("----------------",url);
                        this.$http.get(url).then(result=>{
                            console.log(result);
                            if(result.status==200){
                                this.$message({
                                    message: this.$t('message.camera.Save_successfully'),
                                    type: 'success'
                                });
                            }
                        })

                        this.editform["name"]=row.name;
                        this.editform["token"]=row.token;
                        this.editform["open_close"]=row.open_close;
                        this.editform["audio"]=row.audio;
                        this.editform["gbid"]=row.gbid;
                    }
                    else{
                        console.log("保存失败");
                        // return false;
                    }
                }
            })
            
        },
        //删除
        handledel(index,row){
            console.log(index,row);
            console.log("序列号",((this.currentPage-1)*10)+index);
            var index_xlh=((this.currentPage-1)*10)+index;

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
                            open_close:true,
                            gbid:"",
                            audio:false,
                        };
                        this.tableData.splice(index_xlh, 1,tabledata);
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
    },
    computed: {
      // 根据计算属性模糊搜索
      tableData1 () {
        const searchTableInfo = this.searchTableInfo
        if (searchTableInfo) {
          return this.tableData.filter(data => {
            console.log("success"+data)
            return Object.keys(data).some(key => {
                console.log(data[key])
              // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
              return String(data[key]).indexOf(searchTableInfo) > -1
            })
          })
        }
        return this.tableData
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
    display: flex;
    justify-content: space-between;
    /* padding: 0 20px; */
    margin-bottom: 10px;
    background: #f7f7f7;
    width: 100%;
    height: 900px;
}
.content .content_1{
    width: 19.5%;
    height: 98%;
    background: #ffffff;
    overflow: auto;
}
.content .content_2{
    width: 80%;
    height: 98%;
    background: #ffffff;
}
.camera{
    width: 18px;
    height: 18px;
    background-image: url("./gallery/jiankongdian.svg") !important;
}
</style>