<template>
    <div id="page-wrapper" style="background-color: #fff;">
        <!-- 头部 -->
        <!--  -->
        <div class="container-fluid">
            <div class="bg-title" style="margin-bottom: 0px;">
                <div class="flex_ld">
                    <h4 class="page-title">{{$t("message.left.camera")}}</h4>
                    <el-input
                        style="width:200px"
                        v-model="searchTableInfo"
                        size="mini"
                        placeholder="输入关键字搜索"/>
                </div>
            </div>
            
        </div>
        <!-- shenti -->
        <div class="content">
            <div class="content_1">
               13
            </div>
            <div class="content_2">
                <div class="content_name">
                    名称
                </div>
                <div class="content_video" v-on:mouseover="sortAll()" v-on:mouseleave='leave()'>
                    <img src="./gallery/chart.png"/>
                    <div class="content_anniu" >
                        15141545454545454
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        
        searchTableInfo:"",
      }
    },
    mounted(){
        // this.height_zsy();
    },
    methods:{
        sortAll(){
            $(".content_anniu").css("display","block");
            console.log("1548");
        },
        leave(){
            $(".content_anniu").css("display","none");
            console.log("456787");
        },

        height_zsy(){
            var winHeight = $(window).height()-150;//winHeight即浏览器高度
            // console.log("******",winHeight-100);
            $(".content").css("height",winHeight);

        }
    },
  };
</script>
<style scoped>
.content{
    display: flex;
    justify-content: space-between;
    /* padding: 0 20px; */
    margin-bottom: 10px;
    background: #f7f7f7;
    width: 100%;
    height: 900px;
}
.content .content_1{
    width: 19.5%;
    height: 98%;
    background: #ffffff;
}
.content .content_2{
    width: 80%;
    height: 98%;
    padding: 20px;
    background: #ffffff;
}
.content .content_2 .content_name{
    width: 100%;
    /* height: 20%; */
}
.content .content_2 .content_video{
    width: 100%;
    height: 95%;
    background-color: #f7f7f7;
    position: relative;
}
.content .content_2 .content_video img{
    width: 100%;height: 100%;
}
.content .content_2 .content_video .content_anniu{
    display: none;
    position: absolute;
    top: 20px
}
.camera{
    width: 18px;
    height: 18px;
    background-image: url("./gallery/jiankongdian.svg") !important;
}
</style>