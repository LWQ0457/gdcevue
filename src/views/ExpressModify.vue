<template>
  <div>
    <el-page-header content="物流更新" @back="goBack" />
    <h2 style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align:left;">
      物流信息更新
    </h2>
    <el-form
      id="form1"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="物流单号：" prop="num">
            <el-input v-model="ruleForm.num" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="起始地：" prop="origin">
            <el-input v-model="ruleForm.origin" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="目的地：" prop="destination">
            <el-input v-model="ruleForm.destination" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="当前地点：" prop="currentLocation">
            <el-input v-model="ruleForm.currentLocation" clearable />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="承运商：" prop="carrier">
            <el-input v-model="ruleForm.carrier" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button
              type="primary"
              :loading="loading"
              @click="submitForm('ruleForm')"
            >更新</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { postAxios } from '../api/request'
export default {
  name: 'ExpressModify',

  data() {
    return {
      ruleForm: {
        orderNum: '',
        num: '',
        origin: '',
        destination: '',
        currentLocation: '',
        carrier: ''
      },
      rules: {
        num: [{ required: true, message: '请输入物流单号' }],
        origin: [{ required: true, message: '请输入起始地' }],
        destination: [{ required: true, message: '请输入目的地' }],
        currentLocation: [{ required: true, message: '请输入当前地点' }],
        carrier: [{ required: true, message: '请输入承运商' }]
      },
      loading: false
    }
  },
  created() {
    this.ruleForm.orderNum = this.$route.params.order.num
    console.log(this.ruleForm.orderNum)
  },
  methods: {
    goBack() {
      this.$emit('back', 'MyTradeMain')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 表单校验不合法则退出函数
        if (!valid) {
          return
        }
        this.loading = true
        postAxios('/trade/express/modify', this.ruleForm).then(res => {
          Message.success('更新成功')
          this.loading = false
        }).catch((e) => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style>

</style>
