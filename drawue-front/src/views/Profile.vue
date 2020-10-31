<template>
  <div class="profile-container">
      <div class="profile-module">
          <div class="user-details">
            <div class="picture-container">
                <div class="profile-picture">
                    <!-- <div class="overlay"></div> -->
                    <img :src="'/api/uploads/getImage/' + getProfilePic" alt="">
                    <div class="change-pic" @click="$refs.file.click()"> 
                        <svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg"><g id="Solid"><path d="m182.461 155.48 49.539-49.539v262.059a24 24 0 0 0 48 0v-262.059l49.539 49.539a24 24 0 1 0 33.941-33.941l-90.509-90.51a24 24 0 0 0 -33.942 0l-90.509 90.51a24 24 0 1 0 33.941 33.941z"/><path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"/></g></svg>
                        Change photo
                        <input type="file" ref="file" @change="handlePicUpload($event)">
                    </div>
                </div>
            </div>
            <div class="profile-username" @click="submitFile"> @{{ getUsername }}</div>

          </div>
          <div class="password-change">
              
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    name: 'Profile',
    data(){
        return{
            user:{
                username: '',
                email: '',
            },
            picFile: null,
        }
    },

    computed: {
      ...mapGetters(['getLoginState', 'getProfilePic', 'getUsername'])
    },
    methods: {
        handlePicUpload(event){
            console.log(event);
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
               console.log("hji");
            })
            .catch((err) =>{
                console.log(err.response);
            });
        }
    },
    watch: {
        picFile: function(){
            this.submitFile();
        }
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
            box-shadow: 0px 0px 4px -2px #000000;
            .user-details{
                display: flex;
                flex-direction: column;
            }
        }
    }
    .picture-container{
        display: flex;
        justify-content: center;
        max-height: 125px;
        border-radius: 50%;
        border: 1px solid #ededed;
         box-shadow: 0px 0px 8px -4px #bdbdbd;
        .profile-picture{
           position: relative;
           height: 125px;
           width: 125px;
           cursor: pointer;
           clip-path: circle(60px at center);
            img{
                height: 100%;
                width: inherit;
            }
            &::before{
                content:'\A';
                position:absolute;
                width:99%; height:99%;
                top:0; left:0;
                background: rgb(252 252 152 / 85%);
                opacity:0;
                transition: all 0.5s;
                clip-path: circle(63.0% at 50% 105%);
                -webkit-transition: all 0.5s;
                transition: all 0.5s;
            }
            &::after{
                content:'\A';
                position:absolute;
                width:100%; height:100%;
                top:0; left:0;
                background: rgb(252 252 252 / 85%);
                opacity:0;
                transition: all 0.5s;
                clip-path: circle(63.0% at 50% 105%);
                -webkit-transition: all 0.5s;
                transition: all 0.5s;
            }
            &:hover{
                &::after{
                    opacity:1;
                }
                .change-pic{
                    opacity:1;
                }
            }
            .change-pic{
                position: absolute;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                left: 0;
                right: 0;
                opacity: 0;
                bottom: 24px;
                font-size: 12px;
                font-weight: 700;
                transition: all 0.5s;
                user-select: none;
                color: #8f90a5;
                z-index: 2;
                svg{
                    height: 20px;
                    width: 20px;
                    fill: #8f90a5;
                }
            }
        }
    }
    input[type=file]{
        display: none;
    }
</style>