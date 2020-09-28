<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850" @tab-click="removeTab">
            <!-- 1 -->
            
            <el-tab-pane label="Docker" name="cloudmode">
                Docker
                <el-switch
                    @change="systemchange"
                    v-model="system"
                    active-color="#53BCA1"
                    inactive-color="#DCDFE6">
                </el-switch>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:'portcheck',
    data(){
        return {
            input:'',
            activeName:'cloudmode',
            label:{
                Protocol:this.$t("message.setting.Protocol"),
                KeepaliveTime:this.$t("message.GB.KeepaliveTime"),
                ServiceDetection:this.$t("message.setting.ServiceDetection"),
            },
            value: '',
            system:null,
        }
    },
    mounted(){
        this.systemdata()
    },
    methods:{
        systemchange(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/SetEnableLinkagent?enable="+this.system+"&session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    // this.$message('修改成功,请重启。')
                    // this.$root.bus.$emit('webrtc',true);
                }
            })
        },
        systemdata(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetEnableLinkagent?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.system=result.data.enable
                }
            })
        },
        //选项卡
        removeTab(targetName) {
        },
    }
}
</script>

<style scoped>
.log_log{
    display: flex;
    align-items: center;
}
.log_log div:nth-child(1){
    margin-right: 10px;
}
</style>