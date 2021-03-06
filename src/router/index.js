import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index/Index'
import Best from '@/pages/best/Best'
import Moch from '@/pages/moch/Moch'
import Classify from '@/pages/classify/Classify'
import User from '@/pages/user/User'
import Detail from '@/pages/detail/Detail'
import Search from '@/pages/search/Search'
import SearchList from '@/pages/searchlist/SearchList'
import Favorite from '@/pages/favorite/Favorite'
import Cat from '@/pages/cat/Cat'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/best/',
      name: 'Best',
      component: Best,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/moch/',
      name: 'Moch',
      component: Moch,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
      meta: {
        keepAlive: false, 
        isBack: false
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/searchlist/:key',
      name: 'SearchList',
      component: SearchList,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/cat/:adzoneId/:materialId/:channelName',
      name: 'Cat',
      component: Cat,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite,
      meta: {
        keepAlive: true, 
        isBack: false
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
