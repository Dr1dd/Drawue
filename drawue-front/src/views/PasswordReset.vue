<template>
  <div class="reset-container">
      <div class="reset-module">
          <div class="module-header">
              Reset Password
          </div>
          <div class="module-form--wrapper">
                <div v-if="message!=''" class="response-message">
                    <div>
                        {{ message }}
                    </div>
                     <router-link to="/"><div class="btn">Go Home</div></router-link>
                </div>
                <div v-else class="input-container">
                    <input type="password" placeholder="Password" v-model.lazy="$v.password.$model" @blur="$v.password.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.password.$dirty && !$v.password.required">Field is required</div>
                        <div class="error" v-else-if="$v.password.$dirty && !$v.password.strongPassword">Strong passwords need to have a letter, a number, a special character, and be atleast 8 characters long.</div>
                        <div class="error" v-else-if="$v.password.$dirty && !$v.password.maxLength"> Your password should not exceed {{$v.password.$params.maxLength.max}} characters </div>
                        <div class="error" v-else-if="backendError['errorMessage']"> {{backendError['errorMessage']}} </div>
                    </transition>

                    <input type="password" placeholder="Confirm Password" v-model.lazy="$v.passwordConfirm.$model" @blur="$v.passwordConfirm.$touch()">
                    <transition name="fade">
                        <div class="error" v-if="$v.passwordConfirm.$dirty && !$v.passwordConfirm.required">Field is required</div>
                        <div class="error" v-else-if="$v.passwordConfirm.$dirty && !$v.passwordConfirm.sameAsPassword">The passwords do not match.</div>
                        <div class="error" v-else-if="backendError['passConfirm']"> {{backendError['passConfirm']}} </div>
                    </transition>
                    <div class="btn" @click="resetPassword">Reset Password</div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { required, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
    name: 'Reset',
     data(){
        return{
            password: '',
            passwordConfirm: '',
            backendError: '',
            tokenValid: false,
            message: '',
        }
    },
    validations: {
        password: {              
            required,
            strongPassword(password) {
                return (
                    /[a-z]/.test(password) && 
                    /\d/.test(password) && 
                    /\W|_/.test(password) && 
                    password.length >= 8
                );
            },
            maxLength: maxLength(100),   
        },
        passwordConfirm: {              
            required,
            sameAsPassword: sameAs("password"),  
        },
    },
    methods:{
        resetPassword(){
            this.$v.$touch();
            if (this.$v.$invalid) {
                return;
            }
            var token = this.$route.query.tkn;
            var password = this.password;
            var confirmPassword = this.passwordConfirm;
            axios.post('/api/auth/account-recovery/reset', { token, password, confirmPassword }, {})
            .then((res)=>{
                if(res.data){
                    this.message = res.data.success;
                }
            })
            .catch((err)=>{
                this.backendError = err.response.data;
            });
        }
    },
    mounted(){
        var token = this.$route.query.tkn;
        if(token.length!=64) this.message = 'Password reset token is invalid or has expired.';
        else{
            axios.post('/api/auth/account-recovery/valid', { token }, {})
            .catch((err)=>{
                this.message = err.response.data.errorMessage;
            });
        }
        
    }
}
</script>

<style lang="scss">
    $module-theme: #86a1b8;
    @use '../sass/abstracts/mixins';
    .reset-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }
    .reset-module{
        @include mixins.form-module;
        .module-form--wrapper{
            max-width: 400px;
        }
    }
    .input-container{
        display: flex;
        flex-direction: column;
        max-width: 300px;
        min-width: 300px;
        .btn{
            margin-top: 10px;
        }
    } 
    .response-message{
        margin-top: 15px;
        div{
            color: #86a1b8;
            font-weight: 700;
            word-break: break-word;
        }
        .btn{
            display: inline-flex;
            color: white;
            margin-top: 20px;
            padding: 10px 15px;
        }
        a{
            text-decoration: none;
        }
    }
</style>