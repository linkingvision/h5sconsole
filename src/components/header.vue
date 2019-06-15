<template>
        <nav class="navbar navbar-default navbar-static-top m-b-0">
            <div class="navbar-header">
                <div class="top-left-part">
                    <!-- Logo -->
                    <a class="logo" href="javascript:void(0)">
                        <!-- Logo icon image, you can use font-icon also -->
                    <b>
                        <!--This is dark logo icon--><img src="../assets/img/logo.png" alt="home" class="dark-logo" /><!--This is light logo icon--><img src="../assets/plugins/images/admin-logo-dark.png" alt="home" class="light-logo" />
                    </b>
                        <!-- Logo text image you can use text also -->
                    <span class="hidden-xs">
                        <!--This is dark logo text--><img src="../assets/img/h5sconsole.png" alt="home" class="dark-logo" /><!--This is light logo text--><img src="../assets/plugins/images/admin-text-dark.png" alt="home" class="light-logo" />
                     </span> 
                     </a>
                </div>
                <!-- /Logo -->
                <!-- Search input and Toggle icon -->
                <ul class="nav navbar-top-links navbar-left">
                    <li><a href="javascript:void(0)" class="open-close waves-effect waves-light visible-xs"><i class="ti-close ti-menu"></i></a></li>
                    <li class="dropdown">
                        <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#"> <i class="mdi mdi-bell"></i>
                            <div class="notify">  <span class="point"></span> </div>
                        </a>
                        <ul class="dropdown-menu mailbox animated bounceInDown">
                            <li>
                                <div class="drop-title">{{$t("message.header.alarm")}}</div>
                            </li>
                            <li>
                                <div class="message-center">

                                </div>
                            </li>
                            <li>
                                <a class="text-center" href="javascript:void(0);"> <strong>{{$t("message.header.see_alarm")}}</strong> <i class="fa fa-angle-right"></i> </a>
                            </li>
                        </ul>
                        <!-- /.dropdown-messages -->
                    </li>

                    <!-- .Megamenu -->
                    <li class="mega-dropdown"> <a class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" href="#"><span class="hidden-xs"></span> <i class="icon-options-vertical"></i></a>

                    </li>
                    <!-- /.Megamenu -->
                </ul>
                <ul class="nav navbar-top-links navbar-right pull-right">
                    <li>
                        <form role="search" class="app-search hidden-sm hidden-xs m-r-10">
                            <input type="text" placeholder="Search..." class="form-control"> <a href=""><i class="fa fa-search"></i></a> </form>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"> <img src="../assets/img/user.png" alt="user-img" width="36" class="img-circle"><b class="hidden-xs">admin</b><span class="caret"></span> </a>
                        <ul class="dropdown-menu dropdown-user animated flipInY">
                            <li>
                                <div class="dw-user-box">
                                    <div class="u-img"><img src="../assets/img/user.png" alt="user" /></div>
                                    <div class="u-text">
                                        <h4>admin</h4>
                                        <p class="text-muted">{{$t("message.header.user_name")}}</p></div>
                                </div>
                            </li>
                            <li role="separator" class="divider"></li>
                            <li><a href="javascript:void(0);"><i class="ti-settings"></i> {{$t("message.header.setting")}}</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="#/app/logout"><i class="fa fa-power-off"></i> {{$t("message.header.logout")}}</a></li>
                        </ul>
                        <!-- /.dropdown-user -->
                    </li>
                    <!-- /.dropdown -->
                </ul>
            </div>
            <!-- /.navbar-header -->
            <!-- /.navbar-top-links -->
            <!-- /.navbar-static-side -->
        </nav>
</template>
<script>
import * as types from '@/store/types'
export default {
    name:'vheader',
    methods:{

    }
}
</script>

