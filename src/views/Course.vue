<template>
  <div class="course">
    <Navigator />

    <div id="course_body">
      <el-row id="up_part">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <el-card id="up_left_part">
            <div style="font-size: 18px;">大学名称</div>
          </el-card>
        </el-col>

        <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <el-card id="up_right_part">
            <el-link
              id="course_name"
              type="primary"
              :underline="false"
              @click="FT.building"
            >{{courseInfo.course_name}}</el-link>

            <el-link
              id="teacher_name"
              type="success"
              :underline="false"
              @click="FT.building"
            >{{courseInfo.profession}}</el-link>

            <el-dropdown
              id="teacher_manage_entrance"
              v-if="identity === 2"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                教师管理入口
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="导入名单">导入名单</el-dropdown-item>
                <el-dropdown-item command="视频上传">视频上传</el-dropdown-item>
                <el-dropdown-item command="管理视频">管理视频</el-dropdown-item>
                <el-dropdown-item command="管理学生">管理学生</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

            <el-link
              id="join_entrance"
              type="primary"
              :underline="false"
              v-if="identity === 3"
              style="font-size: 18px;"
              @click="joinCourse"
            >加入课程</el-link>
          </el-card>
        </el-col>
      </el-row>

      <el-row id="down_part">
        <el-col>
          <el-card id="down_card">
            <el-tabs v-model="tabPos" tab-position="left" @tab-click="clickCommunity">
              <el-tab-pane :name="tabNames[0]">
                <div class="tab_left_part" slot="label">课程信息</div>
                <el-row>
                  <el-col class="tab_right_title">课程信息</el-col>
                </el-row>
                <el-card class="tab_right_body">
                  <span style="color: #303133; font-size: 18px;">{{courseInfo.course_intro}}</span>
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[1]">
                <div class="tab_left_part" slot="label">课程直播</div>
                <el-row>
                  <el-col class="tab_right_title">课程直播</el-col>
                </el-row>

                <el-card class="tab_right_body">
                  <span style="color: #303133; font-size: 18px; float: left;">功能开发中，敬请期待</span>
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[2]">
                <div class="tab_left_part" slot="label">视频资源</div>
                <el-row>
                  <el-col class="tab_right_title">视频资源</el-col>
                </el-row>

                <el-card class="tab_right_body">
                  <el-row id="course_selector">
                    <span style="margin-left: 5px;">请选择章节：</span>
                    <el-select
                      class="video_select"
                      v-model="videoIndex"
                      placeholder="请选择"
                      @change="changeVideo"
                    >
                      <el-option
                        v-for="(item, index) in videoUrlArray"
                        :key="index"
                        :label="item.title"
                        :value="index"
                      ></el-option>
                    </el-select>

                    <!-- <el-select
                      class="video_select"
                      v-model="videoIndex"
                      style="margin-left: 20px;"
                      placeholder="请选择"
                      @change="getVideoIndex"
                    >
                      <el-option
                        v-for="item in urlArray"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>-->
                  </el-row>
                  <el-row style="margin-top: 10px; text-align: center;">
                    <span
                      style="font-size: 20px;"
                      v-if="videoExist"
                    >{{videoUrlArray[videoIndex].title}}</span>
                  </el-row>
                  <el-row>
                    <VideoPlayer
                      v-if="videoUrlArray != []"
                      style=" margin-top: 20px; width: 100%; border-radius: 2px;"
                      @startPlay="getStartTime"
                      @pausePlay="getPauseTime"
                    ></VideoPlayer>
                  </el-row>
                </el-card>
              </el-tab-pane>

              <el-tab-pane :name="tabNames[3]">
                <div class="tab_left_part" slot="label">圈子社区</div>
                <el-row>
                  <el-col class="tab_right_title" v-if="courseInfo.is_open">圈子社区</el-col>
                </el-row>
                <div id="postList" v-if="courseInfo.is_open">
                  <PostList />
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="导入学生" :visible.sync="showMemberUp" width="30%">
      <UploadMember />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMemberUp = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showVideoUp" width="50%">
      <UploadVideo />
    </el-dialog>

    <el-dialog :visible.sync="showManageVideo" width="50%">
      <el-table :data="videoUrlArray" stripe width="100%">
        <el-table-column prop="title" label="视频标题"></el-table-column>
        <el-table-column prop="introduction" label="视频简介"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="medium" @click="updateVideoInfo(scope.row)">更改信息</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="text"
              size="medium"
              @click="deleteVideo(scope.row)"
              style="color: #F56C6C;"
            >删除视频</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="manageVideoTitle" :visible.sync="showSpecificVideoInfo">
      <div style="font-size: 16px; margin-bottom: 10px;">视频标题</div>
      <el-input v-model="newTitle" :placeholder="specificVideoInfo.title"></el-input>
      <el-divider></el-divider>
      <div style="font-size: 16px; margin-bottom: 10px;">视频简介</div>
      <el-input
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 7}"
        :placeholder="specificVideoInfo.introduction"
        v-model="newIntroduction"
      ></el-input>
      <el-button type="text" style="color: #909399; font-size: 17px; margin: 4% 7% 0 80%;">取消</el-button>
      <el-button type="text" style="color: #409EFF; font-size: 17px;">更新</el-button>
    </el-dialog>

    <el-dialog title="人员名单" :visible.sync="showStudentList" width="80%">
      <el-table :data="studentList" border style="width: 100%">
        <el-table-column prop="school_id" label="学号"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="school" label="学校"></el-table-column>
        <el-table-column prop="user_identity" label="身份">
          <template slot-scope="scope">
            <span v-if="scope.row.user_identity == 0">学生</span>
            <span v-if="scope.row.user_identity == 1">助教</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.user_identity == 1"
              type="text"
              size="medium"
              style="color: #E6A23C;"
              @click="cancelAssistant(scope.row.user_id)"
            >取消助教</el-button>
            <el-button
              v-if="scope.row.user_identity == 0"
              type="text"
              size="medium"
              @click="authAssistant(scope.row.user_id)"
            >设为助教</el-button>
            <el-divider v-if="scope.row.user_identity == 0" direction="vertical"></el-divider>
            <el-button
              v-if="scope.row.user_identity == 0"
              type="text"
              size="medium"
              style="color: #F56C6C;"
              @click="deleteStudent(scope.row.user_id)"
            >删除</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="text"
              size="medium"
              style="color: #67C23A;"
              @click="viewRecord(scope.row.user_id, scope.row.realname)"
            >学习记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :title="recordTitle" :visible.sync="showStudentRecord">
      <el-table :data="recordList" stripe style="width: 100%">
        <el-table-column prop="id" label="视频ID"></el-table-column>
        <el-table-column prop="title" label="视频标题"></el-table-column>
        <el-table-column prop="duration" label="观看时常"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import UploadVideo from "@/components/UploadVideo";
