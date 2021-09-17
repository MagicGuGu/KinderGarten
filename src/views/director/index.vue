<template>
  <div id="directorMain">
    <el-row :gutter="1" type="flex">
      <el-col :span="6" :offset="4">
        <div class="div-btn" @click="handleClick('gardenEdit')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-texts">
            <span>编辑园所页面</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="div-btn" @click="handleClick('babyMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-text">
            <span>宝宝管理</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="1" type="flex">
      <el-col :span="6" :offset="2">
        <div class="div-btn" @click="handleClick('foodMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-text">
            <span>膳食管理</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="1">
        <div class="div-btn" @click="handleClick('safeEduMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-texts">
            <span>安全教育管理</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="3">
        <div class="div-btn" @click="handleClick('classMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-text">
            <span>班级管理</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="1" type="flex">
      <el-col :span="6" :offset="6">
        <div class="div-btn" @click="handleClick('classroomMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-text">
            <span>教室管理</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="2">
        <div class="div-btn" @click="handleClick('teacherMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-text">
            <span>教师管理</span>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="1" type="flex">
      <el-col :span="6" :offset="10">
        <div class="div-btn">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-texts">
            <span>课程表管理</span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" :offset="3">
        <div class="div-btn" @click="handleClick('courseMgr')">
          <div class="div-img">
            <img
              class="option"
              src="~@/assets/kindergarten_main_images/cloud_background.png"
              alt=""
            />
          </div>
          <div class="div-text">
            <span>课程管理</span>
          </div>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script>
export default {
  name: "directorMain",
  mounted() {},
  data: function () {
    return {};
  },
  methods: {
    handleCourse() {
      console.log("gugu");
    },
    handleGardEdit(){
      this.$router.push("/gardenEdit")
    },
    handleClick(url){
       this.$router.push("/"+url);
    }
  },
};
</script>
<style lang="scss" scoped>
#directorMain {
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/kindergarten_main_images/background.png);
  background-size: cover; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
  position: absolute; /* 不可缺少 */
  // overflow: hidden;
  // overflow: auto;
  // z-index: -1;
  background-repeat: no-repeat;
}
.div-btn {
  position: relative;
  cursor: pointer;
}
.div-img {
  width: 325px;
  height: 150px;
}
.div-text {
  position: absolute;
  left: 60px;
  top: 70px;
  font-size: 20px;
}
.div-texts{
  position: absolute;
  left: 40px;
  top: 70px;
    font-size: 20px;
}
.option {
  width: 60%;
  height: 80%;
}
</style>
