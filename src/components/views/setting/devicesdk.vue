<template>
<div>
        <div class="inbox-center">
            <div class="col-sm-3">
                <input class="form-control hidden-xs" type="text" placeholder="Name/IP search" id="ipInput" />
            </div>
            <div class="col-sm-2">
                <button class="btn btn-info hidden-xs " @click="searchTable">Search</button>
            </div>
            <div class="col-sm-3 ">
                <button class="btn btn-danger " @click="deleteDevice"><i class="fa fa-minus"></i></button>
                <button class="btn btn-success " @click="addDevice"><i class="fa fa-plus"></i></button>
            </div>
            <div class="col-sm-4">

            </div>

            <table id="table1"  class="table table-hover">
                <thead>
                    <tr>
                        <th><input type="checkbox" @click="checkAll" /></th>
                        <th class="hidden-xs ">Name</th>
                        <th>IP</th>
                        <th>Port</th>
                        <th class="hidden-xs">User</th>
                        <th>Online</th>
                        <th class="hidden-xs">Type</th>
                        <th class="hidden-xs">Token</th>
                        <!-- <th>Play</th> -->
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>

        <v-modal ID="CameraModal" title="DEVICE SDK">
            <button type="button" slot="modalFooter" class="btn btn-success" v-on:click="saveData">Save</button>
            <form class="form-horizontal" slot="modalBody" slot-scope="v">
                <div class="form-group">
                    <label class="col-sm-2 control-label">Type</label>
                    <div class="col-sm-10">
                        <select class="form-control" v-model="nType">
                            <option value="H5_DEV_HIK">H5_DEV_HIK</option>
                            <option value="H5_DEV_DH">H5_DEV_DH</option>
                        </select>

                    </div>
                </div>

                <div class="form-group" >
                    <label class="col-sm-2 control-label">Name</label>
                    <div class="col-sm-10">
                        <input autocomplete="off" v-validate="{required:true}" :class="{'input': true, 'is-danger': errors.has('name') }" v-model="strName" name='name' type="text" class="form-control">
                        <i v-if="errors.has('username')" class="fa fa-warning text-red"></i>
                        <span v-if="errors.has('username')" class="text-red">{{ errors.first('name') }}</span>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-2 control-label">Token</label>
                    <div class="col-sm-10">
                        <input autocomplete="off" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('strToken') }" v-model="strToken" name='strToken' type="text" class="form-control">
                        <i v-if="errors.has('strToken')" class="fa fa-warning text-red"></i>
                        <span v-if="errors.has('strToken')" class="text-red">{{ errors.first('strToken') }}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class="col-sm-2 control-label">Username</label>
                    <div class="col-sm-10">
                        <input autocomplete="off" v-validate="{required:true}" :class="{'input': true, 'is-danger': errors.has('username') }" v-model="strUser" name='username' type="text" class="form-control">
                        <i v-if="errors.has('username')" class="fa fa-warning text-red"></i>
                        <span v-if="errors.has('username')" class="text-red">{{ errors.first('username') }}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class="col-sm-2 control-label">Password</label>
                    <div class="col-sm-10">
                        <input key="password-input" autocomplete="off" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('password') }" v-model="strPasswd" name='password' type="text" class="form-control">
                        <i v-if="errors.has('password')" class="fa fa-warning text-red"></i>
                        <span v-if="errors.has('password')" class="text-red">{{ errors.first('password') }}</span>
                    </div>
                </div>
                <div class="form-group" >
                    <label class="col-sm-2 control-label">IP</label>
                    <div class="col-sm-10">
                        <input key="ip-input" autocomplete="off" v-validate="'required|ip'" :class="{'input': true, 'is-danger': errors.has('ip') }" v-model="strDevIpAddress" name='ip' type="text" class="form-control">
                        <i v-if="errors.has('ip')" class="fa fa-warning text-red"></i>
                        <span v-if="errors.has('ip')" class="text-red">{{ errors.first('ip') }}</span>
                    </div>

                </div>
                <div class="form-group" >
                    <label class="col-sm-2 control-label">Port</label>
                    <div class="col-sm-10">
                        <input key="port-input" autocomplete="off" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('port') }" v-model="strDevPort" name='port' type="text" class="form-control">
                        <i v-if="errors.has('port')" class="fa fa-warning text-red"></i>
                        <span v-if="errors.has('port')" class="text-red">{{ errors.first('port') }}</span>
                    </div>
                </div>
            </form>
        </v-modal>


</div>
</template>   


<script>
import uuid from '@/store/uuid'
//http://bootstrapswitch.site/examples.html
import vbox from '@/components/widgets/box'
import vmodal from '@/components/widgets/modal'
import device from '@/store/device'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import 'datatables.net/js/jquery.dataTables.js'
import 'datatables.net-bs/js/dataTables.bootstrap.js'

