// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './assets/css/public.css'
import App from './App'
import router from './router'
import rem from './assets/js/rem'

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;



// import vue_swiper from 'vue-awesome-swiper'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});

localStorage.big_img = "http://testimgcdn.taochuhui.com/Image/big" //原图接口
localStorage.middle_img = "http://testimgcdn.taochuhui.com/Image/middle" //中图接口
localStorage.small_img = "http://testimgcdn.taochuhui.com/Image/small" //小图接口
    // localStorage.weburl = "http://192.168.2.241:8090" //接口地址
localStorage.weburl = "http://192.168.2.180" //测试接口地址
// localStorage.weburl = "http://localhost:11164" //本地测试接口地址