<template>
  <div class="classroomInfo">
    <div class="back" style="width: 70%">
      <div class="main" style="width: 100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input
              v-model="form.classroomName"
              placeholder="请输入查询教室名称"
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
              @click="showAddClassroomPanel"
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
    <el-dialog title="批量导入" :visible.sync="bulkImportPanel">
      <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        style="margin-top: 10px"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="bulkImportPanel = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 新增教室面板 -->
    <el-dialog title="新增教室" :visible.sync="addClassroomPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="addClassroomNum"
            placeholder="请输入教室号"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addClassroomName"
            placeholder="请输入教室名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="addClassroomArea"
            placeholder="请输入教室面积"
            clearable
            style="width: 100%; margin-top: 10px"
          />

          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="addClassRoomImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将教室图片拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="sureAddClassroom"
            >新增</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideAddClassroomPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改教室面板 -->
    <el-dialog title="修改教室信息" :visible.sync="changeClassroomPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="changeClassroomNum"
            placeholder="请输入教室号"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeClassroomName"
            placeholder="请输入教室名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-input
            v-model="changeClassroomArea"
            placeholder="请输入教室面积"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="editClassRoomImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将教室图片拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="suerChangeClassroom"
            >修改</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideChangeClassroomPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
// import util from '@/utils/Utils'
// deleteClassroom   uploadClassRoomImg
import {
  initClassroom,
  addClassroom,
  updateClassroom,
  uploadClassRoomImg,
  addClassrooms,
} from "@/api/ClassroomManageApi";
import DocmTable from "@/components/table/DocmTable.vue";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import util from "@/utils/Utils";
export default {
  name: "ClassroomManage",
  components: { DocmTable, UploadExcelComponent },
  data: function () {
    return {
      roleList: null,

      form: {
        classroomName: "",
      },
      // 图片上传
      imgUpload: {
        list: [],
        action: process.env.VUE_APP_BASE_URL + "doUploadImg",
      },
      // 控制弹出面板
      bulkImportPanel: false,
      addClassroomPanel: false,
      changeClassroomPanel: false,
      // 新增面板
      addClassroomNum: "",
      addClassroomName: "",
      addClassroomImg: "",
      addClassroomArea: "",
      addClassroomMd5: "",

      // 修改面板
      changeClassroomNum: "",
      changeClassroomName: "",
      changeClassroomImg: "",
      changeClassroomArea: "",
      changeClassroomMd5: "",

      tableData: {
        theads: [
          { name: "教室号", key: "classroomNum" },
          { name: "教室名称", key: "classroomName" },
          { name: "教室图片", key: "classroomImg" },
          { name: "教室面积", key: "classroomArea" },
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
      limit: 5,
      currPage: 1,
      allPage: 1,
      count: 0,
      moveShow: false,
      mainShow: true,
      moveObj: null,
      deleteSign: false,
    };
  },
  mounted() {
    this.search();
    console.log(this.tableData);
  },
  methods: {
    // 搜索方法
    search() {
      let that = this;
      initClassroom({
        classroomName: this.form.classroomName,
        start: this.start,
        limit: this.limit,
      }).then((resp) => {
        let data = resp.tokenMap.classroomList;
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
          i.statusLabel = util.findStateName("status", i.classroomStatus);
          that.tableData.datas.push(i);
        }
      });
    },
    beforeUpload() {
      return true;
    },
    handleSuccess(excel) {
      addClassrooms({
        batchData: excel.results,
      }).then((resp) => {
        this.$message({
          message: resp.message,
          type: "success",
        });
        this.bulkImportPanel = false;
        this.search();
      });
    },
    editClassRoomImgSuccess() {},
    // 批量导入方法
    showBulkImportPanel() {
      this.bulkImportPanel = true;
    },
    sureBulkImport() {},
    hideBulkImportPanel() {
      this.bulkImportPanel = false;
    },

    // 新增教室方法
    showAddClassroomPanel() {
      this.addClassroomPanel = true;
    },

    addClassRoomImgSuccess(resp, file, fileList) {
      this.addClassroomMd5 = resp.tokenMap.fileMd5;
      uploadClassRoomImg({
        imgMd5: this.addClassroomMd5,
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: "图片上传成功",
            type: "success",
          });
        }
      });
    },
    sureAddClassroom() {
      addClassroom({
        classroomNum: this.addClassroomNum,
        classroomName: this.addClassroomName,
        classroomImg: this.addClassroomMd5,
        classroomArea: this.addClassroomArea,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "增加成功",
            type: "success",
          });
          this.addClassroomPanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("增加失败");
        }
      });
    },
    hideAddClassroomPanel() {
      this.addClassroomPanel = false;
    },

    // 修改教室方法
    showChangeClassroomPanel() {
      this.ChangeClassroomPanel = true;
    },
    suerChangeClassroom() {
      updateClassroom({
        classroomNum: this.changeClassroomNum,
        classroomName: this.changeClassroomName,
        classroomImg: this.changeClassroomImg,
        classroomArea: this.changeClassroomArea,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.changeClassroomPanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    hideChangeClassroomPanel() {
      this.changeClassroomPanel = false;
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
      this.form.classroomName = "";
      this.search();
    },
  },
};
</script>
<style scoped lang="scss">
.classroomInfo {
  background: url("~@/assets/mgr_images/classroomBackground.png");
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
