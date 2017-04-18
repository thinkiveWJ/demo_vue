import Vue from 'vue'
import Router from 'vue-router'
import userStatistics from '../components/dataAnalysis/userStatistics';
Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: userStatistics
    },
    {
      path: '/dataAnalysis/userStatistics',
      component: userStatistics
    },

  ]

});
