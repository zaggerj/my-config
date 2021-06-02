<template>
  <div id="fromDialog">
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="form.name"
            placeholder="2-20位字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="form.describe"
            placeholder="最大30位字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="功能权限" required>
          <el-table :data="tableData" :show-header="false" style="width: 100%" >
            <el-table-column label="大类" width="180">
              <template slot-scope="scope">
                <el-checkbox
                  @change="handleAllCheck(scope.row)"
                  :label="scope.row.name"
                  v-model="scope.row.checked"
                  :indeterminate="scope.row.indeterminate"
                  >{{ scope.row.name }}</el-checkbox
                >
              </template>
            </el-table-column>
            <el-table-column label="小类">
              <template slot-scope="scope">
                <el-checkbox-group v-model="scope.row.checkedCities">
                  <el-checkbox v-for="item in scope.row.cityOptions" @change="handleCheckedChange(scope.row)" :label="item" :key="item">{{ item }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleOpen">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "FromDialog",
  data() {
    return {
      title: "新增",
      dialogFormVisible: false,
      form: {
        name:'',
        describe:'',
        bigtype:[],
        smalltype:[],
        big:''
      },
      /** 回显
       * arr = [];
       * data.forEach((item) => {
        //大类
        let child = item.cityOptions;
        if (arr.includes(item.key)) {
            // 小类
            item.checkAll
            child.forEach((c) => {
              if (arr.includes(item.key)) {
                // 如果存在就放在checkedCities
              }
            })
        }
      })
       */
      
      tableData: [
        {
          id:1,
          name: "概览",
          checkedCities: [],
          indeterminate: false,
          checkAll: false,
          cityOptions: [],
        },
        {
          id:2,
          name: "运维管理",
          checkedCities: [],
          indeterminate: false,
          checkAll: false,
          cityOptions: ["终端管理", "桌面控制","文件分发","策略管理"],
        },
        {
          id:3,
          name: "课表管理",
          checkedCities: [],
          indeterminate: false,
          checkAll: false,
          cityOptions: ["学期设置", "课表编排","课表展示","删除日志","专项上机"],
        },
        {
          id:4,
          name: "预约上机",
          checkedCities: [],
          indeterminate: false,
          checkAll: false,
          cityOptions: [],
        },
      ],
      rules:{
        name: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
      },
    };
  },
  methods: {
    // 半选
    handleCheckedChange(value) {
      let count = value.cityOptions.length
      value.checked = (count === value.checkedCities.length) ? true : false;
      this.form.smalltype.push(...value.checkedCities)
      value.indeterminate = value.checkedCities.length > 0 && value.checkedCities.length < value.cityOptions.length
      if(value.indeterminate){
        this.form.bigtype.push(value.name)
      }
      this.form.bigtype = [...new Set(this.form.bigtype)]
      this.form.big = this.form.bigtype.join(',')
    },
    // 全选 =》 menu 循环设置子菜单跟父菜单是一样的
    handleAllCheck(val) {
      val.checkedCities = val.checked ? val.cityOptions : []
      if(val.checked){
        this.form.bigtype.push(val.name)
      }else{
        this.form.bigtype.splice(this.form.bigtype.indexOf(val.name),1)
      }
      this.form.big=this.form.bigtype.join(',')
      val.indeterminate = false
    },
    // 父组件传递过来的方法
    parentMsg(msg,temp) {
      console.log(temp)
      if (msg == "1") {
        this.title = "新增";
        this.dialogFormVisible = true;
        this.resetForm()
      } else {
        this.title = "编辑";
        this.dialogFormVisible = true;
        this.resetForm()
        this.form = temp
        // 将选中按钮进行赋值
        // 大类小类合并
        let allType = [...temp.bigtype, ...temp.smalltype]
        this.tableData.forEach((item) => {
          // 管理大类
          let childRow = item.cityOptions
          if(allType.includes(item.name)){
            // 大类选中
            item.checked = true
            childRow.forEach((c) => {
              if(allType.includes(c)){
                item.checkedCities.push(c)
              }
            })
          }
        });
      }
    },
    // 清空表格
    resetForm() {
      this.form.describe = "",
      this.form.name = "",
      this.form.big = "",
      this.form.bigtype = [],
      this.form.smalltype = []
      for(let i = 0;i < this.tableData.length;i++){
        this.tableData[i].checked = false
        this.tableData[i].checkedCities = []
        this.tableData[i].checkAll = false
        this.tableData[i].indeterminate = false
      }
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.title == "新增"){
            this.$emit("addList",this.form)
          }else{
            this.$emit("updataList",this.form)
          }
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消按钮
    handleOpen() {
      this.dialogFormVisible = false
    }
  },
};
</script>

<style lang="less" scoped>
/* @import "../../assets/css/base.css" */
#btnGroup {
  .el-row {
    .el-input-group {
      width: 250px;
      float: right;
    }
  }
}
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1;
}
</style>
