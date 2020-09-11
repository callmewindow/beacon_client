<template>
  <div class="about">
    <el-row type="flex" :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4">
        <el-card id="university-card">
          <div>大学名称</div>
        </el-card>
      </el-col>

      <el-col :xs="20" :sm="20" :md="20" :lg="20">
        <el-card id="course-and-teacher-card">
          <el-row :gutter="10">
            <el-col
              style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;"
            >
              <el-link target="_blank" style="padding: 5px 5px; font-size: 24px;">{{course_name}}</el-link>
              <el-link type="success" style="padding: 5px 5px; font-size: 18px;">{{course_teachers}}</el-link>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row id="down-part" :gutter="10">
      <el-col>
        <el-card>
          <el-tabs tab-position="left" style="width: 100%;">
            <el-tab-pane label="课程简介">
              <el-row>
                <el-col style="font-size: 22px;">课程简介</el-col>
              </el-row>
              <el-row>
                <el-card
                  style="margin-top: 10px; color: #909399; font-size: 18px;"
                >{{course_description}}</el-card>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="教师简介">
              <el-row>
                <el-col style="font-size: 22px;">教师简介</el-col>
              </el-row>
              <el-row>
                <el-card
                  style="margin-top: 10px; color: #909399; font-size: 18px;"
                >{{course_description}}</el-card>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="视频课程">
              <el-row>
                <el-col style="font-size: 22px;">视频课程</el-col>
              </el-row>
              <el-row>
                <el-card style="margin-top: 10px;">
                  <el-row id="course-selector">
                    <span id="course-selector-title">请选择章节：</span>
                    <VideoSelector
                      style="margin-left: 185px;"
                      @sendValue1Event="getValue1"
                      @sendValue2Event="getValue2"
                    ></VideoSelector>
                  </el-row>
                  <el-row style="margin-top: 20px;">
                    <span id="video-title-part">{{video_title}}</span>
                  </el-row>
                  <el-row>
                    <VideoPlayer style=" margin-top: 20px; width: 80%; border-radius: 5px;"></VideoPlayer>
                  </el-row>

                  <el-row>
                    <button @click="changeVideo()"></button>
                  </el-row>
                </el-card>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="圈子社区">
              <el-row>
                <el-col style="font-size: 22px;">圈子社区</el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>





<script>
import VideoSelector from "@/components/VideoSelector";
import VideoPlayer from "@/components/VideoPlayer";
export default {
  name: "Vedio",
  components: {
    VideoSelector,
    VideoPlayer,
  },
  data() {
    return {
      university_logo_url: require("@/assets/BUAA.png"),
      course_name: "Operating System",
      course_teachers: "Yuan Cangzhou",
      course_description: "很玄学，很魔幻",
      video_title: "8 0 3 8 6",
    };
  },
  methods: {
    changeVideo: function () {
      var e = document.getElementById("video-player");
      e.src = "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4";
    },
    getValue1(data) {
      console.log(data);
    },
    getValue2(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped>
#up-part {
  height: 70px;
}

#university-card {
  width: 100%;
  height: 90px;
  background-color: #409eff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}

#course-and-teacher-card {
  width: 100%;
  height: 90px;
}

#course-description {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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
  margin-left: 130px;
  color: #606266;
  font-size: 18px;
}

#video-title-part {
  color: #303133;
  font-size: 22px;
}
</style>