export default {
    name: 'devicesetting',
    data() {
        let c = new device();
        return {
            ...c
        }
    },
    components: {
        'v-box': vbox,
        'v-modal': vmodal
    },
    mounted() {

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

        var url = root + "/api/v1/GetDevice?session="+ this.$store.state.token;

        $('#table1').DataTable({
            columnDefs: [{
                    "render": function (data, type, row) {
                        return "<input type='checkbox' session='" + "' token='" + row.strToken + "'>";
                    },
                    "targets": 0
                },
                {
                    "render": function (data, type, row) {
                        return '<span class="hidden-xs">' + row.strName + '</span>';
                    },
                    "targets": 1
                },
                {
                    "render": function (data, type, row) {
                        return row.strDevIpAddress;
                    },
                    "targets": 2
                },
                {
                    "render": function (data, type, row) {
                        return '<span>' + row.strDevPort + '</span>';
                    },
                    "targets": 3
                },
                {
                    "render": function (data, type, row) {
                        return '<span class="hidden-xs">' + row.strUser + '</span>';
                    },
                    "targets": 4
                },
                {
                    "render": function (data, type, row) {
                        return '<span >' + row.bOnline + '</span>';
                    },
                    "targets": 5
                },
                {
                    "render": function (data, type, row) {
                        return '<span class="hidden-xs">' + row.nType + '</span>';
                    },
                    "targets": 6
                },
                {
                    "render": function (data, type, row) {
                        return '<span class="hidden-xs">' + row.strToken + '</span>';
                    },
                    "targets": 7
                }
                /*
                {
                    "render": function (data, type, row, meta) {
                        return data = '<button class="btn btn-primary btn-sm" data-id=' + data + '><i class="fa fa-play"></i></button>';
                    },
                    "targets": 7
                },
                {
                    "render": function (data, type, row, meta) {
                        return data = '<button class="btn btn-info btn-sm" @click="editOneCamera()" data-id=' + data + '><i class="fa fa-pencil"></i></button>'
                            + '<button class="btn btn-danger btn-sm" data-id=' + data + '><i class="fa fa-minus"></i></button>';
                    },
                    "targets": 7
                }*/
            ],
            pageLength: 8, //可以省，默认大小每页显示10行
            searching: false, //关闭搜索输入框
            paging: true, //允许分页
            info: false,//左下角信息
            // infoCallback: function (settings, start, end, max, total, pre) {
            //     return '<span style="background-color:RGBA(255,255,255,0.65);">' + pre + ' </span>'
            // },
            lengthChange: false,
            ordering: false,
            serverSide: false,
            
            ajax: function (data, callback, settings) {

                _this.$http.get(url).then(result => {
                    console.log(result);
                    if (result.status == 200) 
                    {
                        var renderData = {};
                        renderData['draw'] = '1';
                        renderData['recordsTotal'] = result.data.dev.length;
                        renderData['recordsFiltered'] = '0';
                        renderData.data = result.data.dev;
                        console.log(result.data.dev);
                        callback(renderData);
                    }
                }).catch(error => {
                    console.log('GetDevice failed', error);
                });
            },
            fnDrawCallback: function (data, x) {}
        });

    },
    methods: {

        addDevHik()
        {
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/AddDeviceHik?name=" + this.strName 
                + "&token=" + this.strToken 
                + "&user=" + this.strUser + "&password=" + this.strPasswd
                + "&ip=" + this.strDevIpAddress + "&port=" + this.strDevPort
                + "&session="+ this.$store.state.token;
            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200) 
                {
                    console.log(result.data.bStatus);
                }
            }).catch(error => {
                console.log('AddDeviceHik', error);
            });
        },
        addDevDH()
        {
            let _this =this;
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            var url = root + "/api/v1/AddDeviceDh?name=" + this.strName 
                + "&token=" + this.strToken 
                + "&user=" + this.strUser + "&password=" + this.strPasswd
                + "&ip=" + this.strDevIpAddress + "&port=" + this.strDevPort
                + "&session="+ this.$store.state.token;
            this.$http.get(url).then(result => {
                console.log(result);
                if (result.status == 200) 
                {
                    console.log(result.data.bStatus);
                }
            }).catch(error => {
                console.log('AddDeviceDh', error);
            });
        },
        saveData() {
            let _this = this;
            this.$validator.validateAll().then((result) => {
                var ret = {"bStatus": false};
                if (this.nType == 'H5_DEV_HIK')
                {
                    ret = this.addDevHik();
                    console.log(ret);
                }

                if (this.nType == 'H5_DEV_DH')
                {
                    ret = this.addDevDH();
                    console.log(ret);
                }

                //if (ret['bStatus'] == true)
                if (true)
                {
                    $("#CameraModal").modal('hide');
                    $('#table1').DataTable().ajax.reload();
                    $('#table1').DataTable().ajax.reload();
                }else
                {
                    alert("Add failed");
                    $("#CameraModal").modal('hide');
                }
            })
        },
        editOneCamera() {
            console.log("editOneCamera");
        },
        searchTable() {
            $('#table1').DataTable().ajax.reload();
        },
        activeDom(index) {
            $.each($('.box-body ul li[class*="active"]'), function () {
                $(this).removeClass('active');
            });
            $('.box-body ul li').eq(index).addClass('active');
        },
        addDevice() {
            this.$validator.reset();
            this.strToken = uuid(4, 16).toLowerCase();
            $("#CameraModal").modal();
        },
        deleteDevice() {
            let _this = this;
            let hosts = [];
            $.each($('table tbody input:checked'), function (i, item) {
                hosts.push($(item).attr("token"));
            });
            if (hosts.length <= 0) {
                alert("Please select which need to delete!");
                return;
            }
            
            var root = process.env.API_ROOT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }

            console.log(hosts);
            for(var i in hosts)
            {
                console.log(hosts[i]);
                var url = root + "/api/v1/DelDevice?token=" + hosts[i] 
                    + "&session="+ this.$store.state.token;
                console.log(url);
                this.$http.get(url).then(result => {
                    console.log(result);
                    if (result.status == 200) 
                    {
                        console.log(result.data.bStatus);
                    }
                }).catch(error => {
                    console.log('DelDevice', error);
                });
            }
            
            $('#table1').DataTable().ajax.reload();
            $('#table1').DataTable().ajax.reload();

        },
        checkAll() {
            $('table tbody input[type="checkbox"]').prop('checked', $('table thead input[type="checkbox"]').prop("checked"));
        }
    }
}
</script>
<style scoped>
input[type='file'] {
    opacity: 0;
    display: none;
}
</style>