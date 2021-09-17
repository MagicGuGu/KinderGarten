<template>
  <div class="safeEduManager">
    <div class="back" style=" width: 70%">
      <div class="main" style="width:100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-select v-model="form.classTypeSelect" placeholder="请选择班级类型">
            <el-option v-for="item in form.classTypeDataS" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
          </el-select>
          <el-form-item>
            <el-button class="field btn" type="primary" size="medium" round @click="search">搜索</el-button>
            <el-button class="field btn" type="primary" size="medium" round @click="clearAll">重置</el-button>
          </el-form-item>
        </el-form>
        <el-card class="box-card" style="height: calc(100% - 62.8px)">
          <div slot="header" class="clearfix">
            <el-button class="field btn" type="primary" size="medium" round @click="showAddSafeVideoPanel">新增</el-button>
          </div>

          <docm-table :datas="tableData" style="width: 100%;" />
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
    <!-- 新增安全视频面板 -->
    <el-dialog title="新增安全教育视频" :visible.sync="addSafeVideoPanel">
      <el-input v-model="addSafeEduName" placeholder="请输入视频名称" />
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form>
            <el-form-item
              label="请放入教育视频"
              prop="safeEduVideo"
              required
            >
              <el-upload
                ref="safeEduVideo"
                :file-list="safeEduVideoList"
                :action="safeEduVideoAction"
                :on-success="safeEduVideoSuccess"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddSafeVideo">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideAddSafeVideoPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 新增安全试题面板 -->
    <el-dialog title="新增安全教育试题" :visible.sync="addSafeExamPanel">

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-form-item
            label="请放入教育试题"
            prop="safeEduExam"
            required
          >
            <el-upload
              ref="safeEduExam"
              :file-list="safeEduExamList"
              :action="safeEduExamAction"
              :on-success="safeEduExamSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddSafeExam">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideAddSafeExamPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>

</template>
<script>
import util from '@/utils/Utils'
import { getSafeEduInfo, setExam, setEduVideo, addSafeEdu, delSafeEdu } from '@/api/SafeEduManageApi'
import DocmTable from "@/components/table/DocmTable.vue";
export default ({
  name: 'SafeEduManager',
  components:{DocmTable},
  data: function() {
    return {
      addSafeExamPanel: false,
      addSafeVideoPanel: false,
      addSafeEduName: '',
      addSafeVideo: '',
      form: {
        classTypeSelect: '',
        classTypeDataS: ''
      },

      tableData: {
        theads: [
          { name: '编号', key: 'safeEduId' },
          { name: '安全教育主题', key: 'safeEduName' },
          { name: '操作', key: '' }
        ],
        datas: [
          { }
        ],
        btns: [
          {
            id: 1,
            name: '配置安全试题',
            type: 'primary',
            handle: 'showAddSafeExamPanel'
          },
          {
            id: 2,
            name: '删除',
            type: 'waring',
            handle: 'handleDel'
          }
        ]
      },

      safeEduVideoList: [],
      safeEduExamList: [],
      safeEduVideoAction: process.env.VUE_APP_BASE_URL + 'doUploadVideo',
      safeEduExamAction: process.env.VUE_APP_BASE_URL + 'doUploadDoc',

      videoFileMd5: '',
      videoId: '',
      examDoc: '',
      start: 0,
      limit: 5,
      currPage: 1,
      allPage: 1,
      total: 0,
      moveShow: false,
      mainShow: true,
      moveObj: null,
      deleteSign: false

    }
  },
  created() {
    // this.search()
    // this.init()
  },
  methods: {
    init() {
      this.form.classTypeDataS = util.getListByAlias('classType')
    },
    // 搜索方法
    search() {
      getSafeEduInfo({
        classType: util.valueFormat(this.form.classTypeSelect, this.form.classTypeDataS, { labelKey: 'dictLabel', valueKey: 'dictValue' }),
        start: this.start,
        limit: this.limit
      }).then((resp) => {
        if (resp.id === 200) {
          this.initData(resp.datas.safeEduList)
          this.total = resp.datas.num
        }
      })
    },
    // 处理数据
    initData(obj) {
      for (const i of obj) {
        i.ctime = util.getDateForEndDay(i.ctime)
        this.tableData.datas.push(i)
      }
    },
    // 上传视频
    safeEduVideoSuccess(resp, file, fileList) {
      this.videoFileMd5 = resp.tokenMap.fileMd5
      setEduVideo({
        videoMd5: this.videoFileMd5
      }).then((resp) => {
        if (resp.id === 200) {
          this.videoId = resp.tokenMap.videoId
          this.$message({
            message: '文件上传成功',
            type: 'success'
          })
        }
      })
    },
    safeEduExamSuccess(resp, file, fileList) {
      this.videoFileMd5 = resp.tokenMap.fileMd5
      setExam({
        videoMd5: this.videoFileMd5
      }).then((resp) => {
        if (resp.id === 200) {
          this.examDoc = resp.tokenMap.examDoc
          this.$message({
            message: '文件上传成功',
            type: 'success'
          })
        }
      })
    },
    sureAddSafeVideo() {
      addSafeEdu({
        videoId: this.videoId,
        saveEduName: this.addSafeEduName
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
      this.addSafeVideoPanel = false
    },
    sureAddSafeExam() {
      addSafeEdu({
        examDoc: this.examDoc,
        saveEduName: this.addSafeEduName
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }
      })
      this.addSafeExamPanel = false
    },

    handleDel(obj) {
      delSafeEdu({
        safeEduId: obj.safeEduId
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 新增视频方法
    showAddSafeVideoPanel() {
      this.addSafeVideoPanel = true
    },
    hideAddSafeVideoPanel() {
      this.addSafeVideoPanel = false
    },
    showAddSafeExamPanel() {
      this.addSafeExamPanel = true
    },
    hideAddSafeExamPanel() {
      this.addSafeExamPanel = false
    },

    // 当前页翻页
    changeCurrPage(page) {
      this.start = (page - 1) * this.limit
      this.search()
    },
    // 上一页
    lastPage() {
      this.currPage--
      this.start -= this.limit
      this.search()
    },
    // 下一页
    nextPage() {
      this.currPage++
      this.start += this.limit
      this.search()
    },

    // 重置
    clearAll() {
      this.form.classTypeSelect = ''
      this.search()
    },
    formatterRoleName(row, column, cellValue, index) {
      return util.valueFormat(cellValue, this.roleList, { labelKey: 'roleId', valueKey: 'roleName' })
    },
    formatterState(row, column, cellValue, index) {
      return util.findStateName('state', cellValue)
    },
    formatterCtime(row, column, cellValue, index) {
      return util.formatTime(cellValue)
    }
  }
})
</script>
<style scoped lang="scss">
.safeEduManager{
  background: url('~@/assets/mgr_images/safeEduBackground.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.back{
  background: url('~@/assets/mgr_images/背景框.png');
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

.title{
  width: 100%;
  height: 20%;
}
.mylayout{
  width: 100%;
  height: 100%;
}
 .myTable {
    width:80%;
  }
.el-upload__tip {
  line-height: 1.2;
}
.block{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
