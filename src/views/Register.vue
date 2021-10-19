<template>
  <div id="app">
    <h2 style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align:left;">
      用户注册
    </h2>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="loginRules"
      label-width="100px"
    >

      <!-- .trim 处理空格，这里为禁止输入空格 -->

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="账户：" prop="username">
            <el-input v-model="form.username" size="small" style="margin-top:5px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="密码：" prop="password">
            <el-input v-model="form.password" size="small" type="password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="姓名：" prop="fullName">
            <el-input v-model="form.fullName" size="small" style="margin-top:5px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="用户类型：" prop="userType">
            <!-- <el-input v-model="form.userType" size="small"></el-input> -->
            <el-select v-model="form.userType" prop="userType" class="userType" placeholder="请选择用户类型" style="margin-top:5px;height:100%;" size="medium">
              <el-option label="买家" value="0" />
              <el-option label="卖家" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button @click="submit">注册</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Register',

  data() {
    var validatePass = function(rule, value, callback) {
      if (/^(?![0-9]+$)(?![a-z]+$)(?![0-9a-z]+$)(?![0-9A-Z]+$)(?![0-9a-zA-Z]+$)^.{6,}$/.test(value)) {
        callback()
      } else {
        callback(new Error('长度不少于6位,包含数字大小写字母特殊字符'))
      }
    }
    var validatePass2 = function(rule, value, callback) {
      if (/^[0|1]*$/.test(value)) {
        callback()
      } else {
        callback(new Error('只能输入0或1'))
      }
    }
    //  var validatePass3 = function (rule, value, callback) {
    //    if (/^[\u4e00-\u9fa5]+$/.test(value)) {
    //      callback();
    //    } else {
    //      callback(new Error("只能输入汉字"));
    //    }
    //  };
    return {
      form: {
        username: '',
        password: '',
        userType: '',
        fullName: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名' },
          { min: 6, max: 11, message: '请输入6-12个字符' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { validator: validatePass }
        ],
        userType: [
          { required: true, message: '请选择用户类型(0表示买家,1表示卖家)' },
          { validator: validatePass2 }
        ],

        fullName: [
          { required: true, message: '请输入姓名' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ]
      }

    }
  },
  methods: {
    test() {
      this.$axios({
        url: 'api/user/testToken',
        methods: 'get',
        headers: { 'Access-Control-Allow-Origin': true },
        params: {
          info: 'test'
        }
      })
    },
    submit() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          const xhr = new XMLHttpRequest()
          xhr.open('POST', 'api/user/register')
          xhr.setRequestHeader('content-type', 'application/json')
          xhr.setRequestHeader('Access-Control-Allow-Origin', true)
          xhr.setRequestHeader('token', '1231321312')
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log(xhr.response)

                var response = JSON.parse(xhr.response)

                if (response.code === 200) {
                  this.$message.success('注册成功')
                  this.$router.push({ 'path': '/' })
                } else {
                  this.$message.warning('用户名已注册,注册失败')
                }
              } else {
                console.log(xhr.response)
              }
            }
            // else {
            //   console.log('网络错误')
            // }
          }
          console.log(JSON.stringify(this.form))
          xhr.send(JSON.stringify(this.form))
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style scoped>

input::-webkit-input-placeholder {
    color: #c0c4cc;
    font-size:50px;
  }
  input::-moz-input-placeholder {
    color: #c0c4cc;
    font-size:50px;
  }
  input::-ms-input-placeholder {
    color: #c0c4cc;
    font-size:50px;
  }
</style>

