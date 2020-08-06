<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850"  @tab-click="removeTab">
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
                <div style="display:flex">
                    <div class="Root_node1">
                        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick">
                            <span slot-scope="{ node, data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span>
                                        <span class="mdi mdi-view-sequential fa-fw"></span>
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
                                                <el-button class="button_addpv" type="success" @click.native.prevent="addtonond" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                                            </div>
                                        </div>
                                        <el-button slot="reference" type="button" class="button_add iconfont icon-add"></el-button>
                                    </el-popover>
                                </div>
                            </span>
                        </el-tree>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="label.label1" name="first1">
                <div class="tow_node">
                    <div class="Root_node">
                        <el-tree 
                        :data="camdata"
                        highlight-current
                        show-checkbox
                        ref="tree">
                        <span slot-scope="{ node, data }" style="width:100%;">
                                <div style="width:100%;display: flex;justify-content: space-between;">
                                    <span >
                                        <span :class="data.iconclass"></span>
                                        <!-- <img src="" alt=""> -->
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
                                    </span>
                                    <!-- <span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span> -->
                                </div>
                            </span>
                        </el-tree>
                    </div>
                    <div class="tow_node_root">
                        <div style="font-size:44px;font-weight:600;color:rgba(51,51,51,1);height: 40px;" class="iconfont icon-jiang-right"></div>
                        <div>
                            <el-button class="button_addpv" type="success" @click="addcam" round size="mini">{{$t("message.setting.ADD")}}</el-button>
                        </div>
                        <!-- <div>
                            <el-button class="button_addpv" type="success" @click="deleteselectcam" round size="mini">{{$t("message.setting.DeleteAll")}}</el-button>
                        </div> -->
                    </div>
                    <div class="Root_node">
                        <el-input
                            placeholder="输入区域名进行过滤"
                            v-model="filterText">
                        </el-input>
                        <div style="font-size:16px;font-family:PingFang SC;font-weight:600;color:rgba(51,51,51,1);line-height:50px;">根节点</div>
                        <el-tree highlight-current :filter-node-method="filterNode" :data="data" :props="defaultProps" ref="menuPermissionTree" @node-click="handleNodeClick2">
                            <span slot-scope="{ node, data}" style="width:100%;">
                                <span>
                                    <span class="mdi mdi-view-sequential fa-fw"></span>
                                    <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}} </span>
                                </span>
                                <!-- <div v-if="data.cam.length!=0">
                                    <el-tree class="el_tree1" 
                                        :data="data.cam"
                                        show-checkbox
                                        :ref="'menuPermissionTree1'+data.index"
                                        >
                                        <span slot-scope="{ node, data }" style="width:100%;">
                                            <span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
                                            <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                        </span>
                                    </el-tree>
                                    
                                </div> -->
                                <!-- <div style="margin:10px" v-for="(b2,index) in data.cam" :key="index">
                                    <span :class="b2.iconclass" style="color:rgb(142, 132, 132);"></span>
                                    <span :class="b2.iconclass1" style="padding-left: 4px;">{{b2.strName}}</span>
                                </div> -->
                            </span>
                        </el-tree>
                        <!-- <div v-if="data">
                            <div v-for="(a,index) in data" :key="index" >
                                {{a.strName}}
                                <div style="margin:10px" v-for="(c,index) in a.cam" :key="index">
                                    {{c.strName}}
                                </div>
                                <div style="margin:10px" v-for="(b,index) in a.node" :key="index">
                                    {{b.strName}}
                                    <div style="margin:10px" v-for="(c1,index) in b.cam" :key="index+1">
                                        {{c1.strName}}
                                    </div>
                                    <div style="margin:10px" v-for="(b1,index) in b.node" :key="index+2">
                                        {{b1.strName}}
                                        <div style="margin:10px" v-for="(c2,index) in b1.cam" :key="index+1">
                                            {{c2.strName}}
                                        </div>
                                        <div style="margin:10px" v-for="(b2,index) in b1.node" :key="index+2">
                                            {{b2.strName}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="Root_node2">
                        <el-tree class="el_tree1" 
                            :data="datanodecam"
                            show-checkbox
                            default-expand-all
                            highlight-current
                            :props="defaultPropscam"
                            ref="menuPermissionTree1"
                            >
                            <span slot-scope="{ node, data }" style="width:100%;">
                                <div class="datanodecam">
                                    <div>
                                        <span :class="data.iconclass"></span>
                                        <span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
                                    </div>
                                    <div @click="deleteselectcam" style="font-size:20px;font-weight:500; color:rgba(51,51,51,1);" class="iconfont icon-ashbin"></div>
                                
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
                    placeholder:this.$t("message.setting.Please")
                },
                filterText:"",
                activeName: 'first',
                data: [],
                data1:this.listdatag.listdatag1,//第二
                camdata:this.regionaldata.regionaldata,
                datanodecam:[],
                rootvalue:"",//节点名字
                delcamtoken:"",//删除的token
                datatoken:"",//节点token
                dataindex:"",
                value: [1, 4],
                defaultProps: {
                    children: 'node',
                    label: 'strName',
                    cam:"cam"
                },
                defaultPropscam:{
                    children: 'cam',
                    label: 'strName',
                    cam:"cam"
                },
                rootindex:0,
            };
        },
        mounted(){
            this.Regional();
            // this.addcam();
        },
        watch: {
            filterText(val) {
                this.$refs.menuPermissionTree.filter(val);
            }
        },
        methods:{
            handleNodeClick2(data){
                // console.log(data.strToken,"2");
                this.datanodecam=[]
                this.datatoken=data.strToken;
                // this.dataindex=data.index;
                // this.dataname=data.strName;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var url = root + "/api/v1/GetRegion?token="+data.strToken+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    console.log("tokne",result);
                    var oldarr=result.data.root;
                    var oldarr1=result.data.src;
                    var dataroot=this.getchildcam(oldarr,oldarr1);
                    console.log(dataroot)
                    this.datanodecam.push(dataroot)
                })
            },
            getchildcam(arr,arr1){
                // console.log(arr,arr1)
                for(var i in arr.cam){
                    for(var j in arr1){
                        if(arr.cam[i].strToken == arr1[j].strToken){
                            // arr.cam.strName="摄像机"
                            arr.cam[i].strName = arr1[j].strName;
                            arr.cam[i].iconclass="mdi mdi-camcorder fa-fw"
                            arr.cam[i].disabled_me=arr1[j].bDisable
                            arr.cam[i].index=i
                            if(!arr1[j].bOnline)
                                arr.cam[i].iconclass = 'mdi mdi-camcorder-off fa-fw';

                            if(arr1[j].bDisable== true){
                                // newItem['disabled_me'] =true;
                                arr.cam[i].iconclass1= 'camera';
                            }

                        }
                    }
                }
                arr.iconclass="mdi mdi-view-sequential fa-fw"
                arr.strName="名称"
                return arr;
            },
            //显示
            Regional(){
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var url = root + "/api/v1/GetRegion?session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    var oldarr=result.data.root;
                    var oldarr1=result.data.src;
                    var dataroot=this.getchild(oldarr,oldarr1);
                    this.data.push(dataroot);
                })
            },
            getchild(arr,arr1) {
				// console.log(arr,arr1);
                // arr.index="1root";
				for(var i in arr.cam){
					if(!arr.cam[i].strName){
						for(var j in arr1){
							if(arr.cam[i].strToken == arr1[j].strToken){
                                // arr.cam.strName="摄像机"
                                arr.cam[i].strName = arr1[j].strName;
                                arr.cam[i].iconclass="mdi mdi-camcorder fa-fw"
                                arr.cam[i].disabled_me=arr1[j].bDisable
                                arr.cam[i].index=i
                                if(!arr1[j].bOnline)
                                    arr.cam[i].iconclass = 'mdi mdi-camcorder-off fa-fw';

                                if(arr1[j].bDisable== true){
                                    // newItem['disabled_me'] =true;
                                    arr.cam[i].iconclass1= 'camera';
                                }

							}
						}
					}
                }
                if(arr.node && arr.node.length>0){
					for (var i = 0; i < arr.node.length; i++) {
                        arr.node[i].index=this.rootindex;
                        this.rootindex=this.rootindex+1
                        arr.node[i] = this.getchild(arr.node[i],arr1);
					}
                }
                return arr;
			},
            //添加
            addto(){
                // console.log(this.rootvalue)
                // return false
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
                    var url = root + "/api/v1/AddRegion?name="+encodeURIComponent(this.rootvalue)+"&session="+ this.$store.state.token;
                    // console.log("////////////",url)
                    var oldarr=this.data[0];
                    this.$http.get(url).then(result=>{
                        // console.log(result);
                        // this.data=[];
                        // this.Regional();
                        this.addcamdatas(oldarr,this.datatoken,result.data.strToken)
                    })
                }
            },
            
            addtonond(){
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
                    var oldarr=this.data[0];
                    var oldarr1=this.datatoken
                    var url = root + "/api/v1/AddRegion?name="+encodeURIComponent(this.rootvalue)+"&parent="+this.datatoken+"&session="+ this.$store.state.token;
                    // console.log("////////////",url)
                    this.$http.get(url).then(result=>{
                        // console.log("////////////",result)
                        
                        this.addcamdatas(oldarr,oldarr1,result.data.strToken)
                        // this.data=[];
                        // this.Regional();
                    })
                }
            },
            addcamdatas(arr,arr1,strToken){
                
                if(arr1=="root"){
                    var camdata={
                        strName:this.rootvalue,
                        strToken:strToken,
                        node:[],
                        cam:[]
                    }
                    arr.node.push(camdata);
                    return false;
                }
                if(arr.node && arr.node.length>0){
                    for (var i = 0; i < arr.node.length; i++) {
                        // console.log(arr.node[i].strToken,arr1)
                        if(arr.node[i].strToken==arr1){
                            var camdata={
                                strName:this.rootvalue,
                                strToken:strToken,
                                node:[],
                                cam:[]
                            }
                            arr.node[i].node.push(camdata);
                        }
                        arr.node[i] = this.addcamdatas(arr.node[i],arr1,strToken);
                    }
                }   
                return arr;
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
                var oldarr=this.data[0];
                var oldarr1=this.datatoken
                // this.delet(oldarr,oldarr1)
                var url = root + "/api/v1/DelRegion?token="+this.datatoken+"&session="+ this.$store.state.token;
                this.$http.get(url).then(result=>{
                    if(result.status==200){
                        // this.data=[];
                        // this.Regional();
                        this.delet(oldarr,oldarr1)
                    }
                })
            },
            delet(arr,arr1){
                if(arr.node && arr.node.length>0){
					for (var i = 0; i < arr.node.length; i++) {
                        if(arr.node[i].strToken==arr1){
                            arr.node.splice(i,1)
                            return false
                        }
                        
                        arr.node[i] = this.delet(arr.node[i],arr1);
					}
				}
                return arr;
            },
            //添加摄像机
            addcam(){
                var tokencheked=this.$refs.tree.getCheckedNodes();
                // return false;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                var oldarr=this.data[0];
                for(var i=0;i<tokencheked.length;i++){
                    var oldarr1=tokencheked[i];
                    if(tokencheked[i].token==undefined){
                        continue
                    }
                    // console.log(tokencheked,oldarr,oldarr1)
                    var url = root + "/api/v1/AddRegionCam?srctoken="+tokencheked[i].token+"&regiontoken="+this.datatoken+"&session="+ this.$store.state.token;
                    this.$http.get(url).then(result=>{
                        if(result.status==200){
                            if(result.data.bStatus==true){
                                // this.data=[];
                                // this.Regional();
                            }else{
                                this.$message({
                                    message: "摄像机"+name+"添加失败",
                                    type: 'warning'
                                });
                                // return false;
                            }
                        }
                    })
                    var dataroot=this.addcamdata(oldarr,oldarr1);
                }
            },
            addcamdata(arr,arr1){
                if(arr.strToken==this.datatoken){
                    /*if(arr.cam.length==0){
                        console.log("1")
                        var camdata={
                            strToken: arr1.token,
                            strName: arr1.label,
                            iconclass: arr1.iconclass,
                            iconclass1: "",
                            name: arr1.name,
                            disabled_me: false,
                        }
                        arr.cam.push(camdata);
                    }else{
                        for(var i=0;i<arr.cam.length;i++){
                            console.log(arr.cam[i].strToken,arr1.token,"2")
                            if(arr.cam[i].strToken==arr1.token){
                                console.log(arr.cam[i].strToken,arr1.token,"4")
                                continue
                                // console.log(arr.cam[i].strToken,arr1.token,"5")
                            }
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
                    }*/
                    var camdata={
                        strToken: arr1.token,
                        strName: arr1.label,
                        iconclass: arr1.iconclass,
                        iconclass1: "",
                        name: arr1.name,
                        disabled_me: false,
                    }
                    arr.cam.push(camdata);
                    for(var i=0; i<arr.cam.length; i++){
                        for(var j=i+1; j<arr.cam.length; j++){
                            if(arr.cam[i].strToken==arr.cam[j].strToken){
                                arr.cam.splice(j,1);
                                j--;
                            }
                        }
                    }
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
                // var token=`menuPermissionTree1${this.dataindex}`
                var tokencheked=this.$refs.menuPermissionTree1.getCheckedNodes();
                console.log(tokencheked)
                // return false;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }
                if(tokencheked.length==0){
                    return false;
                }
                var oldarr=this.datanodecam[0];
                for(var i=0;i<tokencheked.length;i++){
                    if(tokencheked[i].strToken==this.datatoken){
                        continue
                    }
                    console.log(tokencheked[i].strToken)
                    
                    var oldarr1=tokencheked[i];
                    
                    var dataroot=this.delcamdata(oldarr,oldarr1);
                    var url = root + "/api/v1/DelRegionCam?srctoken="+tokencheked[i].strToken+"&regiontoken="+this.datatoken+"&session="+ this.$store.state.token;
                    this.$http.get(url).then(result=>{
                        if(result.status==200){
                            if(result.data.bStatus==true){
                            }else{
                                this.$message({
                                    message: "摄像机"+name+"删除失败",
                                    type: 'warning'
                                });
                                // return false;
                            }
                        }
                    })
                }
            },
            delcamdata(arr,arr1){
                // console.log(arr)
                for(var i=0;i< arr.cam.length;i++){
                    
                    if(arr.cam[i].strToken==arr1.strToken){
                        // console.log("********");
                        arr.cam.splice(i,1)
                    }
                }
                // if(arr.node && arr.node.length>0){
				// 	for (var i = 0; i < arr.node.length; i++) {
                //         arr.node[i] = this.delcamdata(arr.node[i],arr1);
				// 	}
				// }
                return arr;
            },
            handleNodeClick1(data){
                this.delcamtoken=data.strToken;
                console.log(data);
            },
            //点击节点
            handleNodeClick(data) {
                console.log(data.strToken);
                this.datatoken=data.strToken;
                this.dataindex=data.index;
                this.dataname=data.strName;
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.strName.indexOf(value) !== -1;
            },
            removeTab(targetName) {
                if(targetName.name=="first"){
                    this.data=[];
                    this.Regional();
                }else if(targetName.name=="first1"){
                    this.data=[];
                    this.Regional();
                }
                
                //this.reload();
            }
        },
    }
</script>
<style scoped>
/* 第三个框 */
.datanodecam{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el_tree1{
    margin-left: -6px;
}
.el-tree {
    font-size: 16px;
    color: #333333;
    font-weight: 600;
    margin: 0;
}
.el-tree >>> i{
    font-weight: 600;
    color: #333333;
}
.el-tree >>> label{
    margin: 0;
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
    width: auto;
    /* width: 20%; */
    min-width: 250px;
    height: 600px;
    /* max-height: 700px; */
    overflow: auto;
    border: 1px solid #e1e1e1;
    padding: 0 15px;
    padding-top: 10px;
    
}
.Root_node1{
    width: auto;
    min-width: 250px;
    height: 600px;
    overflow: auto;
    border: 1px solid #e1e1e1;
    padding: 0 15px;
    padding-top: 10px;
}
.Root_node2{
    width: auto;
    min-width: 300px;
    height: 600px;
    overflow: auto;
    border: 1px solid #e1e1e1;
    padding: 0 15px;
    padding-top: 10px;
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