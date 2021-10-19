<template>
  <div class="container">
    <h1 class="title">企业资质信息审核</h1>
    <el-table
      :data="tableData"
      border
      style="width:100%"
    >
      <el-table-column

        prop="enterpriseName"
        label="企业名称"
        width="250"
      />
      <el-table-column
        prop="legalerson"
        label="法人代表"
        width="150"
      />
      <el-table-column
        prop="registerArea"
        label="注册地区"
        width="300"
      />
      <el-table-column
        prop="registerCapital"
        label="注册资金"
        width="120"
      />
      <el-table-column
        prop="contactName"
        label="联系人"
        width="150"
      />
      <el-table-column
        prop="contactPhone"
        label="联系电话"
        width="200"
      />
      <el-table-column
        prop="mail"
        label="企业邮箱"
        width="200"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">审核</el-button>
        </template>

      </el-table-column></el-table>
    <div class="div-pagination">
      <el-pagination
        :page-size="1"
        :pager-count="11"
        :current-page="currentPage"
        layout="prev, pager, next"
        :total="pages"
        @current-change="pageChange"
      />
    </div>

  </div>
</template>

<script>
import { Message } from 'element-ui'

import { getAxios } from '../../api/request'
export default {
  name: 'CompanyCheckMain',
  data() {
    return {
      pages: 3,
      currentPage: 1,
      tableData: [
      ],
      user: {
        username: '1',
        password: '1'
      }
    }
  },
  created() {
    this.pageChange(1)
  },
  methods: {
    handleClick(row) {
      if (row != null) {
        const data = {
          'name': 'CompanyCheck',
          'params': {
            'enterprise': row
          }
        }
        this.$emit('getInfo', data)
      }
    },
    pageChange: function(currentPage) {
      const params = { 'pageIndex': currentPage }
      console.log(params)
      getAxios('/manage/authentication/list', params).then(res => {
        console.log(res)
        if (res.data == null) {
          Message.success(res.msg)
          this.pages = 0
        } else {
          this.tableData = res.data.data
          this.pages = res.data.pages
        }
      }).catch((e) => { })
    }
  }
}
</script>
<style>

  .title{
    color: #409EFF;
    float: left;
  }
  .div-pagination{
    margin-top: 50px;
    float: right;
  }
  .container{
    width: 1200px;
  }
</style>
