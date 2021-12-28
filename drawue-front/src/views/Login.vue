<template>
  <div class ="login-container">
      <div v-if="forgotPassword" class="forgot-module">
          <div class="module-header">
              Account Recovery
          </div>
          <div class="module-form--wrapper">
                <div v-if="!emailSent" class="input-container">
                    <input type="text" placeholder="Email Address" maxlength="128" v-model="$v.email.$model"  @blur="$v.email.$touch()">
                      <transition name="fade">
                        <div class="error" v-if="$v.email.$dirty && !$v.email.required">Field is required</div>
                        <div class="error" v-else-if="$v.email.$dirty && !$v.email.minLength">Email must have at least {{$v.email.$params.minLength.min}} characters.</div>
                                 <div class="error" v-else-if="$v.email.$dirty && !$v.email.email">Email must be formatted correctly.</div>
                        <div class="error" v-else-if="backendError"> {{backendError}} </div>
                     </transition>
                    <div class="btn" @click="resetPassword">Reset Password</div>
                </div>
                <div v-else>
                    A password recovery link has been sent to you by email. When you receive it, click the link to open window where you can enter a new password.
                    <div class="btn" @click="forgotPassword = false; emailSent = false">Go to Login</div>
                </div>
          </div>
      </div>
      <div v-else class="login-module">
          <div class="module-header">
              Login
          </div>
          <div class="module-form--wrapper">
            <div class="login-form">
                <div class="input-container">
                    <input type="text" placeholder="Username/Email" maxlength="128" v-model.lazy="$v.login.email_username.$model"  @blur="$v.login.email_username.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.login.email_username.$dirty && !$v.login.email_username.required">Field is required</div>
                        <div class="error" v-else-if="$v.login.email_username.$dirty && !$v.login.email_username.minLength">Username/Email must have at least {{$v.login.email_username.$params.minLength.min}} characters.</div>
                        <div class="error" v-else-if="backendError"> {{backendError}} </div>
                    </transition>
                    <input type="password" placeholder="Password" v-model.lazy="$v.login.password.$model" @blur="$v.login.password.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.login.password.$dirty && !$v.login.password.required">Field is required</div>
                        <div class="error" v-else-if="$v.login.password.$dirty && !$v.login.password.minLength">Password must have at least {{$v.login.password.$params.minLength.min}} characters.</div>
                    </transition>
                </div>
                <div class="btn loader" @click="userLogin" @keyup.enter='userLogin'>
                    <div class="login-loader" v-if="loading">
                        <Loader color="white" loaderType="bubble" />
                    </div>
                    Login 
                    <div class="login-loader" v-if="loading">
                        <Loader color="white" loaderType="bubble" />
                    </div>
                </div>
            </div>
            <div class="social-form">
                <div class="social-buttons">
                    <a href="api/auth/facebook">
                        <img src="../assets/facebook.jpg" alt="">
                        <span>Sign in with Facebook </span>
                  
                    </a>
                    <a href="api/auth/google/authentication">
                        <img src="../assets/google.jpg" alt="">
                        <span>Sign in with Google </span>
                    </a>
                    <span class="forgot-password" @click ="forgotPassword = true">
                            Forgot password? 
                    </span>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import Loader from 'vueloaderspinners'
export default {
    name: 'Login',
    components:{
        Loader
    },
    data(){
        return{
            login:{
                email_username: '',
                password: '',
            },
            email: '',
            password: '',
            backendError: '',
            loading: false,
            color: '#fff',
            size: '5px',
            forgotPassword: false,
            emailSent: false,
        }
    },
    validations: {
        email: {
            required,
            email,
            minLength: minLength(8),  
        },
        login:{
            email_username: {
                required,
                minLength: minLength(6),  
            },
            password: {              
                required,
                minLength: minLength(8),   
                maxLength: maxLength(100),    
            }
        }

    },
    methods:{
        userLogin(){
            this.$v.login.$touch();
            if (this.$v.login.$invalid) {
                return;
            }
            var username_email = this.login.email_username;
            var password = this.login.password;
            this.loading=true;
            axios.post('/api/auth/login', {username_email, password }, {})
            .then(() => {
                this.loading=false;
                this.$store.dispatch('UpdateLoginState');
                this.$router.push('/');
            })
            .catch((err) => {
                this.loading=false;
                this.backendError = err.response.data;
            });
        },
        resetPassword(){
            this.$v.email.$touch();
            if (this.$v.email.$invalid) {
                return;
            }
            var restoreEmail = this.email
             axios.post('/api/auth/account-recovery', {restoreEmail }, {})
            .then(() => {
                this.emailSent = true;
            })
            .catch((err) => {
                this.backendError = err.response.data.sendError;
            });
        },
    }

}
</script>

<style lang="scss">
$module-theme: #86a1b8;
@use '../sass/abstracts/mixins';

 .login-container{
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     height: 100vh;
     width: 100%;
 }
 .forgot-module{
    @include mixins.form-module;
    .input-container{
        margin-bottom: 0px;
        .btn{
            margin-top: 10px;
        }
    } 
    .module-form--wrapper{
        max-width: 300px;
        .btn{
            margin-top: 10px;
        }
    }
}
.input-container{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
} 
 .login-module{
     @include mixins.form-module;
    .login-form{
        display: flex;
        flex-direction: column;
        padding-right: 32px;
        border-right: 3px solid $module-theme;
    }
    .social-form{
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 20px 0 20px 20px;
        .social-buttons{
            display: grid;
            grid-row-gap: 12px;
        }
    }
 }
.social-buttons{
    display: grid;
    grid-row-gap: 12px;
    a{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 42px;
        width: 100%;
        font-size: 14px;
        font-weight: 700;
        background: $module-theme;
        border-radius: 2px;
        cursor: pointer;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
        img{
            height: 100%;
        }
        span{
            color: #fff;
            text-decoration: none;
            line-height: 1;
            font-size: 14px;
            margin: 0px 10px;
            letter-spacing: 0.2px;
        } 
    }
}
.loader{
    display: flex;
    justify-content: center;
    .login-loader{
        margin: 0 12px;
        align-self: center;
        height: 20px;
        width: 22px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .bubbles-loader{
             align-items: center;
        }
    }
}
.forgot-password{
    color: #86a1b8;
    cursor: pointer;
}


</style>