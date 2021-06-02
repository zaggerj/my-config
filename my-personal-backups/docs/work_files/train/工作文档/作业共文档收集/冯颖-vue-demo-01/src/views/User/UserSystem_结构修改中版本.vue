<template>
    <div>
        <el-button type="text" @click="AddDialog = true" class="btn">添加</el-button>
        <el-dialog title="添加" :visible.sync="AddDialog">
            <el-form :model="form" :rules="rules">
                <el-form-item
                    label="角色名称"
                    prop="name"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="描述"
                    prop="describe"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.describe"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
          
          <el-table :data="checkboxArr" :show-header="false" style="width: 100%">  
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
                <el-checkbox-group v-model="scope.row.checkedBoxs">
                  <el-checkbox v-for="item in scope.row.boxOptions" @change="handleCheckedChange(scope.row)" :label="item" :key="item">{{ item }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddDialog = false">取 消</el-button>
                <el-button type="primary" @click="AddForm()">确 定</el-button>
            </div>
        </el-dialog>

        <el-button type="text" @click="getEditForm()" class="btn">编辑</el-button>
        <el-dialog title="编辑" :visible.sync="EditDialog">
            <el-form :model="form" :rules="rules">
                <el-form-item
                    label="角色名称"
                    prop="name"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="描述"
                    prop="describe"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.describe"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
          
          <el-table :data="checkboxArr" :show-header="false" style="width: 100%">  
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
                <el-checkbox-group v-model="scope.row.checkedBoxs">
                  <el-checkbox v-for="item in scope.row.boxOptions" @change="handleCheckedChange(scope.row)" :label="item" :key="item">{{ item }}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddDialog = false">取 消</el-button>
                <el-button type="primary" @click="EditForm()">确 定</el-button>
            </div>
        </el-dialog>

         <el-button type="text" @click="DeleteDialog=true" class="btn">删除</el-button>
        <el-dialog title="删除" :visible.sync="DeleteDialog">
         <el-form :model="form">
                <el-form-item label="本次操作将删除所有被选中的账户">
                </el-form-item>
                <el-form-item label="需进行二次确认，请输入ok"> </el-form-item>
                <el-input v-model="form.ifdelete" autocomplete="off"></el-input>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="AddDialog = false">取 消</el-button>
                <el-button type="primary" @click="DeleteFormConfirm()">确 定</el-button>
            </div>
        </el-dialog>

        <el-table
            ref="multipleTable"
            :data="newtableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :default-sort="{ prop: 'date', order: 'descending' }"
        >
            <el-table-column type="selection" width="100"> </el-table-column>
            <el-table-column prop="name" label="名称" width="300" sortable>
            </el-table-column>
            <el-table-column prop="funcs" label="功能权限" width="800">
            </el-table-column>
            <el-table-column
                prop="administrators"
                label="管理员数"
                show-overflow-tooltip
                sortable
                width="300"
            >
            </el-table-column>
            <el-table-column prop="describe" label="描述" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
        >
        </el-pagination>
    </div>
</template>
<script>
    export default {
        data() {
            return {
              //二级多选框的数组存储
                checkboxArr: [
                    {
                        id: 0,
                        name: "概览", //大类名
                        boxOptions: [], //小类
                        // checkedBoxs: [], //存放选中的小类
                        // indeterminate: false, //半选中状态
                        // checkAll: false, //大类的选中状态
                    },
                    {
                        id: 1,
                        name: "运维管理", //大类名
                        boxOptions: [
                            "终端管理",
                            "桌面管控",
                            "文件分发",
                            "策略管理",
                        ], //小类
                        //   checkedBoxs: [], //存放选中的小类
                        // indeterminate: false, //半选中状态
                        // checkAll: false, //大类的选中状态
                    },
                    {
                        id: 2,
                        name: "课表管理", //大类名
                        // checkedBoxs: [], //存放选中的小类
                        // indeterminate: false, //半选中状态
                        // checkAll: false, //大类的选中状态
                        boxOptions: [                                                         
                            "学期设置",
                            "课表编排",
                            "课表展示",
                            "删除日志",
                            "专向上机",
                        ], //小类
                    },
                    {
                        id: 3,
                        name: "帮助", //大类名
                        // checkedBoxs: [], //存放选中的小类
                        // indeterminate: false, //半选中状态
                        // checkAll: false, //大类的选中状态
                        boxOptions: ["授权与支持", "专项与支持"], //小类
                    },
                ],
                form: {
                    name: "",
                    type: "",
                    func:"",
                    ifdelete:"",
                    smallbox:[]
                },
                tableData: [
                    {
                        name: "111",
                        funcs:["概览"],//非空的一级多选框,包括半选的
                        twiceArr:["概览","文件分发"],//被选中的二级多选框
                        administrators: "1",
                        describe: "111",
                    },
                     {
                        name: "112",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    },
                     {
                        name: "113",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    }, {
                        name: "114",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    }, {
                        name: "115",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    }, {
                        name: "116",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    },
                ],
                currentPage1: 4,
                currentPage2: 3,
                currentPage3: 2,
                currentPage4: 1,
                everyPage: 5,
                currentPage: 1,
                newtableData: [
                     {
                        name: "111",
                        funcs:["概览","运维管理"],//非空的一级多选框
                        twiceArr:["概览","文件分发"],//被选中的二级多选框
                        administrators: "1",
                        describe: "111",
                    },
                     {
                        name: "112",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    },
                     {
                        name: "113",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    }, {
                        name: "114",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    }, {
                        name: "115",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    }, {
                        name: "116",
                        funcs:["概览"],
                        twiceArr:["概览"],
                        administrators: "1",
                        describe: "111",
                    },
                ],
                //添加对话框
                AddDialog: false,
                //编辑对话框
                EditDialog:false,
                //删除对话框
                DeleteDialog:false,
                //表格选中多选框
                   CheckboxChoose: [],
                formLabelWidth: "120px",
                formLabelWidth1: "80px",
                rules: {
                    name: [
                        {
                            required: true,
                            message: "请输入角色名称",
                            trigger: "blur",
                        },
                        {
                            min: 3,
                            max: 5,
                            message: "长度在 3 到 5 个字符",
                            trigger: "blur",
                        },
                    ],
                    describe: [
                        {
                            required: true,
                            message: "请填写描述",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            handleSizeChange(val) {
                this.everyPage = val;
                this.showForm();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.showForm();
                console.log(`当前页: ${val}`);
            },
            //进行分页操作,伴随数据刷新，
            showForm() {
                this.newtableData.splice(0, this.newtableData.length);
                for (let i = (this.currentPage - 1) * this.everyPage;i <= this.currentPage * this.everyPage - 1 &&i < this.tableData.length;i++) {
                  if(this.tableData[i].funcs.length!=0){
                  this.newtableData.push({
                    name:this.tableData[i].name,
                    // funcs:this.tableData[i].funcs ? this.tableData[i].funcs.join(","):"",
                    funcs:this.tableData[i].funcs,
                    describe: this.tableData[i].describe,
                    administrators: "1",
                  });}
                  // console.log(this.tableData[i]);
            }},

             	// 从小类选中大类
            handleCheckedChange(value) {
               let count = value.boxOptions.length
               // 若其中小类的checkedCities的长度与自己本身的相等，则大类的checked为true
               value.checked = (count === value.checkedBoxs.length) ? true : false;
              // 若小类的checkedCities的长度大于0，并且小于cityOptions（它本身所含有的数组）长度则为半选
               value.indeterminate = value.checkedBoxs.length > 0 && value.checkedBoxs.length < value.boxOptions.length
            },


              // 全选   该方法能直接进行大类 checked的修改  不需要再进行判断
            handleAllCheck(val) {
             // 若大类的checked并未被选中，则将小类checkedCities 赋值cityOptions 
            val.checkedBoxs = val.checked ? val.boxOptions : []
            // 半选取消
             val.indeterminate = false
            },


             handleSelectionChange(val) {
               this.multipleSelection = val;  
              },
              
          

            //增加成员数量
            //添加角色功能实现
            AddForm() {              
                var arr,brr;
                arr=[],brr=[]
                //遍历二级多选框，将被选中的一级标题存入arr，被选中的小多选框存入brr
                for(let i=0;i<this.checkboxArr.length;i++){
                  if(this.checkboxArr[i].checked==true||this.checkboxArr[i].checkedBoxs.length>0){
                    arr.push(this.checkboxArr[i].name);
                    brr.splice(0,brr.length,...this.checkboxArr[i].checkedBoxs)
                  }
                }
                       
               
               if(arr.length>0){    
                 this.tableData.push(
                 {
                   name:this.form.name,
                   funcs:arr.join(","),
                   twiceArr:brr,
                   administrators: "1",
                   describe:this.form.describe,
                 });
               }else if(arr.length==0){
                 this.tableData.push(
                 {
                  name:this.form.name,
                  funcs:"",
                  twiceArr:brr,
                  administrators: "1",
                  describe:this.form.describe,
                 } );
               }
                this.AddDialog = false;
                this.showForm();
            },   

               //多选框选择
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(val);
                this.CheckboxChoose.splice(
                    0,
                    this.CheckboxChoose.length,
                    ...val
                );
                // console.log(this.CheckboxChoose);
                //将一个数组的值依次加入另外一个数组的方法
                // .arr.splice(0, .arr.length, ...selection)
            },

            //获取编辑角色
            getEditForm(currentrow){
              // let accessArr = currentrow.accessArr;
              // data.forEach((item) => {
              //   let key = item.key;
              //   if (accessArr.includes(key)) {
              //     // 
              //     item.checkAll = true;
              //     let child = item.boxOptions;
              //     if (accessArr.includes(child.key)) {
              //       item.checkedBoxs.push(item.key);
              //     }
              //   }
              // })
              if(this.CheckboxChoose.length==1){
                //将对话框中修改的内容，保存到表格数组中
                this.EditDialog=true;
                // console.log(this.CheckboxChoose[0]);
                this.form.name=this.CheckboxChoose[0].name;
                this.form.describe=this.CheckboxChoose[0].describe;  
                var count=0; 
                for(let i=0;i<this.tableData.length;i++){
                  //找到表格中的对应行，再得到其他的相应数据
                  if(this.tableData[i].name==this.form.name){
                    console.log(this.tableData[i].twiceArr)//被选中的小多选框
                    //根据已经有的二级多选框，一级多选框，回调到form表单页面
                    count=i;
                    break;
                    }
                }
                // for(let i=0;i<this.tableData[count].funcs.length;i++){
                //   for(let j=0;j<this.checkboxArr.length;j++){
                //     if()
                //   }
                // }
                for(let i=0;i<this.tableData[count].twiceArr.length;i++){
                  for(let j=0;j<this.checkboxArr.length;j++){
                    for(let k=0;k<this.checkboxArr[j].boxOptions.length;k++){
                      if(this.tableData[count].twiceArr[i]==this.checkboxArr[j].boxOptions[k]){
                        this.form.checkboxArr[j].boxOptions[k].checked=true;
                      }
                    }
                  }
                }
                }
                
            },

            EditForm(){
              this.getEditForm(); 
            },

            //删除角色
           //删除成员,将不变的数组放在外循环，要变的数组放在内循环，不去控制数组索引，会更稳定
            deleteForm: function() {
                for (let i = 0; i < this.CheckboxChoose.length; i++) {
                    for (let j = 0; j < this.tableData.length; j++) {
                        if (this.CheckboxChoose[i].name == this.tableData[j].name) {
                            this.tableData.splice(j, 1);
                            this.showForm();
                            break;
                        }
                    }
                }
            },
            // 确认删除
            DeleteFormConfirm: function() {
                this.DeleteDialog = true;
                if (this.form.ifdelete == "ok") {
                  //删除判定清空
                    this.form.ifdelete = "";
                    this.deleteForm();
                    this.DeleteDialog = false;

                }
            },


        },
        //初始数据，逗号刷新
        created(){
          this.showForm();
        }
    };
</script>
<style>
   .btn{
     color: #fff;
    background-color: #579b83;
    border-color: #579b83;
   }
</style>
