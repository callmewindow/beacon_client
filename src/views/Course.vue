<template>
  <div class="course">
    <Navigator />
    <div id="course_body">
      <el-row type="flex" style="padding-top: 60px;">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <el-card id="university-card">
            <div>大学名称</div>
          </el-card>
        </el-col>

        <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <el-card id="course-and-teacher-card">
            <el-link
              type="primary"
              :underline="false"
              style="font-size: 22px; padding-right: 15px; border-right: 1px solid #aaaaaa;"
              @click="FT.building"
            >{{courseName}}</el-link>
            <el-link
              type="success"
              :underline="false"
              style="font-size: 16px; margin-left: 15px;"
              @click="FT.building"
            >{{courseTeacher}}</el-link>
          </el-card>
        </el-col>
      </el-row>

      <el-row id="down-part">
        <el-col>
          <el-card id="down_card">
            <el-tabs
              v-model="tabPos"
              tab-position="left"
              style="width: 100%;"
              @tab-click="clickCommunity"
            >
              <el-tab-pane :name="tabNames[0]">
                <div class="left_tab" slot="label">课程信息</div>
                <el-row>
                  <el-col class="center_title">课程信息</el-col>
                </el-row>
                <div style="width: 80%; margin: 0 10%;">
                  <el-row type="flex" class="row-bg">
                    <el-col :span="11">
                      <el-card
                        style="height: 600px; margin-top: 10px; color: #909399; font-size: 16px;"
                      >
                        <el-row
                          style="margin-bottom: 20px; color: #303133; font-size: 20px; text-align: center;"
                        >课程简介</el-row>
                        <el-row style="text-align: left;">{{courseDescription}}</el-row>
                      </el-card>
                    </el-col>

                    <el-col :span="11" :offset="2">
                      <el-card id="controlBlock" header="管理功能">
                        <el-tag class="conFunc" effect="dark" @click="showMemUp = true">人员导入</el-tag>
                        <el-tag class="conFunc" effect="dark" @click="showVideoUp = true">视频上传</el-tag>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </el-tab-pane>
              <el-tab-pane :name="tabNames[1]">
                <div class="left_tab" slot="label">课程直播</div>
                <el-row>
                  <el-col class="center_title">课程直播</el-col>
                </el-row>
                <el-row style="display: flex; justify-content: center;">
                  <el-card
                    style="width: 80%; height: 600px; margin-top: 10px; color: #909399; font-size: 18px;"
                  >功能开发中，敬请期待</el-card>
                </el-row>
              </el-tab-pane>
              <el-tab-pane :name="tabNames[2]">
                <div class="left_tab" slot="label">视频资源</div>
                <el-row>
                  <el-col class="center_title">视频资源</el-col>
                </el-row>
                <el-row>
                  <div style="width: 80%; margin: 0 10%;height: 600px">
                    <el-card style="margin-top: 10px;">
                      <el-row id="course-selector">
                        <span id="course-selector-title">请选择章节：</span>

                        <div style="margin-left: 14%">
                          <el-select
                            class="video_select"
                            v-model="courseIndex"
                            placeholder="请选择"
                            @change="getCourseIndex"
                          >
                            <el-option
                              v-for="item in courseArray"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>

                          <el-select
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
                          </el-select>
                        </div>
                      </el-row>
                      <el-row style="margin-top: 20px; text-align: center;">
                        <span id="video-title-part">{{videoTitle}}</span>
                      </el-row>
                      <el-row>
                        <VideoPlayer style=" margin-top: 20px; width: 100%; border-radius: 5px;"></VideoPlayer>
                      </el-row>
                    </el-card>
                  </div>
                </el-row>
              </el-tab-pane>
              <el-tab-pane :name="tabNames[3]">
                <div class="left_tab" slot="label">圈子社区</div>
                <el-row>
                  <el-col class="center_title">圈子社区</el-col>
                </el-row>
                <el-row>
                  <div style="width: 80%; margin: 0 10%;">
                    <el-card
                      style="height: 600px; margin-top: 10px; color: #909399; font-size: 16px;"
                    >
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        circle
                        @click="showSendUp = true"
                      ></el-button>
                    </el-card>
                  </div>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="导入学生" :visible.sync="showMemUp" width="30%">
      <UploadMember />
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMemUp = false">取 消</el-button>
        <el-button type="primary" @click="showMemUp = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog id="videoUp" :visible.sync="showVideoUp" width="50%">
      <UploadVideo />
    </el-dialog>
    <el-dialog title="发布帖子" id="sendUp" :visible.sync="showSendUp" width="30%">
      <SendPost />
    </el-dialog>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import UploadVideo from "@/components/UploadVideo";
