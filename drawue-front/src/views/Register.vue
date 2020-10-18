<template>
  <div class ="register-container">
      <div class="register-module">
          <div class="register-header">
              Sign In
          </div>
          <div class="register-form--wrapper">
            <div class="register-form">
                <input type="text" placeholder="Username" v-model="user['username']">
                <input type="email" placeholder="Email" v-model="user['email']">
                <input type="password" placeholder="Password" v-model="user.password">
                <input type="password" placeholder="Confirm Password" v-model="user.passwordConfirm">
                <div class="btn" @click ="register">
                    Sign In
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'Register',
    data(){
        return{
            user:{
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
            }
        }
    },
    methods:{
        register(){
            var username = this.user.username;
            var email = this.user.email;
            var password = this.user.password;
            axios.post('api/auth/register', {username, email, password }, {})
                .then((res) => {
                    if (res.data) {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
}
</script>

<style lang="scss">
 .register-container{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: 100vh;
     width: 100%;
 }
 .register-module{
     display: flex;
     flex-direction: column;
     background: white;
     border-radius: 15px;
     .register-header{
        display: flex;
        justify-content: center;
        padding: 10px;
        background: #717171;
        color: white;
        font-size: 25px;
        font-weight: 700;
        border-radius: 13px 13px 0 0;
     }
     .register-form--wrapper{
        display: flex;
        flex-direction: row;
        .register-form{
            display: flex;
            flex-direction: column;
            padding: 20px;
            
        }
     }
 }
</style>