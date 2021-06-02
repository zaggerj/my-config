<template>
  <div id="home">
    <el-row>
      <el-button size="small" @click="handleCreated">创建账号</el-button>
      <el-button size="small" @click="handleRedact" :disabled=flag3>编辑</el-button>
      <el-button size="small" :disabled=flag4 @click="dialogPassVisible = true">密码重置</el-button>
      <el-button size="small" :disabled=flag5 @click="dialogDelVisible = true">删除</el-button>
      <div class="mohu">
        <el-input el-input placeholder="请输入内容" v-model="input1" class="input-with-select" >
        </el-input>
        <!-- <el-button slot="append" icon="el-icon-search" @click="handleMohu"></el-button> -->
      </div>
      
    </el-row>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @select = "handleSelect"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column sortable prop="account" label="账号"></el-table-column>
      <el-table-column sortable prop="typeAccount" label="账号类型" width="120">
      </el-table-column>
      <el-table-column sortable prop="name" label="姓名"></el-table-column>
      <el-table-column sortable prop="sex" label="性别"></el-table-column>
      <el-table-column
        sortable
        prop="email"
        label="邮箱"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column sortable prop="tel" label="电话"></el-table-column>
      <el-table-column
        sortable
        prop="userRole"
        label="组织角色"
      ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total,sizes, prev, pager, next"
      :total=total>
    </el-pagination>

    <!-- 创建账号 編輯 -->
    <el-dialog :title="title" class="creatList" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="账号"  prop="account">
          <el-input :disabled=isAccount v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass" required>
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
             placeholder="6-20位字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
             placeholder="6-20位字符"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="2-20位字符"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="1">
              男
            </el-radio>
            <el-radio label="0">
              女
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel">
          <el-input v-model.number="ruleForm.tel" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 密码重置 -->
    <el-dialog title="密码重置" class="replacePass" :visible.sync="dialogPassVisible">
      <div>
        <div>本次操作将重置所选服务账号的登录密码（{{choseRow[0] && choseRow[0].pass || ""}}）!</div>
        <div class="replacePass_input">
          <span>需进行第二次确认，请输入"ok":</span>
          <el-input v-model="input2"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="sureBtn1" :disabled = flag @click="handlePass">确 定</el-button>
        <el-button @click="dialogPassVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="删除" class="replacePass" :visible.sync="dialogDelVisible">
      <div>
        <div>本次操作将删除所选服务账号!</div>
        <div class="replacePass_input">
          <span>需进行第二次确认，请输入"ok":</span>
          <el-input v-model="input3"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button class="sureBtn3" :disabled = flag2 @click="handleDel">确 定</el-button>
        <el-button @click="dialogDelVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as mockApi from '../../api/api.js'
