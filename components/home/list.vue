<template>
  <section class="container">
    <ul class="media-list">
      <li class="media" v-for="(item,index) in list" :key="index">
        <a
          style="cursor:pointer"
          @click="handlePageJumpClick({name:'TopicDetail',params:{create_time:item.create_time}})"
        >
          <h4 class="media-heading">
            {{item.title}}
            <span class="pull-right text-warning">{{item.create_time}}</span>
          </h4>
        </a>
        <div class="article">
          <div class="avatar_nickname">
            <a
              class="overtext"
              @click="handlePageJumpClick({name:'Personal',params:{email:item.email}})"
            >
              <img width="20" height="20" src="avatar-default.png" />
              <span>{{item.nickname}}</span>
            </a>
          </div>
          <div class="content overtext">
            <span>{{item.content}}</span>
          </div>
          <div class="read_number">
            <a class="pull-right">
              <i class="glyphicon glyphicon-eye-open"></i>
              <span>{{item.read_number}}</span>
            </a>
          </div>
        </div>
      </li>
    </ul>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="active">
          <a href="javascript:;">1</a>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  async beforeMount() {
    await axios({
      url: "http://106.14.23.225:80/api/topic",
      method: "get",
    })
      .then((res) => {
        this.list = res.data.topics;
      })
      .catch((err) => {
        console.log(err);
      });

    for (var i = 0; i < this.list.length; i++) {
      await axios({
        url: "http://106.14.23.225:80/api/user",
        method: "get",
        params: { email: this.list[i].email },
      })
        .then((res) => {
          this.list[i].nickname = res.data.user.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    handlePageJumpClick(obj) {
      this.$router.push({ name: obj.name, params: obj.params });
    },
  },
};
</script>
<style  scoped>
.navbar {
  background-color: #fff;
}

.article {
  display: flex;
  justify-content: space-between;
}

.avatar_nickname,
.read_number {
  width: 100px;
}

.content {
  width: 75%;
  padding-left: 2em;
}

.overtext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.media-heading a {
  display: block;
  width: 100%;
  text-decoration: none;
}

.media-heading a span {
  font-size: 12px;
}

.media-list {
  border-radius: 10px;
  background-color: #fff;
}

.media-list li {
  border-bottom: 1px solid #f3f3f3;
  padding: 20px;
  margin: 0;
}

.media-list {
  height: 600px;
}

body {
  background-color: #f1f1f1;
}

a[class="overtext"] {
  text-decoration: none;
  cursor: pointer;
}
</style>
