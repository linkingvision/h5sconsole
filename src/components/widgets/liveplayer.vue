<template>
<div class="h5videowrapper h5container" >
    <canvas class="canh5video" width=960 height=540 :id="canvasplay" ></canvas>
    <video class="h5video" @click="redborder" :id="videoid" autoplay webkit-playsinline playsinline></video>
    <div :id="videonameid" class="" >
        {{videoname}} {{picturequality}}
       <input type="button" :value="valuebutton"  @click="Bitstream($event.target.value)" :id="inputid" class=""/>
    </div>
   <!-- 画质 -->
    <span class=" "  :id="spanqualityid">
        <el-dropdown placement='top-end' trigger="click"  @command="handleCommand" class=" "  :id="qualityid">
            <span :id="elqualityid" class="el-dropdown-link">
                <i class="el-icon-video-camera el-icon--left"></i>{{$t('message.live.Quality')}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <template >
                <el-dropdown-item v-for="(it,index) in qualitylist"   :key="index" :command="it">{{it.strName}}</el-dropdown-item>
              </template>
           </el-dropdown-menu>
       </el-dropdown>
    </span>
    <div :id="rtcid" class=""></div>
    <div class="h5controls"  style="display:none padding:0px;">
        <button type="button" class="vidbuttion pull-right iconfont icon-roundclosefill" style="margin-right: 20px;" @click="CloseVideo($event)"></button>
        <button type="button" class="vidbuttion pull-right iconfont icon-full" @click="FullScreen($event)"></button>
        <button :id="ptz"  type="button" class="btn vidbuttion pull-right" @click="PtzControlShow($event)"></button>
        <!-- <button type="button" class="btn vidbuttion pull-right rtcbutton" > <i class="mdi mdi-format-title"></i></button> -->
        <button type="button" class="vidbuttion pull-right iconfont icon-radioboxfill" @click="DoManualRecordStop($event)"></button>
        <button type="button" class="vidbuttion pull-right iconfont icon-videofill" @click="DoManualRecordStart($event)"></button>
        <button type="button" class="vidbuttion pull-right iconfont icon-camerafill" @click="DoSnapshot($event)"></button>
        <button type="button" class="vidbuttion pull-right iconfont icon-picfill" @click="DoSnapshotWeb($event)"></button>
        <button type="button" class="vidbuttion pull-right" @click="Shoutwheat($event)"> <i :class="Shoutwheatclass"></i></button>
        <!-- <button type="button" class="vidbuttion pull-right iconfont icon-fangda" @click="Electronic($event)"></button> -->
        <Poptip placement="bottom" class=" pull-right">
            <button class="vidbuttion iconfont icon-erweima" @click="qrcode"></button>
            <div class="api" slot="content">
                <div class="bottom_QR">
                    <div class="bottom_scan">{{$t("message.live.Scan")}}</div>
                    <div class="bottom_QRcode">
                        <div>
                            <div ref="qrcodead" id="qrcodead1" style="margin-bottom: 16px;"></div>
                            <div>Android</div>
                        </div>
                        <div>
                            <div ref="qrcodeios" id="qrcodeios1" style="margin-bottom: 16px;"></div>
                            <div>iOS</div>
                        </div>
                    </div>
                </div>
            </div>
        </Poptip>
        <!-- <el-popover
            placement="bottom"
            trigger="click">
            
            <div class="bottom_QR">
                <div class="bottom_scan">{{$t("message.live.Scan")}}</div>
                <div class="bottom_QRcode">
                    <div>
                        <div ref="qrcodead" id="qrcodead1" style="margin-bottom: 16px;"></div>
                        <div>Android</div>
                    </div>
                    <div>
                        <div ref="qrcodeios" id="qrcodeios1" style="margin-bottom: 16px;"></div>
                        <div>iOS</div>
                    </div>
                </div>
            </div>
            <button slot="reference" class="vidbuttion pull-right iconfont icon-erweima" @click="qrcode"></button>
        </el-popover> -->
    </div>
    <!-- <canvas class="myCanvas" :id="canvaid" width="170" height="105"></canvas> -->

    <div class="ptzcontrols"  style="display:none padding:0px">
        
        <div class="flex_content">
            <div class="content_zoom">
                <div class="key_zoom">
                    <div class="key_flex">
                        <div class="key_but" @mousedown ="PtzActionUpleft($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionUpleft($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" @mousedown ="PtzActionUp($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionUp($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" @mousedown ="PtzActionUpright($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionUpright($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" @mousedown ="PtzActionLeft($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionLeft($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" ></div>
                        <div class="key_but" @mousedown ="PtzActionRight($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionRight($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" @mousedown ="PtzActionDownleft($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionDownleft($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" @mousedown ="PtzActionDown($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionDown($event)" @touchend="PtzActionStop($event)"></div>
                        <div class="key_but" @mousedown ="PtzActionDownright($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionDownright($event)" @touchend="PtzActionStop($event)"></div>
                    </div>
                </div>
                <div class="zoom">
                    <el-tooltip :enterable="false" :content="content.focusing" placement="top" effect="light">
                        <button class="iconfont icon-add-focus zoom_add" @mousedown ="PtzActionZoomIn($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionZoomIn($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.focusing" placement="top" effect="light">
                        <button class="iconfont icon-reduce-focus zoom_add" @mousedown ="PtzActionZoomOut($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionZoomOut($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>

                    <el-tooltip :enterable="false" :content="content.Focus" placement="top" effect="light">
                        <button class="iconfont icon-jujiao2 zoom_add" @mousedown ="PtzActionfocusing($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionfocusing($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.Focus" placement="top" effect="light">
                        <button class="iconfont icon-jujiao1 zoom_add" @mousedown ="PtzActionfocusings($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionfocusings($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>

                    <el-tooltip :enterable="false" :content="content.aperture" placement="top" effect="light">
                        <button class="iconfont icon-guangquanjia zoom_add" @mousedown ="PtzActionaperture($event)" @mouseup="PtzActionStop($event)" @touchstart ="PtzActionaperture($event)" @touchend="PtzActionStop($event)"></button>
                    </el-tooltip>
                    <el-tooltip :enterable="false" :content="content.aperture" placement="top" effect="light">
                        <button class="iconfont icon-guangquanjian zoom_add"  @mousedown ="PtzActionaperturej" @mouseup="PtzActionStop" @touchstart ="PtzActionaperturej" @touchend="PtzActionStop"></button>
                    </el-tooltip>
                </div>
            </div>
            <div class="Preset">
                <div class="" style="text-align: center;">
                    <el-slider v-model="Preset_value" :show-tooltip="false" :max="1" :min="0.1" :step="0.1"></el-slider>
                    <span style="color:#ffffff;">{{Preset_value}}</span>
                </div>
                <div class="block">
                    <el-timeline>
                        <el-timeline-item placement="top" v-for="Pre in Presetdata" :key="Pre.strName" >
                            <el-card>
                                <div class="preset_bgc">
                                    <input type="text" class="preset_input" :value="Pre.strName"/>
                                    <button type="button" class="iconfont icon-RectangleCopy1" @click="preset_Jump(Pre.strToken)"></button>
                                    <button type="button" class="iconfont icon-icon-test" @click="preset_set(Pre.strToken,$event)"></button>
                                </div>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import QRCode from 'qrcodejs2';
import '../../assets/adapter.js'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../assets/h5splayer.js'
import {H5sPlayerCanvas} from '../../assets/linkplayer.js'
import {H5siOS,H5sPlayerCreate} from '../../assets/h5splayerhelper.js'
import "../../../static/lang/en"
export default {
    name: 'liveplayer',
    props:['h5id', 'h5videoid',"cols","rows","canvasid"],
    data () {
        return {
            Electronichide:false,//电子放大
            content:{
                focusing:this.$t('message.live.focusing'),
                Focus:this.$t('message.live.Focus'),
                aperture:this.$t('message.live.aperture')
            },
            canvaid: this.canvasid,
            videoid: this.h5videoid,
            ptz:"ptz"+ this.h5videoid,
            videonameid:"name"+this.h5videoid,
            rtcid:"rtc"+this.h5videoid,
            h5handler: undefined,//视频内容
            h5handlercavas:undefined,
            currtoken: undefined,
            ptzshow: false,
            proto: 'WS',
            Shoutwheatclass:"mdi mdi-microphone-off",
            tokenshou:"",
            audioback: undefined,//视频内容
            videoname:"",//视频名称
            Presetdata:[],//预置位数组
            Preset_value:0.5,//镜头转换速度
            streamprofile:'',
            valuebutton:this.$t("message.live.substream"),
            inputtoken:'',
            inputlabel:'',
            name:'',
            canvasplay:"canvasplay"+this.h5videoid,
            inputid:"input"+this.h5videoid,
            qualityid: 'quality'+this.h5videoid,
            elqualityid:'elqualityid'+this.h5videoid,
            spanqualityid:"spanqualityid"+this.h5videoid,
            picturequalityid:"picturequalityid"+this.h5videoid,
            qualitylist:[],
            picturequality:'',//画质名称
            qualityform:[],
            canvasdate:"",
            wathlinkwed:this.$store.state.link,
            cavaswidth:'',
            cavasheidht:''
        }
    },
    activated() {
        //console.log(this.h5id, "activated");
    },
    deactivated() {
        //console.log(this.h5id, "deactivated");
    },
    beforeDestroy() {
        clearInterval(this.canvasdate);
        //console.log(this.h5id, "beforeDestroy");
        if (this.h5handler != undefined)
        {
            this.h5handler.disconnect();
            delete this.h5handler;
            this.h5handler = undefined;
        }
        this.currtoken = undefined
    },
    destroyed() {
        //console.log(this.h5id, "destroyed");
    },
   
    mounted() {
        if (window.ActiveXObject || "ActiveXObject" in window){
            this.wathlinkwed='true'
            console.log("liveviewplay",typeof( this.wathlinkwed), this.wathlinkwed)
        }
        // console.log("liveviewplay",typeof( this.wathlinkwed), this.wathlinkwed)
        // return false
        if(this.wathlinkwed=='true'){
            $("#"+this.videoid).hide();
        }else if(this.wathlinkwed=='false'){
            $("#"+this.canvasplay).hide();
        }
        // this.qrcode();
        var $container = $("#"+this.h5id);
        var $video =$container.children("video");
        var videodom = $container.children("video").get(0);
        var $controls = $container.children(".h5controls");
        // console.log($controls)
        var $rtcbutton = $controls.children(".rtcbutton");
    
        let _this = this;
        this.$root.bus.$on('liveplaylink', function(link){
            _this.wathlinkwed=link
        });
        this.$root.bus.$on('liveplay', function(token,streamprofile,label,name, id)
        {
            // this.videoname=label;//视频名称
            // console.log("++++++++++++++++++++",label,this.videoname)
            if (_this.h5id != id)
            {
                return;
            }
            
            _this.PlayVideo(token,streamprofile,label,name);
            _this.tokenshou=token;
            console.log("-----------------",_this.tokenshou)
        });

        // this.$root.bus.$on('liveplayproto', function(proto)
        // {
        //     _this.proto = proto;
        //     //储存
        //     localStorage.setItem("proto",_this.proto);
        //     //console.log("liveplayproto", _this.proto);
        // });

        // control visibility
        $container.on("mouseover mouseout touchstart touchmove", function(e) {
            $controls.css("display", e.type === "mouseout" ? "none" : "block");
            //$controls.css("display", e.type === "touchend" ? "none" : "block");
        });
        
         $("#"+this.spanqualityid).addClass("spanquality")
         $("#"+this.inputid).addClass("spanpicturequality")
        // 转码
       this. Gettranscod()
    },
    watch:{
        wathlinkwed(val){
            clearInterval(this.canvasdate);
            if (this.h5handler != undefined)
            {
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                $("#" + this.h5videoid).get(0).load();
                $("#" + this.h5videoid).get(0).poster = '';
            }
            this.currtoken = undefined
            var c=document.getElementById(this.canvasplay);  
            var cxt=c.getContext("2d");  
            c.height=c.height;  
            if(this.wathlinkwed=='true'){
                $("#"+this.videoid).hide();
                $("#"+this.canvasplay).show();
            }else if(this.wathlinkwed=='false'){
                $("#"+this.canvasplay).hide();
                $("#"+this.videoid).show();
            }
            console.log(val,this.wathlinkwed,"监听")
        },
    },
    methods: {
        
     
        PlayVideo(token,streamprofile,label,name)
        { 
            var videosize = document.querySelector('#'+this.h5id);
            // return false;
           this.inputtoken=token
           this.inputlabel=label
           this.streamprofile=streamprofile
            // this.streamprofile=streamprofile
            this.videoname=label;//视频名称
           
            $("#"+this.videonameid).addClass("videoname");
            $("#"+this.inputid).addClass("streambutton")
            $("#"+this.qualityid).addClass("quality")
            $("#"+this. picturequalityid).removeClass("picturequality")      
            //console.log("*********************",label,token);
            $("#"+this.spanqualityid).removeClass("spanquality")
            $("#"+this.inputid).removeClass("spanpicturequality") 
            if (this.h5handler != undefined)
            {
                document.getElementById("icon"+this.tokenshou).style.color="rgb(142, 132, 132)";
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
            }
            this.currtoken = token;
            // console.log(streamprofile,"111111111111111111*****")
            if(streamprofile==="sub"){
                this.valuebutton=this.$t("message.live.mainstream ")
            } else if(streamprofile==="main"){
                this.valuebutton=this.$t("message.live.substream")
            }else{
                this.valuebutton=this.$t("message.live.substream")
            }
            if(this.wathlinkwed=='true'){
                console.log("ieieieieieie",this.wathlinkwed);
                // return false
                // this.cavaswidth=widthx;
                // this.cavasheidht=heightx;
                // console.log(widthx,heightx,this.h5id);
                var confk= this.playclick(this.canvasplay,token,streamprofile);
                this.h5handler = new H5sPlayerCanvas(confk);
                this.playjkwh(videosize,confk);
            }else if(this.wathlinkwed=='false'){
                console.log("cocococ",this.wathlinkwed)
                // return false
                var $container = $("#"+this.h5id);
                var $controls = $container.children(".h5controls");
                var $rtcbutton = $controls.children(".rtcbutton");

                var confk= this.playclick(this.h5videoid,token,streamprofile);
                console.log(confk)
                // return false
                if (this.$store.state.rtc == 'RTC' || (H5siOS() === true))
                {
                    console.log(this.$store.state.rtc)
                    $rtcbutton.css("display", "block");
                    this.h5handler = new H5sPlayerRTC(confk);
                    $("#"+this.rtcid).addClass("rtc_new");
                }else
                {
                    $rtcbutton.css("display", "none");
                    this.h5handler = new H5sPlayerWS(confk);
                }
                console.log(this.$store.state.rtc,"11212")
            }
            this.h5handler.connect();
            

        },
        playjkwh(videosize,confk){
            console.log(this.h5handler,confk,"**********")
            var resizeElement = document.createElement('iframe');
            var a=document.getElementById(this.canvasplay);
            var _this=this
            console.log(resizeElement)
            resizeElement.style.width = '100%';
            resizeElement.style.height = '100%';
            resizeElement.style.position= 'absolute';
            resizeElement.style.visibility='hidden';
            resizeElement.style.margin= '0';
            resizeElement.style.padding= '0';
            resizeElement.style.border= '0';
            videosize.appendChild(resizeElement);
            resizeElement.contentWindow.onresize = function () 
            {
                if (_this.h5handler != undefined)
                {
                    console.log(_this.h5handler,confk,"**********")
                    // document.getElementById("icon"+this.tokenshou).style.color="rgb(142, 132, 132)";
                    _this.h5handler.disconnect();
                    delete _this.h5handler;
                    _this.h5handler = undefined;
                    var c=document.getElementById(_this.canvasplay);  
                    var cxt=c.getContext("2d");  
                    c.height=c.height; 
                    
                    _this.h5handler = new H5sPlayerCanvas(confk);
                    console.log(_this.h5handler,confk,"**********")
                    // return false
                    _this.h5handler.connect();

                }else{
                    console.log(_this.h5handler,"**********")
                    return false;
                }
                
            };
        },
        playclick(playid,token,streamprofile){
            var wsroot = process.env.WS_HOST_ROOT;
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            console.log(playid,token,streamprofile)
            let conf = {
                videoid:playid,
                protocol: window.location.protocol, //http: or https:
                host: wsroot, //localhost:8080
                streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token //session got from login
            };
            
            //码流按钮
            return conf;
        
            
        },
        //关闭
        CloseVideo(event)
        {   
            var _this=this
            clearInterval(this.canvasdate);
            if (this.audioback != undefined)
            { 
               // console.log("关闭");
                this.audioback.disconnect();
                delete this.audioback;
                this.audioback = undefined;
                this.Shoutwheatclass="mdi mdi-microphone-off";
            }
            this.videoname="";
            this.valuebutton='';
            var $container = $("#"+this.h5id);
            var $ptzcontrols = $container.children(".ptzcontrols");
            
            // var valueId=document.getElementById('inputid ')
            // var divId=document.getElementById('divid')
            // console.log(divId)
            $ptzcontrols.css("display", "none");
            $("#"+this.videonameid).removeClass("videoname");
            $("#"+this.inputid).removeClass("streambutton")
            $("#"+this.qualityid).removeClass("quality")
            $("#"+this.rtcid).removeClass("rtc_new");
            $("#"+this.spanqualityid).addClass("spanquality")
            $("#"+this.inputid).addClass("spanpicturequality")
            document.getElementById("icon"+this.tokenshou).style.color="rgb(142, 132, 132)";
           
            var $container = $("#"+this.h5id);
            var $controls = $container.children(".h5controls");
            var $rtcbutton = $controls.children(".rtcbutton");
            if (this.h5handler != undefined)
            {
                $rtcbutton.css("display", "none");
                this.h5handler.disconnect();
                delete this.h5handler;
                this.h5handler = undefined;
                this.$Notice.info({
                    title: "Stop successfully"
                });

                $("#" + this.h5videoid).get(0).load();
                $("#" + this.h5videoid).get(0).poster = '';
                
                var c=document.getElementById(_this.canvasplay);  
                var cxt=c.getContext("2d");  
                c.height=c.height;  
                
                console.log("关闭1",this.h5handler);

            }
           console.log("关闭",this.h5handler);
        },
        //电子放大
        Electronic(){
            console.log("电子放大")
            var root = process.env.API_ROOT;
            if (root == undefined) {
                root =window.location.protocol + "//" +window.location.host +window.location.pathname;
            }
            var v = document.getElementById(this.videoid);
            if(v.poster!=""||v.poster!="http://localhost:6080/"||v.poster!=root){
                if(this.Electronichide==false){
                    this.Electronichide=true;
                    $("#"+this.canvaid).show();
                    this.Electronicopen();
                }else if(this.Electronichide==true){
                    this.Electronichide=false;
                    $("#"+this.canvaid).hide();
                    this.Electronicoff();
                }
            }
        },
        //开启电子放大
        Electronicopen(){
            var v = document.getElementById(this.videoid);
            var c = document.getElementById(this.canvaid);
            var ctx = c.getContext('2d');
            //所需参数
            var wh=$(".h5container");
            // var screenH = document.documentElement.clientHeight/9;
            // var screenw = document.documentElement.clientWidth/10;
            // var videoH = $('#'+this.videoid)[0].offsetHeight/10;
            // var videoW = $('#'+this.videoid)[0].offsetWidth/10;
            // console.log(wh.width(),wh.height(),videoH,videoW,screenH,"111")
            $("#"+this.videoid).addClass("myCanvasvideo")
            // return false;
            //每20毫秒画一次图
            this.canvasdate = window.setInterval(function() {
                ctx.drawImage(v, 0, 0, 170, 105);
            }, 20);
        },
        //关闭电子放大
        Electronicoff(){
            var v = document.getElementById(this.videoid);
            //所需参数
            var wh=$(".h5container");
            v.width=wh.width();
            v.height=wh.height();
            
            $("#"+this.videoid).removeClass("myCanvasvideo")  
            clearInterval(this.canvasdate);
        },
        // 二维码
        qrcode () {
            console.log(this.tokenshou)
            if(this.tokenshou==""){
                return false;
            }else{
                var android= window.location.protocol + '//' + window.location.host + '/single.html?token=' + this.tokenshou+"&h5splayer=ws";
                var ios= window.location.protocol + '//' + window.location.host + '/single.html?token=' + this.tokenshou+"&h5splayer=rtc";
            }
            this.$refs.qrcodead.innerHTML="";
            this.$refs.qrcodeios.innerHTML="";
            console.log(android,ios)
            var qrcode = new QRCode(this.$refs.qrcodead, {
                width: 100,
                height: 100// 高度
            })
            var qrcode1 = new QRCode(this.$refs.qrcodeios, {
                width: 100,
                height: 100// 高度
            })
            qrcode.clear();
            qrcode1.clear();
            qrcode.makeCode(android);
            qrcode1.makeCode(ios);
        },
        //预置位跳转
        preset_Jump(token){
            var root = process.env.API_ROOT;
		    if (root == undefined){
		        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		    }
		   //url
		    var url = root + "/api/v1/Ptz?token="+this.tokenshou+"&action=preset&preset="+token+"&speed="+this.Preset_value+"&session="+ this.$store.state.token;
            console.log(url)
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    console.log("跳转");
                }
            })


        },
        //预置位设置
        preset_set(token,event){
            var input_val=event.currentTarget.previousElementSibling.previousElementSibling.value;
            var root = process.env.API_ROOT;
		    if (root == undefined){
		        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		    }
		   //url
		    var url = root + "/api/v1/SetPreset?token="+this.tokenshou+"&presetname="+input_val+"&presettoken="+token+"&session="+ this.$store.state.token;
            console.log(url)
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    console.log(result);
                }
            })
            console.log("设置");
        },
        // 画质
        handleCommand(command) {
           this.videoname=''
           var arr=this.inputlabel.split("-")
           var label=arr[0]+"-"+command.strName
           var token=this.inputtoken
           this.videoname=label
           var streamprofile= command.strToken
           this.PlayVideo(token,streamprofile,label,name)
           
        },
        changePanel(event){
            console.log(event)
        },
        //码流按钮
        Bitstream(event){
            if(event===this.$t("message.live.substream")){
            var streamprofile='sub'
            var token=this.inputtoken
            var label=this.inputlabel
            var arr=label.split("-")
            var label=arr[0]+"-"+this.$t("message.live.substream")
            this.PlayVideo(token,streamprofile,label,name)
            this.valuebutton=this.$t("message.live.mainstream")
            this.picturequality=''
            }else if(event===this.$t("message.live.mainstream")){
            var streamprofile='main'
            var token=this.inputtoken
            var arr=this.inputlabel.split("-")
            var label=arr[0]+"-"+this.$t("message.live.mainstream")
            this.PlayVideo(token,streamprofile,label,name);
            this.valuebutton=this.$t("message.live.substream")
            this.picturequality=''
            }
        },
       // 转码
        Gettranscod(){
            var root = process.env.API_ROOT;
            var wsroot = process.env.WS_HOST_ROOT;
            if (root == undefined){
            root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/GetTransProfile?session="+ this.$store.state.token;
            this.$http.get(url).then(result=>{
            //   return false;
              if(result.status == 200){
                this.qualitylist=result.data.profile
                //   var itme=result.data.profile;
                //   for(var i=0;i<itme.length;i++){
                //       var qualitydata={
                //           strName:itme[i].strName,
                //           strToken:itme[i].strToken,
                //           nCodec:itme[i].nCodec,
                //           nEngine:itme[i].nEngine,
                //           nBitrate:itme[i].nBitrate,
                //           nFPSType:itme[i].nFPSType,
                //           nFPS :itme[i].nFPS,
                //           nScaleType:itme[i].nScaleType,
                //           nWidth:itme[i].nWidth,
                //           nHeight:itme[i].nHeight,
                //       };
                //       this.qualityform.push(qualitydata);
                //   }

             }
            }).catch()
        },
       //麦克风
        Shoutwheat(event){
            var tokenshou=this.tokenshou
            var conf2 = {
                protocol: window.location.protocol, //http: or https:
                host: window.location.host, //localhost:8080
                rootpath:'/', // '/' or window.location.pathname
                token:tokenshou,
                session:this.$store.state.token //session got from login
            };
            
            
            var Shoutwheat=this.Shoutwheatclass;
            if(Shoutwheat=="mdi mdi-microphone-off"){
                console.log("大开");
                this.audioback = new H5sPlayerAudBack(conf2);
                this.audioback.connect();
                this.Shoutwheatclass="mdi mdi-microphone";
            }else{
                console.log("关闭2");
                this.audioback.disconnect();
                delete this.audioback;
                this.audioback = undefined;
                this.Shoutwheatclass="mdi mdi-microphone-off";
            }
        },
        FullScreen(event)
        {
            var elem = $("#"+this.h5id).get(0);
            //var elem = $("#videoPanel");
            console.log('panelFullScreen', event);
            if (
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
            ) {
                if (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                ) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                        
                    }
                    // this.Electronicoff();
                    // this.Electronicopen();
                    console.log("========  updateUIExitFullScreen");
                    this.updateUIExitFullScreen();
                } else {
                     console.log('panelFullScreen3');
                    // this.Electronicoff();
                    // this.Electronicopen();
                    if (elem.requestFullscreen) {
                        elem.requestFullscreen();
                    } else if (elem.webkitRequestFullscreen) {
                        elem.webkitRequestFullscreen();
                    } else if (elem.mozRequestFullScreen) {
                        elem.mozRequestFullScreen();
                    } else if (elem.msRequestFullscreen) {
                        elem.msRequestFullscreen();
                    }
                }
            } else {
                console.log('Fullscreen is not supported on your browser.');
        }
        },
        updateUIExitFullScreen(){
            if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
            {
                $('div[name="flex"]').height(this.contentHeight / this.rows);
            }
        },
        PtzControlShow(event)
        {
            this.Presetdata=[];
            var root = process.env.API_ROOT;
		    if (root == undefined){
		        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
		    }
		   //url
           var url = root + "/api/v1/GetPresets?token="+this.tokenshou+"&session="+ this.$store.state.token;
            //重组
            this.$http.get(url).then(result=>{
                if(result.status == 200){
                    if(result.bStatus==false){
                        return false;
                    }else{
                        var data=result.data;
                        for(var i = 0; i < data.preset.length; i++){
                            var newItem ={
                                strName : data.preset[i].strName,
                                strToken : data.preset[i].strToken,};
                            this.Presetdata.push(newItem);
                            if(i>8){
                                break;
                            }
                        }
                    }
                }
            })

            
            var $container = $("#"+this.h5id);
            var $controls = $container.children(".ptzcontrols");
            var cors=this.cols*this.rows;
            if (this.ptzshow == false&&cors<="9")
            {
                $controls.css("display", "block");
                this.ptzshow = true;
            }else
            {
                $controls.css("display", "none");
                this.ptzshow = false;
            }
        },
        
        PtzActionfocusing(event){
            this.PtzAction('focusin');
        },
        PtzActionfocusings(event){
            this.PtzAction('focusout');
        },
        PtzActionaperture(event){
            this.PtzAction('irisin');
        },
        PtzActionaperturej(event){
            this.PtzAction('irisout');
        },

        PtzActionZoomIn(event)
        {
            console.log("PtzActionZoomIn");
            this.PtzAction('zoomin');
        },
        PtzActionZoomOut(event)
        {
            this.PtzAction('zoomout');
        },
        PtzActionUpleft(event){
            this.PtzAction('upleft');
        },
        PtzActionUpright(event){
            this.PtzAction('upright');
        },
        PtzActionDownleft(event){
            this.PtzAction('downleft');
        },
        PtzActionDownright(event){
            this.PtzAction('downright');
        },
        PtzActionLeft(event)
        {
            this.PtzAction('left');
        },
        PtzActionRight(event)
        {
            this.PtzAction('right');
        },
        PtzActionUp(event)
        {
            this.PtzAction('up');
        },
        PtzActionDown(event)
        {
            this.PtzAction('down');
        },
        PtzActionStop(event)
        {
            console.log("PtzActionStop");
            this.PtzAction('stop');
        },

        PtzAction(action)
        {
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            var ptzcmd = "token=" + this.currtoken + "&action=" + action + "&speed="+this.Preset_value+"";
            console.log("ptzcmd", ptzcmd);

            var url = root + "/api/v1/Ptz?" + ptzcmd  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {

                }
            }).catch(error => {
                console.log('ptz failed!', error);
            });
        },
        DoManualRecordStart(event)
        {
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            var record = "token=" + this.currtoken + "&duration=300";
            console.log("record cmd", record);

            var url = root + "/api/v1/ManualRecordStart?" + record  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {
                    this.$Notice.info({
                        title: "Manual Start Record successfully"
                    })
                }
            }).catch(error => {
                console.log('Record failed!', error);
                this.$Notice.info({
                    title: "Record failed !"
                })
            });
        },
        DoManualRecordStop(event)
        {
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            var record = "token=" + this.currtoken + "&duration=300";
            console.log("record cmd", record);

            var url = root + "/api/v1/ManualRecordStop?" + record  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {
                    this.$Notice.info({
                        title: "Manual Stop Record successfully"
                    })
                }
            }).catch(error => {
                console.log('Record failed!', error);
                this.$Notice.info({
                    title: "Record failed !"
                })
            });
        },
        DoSnapshot(event)
        {
            if (this.h5handler == undefined)
            {
                return;
            }
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            var snapshot = "token=" + this.currtoken;
            console.log("snapshot cmd", snapshot);

            var url = root + "/api/v1/Snapshot?" + snapshot  + "&session="+ this.$store.state.token;

            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200)
                {
                    this.$Notice.info({
                        title: "Snapshot successfully"
                    })
                }
            }).catch(error => {
                console.log('Snapshot failed!', error);
                this.$Notice.info({
                    title: "Snapshot failed !"
                })
            });
        },
        DoSnapshotWeb(event)
        {
            var fileName = '1';
            const date = new Date();
            fileName = this.currtoken + '_' + date.getFullYear() + '-' + (date.getMonth() + 1)
                         + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
            console.log(fileName);
            var video = $("#" + this.h5videoid).get(0);
            var w = video.videoWidth;//video.videoWidth * scaleFactor;
            var h = video.videoHeight;//video.videoHeight * scaleFactor;
            var canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, w, h);
            var MIME_TYPE = "image/png";
            var imgURL = canvas.toDataURL(MIME_TYPE,1.0);
            // console.log(imgURL);

            var dlLink = document.createElement('a');
            dlLink.download = fileName;
            dlLink.href = imgURL;
            dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

            document.body.appendChild(dlLink);
            dlLink.click();
            document.body.removeChild(dlLink);
        },
        redborder(){
            var cors=this.cols*this.rows;
            if(cors>9){
                console.log("//////////////",this.ptz)
                document.getElementById(this.ptz).style.display="none";
            }
            if(cors<=9){
                document.getElementById(this.ptz).style.display="block";
            }
            //console.log("122514541561",this.videoid);
            
        }
    }
}
//fill scale-down
</script>

