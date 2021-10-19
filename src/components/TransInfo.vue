<template>
  <div class="container" style="width:800dp">
    <el-page-header content="详情页面" @back="goBack" />
    <el-descriptions title="挂牌企业信息" direction="vertical" :column="2" style="margin-top:20px" border>
      <el-descriptions-item label="企业名称">{{ enterprise.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="法人代表">{{ enterprise.legalPerson }}</el-descriptions-item>
      <el-descriptions-item label="注册地区">{{ enterprise.registerArea }}</el-descriptions-item>
      <el-descriptions-item label="注册资金">{{ enterprise.registerCapital }}元</el-descriptions-item>
      <el-descriptions-item label="联系人">{{ enterprise.contactName }}</el-descriptions-item>
      <el-descriptions-item label="联系人电话">{{ enterprise.contactPhone }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="挂牌详细信息" direction="vertical" style="margin-top:20px" :column="2" border>
      <el-descriptions-item label="订单编号">{{ order.num }}</el-descriptions-item>
      <el-descriptions-item label="申请单位">{{ order.applyEnterprise }}</el-descriptions-item>
      <el-descriptions-item label="申请人">{{ order.applicantName }}</el-descriptions-item>
      <el-descriptions-item label="申请人用户名">{{ order.applicantUsername }}</el-descriptions-item>
      <el-descriptions-item label="签发人">{{ order.issuerName }}</el-descriptions-item>
      <el-descriptions-item label="申请日期">{{ order.applyTime }}</el-descriptions-item>
      <el-descriptions-item label="交货时间">{{ order.deliveryTime }}</el-descriptions-item>
      <el-descriptions-item label="运输方式">{{ order.transport }}</el-descriptions-item>
      <el-descriptions-item label="交货地点">{{ order.deliveryAddr }}</el-descriptions-item>
      <el-descriptions-item label="结算方式">{{ order.settlementType }}</el-descriptions-item>
      <el-descriptions-item label="验收方式">{{ order.acceptanceCheck }}</el-descriptions-item>
      <el-descriptions-item label="保证金要求">{{ order.depositRequire }}</el-descriptions-item>
      <el-descriptions-item label="保证金金额">{{ order.depositPrice }}元</el-descriptions-item>
      <el-descriptions-item label="订单类型">{{ order.orderType }}</el-descriptions-item>
      <el-descriptions-item label="订单金额">{{ order.money }}</el-descriptions-item>
      <el-descriptions-item label="汇款时间">{{ order.paymentTime }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">{{ order.state }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="煤炭信息" direction="vertical" style="margin-top:20px" :column="2" border>
      <el-descriptions-item label="全水分分级">{{ coal.totalMoisture }}</el-descriptions-item>
      <el-descriptions-item label="固定碳分级">{{ coal.fixedCarbon }}</el-descriptions-item>
      <el-descriptions-item label="发热量分级">{{ coal.calorificValue }}</el-descriptions-item>
      <el-descriptions-item label="灰分分级">{{ coal.ashContent }}</el-descriptions-item>
      <el-descriptions-item label="硫分分级">{{ coal.sulfurContent }}</el-descriptions-item>
      <el-descriptions-item label="发挥分分级">{{ coal.olatileMatter }}</el-descriptions-item>
      <el-descriptions-item label="产地">{{ coal.productionAddr }}</el-descriptions-item>
      <el-descriptions-item label="煤种">{{ coal.type }}</el-descriptions-item>
      <el-descriptions-item label="单价">{{ coal.unitPrice }}</el-descriptions-item>
      <el-descriptions-item label="吨数">{{ coal.tonnage }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions title="审核" direction="vertical" style="margin-top:20px" :column="1" border>
      <el-descriptions-item label="审核结果">
        <el-radio v-model="checkData.judgeResult" label="通过">通过</el-radio>
        <el-radio v-model="checkData.judgeResult" color="#22accf" label="不通过">不通过</el-radio>
        <el-alert
          v-if="validate.resultError"
          ref="alert-result"
          title="请选择审核结果"
          type="error"
        />
      </el-descriptions-item>
      <el-descriptions-item label="审核意见">
        <div style="margin: 20px 0;" />
        <el-input
          v-model="checkData.judgeOpinion"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入审核意见"
        /><el-alert
          v-if="validate.opinionError"
          ref="alert-result"
          title="输入审核意见限制2-100字符"
          type="error"
        />
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
import { Message } from 'element-ui'

import { getAxios } from '../api/request'
export default {
  name: 'TransInfo',
  data() {
    return {
      enterprise: {
        enterpriseName: '',
        legalPerson: '',
        registerArea: '',
        registerCapital: '',
        contactName: '',
        contactPhone: ''

      },
      order:
      {
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
      },
      coal: {
        orderNum: '暂无煤炭信息',
        unitPrice: '暂无煤炭信息',
        totalMoisture: '暂无煤炭信息',
        fixedCarbon: '暂无煤炭信息',
        calorificValue: '暂无煤炭信息',
        ashContent: '暂无煤炭信息',
        sulfurContent: '暂无煤炭信息',
        olatileMatter: '暂无煤炭信息',
        productionAddr: '暂无煤炭信息',
        type: '暂无煤炭信息',
        tonnage: '暂无煤炭信息'

      },
      checkData: {
        num: '',
        judgeResult: '',
        judgeOpinion: ''
      },

      validate: {
        resultError: false,
        opinionError: false
      }
    }
  },
  created() {
    this.order = this.$route.params.order
    const params = { 'username': this.order.applicantUsername }
    const params1 = { 'orderNum': this.order.num }
    getAxios('/user/authentication/query', params).then(res => {
      console.log(res)
      this.enterprise = res.data
    }).catch((e) => { })
    getAxios('/trade/coal/query', params1).then(res => {
      console.log(res)
      this.coal = res.data
    }).catch((e) => { })
  },
  methods: {

    submit() {
      this.checkData.num = this.order.num
      console.log(this.checkData)
      if (this.checkData.judgeResult === '') {
        this.validate.resultError = true
        return
      } else {
        this.validate.resultError = false
      }
      if (this.checkData.judgeOpinion === '' || this.checkData.judgeOpinion.length > 100 || this.checkData.judgeOpinion.length < 2) {
        this.validate.opinionError = true
        return
      } else {
        this.validate.opinionError = false
      }

      getAxios('/manage/trade/check', this.checkData).then((res) => {
        console.log(res)
        Message.success('审核结果已提交')
        this.$emit('back', 'TransInfoMain')
      }).catch((e) => { })
    },
    goBack() {
      this.$emit('back', 'CompanyCheckMain')
    }
  }
}
</script>

<style>
.el-descriptions{
  text-align: center !important;
}
.demo-image{
  width: 250px;
   height: 120px;
   overflow: hidden;
}
</style>
