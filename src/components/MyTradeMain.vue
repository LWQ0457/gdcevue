<template>
  <div class="container">

    <h1 class="title">我的交易信息</h1>
    <el-table
      :data="tableData"
      border
      style="width:100%"
    >
      <el-table-column
        prop="applicantUsername"
        label="挂牌方账户"
        width="200"
      />
      <el-table-column
        prop="applyEnterprise"
        label="挂牌单位"
        width="250"
      />

      <el-table-column
        prop="applicantName"
        label="挂牌人"
        width="150"
      />
      <el-table-column
        prop="applyTime"
        label="挂牌日期"
        width="200"
      />
      <el-table-column
        prop="money"
        label="订单金额"
        width="150"
      />
      <el-table-column
        prop="state"
        label="订单状态"
        width="150"
      />
      <el-table-column
        label="保证金要求"
        width="120"
      ><template slot-scope="scope">
        {{ scope.row.depositRequire==0?'要求':'不要求' }}
      </template></el-table-column>
      <el-table-column
        prop="depositPrise"
        label="保证金金额"
        width="200"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="220"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(0,scope.row)">查看详情</el-button>
          <el-button v-if="validateOption[scope.$index].delete" type="text" size="small" @click="handleClick(1,scope.row)">删除挂牌</el-button>
          <el-button v-if="validateOption[scope.$index].cancel" type="text" size="small" @click="handleClick(2,scope.row)">取消交易</el-button>
          <el-button v-if="validateOption[scope.$index].deposit" type="text" size="small" @click="handleClick(3,scope.row)">保证金缴纳</el-button>
          <el-button v-if="validateOption[scope.$index].express" type="text" size="small" @click="handleClick(4,scope.row)">物流更新</el-button>
          <el-button v-if="validateOption[scope.$index].comfirm" type="text" size="small" @click="handleClick(5,scope.row)">确认收货</el-button>
          <el-button v-if="validateOption[scope.$index].payAll" type="text" size="small" @click="handleClick(6,scope.row)">支付尾款</el-button>
          <el-button v-if="validateOption[scope.$index].edit" type="text" size="small" @click="handleClick(7,scope.row)">修改信息</el-button>
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
    <el-dialog
      :title="dialogInfo.title"
      :visible.sync="dialogInfo.dialogVisible"
      width="30%"
    >
      <span>{{ dialogInfo.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="submit(dialogInfo)">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getAxios } from '../api/request'
export default {
  name: 'MyTradeMain',
  data() {
    return {
      pages: 0,
      currentPage: 0,
      userInfo: {},
      dialogInfo: {
        index: '',
        orderNum: '',
        dialogVisible: false,
        title: '',
        content: ''
      },
      tableData: [{
        acceptanceCheck: '',
        applicantName: '',
        applicantUsername: '',
        applyEnterprise: '',
        applyTime: '',
        delistingUsername: '',
        deliveryAddr: '',
        deliveryTime: '',
        depositPrice: '',
        depositRequire: '',
        issuerName: '',
        judgeOpinion: '',
        judgeResult: '',
        judgeTime: '',
        judgeUsername: '',
        money: '',
        num: '',
        orderType: '',
        paymentTime: '',
        settlementType: '',
        state: '',
        transport: ''
      }
      ],
      validateOption: [{
        cancel: 0,
        delete: 0,
        express: 0,
        confirm: 0,
        payAll: 0,
        deposit: 0,
        edit: ''
      }]

    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.pageChange(1)
  },
  methods: {
    submit(dialogInfo) {
      dialogInfo.dialogVisible = false
      const index = dialogInfo.index
      const params = {
        'orderNum': dialogInfo.orderNum
      }
      let url
      switch (index) {
        case 1:// 删除
          url = '/trade/delete'
          break
        case 2:// 取消
          if (this.userInfo.userType == 0) {
            url = '/trade/buyer/cancel'
          } else {
            url = '/trade/seller/cancel'
          }
          break
        case 3:// 保证金
          url = '/finance/margin/pay'
          break
        case 5:// 收货
          url = 'trade/comfirm'
          break
        case 6:// 支付
          url = 'trade/pay'
          break
        default:
          Message.error('未知错误')
          return
      }
      getAxios(url, params).then(res => {
        this.pageChange(1)
      }).catch((e) => { })
    },
    // 操作按键点击事件
    handleClick(index, row) {
      var params = {
        'params': {
          'order': row
        }
      }
      this.dialogInfo.index = index
      this.dialogInfo.orderNum = row.num
      switch (index) {
        case 0:
          params.name = 'MyTradeDetail'
          this.$emit('getInfo', params)
          break
        case 1:
          this.dialogInfo.title = '删除挂牌'
          this.dialogInfo.content = '即将删除该挂牌信息,删除后无法找回'
          this.dialogInfo.dialogVisible = true
          break
        case 2:
          this.dialogInfo.title = '取消交易'
          this.dialogInfo.content = '即将取消本次交易,若您是卖家,保证金将退回给买家;若您是买家,保证金将无法退回'
          this.dialogInfo.dialogVisible = true
          break
        case 3:
          this.dialogInfo.title = '保证金缴纳'
          this.dialogInfo.content = '即将从您的账户可用金额中扣取' + row.depositPrice + '元用作保证金,请确保金额充足'
          this.dialogInfo.dialogVisible = true
          break
        case 4:// 物流
          params.name = 'ExpressModify'
          this.$emit('getInfo', params)
          break
        case 5://
          this.dialogInfo.title = '确认收货'
          this.dialogInfo.content = '即将确认收货,请确保您已收到货品'
          this.dialogInfo.dialogVisible = true
          break
        case 6:// 尾款
          this.dialogInfo.title = '支付尾款'
          this.dialogInfo.content = '即将从您的账户可用金额中扣取' + row.money + '元进行尾款支付,请确保金额充足'
          this.dialogInfo.dialogVisible = true
          break
        case 7:// 修改
          params.name = 'ListModify'
          this.$emit('getInfo', params)
          break

        default:
          Message.error('不明操作')
          return
      }
    },
    // 扣取保证金
    payDeposit() {
      this.dialogInfo.dialogVisible = false
      console.log('扣取保证金')
    },
    // 换页
    pageChange: function(currentPage) {
      var _self = this
      const params = { 'pageIndex': currentPage }
      console.log(params)
      getAxios('/trade/query', params).then(res => {
        console.log(res)
        this.tableData = res.data.data
        this.pages = res.data.pages
        _self.$options.methods.buttonValidate(_self)
      }).catch((e) => { })
    },
    // 加载操作按键
    buttonValidate: function(_self) {
      _self.validateOption = []
      for (var i = 0; i < _self.tableData.length; i++) {
        _self.$set(_self.validateOption, i, {
          'cancel': 0,
          'delete': 0,
          'express': 0,
          'confirm': 0,
          'payAll': 0,
          'deposit': 0,
          'edit': 0,
          'sign': 0
        })
      }
      for (var i = 0; i < _self.tableData.length; i++) {
        // 是否为挂牌人
        if (_self.tableData[i].applicantUsername == _self.userInfo.username) {
          _self.validateOption[i].sign = 1
        } else {
          _self.validateOption[i].sign = 0
        }
        // 修改信息
        if (_self.validateOption[i].sign == 1 &&
         ((_self.tableData[i].state == '审核中' &&
         _self.tableData[i].judgeTime != null && _self.tableData[i].judgeTime != '') ||
         _self.tableData[i].state == '等待摘牌')) {
          _self.validateOption[i].edit = 1
        } else {
          _self.validateOption[i].edit = 0
        }
        // 删除订单
        if ((_self.tableData[i].state == '审核中' ||
        _self.tableData[i].state == '等待摘牌') &&
         _self.validateOption[i].sign == 1) {
          _self.validateOption[i].delete = 1
        } else {
          _self.validateOption[i].delete = 0
        }
        // 取消交易
        if ((_self.tableData[i].state == '已缴纳保证金' ||
         _self.tableData[i].state == '已被摘牌') && (
          _self.tableData[i].paymentTime == null || _self.tableData[i].paymentTime == '')) {
          _self.validateOption[i].cancel = 1
        } else {
          _self.validateOption[i].cancel = 0
        }
        // 收货
        if (_self.tableData[i].state == '已缴纳保证金' &&
         _self.userInfo.userType == 0) {
          _self.validateOption[i].comfirm = 1
        } else {
          _self.validateOption[i].comfirm = 0
        }
        // 支付尾款
        if ((_self.tableData[i].state == '已缴纳保证金' ||
        _self.tableData[i].state == '已收货') &&
         _self.userInfo.userType == 0) {
          _self.validateOption[i].payAll = 1
        } else {
          _self.validateOption[i].payAll = 0
        }
        // 保证金
        if (_self.tableData[i].state == '已被摘牌' && _self.userInfo.userType == 0) {
          _self.validateOption[i].deposit = 1
        } else {
          _self.validateOption[i].deposit = 0
        }
        // 物流
        if (_self.tableData[i].state == '已缴纳保证金' && _self.userInfo.userType == 1) {
          _self.validateOption[i].express = 1
        } else {
          _self.validateOption[i].express = 0
        }
      }
    }
  }
}
</script>

<style>
.container{
  width: 100%;
}
</style>
