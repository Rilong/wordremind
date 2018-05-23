import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Registration from '@/components/user/Registration'
import Train from '@/components/Train'
import Page404 from '@/components/Page404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/train',
      name: 'Train',
      component: Train
    },
    {
      path: '*',
      name: '404 page not found',
      component: Page404
    }
  ],
  mode: 'history'
})
