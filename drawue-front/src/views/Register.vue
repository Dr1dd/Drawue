<template>
  <div class ="register-container">
      <div class="register-module">
          <div class="register-header">
              <div class="home-button">
                  <svg @click="$router.push('/')" viewBox="0 0 495.398 495.398" style="enable-background:new 0 0 495.398 495.398;"
                        xml:space="preserve">
                        <g>
                            <g>
                                <g>
                                    <path d="M487.083,225.514l-75.08-75.08V63.704c0-15.682-12.708-28.391-28.413-28.391c-15.669,0-28.377,12.709-28.377,28.391
                                        v29.941L299.31,37.74c-27.639-27.624-75.694-27.575-103.27,0.05L8.312,225.514c-11.082,11.104-11.082,29.071,0,40.158
                                        c11.087,11.101,29.089,11.101,40.172,0l187.71-187.729c6.115-6.083,16.893-6.083,22.976-0.018l187.742,187.747
                                        c5.567,5.551,12.825,8.312,20.081,8.312c7.271,0,14.541-2.764,20.091-8.312C498.17,254.586,498.17,236.619,487.083,225.514z"/>
                                    <path d="M257.561,131.836c-5.454-5.451-14.285-5.451-19.723,0L72.712,296.913c-2.607,2.606-4.085,6.164-4.085,9.877v120.401
                                        c0,28.253,22.908,51.16,51.16,51.16h81.754v-126.61h92.299v126.61h81.755c28.251,0,51.159-22.907,51.159-51.159V306.79
                                        c0-3.713-1.465-7.271-4.085-9.877L257.561,131.836z"/>
                                </g>
                            </g>
                        </g>
                  </svg>
              </div>
              <div class="header-text">
                  {{successMessage ? 'Confirm Email' : 'Sign Up'}}
              </div>
          </div>
          <div class="register-form--wrapper">
            <div v-if="successMessage" class ="confirm-email">
                {{successMessage}}
                <div class="resend-email"> 
                  <div @click="resendEmail">Resend verification email</div>
                  <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                </div>
            </div>
            <div v-else class="register-form">
                <div class="input-container">
                    <input type="text" maxlength="64" placeholder="Username" v-model.lazy="$v.user.username.$model" @blur="$v.user.username.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.user.username.$dirty && !$v.user.username.required">Field is required</div>
                        <div class="error" v-else-if="$v.user.username.$dirty && !$v.user.username.minLength">Username must have at least {{$v.user.username.$params.minLength.min}} characters.</div>
                        <div class="error" v-else-if="$v.user.username.$dirty && !$v.user.username.maxLength"> Your username should not exceed {{$v.user.username.$params.maxLength.max}} characters </div>
                        <div class="error" v-else-if="$v.user.username.$dirty && !$v.user.username.validUsername"> Only alphanumeric letters and numbers are allowed! </div>
                        <div class="error" v-else-if="backendError['username']"> {{backendError['username']}} </div>
                    </transition>
                    <input type="email" maxlength="64" placeholder="Email" v-model.lazy="$v.user.email.$model" @blur="$v.user.email.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.user.email.$dirty && !$v.user.email.required">Field is required</div>
                        <div class="error" v-else-if="$v.user.email.$dirty && !$v.user.email.minLength">Email must have at least {{$v.user.email.$params.minLength.min}} characters.</div>
                        <div class="error" v-else-if="$v.user.email.$dirty && !$v.user.email.maxLength"> Your email should not exceed {{$v.user.email.$params.maxLength.max}} characters </div>
                        <div class="error" v-else-if="$v.user.email.$dirty && !$v.user.email.email">Email must be formatted correctly.</div>
                        <div class="error" v-else-if="backendError['email']"> {{backendError['email']}} </div>
                    </transition>
                    <input type="password" placeholder="Password" v-model.lazy="$v.user.password.$model" @blur="$v.user.password.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.user.password.$dirty && !$v.user.password.required">Field is required</div>
                        <div class="error" v-else-if="$v.user.password.$dirty && !$v.user.password.strongPassword">Strong passwords need to have a letter, a number, a special character, and be atleast 8 characters long.</div>
                        <div class="error" v-else-if="$v.user.password.$dirty && !$v.user.password.maxLength"> Your password should not exceed {{$v.user.password.$params.maxLength.max}} characters </div>
                        <div class="error" v-else-if="backendError['password']"> {{backendError['password']}} </div>
                    </transition>

                    <input type="password" placeholder="Confirm Password" v-model.lazy="$v.user.passwordConfirm.$model" @blur="$v.user.passwordConfirm.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.user.passwordConfirm.$dirty && !$v.user.passwordConfirm.required">Field is required</div>
                        <div class="error" v-else-if="$v.user.passwordConfirm.$dirty && !$v.user.passwordConfirm.sameAsPassword">The passwords do not match.</div>
                        <div class="error" v-else-if="backendError['passwordConfirm']"> {{backendError['passwordConfirm']}} </div>
                    </transition>
                </div>
                <div class="btn loader" @click ="register">
                     Sign Up  <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, maxLength, email, sameAs } from 'vuelidate/lib/validators'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'Register',
    components: {
        PulseLoader
    },
    data(){
        return{
            user:{
                username: '',
                email: '',
                password: '',
                passwordConfirm: '',
            },
            isSubmitted: false,
            backendError: '',
            successMessage: '',
            loading: false,
            color: '#fff',
            size: '5px'
        }
    },

    validations: {
        user:{
            username: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(22),
                validUsername(username){
                    return (
                        /^[a-zA-Z0-9]+$/.test(username)
                    );
                }  
            },
            email: {
                required,
                email,
                minLength: minLength(8),
                maxLength: maxLength(64),  
            },
            password: {              
                required,
                strongPassword(password) {
                    return (
                    /[a-z]/.test(password) && 
                    /\d]/.test(password) && 
                    /\W|_/.test(password) && 
                    password.length >= 8
                    );
                },
                maxLength: maxLength(100),   
            },
            passwordConfirm: {              
                required,
                sameAsPassword: sameAs("password"),  
            }
        }

    },
    methods:{
        register(){
            this.isSubmitted = true;

            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            this.loading = true;
            let username = this.user.username;
            let user_email = this.user.email;
            let password = this.user.password;
            let confirmPassword = this.user.passwordConfirm;
            axios.post('/api/auth/register', {username, user_email, password, confirmPassword }, {})
                .then((res) => {
                   this.loading = false;
                   if (res.data) {
                        this.successMessage = res.data.successSend;
                    }
                })
                .catch((err) => {
                   this.loading = false;
                   this.backendError = err.response.data
                });
        },
        resendEmail(){
            let user_email = this.user.email;
            this.loading = true;
            axios.post('/api/auth/register/resend', { user_email }, {})
            .then((res) => {
                if (res.data) {
                    this.successMessage = res.data.successSend;
                    this.loading = false;
                }
            })
            .catch((err) => {
                this.successMessage = err.response.data
                this.loading = false;
            });
        }
    }
}
</script>

