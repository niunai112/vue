<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" label-width="80px" :inline="true">
<!--        <el-form-item label="Code">-->
<!--          <el-input v-model="listQuery.menuCode"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" icon="plus" @click="getList">查询-->
<!--          </el-button>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" icon="plus" @click="showCreate">添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="menuCode" label="Code" style="width: 60px;"></el-table-column>
      <el-table-column align="center" prop="menuName" label="Name" style="width: 60px;"></el-table-column>
      <el-table-column align="center" label="管理" width="200">
        <template slot-scope="scope">
          <el-button type="danger" icon="edit" @click="deletePageTable(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageRow"
      :total="totalCount"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="tempPageTable" class="small-space" :model="tempPageTable" label-position="left" label-width="60px"
               style='width: 300px; margin-left:50px;'>
        <el-form-item label="Code" prop="menuCode">
          <el-input type="text" v-model="tempPageTable.menuCode">
          </el-input>
        </el-form-item>
        <el-form-item label="Name" prop="menuName">
          <el-input type="text" v-model="tempPageTable.menuName">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reset">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="success" @click="addPageTable">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 50,//每页条数
          menuCode: ''
        },
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tempPageTable: {
          menuCode: "",
          menuName: ""
        },
        rules: {
          menuCode: [
            { required: true, message: '请输入Code', trigger: 'change' },
            { whitespace: true , message: '输入为空'}
          ],
          menuName: [
            { required: true, message: '请输入Name', trigger: 'change' },
            { whitespace: true , message: '输入为空'}
          ]
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        //查询列表
        this.listLoading = true;
        this.api({
          url: "/pageTable/listPageTable",
          method: "get",
          params: this.listQuery
        }).then(data => {
          this.listLoading = false;
          this.list = data.list;
          this.totalCount = data.totalCount;
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      handleFilter() {
        //改变了查询条件,从第一页开始查询
        this.listQuery.pageNum = 1
        this.getList()
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        this.tempPageTable.menuCode = ''
        this.tempPageTable.menuName = ''
        //显示新增对话框
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      // showUpdate($index) {
      //   //显示修改对话框
      //   this.tempArticle.id = this.list[$index].id;
      //   this.tempArticle.content = this.list[$index].content;
      //   this.dialogStatus = "update"
      //   this.dialogFormVisible = true
      // },
      addPageTable() {
        this.$refs["tempPageTable"].validate((valid) => {
          if (valid) {
            this.api({
              url: "/pageTable/addPageTable",
              method: "post",
              data: this.tempPageTable
            }).then(() => {
              this.getList();
              this.dialogFormVisible = false
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      reset(){
        this.dialogFormVisible = false
        this.$refs['tempPageTable'].resetFields();
      },
      // createArticle() {
      //   //保存新文章
      //   this.api({
      //     url: "/article/addArticle",
      //     method: "post",
      //     data: this.tempArticle
      //   }).then(() => {
      //     this.getList();
      //     this.dialogFormVisible = false
      //   })
      // },
      // updateArticle() {
      //   //修改文章
      //   this.api({
      //     url: "/article/updateArticle",
      //     method: "post",
      //     data: this.tempArticle
      //   }).then(() => {
      //     this.getList();
      //     this.dialogFormVisible = false
      //   })
      // },
      deletePageTable($index) {
        //修改文章
        this.api({
          url: "/pageTable/deletePageTable",
          method: "post",
          data: {"menuCode":this.list[$index].menuCode}
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
    }
  }
</script>
