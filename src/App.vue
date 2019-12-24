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
.navbar {
    min-height: 40px !important;
}
.container-fluid{
  padding-bottom: 4px!important;
}
.bg-title{
  margin-bottom: 4px !important;
}

/* 表格 */
.el-table th{
  background-color: #fafafa!important;
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
.button_edi button:nth-child(2){
    margin-right: 0;
}
/* 选项卡 */

.el-tabs__item.is-active {
    color: rgba(95,191,167,1) !important;
}
.el-tabs__item:hover{
  color: rgba(95,191,167,1) !important;
}
.el-tabs__active-bar{
  background-color: rgba(95,191,167,1) !important;
}
</style>




