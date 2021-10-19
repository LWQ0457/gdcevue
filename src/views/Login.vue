<template>
  <div>
    <UserLogin v-if="param" />
    <ManageLogin v-else />
    <el-button type="primary" @click="swap">切换用户登录</el-button>
    <router-link to="/register"><el-button type="primary" style="margin:10px;">去注册</el-button></router-link>
    
  </div>
</template>

<script>
import ManageLogin from '../components/ManageLogin.vue'
import UserLogin from '../components/UserLogin.vue'
export default {
  name: 'Login',
  components: { UserLogin, ManageLogin },
  data() {
    return {
      param: true
    }
  },
  methods: {
    swap() {
      this.param = !this.param
    }
  }
}
</script>

<style>

</style>
