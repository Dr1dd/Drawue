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
                <div class="btn loader" @click="login">
                    <div class="login-loader">
                        <Loader v-if="loading" color="white" loaderType="bubble" />
                    </div>
                    Login 
                    <div class="login-loader">
                        <Loader v-if="loading" color="white" loaderType="bubble" />
                    </div>
                </div>
            </div>
            <div class="social-form">
                <div class="social-buttons">
                    <div>
                        <img src="../assets/facebook.jpg" alt="">
                        <a href="api/auth/facebook">Sign in with Facebook </a>
                    </div>
                    <div>
                        <img src="../assets/google.jpg" alt="">
                        <a href="api/auth/google/authentication">Sign in with Google </a>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import Loader from 'vueloaderspinners'
export default {
    name: 'Login',
    components:{
        Loader
    },
    data(){
        return{
            email_username: '',
            password: '',
            backendError: '',
            loading: false,
            color: '#fff',
            size: '5px'
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
            this.loading=true;
            axios.post('/api/auth/login', {username_email, password }, {})
            .then(() => {
                this.$store.dispatch('UpdateLoginState');
                this.$router.push('/profile');
            })
            .catch((err) => {
                this.backendError = err.response.data;
            });
             this.loading=false;
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
 }
.social-buttons{
    display: grid;
    grid-row-gap: 12px;
    div{
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
        a{
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


</style>