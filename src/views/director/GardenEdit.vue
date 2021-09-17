<template>
  <div class="gardenEdit">
    <!-- 标题 -->
    <div class="title" />
    <!--=========================================== 园所简介配置 ========================================================-->
    <div class="gardenBriefConfig">
      <div class="tableBackGroundDiv">
        <div style="width: 100%;height: 15%;" />
        <div style="width: 100%;height: 15%;">
          <el-row>
            <el-col :span="8" :offset="9"><h1>请输入园所简介</h1></el-col>
          </el-row>
        </div>
        <div style="width: 100%;height: 50%;">
          <el-row>
            <el-col :span="12" :offset="6"><el-input
              v-model="schIntroduction.schoolIntroduction"
              type="textarea"
              placeholder="请输入内容"
              maxlength="100"
              rows="10"
              show-word-limit
            /></el-col>
          </el-row>
        </div>
        <div style="width: 100%;height: 20%;">
          <el-row style="width: 100%;height: 100%;">
            <el-col :span="6" :offset="9" style="width: 100%;height: 100%;">
              <el-button type="primary" size="medium" style="width: 20%;height: 50%;" @click="updateSchoolIntroduction">确认简介</el-button>
            </el-col>
          </el-row>

        </div>
      </div>
    </div>
    <!-- ++++++++++++++++++++++++++++++++++++++++++++++轮播图配置++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="slideshowConfig">
      <div class="tableBackGroundDiv">
        <div style="width: 100%;height: 10%;" />
        <div style="width: 100%;height: 10%;">
          <el-row style="width: 100%;height: 100%;">
            <el-col :span="4" :offset="16" style="width: 100%;height: 100%;">
              <el-button type="primary" size="medium " style="width: 20%;height: 65%;" @click="showAddSlideShowPanel">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="width: 100%;height: 80%; ">
          <!-- 表格 -->
          <div class="tableDivOne">
            <div class="tableDivTwo">
              <el-table :data="slideShowData.tableData" style="width: 100%">
                <el-table-column prop="elementId" label="编号" />
                <el-table-column prop="elementContent" label="图片">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="require(scope.row.elementContent)"
                      :preview-src-list="[scope.row.elementContent]"
                      :fit="fit"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="elementCtime" :formatter="formatterCtime" label="上传时间" />
                <el-table-column prop="userId" label="操作">
                  <template slot-scope="scope">
                    <el-button type="success" @click="showChangeSlideshow(scope.row)">修改</el-button>
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定禁止吗？"
                      class="popconfirm"
                      @confirm="enterDelSlideShow(scope.row)"
                    >
                      <el-button slot="reference" type="danger" @click="delSlideshow(scope.row)">删除</el-button>
                    </el-popconfirm>

                  </template>
                </el-table-column>
              </el-table>
              <!-- <docm-table :datas="slideShowTableData" style="width: 100%;" @showChangeSlideshow="showChangeSlideshow" /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传面板 -->
    <el-dialog title="上传轮播图" :visible.sync="addSlideShowPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="addSlideShowImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将轮播图拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddSlideshow">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideAddSlideShowPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改面板 -->
    <el-dialog title="修改轮播图" :visible.sync="changeSlideShowPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="changeSlideShowImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将轮播图拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureChangeSlideshow">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hidechangeSlideShowPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++++++++++++++++++++++明星宝宝配置++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="starBabyConfig">
      <div class="tableBackGroundDiv">
        <div style="width: 100%;height: 10%;" />
        <div style="width: 100%;height: 10%;">
          <el-row style="width: 100%;height: 100%;">
            <el-col :span="4" :offset="16" style="width: 100%;height: 100%;">
              <el-button type="primary" size="medium " style="width: 20%;height: 65%;" @click="showAddStarBabyPanel">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="width: 100%;height: 80%;">
          <!-- 表格 -->
          <div class="tableDivOne">
            <div class="tableDivTwo">
              <el-table :data="starBabyData.tableData" style="width: 100%">
                <el-table-column prop="elementId" label="编号" />
                <el-table-column prop="remark" :formatter="formatterContentOne" label="宝宝名字" />
                <el-table-column prop="elementContent" label="宝宝图片">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="require(scope.row.elementContent)"
                      :preview-src-list="[scope.row.elementContent]"
                      :fit="fit"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="remark" :formatter="formatterContentTwo" label="宝宝描述" />
                <el-table-column prop="elementCtime" :formatter="formatterCtime" label="创建时间" />
                <el-table-column prop="userId" label="操作">
                  <template slot-scope="scope">
                    <el-button type="success" @click="showChangeStarBabyPanel(scope.row)">修改</el-button>
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定禁止吗？"
                      class="popconfirm"
                      @confirm="enterDelStarBaby(scope.row)"
                    >
                      <el-button slot="reference" type="danger" @click="delStarBaby(scope.row)">删除</el-button>
                    </el-popconfirm>

                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传面板 -->
    <el-dialog title="新增宝宝" :visible.sync="addStarBabyPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input v-model="addStarBabyPanel.name" placeholder="请输入宝宝名" clearable style="width: 100%; margin-bottom: 10px" />
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="addStarBabyImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将宝宝图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-input
            v-model="addStarBabyPanel.introduciton"
            type="textarea"
            placeholder="请输入宝宝描述"
            maxlength="100"
            rows="2"
            show-word-limit
          />
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddStarBaby">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideAddStarBabyPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改面板 -->
    <el-dialog title="修改宝宝" :visible.sync="changeStarBabyPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input v-model="changeStarBabyPanel.name" placeholder="请输入宝宝名" clearable style="width: 100%; margin-bottom: 10px" />
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="changeStarBabyImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将宝宝图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-input
            v-model="changeStarBabyPanel.introduction"
            type="textarea"
            placeholder="请输入宝宝描述"
            maxlength="100"
            rows="2"
            show-word-limit
          />
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureChangeStarBaby">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hidechangeStarBabyPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++++++++++++++++++++++师资团队配置++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="teacherTeamConfig">
      <div class="tableBackGroundDiv">
        <div style="width: 100%;height: 10%;" />
        <div style="width: 100%;height: 10%;">
          <el-row style="width: 100%;height: 100%;">
            <el-col :span="4" :offset="16" style="width: 100%;height: 100%;">
              <el-button type="primary" size="medium " style="width: 20%;height: 65%;" @click="showAddTeacherTeamPanel">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="width: 100%;height: 80%;">
          <!-- 表格 -->
          <div class="tableDivOne">
            <div class="tableDivTwo">
              <el-table :data="teacherTeamData.tableData" style="width: 100%">
                <el-table-column prop="elementId" label="编号" />
                <el-table-column prop="remark" :formatter="formatterContentOne" label="教师名称" />
                <el-table-column prop="elementContent" label="教师图片">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="require(scope.row.elementContent)"
                      :preview-src-list="[scope.row.elementContent]"
                      :fit="fit"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="remark" :formatter="formatterContentTwo" label="教师描述" />
                <el-table-column prop="elementCtime" :formatter="formatterCtime" label="创建时间" />
                <el-table-column prop="userId" label="操作">
                  <template slot-scope="scope">
                    <el-button type="success" @click="showChangeTeacherTeamPanel(scope.row)">修改</el-button>
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定禁止吗？"
                      class="popconfirm"
                      @confirm="enterDelTeacherTeam(scope.row)"
                    >
                      <el-button slot="reference" type="danger" @click="delTeacherTeam(scope.row)">删除</el-button>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传面板 -->
    <el-dialog title="新增教师配置" :visible.sync="addTeacherTeamPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input v-model="addTeacherTeamPanel.name" placeholder="请输入教室名" clearable style="width: 100%; margin-bottom: 10px" />
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="addTeacherTeamImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将教师图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-input
            v-model="addTeacherTeamPanel.introduction"
            type="textarea"
            placeholder="请输入教师描述"
            maxlength="100"
            rows="2"
            show-word-limit
          />
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddTeacherTeam">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideAddTeacherTeamPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改面板 -->
    <el-dialog title="修改教师配置" :visible.sync="changeTeacherTeamPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-input v-model="changeTeacherTeamPanel.name" placeholder="请输入教师名" clearable style="width: 100%; margin-bottom: 10px" />
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="changeTeacherTeamImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将教师图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-input
            v-model="changeTeacherTeamPanel.introduction"
            type="textarea"
            placeholder="请输入教师描述"
            maxlength="100"
            rows="2"
            show-word-limit
          />
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureChangeTeacherTeam">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideTeacherTeamBabyPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- ++++++++++++++++++++++++++++++++++++++++++++++园区展示配置++++++++++++++++++++++++++++++++++++++++++++++ -->
    <div class="gardenShowConfig">
      <div class="tableBackGroundDiv">
        <div style="width: 100%;height: 10%;" />
        <div style="width: 100%;height: 10%;">
          <el-row style="width: 100%;height: 100%;">
            <el-col :span="4" :offset="16" style="width: 100%;height: 100%;">
              <el-button type="primary" size="medium " style="width: 20%;height: 65%;" @click="showAddSchoolShowPanel">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <div style="width: 100%;height: 80%;">
          <!-- 表格 -->
          <div class="tableDivOne">
            <div class="tableDivTwo">
              <el-table :data="schoolShowData.tableData" style="width: 100%">
                <el-table-column prop="elementId" label="编号" />
                <el-table-column prop="elementContent" label="图片">
                  <template slot-scope="scope">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="require(scope.row.elementContent)"
                      :preview-src-list="[scope.row.elementContent]"
                      :fit="fit"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="elementCtime" :formatter="formatterCtime" label="上传时间" />
                <el-table-column prop="userId" label="操作">
                  <template slot-scope="scope">
                    <el-button type="success" @click="showChangeSchoolShowPanel(scope.row)">修改</el-button>
                    <el-popconfirm
                      confirm-button-text="好的"
                      cancel-button-text="不用了"
                      icon="el-icon-info"
                      icon-color="red"
                      title="确定禁止吗？"
                      class="popconfirm"
                      @confirm="enterDelSchoolShow(scope.row)"
                    >
                      <el-button slot="reference" type="danger" @click="delSchoolShow(scope.row)">删除</el-button>
                    </el-popconfirm>

                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传面板 -->
    <el-dialog title="上传园区展示图" :visible.sync="addSchoolShowPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="addSchoolShowImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将园区图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureAddSchoolShow">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hideAddSchoolShowPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 修改面板 -->
    <el-dialog title="修改园区展示图" :visible.sync="changeSchoolShowPanel.show">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="12">
          <el-upload
            class="upload-demo"
            :file-list="imgUpload.list"
            :action="imgUpload.action"
            :on-success="changeSchoolShowImgSuccess"
            drag
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将园区图片拖到此处，或<em>点击上传</em></div>
          </el-upload>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="sureChangeSchoolShow">确认</el-button>
          <br>
          <el-button type="primary" style="width: 100%; margin-top: 10px" @click="hidechangeSchoolShowPanel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import util from '@/utils/Utils.js'
