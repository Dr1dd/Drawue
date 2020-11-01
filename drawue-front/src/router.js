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
        path: '/reset/:token',
        beforeEnter:(to, from, next) => {
            let token=to.params.token;
            next({ path: '/reset', query: { tkn: token}})
        },    
    },
    {
        path: '/reset',
        name: "Reset",
        meta:{
            requiresNonAuth: true,
        },
        component: () => import("./views/PasswordReset"),
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
        beforeEnter:(to, from, next) => {
            let email=to.params.email_token;
            next({ path: '/verification', query: { email: email}})
        }
    },
    {
        path: '/verification',
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
        if(store){
            isLoggedIn = store.getters.getLoginState;
            if (isLoggedIn) next();
            else next('login');
        }
    } 
    if (to.matched.some(record => record.meta.requiresNonAuth)) {
            isLoggedIn = store.getters.getLoginState;
            if (isLoggedIn) next('profile');
            else next();
    }
    else next()
  })
export default router;