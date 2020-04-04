// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import router from './router'
import fastClick from 'fastclick'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import store from './store'
import 'styles/reset.css'
import 'styles/border.css'
import 'styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(vueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1, // 预加载高度的比例
  error: 'https://img.alicdn.com/imgextra/i1/790237325/O1CN01zS031123ytm0PzAmE_!!790237325.png?t=1585879843000', // 图像的src加载失败
  loading: 'https://img.alicdn.com/imgextra/i1/790237325/O1CN01zS031123ytm0PzAmE_!!790237325.png?t=1585879843000', // src的图像加载
  attempt: 1, // 尝试计数
  listenEvents: [ 'scroll', 'mousewheel', 'touchmove' ] // 你想要监听的事件
}) 
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