import UploadMember from "@/components/UploadMember";
import Navigator from "@/components/Navigator";
import SendPost from "@/components/SendPost";
import * as FT from "@/tools/frontTool";
import * as CourseAPI from "@/APIs/course";

export default {
  name: "Course",
  components: {
    VideoPlayer,
    Navigator,
    UploadVideo,
    UploadMember,
    SendPost,
  },
  data() {
    return {
      FT,
      tabPos: "intro",
      showMemUp: false,
      showVideoUp: false,
      showSendUp: false,
      tabNames: ["intro", "direct", "video", "forum"],
      courseName: "Operating System",
      courseTeacher: "X老师",
      courseDescription: "很玄学，很魔幻",
      videoTitle: "8 0 3 8 6",
      courseIndex: null,
      videoIndex: null,
      courseArray: [
        {
          value: 1,
          label: "第一节课",
          urlArray: [
            {
              value: 1,
              label: "第一个视频",
              url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            },
            {
              value: 2,
              label: "第二个视频",
              url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            },
          ],
        },
        {
          value: 2,
          label: "第二节课",
          urlArray: [
            {
              value: 1,
              label: "第一个视频",
              url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            },
            {
              value: 2,
              label: "第二个视频",
              url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            },
            {
              value: 3,
              label: "第三个视频",
              url: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            },
          ],
        },
      ],
      urlArray: [],
      fileList: [],
    };
  },
  mounted() {
    this.getCourseBasicInfo();
    // this.getCourseVideoUrlArray();
    // 切换tab位置
    this.tabPos = this.$route.params.coursePos;
    if (this.tabNames.indexOf(this.tabPos) == -1) {
      this.$router.push({
        path: "/course/" + this.$route.params.courseId + "/" + this.tabNames[0],
      });
      this.tabPos = this.tabNames[0];
    }
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
      console.log(temp.data);
    },

    async getCourseVideoUrlArray() {
      const temp = await CourseAPI.getCourseVideoUrlArray(1);
      console.log(temp.data);
    },

    getCourseIndex() {
      this.urlArray = this.courseArray[this.courseIndex - 1].urlArray;
    },
    getVideoIndex() {
      this.changeVideo();
    },
    changeVideo: function () {
      var e = document.getElementById("video-player");
      e.src = this.urlArray[this.videoIndex - 1].url;
      e.play();
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
      if (target.label == "圈子社区") {
        this.$alert(
          "该课程现在还未创建圈子社区，现在要创建圈子社区吗？",
          "创建圈子社区",
          {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `action: ${action}`,
              });
            },
          }
        );
      }
    },
  },
};
</script>

<style scoped>
#controlBlock {
  margin-top: 10px;
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

#university-card {
  height: 60px;
  background-color: #409eff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  /* margin-right: 10px; */
  border-radius: 0;
}

#course-and-teacher-card {
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0;
}

#down-part {
  /* margin-top: 5px;
  padding-top: 5px; */
  border-radius: 0;
}

#down_card {
  padding-bottom: 20px;
}

.center_title {
  font-size: 20px;
  text-align: center;
  margin-bottom: 10px;
}

#course-selector {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.video_select {
  width: 150px;
}

#course-selector-title {
  margin-left: 10%;
  color: #606266;
  font-size: 18px;
}

#video-title-part {
  color: #303133;
  font-size: 22px;
}

.left_tab {
  width: 9vw;
  text-align: center;
  font-size: 16px;
}
</style>

