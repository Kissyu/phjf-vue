import Vue from 'vue'
import Router from 'vue-router'
import PolicyIndex from '@/components/zh/policys/PolicyIndex'
import PolicySearchList from '@/components/zh/policys/PolicySearchList'
import PolicyInfo from '@/components/zh/policys/PolicyInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/phjf/api/v1/page/policyIndex',
      name: 'PolicyIndex',
      component: PolicyIndex,
      alias: '/phjf/api/v1/page/zh/policyIndex'
    },
    {
      path: '/phjf/api/v1/page/policySearchList',
      name: 'PolicySearchList',
      component: PolicySearchList,
      alias: '/phjf/api/v1/page/zh/policySearchList'
    },
    {
      path: '/phjf/api/v1/page/policyInfo',
      name: 'PolicyInfo',
      component: PolicyInfo,
      alias: '/phjf/api/v1/page/zh/policyInfo'
    }
  ]
})
