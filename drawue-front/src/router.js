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
        children: [
            {
              path: ':username/drawing/:drawingID',
              name: 'ProfileDrawingPost',
              props: true,
              component: () => import("./views/DrawingPost"),
            }
        ]
    },
    {
        path: '/user/:username',
        name: "UserProfile",
        component: () => import("./views/UserProfile"),
        children: [
            {
              path: '/user/:username/drawing/:drawingID',
              name: 'UserDrawingPost',
              props: true,
              component: () => import("./views/DrawingPost"),
            }
        ],
        beforeEnter: (to, from, next) => {
            var username = store.getters.getUsername;
            if(username == to.params.username) next({name: 'Profile'});
            else next();

        }
    },
    {
        path: '/gallery',
        name: "Gallery",
        component: () => import("./views/Gallery"),
        children: [
            {
              path: '/:username/drawing/:drawingID',
              name: 'DrawingPost',
              props: true,
              component: () => import("./views/DrawingPost"),
            }
        ]
    },
    {
        path: '/gallery3D',
        name: "Gallery3D",
        component: () => import('./views/3DGallery')
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