// ==========================================明星宝宝=========================================================
import { delStarBaby, updateStarBaby, addStarBaby, getStarBaby, uploadStarBabyImg } from '@/api/GardenEditApi'
// ==========================================师资力量=========================================================
import { delTeacherTeam, updateTeacherTeam, addTeacherTeam, getTeacherTeam, uploadTeacherTeamImg } from '@/api/GardenEditApi'
// ==========================================校园展示=========================================================
import { delSchoolShow, updateSchoolShow, addSchoolShow, getSchoolShow, uploadSchoolShowImg } from '@/api/GardenEditApi'
// ==========================================轮播图=========================================================
import { delSlideshow, updateSlideshow, addSlideshow, getSlideshow, uploadSlideshowImg } from '@/api/GardenEditApi'
// ==========================================园所简介=========================================================
import { updasteSchoolIntroduciton, getSchoolIntroduciton } from '@/api/GardenEditApi'
import DocmTable from "@/components/table/DocmTable.vue";
export default ({
  name: 'GardenEdit',
    components:{DocmTable},
  data: function() {
    return {
      schoolId: 0,
      // 图片上传
      imgUpload: {
        list: [],
        action: process.env.VUE_APP_BASE_URL + 'doUploadImg'
      },
      // 园所简介
      schIntroduction: {
        schoolIntroduction: ''
      },
      // 轮播图显示参数
      slideShowData: {
        tableData: null,
        delSign: false
      },
      // 添加轮播图参数
      addSlideShowPanel: {
        show: false,
        imgMd5: '',
        imgAddress: ''
      },
      // 修改轮播图参数
      changeSlideShowPanel: {
        show: false,
        imgMd5: '',
        imgAddress: '',
        elementId: 0
      },
      // 明星宝宝显示参数
      starBabyData: {
        tableData: null,
        delSign: false
      },
      // 添加明星宝宝参数
      addStarBabyPanel: {
        show: false,
        name: '',
        imgMd5: '',
        introduction: '',
        imgAddress: ''
      },
      // 修改明星宝宝参数
      changeStarBabyPanel: {
        show: false,
        name: '',
        imgMd5: '',
        introduction: '',
        imgAddress: '',
        elementId: 0
      },
      // 师资显示参数
      teacherTeamData: {
        tableData: null,
        delSign: false
      },
      // 添加师资参数
      addTeacherTeamPanel: {
        show: false,
        name: '',
        imgMd5: '',
        introduction: '',
        imgAddress: ''
      },
      // 修改师资参数
      changeTeacherTeamPanel: {
        shwo: false,
        name: '',
        imgMd5: '',
        introduction: '',
        imgAddress: '',
        elementId: 0
      },
      // 园区展示显示参数
      schoolShowData: {
        tableData: null
      },
      // 添加园区展示参数
      addSchoolShowPanel: {
        show: false,
        imgMd5: '',
        imgAddress: ''
      },
      // 修改园区展示参数
      changeSchoolShowPanel: {
        show: false,
        imgMd5: '',
        imgAddress: '',
        elementId: 0
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 初始化 获取幼儿园ID
    init() {
      this.schoolId = sessionStorage.getItem('schoolId')
      this.getSchoolIntroduciton()
      this.getSlideshow()
      this.getStarBaby()
      this.getSchoolShow()
      this.getTeacherTeam()
    },
    // ===============================================园所简介=============================================================
    // 获取园所简介
    getSchoolIntroduciton() {
      getSchoolIntroduciton({
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.schIntroduction.schoolIntroduction = resp.tokenMap.schoolIntroduction
        }
      })
    },
    // 修改园所简介
    updateSchoolIntroduction() {
      updasteSchoolIntroduciton({
        elementContent: this.schIntroduction.schoolIntroduction,
        elementType: 1,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getSchoolIntroduciton()
        }
      })
    },
    // ===============================================轮播图=============================================================
    // 获取轮播图信息
    getSlideshow() {
      getSlideshow({
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.slideShowData.tableData = resp.tokenMap.silideShowList
        }
      })
    },
    // =====================新增轮播图================================
    // 新增轮播图图片上传
    addSlideShowImgSuccess(resp, file, fileList) {
      this.addSlideShowPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadSlideshowImg({
        imgMd5: this.addSlideShowPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.addSlideShowPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认轮播图上传
    sureAddSlideshow() {
      addSlideshow({
        elementContent: this.addSlideShowPanel.imgAddress,
        elementType: 2,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.getSlideshow()
        }
      })
      this.addSlideShowPanel.show = false
    },
    // 打开新增轮播图面板
    showAddSlideShowPanel() {
      this.addSlideShowPanel.show = true
    },
    // 关闭新增轮播面板方法
    hideAddSlideShowPanel() {
      this.addSlideShowPanel.show = false
    },
    // =====================修改轮播图================================
    // 修改轮播图
    changeSlideShowImgSuccess(resp, file, fileList) {
      this.changeSlideShowPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadSlideshowImg({
        imgMd5: this.changeSlideShowPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.changeSlideShowPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认修改轮播图
    sureChangeSlideshow() {
      updateSlideshow({
        elementContent: this.changeSlideShowPanel.imgAddress,
        elementType: 2,
        elementId: this.changeSlideShowPanel.elementId,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getSlideshow()
        }
      })
      this.changeSlideShowPanel.show = false
    },
    // 打开修改轮播图面板
    showChangeSlideShowPanel(obj) {
      this.changeSlideShowPanel.show = true
      this.changeSlideShowPanel.elementId = obj.elementId
    },
    // 关闭修改轮播图面板
    hidechangeSlideShowPanel() {
      this.changeSlideShowPanel.show = false
    },
    // =====================删除轮播图================================
    // 删除轮播图
    enterDelSlideShow(obj) {
      this.slideShowData.delSign = true
      this.delSlideshow(obj)
    },
    delSlideshow(obj) {
      const elementId = obj.elementId
      if (this.slideShowData.delSign) {
        delSlideshow({
          elementId: elementId
        }).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getSlideshow()
            this.slideShowData.delSign = false
          }
        })
      }
    },
    // ============================================明星宝宝===========================================================
    // 获取明星宝宝信息
    getStarBaby() {
      getStarBaby({
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.starBabyData.tableData = resp.tokenMap.starBabyList
        }
      })
    },
    // =====================新增明星宝宝================================
    // 新增明星宝宝图片上传
    addStarBabyImgSuccess(resp, file, fileList) {
      this.addStarBabyPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadStarBabyImg({
        imgMd5: this.addStarBabyPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.addStarBabyPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认明星宝宝上传
    sureAddStarBaby() {
      addStarBaby({
        elementContent: this.addStarBabyPanel.imgAddress,
        remark: this.addStarBabyPanel.name + ';' + this.addStarBabyPanel.introduction,
        elementType: 3,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.getStarBaby()
        }
      })
      this.addStarBabyPanel.show = false
    },
    // 打开新增明星宝宝面板
    showAddStarBabyPanel() {
      this.addStarBabyPanel.show = true
    },
    // 关闭新增明星宝宝面板
    hideAddStarBabyPanel() {
      this.addStarBabyPanel.show = false
    },
    // =====================修改明星宝宝================================
    // 修改明星宝宝
    changeStarBabyImgSuccess(resp, file, fileList) {
      this.changeStarBabyPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadStarBabyImg({
        imgMd5: this.changeStarBabyPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.changeStarBabyPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认修改明星宝宝
    sureChangeStarBaby() {
      updateStarBaby({
        elementContent: this.changeStarBabyPanel.imgAddress,
        remark: this.changeStarBabyPanel.name + ';' + this.changeStarBabyPanel.introduction,
        elementType: 3,
        elementId: this.changeStarBabyPanel.elementId,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getStarBaby()
        }
      })
      this.changeStarBabyPanel.show = false
    },
    // 打开修改明星宝宝面板
    showChangeStarBabyPanel(obj) {
      this.changeStarBabyPanel.show = true
      this.changeStarBabyPanel.elementId = obj.elementId
    },
    // 关闭修改明星宝宝面板
    hidechangeStarBabyPanel() {
      this.changeStarBabyPanel.show = false
    },
    // ======================删除明星宝宝================================
    // 删除明星宝宝
    enterDelStarBaby(obj) {
      this.starBabyData.delSign = true
      this.delStarBaby(obj)
    },
    delStarBaby(obj) {
      const elementId = obj.elementId
      if (this.starBabyData.delSign) {
        delStarBaby({
          elementId: elementId
        }).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getStarBaby()
            this.starBabyData.delSign = false
          }
        })
      }
    },
    // ============================================师资力量=======================================================
    // 获取师资力量信息
    getTeacherTeam() {
      getTeacherTeam({
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.teacherTeamData.tableData = resp.tokenMap.starBabyList
        }
      })
    },
    // =====================新增师资力量================================
    // 新增师资力量图片上传
    addTeacherTeamImgSuccess(resp, file, fileList) {
      this.addTeacherTeamPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadTeacherTeamImg({
        imgMd5: this.addTeacherTeamPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.addTeacherTeamPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认师资力量上传
    sureAddTeacherTeam() {
      addTeacherTeam({
        elementContent: this.addTeacherTeamPanel.imgAddress,
        remark: this.addTeacherTeamPanel.name + ';' + this.addTeacherTeamPanel.introduction,
        elementType: 4,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.getTeacherTeam()
        }
      })
      this.addTeacherTeamPanel.show = false
    },
    // 打开新增师资力量面板
    showAddTeacherTeamPanel() {
      this.addTeacherTeamPanel.show = true
    },
    // 关闭新增师资力量面板
    hideAddTeacherTeamPanel() {
      this.addTeacherTeamPanel.show = false
    },

    // =====================修改师资力量================================
    // 修改师资力量
    changeTeacherTeamImgSuccess(resp, file, fileList) {
      this.changeTeacherTeamPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadTeacherTeamImg({
        imgMd5: this.changeTeacherTeamPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.changeTeacherTeamPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认修改师资力量
    sureChangeTeacherTeam() {
      updateTeacherTeam({
        elementContent: this.changeTeacherTeamPanel.imgAddress,
        remark: this.changeTeacherTeamPanel.name + ';' + this.changeTeacherTeamPanel.introduction,
        elementType: 4,
        elementId: this.changeTeacherTeamPanel.elementId,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getTeacherTeam()
        }
      })
      this.changeTeacherTeamPanel.show = false
    },
    // 打开修改师资力量面板
    showChangeTeacherTeamPanel(obj) {
      this.changeTeacherTeamPanel.show = true
      this.changeTeacherTeamPanel.elementId = obj.elementId
    },
    // 关闭修改师资力量面板
    hideChangeTeacherTeamPanel() {
      this.changeTeacherTeamPanel.show = false
    },
    // ======================删除师资力量================================
    // 删除师资力量
    enterDelTeacherTeam(obj) {
      this.teacherTeamData.delSign = true
      this.delTeacherTeam(obj)
    },
    delTeacherTeam(obj) {
      const elementId = obj.elementId
      if (this.teacherTeamData.delSign) {
        delTeacherTeam({
          elementId: elementId
        }).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getTeacherTeam()
            this.teacherTeamData.delSign = false
          }
        })
      }
    },
    // ====================================园区展示=============================================
    // 获取园区展示信息
    getSchoolShow() {
      getSchoolShow({
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.schoolShowData.tableData = resp.tokenMap.starBabyList
        }
      })
    },
    // =====================新增园区展示================================
    // 新增园区展示图片上传
    addSchoolShowImgSuccess(resp, file, fileList) {
      this.addSchoolShowPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadSchoolShowImg({
        imgMd5: this.addSchoolShowPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.addSchoolShowPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认园区展示上传
    sureAddSchoolShow() {
      addSchoolShow({
        elementContent: this.addSchoolShowPanel.imgAddress,
        elementType: 5,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '新增成功',
            type: 'success'
          })
          this.getSchoolShow()
        }
      })
      this.addSchoolShowPanel.show = false
    },
    // 打开新增园区展示面板
    showAddSchoolShowPanel() {
      this.addSchoolShowPanel.show = true
    },
    // 关闭新增园区展示面板
    hideAddSchoolShowPanel() {
      this.addSchoolShowPanel.show = false
    },
    // =====================修改园区展示 ================================
    // 修改园区展示
    changeSchoolShowImgSuccess(resp, file, fileList) {
      this.changeSchoolShowPanel.imgMd5 = resp.tokenMap.fileMd5
      uploadSchoolShowImg({
        imgMd5: this.changeSchoolShowPanel.imgMd5
      }).then((resp) => {
        if (resp.code === 200) {
          this.changeSchoolShowPanel.imgAddress = resp.tokenMap.imgAddress
          this.$message({
            message: '图片上传成功',
            type: 'success'
          })
        }
      })
    },
    // 确认修改园区展示
    sureChangeSchoolShow() {
      updateSchoolShow({
        elementContent: this.changeSchoolShowPanel.imgAddress,
        elementType: 5,
        elementId: this.changeSchoolShowPanel.elementId,
        schoolId: this.schoolId
      }).then((resp) => {
        if (resp.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.getSchoolShow()
        }
      })
      this.changeSchoolShowPanel.show = false
    },
    // 打开修改园区展示面板
    showChangeSchoolShowPanel(obj) {
      this.changeSchoolShowPanel.show = true
      this.changeSchoolShowPanel.elementId = obj.elementId
    },
    // 关闭修改园区展示面板
    hidechangeSchoolShowPanel() {
      this.changeSchoolShowPanel.show = false
    },
    // ======================删除园区展示================================
    // 删除园区展示
    enterDelSchoolShow(obj) {
      this.schoolShowData.delSign = true
      this.delSchoolShow(obj)
    },
    delSchoolShow(obj) {
      const elementId = obj.elementId
      if (this.schoolShowData.delSign) {
        delSchoolShow({
          elementId: elementId
        }).then((resp) => {
          if (resp.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getSchoolShow()
            this.schoolShowData.delSign = false
          }
        })
      }
    },

    formatterCtime(row, column, cellValue, index) {
      return util.formatTime(cellValue)
    },
    formatterContentOne(row, column, cellValue, index) {
      const arr = cellValue.split(';')
      return arr[0]
    },
    formatterContentTwo(row, column, cellValue, index) {
      const arr = cellValue.split(';')
      return arr[1]
    }
  }
})
</script>

