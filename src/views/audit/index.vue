<template>
  <div id="audit">
    <el-container>
      <el-header style="margin-top: 20px">
        <el-form :inline="true" :model="form">
          <el-form-item label="">
            <el-input
              v-model="form.searchSchoolName"
              placeholder="请输入幼儿园名称"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="doSearch"
              >搜索</el-button
            >
            <el-button
              class="field btn"
              type="primary"
              size="medium"
              round
              @click="clearSearch"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <docm-table :datas="tableData" @handleRead="handleRead"> </docm-table>
      </el-main>
    </el-container>

    <el-dialog title="详情" :visible.sync="dialogAuditInfoVisible">
      <el-descriptions title="申请信息">
        <el-descriptions-item label="幼儿园名称">{{
          schoolName
        }}</el-descriptions-item>
        <el-descriptions-item label="法人">{{
          legalPerson
        }}</el-descriptions-item>
        <el-descriptions-item label="法人身份证">{{
          legalPersonCard
        }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ contactPhone }}
        </el-descriptions-item>

        <el-descriptions-item label="详细地址" span="3">{{
          schoolAddress
        }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{
          contactEmail
        }}</el-descriptions-item>
        <el-descriptions-item label="办学许可证">
          <el-button type="primary" icon="el-icon-picture" size="mini"
            >查看图片</el-button
          >
        </el-descriptions-item>
        <el-descriptions-item label="消费许可证">
          <el-button type="primary" icon="el-icon-picture" size="mini"
            >查看图片</el-button
          >
        </el-descriptions-item>
        <el-descriptions-item label="组织代码证">
          <el-button type="primary" icon="el-icon-picture" size="mini"
            >查看图片</el-button
          >
        </el-descriptions-item>
        <el-descriptions-item label="税务登记证">
          <el-button type="primary" icon="el-icon-picture" size="mini"
            >查看图片</el-button
          >
        </el-descriptions-item>
        <el-descriptions-item label="卫生许可证">
          <el-button type="primary" icon="el-icon-picture" size="mini"
            >查看图片</el-button
          >
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditInfoVisible = false">返回</el-button>
        <el-button type="success" @click="doAgree">同意</el-button>
        <el-button type="danger" @click="doRefuse">拒绝</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import DocmTable from "@/components/table/DocmTable.vue";
import { init, doAgree } from "@/api/AuditApi";
import util from "@/utils/Utils";
export default {
  components: { DocmTable },
  mounted() {
    this.initAudit();
  },
  data() {
    return {
      typeLis: null,
      form: {
        searchSchoolName: "",
      },
      start: 0,
      limit: 5,
      currPage: 1,
      allPage: 1,
      schoolName: "",
      legalPerson: "",
      legalPersonCard: "",
      contactPhone: "",
      schoolAddress: "",
      contactEmail: "",
      auditId: "",
      dialogAuditInfoVisible: false,
      auditOption: {
        agree: 1,
        refuse: 2,
      },
      tableData: {
        // cellBtn:true,
        theads: [
          { name: "园所名称", key: "schoolName" },
          { name: "申请时间", key: "auditCtime" },
          { name: "状态", key: "auditStatus" },
        ],
        datas: [],
        btns: [{ name: "查看详情", type: "primary", handle: "handleRead" }],
      },
      total: 0,
      forbidSign: false,
    };
  },
  methods: {
    initAudit() {
      init({}).then((resp) => {
        for (let i of resp.tokenMap.auditList) {
          i.auditCtime = util.getDate(i.auditCtime);
          this.tableData.datas.push(i);
        }
        console.log(this.tableData);
      });
    },
    handleRead(item) {
      this.schoolName = item.schoolName;
      this.legalPerson = item.legalPerson;
      this.legalPersonCard = item.legalPersonCard;
      this.schoolAddress = item.schoolAddress;
      this.contactPhone = item.contactPhone;
      this.contactEmail = item.contactEmail;
      this.auditId = item.auditId;
      this.dialogAuditInfoVisible = true;
    },
    handleAgree(item) {
      doAgree({
        auditId: item.auditId,
        auditStatus: this.auditOption.agree,
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: resp.message,
            type: "success",
          });
        }
      });
    },
    doSearch() {},
    doAgree() {
      doAgree({
        auditId: this.auditId,
        auditStatus: this.auditOption.agree,
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: resp.message,
            type: "success",
          });
        }
      });
    },
    doRefuse() {
      doAgree({
        auditId: this.auditId,
        auditStatus: this.auditOption.refuse,
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: resp.message,
            type: "success",
          });
        }
      });
    },
    clearSearch() {},
  },
};
</script>