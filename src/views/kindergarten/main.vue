<template>
  <div id="main">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
         <el-menu-item index="2" @click="handleClick('userLogin')">立即登录</el-menu-item>
          <el-menu-item index="3" @click="handleClick('apply')">申请入驻</el-menu-item>
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
        activeIndex: '1',
    };
  },
  methods: {
      handleClick(url){
          this.$router.push('/'+url)
      }
  },
};
</script>