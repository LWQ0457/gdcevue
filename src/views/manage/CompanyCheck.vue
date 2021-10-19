<template>
  <div class="container" style="width:800dp">
    <el-page-header content="详情页面" @back="goBack" />
    <el-descriptions title="企业资质信息" direction="vertical" :column="2" border>
      <el-descriptions-item label="企业名称">{{ enterprise.enterpriseName }}</el-descriptions-item>
      <el-descriptions-item label="法人代表">{{ enterprise.legalPerson }}</el-descriptions-item>
      <el-descriptions-item label="注册地区">{{ enterprise.registerArea }}</el-descriptions-item>
      <el-descriptions-item label="注册资金">{{ enterprise.registerCapital }}元</el-descriptions-item>
      <el-descriptions-item label="联系人">{{ enterprise.contactName }}</el-descriptions-item>
      <el-descriptions-item label="联系人电话">{{ enterprise.contactPhone }}</el-descriptions-item>
      <el-descriptions-item label="煤炭经营许可">
        <el-tooltip class="item" effect="dark" content="点击预览" placement="bottom-start">
          <div class="demo-image">
            <el-image
              class="image"
              :src="enterprise.coalBusinessLicense"
              :preview-src-list="srcList"
              @click="preview(enterprise.coalBusinessLicense)"
            />
          </div>
        </el-tooltip>
      </el-descriptions-item>
      <el-descriptions-item label="营业执照">
        <el-tooltip class="item" effect="dark" content="点击预览" placement="bottom-start">
          <div class="demo-image">
            <el-image
              class="image"
              :src="enterprise.businessLicense"
              :preview-src-list="srcList"
              @click="preview(enterprise.businessLicense)"
            />
          </div>
        </el-tooltip></el-descriptions-item>
      <el-descriptions-item label="税务登记号">
        <el-tooltip class="item" effect="dark" content="点击预览" placement="bottom-start">
          <div class="demo-image">
            <el-image
              class="image"
              :src="enterprise.taxRegistration"
              :preview-src-list="srcList"
              @click="preview(enterprise.taxRegistration)"
            />
          </div>
        </el-tooltip>
      </el-descriptions-item>
      <el-descriptions-item label="组织结构代码">
        <el-tooltip class="item" effect="dark" content="点击预览" placement="bottom-start">
          <div class="demo-image">
            <el-image
              class="image"
              :src="enterprise.organizationCode"
              :preview-src-list="srcList"
              @click="preview(enterprise.organizationCode)"
            />
          </div>
        </el-tooltip>
      </el-descriptions-item>

    <!--
    <el-descriptions-item label="备注">
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    -->
    </el-descriptions>
    <el-descriptions title="审核" direction="vertical" :column="1" border>
      <el-descriptions-item label="审核结果">
        <el-radio v-model="checkData.judgeResult" label="通过">通过</el-radio>
        <el-radio v-model="checkData.judgeResult" label="不通过">不通过</el-radio>
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
        />
        <el-alert
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
import { getAxios } from '../../api/request'

export default {
  name: 'CompanyCheck',
  data() {
    return {
      enterprise:
      {
        traderUsername: '',
        enterpriseName: '',
        legalPerson: '',
        registerArea: '',
        registerCapital: '',
        contactName: '',
        contactPhone: '',
        mail: '',
        businessLicense: '',
        organizationCode: '',
        taxRegistration: '',
        coalBusinessLicense: ''
      },
      checkData: {
        judgeResult: '',
        judgeOpinion: ''
      },
      srcList: [],
      validate: {
        resultError: false,
        opinionError: false
      }
    }
  },
  created() {
    this.enterprise = this.$route.params.enterprise
    console.log(this.enterprise)
  },
  methods: {
    preview(image) {
      this.srcList = []
      this.srcList.push(image)
    },
    submit() {
      this.checkData.username = this.enterprise.traderUsername
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

      getAxios('/manage/authentication/check', this.checkData).then(res => {
        Message.success('审核结果已提交')
        this.$emit('back', 'CompanyCheckMain')
      })
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
