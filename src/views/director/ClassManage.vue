<template>
  <div class="classManage">
    <div class="back" style=" width: 70%">
      <div class="main" style="width:100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="form.className" placeholder="请输入查询班级名称" clearable />
          </el-form-item>
          <el-form-item>
            <el-button class="field btn" type="primary" size="medium" round @click="search">搜索</el-button>
            <el-button class="field btn" type="primary" size="medium" round @click="clearAll">重置</el-button>
          </el-form-item>
        </el-form>
        <el-card class="box-card" style="height: calc(100% - 62.8px)">
          <div slot="header" class="clearfix">
            <el-button class="field btn" type="primary" size="medium" round @click="bulkImport">批量导入</el-button>
            <el-button class="field btn" type="primary" size="medium" round @click="showAddClassPanel">新增</el-button>
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

    
    <el-dialog title="批量导入" :visible.sync="dialogBatchImportVisible">
      <el-row type="flex" class="row-bg" >
        <el-col :span="8">
          <upload-excel-component
            :on-success="handleSuccess"
            :before-upload="beforeUpload"
            style="margin-top: 10px"
          />
          <el-button
            type="primary"
            style=" margin-top: 10px"
            @click="dialogBatchImportVisible = false"
            >取消</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 新增班级面板 -->
    <el-dialog title="新增班级" :visible.sync="addClassPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input v-model="newClass.addClassName" placeholder="请输入班级名称" clearable style="width: 100%; margin-top: 10px" />
          <el-select v-model="newClass.addTeachSelect" placeholder="请选择班主任" style="width: 100%; margin-top: 10px">
            <el-option v-for="item in newClass.addTeachSelectDatas" :key="item.teacherId" :label="item.teacherName" :value="item.teacherId" />
          </el-select>
          <el-select v-model="newClass.addClassRoomSelect" placeholder="请选择教室" style="width: 100%; margin-top: 10px">
            <el-option v-for="item in newClass.addClassRoomSelectDatas" :key="item.classroomId" :label="item.classroomName" :value="item.classroomId" />
          </el-select>
          <el-select v-model="newClass.addClassType" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in classTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddClass">新增</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="closeAddClassPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改教室面板 -->
    <el-dialog title="修改教室信息" :visible.sync="changeClassPanel">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input v-model="editClass.changeClassName" placeholder="请输入班级名称" clearable style="width: 100%; margin-top: 10px" />
          <el-select v-model="editClass.changeTeachSelect" placeholder="请选择班主任" style="width: 100%; margin-top: 10px">
            <el-option v-for="item in editClass.changeTeachSelectDatas" :key="item.teacherId" :label="item.teacherName" :value="item.teacherId" />
          </el-select>
          <el-select v-model="editClass.changeClassRoomSelect" placeholder="请选择教室" style="width: 100%; margin-top: 10px">
            <el-option v-for="item in editClass.changeClassRoomSelectDatas" :key="item.classroomId" :label="item.classroomName" :value="item.classroomId" />
          </el-select>
          <el-select v-model="editClass.changeClassType" clearable :style="{width: '100%'}">
            <el-option
              v-for="(item, index) in classTypeList"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="suerChangeClass">修改</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideChangeClassPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import util from '@/utils/Utils'
