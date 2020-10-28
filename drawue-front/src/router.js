import Vue from 'vue';
import VueRouter from 'vue-router';
import DrawingBoard from './views/DrawingBoard.vue';
import store from './store';

Vue.use(VueRouter);

const routes = [
    { 
        path: '/', 
        name: "DrawingBoard",
        component: DrawingBoard,
    },
    {
        path: '/login',
        name: "Login",
        meta:{
            requiresNonAuth: true,
        },
        component: () => import("./views/Login"),
    },
    {
        path: '/register',
        name: "Register",
        meta:{
            requiresNonAuth: true,
        },
        component: () => import("./views/Register"),
    },
    {
        path: '/verification/:email_token',
        name: "Verification",
        component: () => import("./views/Verification"),
    },
    {
        path: '/profile',
        name: "Profile",
        meta:{
            requiresAuth: true,
        },
        component: () => import("./views/Profile"),
    },
    {
        path: '/404',
        alias: '*',
        name: "Error",
        component: () => import("./views/Error"),
    },
];
const router = new VueRouter({
    base: '/',
    mode: 'history',
    routes  //es6
})
router.beforeEach((to, from, next) => {
    var isLoggedIn;
    if (to.matched.some(record => record.meta.requiresAuth)) {
       // const store = import("./store/index.js");
        if(store){
            isLoggedIn = store.getters.getLoginState;
            if (isLoggedIn) next()
            else if(isLoggedIn===false) next({path: '/login'})
        }
    } 
    if (to.matched.some(record => record.meta.requiresNonAuth)) {
            isLoggedIn = store.getters.getLoginState;
            if (isLoggedIn) next({path: '/profile'})
            else if(isLoggedIn===false) next()
    }
    else next()
  })
export default router;