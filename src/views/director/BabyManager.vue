<template>
  <div class="directorParentManager">
    <div class="back" style="width:70%">

      <div class="main" style="width:100%">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="form.babyName" placeholder="请输入查询宝宝名" clearable />
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="form.className" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="field btn" type="primary" size="medium" round @click="search">搜索</el-button>
            <el-button class="field btn" type="primary" size="medium" round @click="clearAll">重置</el-button>
          </el-form-item>
        </el-form>
        <el-card class="box-card" style="height: calc(100% - 62.8px)">
          <div slot="header" class="clearfix">
            <!-- 批量导入 -->
            <upload-excel-component
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              style="margin-top:10px"
            />
            <el-button class="field btn" type="primary" size="medium" round @click="openAddBaybyPanel">新增</el-button>
          </div>
          <docm-table
            :datas="tableData"
            style="width: 100%;"
          />
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
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

    <!-- 家长信息展示、修改面板 -->
    <el-dialog title="家长信息" :visible.sync="parentMovePanel">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="parentMove" size="medium" label-width="100px">
          <el-col :span="13">
            <el-form-item label="家长姓名" prop="parentName">
              <el-input v-model="parentMove.parentName" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="家长邮箱" prop="parentEmail">
              <el-input v-model="parentMove.parentEmail" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="家长职业" prop="parentJob">
              <el-input v-model="parentMove.parentJob" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="家长电话" prop="parentTel">
              <el-input v-model="parentMove.parentTel" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="closeParentShowPanel">取消</el-button>
        <el-button type="primary" @click="updateParent">修改</el-button>
      </div>
    </el-dialog>

    <!-- 修改宝宝面板 -->
    <el-dialog title="宝宝修改" :visible.sync="babyMovePanel">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="babyMove" size="medium" label-width="100px">
          <el-col :span="13">
            <el-form-item label="宝宝名称" prop="field105">
              <el-input v-model="babyMove.babyName" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="性别" prop="field107" />
            <el-select v-model="babyMove.babySex" clearable :style="{width: '100%'}">
              <el-option
                v-for="(item, index) in sexList"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              />
            </el-select>
          </el-col>
          <el-col :span="13">
            <el-form-item label="出生年月" prop="field108">
              <el-date-picker
                v-model="babyMove.birthDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :style="{width: '100%'}"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="所在班级" prop="field109">
              <el-select v-model="babyMove.className" clearable :style="{width: '100%'}">
                <el-option
                  v-for="(item, index) in classList"
                  :key="index"
                  :label="item.className"
                  :value="item.classId"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="closeBabyShowPanel">取消</el-button>
        <el-button type="primary" @click="updateBaby">修改</el-button>
      </div>
    </el-dialog>+++++++++++++++++++++++++++++++++++++++++++++++++++++

    <!-- 新增宝宝 -->
    <el-dialog title="新增宝宝" :visible.sync="babyAddShowPanel">
      <el-row :gutter="15">
        <el-form ref="elForm" :model="addBaby" size="medium" label-width="100px">
          <el-col :span="13">
            <el-form-item label="班级" prop="field110">
              <el-select v-model="addBaby.className" clearable :style="{width: '100%'}">
                <el-option
                  v-for="(item, index) in classList"
                  :key="index"
                  :label="item.className"
                  :value="item.classId"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="学号" prop="field114">
              <el-input v-model="addBaby.babyNum" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="宝宝名称" prop="field111">
              <el-input v-model="addBaby.babyName" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="性别" prop="field117">
              <el-select v-model="addBaby.babySex" clearable :style="{width: '100%'}">
                <el-option
                  v-for="(item, index) in sexList"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="身份证" prop="field112">
              <el-input v-model="addBaby.babyCard" clearable :style="{width: '100%'}" />
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer">
        <el-button @click="closeBabyAddShowPanel">取消</el-button>
        <el-button type="primary" @click="handleAddBaby">新增</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import util from '@/utils/Utils'
