//import axios from 'axios';

const state ={
    token: '',
};

const getters ={
    getToken: state => state.token
};

const actions ={
    // async verifyToken({ commit }){
    //     const response await axios.get('api/auth/verifyToken', state.token)
    // }
};

const mutations ={};

export default {
    state,
    getters,
    actions,
    mutations
}