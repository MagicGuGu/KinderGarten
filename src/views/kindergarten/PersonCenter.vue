<template>
  <div id="main">
    <el-container>
      <el-container class="panel">
        <div class="panel2">
          <div class="btn-panel">
            <el-button size="medium" @click="userInfo">个人信息</el-button>
            <el-button size="medium" @click="editPassword">修改密码</el-button>
          </div>
          <!-- 园长信息 -->
          <div v-show="userVisible" class="panel3">
            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="4">
                <span>园长名称：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="userName"
                  class="field"
                  :disabled="true"
                  clearable
                />
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="4">
                <span>联系电话：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="userPhone"
                  class="field"
                  :disabled="true"
                  clearable
                />
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="4">
                <span>邮箱：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="userEmail"
                  class="field"
                  :disabled="true"
                  clearable
                />
              </el-col>
            </el-row>
          </div>
          <!-- 修改密码 -->
          <div v-show="editPasswordVisible" class="panel4">
            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="4">
                <span>旧密码：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="userPwd"
                  class="field"
                  placeholder="请输入旧密码"
                  show-password
                />
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="4">
                <span>新密码：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="userNewPwd"
                  class="field"
                  placeholder="请输入新密码"
                  show-password
                />
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="4">
                <span>确认密码：</span>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="userTwoPwd"
                  class="field"
                  placeholder="请输入新密码"
                  show-password
                />
              </el-col>
            </el-row>

            <el-row
              type="flex"
              class="row-bg mylayout"
              justify="center"
              align="middle"
            >
              <el-col :span="8" :offset="4">
                <el-button class="field btn" type="primary" @click="save"
                  >保存</el-button
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
import { updatePassword, getUserInfo } from "@/api/PersonCenterApi";

export default {
  name: "UserLogin",
  components: {},
  data: function () {
    return {
      userId: "",
      userName: "",
      userPhone: "",
      userEmail: "",
      userPwd: "",
      userNewPwd: "",
      userTwoPwd2: "",

      userData: null,
      userVisible: true,
      editPasswordVisible: false,
    };
  },
  created() {},
  methods: {
    init() {
      getUserInfo().then((resp) => {
        if (resp.id === 200) {
          this.userData = resp.datas.userInfo;
          this.userId = this.userData.userId;
          this.userName = this.userData.userName;
          this.userPhone = this.userData.userPhone;
          this.userEmail = this.userData.userEmail;
          this.userPwd = this.userData.userPwd;
        }
      });
    },
    save() {
      updatePassword({
        userId: this.userId,
        password: this.userNewPwd,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    editPassword() {
      this.userVisible = false;
      this.editPasswordVisible = true;
    },
    userInfo() {
      this.editPasswordVisible = false;
      this.userVisible = true;
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
  background-image: url(~@/assets/main_images/personBackground.png);
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
  background-image: url(~@/assets/main_images/personInfoBackground.png);
  background-repeat: "no-repeat";
  background-size: 100% 100%;
  width: 70%;
  height: 90%;
  position: absolute;

  // display: flex;
  // justify-content: center;
  // align-items:center;
}

#title {
  width: 350px;
  height: 80px;
}

.btn-panel {
  margin-top: 10%;
  margin-left: 43%;
}

.panel3 {
  margin-left: 25%;
  margin-top: 5%;
  width: 80%;
}

.panel4 {
  margin-left: 25%;
  margin-top: 5%;
  width: 80%;
}

.panel3 span {
  font-size: 15px;
}
</style>

