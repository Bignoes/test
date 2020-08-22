<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container clearfix">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header pull-left">
          <a class="navbar-brand" href="#/">Home</a>
        </div>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="pull-right">
          <ul v-if="this.$store.state.userInfo" class="nav navbar-nav navbar-right">
            <a class="btn btn-default navbar-btn" href="#/home/newtopic">发起</a>
            <li
              :class="{'open':dropdownstate,'dropdown':true}"
              @mouseover="handleToggleDropdownClick(true)"
              @mouseout="handleToggleDropdownClick(false)"
            >
              <a
                href="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img width="20" height="20" src="avatar-default.png" alt />
                <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                <li class="dropdown-current-user">当前登录用户: {{this.$store.state.userInfo.nickname}}</li>
                <li role="separator" class="divider"></li>
                <li>
                  <a href="/mine_page">个人主页</a>
                </li>
                <li>
                  <a href="#/home/userset">设置</a>
                </li>
                <li>
                  <a @click="handleLogout">退出</a>
                </li>
              </ul>
            </li>
          </ul>
          <span v-else class="nav navbar-nav navbar-right">
            <a class="btn btn-primary navbar-btn" href="#/user/login">登录</a>
            <a class="btn btn-success navbar-btn" href="#/user/register">注册</a>
          </span>
        </div>
        <!-- /.navbar-collapse -->
      </div>
      <!-- /.container-fluid -->
    </nav>
    <router-view></router-view>
    <footer class="container" style="text-align: center;margin-top: 80px;">
      <p class="pull-bottom">Copyright © 2017</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownstate: false,
    };
  },
  methods: {
    handleToggleDropdownClick(value) {
      this.dropdownstate = value;
    },
    handleLogout() {
      this.$store.commit("setuserInfo", "");
      this.$router.push({ path: "/user/login" });
    },
  },
};
</script>
<style  scoped>
footer {
  position: relative;
}
.pull-bottom {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 80px;
}
</style>