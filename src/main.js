import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
import VueRouter from 'vue-router';
import {vueStore as store} from "./store/index";
import MainPage from './pages/index.vue'
import VConsole from 'vconsole'

// 引入mock
import '@/mock'

Vue.config.productionTip = false;

Vue.use(Mint);
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainPage,
    meta: {
      keepAlive: false
    }
  }
];

const router = new VueRouter({
  routes
});


new Vue({
  render: h => h(App),
  beforeMount: function () {
  },
  router,
  store,
}).$mount('#app');

// new VConsole();