import UploadMember from "@/components/UploadMember";
import PostList from "@/components/PostList";
import Navigator from "@/components/Navigator";
import * as FT from "@/tools/frontTool";
import * as CourseAPI from "@/APIs/course";
import {
  cancelAssistant,
  getCourseStudentList,
  getCourseVideoUrlArray,
} from "../APIs/course";

export default {
  name: "Course",
  components: {
    VideoPlayer,
    Navigator,
    UploadVideo,
    UploadMember,
    PostList,
  },
  data() {
    return {
      FT,

      userId: null,
      identity: null,
      courseId: null,

      courseInfo: {},
      videoExist: false,
      videoIndex: null,
      videoUrlArray: null,
      studentList: [],
      recordList: [
        {
          id: 1,
          title: "夏露伊苏",
          duration: 100,
        },
        {
          id: 2,
          title: "木吉手枪",
          duration: 1000000,
        },
        {
          id: 3,
          title: "更衣室大战",
          duration: 233,
        },
      ],

      joinMessage: null,

      showMemberUp: false,
      showVideoUp: false,
      showStudentList: false,
      showManageVideo: false,
      showSpecificVideoInfo: false,
      manageVideoTitle: null,
      specificVideoInfo: {
        title: "加载中",
        introduction: "加载中",
      },
      newTitle: null,
      newIntroduction: null,

      showStudentRecord: false,
      recordTitle: null,

      tabPos: "intro",
      tabNames: ["intro", "direct", "video", "forum"],

      firstStartTime: null,
      startTime: null,
      pauseTime: null,
      duration: 0,
      videoId: null,
    };
  },

  // 监听tabPos的变化，当侧边栏从“video”切换至非“video”时，暂停视频播放，通过内置的自定义时间触发getPauseTime方法
  watch: {
    tabPos(newPos, oldPos) {
      if (oldPos === "video" && newPos !== "video") {
        let e = document.getElementById("video-player");
        e.pause();
      }
    },
  },

  // 加载
  async created() {
    if (this.$store.state.userId === -1) {
      FT.toPath("/Home");
    }
    this.userId = this.$store.state.userId;
    this.identity = this.$store.state.permission;
    // 从地址栏获得courseId
    this.courseId = this.$route.params.courseId;
    // 根据courseId获取相应的信息
    await this.getCourseBasicInfo();
    await this.getCourseVideoUrlArray();
    // 切换tab位置，默认为第一个
    this.tabPos = this.$route.params.coursePos;
    if (this.tabNames.indexOf(this.tabPos) == -1) {
      this.$router.push({
        path: "/course/" + this.$route.params.courseId + "/" + this.tabNames[0],
      });
      this.tabPos = this.tabNames[0];
    }
  },

  // 切回其他页面，或直接关闭时的钩子函数
  async destroyed() {
    if (this.firstStartTime === null) {
      return;
    }
    if (this.pauseTime === null) {
      this.getPauseTime(new Date());
    }
    setTimeout(1000);
    // 用POST请求发送给后端
    const tempFormat = {
      video_id: this.videoId,
      user_id: this.userId,
      played_time: this.duration,
      start_play_time: this.firstStartTime,
    };
    const temp = await CourseAPI.addWatchRecord(
      tempFormat.video_id,
      tempFormat.user_id,
      tempFormat.played_time,
      tempFormat.start_play_time
    );
    console.log(temp);
    setTimeout(10000);
  },

  methods: {
    handleStuClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {
          alert("我取消啦");
        });
    },

    handleVideoClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {
          alert("我取消啦");
        });
    },

    async getCourseBasicInfo() {
      const temp = await CourseAPI.getCourseBasicInfo(
        this.$route.params.courseId,
        this.$store.state.userId
      );
      this.courseInfo = temp.data.course;
      console.log("课程信息");
      console.log(this.courseInfo);
    },

    async getCourseVideoUrlArray() {
      const temp = await CourseAPI.getCourseVideoUrlArray(
        this.$route.params.courseId
      );
      if (temp.data.message === "success") {
        this.videoUrlArray = temp.data.videos;
        this.videoExist = true;
        this.videoIndex = 0;
        this.changeVideo();
      } else {
        this.videoUrlArray = [];
        this.videoExist = false;
      }
      console.log("视频列表");
      console.log(this.videoUrlArray);
    },

    async getCourseStudentList() {
      const temp = await CourseAPI.getCourseStudentList(
        this.$route.params.courseId
      );
      if (temp.data.message === "success") {
        let studentList = temp.data.students;
        this.studentList = new Array();
        for (let i = 0; i < studentList.length; i++) {
          if (studentList[i].user_identity == 1) {
            this.studentList.push(studentList[i]);
          }
        }
        for (let i = 0; i < studentList.length; i++) {
          if (studentList[i].user_identity == 0) {
            this.studentList.push(studentList[i]);
          }
        }
      } else {
        this.studentList = [];
      }
      console.log("学生列表");
      console.log(this.studentList);
    },

    // 视频开始播放时触发的方法
    getStartTime(data) {
      if (this.firstStartTime === null) {
        this.firstStartTime = data.Format("yyyy-MM-dd hh:mm:ss");
      }
      this.startTime = data;
      this.pauseTime = null;
      console.log("开始时间：" + this.startTime.Format("yyyy-MM-dd hh:mm:ss"));
    },

    // 视频暂停时触发的方法
    getPauseTime(data) {
      this.pauseTime = data;
      console.log("暂停时间：" + this.pauseTime.Format("yyyy-MM-dd hh:mm:ss"));
      this.duration += (data.getTime() - this.startTime.getTime()) / 1000;
      this.startTime = null;
      console.log(this.duration);
    },

    // 更改视频的src
    changeVideo: function () {
      if (this.videoExist == false) {
        return;
      }
      let e = document.getElementById("video-player");
      e.src =
        "http://101.200.219.50" +
        this.videoUrlArray[this.videoIndex].local_address;
      this.videoId = this.videoUrlArray[this.videoIndex].id;
    },

    async handleCommand(command) {
      if (command === "导入名单") {
        this.showMemberUp = true;
      } else if (command === "视频上传") {
        this.showVideoUp = true;
      } else if (command === "管理学生") {
        await this.getCourseStudentList();
        this.showStudentList = true;
      } else if (command === "管理视频") {
        this.showManageVideo = true;
      }
    },

    async joinCourse() {
      this.$confirm(
        '确定申请加入课程"' + this.courseInfo.course_name + '"？',
        "加入申请",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }
      )
        .then(async () => {
          const temp = await CourseAPI.joinCourse(
            this.courseId,
            this.userId,
            "233"
          );
          console.log(temp);
          if (temp.data.message === "success") {
            this.$message({
              type: "success",
              message: "申请成功",
            });
          } else {
            this.$message({
              type: "info",
              message: "申请失败",
            });
          }
        })
        .catch(() => {});
    },

    async authAssistant(user_id) {
      const temp = await CourseAPI.authAssistant(user_id, this.courseId);
      for (let i = 0; i < this.studentList.length; i++) {
        if (this.studentList[i].user_id == user_id) {
          this.studentList[i].user_identity = 1;
        }
      }
    },

    async cancelAssistant(user_id) {
      const temp = await CourseAPI.cancelAssistant(user_id, this.courseId);
      for (let i = 0; i < this.studentList.length; i++) {
        if (this.studentList[i].user_id == user_id) {
          this.studentList[i].user_identity = 0;
        }
      }
    },

    async deleteStudent(user_id) {
      const temp = await CourseAPI.deleteStudent(user_id, this.courseId);
      for (let i = 0; i < this.studentList.length; i++) {
        if (this.studentList[i].user_id == user_id) {
          this.studentList.pop(i);
        }
      }
    },

    updateVideoInfo(data) {
      this.showSpecificVideoInfo = true;
      this.manageVideoTitle = '"' + data.title + '"' + "的详细信息";
      this.specificVideoInfo = data;
      console.log(this.specificVideoInfo);
    },

    async viewRecord(user_id, realname) {
      this.recordTitle = '"' + realname + '"' + "的观看记录";
      this.showStudentRecord = true;
    },

    clickCommunity(target) {
      // 切换路由
      this.$router.push({
        path: "/course/" + this.$route.params.courseId + "/" + target.name,
      });
      if (target.name == "video") {
        this.changeVideo();
        return;
      }
      if (target.name == "forum") {
        if (this.courseInfo.is_open === 0) {
          this.$alert(
            "该课程现在还未创建圈子社区，现在要创建圈子社区吗？",
            "创建圈子社区",
            {
              confirmButtonText: "确定",
              callback: async (action) => {
                if (action == "confirm") {
                  // 同步保证请求发送成功
                  await CourseAPI.openCourseForum(this.courseId);
                  location.reload();
                }
              },
            }
          );
        }
      }
    },
  },
};
</script>