<style scoped>
.canh5video{
    width: 100%;
    height: 100%;
}
/* 电子放大 */
.myCanvas {
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    padding:0px;
    display: none;
}
.myCanvasvideo {
    width: 36% !important;
    height: 36% !important;
    position:absolute;
    right: 0;
    bottom: 0;
    padding:0px;
    z-index: 1;
    /* display: none; */
}
/* 二维码 */
.bottom_QR{
    margin: 16px 30px;
    font-size:16px;
    font-weight:600;
    color:rgba(51,51,51,1);
    text-align: center;
}
.bottom_scan{
    font-size:16px;
    font-weight:600;
    color:rgba(51,51,51,1);
    margin-bottom: 20px;
    padding: 0 20px;
}
.bottom_QRcode{
    display: flex;
}
.bottom_QRcode div{
    padding: 0 20px;
}



.block{
    width: 100%;
    height: 175px;
    margin-right: 4%;
    overflow: auto;
    color: #FFFFFF;
}

.block::-webkit-scrollbar{
    display: none;
}
.Seven_Palace{
    float: left;

}
.videoname{ 
    /* justify-content: flex-start;
    align-items:flex-end; */
    position: absolute;
    bottom: 0px;
    font-size:14px;
    background-color: rgba(0,0,0,0.3);
    color: #FFFFFF;
    /* width: 37px; */
    padding: 8px 24px;
    /* float:right;
    word-wrap:break-word;
    word-break:nomal; */
    text-align: center;
   
}
/* 洋码流 */

