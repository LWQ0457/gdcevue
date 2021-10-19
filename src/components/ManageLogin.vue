<template>
  <div id="divbox">
    <h3>后台用户登录</h3>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
          @keyup.enter.native="submitForm('ruleForm')"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')"> 重置 </el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm('ruleForm')"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { axios } from '../api/axios'
export default {
  name: 'ManageLogin',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      },
      loading: false
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 表单校验不合法则退出函数
        if (!valid) {
          return
        }

        this.loading = true
        axios
          .post('/manage/login', this.ruleForm)
          .then((res) => {
            this.loading = false
            if (res.data.code === 200) {
              localStorage.setItem('token', res.data.data)
              this.$message.success(res.data.msg)
              // this.$router.push("/managecreate");
              this.$router.push({ path: '/backHome' })
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch((err) => {
            console.log(err)
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          })
      })
    }
  }
}
</script>

<style>
#divbox {
  width: 500px;
  height: 300px;
  border: 1px solid rgb(121, 109, 109);
  margin: 150px auto;
  padding: 20px 50px 20px 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgb(121, 109, 109);
}
</style>
