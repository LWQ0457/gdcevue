<template>
  <div id="divbox">
    <h3>后台用户注册</h3>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="姓名" prop="fullName">
        <el-input v-model="ruleForm.fullName" />
      </el-form-item>
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="ruleForm.userType" placeholder="请选择用户类型">
          <el-option label="资讯编辑人员" value="001"></el-option>
          <el-option label="注册审核人员" value="010"></el-option>
          <el-option label="交易审核人员" value="011"></el-option>
          <el-option label="资讯审核人员" value="100"></el-option>
          <el-option label="资讯维护人员" value="101"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('ruleForm')"> 重置 </el-button>
        <el-button
          type="primary"
          :loading="loading"
          @click="submitForm('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { axios } from "../api/axios";
export default {
  name: "ManageCreate",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        fullName: "",
        userType: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
        fullName: [{ required: true, message: "请输入姓名" }],
        userType: [{ required: true, message: "请选择用户类型" }],
      },
      loading: false,
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 表单校验不合法则退出函数
        if (!valid) {
          return;
        }

        this.loading = true;
        const token = localStorage.getItem("token");
        if (!token) {
          this.$message.error("没有token");
          return;
        }
        axios.defaults.headers.common["token"] = token;
        axios
          .post("/manage/staff/create", this.ruleForm)
          .then((res) => {
            this.loading = false;
            if (res.data.code === 200) {
              //localStorage.setItem('token', res.data.data)
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
              console.log(res);
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message({
              message: "网络错误",
              type: "error",
            });
          });
      });
    },
  },
};
</script>

<style>
#divbox {
  width: 500px;
  height: 400px;
  border: 1px solid rgb(121, 109, 109);
  margin: 150px auto;
  padding: 20px 50px 20px 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px rgb(121, 109, 109);
}
</style>