import Vue from 'vue';
import VueRouter from 'vue-router';
import DrawingBoard from './views/DrawingBoard.vue';
import store from './store'

Vue.use(VueRouter);

export default new VueRouter({
    base: '/',
    mode: 'history',
    routes: [
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
            beforeEnter:(to, from, next) => {
                if (store.getters.getLoginState == true) next({ name: 'DrawingBoard' })
                else next()
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
            beforeEnter:(to, from, next) => {
                if (store.getters.getLoginState == false) next({ name: 'Login' })
                else next()
            },
            component: () => import("./views/Profile"),
        },
        {
            path: '/404',
            alias: '*',
            name: "Error",
            component: () => import("./views/Error"),
        },
    ],
});
