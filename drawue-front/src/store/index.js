import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);


export default new Vuex.Store({
    state:{
        isLoggedIn: '',
    },
    mutations:{
        SET_STATE(state, bool){
            state.isLoggedIn = bool;
        }
    },
    actions:{
        UpdateLoginState({ commit }){
            axios.get('api/auth/state', {})
            .then((res) => {
                commit('SET_STATE', res.data);
            })
            .catch(() =>{

            });
        },
        Logout({ commit }){
            console.log("?");
            axios.get('api/auth/logout')
            .then(() => {
                commit('SET_STATE', false);
                router.push({'name': 'DrawingBoard'});
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    },
    getters:{
        getLoginState: state => {
            return state.isLoggedIn;
        }
    }
})