<template>
  <div id="role">
    <div id="btnGroup">
      <el-row class="clearfix">
        <el-button @click="handleChange('1')">新增</el-button>
        <el-button :disabled=disabled1 @click="handleChange('2')">编辑</el-button>
        <el-button :disabled=disabled2 @click="handleChange('3')">删除</el-button>
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-row>
    </div>
    <role-table @toChose=toChose @pageSize="pageSize" @pageCurrent="pageCurrent" :input="input" :roleAllList="roleList"></role-table>
    <from-dialog :flag="flag" ref="child" @addList=addList @updataList=updataList></from-dialog>
  </div>
</template>

<script>
import RoleTable from "./childComps/RoleTable.vue"
import FromDialog from "./childComps/FromDialog.vue"

export default {
  name: "Role",
  components:{
    RoleTable,
    FromDialog,
  },
  created() {
    for(let i = 0; i<this.roleList.length;i++){
      this.roleList[i].big = this.roleList[i].bigtype.join(",")
    }
  },
  data() {
    return {
      input:'',
      flag:'',
      disabled1:true,
      disabled2:true,
      size:5,
      current:1,
      multipleSelection:[],
      roleList:[
        {
          name:'12',
          bigtype:['概览','运维管理','课表管理'],
          smalltype:['终端管理','学期设置'],
          adminCount:'3',
          describe:'1111'
        },
        {
          name:'23',
          bigtype:['概览'],
          smalltype:[],
          adminCount:'3',
          describe:'1111'
        },
        {
          name:'34',
          bigtype:['概览'],
          smalltype:[],
          adminCount:'3',
          describe:'1111'
        },
        {
          name:'45',
          bigtype:['概览'],
          smalltype:[],
          adminCount:'3',
          describe:'1111'
        },
        {
          name:'56',
          bigtype:['概览'],
          smalltype:[],
          adminCount:'3',
          describe:'1111'
        },
        {
          name:'67',
          bigtype:['概览'],
          smalltype:[],
          adminCount:'3',
          describe:'1111'
        },
      ]
    }
  },
  methods:{
    // 按钮点击事件
    handleChange(val) {
      if(val == '1'||val == '2'){
        this.$refs.child.parentMsg(val,this.multipleSelection[0]?JSON.parse(JSON.stringify(this.multipleSelection[0])):[]);
      }else{
        this.open()
      }
    },
    // 按钮状态
    toChose(val) {
      this.multipleSelection = val
      if(this.multipleSelection.length == 1){
        this.disabled1 = false
        this.disabled2 = false
      }else if(this.multipleSelection.length > 1){
        this.disabled1 = true
        this.disabled2 = false
      }else{
        this.disabled1 = true
        this.disabled2 = true
      }
    },
    // 存储当前页具有多少条数据
    pageSize(val) {
      this.size = val
    },
    // 存储当前页码
    pageCurrent(val){
      this.current = val
    },
    // 添加数据
    addList(val) {
      let obj = {}
      for( var key in val ){
        obj[key]=val[key]
      }
      this.roleList.push(obj)
    },
    // 更新数据
    updataList(val){
      // this.multipleSelection[0]=val;
      // 问题：modal单个数据和列表单个数据 
      for( var key in val ){
        this.multipleSelection[0][key]=val[key]
      }
    },
    // 删除按钮
    open() {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for(let i = 0; i < this.roleList.length;i++){
          for(let j = 0; j <this.multipleSelection.length;j++){
            if(this.multipleSelection[j].name == this.roleList[i].name){
              this.roleList.splice(i,1)
            } 
          }
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
};
</script>

<style lang="less" scoped>
/* @import "../../assets/css/base.css" */
#btnGroup{
  .el-row{
    .el-input-group{
      width: 250px;
      float: right;
    }
  }
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
.clearfix{
    *zoom: 1;
}

</style>
