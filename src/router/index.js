import Vue from 'vue';
import VueRouter from 'vue-router'
import Home from '../views/Home.vue';
import FundDetails from '../views/FundDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:code',
    name: 'FundDetails',
    component: FundDetails
  }
];

const router = new VueRouter({
  routes
});

export default router;
