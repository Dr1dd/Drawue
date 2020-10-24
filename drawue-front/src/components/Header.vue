<template>
  <div class="header">
      <div class="auth-section" v-if="getLoginState !=true">
        <router-link to="/login"><div class="sign-in"> Sign In</div></router-link>
        <router-link to="/register"><div class="sign-up"> Sign Up</div></router-link>
      </div>
      <div v-else>
        <div class="logout" @click="logOut">
          Logout
        </div>
        <router-link to="/profile"><div> Profile</div></router-link>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Header',
    computed: {
      ...mapGetters(['getLoginState'])
    },
    methods:{
      logOut(){
        this.$store.dispatch('Logout');
      }
    }
}
</script>

<style lang="scss">
 .header{
    display: flex;
    height: 48px;
    width: 100%;
    background: white;
    position: fixed;
    z-index: 999;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.8);
 }
</style>