<style lang="scss">
$module-theme: #86a1b8;
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
     min-width: 275px;
     background: white;
     border-radius: 15px;
     box-shadow: 0px 0px 4px -2px #000000;
     .register-header{
        display: flex;
        justify-content: center;
        padding: 10px;
        background: $module-theme;
        color: white;
        font-size: 25px;
        font-weight: 700;
        border-radius: 13px 13px 0 0;
        .home-button{
            position: relative;
            align-self: center;
            height: 24px;
            svg{
                height: inherit;
                position: absolute;
                width: auto;
                fill: white;
                cursor: pointer;
            }
        }
        .header-text{
            margin: 0 auto;
        }
     }
     .register-form--wrapper{
        display: flex;
        flex-direction: row;
        .register-form{
            display: flex;
            flex-direction: column;
            padding: 10px 32px 32px;
            max-width: 350px;
            min-width: 350px;
            .input-container{
                display: flex;
                flex-direction: column;
                margin-bottom: 28px;
            }
        }
     }
  }
    .confirm-email{
        padding: 20px;
        font-size: 20px;
        width: 100%;
    }
    .resend-email{
        margin-top: 15px;
        font-size: 14px;
        color: $module-theme;
        transition: all 0.2s;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
            color: #0f3b5f;
        }
    }
    .loader{
        display: flex;
        justify-content: center;
        position: relative;
        .v-spinner{
            position: absolute;
            left: 0;
            right: -26%;
        }
    }
</style>