// importBabys
import { selectClassRoom, selectTeacher, selectClass, updateClass, addClass, deleteClass } from '@/api/ClassManageApi'
import DocmTable from "@/components/table/DocmTable.vue";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
export default ({
  name: 'ClassManage',
  components:{DocmTable,UploadExcelComponent},
  data: function() {
    return {
      // 控制弹出面板
      addClassPanel: false,
      changeClassPanel: false,
      dialogBatchImportVisible:false,
      // 新增对话框的下拉框数据
      newClass: {
        addClassName: '',
        addTeachSelect: '',
        addClassType: '',
        addTeachSelectDatas: null,
        addClassRoomSelect: '',
        addClassRoomSelectDatas: null
      },
      // 修改对话框的下拉框数据
      editClass: {
        changeClassName: '',
        changeTeachSelect: '',
        changeTeachSelectDatas: null,
        changeClassRoomSelect: '',
        changeClassRoomSelectDatas: null,
        changeClassType: ''
      },
      form: {
        className: ''
      },
      classTypeList: [{
        'label': '小班',
        'value': 1
      }, {
        'label': '中班',
        'value': 2
      }, {
        'label': '大班',
        'value': 3
      }],
      tableData: {
        theads: [
          { name: '班级编号', key: 'classNum' },
          { name: '班级名称', key: 'className' },
          { name: '班主任', key: 'teacherName' },
          { name: '所在教室', key: 'classroomName' },
          { name: '班级类型', key: 'classType' },
          { name: '创建时间', key: 'classCtime' }
        ],
        datas: [
          { }
        ],
        btns: [
          {
            id: 1,
            name: '修改',
            type: 'primary',
            handle: 'openChangePanel'
          },
          {
            id: 2,
            name: '删除',
            type: 'waring',
            handle: 'handleDel'
          }
        ]
      },
      start: 0,
      limit: 5,
      currPage: 1,
      allPage: 1,
      total: 0
    }
  },
  created() {
    // this.init()
    // this.search()
  },
  methods: {
    init() {
      // 获取教室  获取教师  查询班级  修改班级  添加班级 删除班级
      selectClassRoom().then((resp) => {
        if (resp.id === 200) {
          this.newClass.addClassRoomSelectDatas = resp.tokenMap.classRoomList
          this.editClass.changeClassRoomSelectDatas = resp.tokenMap.classRoomList
        }
      })
      selectTeacher().then((resp) => {
        if (resp.id === 200) {
          this.newClass.addTeachSelectDatas = resp.tokenMap.teacherList
          this.editClass.changeTeachSelectDatas = resp.tokenMap.teacherList
        }
      })
    },
    beforeUpload(){},
    handleSuccess(){},
    // 搜索方法
    search() {
      selectClass({
        className: this.form.className,
        start: this.start,
        limit: this.limit
      }).then((resp) => {
        if (resp.id === 200) {
          this.initData(resp.datas.classList)
          this.total = resp.datas.num
        }
      })
    },
    // 处理数据
    initData(obj) {
      for (const i of obj) {
        i.teacherName = util.valueFormat(i.teacherId, this.addTeachSelectDatas, { labelKey: 'teacherId', valueKey: 'teacherName' })
        i.classroomName = util.valueFormat(i.classId, this.changeClassRoomSelectDatas, { labelKey: 'classId', valueKey: 'classroomName' })
        i.classType = util.findData('classType', i.classType)
        this.tableData.datas.push(i)
      }
    },
    // 批量导入方法
    bulkImport() {
      this.dialogBatchImportVisible = true;
    },
    // 打开新增面板
    showAddClassPanel() {
      this.addClassPanel = true
    },
    // 确认新增班级
    sureAddClass() {
      addClass({
        className: this.newClass.addClassName,
        teacherId: util.valueFormat(this.newClass.addTeachSelect, this.teacherList, { labelKey: 'teacherName', valueKey: 'teacherId' }),
        classType: util.valueFormat(this.newClass.addClassType, this.classTypeList, { labelKey: 'label', valueKey: 'value' })
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '增加成功',
            type: 'success'
          })
          this.addClassPanel = false
          this.start = 0
          this.currPage = 1
          this.search()
        } else {
          this.$message.error('增加失败')
        }
      })
    },
    // 取消新增班级
    closeAddClassPanel() {
      this.addClassPanel = false
    },
    // 删除班级
    handleDel(obj) {
      deleteClass({
        classId: obj.classId
      }).then((resp) => {
        if (resp.id === 200) {
          this.start = 0
          this.currPage = 1
          this.search()
        }
      })
    },
    // 打开修改面板
    openChangePanel() {
      this.changeClassPanel = true
    },
    // 确认修改班级
    suerChangeClass() {
      updateClass({
        className: this.editClass.changeClassName,
        teacherId: util.valueFormat(this.editClass.changeTeachSelect, this.teacherList, { labelKey: 'teacherName', valueKey: 'teacherId' }),
        classType: util.valueFormat(this.editClass.changeClassType, this.classTypeList, { labelKey: 'label', valueKey: 'value' })
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.babyMovePanel = false
          this.start = 0
          this.currPage = 1
          this.search()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 取消修改班级
    hideChangeClassPanel() {
      this.changeClassPanel = false
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
      this.form.className = ''
      this.form.ctime = ''
      this.form.mtime = ''
      this.search()
    }
  }
})
</script>
<style scoped lang="scss">
.classManage{
  background: url('~@/assets/mgr_images/background.jpg');
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
