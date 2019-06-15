<template>
<div class="box" v-bind:class="themeClass">
    <div class="box-header with-border ">
        <h3 class="box-title">{{title}}</h3>
        <div class="box-tools pull-right">
            <slot name="boxHeader">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-remove"></i></button>
            </slot>
        </div>
    </div>
    <div class="box-body">
        <slot name="boxbody">
            <div class="row">
            </div>
        </slot>
    </div>
</div>
</template>
<script>
export default {
    name: 'vbox',
    props:['themeClass','title']
}
</script>
