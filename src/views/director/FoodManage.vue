<template>
  <div class="foodInfo">
    <div class="back" style="width: 70%">
      <div class="main" style="width: 100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input
              v-model="form.foodName"
              placeholder="请输入查询膳食名称"
              clearable
            />
          </el-form-item>
          <el-select v-model="form.foodTypeSelect" placeholder="请选择膳食类型">
            <el-option
              v-for="item in form.foodTypeS"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
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
            <!-- 批量导入 -->
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="dialogBatchVisible = true"
              >批量导入</el-button
            >
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="showAddFoodPanel"
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
    <!-- 批量导入弹出框 -->
    <el-dialog title="批量导入-膳食" :visible.sync="dialogBatchVisible">
      <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        style="margin-top: 10px"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBatchVisible = false">返回</el-button>
      </div>
    </el-dialog>
    <!-- 新增膳食面板 -->
    <el-dialog title="新增膳食" :visible.sync="addFoodPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="addFoodName"
            placeholder="请输入膳食名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-select
            v-model="addFoodTypeSelect"
            placeholder="请选择膳食类型"
            style="width: 100%; margin-top: 10px"
          >
            <el-option
              v-for="item in form.foodTypeS"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="sureAddFood"
            >新增</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideAddFoodPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改膳食面板 -->
    <el-dialog title="修改膳食信息" :visible.sync="changeFoodPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input
            v-model="changeFoodName"
            placeholder="请输入膳食名称"
            clearable
            style="width: 100%; margin-top: 10px"
          />
          <el-select
            v-model="changeFoodTypeSelect"
            placeholder="请选择膳食类型"
            style="width: 100%; margin-top: 10px"
          >
            <el-option
              v-for="item in form.foodTypeS"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            />
          </el-select>
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="suerChangeFood"
            >修改</el-button
          >
          <br />
          <el-button
            type="primary"
            style="width: 100%; margin-top: 10px"
            @click="hideChangeFoodPanel"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { initFood, addFood, updateFood, addFoods } from "@/api/FoodInfoApi";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import DocmTable from "@/components/table/DocmTable.vue";
import util from "@/utils/Utils";
export default {
  name: "FoodInfo",
  components: { DocmTable, UploadExcelComponent },
  data: function () {
    return {
      roleList: null,
      // 控制弹出面板
      addFoodPanel: false,
      changeFoodPanel: false,
      // 新增对话框得下拉框数据
      addFoodName: "",
      addFoodTypeSelect: "",
      // 修改对话框得下拉框数据
      changeFoodName: "",
      changeFoodTypeSelect: "",
      // 搜索信息
      form: {
        foodName: "",
        foodTypeS: util.getListByAlias("foodType"),
        foodTypeSelect: "",
      },

      tableData: {
        theads: [
          { name: "膳食名称", key: "foodName" },
          { name: "膳食类型", key: "foodTypeLabel" },
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
      limit: 5,
      currPage: 1,
      allPage: 1,
      count: 0,
      moveShow: false,
      mainShow: true,
      moveObj: null,
      deleteSign: false,
      dialogBatchVisible: false,
    };
  },
  created() {
    this.search();
  },
  methods: {
    // 搜索方法
    search() {
      let that = this;
      initFood({
        foodName: this.form.foodName,
        // foodType: util.valueFormat(this.form.foodTypeSelect, this.form.foodTypeS, { labelKey: 'dictLabel', valueKey: 'dictValue' }),
        start: this.start,
        limit: this.limit,
      }).then((resp) => {
        let data = resp.tokenMap.foodList;
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
          i.foodTypeLabel = util.findStateName("food", i.foodType);
          i.statusLabel = util.findStateName("status", i.foodStatus);
          that.tableData.datas.push(i);
        }
      });
    },
    handleSuccess(excel) {
      addFoods({
        batchData: excel.results,
      }).then((resp) => {
        this.$message({
          message: resp.message,
          type: "success",
        });
        this.search();
      });
    },
    beforeUpload() {
      return true;
    },
    // 数据处理
    initData(obj) {
      for (const i of obj) {
        i.foddType = util.valueFormat(obj.foodType, this.form.foodTypeS, {
          labelKey: "dictValue",
          valueKey: "dictLabel",
        });
        this.tableData.datas.push(i);
      }
    },
    // 新增膳食方法
    showAddFoodPanel() {
      this.addFoodPanel = true;
    },
    sureAddFood() {
      addFood({
        foodType: util.valueFormat(
          this.addFoodTypeSelect,
          this.form.foodTypeS,
          { labelKey: "dictLabel", valueKey: "dictValue" }
        ),
        foddName: this.addFoodName,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "增加成功",
            type: "success",
          });
          this.addFoodPanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("增加失败");
        }
      });
    },
    hideAddFoodPanel() {
      this.addFoodPanel = false;
    },
    // 修改膳食方法
    showChangeFoodPanel() {
      this.changeFoodPanel = true;
    },
    suerChangeFood() {
      updateFood({
        foodType: util.valueFormat(
          this.changeFoodTypeSelect,
          this.form.foodTypeS,
          { labelKey: "dictLabel", valueKey: "dictValue" }
        ),
        foddName: this.changeFoodName,
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.changeFoodPanel = false;
          this.start = 0;
          this.currPage = 1;
          this.search();
        } else {
          this.$message.error("修改失败");
        }
      });
    },
    hideChangeFoodPanel() {
      this.changeFoodPanel = false;
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
      this.form.foodName = "";
      this.form.foodTypeSelect = "";
      this.search();
    },
  },
};
</script>
<style scoped lang="scss">
.foodInfo {
  background: url("~@/assets/mgr_images/foodBackground.png");
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