.streambutton{
    position: absolute;
    bottom: 5px;
    right: -73px;
    border-radius: 10px;
    background-color: #67cfb5;
    border: none;
    width:68px;
    font-size: 10px;
    height: 25px;
    padding: 0 2px;
    }

.quality{
    position: absolute;
    bottom: 5px;
    right: 10px;
    padding:0 10px;
    /* display:none; */
}
.spanquality{
    display:none;
}
.spanpicturequality{
    display: none !important;
}
/* 画质 */
 .el-dropdown-link {
   color: white;
  
}
  .el-dropdown-link .el-dropdown-menu :hover li{
      background-color: rgb(248, 28, 28)!important;
  }
  .el-icon-arrow-down {
    font-size: 12px;
   
  }
  .el-dropdown-menu{
     background-color: rgba(0,0,0,.1);
     border: none;
     text-align: center;
}

.el-dropdown-menu__item{
    color: white;
}
.el-dropdown-menu__item :hover{
    background-color: rgb(248, 28, 28)!important;
}
.popper__arrow{
   border-top-color:none;}
/* 预置位 */
.el-timeline {
    margin: 0;
    font-size: 14px;
    list-style: none;
    padding-left: 4px;
}
.Preset_val{
    float: right;
}
.el-slider >>> .el-slider__runway{
    margin: 2px 0;
    background-color: rgba(255,255,255,0.2);
}
.el-slider >>> .el-slider__button{
    border: rgba(121, 120, 120, 0.1) 3px solid;
    width: 14px;
    height: 14px;
    background: rgba(255,255,255,1);
}
.el-slider >>> .el-slider__bar{
    background-color: #e1e1e1;
}
.el-timeline >>> .el-timeline-item__tail {
    position: absolute;
    left: 4px;
    height: 100%;
    border-left: 2px solid #E4E7ED;
    margin-top: 7px;
}
.el-timeline >>> .el-timeline-item{
    padding: 0;
}
.el-timeline >>> .el-timeline-item__node--normal {
    left: -1px;
    width: 12px;
    height: 12px;
    margin-top: 7px;
}
.el-timeline >>> .el-timeline-item__timestamp.is-top{
    margin: 0;
}
.el-timeline >>>.el-card{
    border: 0px;
    background: none;
}
.el-timeline >>> .el-card__body{
    display: block;
    padding: 0;
}
.block .preset_bgc{
    width:100%;
    height:24px;
    background:rgba(255,255,255,0.2);
}
.block .preset_bgc .preset_input{
    width: 60%;
    background:none;
    /* opacity:0.2; */
    border-radius:12px;
    border: 0;
    padding: 0 0 0 10px;
    color:rgba(255,255,255,1)!important;
}
.block .preset_bgc button{
    width: 15%;
    background: none;
    border: 0;
    font-size: 15px;
    color: #ffffff;
}

