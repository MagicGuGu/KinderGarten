<template>
  <div id="docmTable">
    <el-table
      :data="datas.datas"
      @selection-change="handleSelectionChange"
       style="width: 100%"
    >
      <el-table-column v-if="datas.isChecked" type="selection" width="55">
      </el-table-column>
      <el-table-column
        v-for="item in datas.theads"
        :key="item.key"
        :label="item.name"
        :prop="item.key"
        :width="item.width?item.width:null"
        :fixed="item.fixed?item.fixed:null"
      >
        <template slot-scope="scope">
         <el-row type="flex" v-if="cellBtn && scope.row[item.key].isBtn" >
            <el-button
              size="mini"
              :type="scope.row[item.key].type"
              @click="handleClick(scope.row[item.key].handle, scope.row)"
              >{{ scope.row[item.key].name }}
            </el-button>
          </el-row>
          <span  v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
      fixed="right"
      :width="editWidth">
        <template slot-scope="scope">
          <el-row type="flex">
            <el-button
              v-for="btn in datas.btns"
              :key="btn.id"
              size="mini"
              :type="btn.type"
              @click="handleClick(btn.handle, scope.row)"
              >{{ btn.name }}
            </el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "DocmTable",
  mounted() {
    if(this.datas.editColumnWidth){
      this.editWidth = this.datas.editColumnWidth;
    }
    if(this.datas.cellBtn){
      this.cellBtn = this.datas.cellBtn;
    }

  },
  props: ["datas"],
  data:function(){
    return {
      editWidth:300,
      cellBtn:false
    }
  },
  methods: {
    handleClick: function (event, row) {
      this.$emit(event, row);
    },
    handleSelectionChange: function (val) {
      this.$emit("handleSelectionChange", val);
    },
  },
};
</script>