<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850">
            <el-tab-pane :label="label.label" name="first">
                <!-- 添加 -->
               <div class="button_edi">
                   <!-- 加按钮 -->
                    <el-popover
                        placement="right"
                        width="400"
                        trigger="click">
                        <div class="input-pin">
                            <div class="popover_Title">root</div>
                            <el-input
                                :placeholder="label.placeholder"
                                v-model="rootvalue">
                            </el-input>
                            <div>
                                <el-button class="button_addpv" type="success" @click="addto" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                            </div>
                        </div>
                        <el-button slot="reference" type="button" class="iconfont icon-add"></el-button>
                    </el-popover>

                    <!-- 节点添加按钮 -->
                    <el-popover
                        placement="right"
                        width="400"
                        trigger="click">
                        <div class="input-pin">
                            <div class="popover_Title">root</div>
                            <el-input
                                :placeholder="label.placeholder"
                                v-model="rootvalue">
                            </el-input>
                            <div>
                                <el-button class="button_addpv" type="success" @click="addtonond" round size="mini">Nond{{$t("message.setting.ADD")}}</el-button>
                            </div>
                        </div>
                        <el-button slot="reference" type="button" class="iconfont icon-add"></el-button>
                    </el-popover>

                    <!-- <button @click="addtonond" type="button" class="iconfont icon-add"></button> -->
                    <!-- 删除 -->
                    <button style="padding: 0 20px;" @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                <div class="Root_node">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                        <span slot-scope="{ node, data }" style="width:100%;">
                            <div style="width:100%;display: flex;justify-content: space-between;">
                                <span >
                                    <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                    <!-- <img src="" alt=""> -->
                                    <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                </span>
                                <el-popover
                                    class="button_edi1"
                                    placement="right"
                                    width="400"
                                    trigger="click">
                                    <div class="input-pin">
                                        <div class="popover_Title">{{data.strName}}</div>
                                        <el-input
                                            :placeholder="label.placeholder"
                                            v-model="rootvalue">
                                        </el-input>
                                        <div>
                                            <el-button class="button_addpv" type="success" @click="addtonond" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                                        </div>
                                    </div>
                                    <el-button slot="reference" type="button" class="button_add iconfont icon-add"></el-button>
                                </el-popover>
                            </div>
                        </span>
                    </el-tree>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="label.label1" name="first1">
                <div class="tow_node">
                    <div class="Root_node">
                        <el-tree 
                        :data="camdata" 
                        show-checkbox
                        ref="tree">
                            
                    </el-tree>
                        </el-tree>
                        <!-- <el-transfer v-model="value" :data="data1"></el-transfer> -->
                    </div>
                    <div class="tow_node_root">
                        <div>
                            <el-button class="button_addpv" type="success" @click="addcam" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                        </div>
                        <div>
                            <el-button class="button_addpv" type="success" @click="deleteselectcam" round size="mini">{{$t("message.setting.DeleteAll")}}</el-button>
                        </div>
                        <!-- <el-transfer v-model="value" :data="data1"></el-transfer> -->
                    </div>
                    <div class="Root_node">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                            <span slot-scope="{ node, data }" style="width:100%;">
                                <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                <!-- <img src="" alt=""> -->
                                <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                <div v-if="data.cam.length!=0">
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">
                                            cam<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item @click.native="camname(site.strToken)" v-for="site in data.cam" :key="site.strName">{{site.strName}}</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </span>
                        </el-tree>
                        <!-- <el-transfer v-model="value" :data="data1"></el-transfer> -->
                    </div>
                </div>
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Vue from 'vue'
    import regionaldata from '@/components/views/js/regional'
    Vue.prototype.regionaldata = regionaldata
    export default {
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${ i }`,
                    disabled: i % 4 === 0
                });
                }
                return data;
            };
            return {
                label:{
                    label:this.$t("message.setting.Area"),//选1
                    label1:this.$t("message.setting.Regional"),//选2
                    placeholder:this.$t("message.setting.Please"),
                },
                activeName: 'first',
                data: [],
                data1: generateData(),//第二
                camdata:this.regionaldata.regionaldata,
                rootvalue:"",//节点名字
                delcamtoken:"",//删除的token
                datatoken:"",//节点token
                value: [1, 4],
                defaultProps: {
                    children: 'node',
                    label: 'strName',
                    cam:"cam",
                },
            };
        },
        mounted(){
            this.Regional();
        },
        methods:{
            camname(camname){
                this.delcamtoken=camname;
                console.log(camname);
            },
            //点击节点
            handleNodeClick(data) {
                // console.log(data.strToken);
                this.datatoken=data.strToken;
                this.dataname=data.strName;
            },
            //显示
            Regional(){
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var url = root + "/api/v1/GetRegion?session="+ this.$store.state.token;
                // console.log("////////////",url)
                this.$http.get(url).then(result=>{
                    var oldarr=result.data.root;
                    var oldarr1=result.data.src;
                    var dataroot=this.getchild(oldarr,oldarr1);
                    console.log(dataroot)
                    this.data.push(dataroot);
                })
            },
            getchild(arr,arr1) {
				// console.log(arr,arr1);
				
				for(var i in arr.cam){
					if(!arr.cam[i].strName){
						for(var j in arr1){
							if(arr.cam[i].strToken == arr1[j].strToken){
								arr.cam[i].strName = arr1[j].strName;
							}
						}
					}
                }
                // var nodecam=[{
                //     strName:"cam",
                //     node:arr.cam,
                // },{
                    
                // }]
                if(arr.node && arr.node.length>0){
					for (var i = 0; i < arr.node.length; i++) {
                        arr.node[i] = this.getchild(arr.node[i],arr1);
					}
				}
                return arr;
			},
            //添加
            addto(){
                if(this.rootvalue==""){
                    // console.log("1111",this.rootvalue);
                    this.$message({
                        message: this.$t("message.setting.Input"),
                        type: 'warning'
                    });
                    return false;
                }else{
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var url = root + "/api/v1/AddRegion?name="+this.rootvalue+"&session="+ this.$store.state.token;
                // console.log("////////////",url)
                this.$http.get(url).then(result=>{
                    console.log(result);
                    this.data=[];
                    this.Regional();
                })
                }
            },
            addtonond(){
                // console.log("1111",this.datatoken);
                // return false;
                if(this.rootvalue==""&&this.datatoken==""){
                    this.$message({
                        message: this.$t("message.setting.Input"),
                        type: 'warning'
                    });
                    return false;
                }else{
                    var root = process.env.API_ROOT;
                    if (root == undefined){
                        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                    }
                    var url = root + "/api/v1/AddRegion?name="+this.rootvalue+"&parent="+this.datatoken+"&session="+ this.$store.state.token;
                    // console.log("////////////",url)
                    this.$http.get(url).then(result=>{
                        // console.log("////////////",result)
                        this.data=[];
                        this.Regional();
                    })
                }
            },
            //删除
            deleteselect(){
                if(this.datatoken==""){
                    this.$message({
                        message: '输入框不能为空',
                        type: 'warning'
                    });
                    return false;
                }
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var url = root + "/api/v1/DelRegion?token="+this.datatoken+"&session="+ this.$store.state.token;
                console.log("////////////",url)
                this.$http.get(url).then(result=>{
                    this.data=[];
                    this.Regional();
                })
            },
            //添加摄像机
            addcam(){
                var tokencheked=this.$refs.tree.getCheckedNodes();
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                console.log(tokencheked[0].token);
                for(var i=0;i<tokencheked.length;i++){
                    var url = root + "/api/v1/AddRegionCam?srctoken="+tokencheked[i].token+"&regiontoken="+this.datatoken+"&session="+ this.$store.state.token;
                    console.log("////////////",url)
                    this.$http.get(url).then(result=>{
                        this.data=[];
                        this.Regional();
                    })
                }
            },
            //删除
            deleteselectcam(){
                // return false;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var url = root + "/api/v1/DelRegionCam?srctoken="+this.delcamtoken+"&regiontoken="+this.datatoken+"&session="+ this.$store.state.token;
                console.log("////////////",url)
                this.$http.get(url).then(result=>{
                    console.log("111")
                    this.data=[];
                    this.Regional();
                })
            }
        },
    }
</script>
<style scoped>
.el-tree {
    font-size: 16px;
    color: #333333;
}
.el-tree >>> .el-tree-node__content{
    min-height: 24px;
    height: auto;
}
/* 两个框 */
.tow_node{
    display: flex;
}
.tow_node_root{
    width: 200px;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: center;
}
.tow_node_root div{
    width: 100%;
    margin-bottom: 10px;
    text-align: center;
}
/* 按钮 */
.button_add{
    border: 0;
    padding: 0;
    font-size: 20px;
    background: none;
}
.button_addpv{
    background: #65BAA5;
}
.Root_node{
    width: 20%;
    min-height: 600px;
    overflow: auto;
    border: 1px solid #e1e1e1;
    padding-top: 10px;
    
}
.Root_node1{
    width: 70%;
    min-height: 600px;
    overflow: auto;
    border: 1px solid #e1e1e1;
}
/* 弹窗 */
.popover_Title{
    font-size: 16px;
    margin-bottom: 8px;
}
.input-pin{
    text-align: center;
    margin-bottom: 8px;
}
.el-input >>> .el-input__inner {
    -webkit-appearance: none;
    /* background:url("./gallery/ksr.png") no-repeat; */
    background-color: #FAFAFA;
    background-size: 100%;
    border-radius: 50px;
    border: 0;
    width: 100%;
}
</style>