<style scoped>
.course {
  text-align: left;
}

#course_body {
  width: 80%;
  margin-left: 10%;
}

.el-row {
  margin-bottom: 0;
}

#up_part {
  padding-top: 62px;
}

#up_left_part {
  height: 60px;
  background-color: #409eff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1px;
  border-radius: 1px;
}

#up_right_part {
  height: 60px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1px;
}

#course_name {
  font-size: 20px;
  padding-right: 15px;
  border-right: 1px solid #aaa;
}

#teacher_name {
  font-size: 18px;
  padding-left: 15px;
}

#join_entrance {
  position: absolute;
  left: 80%;
}

#teacher_manage_entrance {
  position: absolute;
  left: 80%;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 18px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

#down_part {
  margin-top: 2px;
  border-radius: 1px;
}

#down_card {
  padding-bottom: 20px;
}

.tab_right_title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 10px;
  color: #303133;
}

.tab_right_body {
  width: 80%;
  height: 600px;
  margin-left: 10%;
  margin-right: 10%;
  margin-top: 10px;
  font-size: 18px;
}

#course_selector {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.video_select {
  width: 150px;
  margin-left: 5%;
}

.tab_left_part {
  width: 9vw;
  text-align: center;
  font-size: 16px;
}

#postList {
  width: 80%;
  margin-left: 10%;
}

.el-button {
  margin-left: 0;
}
</style>

