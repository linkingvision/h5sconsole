<template>
<div class="content" >
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'vaside'
}
</script>
<style scoped>
.content-header .breadcrumb {
    font-size: 1.5rem;
    position: static;
    float: left;
}
.content{
    min-height: 200px;
}
</style>

