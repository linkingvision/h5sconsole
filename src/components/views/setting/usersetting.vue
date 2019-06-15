<template>
<div>
    <Table  border :columns="columnsUser" :data="dataUser"></Table>

    <v-modal ID="UserModal" title=USER>
        <button type="button" slot="modalFooter" class="btn btn-success" v-on:click="saveUser">Save</button>
        <form class="form-horizontal" slot="modalBody" slot-scope="v">
                <div class="form-group">
                    <label class="col-sm-2 control-label">{{$t("message.setting.name")}}</label>
                    <div class="col-sm-10">
                        <Input v-model="strName" type="txt" readonly="ture" placeholder="user name" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">{{$t("message.setting.currentpass")}}</label>
                    <div class="col-sm-10">
                        <Input v-model="strCurrPassed" type="password" />
                    </div>
                </div>
               <div class="form-group">
                    <label class="col-sm-2 control-label">{{$t("message.setting.newpass")}}</label>
                    <div class="col-sm-10">
                        <Input v-model="strNewPasswd" type="password" />
                    </div>
                </div>
               <div class="form-group">
                    <label class="col-sm-2 control-label">{{$t("message.setting.confirmpass")}}</label>
                    <div class="col-sm-10">
                        <Input v-model="strNewConfirmPasswd" type="password" />
                    </div>
                </div>
 
        </form>
    </v-modal>
</div>
</template>

<script>
import vmodal from '@/components/widgets/modal'
import '@/assets/jQuery.md5.js'

export default {
    name: 'usersetting',
    components: {
        'v-modal': vmodal
    },
    data () {
        return {
            strName:'admin',
            strCurrPassed:'******',
            strNewPasswd:'******',
            strNewConfirmPasswd:'******',
            columnsUser: [
                {
                    title: this.$t("message.setting.user"),
                    key: 'name',
                    render: (h, params) => {
                        return h('div', [
                            h('Icon', {
                                props: {
                                    type: 'person'
                                }
                            }),
                            h('strong', params.row.name)
                        ]);
                    }
                },
                {
                    title: this.$t("message.setting.role"),
                    key: 'role'
                },
                {
                    title: this.$t("message.setting.action"),
                    key: 'action',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.editUser(params.index)
                                    }
                                }
                            }, this.$t("message.setting.edit"))
                        ]);
                    }
                }
            ],
            dataUser: [
                {
                    name: 'admin',
                    role: 'Administrator',
                }
            ]
        }
    },
    methods: {
        editUser(index) {
            console.log("editUser");
            //this.data6.splice(index, 1);
            $("#UserModal").modal();
        },
        saveUser(index) {
            console.log("saveUser");
            $("#UserModal").modal('hide');
            if (this.strNewPasswd != this.strNewConfirmPasswd)
            {
                this.$Notice.error({
                    title: "password mismatch"
                })               
            }else 
            {
                let _this =this;
                var root = process.env.API_ROOT;
                if (root == undefined){
                    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
                }

                var cmd = "user=" + this.strName + "&oldpassword=" 
                            + $.md5(this.strCurrPassed) + "&newpassword=" + $.md5(this.strNewPasswd);

                var url = root + "/api/v1/UpdateUser?" + cmd  + "&session="+ this.$store.state.token;
                this.$http.get(url).then(result => {
                    console.log(result);
                    if (result.status == 200) 
                    {
                        this.$Notice.info({
                            title: $t("setting.user.update_successfully" )
                        })
                    }
                }).catch(error => {
                    console.log('ptz failed!', error);
                    this.$Notice.error({
                        title: "update user failed"
                    })
                });                

            }

        }
    }
}
</script>