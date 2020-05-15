<template>
    <div class="download">
        <!-- 头部 -->
        <div class="dow_title">
            <img src="../gallery/WechatIMG@2x.png" alt="home" class="dark-logo" />
        </div>
        <!-- 头部轮播 -->
        <div class="title_img">
            <div class="title_back"></div>
            <div class="title_but">
                <div class="login_but"><el-button class="but_jump" plain @click="$router.back(-1)">{{returns}}</el-button></div>
                <div class="dow_Anchor">
                    <div class="Anchor_logo"></div>
                    <div class="Anchor_heng"></div>
                    <div class="Anchor">
                        <a href="#APP">
                            <el-button class="but_jump1" icon="iconfont icon-download" type="primary"> 软件下载合集</el-button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content_border" id="#APP">
            <div class="dow_content" v-for="(a,index) in content" :key="index">
                <div class="content_title">
                    <div class="content_bar"></div>
                    <div class="content_size">{{a.name}}</div>
                </div>
                <div class="content_con" >
                    <div class="content_con1" v-for="(b,index) in a.connode" :key="index">
                        <div class="con_flex">
                            <div class="con_img"><img :src="b.img" alt=""></div>
                            <div class="con_size">
                                <div>{{b.name}}</div>
                                <div>{{b.Introduction}}</div>
                            </div>
                        </div>
                        
                        <div class="content_qrcode">
                            <div class="qrcode" v-for="(c,index) in b.qrcodenone" :key="index">
                                <div>
                                    <div class="qrcode_size">{{c.name}}</div>
                                    <img :src="c.img" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'downloadapp',
    data () {
        return {
            returns:this.$t("message.login.return"),
            content:[{
                    name:"插件",
                    connode:[{
                        name:"插件",
                        img:require("./gallery/dow_icon.png"),
                        Introduction:"可以使用插件兼容IE, Chrome/Edge/Firefox 不需要该插件.",
                    }]
                },{
                    name:"APP",
                    connode:[{
                        name:"H5S视频平台",
                        img:require("./gallery/dow_app.png"),
                        Introduction:"Android APP(代码开放)",
                        qrcodenone:[{
                            name:"Android",
                            img:require("./gallery/Android.png")
                        },],
                    }]
                }
            ]
        }
    },

}
</script>

<style scoped>
.download{
    background: #f5f5f5;
    min-height: 1000px;
}
/* 内容 */
.content_border{
    padding: 5% 20%;
}
.dow_content{
    width: 100%;
    margin-bottom: 50px;

}
.content_qrcode{
    display: flex;
    justify-content: space-around;
    text-align: center;
}
.qrcode_size{
    font-size:12px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(0,0,0,1);
}
.qrcode div img{
    width: 110px;
    height: 110px;
}
.content_con{
    width: 100%;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
}
.content_con1{
    width: 30%;
    height: auto;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0 1.5% 20px 1.5%;
    padding: 10px 20px 20px 10px;
}
.con_flex{
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
}
.con_img img{
    width: 100px;
    height: 100px;
}
.con_size div:nth-child(1){
    font-size:14px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(0,0,0,1);
}
.con_size div:nth-child(2){
    font-size:12px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(124,124,124,1);
}
.content_title{
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}
.content_bar{
    width:3px;
    height:18px;
    background:rgba(255,166,1,1);
    border-radius:1px;
    margin-right: 5px;
}
.content_size{
    font-size:18px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(0,0,0,1);  
}



.dow_title{
    background: #292929;
    padding: 5px 44px;
}
.dark-logo{
  height: 26px;
  margin-left: 20px;
}
/* 头部轮播 */
.title_img{
    width: 100%;
    height: 605px;
    background: #F5F9FF;
    display: flex;
    padding: 0 100px;
    box-sizing: border-box;
}
.title_back{
    width: 50%;
    background: url('./gallery/dow_back.png') no-repeat 180px;
    background-size: 70%;
    height: 100%;
}
.title_but{
    width: 50%;
    height: 100%;
}
/* 右边 */
.dow_Anchor{
    width: 100%;
    height: 80%;
    padding: 30% 0 0 25%;
}
.Anchor_logo{
    width: 100%;
    background: url('./gallery/dow_h5svideo.png') no-repeat;
    background-size: 30%;
    height: 40px;
}
.Anchor_heng{
    width:61px;
    height:4px;
    background:rgba(255,166,1,1);
    border-radius:2px;
    margin-bottom: 50px;
}

.login_but{
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 20px;
}
.but_jump{
    font-size:12px;
    font-weight:500;
    color:rgba(32,137,229,1);
    margin-top: 10px;
    border:1px solid rgba(31,136,229,1);
    border-radius:5px;
    padding: 7px 11px;
}
.but_jump1{
    font-size:14px;
    font-family:PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    padding: 7px 11px;
}
</style>