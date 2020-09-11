<template>
  <div class="course">
    <Navigator active-func="home"></Navigator>
    <el-row type="flex" style="padding-top: 70px;">
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
          >{{courseName}}</el-link>

          <el-link
            type="success"
            :underline="false"
            style="font-size: 16px; margin-left: 15px;"
          >{{courseTeacher}}</el-link>
        </el-card>
      </el-col>
    </el-row>

    <el-row id="down-part">
      <el-col>
        <el-card>
          <el-tabs tab-position="left" style="width: 100%;" @tab-click="clickCommunity">
            <el-tab-pane>
              <div class="left_tab" slot="label">课程信息</div>
              <el-row>
                <el-col style="font-size: 22px;">课程信息</el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8" :offset="3">
                  <el-card
                    style="height: 600px; margin-top: 10px; color: #909399; font-size: 18px;"
                  >
                    <el-row style="margin-bottom: 20px; color: #303133; font-size: 20px;">课程简介</el-row>
                    <el-row>{{courseDescription}}</el-row>
                  </el-card>
                </el-col>

                <el-col :span="8" :offset="2">
                  <el-card
                    style="height: 45%; margin-top: 10px; color: #909399; font-size: 18px; display: flex; justify-content: center; align-items: center;"
                  >
                    <el-row style="margin-bottom: 30px; color: #303133; font-size: 20px;">人员导入</el-row>

                    <el-row>
                      <el-upload
                        class="upload-demo"
                        action
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                      >
                        <el-button type="primary" icon="el-icon-upload2" circle></el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx/csv文件，且不超过500kb</div>
                      </el-upload>
                    </el-row>
                  </el-card>

                  <el-card
                    style="height: 45%; margin-top: 10%; color: #909399; font-size: 18px; display: flex; justify-content: center; align-items: center;"
                  >
                    <el-row style="margin-bottom: 30px; color: #303133; font-size: 20px;">视频上传</el-row>

                    <el-row>
                      <el-upload
                        class="upload-demo"
                        action
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                      >
                        <el-button type="primary" icon="el-icon-upload2" circle></el-button>
                        <div slot="tip" class="el-upload__tip">只能上传xls/xlsx/csv文件，且不超过500kb</div>
                      </el-upload>
                    </el-row>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="视频课程">
              <div class="left_tab" slot="label">视频资源</div>
              <el-row>
                <el-col style="font-size: 22px;">视频资源</el-col>
              </el-row>
              <el-row>
                <el-card style="margin-top: 10px;">
                  <el-row id="course-selector">
                    <span id="course-selector-title">请选择章节：</span>

                    <div style="margin-left: 14%">
                      <el-select v-model="courseIndex" placeholder="请选择" @change="getCourseIndex">
                        <el-option
                          v-for="item in courseArray"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>

                      <el-select
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
                  <el-row style="margin-top: 20px;">
                    <span id="video-title-part">{{videoTitle}}</span>
                  </el-row>
                  <el-row>
                    <VideoPlayer style=" margin-top: 20px; width: 80%; border-radius: 5px;"></VideoPlayer>
                  </el-row>
                </el-card>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="圈子社区">
              <div class="left_tab" slot="label">圈子社区</div>
              <el-row>
                <el-col style="font-size: 22px;">圈子社区</el-col>
              </el-row>
              <el-row>
                <el-card
                  style="height: 500px; margin-top: 10px; color: #909399; font-size: 18px;"
                >{{courseDescription}}</el-card>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import Navigator from "@/components/Navigator";
export default {
  name: "Course",
  components: {
    VideoPlayer,
    Navigator,
  },
  data() {
    return {
      university_logo_url: require("@/assets/BUAA.png"),
      courseName: "Operating System",
      courseTeacher: "Yuan Cangzhou",
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
    this.getCourseInfo();
  },
  methods: {
    getCourseInfo() {

      
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
.course {
  text-align: center;
}

#university-card {
  height: 60px;
  background-color: #409eff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-right: 10px;
}

#course-and-teacher-card {
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

#down-part {
  margin-top: 5px;
  padding-top: 5px;
}

#course-selector {
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  width: 10vw;
  text-align: center;
  font-size: 18px;
}
</style>

