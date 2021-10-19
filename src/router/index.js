import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Infor from '../components/Infor.vue'
import FrontHome from '../views/FrontHome.vue'
import CompanyCheckMain from '../views/manage/CompanyCheckMain.vue'
import CompanyCheck from '../views/manage/CompanyCheck.vue'
import BackHome from '../views/BackHome'
import ManageCreate from '../views/ManageCreate.vue'
import TransInfoMain from '../components/TransInfoMain.vue'
import TransInfo from '../components/TransInfo.vue'
import ExpressModify from '../views/ExpressModify'
import ListDetailsPage from '@/views/ListDetailsPage'
import ListSubmission from '@/views/ListSubmission'
import BuyerListing from '@/components/BuyerListing'
import SellerListing from '@/components/SellerListing'
import Message from '@/components/Message'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import('../views/Register.vue')
  },
  {
    path: '/frontHome',
    name: 'FrontHome',
    component: FrontHome,
    children: [{
      path: 'infor',
      name: 'Infor',
      component: Infor
    },
    {
      path: 'authentication',
      name: 'Authentication',
      component: () =>
        import('../components/Authentication.vue')

    },
    {
      path: '/expressModify',
      name: 'ExpressModify',
      component: ExpressModify
    },
    {
      path: '/listDetailsPage',
      name: 'ListDetailsPage',
      component: ListDetailsPage
    },
    {
      path: '/listSubmission',
      name: 'ListSubmission',
      component: ListSubmission
    },
    {
      path: '/buyerListing',
      name: 'BuyerListing',
      component: BuyerListing
    },
    {
      path: '/sellerListing',
      name: 'SellerListing',
      component: SellerListing
    },
    {
      path: '/message',
      name: 'Message',
      component: Message

    }, {
      path: '/myTradeMain',
      name: 'MyTradeMain',
      component: () =>
        import('../components/MyTradeMain.vue')
    },
    {
      path: '/myTradeDetail',
      name: 'MyTradeDetail',
      component: () =>
        import('../components/MyTradeDetail.vue')
    },
    {
      path: '/expressModify',
      name: 'ExpressModify',
      component: () =>
        import('../views/ExpressModify.vue')

    },
    {
      path: '/listModify',
      name: 'ListModify',
      component: () =>
        import('../views/ListModify.vue')

    }
    ]
  },
  {
    path: '/backHome',
    name: 'BackHome',
    component: BackHome,
    children: [
      {
        path: 'manageCreate',
        name: 'ManageCreate',
        component: ManageCreate
      },
      {
        path: '/companyCheckMain',
        name: 'CompanyCheckMain',
        component: CompanyCheckMain
      },
      {
        path: '/companyCheck',
        name: 'CompanyCheck',
        component: CompanyCheck
      },
      {
        path: '/transInfoMain',
        name: 'TransInfoMain',
        component: TransInfoMain
      },
      {
        path: '/transInfo',
        name: 'TransInfo',
        component: TransInfo
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