<style scoped lang="scss">
.gardenEdit{
  width: 100%;
display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: space-around;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: center;
        background-color: rgb(252,247,227);
}
//+++++++++++++++++++++++++++++++++++++++++++标题++++++++++++++++++++++++++++++++++++++
.title{
  width: 100%;
  height: 200px;
   background: url('~@/assets/garden_edit_images/title.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
  background-color: sandybrown;
}
//+++++++++++++++++++++++++++++++++++++++++++园所简介配置++++++++++++++++++++++++++++++++++++++
.gardenBriefConfig{
  width: 100%;
  height: 780px;
   background: url('~@/assets/garden_edit_images/garden_brief_config.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
  display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: center;
}
//+++++++++++++++++++++++++++++++++++++++++++l轮播图配置++++++++++++++++++++++++++++++++++++++
.slideshowConfig{
  width: 100%;
  height: 780px;
   background: url('~@/assets/garden_edit_images/slideshow_config.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
    display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: center;
}
//+++++++++++++++++++++++++++++++++++++++++++l明星宝宝配置++++++++++++++++++++++++++++++++++++++
.starBabyConfig{
  width: 100%;
  height: 780px;
   background: url('~@/assets/garden_edit_images/star_baby_config.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
    display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: center;
}
//+++++++++++++++++++++++++++++++++++++++++++师资团队++++++++++++++++++++++++++++++++++++++
.teacherTeamConfig{
  width: 100%;
  height: 780px;
   background: url('~@/assets/garden_edit_images/teacher_team_config.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
    display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: center;
}
//++++++++++++++++++++++++++++++++++++++++园区展示配置++++++++++++++++++++++++++++++++++++++
.gardenShowConfig{
  width: 100%;
  height: 780px;
   background: url('~@/assets/garden_edit_images/garden_show_config.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
    display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: center;
}
//++++++++++++++++++++++++++++++++++++++++表格背景框++++++++++++++++++++++++++++++++++++++
.tableBackGroundDiv{
  width: 80%;
  height: 70%;
   background: url('~@/assets/garden_edit_images/table_background.png');
 background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
}
.tableDivOne{
width: 100%;
height: 80%;
display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: flex-start;
}
.tableDivTwo{
width: 80%;
height: 100%;
display: flex;
				/*row=横向靠左摆放 column=纵向摆放*/
				flex-direction: row;
				/*div中元素是否换行，元素默认不换行nowarp，warp换行*/
				flex-wrap: wrap;
				/*div中内容的对齐 center居中对齐 flex-start：从左往右对齐，默认 flex-end：从右往左对齐、 space-around：平铺，间隙平均*/
				justify-content: center;
				/*center居中对齐flex-start：从上往下对齐，默认flex-end：从上往下对齐、 baseline：按文字对齐*/
				align-items: flex-start;
}

</style>
