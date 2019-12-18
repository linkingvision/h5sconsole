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
</style>




