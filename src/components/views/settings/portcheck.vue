<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850" @tab-click="removeTab">
            <!-- 1 -->
            
            <el-tab-pane label="RTSP" name="cloudmode">
                {{label.ServiceDetection}}
                <el-switch
                    @change="systemchange"
                    v-model="system"
                    active-color="#53BCA1"
                    inactive-color="#DCDFE6">
                </el-switch>
                <div class="portcheck">
                    {{label.KeepaliveTime}} <el-input class="portcheck_input" style="width:100px" v-model="input" type='number'></el-input>(S)
                </div>
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
            var url = root + "/api/v1/SetIpPortCheck?enable="+this.system+"&period="+this.input+"&session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.$message('修改成功,请重启。')
                    this.$root.bus.$emit('webrtc',true);
                }
            })
        },
        systemdata(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetIpPortCheck?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.input=result.data.nDetentionPeriod
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
.portcheck{
    margin-top: 10px;
}
.portcheck_input >>> .el-input__inner{
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.log_log{
    display: flex;
    align-items: center;
}
.log_log div:nth-child(1){
    margin-right: 10px;
}
</style>