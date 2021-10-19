<template>
  <el-container style="height:auto; min-height:800px;border: 1px solid #eee">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
      <div>
        <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="" />
      <el-menu
        active-name="infor"
        default-active="1"
        router
        class="el-menu-vertical-demo"
        background-color="#8BAAC9"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span style="text-size:20px">账户信息</span>
          </template>
          <el-menu-item-group>
            <router-link class="routerLink" :to="{name:'Infor',params:{username:username}}"><el-menu-item>用户信息</el-menu-item></router-link>

            <router-link :to="{name:'MyTradeMain'}"><el-menu-item>交易信息</el-menu-item></router-link>
            <router-link :to="{name:'Authentication'}"><el-menu-item>资质认证</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location" />
            <span>挂牌信息</span>
          </template>
          <el-menu-item-group>
            <router-link :to="{name:'BuyerListing'}"><el-menu-item>买方挂牌</el-menu-item></router-link>
            <router-link :to="{name:'SellerListing'}"><el-menu-item>卖方挂牌</el-menu-item></router-link>

            <router-link :to="{name:'ListSubmission'}"><el-menu-item>挂牌信息发布</el-menu-item></router-link>

          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location" />
            <span>消息中心</span>
          </template>
          <el-menu-item-group>
            <router-link :to="{name:'Message'}"><el-menu-item index="3-1">我的消息</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <router-view @getInfo="showInfo" @back="backToMainView" />

      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import { getAxios } from '../api/request'
export default {
  name: 'FrontHome',
  components: {

  },
  data() {
    return {
      username: '',

      componentName: 'Infor'
    }
  },
  created() {
    this.username = this.$route.params.username
    const params = { 'username': this.username }
    getAxios('/user/query', params).then(res => {
      console.log(res)
      this.trader = res.data
      localStorage.setItem('userInfo', JSON.stringify(res.data))
    }).catch((e) => { })
    this.$route.push('Infor')
  },
  methods: {
    showInfo(info) {
      const params = info.params
      const name = info.name
      this.$router.push({ 'name': name, params: params })
    },
    backToMainView(name) {
      console.log(name)
      this.$router.push({ 'name': name })
    }

  }

}

</script>

<style>
.routerLink{
  text-decoration: none;
}

</style>
