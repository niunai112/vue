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
    <el-form-item label="商家简介">
      <el-input v-model="merchants.businessBrief"></el-input>
    </el-form-item><br>
    <span style="margin-left:10px;font-size:14px;">营业时间</span>
    <el-time-select
    style="margin-left:9px;"
    placeholder="起始时间" 
    v-model="merchants.businessHoursBefrom"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
  </el-time-select>
  <el-time-select
    placeholder="结束时间"
    v-model="merchants.businessHoursAfter"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
  </el-time-select><br/><br/>
    <el-form-item>
      <el-button style="margin-left:70px" type="success" @click="updateMerchants()">修改</el-button>
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
