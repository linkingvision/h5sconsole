<template>
    <div>
        <el-tabs v-model="activeName" type="border-card" max-height="850" @tab-click="removeTab">
            <!-- 1 -->
            
            <el-tab-pane :label="label.log" name="cloudmode">
                <div class="log_log">
                    
                    <div>{{label.log}}</div>
                    
                    <el-select v-model="value" style="width:150px" size='mini' placeholder="请选择" @change='loglevelchange'>
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="label.Loop" name="cloudmode1">
                {{label.Loop}}
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
    name:'log',
    data(){
        return {
            activeName:'cloudmode',
            label:{
                log:this.$t("message.setting.LogLevel"),
                Loop:this.$t("message.setting.LogRotating")
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
        this.loglevel()
    },
    methods:{
        systemchange(){
            console.log(this.system)
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/SetRotatingLog?enable="+this.system+"&session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.$message('修改成功')
                    this.$root.bus.$emit('webrtc',true);
                }
            })
        },
        systemdata(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetRotatingLog?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.system=result.data.enable
                }
            })
        },
        //log
        loglevelchange(){
            console.log(this.value)
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/SetLogLevel?level="+this.value+"&session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.$message('修改成功')
                    this.$root.bus.$emit('webrtc',true);
                }
            })
        },
        loglevel(){
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetLogLevel?session="+ this.$store.state.token;
            // console.log(url)
            this.$http.get(url).then(result=>{
                console.log(result)
                if(result.status == 200){
                    this.value=result.data.strLevelLog
                }
            })
        },
        //选项卡
        removeTab(targetName) {
            // console.log(targetName);
            if(targetName.name=='cloudmode'){
                this.loglevel()
            }else if(targetName.name=='cloudmode1'){
                this.systemdata()
            }
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