<template>
  <div id="news" class="clearfix">
    <div class="news_body">
      <div class="news_title">
        <p>新闻中心</p>
        <small>NEWS</small>
      </div>
      <div class="news_table">
        <el-table
          :data="tableDataList"
          border
          :show-header=false
          style="width: 100%">
          <el-table-column
            label="标题">
            <template slot-scope="scope">
              <a href="#">{{scope.row.test}}</a>
            </template>
          </el-table-column>
          <el-table-column
            label="新鲜新闻"
            width="70">
            <template slot-scope="scope">
              <img :src="scope.row.news" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="时间"
            width="200">
          </el-table-column>
        </el-table>
        <div class="btn_group clearfix">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total,prev, pager, next"
            :page-size=pageSize
            :total="total">
          </el-pagination>
          <el-button-group>
            <el-button :autofocus=true @click="changePage(5)">5</el-button>
            <el-button @click="changePage(10)">10</el-button>
            <el-button @click="changePage(20)">20</el-button>
            <el-button @click="changePage(30)">30</el-button>
          </el-button-group>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import * as mockApi from '../../../api/api.js'
export default {
  name: "News",
  props: {
    msg: String,
  },
  data() {
    return {
      pageSize:10,
      pageCurrent:1,
      total:0,
      ALLtable:[
        {
          test:'你好',
          news:require('../../../assets/imgs/new.png'),
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          news:require('../../../assets/imgs/new.png'),
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        },
        {
          test:'你好',
          time:'1975-10-31(新闻发布时间)'
        }
      ]
    };
  },
  created(){
    // this.handleApi()
    this.total = this.ALLtable.length
  },
  methods: {
    handleApi() {
      mockApi.getTableList().then((res) => {
        this.tableDataList = res.data.userTableData;
      }).catch((err) => {
        console.log(err);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pageCurrent = val
      console.log(`当前页: ${val}`);
    },
    changePage(num) {
      this.pageSize= num
    }
  },
  computed: {
    tableDataList: function() {
      return this.ALLtable.slice((this.pageCurrent-1)*this.pageSize,(this.pageCurrent-1)*this.pageSize+this.pageSize)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
a{
  text-decoration-line: none;
}
#news{
  .news_body{
    width: 1200px;
    margin: auto;
    .news_title{
      padding: 40px;
      p{
        color: #015595;
        font-size: 24px;
        display: flex;
        justify-content: center;
        margin: 5px;
      }
      small{
        color: #f2b100;
        font-size: 12px;
        display: flex;
        justify-content: center;
      }
    }
    .news_table{
      .btn_group{
        margin-top: 10px;
        .el-pagination{
          float: left;
        }
        .el-button-group{
          float: right;
        }
      }
    }
  }
}
#news /deep/ .el-table__row .el-table_1_column_1 .cell a {
  color: #2D8cF0;
}
#news /deep/ .el-table .cell{
  font-size: 12px;
}
#news /deep/ .el-table--border td, 
#news /deep/ .el-table--border th, 
#news /deep/ .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: none;
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
