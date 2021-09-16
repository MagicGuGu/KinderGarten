<template>
  <div>
    <div class="main">
      <el-row type="flex" justify="center" align="middle" class="mylayout">
        <el-card class="box-card">
          <el-row :gutter="15">
            <el-form
              ref="elForm"
              :model="formData"
              :rules="rules"
              size="medium"
              label-width="100px"
              label-position="left"
            >
              <el-col :span="16" :offset="4">
                <img
                  class="option"
                  src="~@/assets/apply_images/title.png"
                  alt=""
                />
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label-width="120px"
                  label="幼儿园名称："
                  prop="schoolName"
                >
                  <el-input
                    v-model="formData.schoolName"
                    placeholder="请输入幼儿园名称："
                    clearable
                    :style="{ width: '100%' }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人姓名：" prop="legalPerson">
                  <el-input
                    v-model="formData.legalPerson"
                    placeholder="请输入法人姓名："
                    clearable
                    :style="{ width: '100%' }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label-width="120px"
                  label="法人身份证："
                  prop="legalPersonCard"
                >
                  <el-input
                    v-model="formData.legalPersonCard"
                    placeholder="请输入法人身份证："
                    clearable
                    :style="{ width: '100%' }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" prop="contactPhone">
                  <el-input
                    v-model="formData.contactPhone"
                    placeholder="请输入联系电话："
                    clearable
                    :style="{ width: '100%' }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label-width="120px"
                  label="幼儿园地址："
                  prop="schoolAddress"
                >
                  <el-input
                    v-model="formData.schoolAddress"
                    placeholder="请输入幼儿园地址："
                    clearable
                    :style="{ width: '80%' }"
                  />
                  <el-button
                    circle
                    @click="showMap"
                    icon="el-icon-location"
                    style="margin-left:5px"
                    ></el-button
                  >
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系邮箱：" prop="contactEmail">
                  <el-input
                    v-model="formData.contactEmail"
                    placeholder="请输入联系邮箱："
                    clearable
                    :style="{ width: '100%' }"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="办学许可证" prop="schoolPermit" required>
                  <el-upload
                    ref="schoolPermit"
                    :file-list="schoolPermitfileList"
                    :action="schoolPermitAction"
                    :before-upload="schoolPermitBeforeUpload"
                    :on-success="handleSuccess"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="卫生许可证" prop="sanitaryPermit" required>
                  <el-upload
                    ref="sanitaryPermit"
                    :file-list="sanitaryPermitfileList"
                    :action="sanitaryPermitAction"
                    :before-upload="sanitaryPermitBeforeUpload"
                    :on-success="handleSuccess"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="消防许可证" prop="firePermit" required>
                  <el-upload
                    ref="firePermit"
                    :file-list="firePermitfileList"
                    :action="firePermitAction"
                    :before-upload="firePermitBeforeUpload"
                    :on-success="handleSuccess"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="组织代码证"
                  prop="organizationCode"
                  required
                >
                  <el-upload
                    ref="organizationCode"
                    :file-list="organizationCodefileList"
                    :action="organizationCodeAction"
                    :before-upload="organizationCodeBeforeUpload"
                    :on-success="handleSuccess"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="税务登记证"
                  prop="taxRegistrationCertificate"
                  required
                >
                  <el-upload
                    ref="taxRegistrationCertificate"
                    :file-list="taxRegistrationCertificatefileList"
                    :action="taxRegistrationCertificateAction"
                    :before-upload="taxRegistrationCertificateBeforeUpload"
                    list-type="picture"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item size="large" label-width="0px">
                  <el-button
                    type="primary"
                    style="width: 100%"
                    size="small"
                    @click="submitForm"
                  >
                    提交
                  </el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-card>
      </el-row>
    </div>

    <el-dialog
      title="选择幼儿园所在的地址"
      :visible.sync="dialogAreaMapVisible"
      center
    >
      <el-row type="flex" align="center">
        <div id="mymap">
          <baidu-map id="mymap" @ready="initMap" :scroll-wheel-zoom="true">
          </baidu-map>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogAreaMapVisible = false">取 消</el-button>
          <el-button type="primary" @click="doFillArea">确 定</el-button>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Apply",
  components: {},
  props: [],
  data() {
    return {
      formData: {
        schoolName: undefined,
        legalPerson: undefined,
        legalPersonCard: undefined,
        contactPhone: undefined,
        schoolAddress: undefined,
        contactEmail: undefined,
        schoolPermit: null,
        sanitaryPermit: null,
        firePermit: null,
        organizationCode: null,
        taxRegistrationCertificate: null,
        
      },
      dialogAreaMapVisible: false,
       location: {
        lng: 119.303434,
        lat: 26.28,
      },
      rules: {
        schoolName: [
          {
            required: true,
            message: "请输入幼儿园名称：",
            trigger: "blur",
          },
        ],
        legalPerson: [
          {
            required: true,
            message: "请输入法人姓名：",
            trigger: "blur",
          },
        ],
        legalPersonCard: [
          {
            required: true,
            message: "请输入法人身份证：",
            trigger: "blur",
          },
        ],
        contactPhone: [
          {
            required: true,
            message: "请输入联系电话：",
            trigger: "blur",
          },
        ],
        schoolAddress: [
          {
            required: true,
            message: "请输入幼儿园地址：",
            trigger: "blur",
          },
        ],
        contactEmail: [
          {
            required: true,
            message: "请输入联系邮箱：",
            trigger: "blur",
          },
        ],
      },
      schoolPermitAction: process.env.VUE_APP_BASE_URL+"doUploadImg",
      schoolPermitfileList: [],
      sanitaryPermitAction: process.env.VUE_APP_BASE_URL+"doUploadImg",
      sanitaryPermitfileList: [],
      firePermitAction: process.env.VUE_APP_BASE_URL+"doUploadImg",
      firePermitfileList: [],
      organizationCodeAction: process.env.VUE_APP_BASE_URL+"doUploadImg",
      organizationCodefileList: [],
      taxRegistrationCertificateAction:
        "https://jsonplaceholder.typicode.com/posts/",
      taxRegistrationCertificatefileList: [],
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
   initMap: function ({ BMap, map }) {
      this.point = new BMap.Point(this.location.lng, this.location.lat);
      //   let cityControl = new BMap.CityListControl({
      //     offset: new BMap.Size(10, 5),
      //   });
      //   // 城市列表控件
      //   map.addControl(cityControl);
      let marker = new BMap.Marker(this.point);
      map.addOverlay(marker); // 将标注添加到地图中
      map.centerAndZoom(this.point, 10);
      // 开启鼠标滚轮缩放
      map.enableScrollWheelZoom(true);
      // 鱼骨图
      map.addControl(new BMap.NavigationControl());
      // 创建信息窗口
      const infoWindow = new BMap.InfoWindow();
      map.openInfoWindow(infoWindow);
      // 添加地图类型控件（右上角）
      // map.addControl(new BMap.MapTypeControl());
      // 添加带有定位的导航控件
      let navigationControl = new BMap.NavigationControl();
      map.addControl(navigationControl);
      // 添加定位控件
      var geolocationControl = new BMap.GeolocationControl();
      // 开启SDK辅助定位
      //   geolocationControl.enableSDKLocation();
      console.log(geolocationControl);
      geolocationControl.addEventListener("locationSuccess", function (e) {
        // 定位成功事件
        let address = "";
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        console.log(e);

        alert("当前定位地址为：" + address);
      });

      geolocationControl.addEventListener("locationError", function (e) {
        // 定位失败事件
        alert(e.message);
      });
      map.addControl(geolocationControl);
      map.addEventListener("click", function (e) {
        alert("点击位置经纬度：" + e.Ag.lng + "," + e.Ag.lat);
      });
      //   geolocation.getCurrentPosition((r) => {
      //     if (r.point) {
      //       this.location.lng = r.point.lng;
      //       this.location.lat = r.point.lat;
      //     }
      //     var mk = new BMap.Marker(r.point);
      //     map.addOverlay(mk);
      //     map.panTo(r.point);
      //     alert("定位成功")
      //     map.centerAndZoom(r.point, 16);
      //   });
      //   // 创建定位控件
      //   var locationControl = new BMap.LocationControl({
      //     // 控件的停靠位置（可选，默认左上角）
      //     anchor: 'BMAP_ANCHOR_TOP_RIGHT',
      //     // 控件基于停靠位置的偏移量（可选）
      //     offset: new BMap.Size(20, 20),
      //   });
      //   // 将控件添加到地图上
      //   map.addControl(locationControl);
    },
    doFillArea(){},
    handleSuccess(resp,file,fileList){
      console.log(resp,file,fileList);
    },
    showMap() {
      this.dialogAreaMapVisible = true;
    },
    submitForm() {
      // this.$refs["elForm"].validate((valid) => {
      //   if (!valid) return;
      // });
      console.log(1);
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    schoolPermitBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    sanitaryPermitBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    firePermitBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    organizationCodeBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    taxRegistrationCertificateBeforeUpload(file) {
      const isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
  },
};
</script>
<style lang="scss" scoped>
#applyInTerface {
  height: 100%;
  width: 100%;
}

/* 卡片区域 */
.main {
  width: 100%;
  height: 100%;
  background-image: url(~@/assets/apply_images/background.png);
  background-size: 100% 100%; /* 使图片平铺满整个浏览器（从宽和高的最大需求方面来满足，会使某些部分无法显示在区域中） */
  background-position: center 0;
  background-repeat: no-repeat;
}

.title {
  width: 20%;
  height: 10%;
}
.mylayout {
  width: 100%;
  height: 100%;
}
.box-card {
  width: 60%;
}
.el-upload__tip {
  line-height: 1.2;
}
.option {
  width: 100%;
  height: 70px;
}
#mymap {
  height: 350px;
  width: 700px;
}
</style>
