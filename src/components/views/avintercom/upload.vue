<template>
    <div class="up_load">
        <div class="up_content">
            <div class="up_content_zuo">
                <video class="h5video" id="h5sVideoLocal" volume='0' muted autoplay webkit-playsinline playsinline></video>
            </div>
            <div class="up_content_you">
                <div class="up_you_content">
                    <span>Video Codec</span>
                    <el-select style="width:75%" v-model="VideoCodec" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in VideoCodecs"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="up_you_content">
                    <span>Video In</span>
                    <el-select style="width:75%" v-model="VideoIn" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in VideoIns"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="up_you_content">
                    <span>Audio In</span>
                    <el-select style="width:75%" v-model="AudioIn" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in AudioIns"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                
                <div class="up_you_content">
                    <span>Audio Out</span>
                    <el-select style="width:75%" v-model="AudioOut" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in AudioOuts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="up_you_content">
                    <span>Resolution</span>
                    <el-select style="width:75%" v-model="Resolution" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in Resolutions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>

                <div class="up_you_content">
                    <span>Bitrate（Kpbs）</span>
                    <el-select style="width:75%" v-model="Bitratess" size="small" placeholder="请选择">
                        <el-option
                        v-for="item in Bitrates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="up_you_content">
                    <span>Audio</span>
                    <el-switch
                        style="width:75%"
                        v-model="audioout"
                        active-color="#5DBFA6">
                    </el-switch>
                </div>

                <div class="up_you_content">
                    <el-button @click="connection" class="button_addpv" type="success" round size="mini">{{$t("message.Conference.Connect")}}</el-button>
                    <el-button @click="down" class="button_addpv1" type="success" round size="mini">{{$t("message.Conference.Disconnect")}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {H5sRTCGetCapability,H5sRTCPush} from '../../../assets/h5splayer'
export default {
    name:"upload",
    data(){
        return {
            VideoCodecs: [],
            VideoCodec:"",

            VideoIns: [],
            VideoIn:"",

            AudioIns: [],
            AudioIn:"",

            AudioOuts: [],
            AudioOut:"",

            Resolutions: [],
            Resolution:"",

            Bitrates: [],
            Bitratess:"",
            audioout:true,
            v1:undefined
        }
    },
    beforeDestroy(){
        if (this.v1 != undefined)
        {
            this.v1.disconnect();
            delete this.v1;
            this.v1 = undefined;
        }
    },
    mounted(){
        this.updisplay();
    },
    methods:{
        connection(){
            if (this.v1 != undefined)
            {
                this.v1.disconnect();
                delete this.v1;
                this.v1 = undefined;
            }
            var wsroot = process.env.WS_HOST_ROOT;
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            var audioout=this.audioout.toString();
            var conf1 = {
                localvideoid:'h5sVideoLocal', //{string} - id of the local video element tag
                //localvideodom: h5svideodomlocal, //{object} - local video dom. if there has videoid, just use the videoid
                protocol: window.location.protocol, //http: or https:
                host:wsroot, //localhost:8080
                rootpath:'/', // {string} - path of the app running
                user:this.$store.state.users, // {string} - user name
                type:'media', // {string} - media or sharing
                audio: audioout,
                callback: null, //Callback for the event
                userdata: null, // user data
                session: this.$store.state.token, //session got from login
                consolelog: 'true' // 'true' or 'false' enable/disable console.log
            };
            console.log("***********",conf1, audioout)
            // return false
            console.log("*******",this.VideoCodec,"1*",
                this.VideoIn,"2*",
                this.Bitratess,"5*",
                this.Resolution,"3*",
                this.AudioIn,
            )
                // return false
            this.v1 = new H5sRTCPush(conf1);
		    this.v1.connect(
                this.VideoIn,
                this.VideoCodec,
                this.Bitratess,
                this.Resolution,
                this.AudioIn,
                false
            );
            console.log(this.AudioIn)
        },
        down(){
            this.v1.disconnect();
        },
        updisplay(){
            var up=H5sRTCGetCapability(this.UpdateCapability);
        },
        UpdateCapability(capability){
            
            console.log(capability);
            if(capability){

                for (let i = 0; i !== capability['videocodec'].length; ++i) {
                    const data = capability['videocodec'][i];
                    var src={
                        value: data,
                        label: data
                    }
                    this.VideoCodec = data
                    this.VideoCodecs.push(src);
                }
                for (let i = 0; i !== capability['videocodec'].length; ++i) {
                    const data = capability['videocodec'][i];
                    if (data == 'H264')
                    {
                        this.VideoCodec = data
                    }
                }
                for (let i = 0; i !== capability['videoin'].length; ++i) {
                    const data = capability['videoin'][i];
                    var src={
                        value: data.id,
                        label: data.name
                    }
                    this.VideoIn=data.id
                    this.VideoIns.push(src);
                }	

                for (let i = 0; i !== capability['audioin'].length; ++i) {
                    const data = capability['audioin'][i];
                    var src={
                        value: data.id,
                        label: data.name
                    }
                    this.AudioIn=capability['audioin'][0].id
                    this.AudioIns.push(src);
                }
                
                for (let i = 0; i !== capability['audioout'].length; ++i) {
                    const data = capability['audioout'][i];
                    var src={
                        value: data.id,
                        label: data.name
                    }
                    this.AudioOut=capability['audioout'][0].id
                    this.AudioOuts.push(src);
                }
                
                var resolution = ['QVGA', 'VGA', 'D1', '720P', '1080P', '4K', '8K']
                for (let i = 0; i !== resolution.length; ++i) {
                    const data = resolution[i];
                    /* Default use 720P */
                    
                    var src={
                        value: data,
                        label: data
                    }
                    // this.Resolution=data
                    if (data == '720P')
                    {
                        this.Resolution=data
                    }
                    this.Resolutions.push(src);
                }
                
                var bitrate = ['32', '64', '128', '256', '512', '1024', '2048', '4096']
                for (let i = 0; i !== bitrate.length; ++i) {
                    const data = bitrate[i];
                    var src={
                        value: data,
                        label: data
                    }
                    // this.Bitratess=data
                    /* Default use 720P */
                    if (data == '1024')
                    {
                        this.Bitratess=data
                    }
                    this.Bitrates.push(src);
                }
            }
        }
    }
}
</script>
<style scoped>
.h5video{
    width: 100%;
    height: 100%;
   object-fit: fill;
}
.button_addpv{
    border: 0;
    background: #65BAA5;
}
.button_addpv1{
    border: 0;
    background: #2499DA;
}
.up_load{
    width: 100%;
    /* height: 100%; */
    height: 750px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
}
.up_content{
    width: 70%;
    height: 50%;
    margin-bottom: 10%;
    box-shadow:0px 2px 35px 0px rgba(224,224,224,0.32);
    display: flex;
    /* justify-content: center; */
}
.up_content_zuo{
    position: relative;
    width: 50%;
    background-color: #E2E2E2;
}
.up_content_you{
    width: 50%;
    height: 100%;
    padding: 25px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    /* background-color: #E0E0E0; */
}
.up_you_content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content:space-around;
}
.up_you_content span{
    width: 25%;
}
</style>