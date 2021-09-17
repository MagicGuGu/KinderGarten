<template>
  <div class="home-container">
    <!-- 顶部菜单 -->
    <div style="background: black;" />
    <!-- 轮播图 -->
    <div style="background: grey;" />

    <!-- 其他 -->
    <div class="container">
      <div class="info">
        <div class="info-left">
          <el-image :src="require('@/assets/main/info-left-title.png')" class="info-left-title" fit="contain" />
          <div class="content">content left</div>
        </div>
        <div class="info-right">
          <!-- <div class="info-right-title" /> -->
          <el-image :src="require('@/assets/main/info-right-title.png')" class="info-right-title" fit="contain" />
          <div class="content">content right</div>
        </div>
      </div>
      <div class="swiper">
        <!-- <div class="swiper-title" /> -->
        <el-image :src="require('@/assets/main/swipeTtitle.png')" fit="contain" class="swiper-title" />
        <div class="container">
          <el-button circle class="prev-btn" icon="el-icon-back" @click="prev" />
          <div>
            <el-input v-model="schoolName" placeholder="请输入幼儿园名称" @change="handleSchoolSearch" />
            <swiper ref="mySwiper" class="my-swiper" :options="swiperOptions">
              <swiper-slide v-for="(item, i) in swiperList" :key="i">
                <div class="schoolContainer">
                  <el-image class="school-image" :preview-src-list="[item.image]" lazy fit="contain" />
                  <div class="schoolContainer-info">
                    <p class="schoolName">{{ item.schoolName }}</p>
                    <p class="name">{{ item.name }}</p>
                    <p class="addr">{{ item.addr }}</p>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <el-button circle class="next-btn" icon="el-icon-right" @click="next" />
        </div>
        <el-image class="hourse" :src="require('@/assets/main/hourse.png')" fit="contain" @click="handleRedirect" />
      </div>
      <div class="tel" />
    </div>

    <!-- 页脚 -->
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      swiperList: [
        {
          image: require('@/assets/main/gugu.png'),
          schoolName: '111',
          name: 'xxxx',
          addr: 'xxxxx-xxxxx'
        },
        {
          image: require('@/assets/main/gugu.png'),
          schoolName: '222',
          name: 'xxxx',
          addr: 'xxxxx-xxxxx'
        },
        {
          image: require('@/assets/main/gugu.png'),
          schoolName: '333',
          name: 'xxxx',
          addr: 'xxxxx-xxxxx'
        }
      ],
      swiperOptions: {
        autoplay: false,
        loop: true,
        simulateTouch: false,
        resizeObserver: true
        // Some Swiper option/callback...
      },
      schoolName: ''
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {},
  methods: {
    handleSchoolSearch() {
      const i = this.swiperList.findIndex(item => item.schoolName === this.schoolName)
      i !== -1 && this.swiper.slideTo(i + 1)
    },
    prev() {
      this.swiper.slidePrev()
    },
    next() {
      this.swiper.slideNext()
    },
    handleRedirect() {}
  }
}
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
      height: 230px;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      margin: 0 auto;
      margin-top: calc(60px + 88px);
    }

    &-left {
      background-image: url('~@/assets/main/info-left-bg.png');
      height: 100%;
      background-repeat: no-repeat;
      background-size: 87% 87%;
      background-position: center;
      flex: 1;
      position: relative;

      &-title {
        // background-image: url('~@/assets/main/info-left-title.png');
        height: 60px;
        width: 40%;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 88px auto;
      }
    }
    &-right {
      @extend .info-left;
      background-size: contain;
      background-image: url('~@/assets/main/info-right-bg.png');
      &-title {
        // background-image: url('~@/assets/main/info-right-title.png');
        height: 60px;
        width: 40%;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: 136px auto;
      }
      .content {
        width: 202px;
        height: 200px;
        margin-top: calc(60px + 136px);
      }
    }
  }

  .swiper {
    height: 500px;
    background-image: url('~@/assets/main/border.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    margin: 146px 8vw 0 8vw;
    position: relative;

    .container {
      width:80%;
      margin: 0 auto;
      margin-top: 36px;
      display: flex;
      align-items: center;
      justify-content: center;

      & > div {
        width: 100%;
        flex: 1;
        text-align: center;
      }
      .el-input {
        width: 80%;
      }
    }

    &-title {
      height: 128px;
      margin-top: -64px;
      width: 100%;
    }
    .my-swiper {
      height: 260px;
      padding: 1rem;

      .swiper-slide {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .swiper-pagination {
        width: 100%;
        text-align: center;
      }
    }
    .schoolContainer {
      padding: 0 10%;
      width: 100%;
      text-align: center;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;

      .school-image {
        width: 240px;
        height: 240px;
        margin-right: 24px;
      }
      &-info {
        display: inline-block;

        .schoolName {
          margin-bottom: 64px;
        }
      }
    }

    .hourse {
      cursor: pointer;
      position: absolute;
      right: 80px;
      height: 144px;
    }
  }
}
</style>
