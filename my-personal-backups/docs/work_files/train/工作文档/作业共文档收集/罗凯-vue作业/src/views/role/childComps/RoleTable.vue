<template>
  <div id="roleTable">
    <el-table
      ref="multipleTable"
      :data="roleList"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name"
        sortable>
      </el-table-column>
      <el-table-column
        label="功能权限">
        <template slot-scope="scope">
          <span>{{scope.row.big}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="adminCount"
        sortable
        label="管理员数">
      </el-table-column>
      <el-table-column
        prop="describe"
        label="描述">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, prev, pager, next, sizes"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>

export default {
  name: "RoleTable",
  props:{
    roleAllList:{
      type:Array
    },
    input:{
      type:String
    }
  },
  data() {
    return{
      pageSize:5,
      pageCurrent:1,
    }
  },
  methods:{
    // 获取点击的行
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('toChose',val)
    },
    // 获取当前页所具有多少数据
    handleSizeChange(val) {
      this.pageSize = val
      this.$emit('pageSize',val)
    },
    // 获取当前页码
    handleCurrentChange(val) {
      this.pageCurrent = val
      this.$emit('pageCurrent',val)
    }
  },
  computed:{
    // 当每页数、页码、数据删除修改时进行数据更新
    roleList: function() {
      let arr = []
      if(this.input){
        for(let i = 0 ; i <this.roleAllList.length;i++){
          if(this.roleAllList[i].name.split(this.input).length>1){
            arr.push(this.roleAllList[i])
          }
        }
      }else{
        arr = this.roleAllList
      }
      return arr.slice((this.pageCurrent-1)*this.pageSize,(this.pageCurrent-1)*this.pageSize+this.pageSize)
    },
    // 当每页数、页码、数据删除修改时进行 total总数更新
    total: function() {
      let arr = []
      if(this.input){
        for(let i = 0 ; i <this.roleAllList.length;i++){
          if(this.roleAllList[i].name.split(this.input).length>1){
            arr.push(this.roleAllList[i])
          }
        }
      }else{
        arr = this.roleAllList
      }
      return arr.length
    }
  },
};
</script>

<style lang="less" scoped>
/* @import "../../assets/css/base.css" */

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
