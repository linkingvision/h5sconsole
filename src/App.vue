<template>
<div >
    <router-view v-if="isRouterAlive"></router-view>
</div>
</template>

<script>
export default {
  
    name: 'App',
    components: {

    },  provide () {
    return {
      	reload: this.reload
    }
  },
  data () {
    return {
      	
      	isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style>

#page-wrapper{
  height: 100%;
  background-color: #f7f7f7!important;
}
/*  */
.el-tree{
    margin: 0 24px;
}
.el-tree-node{
    border-bottom: 1px solid #FFF7F7F7;
}
.el-tree-node__content {
    width: 100%;
}

.navbar-header{
    height: 40px !important;
}
.fix-header #page-wrapper {
    margin-top: 40px;
}

/* 框架 */
.navbar {
    min-height: 0px !important;
    z-index: 1003 !important;
}
.navbar-static-top{
  padding: 0 !important;
  z-index: 1003 !important;
}
/* 左 */


.container-fluid{
  padding-bottom: 4px!important;
}
.bg-title{
  margin-bottom: 4px !important;
}
.flex_ld{
  display: flex;
  justify-content: space-between;
}

/* 表格 */
.el-table th, .el-table tr {
    background-color: #FFF;
    color: #333333;
}

.has-gutter tr th .cell{
  color: #000;
  font-weight:700;
}
.el-checkbox__inner{
  border-radius: 50px !important;
}
.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: rgba(95,191,167,1) !important;
  border-color: rgba(95,191,167,1) !important;
}
/* 表格的添加和删除 */
.button_edi button{
    border: 0;
    background:none;
    font-size: 24px;
    margin-right: 40px;
}
.button_edi button:last-child{
    margin-right: 0;
}
/* 选项卡 */

.el-tabs__item.is-active {
    color: rgba(95,191,167,1) !important;
}
.el-tabs__item:hover{
  color: rgba(95,191,167,1) !important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item{
  color: #333333;
  font-size: 14px;
}
/* .el-tabs__active-bar{
  background-color: rgba(95,191,167,1) !important;
  top: 0 !important;
}
.el-tabs__header{
  background-color: #F6F6F6 !important;
} */
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  /* border: 0; */
  border-top:4px solid rgba(95,191,167,1);
}
.el-tabs--border-card{
  border: 0px !important;
  box-shadow:none !important;

}
/* 自制图标 */
.camera{
    text-decoration:line-through
}
/* 另类弹出框 */
.el-popover{
    padding: 5px !important;
}
</style>




