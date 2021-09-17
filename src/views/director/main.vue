<template>
  <div>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" mode="horizontal">
          <el-menu-item index="1" @click="handleIndex">首页</el-menu-item>
          <el-menu-item index="2" @click="handleClick('personCenter')">{{ welcome }}</el-menu-item>
          <el-menu-item index="3" @click="handleExit">退出</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
      welcome: "欢迎园长",
    };
  },
  methods: {
    handleIndex() {
       this.$router.push("/director" );
    },
    handleClick(url) {
      this.$router.push("/" + url);
    },
    handleExit() {
       this.$router.push("/");
    },
  },
};
</script>