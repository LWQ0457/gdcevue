<template>
  <div>
    <el-page-header content="详情页面" @back="goBack" />
    <el-descriptions title="挂牌企业信息" direction="vertical" :column="2" style="margin-top:20px" border>
      <el-descriptions-item label="企业名称">{{ applicant.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="法人代表">{{ applicant.legalPerson }}</el-descriptions-item>
      <el-descriptions-item label="注册地区">{{ applicant.registerArea }}</el-descriptions-item>
      <el-descriptions-item label="注册资金">{{ applicant.registerCapital }}元</el-descriptions-item>
      <el-descriptions-item label="联系人">{{ applicant.contactName }}</el-descriptions-item>
      <el-descriptions-item label="联系人电话">{{ applicant.contactPhone }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="摘牌企业信息" direction="vertical" :column="2" style="margin-top:20px" border>
      <el-descriptions-item label="企业名称">{{ accepter.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="法人代表">{{ accepter.legalPerson }}</el-descriptions-item>
      <el-descriptions-item label="注册地区">{{ accepter.registerArea }}</el-descriptions-item>
      <el-descriptions-item label="注册资金">{{ accepter.registerCapital }}元</el-descriptions-item>
      <el-descriptions-item label="联系人">{{ accepter.contactName }}</el-descriptions-item>
      <el-descriptions-item label="联系人电话">{{ accepter.contactPhone }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="挂牌详细信息" direction="vertical" :column="2" style="margin-top:20px" border>
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
      <el-descriptions-item label="保证金要求">{{ order.depositRequire==0?'要求':'不要求' }}</el-descriptions-item>
      <el-descriptions-item label="保证金金额">{{ order.depositPrice }}元</el-descriptions-item>
      <el-descriptions-item label="订单类型">        {{
        order.orderType==1?'卖方挂牌(出售)':'买方挂牌(求购)'
      }}</el-descriptions-item>
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
      <el-descriptions-item label="煤种">{{ coal.coalType }}</el-descriptions-item>
      <el-descriptions-item label="单价">{{ coal.unitPrice }}</el-descriptions-item>
      <el-descriptions-item label="吨数">{{ coal.tonnage }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="物流信息" direction="vertical" :column="2" style="margin-top:20px" border>
      <el-descriptions-item label="物流单号">{{ express.num }}</el-descriptions-item>
      <el-descriptions-item label="起始地">{{ express.origin }}</el-descriptions-item>
      <el-descriptions-item label="目的地">{{ express.destination }}</el-descriptions-item>
      <el-descriptions-item label="当前位置">{{ express.currentLocation }}元</el-descriptions-item>
      <el-descriptions-item label="承运商">{{ express.carrier }}</el-descriptions-item>
      <el-descriptions-item label="更新时间">{{ express.updateTime }}</el-descriptions-item>
    </el-descriptions>

  </div>
</template>

<script>
import { getAxios } from '../api/request'
export default {
  name: 'MyTradeDetail',
  data() {
    return {
      allowAccept: false,
      applicant: {
      },
      accepter: {
        enterpriseName: '暂未摘牌',
        legalPerson: '暂未摘牌',
        registerArea: '暂未摘牌',
        registerCapital: '暂未摘牌',
        contactName: '暂未摘牌',
        contactPhone: '暂未摘牌',
        mail: '暂未摘牌'
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
        coalType: '暂无煤炭信息',
        tonnage: '暂无煤炭信息'
      },
      order: {
      },
      express: {
        num: '暂无物流信息',
        origin: '暂无物流信息',
        destination: '暂无物流信息',
        currentLocation: '暂无物流信息',
        carrier: '暂无物流信息',
        updateTime: '暂无物流信息'
      }
    }
  },
  created() {
    this.order = this.$route.params.order
    let params = { 'orderNum': this.order.num }
    // 煤炭信息
    getAxios('/trade/coal/query', params).then(res => {
      console.log(res)
      this.coal = res.data
    }).catch((e) => { })
    // 挂牌方信息
    params = { 'username': this.order.applicantUsername }
    getAxios('/user/authentication/query', params).then(res => {
      this.applicant = res.data
    }).catch((e) => { })
    // 摘牌方信息
    if (this.order.delistingUsername != null && this.order.delistingUsername != '') {
      params = { 'username': this.order.delistingUsername }
      getAxios('/user/authentication/query', params).then(res => {
        this.accepter = res.data
      }).catch((e) => { })
    }
    // 物流信息
    params = { 'orderNum': this.order.num }
    getAxios('/trade/express/query', params).then(res => {
      this.express = res.data
    }).catch((e) => { })
  },
  methods: {
    goBack() {
      this.$emit('back', 'MyTradeMain')
    }
  }
}
</script>

<style>

</style>
