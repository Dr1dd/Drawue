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
        // {
        //     path: '/404',
        //     alias: '*',
        //     name: "NotFound",
        //     component: () => import("./views/NotFound"),
        // }
    ]
});