<template>
  <div id="main">
    <el-container>
      <el-container class="panel">
        <div class="panel2">
          <div class="panel3">
            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="3">
                <span>账号：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  class="field"
                  placeholder="请输入账号"
                  v-model="loginEmail"
                  clearable
                ></el-input>
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="3">
                <span>密码：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  class="field"
                  placeholder="请输入密码"
                  v-model="password"
                  show-password
                ></el-input>
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="3">
                <span>验证码：</span>
              </el-col>
              <el-col :span="4">
                <el-input
                  class="field"
                  placeholder="请输入验证码"
                  v-model="code"
                  clearable
                ></el-input>
              </el-col>
              <el-col :span="4">
                <div class="field">
                  <el-image
                    style="width: 95%; height: 40px; margin-top: 3px"
                    :src="codeUrl"
                    @click="changeCode"
                  ></el-image>
                </div>
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="8" :offset="3">
                <el-button class="field btn" type="primary" @click="doLogin"
                  >登录</el-button
                >
              </el-col>
            </el-row>
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { userLogin } from "@/api/UserLoginApi";
export default {
  name: "directorLogin",
  components: {},
  data: function () {
    return {
      loginEmail: "",
      password: "",
      code: "",
      codeUrl: process.env.VUE_APP_BASE_USER_URL + "captcha",
    };
  },
  methods: {
    doLogin: function () {
      userLogin({
        loginEmail: this.loginEmail,
        password: this.password,
        code: this.code,
      })
        // 成功
        .then((resp) => {
          if (resp.code === 200) {
            this.$router.push(resp.tokenMap.location);
          }
        });
    },
    changeCode() {
      this.codeUrl = this.codeUrl + "?" + Math.random();
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  margin-top: 5px;
}
.btn {
  width: 100%;
}
.panel {
  background-image: url(~@/assets/login_images/breakground.png);
  background-repeat: "no-repeat";
  background-size: 100% 100%;
  text-align: center;

  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.panel2 {
  background-image: url(~@/assets/login_images/breakground2.png);
  background-repeat: "no-repeat";
  background-size: 100% 100%;
  text-align: center;
  width: 60%;
  height: 90%;
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
}

#title {
  width: 350px;
  height: 80px;
}

.panel3 {
  width: 100%;
}

.panel3 span {
  font-size: 20px;
}
el-button {
  margin-left: 50px;
}
</style>


