<template>
  <div class="about">
    <el-container>
      <el-aside width="200px">课程信息</el-aside>
      <el-container>
        <el-header>
          <VideoSelector
            id="videoSelector"
            @sendValue1Event="getValue1"
            @sendValue2Event="getValue2"
          ></VideoSelector>
        </el-header>
        <el-main>
          <VideoPlayer id="videoPlayer"></VideoPlayer>
        </el-main>
        <el-footer>
          <button @click="changeVideo()"></button>
        </el-footer>
      </el-container>
    </el-container>
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
  methods: {
    changeVideo: function () {
      var e = document.getElementById("videoPlayer");
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  justify-content: center;
  align-items: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

#videoPlayer {
  width: 70%;
}
</style>

