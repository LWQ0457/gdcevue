<template>
  <div class="container">
    <h1 class="title">卖方挂牌信息</h1>
    <el-select v-model="value" size="medium" clearable style="float:right" placeholder="筛选" @change="getchange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-table
      ref="filterTable"
      :data="tableData"
      border
      style="width:100%"
    >
      <el-table-column
        fixed
        prop="num"
        label="订单编号"
        width="200"
      />
      <el-table-column
        prop="type"
        label="煤炭种类"
        width="200"
      />
      <el-table-column
        prop="productionAddr"
        label="产地"
        width="200"
      />
      <el-table-column
        prop="unitPrice"
        label="单价"
        width="200"
      />

      <el-table-column
        prop="tonnage"
        label="吨数"
        width="200"
      />
      <el-table-column
        prop="state"
        label="订单状态"
        width="200"
        :filters="[{ text: '等待摘牌', value: '等待摘牌' },{ text: '已被摘牌', value: '已被摘牌' },{ text: '已缴纳保证金', value: '已缴纳保证金' }]"
        :filter-method="filterTag"
        :filter-multiple="false"
      />
      <el-table-column
        prop="applyTime"
        label="申请日期"
        sortable
        width="200"
      />

      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope)">详情</el-button>
          <el-button v-if="scope.row.state=='等待摘牌'&&user.userType==0" type="text" size="small" @click="handleAcceptClick(scope.row)">摘牌</el-button>
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
    <el-dialog
      title="摘牌"
      :visible.sync="dialogInfo.dialogVisible"
      width="30%"
    >
      <span>{{ dialogInfo.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="accept(dialogInfo.orderNum)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAxios } from '../api/request'
import { Message } from 'element-ui'
export default {
  name: 'SellerListing',
  components: {

  },
  data() {
    return {
      state: '',
      options: [{
        value: '等待摘牌',
        label: '等待摘牌'
      }, {
        value: '已被摘牌',
        label: '已被摘牌'
      }, {
        value: '已缴纳保证金',
        label: '已缴纳保证金'
      }],
      value: '',
      user: {
        username: '',
        userType: ''
      },
      dialogInfo: {
        orderNum: '',
        dialogVisible: false,
        title: '',
        content: ''
      },
      pages: 3,
      currentPage: 1,
      tableData: [
      ]
    }
  },
  created() {
    this.pageChange(1)
    this.user = JSON.parse(localStorage.getItem('userInfo'))
  },
  methods: {
    handleClick(row) {
      if (row != null) {
        const data = {
          'name': 'ListDetailsPage',
          'params': {
            'order': row.row,
            'coal': this.coalData[row.$index],
            'allow': (row.row.state == '等待摘牌' && this.user.userType == 0)
          }
        }
        this.$emit('getInfo', data)
      }
    },
    pageChange: function(currentPage) {
      this.loading = true
      let params = {}
      if (this.state == null && this.state == '') {
        params = { 'pageIndex': currentPage }
      } else {
        params = {
          'pageIndex': currentPage,
          'state': this.state
        }
      }
      this.tableData = []
      console.log(params)
      getAxios('/trade/seller/list', params).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.coalData = []// 清空
        this.pages = res.data.pages
      }).catch((e) => { })
      for (var i = 0; i < this.tableData.length; i++) {
        var params1 = { 'orderNum': this.tableData[i].num }
        getAxios('/trade/coal/query', params1).then(res => {
          console.log(res)
          this.coal.push(res.data)
        }).catch((e) => { })
      }
    },
    filterTag(value, row, column) {
      const property = column['property']
      this.state = value
      this.pageChange(1)
      return row[property] === value
    },
    handleAcceptClick(row) {
      this.dialogInfo.content = '您正在对挂牌编号:' + row.num + '的货品进行摘牌操作,请确认无误'
      this.dialogInfo.orderNum = row.num
      this.dialogInfo.dialogVisible = true
    },
    accept(orderNum) {
      console.log(orderNum)
      this.dialogInfo.dialogVisible = false
      const params = {
        'orderNum': orderNum
      }
      getAxios('/trade/buyer/accept', params).then(res => {
        Message.success('摘牌成功')
        this.pageChange(1)
        this.currentPage = 1
      }).catch((e) => { })
    },
    getchange(state) {
      this.state = state
      this.currentPage = 1
      this.pageChange(1)
    }
  }
}
</script>

<style>

</style>
