<template>
  <el-card class="All">
    <el-input v-model="userId"></el-input>
    {{userId}}
    <el-button @click="like">1</el-button>
    <el-button @click="dislike">2</el-button>
    <el-button @click="getlike">get</el-button>
  </el-card>
</template>

<script>
export default {
  name: "upload_student",
  data() {
    return {
      postId: 1,
      userId: 7,
      likeR: [
        {
          postId: 1,
          userId: 7,
          like: 0,
        },
        {
          postId: 1,
          userId: 6,
          like: 0,
        },
      ],
    };
  },
  created() {},

  methods: {
    like() {
      for (let i = 0; i < this.likeR.length; i++) {
        if (
          this.likeR[i].postId == this.postId &&
          this.likeR[i].userId == this.userId
        ) {
          this.likeR[i].like += 1;
        }
      }
      console.log(JSON.stringify(this.likeR));
      localStorage.setItem("likeReocrd","123");
    },
    dislike() {
      for (let i = 0; i < this.likeR.length; i++) {
        if (
          this.likeR[i].postId == this.postId &&
          this.likeR[i].userId == this.userId &&
          this.likeR[i].like > 0
        ) {
          this.likeR[i].like -= 1;
        }
      }
      localStorage.setItem("likeReocrd", JSON.stringify(this.likeR));
    },
    getlike() {
        console.log(localStorage.length)
        console.log(localStorage.key(17))
    //   console.log(JSON.parse(localStorage.getItem("postId")));
    //   console.log(localStorage.getItem("postId"));
    },
  },
};
</script>

<style scoped>
.All {
  text-align: left;
}

#card {
  width: 100%;
  margin-top: 100px;
}
</style>
