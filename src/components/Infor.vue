<template>

  <div>

    <el-descriptions title="用户信息" direction="vertical" :column="3" border>
      <el-descriptions-item label="用户名">{{ trader.username }}</el-descriptions-item>
      <el-descriptions-item label="姓名">{{ trader.fullName }}</el-descriptions-item>
      <el-descriptions-item v-if="trader.userType" label="用户身份">卖家</el-descriptions-item>
      <el-descriptions-item v-else label="用户身份">买家</el-descriptions-item>

    </el-descriptions>

    <el-descriptions title="企业资质" direction="vertical" :column="2" border>

      <el-descriptions-item label="企业名称">{{ enterprise.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="法人代表">{{ enterprise.legalPerson }}</el-descriptions-item>
      <el-descriptions-item label="注册地区">{{ enterprise.registerArea }}</el-descriptions-item>
      <el-descriptions-item label="企业联系人">{{ enterprise.contactPhone }}</el-descriptions-item>
      <el-descriptions-item label="联系电话">{{ enterprise.contactName }}</el-descriptions-item>
      <el-descriptions-item label="企业邮箱">{{ enterprise.mail }}</el-descriptions-item>
    </el-descriptions>
    <el-row>
      <el-col :span="8"><div class="demo-image__preview">
        <h5>营业执照号</h5>
        <el-image

          :src="enterprise.businessLicense"
          :preview-src-list="srcList"
          @click="preview(enterprise.businessLicense)"
        />
      </div></el-col>
      <el-col :span="8" />
      <el-col :span="8">
        <div class="demo-image__preview">
          <div class="block">
            <h5>组织机构代码</h5>
            <el-image

              :src="enterprise.organizationCode"
              :preview-src-list="srcList"
              @click="preview(enterprise.organizationCode)"
            />
          </div>
        </div></el-col>

    </el-row>
    <el-row>
      <el-col :span="24" />
    </el-row>
    <el-row>
      <el-col :span="8"><div class="demo-image__preview">
        <h5>税务登记号</h5>
        <el-image

          :src="enterprise.taxRegistration"
          :preview-src-list="srcList"
          @click="preview(enterprise.taxRegistration)"
        />
      </div></el-col>
      <el-col :span="8" />
      <el-col :span="8"><div class="demo-image__preview">
        <h5>煤炭经营许可证</h5>

        <el-image

          :src="enterprise.coalBusinessLicense"
          :preview-src-list="srcList"
          @click="preview(enterprise.coalBusinessLicense)"
        />
      </div></el-col>
    </el-row>
    <el-descriptions title="资金信息" style="margin-top: 30px;" direction="vertical" :column="1" border>
      <el-descriptions-item label="账户可用金额">{{ finance.totalFunds }}</el-descriptions-item>
      <el-descriptions-item label="账户冻结金额">  {{ finance.frozenFunds }}</el-descriptions-item>
      <el-descriptions-item label="资金预存">
        <div style="margin: 20px 0;" />
        <el-input
          v-model="funds"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入预存金额 仅支持支付宝付款"
        />
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="submit">付款</el-button>
    <el-dialog
      :title="资金预存"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>请确保您已完成支付</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="reload">已完成支付</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
import { getAxios } from '../api/request'
export default {
  inject: ['reload'],
  name: 'Infor',
  data() {
    return {
      dialogVisible: false,
      trader: {
        username: '',
        fullName: '',
        userType: ''
      },
      enterprise: {
        enterpriseName: '',
        legalPerson: '',
        registerArea: '',
        contactPhone: '',
        contactName: '',
        mail: '',
        businessLicense: '',
        organizationCode: '',
        taxRegistration: '',
        coalBusinessLicense: ''
      },
      srcList: [],
      finance: {
        show: '',
        totalFunds: '',
        frozenFunds: ''
      },
      funds: ''
    }
  },
  created() {
    this.trader = JSON.parse(localStorage.getItem('userInfo'))
    const params = { 'username': this.trader.username }
    getAxios('/user/authentication/query', params).then(res => {
      this.enterprise = res.data
    }).catch((e) => { })
    this.getFinance()
  },
  methods: {
    reload() {
      this.dialogVisible = false
      this.reload()
    },
    getFinance() {
      getAxios('finance/query').then(res => {
        this.finance = res.data
        this.finance.show = true
      }).catch(() => {
        this.finance.show = false
      })
    },
    preview(val) {
      this.srcList = []
      this.srcList.push(val)
      console.log(val)
    },
    submit() {
      const params = { 'funds': this.funds }
      getAxios('finance/deposit', params).then(res => {
        const newWindow = window.open('', '_blank')
        newWindow.document.write(res.data)
        newWindow.focus()
        this.dialogVisible = true
      })
    }
  }

}
</script>

<style>
.demo-image__preview{
  line-height: 250px;
width: 250px;
height: 150px;
  overflow: hidden;
}
</style>
