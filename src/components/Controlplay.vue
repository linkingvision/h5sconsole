<template>
    <div class="control-play">
        <video class="h5video" :id="videoid" autoplay webkit-playsinline playsinline></video>
    </div>
</template>

<script>
import '../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../assets/h5splayer.js'
import {H5siOS,H5sPlayerCreate} from '../assets/h5splayerhelper.js'
export default {
    props:['h5id', 'h5videoid'],
    name: 'Controlplay',
    data () {
        return {
            videoid: this.h5videoid,
            h5handler: undefined,//视频内容
            currtoken: undefined,
            proto: 'RTC',
            tokenshou:""
        }
    },
    beforeDestroy() {
        this.h5handler.disconnect();
        delete this.h5handler;
        this.h5handler = undefined;
        console.log("000")
    },
    mounted(){
        var _this=this;
        this.$root.bus.$on('controltour', function(token,streamprofile, id)
        {
            if (_this.h5id != id)
            {
                return;
            }
            _this.PlayVideo(token,streamprofile);
            _this.tokenshou=token;
        });
    },
    methods:{
        PlayVideo(token,streamprofile)
        {
            $("#" + this.h5videoid).get(0).load();
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            this.currtoken = token;
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            let conf = {
                videoid: this.h5videoid,
                protocol: window.location.protocol, //http: or https:
                host: wsroot, //localhost:8080
	            streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token //session got from login
            };
            console.log("+++++++++++++",conf);
            
            var $container = $("#"+this.h5id);
            var $controls = $container.children(".h5controls");
            var $rtcbutton = $controls.children(".rtcbutton");

            if (this.proto == 'RTC' || (H5siOS() === true))
            {
                $rtcbutton.css("display", "block");
                this.h5handler = new H5sPlayerRTC(conf);
            }else
            {
                $rtcbutton.css("display", "none");
                this.h5handler = new H5sPlayerWS(conf);
            }
            //return false;
            this.h5handler.connect();
        }
    }
}
</script>
<style scoped>
.control-play{
    width: 100%;
    height: 100%;
}
.h5video{
    width: 100%;
    height: 100%;
    object-fit: fill;
}
</style>

