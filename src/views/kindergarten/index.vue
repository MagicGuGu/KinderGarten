<template>
  <div class="home-container" id="app-contatiner">
    <!-- 顶部菜单 -->
    <div style="background: black"></div>
    <!-- 轮播图 -->
    <div style="background: grey"></div>

    <!-- 其他 -->
    <div class="container">
      <div class="info">
        <div class="info-left">
          <div class="info-left-title" />
          <div class="content">content left</div>
        </div>
        <div class="info-right">
          <div class="info-right-title" />
          <div class="content">content right</div>
        </div>
      </div>
      <div class="swiper">
        <div class="swiper-title" />
        <el-carousel
          height="300px"
          style="width: 60%; margin: 80px auto"
          arrow="always"
          indicator-position="outside"
        >
          <el-carousel-item v-for="(item, i) in swiperList" :key="i">
            <div class="schoolContainer">
              <el-image :src="item.image" />
              <div class="schoolContainer-info">
                <p class="schoolName">{{ item.schoolName }}</p>
                <p class="name">{{ item.name }}</p>
                <p class="addr">{{ item.addr }}</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="tel" />
    </div>

    <!-- 页脚 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperList: [
        {
          image: "",
          schoolName: "111",
          name: "xxxx",
          addr: "xxxxx-xxxxx",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.container {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 535px;

    .content {
      width: 246px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: 24% auto;
    }

    &-left {
      background-image: url("~@/assets/main_images/info-left-bg.png");
      height: 100%;
      background-repeat: no-repeat;
      background-size: 87% 87%;
      background-position: center;
      flex: 1;
      position: relative;

      &-title {
        background-image: url("~@/assets/main_images/info-left-title.png");
        height: 60px;
        width: 246px;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 16% auto;
      }
    }
    &-right {
      @extend .info-left;
      background-size: contain;
      background-image: url("~@/assets/main_images/info-right-bg.png");
      &-title {
        background-image: url("~@/assets/main_images/info-right-title.png");
        height: 60px;
        width: 202px;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 17% auto;
      }
      .content {
        width: 202px;
      }
    }
  }

  .swiper {
    height: 777px;
    background-image: url("~@/assets/main_images/swiper-bg.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    padding-top: 120px;

    &-title {
      background-image: url("~@/assets/main_images/swiper-title.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      height: 67px;
      margin: 0 auto;
    }
    .schoolContainer {
      padding: 0 10%;
      width: 100%;
      display: flex;
    }
  }
}
</style>
