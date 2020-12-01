import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import Vuelidate from 'vuelidate'
import router from "./router";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt, faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser, faSignOutAlt, faFilter)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Vuelidate)
 store.dispatch('UpdateLoginState')
  .then(()=>{
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
    
  })
  .catch((err)=>{
    console.log(err);
  });