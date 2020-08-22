<template>
  <section class="container">
    <div class="col-md-5">
      <form>
        <div class="form-group">
          <label for="exampleInputPassword1">昵称</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="请输入您的新昵称"
            v-model="formData.nickname"
            @blur="handleCheckNickname($event)"
          />
        </div>
        <p v-show="nicknamemessgae" class="checkColor">{{nicknamemessgae}}</p>
        <div class="form-group">
          <label for="exampleInputPassword1">个人简介</label>
          <textarea
            class="form-control"
            rows="8"
            name="bio"
            placeholder="请简单介绍自己"
            v-model="formData.bio"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">性别</label>
          <div>
            <label class="radio-inline">
              <input
                type="radio"
                name="gender"
                id="inlineRadio1"
                value="1"
                v-model.number="formData.gender"
              /> 男
            </label>
            <label class="radio-inline">
              <input
                type="radio"
                name="gender"
                id="inlineRadio2"
                value="0"
                v-model.number="formData.gender"
              /> 女
            </label>
            <label class="radio-inline">
              <input
                type="radio"
                name="gender"
                id="inlineRadio3"
                value="-1"
                v-model.number="formData.gender"
              /> 保密
            </label>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">生日</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            name="birthday"
            placeholder="请输入出生年月日"
            v-model="formData.birthday"
          />
        </div>
        <a type="submit" class="btn btn-success" @click="handleUpdateUserClick">保存</a>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      loginedUser: this.$store.state.userInfo,
      nicknamemessgae: "",
      formData: {
        nickname: "",
        bio: "",
        gender: "",
        birthday: "",
      },
    };
  },
  mounted() {
    for (var key in this.formData) {
      this.formData[key] = this.loginedUser[key];
    }
  },
  methods: {
    handleCheckNickname(e) {
      var nickname = e.target.value.trim();
      if (!nickname) {
        return (this.nicknamemessgae = "昵称不能为空！");
      }
      if (nickname === this.loginedUser.nickname) {
        return (this.nicknamemessgae = "");
      }
      axios({
        url: "http://106.14.23.225:80/api/user",
        method: "patch",
        data: { nickname },
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
    async handleUpdateUserClick() {
      if (this.nicknamemessgae) {
        return;
      }

      var obj = this.loginedUser;
      for (var key in this.formData) {
        obj[key] = this.formData[key];
      }

      await axios({
        url: "http://106.14.23.225:80/api/user",
        method: "put",
        data: obj,
        timeout: 1000,
      })
        .then((res) => {
          var err_code = res.data.err_code;
          if (err_code === 500) {
            window.alert("服务器忙，请稍后重试！");
          } else if (err_code === 0) {
            this.$store.commit("setuserInfo", res.data.user);
            window.alert("更新成功！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style  scoped>
.checkColor {
  color: red;
}
</style>