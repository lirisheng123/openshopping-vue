
import Vue from 'vue';
import { router } from './config/router';
import './config/rem';
import App from './App.vue';
import VueLazyload from 'vue-lazyload'
import components from './config/components.js';
import ElementUI from 'element-ui';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import payment from 'vue-payment';  // 引用
// import "./cube.min.css"
// import CubeUI from  "./cube.min"

// Vue.use(CubeUI)
Vue.use(payment);

Vue.use(components);

Vue.use(VueLazyload);

Vue.use(ElementUI);

Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});