/*  */
.Preset{
    width: 30%;
    position: absolute;
    bottom: 10%;
    right: 4%;
}
.flex_content{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3);
    padding: 8% 0 8% 0;
    position: relative;
    /* margin-bottom: 6%; */
}
.content_zoom{
    width: 50%;
    height: 100%;
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-end;
}
.key_zoom{
    width: 25%;
    margin: 0 4% 0 2%;
    /* position: absolute;
    bottom: 4%; */

}
/* 加减 */

.zoom{
    width: 50px;
    height: 100px;
    /* background-color: #808181; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-content: space-around;
    margin-left: 16%;
}
.zoom_add{
    width: 20px;
    height: 20px;
    text-align: center;
    background: none;
    border: 0;
    padding: 0;
    color: #FFFFFF;
}
.el-button{
    margin: 0;
}
/* 上下左右 */
.key_flex{
    width: 100px;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 5%;
    background:url("../views/gallery/Dibutton.png") no-repeat center;
    /* margin-bottom: 20px; */
}
.key_but{
    width: 33.33%;
    height: 33.33%;
    text-align: center;
    /* background-color: #FF0000; */
}



.h5video{
   object-fit: fill;
}
.h5videowrapper{
    padding: 0px;
    height: 100%;
    width: 100%;
}

video {
    width: 100%;
    height: 100%
}

.vidbuttion {
    height: 24px;
    width: 24px;
    padding:0px;
    margin: 0px;
    margin-left: 5px;
    opacity: 0.9;
    padding: 0 2px;
    color:#FFFFFF;
    font-size: 18px;
    background: none;
    border: 0;
}
.vidbuttion:hover{
    color: #ffffff !important;
}
.vidbuttion:nth-child(1){
    /* margin-right: 20px; */
    background: none;
}
.vidbuttion:nth-child(3){
    background:url("../views/gallery/yuntai.svg") no-repeat;
    background-size: 90%;
    background-position:center center;
    margin-top: 2px;
}
.vidbuttion:nth-child(8){
    background:none;
}



.ptzbutton {
    height: 24px;
    width: 24px;
    padding:0px;
    margin: 0px;
    /* opacity: 1; */
    background:rgba(255,255,255,0.3);
}

.ptzbuttonnone {
    height: 24px;
    width: 24px;
    padding:0px;
    margin: 0px;
    margin-right: 0px;
    opacity: 0;
    background:rgba(255,255,255,0);
}

.ptzbutton:hover {
    /*background-color: #3c8dbc;*/
    color:#ffffff;
}

.h5container {
    position:relative;
    display:inline-block;
}

.rtcbutton {
    display:none;
}
.rtc_new{
    width: 25px;
    height: 25px;
    margin: 10px;
    background:url("../views/gallery/rtc.svg") no-repeat;
    background-size: contain;
    background-position:center center;
    position: absolute;
    top: 0px;
}
/* 视频按钮背景图片 */
.h5container > .h5controls {
    position:absolute;
    top:0;
    background:url("../views/gallery/videoxlk@2x.png") no-repeat;
    background-size: 350px;
    background-position-x:right;
    padding:0px;
    box-sizing:content-box;
    z-index:1000;
    width: 100%;
    height: 32px;
    display:none;
    object-fit: 0.3;
}
.h5container > .ptzcontrols {
    position:absolute;
    bottom:0;
    background:rgba(255,255,255,0);
    padding:0px;
    box-sizing:content-box;
    /* z-index:1100; */
    width: 100%;
    height: 100%;
    display:none;
}


</style>
