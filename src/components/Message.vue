<template>
  <div class="container">
    <h1 class="title">我的消息</h1>
    <el-table
      :data="tableData"
      border
      style="width:100%"
    >
      <el-table-column
        fixed
        prop="title"
        label="消息主题"
        width="313"
      />
      <el-table-column
        prop="content"
        label="内容"
        width="323"
      />
      <el-table-column
        prop="sendTime"
        label="时间"
        width="313"
      />
      <el-table-column

        prop="sendUsername"
        label="发送人"
        width="313"
      />

      <el-table-column
        label="消息状态"
        width="313"
      ><template slot-scope="scope">
        {{ scope.row.state
        }}
      </template>
      </el-table-column>

    </el-table>
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
  name: 'Message',
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
          'name': '',
          'params': {
            'order': row
          }
        }
        this.$emit('getCompanyInfo', data)
      }
    },
    pageChange: function(currentPage) {
      const params = { 'pageIndex': currentPage }
      console.log(params)
      getAxios('/message/query', params).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.pages = res.data.pages
      }).catch((e) => { })
      getAxios('/message/state/update').then(res => {

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
