<template>
  <div class="profile-container">
      <div class="profile-wrapper">
        <div class="profile-grid">
            <div class="profile-module">
                <transition name="appear">
                    <div v-if="uploadErrorMessage != ''" class="error-flash">
                        <div class="close" @click ="uploadErrorMessage=''">
                            <div></div>
                            <div></div>
                        </div>
                        {{ uploadErrorMessage }}
                        
                    </div>
                </transition>
                <div class="user-details">
                    <div class="picture-container">
                        <div class="profile-picture">
                            <img :src="'/api/posts/profile/pic/' + getProfilePic" alt="">
                            <div class="change-pic" @click="$refs.file.click()"> 
                                <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Solid"><path d="m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z"/><path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"/></g></svg>
                                Change photo
                                <input type="file" ref="file" @change="handlePicUpload($event)">
                            </div>
                        </div>
                    </div>
                    <div class="profile-username">
                        <div>
                            @<span :contenteditable="editUsername" ref="username" maxlength="22">{{ getUsername }}</span>
                             <div v-if="!editUsername" class="edit-username" @click="editUser">
                                    <svg viewBox="0 0 383.947 383.947" xml:space="preserve">
                                    <g>
                                        <g>
                                            <g>
                                                <polygon points="0,303.947 0,383.947 80,383.947 316.053,147.893 236.053,67.893 			"/>
                                                <path d="M377.707,56.053L327.893,6.24c-8.32-8.32-21.867-8.32-30.187,0l-39.04,39.04l80,80l39.04-39.04
                                                    C386.027,77.92,386.027,64.373,377.707,56.053z"/>
                                            </g>
                                        </g>
                                    </g>
                                    </svg>
                                </div>
                                <div v-else class="edit-username checkmark">
                                    ✓
                            </div>
                        </div>
                    </div>
                    <div class="post-info">
                        <div class="drawing-count">Drawings: {{profileStats[1]}}</div>
                        <div class="like-count">Likes: {{profileStats[0]}}</div>
                    </div>

                </div>
                <div class="resend-email" v-if="emailStatus == false" @click="resendEmail"> <a> Resend email confirmation </a></div>

            </div>
            <div class="change-info--container">
                <div class="change-password--container">
                    <div class="module-title">
                        Change Password:
                    </div>
                    <div class="password-form">
                        <input type="password" placeholder="Current Password" v-model.lazy="$v.password.currentPassword.$model" @blur="$v.password.currentPassword.$touch()">
                        <transition name="fade">
                            <div class="error" v-if="$v.password.currentPassword.$dirty && !$v.password.currentPassword.required">Field is required</div>
                            <div class="error" v-else-if="backendError['currentPass']"> {{backendError['currentPass']}} </div>
                        </transition>

                        <input type="password" placeholder="New Password" v-model.lazy="$v.password.newPassword.$model" @blur="$v.password.newPassword.$touch()">
                        <transition name="fade">
                            <div class="error" v-if="$v.password.newPassword.$dirty && !$v.password.newPassword.required">Field is required</div>
                            <div class="error" v-else-if="$v.password.newPassword.$dirty && !$v.password.newPassword.strongPassword">Strong passwords need to have a letter, a number, a special character, and be atleast 8 characters long.</div>
                            <div class="error" v-else-if="$v.password.newPassword.$dirty && !$v.password.newPassword.maxLength"> Your new password should not exceed {{$v.password.newPassword.$params.maxLength.max}} characters </div>
                            <div class="error" v-else-if="backendError['newPassword']"> {{backendError['newPassword']}} </div>
                        </transition>

                        <input type="password" placeholder="Confirm Password" v-model.lazy="$v.password.newPasswordConfirm.$model" @blur="$v.password.newPasswordConfirm.$touch()">
                        <transition name="fade">
                            <div class="error" v-if="$v.password.newPasswordConfirm.$dirty && !$v.password.newPasswordConfirm.required">Field is required</div>
                            <div class="error" v-else-if="$v.password.newPasswordConfirm.$dirty && !$v.password.newPasswordConfirm.sameAsPassword">The passwords do not match.</div>
                            <div class="error" v-else-if="backendError['newPasswordConfirm']"> {{backendError['newPasswordConfirm']}} </div>
                        </transition>
                    </div>
                    <div class="btn" @click="changePassword" >{{btnText}}</div>
                    <transition name="success">
                        <div v-if="successMessage" class="success-flash"><strong>Success:  </strong> {{successMessage}} </div>
                    </transition>
                </div>
            </div>
            <div class="drawing-list--container">
                <div class="module-title">
                    <div>Drawings:</div>
                    <div>{{drawingPosts.length}}/15</div>
                </div>
                <div class ="drawing-post--container">
                  <div class="drawing-post" v-for="(drawing, index) in drawingPosts" :key="index">
                      <div class="delete-post" @click="deletePost(index)">
                          <span></span> <span></span>
                      </div>
                    <router-link :to="{
                        name: 'UserDrawingPost',
                        params: {username:drawing.username, drawing: drawing, drawingID: drawing._id, liked: drawing.liked = likedPosts.includes(drawing._id) }
                    }">
                    <div class="drawing-thumbnail"> 
                        <img :src="'/api/posts/profile/drawing/'+drawing.drawing_path" alt="">
                    </div>
                    <div class="drawing-info">
                        <div class="drawing-title">
                            {{drawing.title}}
                        </div>
                        <div class="drawing-description">
                            {{drawing.description}}
                        </div>
                    </div>
                    </router-link>
                 </div>
                </div>
            </div>
        </div>
    </div>
    <ErrorModal v-if="emailConfirm" @close="emailConfirm = false" > Confirmation email has been sent to: {{getEmail}} </ErrorModal>
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import axios from 'axios';
import { required, maxLength, sameAs } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex';
import ErrorModal from '../components/ErrorModal'
export default {
    name: 'Profile',
    data(){
        return{
            user:{
                username: '',
                email: '',
            },
            picFile: null,
            uploadErrorMessage: '',
            backendError: '',
            btnText: 'Change Password',
            successMessage: '',
            password:{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirm: '',
            },

            drawingPosts: [],
            drawingError: '',
            profileInfo: '',
            likedPosts: [],
            editUsername: false,
            emailConfirm: false,
        }
    },
    components:{
        ErrorModal,
    },
    validations: {
        password:{
            currentPassword:{
                required,
                strongPassword(currentPassword) {
                    return (
                    /[a-z]/.test(currentPassword) && 
                    /\d/.test(currentPassword) && 
                    /\W|_/.test(currentPassword) && 
                    currentPassword.length >= 8
                    );
                },
                maxLength: maxLength(100),   
            },
            newPassword: {              
                required,
                strongPassword(newPassword) {
                    return (
                    /[a-z]/.test(newPassword) && 
                    /\d/.test(newPassword) && 
                    /\W|_/.test(newPassword) && 
                    newPassword.length >= 8
                    );
                },
                maxLength: maxLength(100),   
            },
            newPasswordConfirm: {              
                required,
                sameAsPassword: sameAs("newPassword"),  
            }
        }
    },
    computed: {
      ...mapGetters(['getLoginState', 'getProfilePic', 'getEmail', 'getUsername', 'profileStats', 'emailStatus'])
    },
    methods: {
        handlePicUpload(event){
            this.picFile = event.target.files[0];
        },
        submitFile(){
            let formData = new FormData();
            formData.append('file', this.picFile);
            axios.post( '/api/upload/profile-pic', formData,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then((res) =>{
               this.$store.commit('SET_PROFILE_PIC', res.data);
            })
            .catch((err) =>{
                this.uploadErrorMessage = err.response.data.error;
            });
        },
        changePassword(){
            this.$v.password.$touch();
            if (this.$v.password.$invalid) {
                return;
            }
            this.loading = true;
             this.btnText = "Loading...";
            var currentPassword = this.password.currentPassword;
            var newPassword = this.password.newPassword;
            var confirmNewPassword = this.password.newPasswordConfirm;

            axios.post('/api/auth/change-password', {currentPassword, newPassword, confirmNewPassword }, {})
                .then((res) => {
                   if (res.data) {
                        this.loading = false;
                        this.btnText = "Change Password";
                        this.successMessage = res.data.successPassword;
                    }
                })
                .catch((err) => {
                   this.loading = false;
                    this.btnText = "Change Password";
                   this.backendError = err.response.data
                });
        },
        getDrawings(){
            axios.get('/api/profile/drawings')
                .then((res)=>{
                    this.drawingPosts = res.data.drawingPosts;
                    this.likedPosts.push(...res.data.likedPosts);
                })
                .catch((err)=>{
                    this.drawingError = err.response.error;
                })
        },
        editUser(){
            this.editUsername = true; 
            var username = this.$refs.username;
            username.focus();
        },
        resendEmail(){
            this.emailConfirm = true;
            var email = this.getEmail;
            axios.post('/api/auth/register/resend', { email }, {})
            .then((res) => {
                if (res.data) {
                    this.successMessage = res.data.successSend;
                }
            })
            .catch((err) => {
                this.successMessage = err.response.data
            });
        },
        deletePost(index){
            axios.post('/api/drawings/delete', { index }, {})
            .then((res) => {
                if (res.data) {
                    this.successMessage = res.data.successSend;
                }
            })
            .catch((err) => {
                this.successMessage = err.response.data
            });
        },
    },
    mounted(){
        this.getDrawings();
    },
    watch: {
        picFile: function(){
            this.submitFile();
        },
        uploadErrorMessage: function(){
            if(this.uploadErrorMessage!=''){
                setTimeout(()=> {
                    this.uploadErrorMessage = '';
                }, 3000);
            }
     
        },
        successMessage: function(){
              if(this.successMessage!=''){
                setTimeout(()=> {
                    this.successMessage = '';
                }, 2000);
            }
        }

    }
}
</script>

<style lang="scss" scoped>
@use '../sass/abstracts/_profile';
@use '../sass/components/_drawingPost';
    .profile-container{
        padding-top: 80px;
        height: 100vh;
        width: 100%;
    }
    .profile-wrapper{
        margin: 0 auto;
        max-width: 670px;
    }
    .profile-grid{
        display: grid;
        grid-template-rows: auto;
        grid-template-areas: 
            "profile password"
            "drawings drawings";
        grid-gap: 15px;
    }
    .profile-module{
        display: flex;
        position: relative;
        flex-direction: column;
        padding: 20px;
        min-width: 175px;
        background: white;
        box-shadow: 0px 0px 4px -2px #000000;
        .user-details{
            display: flex;
            flex-direction: column;
        }
        .resend-email{
            display: flex;
            position: absolute;
            justify-content: center;
            bottom: 5px;
            width: 100%;
            left: 0;
            margin: 0 auto;
            cursor: pointer;
            a{
                text-decoration: underline;
            }
        }
    }
    .change-info--container{
        display: flex;
        flex-direction: row;
        padding: 20px;
        min-width: 400px;
        background: white;
        box-shadow: 0px 0px 4px -2px #000000;
        .change-password--container{
            display: flex;
            flex-direction: column;
            width: 100%;
            position: relative;
            .password-form{
                display: flex;
                flex-direction: column;
                width: 95%;
                max-width: 358px;
                margin: 0 auto;
                input{
                    width: 90%;
                }
            }
            .btn{
                margin-top: 15px;
                padding: 5px 15px;
                width: auto;
                align-self: center;
            }
        }
    }
    .drawing-list--container{
        grid-area: drawings;
        text-align: left;
        background: white;
        margin-bottom: 30px;
        width: 630px;
        padding: 20px;
        box-shadow: 0px 0px 4px -2px #000000;
    }
    .module-title{
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        color: #86a1b8;
        text-align: left;
        font-size: 20px;
        margin-bottom: 5px;
        div:nth-child(2){
            font-size: 14px;
            align-self: center;
        }
    }
    .picture-container{
        @include profile.profile-pic(true);
    }
    input[type=file]{
        display: none;
    }
    .profile-username{
        align-self: center;
        margin-top: 10px;
        color: #86a1b8;
        
        div{
            display: flex;
            position: relative;
            width: fit-content;
            justify-content: center;
            font-weight: 700;
            text-overflow: ellipsis;
            &:hover{
                .edit-username{
                    color: green;
                     opacity: 1;
                }
            }
        }
        span{
            word-break: break-all;
            &:focus{
                outline: none;
            }
        }
        .edit-username{
            opacity: 0;
            top: 0;
            position: absolute;
            right: -18px;
            cursor: pointer;
            transition: opacity 0.2s;
            svg{
                fill: #86a1b8;
                height: 14px;
                width: 14px;
            }
        }
        .checkmark{
            opacity: 1;
            color: #51bc51;
            line-height: 1;
            right: -16px;
        }
    }
    .post-info{
        display: flex;
        flex-direction: column;
        text-align: left;
        color: #89a3ba;
        margin: 10px auto 0 2rem;
    }
    .error-flash{
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: initial;
        height: 60px;
        background: #f2a1a1;
        border-radius: 11px;
        color: #ffffff;
        padding: 13px 5px 5px 5px;
        top: -87px;
        left: 0;
        z-index: 9999;
        .close{
            position: absolute;
            cursor: pointer;
            right: 10px;
            top: 6px;
            div{
                height: 14px;
                width: 2px; 
                background: white;
            }
            div:nth-child(1){
                position: absolute;
                transform: rotate(-45deg);
            }
            div:nth-child(2){
                transform: rotate(45deg);
            }
        }
    }
    .success-flash{
        position: absolute;
        display: flex;
        background: #a7f3a7;
        padding: 7px;
        border-radius: 8px;
        width: fit-content;
        color: #217f02;
        font-size: 14px;
        bottom: -37px;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .appear-enter-active, .appear-leave-active {
     transition: all .5s;
     transform: scale(1);
    }
    .appear-enter, .appear-leave-to{
     opacity: 0;
     transform: translateY(20px) scale(0.8);
    }
    .success-enter-active, .success-leave-active {
     transition: all .5s;
     transform: scale(1);
    }
    .success-enter, .success-leave-to{
     opacity: 0;
     transform: translateY(-20px) scale(0.8);
    }
    .error{
        width: 90%;
    }

    .drawing-post--container{
        padding: 20px;
    }
    .drawing-post{
       @include drawingPost.drawingPost;
        margin: 10px 0;
        position: relative;
        .delete-post{
           position: absolute;
            display: none;
            right: 5px;
            top: 8px;
            width: 12px;
            transition: all 0.5s;
            span{
                display: block;
                position: absolute;
                height: 17px;
                width: 2px;
                background: #ff9393;
                transform: rotate(45deg);
            }
            span:nth-child(2){
                transform: rotate(-45deg);
            }
        }
        &:hover{
            .delete-post{
                display: block;
            }
        }
    }
</style>