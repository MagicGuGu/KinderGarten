<template>
  <div class="home-container">
    <!-- 顶部菜单 -->
    <div style="background: black;" />
    <!-- 轮播图 -->
    <div class="slidesShowDiv">
      <el-col :span="24">
        <div class="block">
          <el-carousel trigger="click" height="400px">
            <el-carousel-item v-for="item in imgList" :key="item.id">
              <img :src="item.idView" class="image" style="width: 100%;height: 100%;">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </div>

    <!-- 入驻结果+平台简介 -->
    <div class="container">
      <div class="info">
        <div class="info-left">
          <el-image :src="require('@/assets/main_images/info-left-title.png')" class="info-left-title" fit="contain" />
          <div class="content">content left</div>
        </div>
        <div class="info-right">
          <!-- <div class="info-right-title" /> -->
          <el-image :src="require('@/assets/main_images/info-right-title.png')" class="info-right-title" fit="contain" />
          <div class="content">content right</div>
        </div>
      </div>
      <!-- 已入驻幼儿园 -->
      <div class="swiper">
        <!-- <div class="swiper-title" /> -->
        <el-image :src="require('@/assets/main_images/swipeTtitle.png')" fit="contain" class="swiper-title" />
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
                    <p class="name">{{ item.directorName }}</p>
                    <p class="addr">{{ item.addr }}</p>
                  </div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
          <el-button circle class="next-btn" icon="el-icon-right" @click="next" />
        </div>
        <el-image class="hourse" :src="require('@/assets/main_images/hourse.png')" fit="contain" @click="handleRedirect" />
      </div>
      <div class="tel" />
    </div>
    <!-- 间隔div -->
    <div style="width: 100%;height: 50px" />
    <!-- 底部信息栏 -->
    <div class="bottomInformationDiv" />
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      imgList: [
        { id: 0, idView: require('@/assets/main_images/轮播1.png') },
        { id: 1, idView: require('@/assets/main_images/轮播2.png') },
        { id: 2, idView: require('@/assets/main_images/轮播3.png') }],
      swiperList: [
        {
          image: 'http://E:\img\gugu.png',
          schoolName: '111',
          directorName: 'xxxx',
          addr: 'xxxxx-xxxxx'
        },
        {
          image: require('@/assets/main_images/gugu.png'),
          schoolName: '222',
          directorName: 'xxxx',
          addr: 'xxxxx-xxxxx'
        },
        {
          image: require('@/assets/main_images/gugu.png'),
          schoolName: '333',
          directorName: 'xxxx',
          addr: 'xxxxx-xxxxx'
        }
      ],
        // {
        // image: require('@/assets/main_images/gugu.png'),
        //   schoolName: '111',
        //   directorName: 'xxxx',
        //   addr: 'xxxxx-xxxxx'
        // },
        // {
        //   image: require('@/assets/main_images/gugu.png'),
        //   schoolName: '222',
        //   directorName: 'xxxx',
        //   addr: 'xxxxx-xxxxx'
        // },
        // {
        //   image: require('@/assets/main_images/gugu.png'),
        //   schoolName: '333',
        //   directorName: 'xxxx',
        //   addr: 'xxxxx-xxxxx'
        // } 
      swiperOptions: {
        autoplay: false,
        loop: true,
        simulateTouch: false,
        resizeObserver: true
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
    handleRedirect() {
      this.$router.push("/apply")
    }
  }
}
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.slidesShowDiv{
  width: 100%;
  height: 400px;
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
      background-image: url('~@/assets/main_images/info-left-bg.png');
      height: 100%;
      background-repeat: no-repeat;
      background-size: 87% 87%;
      background-position: center;
      flex: 1;
      position: relative;

      &-title {
        // background-image: url('~@/assets/platform_home_page/info-left-title.png');
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
      background-image: url('~@/assets/main_images/info-right-bg.png');
      &-title {
        // background-image: url('~@/assets/platform_home_page/info-right-title.png');
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
    background-image: url('~@/assets/main_images/border.png');
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

.bottomInformationDiv{
    width: 100%;
    height: 350px;

    background: url('~@/assets/main_images/bottomInformation_background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
}
</style>
