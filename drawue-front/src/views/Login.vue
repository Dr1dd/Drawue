<template>
  <div class ="login-container">
      <div class="login-module">
          <div class="login-header">
              Login
          </div>
          <div class="login-form--wrapper">
            <div class="login-form">
                <div class="input-container">
                    <input type="text" placeholder="Username/Email" maxlength="128" v-model="$v.email_username.$model"  @blur="$v.email_username.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.email_username.$dirty && !$v.email_username.required">Field is required</div>
                        <div class="error" v-else-if="$v.email_username.$dirty && !$v.email_username.minLength">Username/Email must have at least {{$v.email_username.$params.minLength.min}} characters.</div>
                        <div class="error" v-else-if="backendError"> {{backendError}} </div>
                    </transition>
                    <input type="password" placeholder="Password" v-model="$v.password.$model" @blur="$v.password.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.password.$dirty && !$v.password.required">Field is required</div>
                        <div class="error" v-else-if="$v.password.$dirty && !$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} characters.</div>
                    </transition>
                </div>
                <div class="btn" @click="login">
                    Login
                </div>
            </div>
            <div class="social-form">
                <div class="social-buttons">
                    <div class="btn"><a href="api/auth/facebook">Facebook </a></div>
                    <div class="btn"><a href="api/auth/google/authentication">Google </a></div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    data(){
        return{
            email_username: '',
            password: '',
            backendError: '',
        }
    },
    validations: {
        email_username: {
            required,
            minLength: minLength(8),  
        },
        password: {              
            required,
            minLength: minLength(8),   
            maxLength: maxLength(100),    
        }

    },
    methods:{
        login(){

            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            var username_email = this.email_username;
            var password = this.password;
            axios.post('api/auth/login', {username_email, password }, {})
            .then(() => {
                this.$store.dispatch('UpdateLoginState');
                this.$router.push('/profile');
            })
            .catch((err) => {
                this.backendError = err.response.data;
            });
        },

    }

}
</script>

<style lang="scss">
$module-theme: #86a1b8;
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
     box-shadow: 0px 0px 4px -2px #000000;
     border-radius: 15px;
     .login-header{
        display: flex;
        justify-content: center;
        padding: 10px;
        background: $module-theme;
        color: white;
        font-size: 25px;
        font-weight: 700;
        border-radius: 13px 13px 0 0;
     }
     .login-form--wrapper{
        display: flex;
        flex-direction: row;
        padding: 10px 32px 32px;
        .login-form{
            display: flex;
            flex-direction: column;
            padding-right: 32px;
            border-right: 3px solid $module-theme;
            .input-container{
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
            }
            &::after{
                content: '';
                height: 100%;
                width: 2px;
                background: black;
            }   
        }
        .social-form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 20px;

        }
     }
 }
</style>