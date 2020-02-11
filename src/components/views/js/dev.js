import Vue from 'vue'
import store from '@/store/store'
import axios from '@/http'
import VueI18n from 'vue-i18n'
import LangEn from '../../../../static/lang/en'
import LangZhCHS from '../../../../static/lang/zhchs'
import LangZhCHT from '../../../../static/lang/zhcht'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: store.state.lang,
    messages: {
      'en': LangEn,
      'zhchs': LangZhCHS,
      'zhcht': LangZhCHT
    }
})

console.log(i18n.tc('message.live.camera')) // 你好世界
//测试机仓
var listdatag=[];
var listdatagload=[];
function loadtest(){
    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }
    //url
    var url = root + "/api/v1//GetSrcCamera?session="+ store.state.token;
    console.log(url);
    // return falsel;
    axios.get(url).then(result=>{
        if(result.status == 200){
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=i18n.tc('message.live.camera');
            srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
            for(var i=0; i< data.src.length; i++){
                 var item = data.src[i];
                if(item['nOriginalType'] == 'H5_CH_GB'){
                    continue;
                }else{
                    // 主副流
                    var node=[{
                    token : item['strToken'],
                    streamprofile : "main",
                    label :i18n.tc('message.live.mainstream'),
                    name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                    iconclass : 'mdi mdi-playlist-play fa-fw',
                    disabled_me:false
                    },{
                    token : item['strToken'],
                    streamprofile : "sub",
                    label :i18n.tc('message.live.substream'),
                    name:item['strName']+"--"+i18n.tc('message.live.substream'),
                    iconclass : 'mdi mdi-playlist-play fa-fw',
                    disabled_me:false
                    }]
                    var newItem ={
                            token : item['strToken'],
                            label : item['strName'],
                            iconclass : 'mdi mdi-camcorder fa-fw',
                            iconclass2 : 'mdi mdi-camcorder fa-fw',
                            name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                            children:node,
                            disabled_me:false};
                    
                    if(!item['bOnline'])
                        newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                    if(item['nType'] == 'H5_CLOUD')
                        newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';
                    
                    if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';
                        
                    
                    
                // console.log("itme",newItem,item)

                srcGroup.children.push(newItem);
                }
            }
            listdatag.push(srcGroup);
          } 
    })

}
loadtest();
//写作业
function loadDevice() {
    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }
   //url
   var url = root + "/api/v1/GetDevice?session="+ store.state.token;

      //重组
      axios.get(url).then(result=>{
          if(result.status == 200){
              var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  loadSrc(srclevel,srcData);
              }
          }
      })
}
function loadSrc(srclevel, srcData) {

    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }

    var url = root + "/api/v1/GetDeviceSrc?token="+ srclevel.strToken + "&session=" + store.state.token;

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                // 主副流
                var node=[{
                  token : item['strToken'],
                  streamprofile : "main",
                  label :i18n.tc('message.live.mainstream'),
                  name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                },{
                  token : item['strToken'],
                  streamprofile : "sub",
                  label :i18n.tc('message.live.substream'),
                  name:item['strName']+"--"+i18n.tc('message.live.substream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                }]
                for(var l=0; l< node.length; l++){
                    console.log("1111111111111111111",node[l].disabled_me)
                    if(item['bDisable'] == true){
                        node[l].disabled_me =true;
                    }
                }
                
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'mdi mdi-camcorder fa-fw',
                        iconclass1 : '',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        children:node,
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

                if(item['bDisable'] == true){
                    newItem['disabled_me'] =true;
                    newItem['iconclass1'] = 'camera';
                }

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);
            listdatagload.push(srcGroup);
        }
    }).catch(error => {
        console.log('GetSrc failed', error);
    });
}
loadDevice();
//数字仓机
function NumberDevice() {
    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }
   //url
   var url = root + "/api/v1/GetGbDevice?session="+ store.state.token;

      //重组
      axios.get(url).then(result=>{
          if(result.status == 200){
              var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  NumberSrc(srclevel,srcData);
              }
          }
      })
}
NumberDevice();
function NumberSrc(srclevel, srcData) {

    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }

    var url = root + "/api/v1/GetGbDeviceSrc?token="+ srclevel.strToken + "&session=" + store.state.token;

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                // 主副流
                var node=[{
                  token : item['strToken'],
                  streamprofile : "main",
                  label :i18n.tc('message.live.mainstream'),
                  name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                },{
                  token : item['strToken'],
                  streamprofile : "sub",
                  label :i18n.tc('message.live.substream'),
                  name:item['strName']+"--"+i18n.tc('message.live.substream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                }]
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'mdi mdi-camcorder fa-fw',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        children:node,
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);
            listdatagload.push(srcGroup);
        }
    }).catch(error => {
        console.log('GetSrc failed', error);
    });
}
//级联
function cloudDevice() {
    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }
   //url
   var url = root + "/api/v1/GetCloudDevice?session="+ store.state.token;

      //重组
      axios.get(url).then(result=>{
          if(result.status == 200){
              var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  cloudSrc(srclevel,srcData);
              }
          }
      })
}
cloudDevice();
function cloudSrc(srclevel, srcData) {

    let _this =this;
    var root = process.env.API_ROOT;
    var wsroot = process.env.WS_HOST_ROOT;
    if (root == undefined){
        root = window.location.protocol + '//' + window.location.host + window.location.pathname;
    }
    if (wsroot == undefined)
    {
        wsroot = window.location.host;
    }

    var url = root + "/api/v1/GetCloudDeviceSrc?token="+ srclevel.strToken + "&session=" + store.state.token;

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                // 主副流
                var node=[{
                  token : item['strToken'],
                  streamprofile : "main",
                  label :i18n.tc('message.live.mainstream'),
                  name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                },{
                  token : item['strToken'],
                  streamprofile : "sub",
                  label :i18n.tc('message.live.substream'),
                  name:item['strName']+"--"+i18n.tc('message.live.substream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                }]
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'cascade',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        children:node,
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'cascade';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);
            listdatagload.push(srcGroup);
        }
    }).catch(error => {
        console.log('GetSrc failed', error);
    });
}
// console.log("....................",listdatag);
export default{listdatag,listdatagload}