// importBabys
import { getBabyInfo, updateBaby, updateParent, deleteBaby, getClassInfo, addBaby } from '@/api/DirectorBabyManagerApi'
import DocmTable from "@/components/table/DocmTable.vue";
export default ({
 
  name: 'DirectorParentManager',
  components:{DocmTable},
  data: function() {
    return {
      classList: null,
      sexList: [{
        'label': '男',
        'value': 1
      }, {
        'label': '女',
        'value': 0
      }],
      form: {
        babyName: '',
        className: ''
      },
      tableData: {
        theads: [
          { name: '宝宝学号', key: 'babyNum' },
          { name: '家长姓名', key: 'parentName' },
          { name: '亲子关系', key: 'parenthood' },
          { name: '宝宝名称', key: 'babyName' },
          { name: '性别', key: 'babySex' },
          { name: '出生年月', key: 'birthDate' },
          { name: '所在班级', key: 'className' },
          { name: '创建时间', key: 'babyCtime' }
        ],
        datas: [],
        btns: [
          {
            id: 1,
            name: '家长信息',
            type: 'primary',
            handle: 'openParentInfoPanel'
          },
          {
            id: 2,
            name: '修改',
            type: 'primary',
            handle: 'openBabyMovePanel'
          },
          {
            id: 3,
            name: '删除',
            type: 'waring',
            handle: 'handleDel'
          }
        ]
      },
      parentMove: {
        parentId: '',
        parentName: '',
        parentEmail: '',
        parentJob: '',
        parentTel: ''
      },
      babyMove: {
        babyId: '',
        babyName: '',
        babySex: '',
        birthDate: '',
        classId: '',
        className: ''
      },
      addBaby: {
        className: '',
        babyNum: '',
        babyName: '',
        babySex: '',
        babyCard: ''
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
      parentMovePanel: false,
      babyMovePanel: false,
      babyAddShowPanel: false
    }
  },
  created() {
    this.init()
    this.search()
  },
  methods: {
    // 初始化获取班级信息
    init() {
      getClassInfo().then((resp) => {
        if (resp.id === 200) {
          this.classList = resp.tokenMap.classList
        }
      })
    },
    // enterDel(obj) {
    //   this.deleteSign = true
    //   this.handleDel(obj)
    // },
    // 删除
    handleDel(obj) {
      deleteBaby({
        babyId: obj.babyId
      }).then((resp) => {
        if (resp.id === 200) {
          this.start = 0
          this.currPage = 1
          this.search()
          this.deleteSign = false
        }
      })
    },
    // 修改家长
    openParentInfoPanel(obj) {
      this.parentMove.parentId = obj.parentInfo.parentId
      this.parentMove.parentName = obj.parentInfo.parentName
      this.parentMove.parentEmail = obj.parentInfo.parentEmail
      this.parentMove.parentJob = obj.parentInfo.parentJob
      this.parentMove.parentTel = obj.parentInfo.parentTel
      this.parentMovePanel = true
    },
    closeParentShowPanel() {
      this.parentMovePanel = false
    },
    updateParent() {
      updateParent({
        userId: this.parentMove.parentId,
        userName: this.parentMove.parentName,
        userEmail: this.parentMove.parentEmail,
        userTel: this.parentMove.parentTel,
        parentJob: this.parentMove.parentJob
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.parentMovePanel = false
          this.start = 0
          this.currPage = 1
          this.search()
        } else {
          this.$message.error('修改失败')
        }
      })
    },
    // 修改宝宝
    openBabyMovePanel(obj) {
      this.babyMovePanel = true
      this.babyMove.babyId = obj.babyId
      this.babyMove.babyName = obj.babyName
      this.babyMove.babySex = util.findData('sex', obj.babySex)
      this.babyMove.birthDate = util.formatTime(obj.birthDate)
      this.babyMove.classId = obj.classId
      this.babyMove.className = util.valueFormat(obj.classId, this.classList, { labelKey: 'classId', valueKey: 'className' })
    },
    closeBabyShowPanel() {
      this.babyMovePanel = false
    },
    updateBaby() {
      updateBaby({
        babyId: this.babyMove.babyId,
        babyName: this.babyMove.babyName,
        babySex: util.findData('sex', this.babyMove.babySex),
        birthDate: this.babyMove.birthDate,
        classId: util.valueFormat(this.babyMove.className, this.classList, { labelKey: 'className', valueKey: 'classId' })
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
    // 新增
    openAddBaybyPanel() {
      this.babyAddShowPanel = true
    },
    closeBabyAddShowPanel() {
      this.babyAddShowPanel = false
    },
    handleAddBaby() {
      addBaby({
        classId: util.valueFormat(this.addBaby.className, this.classList, { labelKey: 'className', valueKey: 'classId' }),
        babyNum: this.addBaby.babyNum,
        babyName: this.addBaby.babyName,
        babySex: util.findData('sex', this.addBaby.babySex),
        babyCard: this.addBaby.babyCard
      }).then((resp) => {
        if (resp.id === 200) {
          this.$message({
            message: '增加成功',
            type: 'success'
          })
          this.babyAddShowPanel = false
          this.start = 0
          this.currPage = 1
          this.search()
        } else {
          this.$message.error('增加失败')
        }
      })
    },
    // 批量导入
    handleSuccess(results, header) {
      console.log(header)
      console.log(results)
      // importBabys({
      //   dataList:results,

      // })
    },
    // 搜索
    search() {
      getBabyInfo({
        babyName: this.form.babyName,
        classId: util.valueFormat(this.form.className, this.classList, { labelKey: 'className', valueKey: 'classId' }),
        start: this.start,
        limit: this.limit
      }).then((resp) => {
        if (resp.id === 200) {
          this.initData(resp.datas.babyList)
          this.total = resp.datas.num
        }
      })
    },
    // 处理数据
    initData(obj) {
      for (const i of obj) {
        i.parenthood = util.findData('parenthood', i.parenthood)
        i.babySex = util.findData('sex', i.babySex)
        i.birthDate = util.getDateForEndDay(i.birthDate)
        i.className = util.valueFormat(i.classId, this.classList, { labelKey: 'classId', valueKey: 'className' })
        this.tableData.datas.push(i)
      }
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
      this.form.keyWord = ''
      this.form.ctime = ''
      this.form.mtime = ''
      this.form.roleId = ''
      this.start = 0
      this.search()
    }
  }
})
</script>
<style scoped lang="scss">
.directorParentManager{
  background: url('~@/assets/mgr_images/babyBackground.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.back{
  background: url('~@/assets/mgr_images/背景框.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center 75%;
    height: 600px;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: fit-content;
    margin: auto;
    padding-top: 12vh;
}
/* 主区域 */
.main {
  padding: 0 58px;
  height: calc(100% - 9vh);
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
