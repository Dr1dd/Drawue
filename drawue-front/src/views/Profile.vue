<template>
  <div class="profile-container">
      <div class="profile-module">
          <div class="user-details">
            <div class="profile-picture">

            </div>
            <div class="profile-username"> {{ user.username }}</div>
            <div class="profile-email"> {{ user.email }}</div>
          </div>
          <div class="password-change">
              
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Profile',
    data(){
        return{
            user:{
                username: '',
                email: ''
            }
        }
    },
    created(){
        axios.get('api/profile/user')
        .then((res)=>{
            console.log(res.data);
            this.user.username = res.data.username;
            this.user.email = res.data.email;
            //this.$store.commit("UPDATE_LOGIN", true);
            //console.log(this.$store.getters.getLoginState);
        })
        .catch((err)=>{
            console.log(err.response);
            //this.$store.commit("UPDATE_LOGIN", false);
            //console.log(this.$store.getters.getLoginState);
        });

    }
}
</script>

<style lang="scss" scoped>
    .profile-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        .profile-module{
            display: flex;
            flex-direction: column;
            padding: 20px;
            background: white;
            .user-details{
                display: flex;
                flex-direction: row;
            }
        }
    }
</style>