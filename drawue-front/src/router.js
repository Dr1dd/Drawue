import Vue from 'vue';
import VueRouter from 'vue-router';
import DrawingBoard from './views/DrawingBoard.vue';

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
            component: () => import("./views/Login"),
        },
        {
            path: '/register',
            name: "Register",
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
            component: () => import("./views/Profile"),
        },
        {
            path: '/404',
            alias: '*',
            name: "Error",
            component: () => import("./views/Error"),
        }
    ]
});