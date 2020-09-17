<template>
  <div id="FLA">
    <div class="friendItem" v-for="o in 12" :key="o">
      <div class="friendName">木村</div>
      <div class="lastMessage">{{ msg | cutMsg }}</div>
      <div class="msgStatusNo" v-if="!read">未读</div>
      <div class="msgStatusYes" v-if="read">已读</div>
      <div class="friendBtn">
        <el-button size="mini" type="primary" @click="showMsg('木村')">私信</el-button>
        <el-button size="mini" type="primary" @click="deleteFriend('木村')">删除</el-button>
      </div>
    </div>
    <el-dialog :title="talkFriend" :visible.sync="showMsgUp" width="50%">好友私信</el-dialog>
  </div>
</template>

<script>
import * as postAPI from "@/APIs/forum.js";
import * as CourseAPI from "@/APIs/course";
import * as NoticeAPI from "@/APIs/notice";
import * as ua from "@/APIs/user";
import * as FT from "@/tools/frontTool";

export default {
  name: "FriendList",
  components: {},
  data() {
    return {
      FT,
      read: false,
      showMsgUp: false,
      msg: "你好，我是木村你好，我是木村",
      talkFriend: "与木村的对话",
    };
  },
  async created() {
    let temp = await NoticeAPI.getAllFriend(1);
    // let temp2 = await ua.getFriendApplication(1);
    console.log(temp2);
  },
  filters: {
    cutMsg(str) {
      if(str.length > 8){
        return str.slice(0,8)+"...";
      }else{
        return str;
      }
    },
  },
  methods: {
    showMsg(name) {
      this.showMsgUp = true;
      this.msgTitle = "与" + name + "的对话";
    },
    async deleteFriend(name) {
      this.$confirm("是否确定删除和 "+name+" 的好友关系？", "好友删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped>
#FLA {
  width: 500px;
  height: 400px;
  padding: 20px;
  overflow: scroll;
  background-color: white;
}
.friendItem {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
.friendItem:nth-child(1) {
  margin-top: 0px;
}
.friendName {
  font-size: 17px;
  float: left;
  margin-left: 20px;
}
.lastMessage {
  font-size: 13px;
  color: gray;
  float: left;
  margin-left: 12px;
}
.msgStatusYes {
  font-size: 13px;
  color: gray;
  float: left;
  margin-left: 8px;
  font-weight: bold;
}
.msgStatusNo {
  font-size: 13px;
  float: left;
  color: #409eff;
  margin-left: 5px;
  font-weight: bold;
}
.friendBtn {
  margin-right: 10px;
  float: right;
}
</style>