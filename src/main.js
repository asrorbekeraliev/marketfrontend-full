import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Router from"/src/routers"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as config from './config/config.js'
import AccountService from "@/account/account.service";
import store from '../src/account/Store'

Vue.config.productionTip = false
Vue.use(VueRouter)
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, {locale})
config.initVueApp(Vue)
const router = new VueRouter({
    routes: Router
})

router.beforeEach((to, from, next)=>{
    if (!to.matched.length){
        next('/not-found')
    }
    if (to.meta && to.meta.authorities && to.meta.authorities.length > 0){
        new AccountService(router, store).hasAnyAuthorityAndAuth(to.meta.authorities).then(value => {
            if (!value){
                sessionStorage.setItem("request-url", to.fullPath)
                next("/forbidden")
            } else {
                next();
            }
        })
    } else {
        next();
    }
})


new Vue({
    render: h => h(App),
    router: router,
    store: store
}).$mount('#app')