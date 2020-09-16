<template>
  <div id="sendTA">
    <!-- <div slot="header">
      发布帖子
    </div>-->
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>真实姓名
      </div>
      <el-input v-model="auth.name" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>所属机构/学校
      </div>
      <el-input v-model="auth.school" placeholder="请输入内容" maxlength="30" show-word-limit></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>教职工号
      </div>
      <el-input v-model="auth.schoolId" placeholder="请输入内容" maxlength="20" show-word-limit></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>职称
      </div>
      <el-input v-model="auth.profession" placeholder="请输入内容" maxlength="10" show-word-limit></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle">
        <span style="color:red">*</span>联系邮箱
      </div>
      <el-input v-model="auth.email" placeholder="请输入内容" maxlength="20" show-word-limit></el-input>
      <div class="itemTip">注：邮箱有接收认证结果的功能</div>
    </div>

    <el-button id="sendBtn" type="primary" size="small" @click="sendAuth">发布</el-button>
  </div>
</template>

<script>
import * as userAPI from "@/APIs/user";
import * as FT from "@/tools/frontTool";
export default {
  name: "TeacherAuth",
  data() {
    return {
      auth: {
        name: "",
        school: "",
        schoolId: "",
        profession: "",
        email: "",
      },
    };
  },
  methods: {
    async sendAuth() {
      if(!FT.isEmail(this.auth.email)){
        this.$message.error("请输入正确格式的邮箱");
        return ;
      }
      if (
        FT.CS(
          this.auth.name +
            this.auth.school +
            this.auth.schoolId +
            this.auth.profession +
            this.auth.email
        )
      ) {
        this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
        return;
      }
      console.log(this.auth);
      // let tempP = {
      //   title: this.post.title,
      //   content: this.post.content,
      //   senderId: this.$store.state.userId,
      //   tags: this.postTag,
      //   courseId: this.$route.params.courseId,
      // };
      // try {
      //   await forumAPI.sendPost(tempP);
      //   await forumAPI.addPoint(this.$store.state.userId,this.$$route.params.courseId,100);
      // } catch (error) {
      //   console.log(error);
      // }
      // location.reload();
    },
  },
};
</script>

<style scoped>
.sendItem {
  width: 80%;
  margin: 20px 0;
}
.sendItem:nth-child(1) {
  margin-top: -20px;
}
.itemTitle {
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
}
.itemTip {
  font-size: 12px;
  color: gray;
  margin-top: 2px;
  margin-left: 2px;
}
#sendBtn{
  margin-bottom: -10px;
}
</style>