<template>
  <div class="courseInfo">
    <div class="back" style="width: 70%">
      <div class="main" style="width: 100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input
              v-model="form.courseName"
              placeholder="请输入查询课程名称"
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
              @click="showAddCoursePanel"
              >新增</el-button
            >
          </div>
          <docm-table :datas="tableData" style="width: 100%" />
          <div class="block">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="currPage"
              :total="count"
              :page-size="limit"
              :page-count="allPage"
              @prev-click="prevPage"
              @next-click="nextPage"
              @current-change="changePage"
              style="margin-top: 10px"
            ></el-pagination>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 批量导入 -->
    <el-dialog title="批量导入-课程信息" :visible.sync="bulkImportPanel">
      <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        style="margin-top: 10px"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="bulkImportPanel = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 新增课程面板 -->
    <el-dialog title="新增课程" :visible.sync="addCoursePanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="addCourseName"
            placeholder="请输入课程名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="sureAddCourse"
            >新增</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideAddCoursePanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改课程面板 -->
    <el-dialog title="修改课程信息" :visible.sync="changeCoursePanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="changeCourseName"
            placeholder="请输入课程名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="suerChangeCourse"
            >修改</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideChangeCoursePanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
// import util from "@/utils/Utils";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import DocmTable from "@/components/table/DocmTable.vue";
import util from "@/utils/Utils";
import {
  initCourse,
  addCourse,
  addCourses,
  updateCourse,
  deleteCourse,
} from "@/api/CourseManageApi";
export default {
  name: "courseManage",
  components: { UploadExcelComponent, DocmTable },
  data: function () {
    return {
      roleList: null,
      form: {
        courseName: "",
      },
      // 控制弹出面板
      bulkImportPanel: false,
      addCoursePanel: false,
      changeCoursePanel: false,

      // 新增面板
      addCourseName: "",

      // 修改面板
      changeCourseName: "",
      batchData: null,
      tableData: {
        theads: [
          { name: "课程名称", key: "courseName" },
          { name: "状态", key: "statusLabel" },
        ],
        datas: [],
        btns: [
          {
            id: 1,
            name: "修改",
            type: "primary",
            handle: "handleEdit",
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
      limit: 3,
      currPage: 1,
      allPage: 1,
      count: 0,
      total: 0,
      moveShow: false,
      mainShow: true,
      moveObj: null,
      deleteSign: false,
    };
  },
  created() {
    this.search();
  },
  methods: {
    // 搜索方法
    search() {
      let that = this;
      initCourse({
        courseName: this.form.courseName,
        start: this.start,
        limit: this.limit,
      }).then((resp) => {
        if (resp.code === 200) {
          let data = resp.tokenMap.courseList;
          that.tableData.datas = [];
          that.count = resp.tokenMap.count;
          that.allPage =
            that.count % that.limit === 0
              ? that.count / that.limit
              : parseInt(that.count / that.limit) + 1;
          if (that.allPage == 0) {
            that.allPage = 1;
          }
          for (let i of data) {
            i.statusLabel = util.findStateName("status", i.courseStatus);
            that.tableData.datas.push(i);
          }
        }
      });
    },
    changePage: function (pageStart) {
      this.currPage = pageStart;
      this.start = (this.currPage - 1) * this.limit;
      this.search();
    },
    // 批量导入方法
    showBulkImportPanel() {
      this.bulkImportPanel = true;
    },
    beforeUpload() {
      return true;
    },
    handleSuccess(excel) {
      this.batchData = excel.results;
      addCourses({
        batchData: this.batchData,
      }).then((resp) => {
        if (resp.code == 200) {
          this.$message({
            message: resp.message,
            type: "success",
          });
          this.search();
        }
      });
    },
    hideBulkImportPanel() {
      this.bulkImportPanel = false;
    },

    // 新增课程方法
    showAddCoursePanel() {
      this.addCoursePanel = true;
    },
    sureAddCourse() {
      addCourse({
        courseName: this.addCourseName,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "增加成功",
            type: "success",
          });
          this.addCoursePanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("增加失败");
        }
      });
    },
    hideAddCoursePanel() {
      this.addCoursePanel = false;
    },

    // 修改课程方法
    showChangeCoursePanel() {
      this.ChangeCoursePanel = true;
    },
    suerChangeCourse() {
      updateCourse({
        courseName: this.changeCourseName,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.changeCoursePanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    hideChangeCoursePanel() {
      this.changeCoursePanel = false;
    },

    // 当前页翻页
    changePage(page) {
      this.start = (page - 1) * this.limit;
      this.search();
    },
    // 上一页
    prevPage() {
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
      (this.form.courseName = ""), this.search();
    },
  },
};
</script>
<style scoped lang="scss">
.courseInfo {
  background: url("~@/assets/mgr_images/courseBackground.png");
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
