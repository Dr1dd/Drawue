import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';
// import router from '../router';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        isLoggedIn: '',
        userProfilePic: '',
        username: '',
        email: '',
        totalLikes: 0,
        totalDrawings: 0,
    },
    mutations:{
        SET_STATE(state, bool){
            state.isLoggedIn = bool;
        },
        SET_PROFILE_PIC(state, path){
            state.userProfilePic = path;
        },
        SET_USERNAME(state, username){
            state.username = username;
        },
        SET_EMAIL(state, email){
            state.email = email;
        },
        SET_LIKE_COUNT(state, likes){
            state.totalLikes = likes;
        },
        SET_DRAWINGS_COUNT(state, drawings){
            state.totalDrawings = drawings;
        },
    },
    actions:{
        UpdateLoginState({ commit }){
            return new Promise(( resp, rej ) => {
                axios.get('/api/auth/state')
                .then((res) => {
                    if(res.data.login) commit('SET_STATE', res.data.login);
                    else commit('SET_STATE', res.data);
                    if(res.data.path) commit('SET_PROFILE_PIC', res.data.path);
                    if(res.data.username) commit('SET_USERNAME', res.data.username);
                    if(res.data.email) commit('SET_EMAIL', res.data.email);
                    if(res.data.totalLikes) commit('SET_LIKE_COUNT', res.data.totalLikes);
                    if(res.data.totalDrawings) commit('SET_DRAWINGS_COUNT', res.data.totalDrawings);
                    resp();
                })
                .catch((err) =>{
                    console.log("dsf");
                    rej(err);
                });
            });
        },
        Logout({ commit }){
            axios.get('/api/auth/logout')
            .then(() => {
                commit('SET_STATE', false);
                router.push({path:'/'});
            })
            .catch(() =>{
                
            })
        },
        UpdateProfilePic( {commit, path} ){
            commit('SET_PROFILE_PIC', path);
        }
    },
    getters:{
        getLoginState: state => {
            return state.isLoggedIn;
        },
        getProfilePic: state => {
            return state.userProfilePic;
        },
        getUsername: state =>{
            return state.username;
        },
        profileStats: state =>{
            return [state.totalLikes, state.totalDrawings];
        }
    }
})