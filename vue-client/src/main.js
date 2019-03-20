import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router';
import Documents from "./components/documents/Documents";
import Blacklist from "./components/blacklist/Blacklist";
import Stats from "./components/stats/Stats";
import Home from "./components/Home";

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
    {path: '/', component: Home},
    {path: '/documents', component: Documents},
    {path: '/blacklist', component: Blacklist},
    {path: '/stats', component: Stats}
];

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
