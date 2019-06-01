import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css';
import VueRouter from 'vue-router';

import Home from './components/Home.vue'
import Article from './components/Article.vue'

import MainPage from './pages/index.vue'

// 引入mock
import '@/mock'

Vue.config.productionTip = false;

Vue.use(Mint);
Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/article',
    component: Article,
    meta: {
      keepAlive: false
    }
  },{
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
  router
}).$mount('#app');
