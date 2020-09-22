<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850" @tab-click="removeTab">
            <!-- 1 -->
            
            <el-tab-pane :label="label.Protocol" name="cloudmode">
                {{label.Protocol}}
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
            activeName:'cloudmode',
            label:{
                Protocol:this.$t("message.setting.Protocol"),
            },
            options: [{
                value: 'H5_LOG_DEBUG',
                label: 'H5_LOG_DEBUG'
                }, {
                value: 'H5_LOG_INFO',
                label: 'H5_LOG_INFO'
                },{
                value: 'H5_LOG_WARNING',
                label: 'H5_LOG_WARNING'
                },{
                value: 'H5_LOG_ERROR',
                label: 'H5_LOG_ERROR'
            }],
            value: '',
            system:null,
        }
    },
    mounted(){
        this.systemdata()
    },
    methods:{
        systemchange(){
            console.log(this.system)
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/SetIpPortCheck?enable="+this.system+"&session="+ this.$store.state.token;
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