<template>
<div class="modal fade" :id="ID" tabindex="-1" role="dialog" aria-labelledby="bsModalLabel" data-toggle="modal" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title strong" id="bsModalLabel"><b>{{title}}</b></h4>
            </div>
            <div class="modal-body">
               <slot name='modalBody'>   
                   modal-body             
               </slot>
            </div>
            <div class="modal-footer">
                <slot name='modalFooter'>
                <button type="button" class="btn btn-success">Save</button>
                </slot>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: "vmodal",
  props:['ID','title'],


  mounted(){
    //   let _this=this;
    //   this.$bus.$on('modal-open', (args) => {
    //   _this.serverName=args.serverName;
    //   _this.ip=args.ip;
    //   _this.port=args.port;
    //   _this.username=args.username;
    //   _this.password=args.password;
    //   $('#'+this.ID).modal()
    // })
  }
};
</script>
