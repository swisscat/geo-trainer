import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faSync, faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import App from "./App";
import Home from "./screen/Home";
import Database from "./screen/Database";
import loaderBuilder from './data/loader';
import config from './config';
import Quizz from "./screen/Quizz";
import Improve from "./screen/Improve";

Vue.config.productionTip = false;

library.add(faHeart, faSync, faCheck, faSpinner);

Vue.component('font-awesome-icon', FontAwesomeIcon);

const loader = loaderBuilder({mock: config.mock});
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const userId = localStorage.getItem('userId') || [...Array(10)].map(Math.random).map(s => s.toString(36)).map(s => s.replace(/[^a-z]+/g, '')).join('').substring(0,32);
localStorage.setItem('userId', userId);

firebase.initializeApp(config.firebase);
const database = firebase.firestore();

new Vue({
  render: h => h(App, {
    props: {
      version: config.version,
      loader,
      userId,
    }
  }),
  router: new VueRouter({
    routes: [
      { path: '/all', component: Database, props: {dataFields: config.dataFields} },
      { path: '/quizz', component: Quizz, props: {dataFields: config.dataFields, thresholds: config.thresholds, database, userId} },
      { path: '/improve', component: Improve, props: { database, userId} },
      { path: '*', component: Home },
    ]
  }),
}).$mount('#app');
