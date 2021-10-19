<template>
  <div class="container">
    <el-page-header content="详情页面" @back="goBack" />
    <el-descriptions title="订单信息" style="margin-top:20px" direction="horizontal" :column="4" border>
      <el-descriptions-item label="订单编号">
        {{
          orderInformation.num
        }}
      </el-descriptions-item>
      <el-descriptions-item label="申请单位">
        {{
          orderInformation.applyEnterprise
        }}
      </el-descriptions-item>
      <el-descriptions-item label="申请人">
        {{
          orderInformation.applicantName
        }}
      </el-descriptions-item>
      <el-descriptions-item label="申请人用户名">
        {{
          orderInformation.applicantUsername
        }}
      </el-descriptions-item>
      <el-descriptions-item label="签发人">
        {{
          orderInformation.issuerName
        }}
      </el-descriptions-item>
      <el-descriptions-item label="申请时间">
        {{
          orderInformation.applyTime
        }}
      </el-descriptions-item>
      <el-descriptions-item label="交货时间">
        {{
          orderInformation.deliveryTime
        }}
      </el-descriptions-item>
      <el-descriptions-item label="运输方式">
        {{
          orderInformation.transport
        }}
      </el-descriptions-item>
      <el-descriptions-item label="交货地点">
        {{
          orderInformation.deliveryAddr
        }}
      </el-descriptions-item>
      <el-descriptions-item label="结算方式">
        {{
          orderInformation.settlementType
        }}
      </el-descriptions-item>
      <el-descriptions-item label="验收方式">
        {{
          orderInformation.acceptanceCheck
        }}
      </el-descriptions-item>
      <el-descriptions-item label="保证金要求">
        {{
          orderInformation.depositRequire==0?'要求':'不要求'
        }}
      </el-descriptions-item>
      <el-descriptions-item label="保证金金额">
        {{
          orderInformation.depositPrice
        }}
      </el-descriptions-item>
      <el-descriptions-item label="订单类型">
        {{
          orderInformation.orderType==1?'卖方挂牌(出售)':'买方挂牌(求购)'
        }}
      </el-descriptions-item>
      <el-descriptions-item label="订单金额">
        {{
          orderInformation.money
        }}
      </el-descriptions-item>
      <el-descriptions-item label="汇款时间">
        {{
          orderInformation.paymentTime
        }}
      </el-descriptions-item>
      <el-descriptions-item label="订单状态">
        {{
          orderInformation.state
        }}
      </el-descriptions-item>
    </el-descriptions>
    <h2 style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align: left" />
    <el-descriptions title="煤炭信息" direction="horizontal" :column="4" border>
      <el-descriptions-item label="全水分分级">
        {{
          coalInformation.totalMoisture
        }}
      </el-descriptions-item>
      <el-descriptions-item label="固定碳分级">
        {{
          coalInformation.fixedCarbon
        }}
      </el-descriptions-item>
      <el-descriptions-item label="发热量分级">
        {{
          coalInformation.calorificValue
        }}
      </el-descriptions-item>
      <el-descriptions-item label="灰分分级">
        {{
          coalInformation.ashContent
        }}
      </el-descriptions-item>
      <el-descriptions-item label="硫分分级">
        {{
          coalInformation.sulfurContent
        }}
      </el-descriptions-item>
      <el-descriptions-item label="挥发分分级">
        {{
          coalInformation.olatileMatter
        }}
      </el-descriptions-item>
      <el-descriptions-item label="产地">
        {{
          coalInformation.productionAddr
        }}
      </el-descriptions-item>
      <el-descriptions-item label="煤种">
        {{
          coalInformation.type
        }}
      </el-descriptions-item>
      <el-descriptions-item label="单价">
        {{
          coalInformation.unitPrice
        }}
      </el-descriptions-item>
      <el-descriptions-item label="吨数">
        {{
          coalInformation.tonnage
        }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="摘牌企业信息" direction="vertical" :column="2" style="margin-top:20px" border>
      <el-descriptions-item label="企业名称">{{ accepter.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="法人代表">{{ accepter.legalPerson }}</el-descriptions-item>
      <el-descriptions-item label="注册地区">{{ accepter.registerArea }}</el-descriptions-item>
      <el-descriptions-item label="注册资金">{{ accepter.registerCapital }}元</el-descriptions-item>
      <el-descriptions-item label="联系人">{{ accepter.contactName }}</el-descriptions-item>
      <el-descriptions-item label="联系人电话">{{ accepter.contactPhone }}</el-descriptions-item>
    </el-descriptions>
    <el-button v-if="allow" type="primary" @click="handleAcceptClick(orderInformation)">摘    牌</el-button>
    <el-dialog
      title="摘牌"
      :visible.sync="dialogInfo.dialogVisible"
      width="30%"
    >
      <span>{{ dialogInfo.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.dialogVisible=false">取 消</el-button>
        <el-button type="primary" @click="accept">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { getAxios } from '../api/request'
export default {
  name: 'ListDetailsPage',
  data() {
    return {
      allow: '',
      dialogInfo: {
        orderNum: '',
        dialogVisible: false,
        title: '',
        content: ''
      },
      orderInformation: {
        num: '',
        applyEnterprise: '',
        applicantName: '',
        applicantUsername: '',
        issuerName: '',
        applyTime: '',
        deliveryTime: '',
        transport: '',
        settlementType: '',
        acceptanceCheck: '',
        depositRequire: '',
        depositPrice: '',
        orderType: '',
        money: '',
        paymentTime: '',
        state: '',
        deliveryAddr: ''
      },
      coalInformation: {
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
      accepter: {
        enterpriseName: '暂未摘牌',
        legalPerson: '暂未摘牌',
        registerArea: '暂未摘牌',
        registerCapital: '暂未摘牌',
        contactName: '暂未摘牌',
        contactPhone: '暂未摘牌',
        mail: '暂未摘牌'
      }
    }
  },
  created() {
    console.log(this.$route.params)
    const order = this.$route.params.order
    const coal = this.$route.params.coal
    this.allow = this.$route.params.allow
    if (order != null) {
      this.orderInformation = order
    }
    if (coal != null) {
      this.coalInformation = coal
    }
    if (this.order.delistingUsername != null && this.order.delistingUsername != '') {
      const params = { 'username': this.order.delistingUsername }
      getAxios('/user/authentication/query', params).then(res => {
        console.log(res)
        this.accepter = res.data
      }).catch((e) => { })
    }
  },
  methods: {
    handleAcceptClick(row) {
      this.dialogInfo.content = '您正在对挂牌编号:' + row.num + '的货品进行摘牌操作,请确认无误'
      this.dialogInfo.orderNum = row.num
      this.dialogInfo.dialogVisible = true
    },
    accept() {
      console.log(this.orderInformation)
      var _self = this
      this.dialogInfo.dialogVisible = false
      const params = {
        'orderNum': this.orderInformation.num
      }
      let url = ''
      if (this.orderInformation.orderType == 0) {
        url = '/trade/seller/accept'
      } else {
        url = '/trade/buyer/accept'
      }
      getAxios(url, params).then(res => {
        Message.success('摘牌成功')
        _self.$options.methods.goBack(_self)
      }).catch((e) => { })
    },
    goBack() {
      if (this.orderInformation.orderType == 0) {
        this.$emit('back', 'BuyerListing')
      } else {
        this.$emit('back', 'SellerListing')
      }
    }
  }
}
</script>

<style></style>
