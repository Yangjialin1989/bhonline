// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick';
//1.1ElementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//1.2ElementUI组件挂载到vue实例
Vue.use(ElementUI)


import router from './router'

import store from './store'



//2.1lib-fexiible
import 'lib-flexible/flexible.js'
//2.2 build-utils.js

import './style.css'

//3.添加jquery
import 'jquery'

//4.引入vant插件
//4.1引入
import {Button} from 'vant'
import { Rate } from 'vant';
import { Sticky } from 'vant'
import { Uploader } from 'vant';
import { NoticeBar } from 'vant';
import { Skeleton } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { AddressEdit } from 'vant';
import { Overlay } from 'vant';
import { Area } from 'vant'
import { Icon } from 'vant';











//4.2

//4.3vant挂载
Vue.use(Button)
Vue.use(Rate);
Vue.use(Sticky)
Vue.use(Uploader);
Vue.use(NoticeBar);
Vue.use(Skeleton);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(AddressEdit);
Vue.use(Overlay);
Vue.use(Area);
Vue.use(Icon);
//移动端延时
FastClick.attach(document.body);




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
