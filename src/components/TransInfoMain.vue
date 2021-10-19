<template>
  <div class="container">
    <h1 class="title">挂牌信息审核</h1>
    <el-table
      :data="tableData"
      border
      style="width:100%"
    >
      <el-table-column
        fixed
        prop="num"
        label="订单编号"
        width="280"
      />
      <el-table-column
        prop="applyEnterprise"
        label="申请单位"
        width="328"
      />
      <el-table-column
        prop="applicantName"
        label="申请人"
        width="200"
      />

      <el-table-column
        prop="applicantUsername"
        label="申请人用户名"
        width="200"
      />
      <el-table-column
        prop="issuerName"
        label="签发人"
        width="200"
      />
      <el-table-column
        prop="applyTime"
        label="申请日期"
        width="200"
      />

      <el-table-column
        fixed="right"
        label="操作"
        width="120"
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
import { getAxios } from '../api/request'
export default {
  name: 'TransInfoMain',
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
          'name': 'TransInfo',
          'params': {
            'order': row
          }
        }
        this.$emit('getInfo', data)
      }
    },
    pageChange: function(currentPage) {
      const params = { 'pageIndex': currentPage }
      console.log(params)
      getAxios('/manage/trade/list', params).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.pages = res.data.pages
      }).catch((e) => { })
    }
  }
}
</script>

<style >
.container{
  width: 100%;
}
</style>
