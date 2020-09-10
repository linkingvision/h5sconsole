<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850">
            <!-- 1 -->
            
            <el-tab-pane :label="label.system" name="cloudmode">
                <el-button class="system_but" type="success" round size="mini" @click="systemsave">{{label.Snopshot}}</el-button>
                <div class="system_content">
                    <div class="system_content_top">
                        <div>{{label.SnapshotList}}</div>
                        <div @click="GetSnapshotList">
                            <i class="iconfont icon-zhongqi"></i>
                            {{label.Refresh}}
                        </div>
                    </div>
                    <div class="system_content_botm">
                        <div>{{label.Name}}</div>
                        <div v-for="(a,index) in dataarr" :key="index">
                            {{a}}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:'system',
    data(){
        return {
            activeName:'cloudmode',
            dataarr:[],
            label:{
                system:this.$t("message.setting.System"),
                Snopshot:this.$t("message.setting.Snopshot"),
                SnapshotList:this.$t("message.setting.SnapshotList"),
                Name:this.$t("message.setting.Name"),
		        Refresh:this.$t("message.setting.Refresh"),
            },
        }
    },
    mounted(){
        this.GetSnapshotList();
    },
    methods:{
        GetSnapshotList(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetSnapshotList?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    var itme=result.data;
                    this.dataarr=itme.strName
                    console.log(this.dataarr)
                }
            })
        },
        systemsave(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/CreateSnapshot?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    if(result.data.bStatus){
                        this.$message('保存成功')
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.system_but{
    font-size: 14px;
    background-color: #74C7B2;
    padding: 5px 18px;
}
.system_content_top{
    display: flex;
    justify-content: space-between;
}
.system_content_top div:nth-child(1){
    opacity: 0.7;
}
.system_content_top div:nth-child(2){
    color: #53BCA1;
    cursor:pointer;
}
.system_content_botm{
    width: 100%;
    height: 500px;
    border: 1px solid #BFBFBF;
    overflow: auto;
    padding: 10px 10px;
    
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    opacity: 0.8;
}
.system_content_botm div{
    margin-bottom: 10px;
}

.system_content{
    width: 350px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    margin: 20px 0;
}

</style>