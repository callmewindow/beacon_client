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
                <div class="tab_right_body">
                  <el-row type="flex" class="row-bg">
                    <el-col :span="11">
                      <el-card id="intro_block" header="课程简介">
                        <span
                          style="color: #303133; font-size: 18px; float: left;"
                        >{{courseInfo.course_intro}}</span>
                      </el-card>
                    </el-col>

                    <el-col :span="11" :offset="2">
                      <el-card id="control_block" header="管理功能">
                        <el-tag class="conFunc" effect="dark" @click="showMemberUp = true">人员导入</el-tag>
                        <el-tag class="conFunc" effect="dark" @click="showVideoUp = true">视频上传</el-tag>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
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
                        v-for="item in videoUrlArray"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
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
                    <span style="font-size: 20px;">{{videoUrlArray[videoIndex - 1].title}}</span>
                  </el-row>
                  <el-row>
                    <VideoPlayer style=" margin-top: 20px; width: 100%; border-radius: 2px;"></VideoPlayer>
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
                <!-- <el-card class="tab_right_body">
                  <div style="display: flex; justify-content: center;">
                    <el-card id="option_btn_part">
                      <div class="option_btn_area">
                        <span class="option_btn_description">发帖：</span>
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          circle
                          @click="showSendUp = true"
                        ></el-button>
                      </div>
                      <el-divider></el-divider>
                      <div class="option_btn_area">
                        <span class="option_btn_description">回复：</span>
                        <el-button type="primary" icon="el-icon-edit" circle></el-button>
                      </div>
                      <el-divider></el-divider>
                      <div class="option_btn_area">
                        <span class="option_btn_description">其他：</span>
                        <el-button type="primary" icon="el-icon-edit" circle></el-button>
                      </div>
                    </el-card>
                    <el-card
                      style="width: 70%; height: 250px; text-align: center; font-size: 20px; position: relative;"
                      header="社区规则"
                    >
                      <el-button id="rule_change_btn" type="primary" icon="el-icon-edit" circle></el-button>
                    </el-card>
                  </div>
                </el-card>-->
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
        <el-button type="primary" @click="showMemberUp = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog id="videoUp" :visible.sync="showVideoUp" width="50%">
      <UploadVideo />
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
      tabPos: "intro",
      showMemberUp: false,
      showVideoUp: false,
      showSendUp: false,
      tabNames: ["intro", "direct", "video", "forum"],

      courseInfo: {
        course_name: "233",
        profession: "233",
        course_intro: "233",
      },

      videoUrlArray: [
        {
          id: 0,
          course_id: 0,
          title: "233",
          introduction: "233",
          local_address: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        },
      ],

      videoIndex: 1,

      fileList: [],
    };
  },
  mounted() {
    this.getCourseBasicInfo();
    this.getCourseVideoUrlArray();
    // 切换tab位置
    this.tabPos = this.$route.params.coursePos;
    if (this.tabNames.indexOf(this.tabPos) == -1) {
      this.$router.push({
        path: "/course/" + this.$route.params.courseId + "/" + this.tabNames[0],
      });
      this.tabPos = this.tabNames[0];
    }
    this.changeVideo();
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
      const temp = await CourseAPI.getCourseBasicInfo(1);
      this.courseInfo = temp.data.course;
      console.log(this.courseInfo);
    },

    async getCourseVideoUrlArray() {
      const temp = await CourseAPI.getCourseVideoUrlArray(1);
      this.videoUrlArray = temp.data.videos;
      console.log(this.videoUrlArray);
    },
    changeVideo: function () {
      let e = document.getElementById("video-player");
      e.src = this.videoUrlArray[this.videoIndex - 1].local_address;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    clickCommunity(target) {
      // 切换路由
      this.$router.push({
        path: "/course/" + this.$route.params.courseId + "/" + target.name,
      });
      if (target.name == "forum") {
        console.log(this.courseInfo.is_open);
        if (this.courseInfo.is_open == 0) {
          this.$alert(
            "该课程现在还未创建圈子社区，现在要创建圈子社区吗？",
            "创建圈子社区",
            {
              confirmButtonText: "确定",
              callback: (/*action*/) => {
                // this.$message({
                //   type: "info",
                //   message: `action: ${action}`,
                // });
                this.courseInfo.is_open = 1;
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
#intro_block {
  color: #409eff;
  font-size: 20px;
  text-align: center;
  height: 600px;
}

#control_block {
  color: #409eff;
  font-size: 20px;
  text-align: center;
}
.conFunc {
  cursor: pointer;
  margin-left: 10px;
}
.conFunc:nth-child(1) {
  margin-left: 0;
}

.course {
  text-align: left;
}
#course_body {
  width: 80%;
  margin-left: 10%;
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

#option_btn_part {
  width: 20%;
  height: 250px;
  margin-right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option_btn_area {
  margin: 20px 0;
}

#rule_change_btn {
  position: absolute;
  top: 10px;
  right: 10px;
}

#postList {
  width: 80%;
  margin-left: 10%;
}

.el-button {
  margin-left: 0;
}
</style>

