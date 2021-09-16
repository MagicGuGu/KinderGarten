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
        <docm-table :datas="tableData" @handleAgree="handleAgree"> </docm-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import DocmTable from "@/components/table/DocmTable.vue";
import { init,doAgree } from "@/api/AuditApi";
import util from "@/utils/Utils"
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
      auditOption:{
          agree:1,
          refuse:2,
      },
      tableData: {
        // cellBtn:true,  
        theads: [
          { name: "园所名称", key: "schoolName" },
          { name: "申请时间", key: "auditCtime" },
          { name: "状态", key: "auditStatus" },
        ],
        datas: [],
        btns: [{ name: "查看详情", type: "primary", handle: "handleRead" },
        { name: "通过", type: "success", handle: "handleAgree" }
        ],
      },
      total: 0,
      forbidSign: false,
    };
  },
  methods: {
    initAudit() {
      init({}).then((resp) => {
         
          for(let i of resp.tokenMap.auditList){
              i.auditCtime = util.getDate(i.auditCtime);

            //   i.schoolPermit = {name:'查看图片',type:'primary',handle:"handleShowImg"};
            //   i.sanitaryPermit = {name:'查看图片',type:'primary',handle:"handleShowImg"};
            //   i.firePermit =  {name:'查看图片',type:'primary',handle:"handleShowImg"};
            //   i.organizationCode ={name:'查看图片',type:'primary',handle:"handleShowImg"};
            //   i.taxRegistrationCertificate ={name:'查看图片',type:'primary',handle:"handleShowImg"};

              this.tableData.datas.push(i);
          }
           console.log(this.tableData);
      });
    },
    handleRead() {},
    handleAgree(item){
        console.log(item);
        doAgree({
            auditId:item.auditId,
            auditStatus:this.auditOption.agree,
        }).then((resp)=>{
            if(resp.code === 200){
                this.$message({
                    message:resp.message,
                    type:'success'
                })
            }
        })


    },
    doSearch() {},
    clearSearch() {},
  },
};
</script>