<template>
  <div class="hello">
    <div class="top">
      <div class="top_left">
        <el-button @click="createAccount">创建账号</el-button>
        <el-button>编辑</el-button>
        <el-button @click="resetPassword">密码重置</el-button>
        <el-button @click="removeAccount">删除</el-button>
        <el-button><i class="el-icon-refresh-right"></i></el-button>
      </div>
      <div class="top_right">
        <el-input style="width:250px" v-model="hotSearchText" >
          <el-button slot="append" icon="el-icon-search" @click="hotSearch"></el-button>
        </el-input>
      </div>
    </div>
    <!-- 表格区域 -->
    <div class="main">
      <el-table 
        :data="message" 
        style="width:100%;" 
        border     
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="selectRow"
        ref="tableData"
        >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="accountType" label="账号类型"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="role" label="组织角色"></el-table-column>
      </el-table>
    </div>

    <!-- 分页区域 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        @current-change = "handleCurrentChange"
        >
      </el-pagination>
    </div>
    <!-- 对话框区域  -->

    <!-- 创建账号对话框 -->
    <el-dialog
      title="创建账号"
      :visible.sync="createAccountDialog"
      :before-close="quiteCreateAccount"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="25%"
    >
      <el-form :model="createAccountForm" :label-position="labelPosition" label-width="100px" :rules = "rules" ref="createForm">
        <el-form-item label="账号：" prop="account">
          <el-input v-model="createAccountForm.account" style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
            <el-input v-model="createAccountForm.password" style="width:300px" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="passwordV">
            <el-input v-model="createAccountForm.passwordV" style="width:300px" type="password">></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
            <el-input v-model="createAccountForm.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
            <el-radio v-model="createAccountForm.sex" label="男">男</el-radio>
            <el-radio v-model="createAccountForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
            <el-input v-model="createAccountForm.email" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="电话：" prop="tel">
          <el-input v-model="createAccountForm.tel" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div class="createAccountButtonBox">
        <el-button @click="quiteCreateAccount">取消</el-button>
        <el-button @click="submitCreateAccount">确定</el-button>
      </div>
    </el-dialog>

    <!-- 删除对话框 -->
    <el-dialog
      title="删除"
      :visible.sync="removeAccountDialog"
      :before-close="quitRemove"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="25%"
    >
      <p>本次操作将删除所选服务器账号！</p>
      <span>需进行二次确认，请输入"ok"</span>
      <el-input v-model="removeInputText" style="width:200px"></el-input>
      <div class="bottomButtonBox">
        <el-button @click="quitRemove">取消</el-button>
        <el-button @click="submitRemove">确认</el-button>
      </div>
    </el-dialog>

    <!-- 密码重置对话框 -->
    <el-dialog
      title="密码重置"
      :visible.sync="resetPasswordDialog"
      :before-close="quitReset"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="25%"
    >
      <p>本次操作将重置所选服务账号的登录密码！</p>
      <span>需进行二次确认，请输入"ok"</span>
      <el-input v-model="resetInputText" style="width:200px"></el-input>
      <div class="bottomButtonBox">
        <el-button @click="quitReset">取消</el-button>
        <el-button @click="submitReset">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.createAccountForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let emailBlur = (rule,value,callback)=>{
        let verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if (!verify.test(this.createAccountForm.email)) {
            callback(new Error('邮箱格式错误, 请重新输入'))
        }else if(value === ''){
            callback(new Error('邮箱不得为空'))
        } 
        else {
           callback()
        }
    }
    let phoneBlur = (rule,value,callback)=>{
      let verify = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/
       if (!verify.test(this.createAccountForm.tel)) {
            callback(new Error('手机格式错误, 请重新输入'))
        }else if(value === ''){
            callback(new Error('手机号不得为空'))
        } 
        else {
           callback()
        }
    }
    return {
      labelPosition:'right',
      rules:{
        account:[
          {required:true,message:'请输入账号',trigger:'blur'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password:[
           {required:true,message:'请输入账号',trigger:'blur'},
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        passwordV:[
          {required:true,validator:validatePass,trigger:'blur'}
        ],
        name:[
          {required:true,message:'请输入名字',trigger:'blur'},
          {min:2,max:4,message:'长度在3-4个字符',trigger:'blur'}
        ],
        sex:[
          {required:true,message:'请选择性别',trigger:'blur'}
        ],
        email:[
          {required:true,validator:emailBlur, trigger:'blur'}
        ],
        tel:[
          {required:true,validator:phoneBlur, trigger:'blur'}
        ]
      },
      tempData:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message2:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'},
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
     message3:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message4:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'},
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message5:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message6:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'},
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message7:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message8:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'},
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message9:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      message10:[
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'},
        {account:12455,accountType:'服务账号',name:'张三',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'4587887'},
        {account:56478,accountType:'服务账号',name:'李四',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7891234'},
        {account:15817,accountType:'服务账号',name:'王五',sex:'男',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'1233207'},
        {account:45632,accountType:'服务账号',name:'赵六',sex:'女',email:'1026864340@qq.com',tel:'13006325217',role:'成员',password:'7894512'}
      ],
      hotSearchText:'',                                             //模糊搜索输入的值
      createAccountDialog:false,                                    //创建账号的对话框
      removeAccountDialog:false,                                    //删除选中的账号
      resetPasswordDialog:false,                                    //重置密码对话框
      createAccountForm:{                                           //创建表单的form对象
        account:'',
        password:'',
        passwordV:'',
        name:'',
        sex:'',
        email:'',
        tel:''
      },
      removeInputText:'',                                            //删除时输入的文本
      resetInputText:'',                                             //重置密码的时候输入的文本
      selectedList:[],                                               //勾选中的对象数组
    }
  },
  methods:{
    // 创建账号
    createAccount(){
      this.createAccountDialog = true
    },
    //取消创建账号清除状态
    quiteCreateAccount(){
      this.createAccountForm = {
        account:'',
        password:'',
        passwordV:'',
        name:'',
        sex:'',
        email:'',
        tel:''
      }
      this.createAccountDialog = false
      this.$refs.createForm.clearValidate()
    },
    //确定创建账号
    submitCreateAccount(){
      // console.log(this.$refs.createForm.validate())
      if(this.$refs.createForm.validate()){
        // console.log(this.createAccountForm)
        this.$set(this.message,this.message.length,this.createAccountForm)
      }
      this.quiteCreateAccount()
    },
    //取消删除
    quitRemove(){
      this.removeInputText = '' //清空输入框中的数据
      this.removeAccountDialog = false //关闭删除对话框
    },
    //确定删除
    submitRemove(){
      if(this.removeInputText == 'ok'){
        console.log(this.selectedList)
        this.selectedList.forEach(item=>{
          if(this.message.includes(item)){
            let index = this.message.indexOf(item)
            this.message.splice(index,1)
          }
        })
        this.quitRemove()         //当执行完删除操作需要关闭弹窗
        this.selectedList = []
      }else{
        alert('您输入了错误的命令')
        this.removeInputText = ''
      }
    },
    //取消重置
    quitReset(){
      this.resetInputText = ''                //清空取消重置输入框中的内容
      this.resetPasswordDialog = false        //关闭重置对话框
    },
    //确定重置
    submitReset(){
      if(this.resetInputText == 'ok'){
       this.selectedList.forEach(item=>{
         if(this.message.includes(item)){
           let index = this.message.indexOf(item)
           this.message[index].password = this.passwordsRandomGeneration(item.password.length)
           console.log(this.message[index].password)
         }
       })
       this.quitReset() //重置完密码将窗口关闭
      }else{
        alert('您输入了错误的命令')
        this.resetInputText = ''
      }
    },
    // 删除选中的账号
    removeAccount(){
      this.removeAccountDialog = true
    },
    //模糊搜索
    hotSearch(){
      console.log(this.hotSearchText)
      // let res = []
      this.message.forEach(item=>{
        let values = Object.values(item)            //将所有item的value都拿到
        // let temp = item
        values.forEach(value=>{
          console.log(typeof(value))
          // if(value.indexOf(this.hotSearchText) !== -1){
          //   res.push(item)
          // }
        })
      })
      // this.message = res
    },
    //重置服务账号的密码
    resetPassword(){
      this.resetPasswordDialog = true
    },
    //点击改变页数
    handleCurrentChange(e){
      // console.log(this.$refs.tableData.$props.data)
      // console.log(eval(`this.message${e}`))
      if(e === 1 ){
        this.message = this.tempData
      }else{
        this.message = eval(`this.message${e}`)
      }
    },
    //点击勾选框的时候触发的函数
    selectRow(selection){
      this.selectedList = selection
    },
    //随机生成密码的函数
    passwordsRandomGeneration(pasLen){
      let pasArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9','_','-','$','%','&','@','+','!'];
      var password = '';
      var pasArrLen = pasArr.length;
      for (var i=0; i<pasLen; i++){
      var x = Math.floor(Math.random()*pasArrLen);
      password += pasArr[x];
      }
      return password
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    padding: 0 20px;
  }
  .top{
    display: flex;
    justify-content: space-between;
  }
  .main{
    margin-top: 20px;
  }
  .pagination{
    margin-top: 20px;
  }
  .bottomButtonBox{
    margin-top: 20px;
  }
</style>
