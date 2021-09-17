<template>
  <div class="teacherInfo">
    <div class="back" style="width: 70%">
      <div class="main" style="width: 100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input
              v-model="form.teacherName"
              placeholder="请输入教师名称"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="search"
              >搜索</el-button
            >
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="clearAll"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
        <el-card class="box-card" style="height: calc(100% - 62.8px)">
          <div slot="header" class="clearfix">
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="showBulkImportPanel"
              >批量导入</el-button
            >
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="showAddTeacherPanel"
              >新增</el-button
            >
          </div>
          <docm-table :datas="tableData" style="width: 100%" />
          <div class="block">
            <el-pagination
              layout="prev,pager,next"
              :current-page="currPage"
              :page-size="limit"
              :total="total"
              @current-change="changeCurrPage"
              @prev-click="lastPage"
              @next-click="nextPage"
            />
          </div>
        </el-card>
      </div>
    </div>
    <!-- 批量导入 -->
    <el-dialog title="批量导入" :visible.sync="bulkImportPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="sureBulkImport"
            >导入</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideBulkImportPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 新增教师面板 -->
    <el-dialog title="新增教师" :visible.sync="addTeacherPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="addUserName"
            placeholder="请输入教师名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addUserEmail"
            placeholder="请输入教师邮箱"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addAvtar"
            placeholder="请输入教师名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addUserTel"
            placeholder="请输入教师电话"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addWorkNum"
            placeholder="请输入教师工号"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addHomeAddress"
            placeholder="请输入教师地址"
            clearable
            style="width: 100%; margin-top: 10px"
          />

          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="sureAddTeacher"
            >新增</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideAddTeacherPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改面板 -->
    <el-dialog title="修改教师信息" :visible.sync="changeTeacherPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="changeUserName"
            placeholder="请输入教师名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeUserEmail"
            placeholder="请输入教师邮箱"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeAvtar"
            placeholder="请输入教师头像"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeUserTel"
            placeholder="请输入教师电话"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeWorkNum"
            placeholder="请输入教师工号"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeHomeAddress"
            placeholder="请输入教师地址"
            clearable
            style="width: 100%; margin-top: 10px"
          />

          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="suerChangeTeacher"
            >修改</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideChangeTeacherPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import util from "@/utils/Utils";
import {
  selectTeacherInfo,
  editTeacherInfo,
  delTeacherInfo,
  addTeacherInfo,
} from "@/api/TeacherManageApi";
import DocmTable from "@/components/table/DocmTable.vue";
export default {
  name: "FoodInfo",
  components: { DocmTable },
  data: function () {
    return {
      roleList: null,

      form: {
        teacherName: "",
      },
      // 控制弹出面板
      bulkImportPanel: false,
      addTeacherPanel: false,
      changeTeacherPanel: false,

      // 新增面板的数据
      addUserName: "",
      addUserEmail: "",
      addUserTel: "",
      addWorkNum: "",
      addHomeAddress: "",

      // 修改对话框得下拉框数据
      changeUserName: "",
      changeUserEmail: "",
      changeUserTel: "",
      changeWorkNum: "",
      changeHomeAddress: "",

      tableData: {
        theads: [
          { name: "教师工号", key: "workNum" },
          { name: "教师名称", key: "userName" },
          { name: "教师头像", key: "avtar" },
          { name: "教师电话", key: "userTel" },
          { name: "教师邮箱", key: "userEmail" },
          { name: "教师地址", key: "homeAddress" },
        ],
        datas: [],
        btns: [
          {
            id: 1,
            name: "修改",
            type: "primary",
            handle: "showChangeTeacherPanel",
          },
          {
            id: 2,
            name: "删除",
            type: "waring",
            handle: "handleDel",
          },
        ],
      },
      start: 0,
      limit: 5,
      currPage: 1,
      allPage: 1,
      total: 0,
      moveShow: false,
      mainShow: true,
      moveObj: null,
      deleteSign: false,
    };
  },
  created() {
    // this.search()
  },
  methods: {
    // 搜索方法
    // 搜索
    search() {
      selectTeacherInfo({
        teacherName: this.form.teacherName,
        start: this.start,
        limit: this.limit,
      }).then((resp) => {
        if (resp.id === 200) {
          this.initData(resp.datas.teacherList);
          this.total = resp.datas.num;
        }
      });
    },
    // 处理数据
    initData(obj) {
      for (const i of obj) {
        this.tableData.datas.push(i);
      }
    },
    // 批量导入方法
    // showBulkImportPanel() {},
    // sureBulkImport() {},
    // hideBulkImportPanel() {},
    // 新增教师方法
    showAddTeacherPanel() {
      this.addTeacherPanel = true;
    },
    sureAddTeacher() {
      addTeacherInfo({
        userName: this.addUserName,
        userEmail: this.addUserEmail,
        userTel: this.addUserTel,
        workNum: this.addWorkNum,
        homeAddress: this.addHomeAddress,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "增加成功",
            type: "success",
          });
          this.babyAddShowPanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("增加失败");
        }
      });
    },
    hideAddTeacherPanel() {
      this.addTeacherPanel = false;
    },
    // 修改教师方法
    showChangeTeacherPanel() {
      this.changeTeacherPanel = true;
    },
    suerChangeTeacher() {
      editTeacherInfo({
        userName: this.changeUserName,
        userEmail: this.changeUserEmail,
        userTel: this.changeUserTel,
        workNum: this.changeWorkNum,
        homeAddress: this.changeHomeAddress,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.changeTeacherPanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    hideChangeTeacherPanel() {
      this.changeTeacherPanel = false;
    },
    handleDel(obj) {
      delTeacherInfo({
        teacherId: obj.teacherId,
      }).then((resp) => {
        if (resp.id === 200) {
          this.start = 0;
          this.currPage = 1;
          this.search();
        }
      });
    },
    // 当前页翻页
    changeCurrPage(page) {
      this.start = (page - 1) * this.limit;
      this.search();
    },
    // 上一页
    lastPage() {
      this.currPage--;
      this.start -= this.limit;
      this.search();
    },
    // 下一页
    nextPage() {
      this.currPage++;
      this.start += this.limit;
      this.search();
    },
    // 重置
    clearAll() {
      this.form.foodName = "";
      this.form.foodTypeSelect = "";
      this.search();
    },
    formatterRoleName(row, column, cellValue, index) {
      return util.valueFormat(cellValue, this.roleList, {
        labelKey: "roleId",
        valueKey: "roleName",
      });
    },
    formatterState(row, column, cellValue, index) {
      return util.findStateName("state", cellValue);
    },
    formatterCtime(row, column, cellValue, index) {
      return util.formatTime(cellValue);
    },
  },
};
</script>
<style scoped lang="scss">
.teacherInfo {
  background: url("~@/assets/mgr_images/teacherBackground.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.back {
  background: url("~@/assets/mgr_images/背景框.png");
  background-repeat: no-repeat;
  background-size: 100% 76%;
  background-position: center 64%;
  height: 702px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  margin: auto;
  padding-top: 21vh;
}

/* 主区域 */
.main {
  padding: 0 60px;
  height: calc(100% - 15vh);
}

.title {
  width: 100%;
  height: 20%;
}
.mylayout {
  width: 100%;
  height: 100%;
}
.myTable {
  width: 80%;
}
.el-upload__tip {
  line-height: 1.2;
}
.block {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
