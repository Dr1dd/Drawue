<template>
  <div class ="login-container">
      <div class="login-module">
          <div class="login-header">
              Login
          </div>
          <div class="login-form--wrapper">
            <div class="social-form">

            </div>
            <div class="login-form">
                <input type="text" placeholder="Username/Email" v-model="user['email_username']">
                <input type="password" placeholder="Password" v-model="user['password']">
                <div class="btn" @click="login">
                    Login
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data(){
        return{
            user:{
                email_username: '',
                password: '',
            }
        }
    },
    methods:{
        login(){
            var username_email = this.user.email_username;
            var password = this.user.password;
            axios.post('api/auth/login', {username_email, password }, {})
                .then((res) => {
                    if (res.data) {
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err.response);
                });
        }
    }

}
</script>

<style lang="scss">
 .login-container{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: 100vh;
     width: 100%;
 }
 .login-module{
     display: flex;
     flex-direction: column;
     background: white;
     border-radius: 15px;
     .login-header{
        display: flex;
        justify-content: center;
        padding: 10px;
        background: #717171;
        color: white;
        font-size: 25px;
        font-weight: 700;
        border-radius: 13px 13px 0 0;
     }
     .login-form--wrapper{
        display: flex;
        flex-direction: row;
        .social-form{

        }
        .login-form{
            display: flex;
            flex-direction: column;
            padding: 20px;
            
        }
     }
 }
</style>