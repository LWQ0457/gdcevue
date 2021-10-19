<template>
  <div>
    <h2
      style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align: left"
    >
      挂牌信息
    </h2>
    <el-form
      id="form2"
      ref="orderForm"
      :rules="rules"
      label-width="100px"
      :model="order"
      label-position="left"
      style="margin-left:0px; overflow-x: hidden;padding-right:30px;box-sizing: border-box;"
    >

      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="签发人：" prop="issuerName">
            <el-input v-model="order.issuerName" size="small" class="issuerName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结算方式：" prop="settlementType">
            <el-select v-model="order.settlementType" prop="settlementType" class="settlementType" placeholder="请选择结算方式" size="small">
              <el-option label="一票结算" value="一票结算" />
              <el-option label="二票结算" value="二票结算" />
              <el-option label="铁路大票" value="铁路大票" />
              <el-option label="煤款税票" value="煤款税票" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="交货日期：" prop="deliveryTime">
            <el-date-picker
              v-model="order.deliveryTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              size="small"
              style="width:200px;"
              editable="false"
            />          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="运输方式：" prop="transport">
            <el-select v-model="order.transport" prop="transport" class="transport" placeholder="请选择运输方式" size="small">
              <el-option label="火车" value="火车" />
              <el-option label="汽车" value="汽车" />
              <el-option label="船运" value="船运" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

      <el-row type="flex" justify="center">

        <el-col :span="6">
          <el-form-item label="验收方式：" prop="acceptanceCheck">
            <el-select v-model="order.acceptanceCheck" prop="acceptanceCheck" class="acceptanceCheck" placeholder="请选择验收方式" size="small">
              <el-option label="到厂验收" value="到厂验收" />
              <el-option label="到厂第三方验收" value="到厂第三方验收" />
              <el-option label="港口第三方验收" value="港口第三方验收" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="保证金要求:" prop="depositRequire">
            <el-select v-model="order.depositRequire" prop="depositRequire" class="depositRequire" placeholder="请选择要求" size="small">
              <el-option label="要求" value="0" />
              <el-option label="不要求" value="1" />

            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="保证金额:" prop="depositPrice">
            <el-input v-model="order.depositPrice" size="small" class="depositPrice" placeholder="(元)" />
          </el-form-item>
        </el-col>
        <el-col :span="6" />
      </el-row>

      <el-row type="flex" justify="center">

        <el-col :span="6">
          <el-form-item label="订单类型：" prop="orderType">
            <el-select v-model="order.orderType" prop="orderType" class="orderType" placeholder="订单类型" size="small">
              <el-option label="买家挂牌" value="0" />
              <el-option label="卖家挂牌" value="1" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="订单状态：" prop="state">
            <el-select v-model="order.state" prop="state" class="state" placeholder="订单状态" size="small">
              <el-option label="审核中" value="审核中" />
              <el-option label="等待摘牌" value="等待摘牌" />
              <el-option label="已被摘牌" value="已被摘牌" />
              <el-option label="已缴纳保证金" value="已缴纳保证金" />
              <el-option label="已收货" value="已完成" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="交货地点：" prop="deliveryAddr" style="width:500px;">
            <el-input v-model="order.deliveryAddr" size="small" class="deliveryAddr" type="textarea" :rows="2" placeholder="请输入交货地点" />
          </el-form-item>
        </el-col>
        <el-col :span="6" />
      </el-row>
      <el-row type="flex" justify="start" />
    </el-form>
    <el-form
      id="form1"
      ref="coalForm"
      :rules="rules"
      :model="coal"
      label-width="90px"
      label-position="left"
      style="margin-left:0px; overflow-x: hidden;padding-right:30px;box-sizing: border-box;"
    >
      <h2
        style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align: left"
      >
        煤炭信息
      </h2>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="产地：" prop="productionAddr">
            <el-input v-model="coal.productionAddr" size="small" class="productionAddr" />
          </el-form-item>

        </el-col>
        <el-col :span="6">
          <el-form-item label="煤种：" prop="type">
            <el-select v-model="coal.type" prop="type" class="type" placeholder="请选择煤种" size="small">
              <el-option label="烟煤" value="烟煤" />
              <el-option label="无烟煤" value="无烟煤" />
              <el-option label="褐煤" value="褐煤" />
              <el-option label="贫瘦煤" value="贫瘦煤" />
              <el-option label="其他" value="其他" />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="6">
          <el-form-item label="吨数:" prop="tonnage">
            <el-input v-model="coal.tonnage" size="small" class="tonnage" />
          </el-form-item>

        </el-col>
        <el-col :span="6">
          <el-form-item label="单价:" prop="unitPrice">
            <el-input v-model="coal.unitPrice" size="small" class="unitPrice" placeholder="(元/吨)" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">

        <el-col :span="8">
          <el-form-item label="全水分:" prop="totalMoisture">
            <el-select v-model="coal.totalMoisture" prop="totalMoisture" class="totalMoisture" placeholder="全水分分级" size="small">
              <el-option label="特低全水分煤" value="特低全水分煤" />
              <el-option label="低全水分煤" value="低全水分煤" />
              <el-option label="中等全水分煤" value="中等全水分煤" />
              <el-option label="中高全水分煤" value="中高全水分煤" />
              <el-option label="高全水分煤" value="高全水分煤" />
              <el-option label="特高全水分煤" value="特高全水分煤" />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="固定碳:" prop="fixedCarbon">
            <el-select v-model="coal.fixedCarbon" prop="fixedCarbon" class="fixedCarbon" placeholder="固定碳分级" size="small">
              <el-option label="特低固定碳煤" value="特低固定碳煤" />
              <el-option label="低固定碳煤" value="低固定碳煤" />
              <el-option label="中等固定碳煤" value="中等固定碳煤" />
              <el-option label="中高固定碳煤" value="中高固定碳煤" />
              <el-option label="高固定碳煤" value="高固定碳煤" />
              <el-option label="特高固定碳煤" value="特高固定碳煤" />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="热值:" prop="calorificValue">
            <el-select v-model="coal.calorificValue" prop="calorificValue" class="calorificValue" placeholder="发热量分级" size="small">
              <el-option label="低热值煤" value="低热值煤" />
              <el-option label="中低热值煤" value="中低热值煤" />
              <el-option label="中热值煤" value="中热值煤" />
              <el-option label="中高热值煤" value="中高热值煤" />
              <el-option label="高热值煤" value="高热值煤" />
              <el-option label="特高热值煤" value="特高热值煤" />
            </el-select>
          </el-form-item>

        </el-col>

      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="8">
          <el-form-item label="灰分:" prop="ashContent">
            <el-select v-model="coal.ashContent" prop="ashContent" class="ashContent" placeholder="灰分分级" size="small">
              <el-option label="特低灰煤" value="特低灰煤" />
              <el-option label="低灰分煤" value="低灰分煤" />
              <el-option label="低中灰煤" value="低中灰煤" />
              <el-option label="中灰分煤" value="中灰分煤" />
              <el-option label="中高灰煤" value="中高灰煤" />
              <el-option label="高灰分煤" value="高灰分煤" />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="硫分:" prop="sulfurContent">
            <el-select v-model="coal.sulfurContent" prop="sulfurContent" class="sulfurContent" placeholder="硫分分级" size="small">
              <el-option label="特低硫煤" value="特低硫煤" />
              <el-option label="低硫分煤" value="低硫分煤" />
              <el-option label="低中硫煤" value="低中硫煤" />
              <el-option label="中硫分煤" value="中硫分煤" />
              <el-option label="中高硫煤" value="中高硫煤" />
              <el-option label="高硫分煤" value="高硫分煤" />
            </el-select>
          </el-form-item>

        </el-col>
        <el-col :span="8">
          <el-form-item label="挥发分:" prop="olatileMatter">
            <el-select v-model="coal.olatileMatter" prop="olatileMatter" class="olatileMatter" placeholder="挥发分分级" size="small">
              <el-option label="特低挥发分煤" value="特低挥发分煤" />
              <el-option label="低挥发分煤" value="低挥发分煤" />
              <el-option label="中等挥发分煤" value="中等挥发分煤" />
              <el-option label="中高挥发分煤" value="中高挥发分煤" />
              <el-option label="高挥发分煤" value="高挥发分煤" />
              <el-option label="特高挥发分煤" value="特高挥发分煤" />
            </el-select>
          </el-form-item>

        </el-col>

      </el-row>

      <h2
        style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align: left"
      />
      <el-form-item>
        <el-button @click="submit">提交</el-button>
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'ListSubmission',

  data() {
    var validatePass = function(rule, value, callback) {
      if (/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的格式'))
      }
    }

    return {
      order: {
        issuerName: '',
        applyTime: '',
        deliveryTime: '',
        transport: '',
        settlementType: '',
        acceptanceCheck: '',
        depositRequire: '',
        depositPrice: 0,
        orderType: '',
        money: '',
        state: '',
        deliveryAddr: ''

      },
      coal: {
        unitPrice: '',
        totalMoisture: '',
        fixedCarbon: '',
        calorificValue: '',
        ashContent: '',
        sulfurContent: '',
        olatileMatter: '',
        productionAddr: '',
        type: '',
        tonnage: ''
      },
      rules: {
        transport: [
          { required: true, message: '不能为空' }
        ],
        settlementType: [
          { required: true, message: '不能为空' }
        ],
        acceptanceCheck: [
          { required: true, message: '不能为空' }
        ],
        orderType: [
          { required: true, message: '不能为空' }
        ],
        state: [
          { required: true, message: '不能为空' }
        ],
        depositRequire: [
          { required: true, message: '不能为空' }
        ],
        issuerName: [
          { required: true, message: '签收人不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],

        depositPrice: [
          { required: false, message: '金额不能为空' },
          { validator: validatePass }
        ],
        money: [
          { required: true, message: '金额不能为空' },
          { validator: validatePass }
        ],
        deliveryAddr: [
          { required: true, message: '交货地点不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],
        unitPrice: [
          { required: true, message: '单价不能为空' },
          { validator: validatePass }
        ],

        productionAddr: [
          { required: true, message: '不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],
        tonnage: [
          { required: true, message: '不能为空' },
          { validator: validatePass }
        ],
        deliveryTime: [
          { required: true, message: '不能为空' },
          { min: 1, max: 20, message: '请选择交货时间' }
        ],
        fixedCarbon: [
          { required: true, message: '不能为空' }
        ],
        calorificValue: [
          { required: true, message: '不能为空' }
        ],
        ashContent: [
          { required: true, message: '不能为空' }
        ],
        sulfurContent: [
          { required: true, message: '不能为空' }
        ],
        olatileMatter: [
          { required: true, message: '不能为空' }
        ],
        type: [
          { required: true, message: '不能为空' }
        ]
      }
    }
  },
  watch: {
    'order.depositRequire': {
      handler: function() {
        if (this.order.depositRequire == 1) { this.order.depositPrice = 0 }
      }
    }
  },
  methods: {

    resetForm(loginForm) {
      this.$refs['orderForm'].resetFields()
      this.$refs['coalForm'].resetFields()
    },
    test() {
      this.$axios({
        url: 'api/trade/create',
        methods: 'get',
        headers: { token: '2131231token', 'Access-Control-Allow-Origin': true },
        params: {
          info: 'test'
        }
      })
    },
    submit() {
      let valid1 = false
      let valid2 = false
      this.$refs['orderForm'].validate((valid) => {
        if (valid) {
          valid1 = true
          this.$refs['coalForm'].validate((valid) => {
            if (valid) {
              valid2 = true
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      if (valid1 && valid2) {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'api/trade/create')
        xhr.setRequestHeader('content-type', 'application/json')
        xhr.setRequestHeader('Access-Control-Allow-Origin', true)
        xhr.setRequestHeader('token', localStorage.getItem('token'))
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log(xhr.response)
              var response = JSON.parse(xhr.response)
              if (response.code === 200) {
                this.$message.success('提交成功')
              }
              if (response.code === 201) {
                this.$message.warning('参数不能为空')
              }
              if (response.code === 202) {
                this.$message.warning('未知错误')
              }
              if (response.code === 204) {
                this.$message.warning('用户尚未进行认证')
              }
              if (response.code === 205) {
                this.$message.warning('用户尚未登录')
              }
            } else {
              console.log(xhr.response)
            }
          }
          // else {
          //   console.log('网络错误')
          // }
        }
        const params = {
          'coal': this.coal,
          'order': this.order
        }
        xhr.send(JSON.stringify(params))
      }
    }

  }
}
</script>
<style>
.el-row{
  margin-left:0px;
  width:1200px;
}
</style>
