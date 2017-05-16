import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Web3Unavailable from '@/components/Web3Unavailable'
import Address from '@/components/Address'
import NewAddress from '@/components/NewAddress'
import InvalidAddress from '@/components/InvalidAddress'
import History from '@/components/History'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/web3-unavailable',
      name: 'Web3Unavailable',
      component: Web3Unavailable
    },
    {
      path: '/new',
      name: 'NewAddress',
      component: NewAddress
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/:privateKey',
      name: 'Address',
      component: Address
    },
    {
      path: '/invalid',
      name: 'InvalidAddress',
      component: InvalidAddress
    }
  ]
})
