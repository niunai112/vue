<template>
  <div class="app-container">
    <div class="filter-container">
    <el-form :model="merchants" label-width="80px" :inline="true">
    <el-form-item label="商家名称">
      <el-input v-model="merchants.businessName"></el-input>
    </el-form-item><br>
    <el-form-item label="商家电话">
      <el-input v-model="merchants.businessPhone"></el-input>
    </el-form-item><br>
    <el-form-item label="商家地址">
      <el-input v-model="merchants.businessDress"></el-input>
    </el-form-item><br>
    <el-form-item label="开始营业时间">
      <el-col :span="11">
      <el-date-picker type="fixed-time" placeholder="选择日期" v-model="merchants.businessHoursBefrom" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="merchants.businessHoursBefrom" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="结束营业时间">
      <el-col :span="11">
      <el-date-picker type="fixed-time" placeholder="选择日期" v-model="merchants.businessHoursBefrom" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
     <el-col :span="11">
        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="merchants.businessHoursAfter" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="商家简介">
      <el-input type="textarea" v-model="merchants.businessBrief"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="updateMerchants()">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
</el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        merchants: {
          businessName:'',
          businessPhone:'',
          businessDress:'',
          businessHoursBefrom:'',
          businessBrief:'',
          businessHoursAfter:''
        }
      }
    },
    created() {
      this.selectMerchants();
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      selectMerchants() {
        //查询列表
        // if (!this.hasPerm('article:list')) {
        //   return
        // }
        this.api({
          url: "/merchants/selectOne",
          method: "get",
        }).then(data => {
          this.merchants = data;
        })
      },
      updateMerchants() {
        console.log(this.merchants);
        //保存新文章
        this.api({
          url: "/merchants/updateMerchants",
          method: "post",
          data: this.merchants
        }).then(() => {
          this.selectMerchants();
        })
      },
      Article() {
        // //修改文章
        // this.api({
        //   url: "/article/updateArticle",
        //   method: "post",
        //   data: this.merchants
        // }).then(() => {
        //   this.getList();
        //   this.dialogFormVisible = false
        // })
      },
    }
  }
</script>