export default {
  name: "Home",
  data() {
    return {
      tableDataLists:[],
      tableDataList:[],
      dialogFormVisible: false,
      dialogPassVisible: false,
      dialogDelVisible: false,
      multipleSelection: [],
      isAccount:false,
      flag: true,
      flag2:true,
      flag3:true,
      flag4:true,
      flag5:true,
      input1:'',
      input2:'',
      input3:'',
      title:'',
      numNow:10,
      pageCount:1,
      choseRow:[],
      ruleForm: {
        account: "",
        pass: "",
        checkPass: "",
        name: "",
        sex: "1",
        email: "",
        tel: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [
          { validator: this.validatePass, trigger: "blur" },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }],
        name: [
          { required: true, message: "请输入姓名", trigger: "change" },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        tel: [{ required: true, trigger: "blur", validator: this.validPhone }],
      },
    };
  },

  created() {
    this.handleApi()
  },
  methods: {
    handleApi() {
      mockApi.getItemList().then((res) => {
        this.tableDataList = res.data.userTableData;
        for(let i = 0; i< res.data.userTableData.length;i++){
          if(res.data.userTableData[i].sex == 0){
            this.tableDataList[i].sex = '男'
          }else{
            this.tableDataList[i].sex = '女'
          }
        }
        this.tableDataLists = this.tableDataList
        
      }).catch((err) => {
        console.log(err);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改每页多少条时触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.numNow = val
    },
    // 修改当前页时触发
    handleCurrentChange(val) {
      this.pageCount = val
    },
    // 密码校验
    validatePass(rule, value, callback) {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    },
    // 第二次输入密码校验
    validatePass2(rule, value, callback) {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    },
    // 电话校验
    validPhone(rule, value, callback) {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!this.isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    },
    // 电话正则校验
    isvalidPhone(str) {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      return reg.test(str);
    },
    // 提交新建数据
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          for(let i = 0 ; i < this.tableDataLists.length;i++){
            if(this.tableDataLists[i].name == this.ruleForm.name){
              this.tableDataLists[i] = this.ruleForm
              this.dialogFormVisible = false;
              return
            }
          }
          this.dialogFormVisible = false;
          this.ruleForm.typeAccount='特殊账号'
          this.ruleForm.userRole='1'
          this.tableDataList.push(this.ruleForm)
        } else {
          return false;
        }
      });
    },
    // 获取当前列表
    handleSelect(selection) {
      this.choseRow = selection
    },
    // 删除
    handleDel() {
      for(let i = 0 ; i < this.tableDataLists.length;i++) {
        for(let j = 0; j < this.choseRow.length;j++){
          if(this.tableDataLists[i] == this.choseRow[j]){
            this.tableDataList.splice(i+(this.pageCount-1)*this.numNow, 1)
            this.handleCurrentChange(this.pageCount)
          }
        }
      }
      this.dialogDelVisible = false
    },
    // 密码重置
    handlePass() {
      this.choseRow[0].pass = this.generateMixed(10)
      this.dialogPassVisible = false
    },
    // 随机生成密码
    generateMixed(n) {
      var str = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var res = "";
      for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += str[id];
      }
      return res;
    },
    // 創建賬號
    handleCreated() {
      this.dialogFormVisible = true
      this.title = '创建账号'
      this.isAccount = false
      this.ruleForm = {}
    },
    // 编辑
    handleRedact() {
      this.dialogFormVisible = true
      this.title = '编辑'
      this.isAccount = true
      this.ruleForm = this.choseRow[0]
      this.ruleForm.checkPass = this.ruleForm.pass
    },
    // 取消
    cancel() {
      this.handleApi()
      this.dialogFormVisible = false
    },
    // 模糊查询
    // handleMohu() {
    //   let arr = []
    //   for(let i = 0 ; i < this.tableDataLists.length;i++){
    //     if(this.tableDataLists[i].account.split(this.input1).length>1 || this.tableDataLists[i].name.split(this.input1).length>1|| this.tableDataLists[i].email.split(this.input1).length>1){
    //       arr.push(this.tableDataLists[i])
    //     }
    //   }
    //   console.log(arr)
    //   if(this.input1==' '){
    //     this.tableDataList = this.tableDataLists
    //   }else{
    //     this.tableDataList = arr
    //   }

    
    // }
  },
  watch:{
    input2: function() {
      if(this.input2 == 'ok'){
        this.flag = false
      }else{
        this.flag = true
      }
    },
    input3: function() {
      if(this.input3 == 'ok'){
        this.flag2 = false
      }else{
        this.flag2 = true
      }
    },
    multipleSelection: function(){
      if(this.multipleSelection.length ==0){
        this.flag3 = true
        this.flag4 = true
        this.flag5 = true
      }else if(this.multipleSelection.length == 1) {
        this.flag3 = false
        this.flag4 = false
        this.flag5 = false
      }else if(this.multipleSelection.length >1){
        this.flag3 = true
        this.flag4 = true
        this.flag5 = false
      }
    },


  },
  computed: {
    tableData: function () {
      let all = this.tableDataLists, temp = [];
      if (this.input1) {
        for(let i = 0 ; i < all.length;i++){
          if(this.tableDataLists[i].account.split(this.input1).length>1 || this.tableDataLists[i].name.split(this.input1).length>1|| this.tableDataLists[i].email.split(this.input1).length>1){
            temp.push(all[i])
          }
        }
        // temp = all.filter(item => {
        //   item.account.indexOf(input)>-1||item.name.indexOf(input)>-1||item.email.indexOf(input)>-1
        // });
      } else {
        temp = all
      }
      return temp.slice((this.pageCount-1)*this.numNow,(this.pageCount-1)*this.numNow+this.numNow)
    },
    total: function() {
      let all = this.tableDataLists, temp = [];
      if (this.input1) {
        for(let i = 0 ; i < all.length;i++){
          if(this.tableDataLists[i].account.split(this.input1).length>1 || this.tableDataLists[i].name.split(this.input1).length>1|| this.tableDataLists[i].email.split(this.input1).length>1){
            temp.push(all[i])
          }
        }
      } else {
        temp = all
      }
      return temp.length
    }

  },
  
};
</script>

<style scoped>
#home {
  padding: 40px 20px;
}
#home .el-row .mohu {
  width: 300px;
  float: right;
}
#home .el-row .mohu .el-input {
  width: 150px;
}
#home /deep/ .creatList .el-dialog {
  border-radius: 10px;
}
#home /deep/ .creatList .el-dialog .el-dialog__body {
  padding: 30px 170px;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
#home /deep/ .creatList .el-dialog .el-dialog__body .el-form-item__label {
  width: 80px;
}
#home /deep/ .creatList .el-dialog .el-dialog__body .el-form-item__content {
  margin-left: 80px;
}
#home .replacePass /deep/ .el-dialog__body{
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
#home .replacePass /deep/ .el-dialog__body .el-input{
  width: 200px;
}
#home .replacePass /deep/ .el-dialog__body .replacePass_input{
  padding: 20px 0;
}
#home .replacePass /deep/ .el-dialog__body .replacePass_input :first-child{
  padding-right: 30px;
}
#home .replacePass /deep/ .sureBtn2{
  display: none;
}
#home .replacePass /deep/ .sureBtn4{
  display: none;
}
</style>
