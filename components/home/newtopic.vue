<template>
  <section class="container">
    <div class="row">
      <div class="col-md-12">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">标题</label>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              v-model.trim="formData.title"
              @blur="handlePostCheck"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">内容</label>
            <textarea
              class="form-control"
              rows="10"
              v-model.trim="formData.content"
              @blur="handlePostCheck"
            ></textarea>
          </div>
          <a type="submit" class="btn btn-default" @click="handlePostTopicClick">发表</a>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      Postmessgae: "输入想要发布的内容，并添加标题，立即发布",
      formData: {
        email: this.$store.state.userInfo.email,
        title: "",
        content: "",
      },
    };
  },
  methods: {
    handlePostTopicClick() {
      if (this.Postmessgae) {
        return;
      }
      axios({
        url: "http://106.14.23.225:80/api/topic",
        method: "post",
        data: this.formData,
        timeout: 1000,
      })
        .then((res) => {
          const err_code = res.data.err_code;
          if (err_code === 500) {
            return window.alert("服务器繁忙,请稍后再试！");
          } else if (err_code === 0) {
            return this.$router.push({ path: "/" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handlePostCheck() {
      if (!this.formData.title && !this.formData.content) {
        this.Postmessgae = "请输入邮箱和密码";
      } else if (!this.formData.title) {
        this.Postmessgae = "请输入标题";
      } else if (!this.formData.content) {
        this.Postmessgae = "请输入文章内容";
      } else {
        this.Postmessgae = "";
      }
    },
  },
};
</script>
<style  scoped>
.container {
  padding: 20px 30px 40px;
  background-color: #fff;
}
textarea {
  resize: none;
}
</style>