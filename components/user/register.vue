<template>
  <div class="main container">
    <div class="header">
      <a href="#/">
        <p>Home</p>
      </a>
      <h1>用户注册</h1>
    </div>
    <!-- 
      表单具有默认的提交行为，默认是同步的，同步表单提交，浏览器会锁死（转圈儿）等待服务端的响应结果。
      表单的同步提交之后，无论服务端响应的是什么，都会直接把响应的结果覆盖掉当前页面。

      后来有人想到了一种办法，来解决这个问题。
    -->
    <form id="register_form">
      <div class="form-group">
        <label for="email">邮箱</label>
        <span v-show="emailmessgae" class="pull-right messageCheck">{{emailmessgae}}</span>
        <input
          type="email"
          class="form-control"
          id="email"
          name="email"
          placeholder="Email"
          v-model="formData.email"
          @blur="handleCheckEmail($event)"
        />
      </div>

      <div class="form-group">
        <label for="nickname">昵称</label>
        <span v-show="nicknamemessgae" class="pull-right messageCheck">{{nicknamemessgae}}</span>
        <input
          type="text"
          class="form-control"
          id="nickname"
          name="nickname"
          placeholder="Nickname"
          v-model="formData.nickname"
          @blur="handleCheckNickname($event)"
        />
      </div>

      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password"
          v-model="formData.password"
        />
      </div>
      <a class="btn btn-success btn-block" @click="handleRegister($event)">注册</a>
    </form>
    <p>
      已有账号?
      <a @click="handleJumpTologinClick">点击登录</a>.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: "",
        nickname: "",
        password: "",
      },
      emailmessgae: "",
      nicknamemessgae: "",
    };
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      if (
        !this.emailmessgae &&
        !this.nicknamemessgae &&
        this.formData.password
      ) {
        axios({
          url: "http://106.14.23.225:80/api/user",
          method: "post",
          data: this.formData,
          timeout: 1000,
        })
          .then((res) => {
            var err_code = res.data.err_code;
            if (err_code === 500) {
              window.alert("服务器忙，请稍后重试！");
            } else if (err_code === 0) {
              this.$store.commit("setuserInfo", res.data.user);
              this.$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    handleCheckEmail(e) {
      var email = e.target.value.trim();
      if (!email) {
        return (this.emailmessgae = "邮箱不能为空！");
      }
      axios({
        url: "http://106.14.23.225:80/api/user",
        method: "get",
        params: { email },
        timeout: 1000,
      })
        .then((res) => {
          var err_code = res.data.err_code;
          if (err_code === 500) {
            window.alert("服务器忙，请稍后重试！");
          } else if (err_code === 0) {
            this.emailmessgae = "邮箱已存在";
          } else {
            this.emailmessgae = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCheckNickname(e) {
      var nickname = e.target.value.trim();
      if (!nickname) {
        return (this.nicknamemessgae = "昵称不能为空！");
      }
      axios({
        url: "http://106.14.23.225:80/api/user",
        method: "get",
        params: { nickname },
        timeout: 1000,
      })
        .then((res) => {
          var err_code = res.data.err_code;
          if (err_code === 500) {
            window.alert("服务器忙，请稍后重试！");
          } else if (err_code === 0) {
            this.nicknamemessgae = "昵称已存在";
          } else {
            this.nicknamemessgae = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleJumpTologinClick() {
      this.$router.push({
        path: "/user/login",
        query: { fromPath: "register" },
      });
    },
  },
};
</script>
<style  scoped>
a {
  cursor: pointer;
}
.main {
  width: 50%;
  margin: 100px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.main .header a {
  text-decoration: none;
}

.main .header a p {
  margin-top: 10px;
  font-size: 18px;
  text-decoration: none;
  color: #666;
}
.messageCheck {
  color: red;
}
</style>