<template>
  <el-container style="height: 969px; border: 1px solid #eee">
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
      <div>
        <el-avatar :size="150" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      </div>
      <div class="" />
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#8BAAC9"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location" />
            <span>后台用户管理</span>
          </template>
          <el-menu-item-group>
            <router-link class="routerLink" :to="{name: 'ManageCreate'}"><el-menu-item>创建后台用户</el-menu-item></router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location" />
            <span>审核</span>
          </template>
          <el-menu-item-group>
            <router-link class="routerLink" :to="{name: 'TransInfoMain'}"><el-menu-item index="2-1">挂牌信息</el-menu-item></router-link>
            <router-link class="routerLink" :to="{name: 'CompanyCheckMain'}"><el-menu-item index="2-2">企业资质</el-menu-item></router-link>

          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-aside>

    <el-main>

      <router-view @getInfo="showInfo" @back="backToMainView" />

    </el-main>

  </el-container>

</template>

<script>
// import Infor from '@/components/Infor'
export default {
  name: 'BackHome',
  components: {

  },
  data() {
    return {

    }
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
