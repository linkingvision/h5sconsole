<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850">
            <el-tab-pane :label="label.label" name="first">
                <!-- 添加 -->
               <div class="button_edi">
                   <!-- 加按钮 -->
                    <el-popover
                        placement="right"
                        width="250"
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

                    <button style="padding: 0 20px;" @click="deleteselect" type="button" class="iconfont icon-reduce"></button>
                </div>
                <div class="Root_node">
                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                        <span slot-scope="{ node, data }" style="width:100%;">
                            <div style="width:100%;display: flex;justify-content: space-between;">
                                <span>
                                    <span class="mdi mdi-view-sequential fa-fw" style="color:rgb(142, 132, 132);"></span>
                                    <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                </span>
                                <el-popover
                                    class="button_edi1"
                                    placement="right"
                                    width="250"
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
                        :check-strictly="true"
                        ref="tree">
                        <span slot-scope="{ node, data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span >
                                        <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                        <!-- <img src="" alt=""> -->
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                    </span>
                                    <!-- <span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span> -->
                                </div>
                            </span>
                        </el-tree>
                    </div>
                    <div class="tow_node_root">
                        <div>
                            <el-button class="button_addpv" type="success" @click="addcam" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                        </div>
                        <div>
                            <el-button class="button_addpv" type="success" @click="deleteselectcam" round size="mini">{{$t("message.setting.DeleteAll")}}</el-button>
                        </div>
                    </div>
                    <div class="Root_node">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                            <span slot-scope="{ node, data }" style="width:100%;">
                                    <span>
                                        <span class="mdi mdi-view-sequential fa-fw" style="color:rgb(142, 132, 132);"></span>
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                    </span>
                                    <div v-if="data.cam.length!=0">
                                        <!-- 
                                            show-checkbox
                                            :check-strictly="true" -->
                                        <el-tree class="el_tree1" 
                                            ref="tree1"
                                            :data="data.cam"
                                            :props="defaultProps"
                                            @node-click="handleNodeClick1" 
                                            >
                                            <span slot-scope="{ node, data }" style="width:100%;">
                                                <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                                <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                            </span>
                                        </el-tree>
                                    </div>
                            </span>
                        </el-tree>
                    </div>
                </div>
                
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import Vue from 'vue'

    export default {
        inject:["reload"],
        data() {
            return {
                label:{
                    label:this.$t("message.setting.Area"),//选1
                    label1:this.$t("message.setting.Regional"),//选2
                    placeholder:this.$t("message.setting.Please"),
                },
                activeName: 'first',
                data: [],
                data1:this.listdatag.listdatag1,//第二
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
            // this.addcam();
        },
        methods:{
            handleNodeClick1(data){
                this.delcamtoken=data.strToken;
                console.log(data);
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
                    // console.log(oldarr)
                    this.data=[];
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
                                arr.cam[i].iconclass="mdi mdi-camcorder fa-fw"
                                if(!arr1[j].bOnline)
                                    arr.cam[i].iconclass = 'mdi mdi-camcorder-off fa-fw';

							}
						}
					}
                }
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
                console.log("1111",this.datatoken);
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
                this.$http.get(url).then(result=>{
                    if(result.status==200){
                        this.data=[];
                        this.Regional();
                    }
                })
            },
            delet(arr,arr1){
                if(arr.node && arr.node.length>0){
					for (var i = 0; i < arr.node.length; i++) {
                        arr.node[i] = this.delcamdata(arr.node[i],arr1);
					}
				}
                return arr;
            },
            //添加摄像机
            addcam(){
                var tokencheked=this.$refs.tree.getCheckedNodes();
                console.log(tokencheked);
                // return false;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var oldarr=this.data[0];
                for(var i=0;i<tokencheked.length;i++){
                    var oldarr1=tokencheked[i];
                    if(tokencheked[0].token==undefined){
                        return false;
                    }
                    
                    var url = root + "/api/v1/AddRegionCam?srctoken="+tokencheked[i].token+"&regiontoken="+this.datatoken+"&session="+ this.$store.state.token;
                    this.$http.get(url).then(result=>{
                        if(result.status==200){
                            if(result.data.bStatus==true){
                                this.data=[];
                                this.Regional();
                                // console.log(oldarr1.label)
                                // var dataroot=this.addcamdata(oldarr,oldarr1);
                            }else{
                                this.$message({
                                    message: "摄像机"+name+"添加失败",
                                    type: 'warning'
                                });
                                // return false;
                            }
                        }
                    })
                }
            },
            addcamdata(arr,arr1){
                if(arr.strToken==this.datatoken){
                    console.log("******",arr1.label);
                    var camdata={
                        strToken: arr1.token,
                        strName: arr1.label,
                        iconclass: arr1.iconclass,
                        iconclass1: "",
                        name: arr1.name,
                        disabled_me: false,
                    }
                    arr.cam.push(camdata);
                }
                // if(arr.strToken==this.datatoken||arr.cam[i].strToken==arr1.token){
                //     arr.cam.splice(i,1);
                // }
                if(arr.node && arr.node.length>0){
					for (var i = 0; i < arr.node.length; i++) {
                        arr.node[i] = this.addcamdata(arr.node[i],arr1);
					}
				}
                return arr;
            },
            //删除
            deleteselectcam(){
                // var tokencheked=this.$refs.tree1.getCheckedNodes();
                // console.log(tokencheked);
                // return false;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                // for(var i=0;i<tokencheked.length;i++){
                    var oldarr=this.data[0];
                    var oldarr1=this.delcamtoken;
                    console.log(this.delcamtoken,this.datatoken);
                    // return false;
                    var url = root + "/api/v1/DelRegionCam?srctoken="+this.delcamtoken+"&regiontoken="+this.datatoken+"&session="+ this.$store.state.token;
                    console.log("////////////",url)
                    this.$http.get(url).then(result=>{
                        if(result.status==200){
                            if(result.data.bStatus==true){
                                // var dataroot=this.delcamdata(oldarr,oldarr1);
                                this.data=[];
                                this.Regional();
                            }else{
                                this.$message({
                                    message: "摄像机"+name+"添加失败",
                                    type: 'warning'
                                });
                                // return false;
                            }
                        }
                    })
                // }
            },
            delcamdata(arr,arr1){
                for(var i in arr.node){
                    if(arr.strToken==this.datatoken){
                        console.log("********");
                        arr.cam.splice(i,1)
                    }else if(arr.node[i].strToken==this.datatoken){
                        console.log("----");
                        arr.node[i].cam.splice(i,1)
                    }
                }
                if(arr.node && arr.node.length>0){
					for (var i = 0; i < arr.node.length; i++) {
                        arr.node[i] = this.delcamdata(arr.node[i],arr1);
					}
				}
                return arr;
            }
        },
    }
</script>
<style scoped>
.el_tree1{
    margin-left: -6px;
}
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