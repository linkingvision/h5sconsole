<template>
<div class="time-rule">
    <div class="time-day"  @mousedown="startDrag" @mousemove="doDrag"  @mouseup="stopDrag" >
        <div  class="time-minite" v-for="i in 1440" :key="i"></div>
        <div class="time-text" v-for="i in 24" :key="i+'h'">{{(i-1)+":00"}}</div>
    </div>
    <div class="time-cursor" @mousedown="startDragLine"  @mousemove="doDragLine" @mouseup="stopDragLine"> 
       <div class="time-cursor-text" >{{current}}</div>
    </div>
</div>
</template>
<script>
export default {
    name: 'timeline',
    props:['file'],
    data(){
        return {
            dragable:false,
            dragableLine:false,
            current:0
        }
    },
  methods: {
    play(){
      let offset=$('.time-cursor').position().left;
      let currentX=offset-$('.time-day').position().left;
      if($('.time-minite').eq( Math.floor(currentX) ).hasClass('green'))
      {
          console.log('has');
         this.$bus.$emit('changeUrl',$('.time-minite').eq(Math.floor(currentX)).attr('path'))
      }
    },
    parseTime(strTime)
      {
        let time=new Date(strTime);
        let hour=time.getHours();
        let minute=time.getMinutes();
        return 60*hour+minute;
     },
    startDrag(event) {
        if(event.target.className==="time-cursor")
        return;
    this.sx=event.clientX;
      this.dragable = true;
    },
    stopDrag(e) {
      if(e.target.className==="time-day")
      {
      this.dragable = false;
       this.play();
      }
      else if(e.target.className==="time-cursor"||e.target.className==="time-cursor-text")
      {
      this.dragableLine=false;
      this.play();
      }
      else
      {
          this.dragable = false;
           this.dragableLine=false;
      }
     
    },
    doDrag(event) {
      if (this.dragable) {
          if(event.clientX-this.sx<0)
          {
             let o=  $('.time-day').position().left;
            
              if(o<=$('.time-rule').width()-1440)
               return;       
              $('.time-day').css('left',o-(this.sx-event.clientX));
            if($('.time-day').position().left<$('.time-rule').width()-1440)//校验
              {
                  $('.time-day').css('left',$('.time-rule').width()-1440); 
              }

          } 
          else
          {
              let o=  $('.time-day').position().left;
               if(o>=0)
               return;
              $('.time-day').css('left',o+(event.clientX-this.sx));
              if($('.time-day').position().left>0)
              {
                  $('.time-day').css('left',0); 
              }
             // this.sx=event.clientX;
          }
        this.sx=event.clientX;
        let timecorsoroff=$('.time-cursor').position().left;
       let timeruleoff=$('.time-day').position().left;
       let offsetx=timecorsoroff-timeruleoff;
        this.current=(Math.floor(offsetx/60)<10?('0'+Math.floor(offsetx/60)):Math.floor(offsetx/60)) + ":" + (offsetx%60);
      }
      if(this.dragableLine)//此处解决滑块卡的问题，父元素也触发
      {
          let timeruleoff=$('.time-rule').offset().left;
         $('.time-cursor').css('left',event.clientX-timeruleoff); 
         let offsetx=event.clientX-$('.time-rule').offset().left+1.5;
          if($('.time-day').position().left<0)
          {
              offsetx=offsetx-$('.time-day').position().left;
          }
        this.current=(Math.floor(offsetx/60)<10?('0'+Math.floor(offsetx/60)):Math.floor(offsetx/60)) + ":" + (offsetx%60);
      }
    },
    startDragLine(event) {
      //this.sx=event.clientX;
      this.dragableLine = true;
    },
    stopDragLine() {
    
      this.dragableLine = false;
     // this.x = this.y = 'no';
    },
    doDragLine(event) {
      if (this.dragableLine) {
         
          let timeruleoff=$('.time-rule').offset().left;
         $('.time-cursor').css('left',event.clientX-timeruleoff); 
         let offsetx=event.clientX-$('.time-rule').offset().left+1.5;
          if($('.time-day').position().left<0)
          {
              offsetx=offsetx-$('.time-day').position().left;
          }
        this.current=(Math.floor(offsetx/60)<10?('0'+Math.floor(offsetx/60)):Math.floor(offsetx/60)) + ":" + (offsetx%60);
      }
    }
  },
  watch:{
      file:
      {
           handler(newValue,oldvalue)
           {
             if(newValue&&newValue.length>0)
             {
                 $('.time-minite').removeClass('green');
                 newValue.forEach((value,index)=>{
                    let start= this.parseTime(value.strStartTime);
                    let offset=Math.ceil(parseInt(value.strDuration)/60);
                    $('.time-minite:gt('+(start-2)+'):lt('+(offset+1)+')').addClass('green');
                    $('.time-minite:gt('+(start-2)+'):lt('+(offset+1)+')').attr('path',value.strPath);
                 });
             }
           },
           deep:true
      }
  },
  mounted() {  
   window.addEventListener('mouseup', this.stopDrag);
  }
}
</script>
<style scoped>
.time-rule{
    position: relative;
    width: 100%;
    margin: 0 auto;
    height: 50px;
    overflow: hidden;
    /* overflow: auto; */
    max-width: 1440px;
    
}
/* .time-rule::-webkits-scrollbar {display:none} */
.time-day{
    position: absolute;
    width: 1440px;
    background-color:#3c8dbc;
    height: 100%;
    user-select: none;
    cursor: pointer;
}
.time-text{
    float: left;
    width: 60px;
    border-top: 1px black solid;
    border-right: 1px black solid;
    text-align: center;

}
.time-minite{
    float: left;
    height: 8px;
    margin: 0px;
    width: 1px;
}
.time-cursor{
   position: absolute;
    left: 0;
    top: 0;
    height: 30px;
    width: 2px;
    background-color: red;
    text-align: center
}
.time-cursor-text{
    position: absolute;
    width: 60px;
    border: 1px solid red;
    height: 15px;
    padding: 0 5px;
    line-height: 15px;
    background-color: papayawhip;
    top:30px;
    left: -30px;
    cursor: move;
    user-select: none;
}
.green{
    background-color: red;
}
</style>

