<template>
  <div class="user-profile--container">
      <div class="user-profile-md">
          d
         <div class="profile-info--container">
                <div class="picture-container">
                    <div class="profile-picture">
                        <img :src="'/api/posts/profile/pic/' + profilePic" alt="">
                    </div>
                </div>
         </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'UserProfile',
    data(){
        return{
            profilePic: ''
        }
    },
    mounted(){
        this.userData();
    },
    methods:{
        userData(){
            var username = this.$route.params.username;
            var url = '/api/profile/user/'+username;
            axios.get(url)
                .then((res)=>{
                    this.profilePic = res.data.profilePic;
                    console.log(res.data);
                })
                .catch((err)=>{
                    console.log(err.response)
                })
        }
    }
}
</script>

<style scoped lang="scss">
@use '../sass/abstracts/_profile';
 .user-profile--container{
     display: flex;
     min-height: 100vh;
     width: 100%;
     justify-content: center;
     flex-direction: column;
     align-items: center;
 }
 .user-profile-md{
     display: flex;
     background: white;
     padding: 20px;
     position: relative;
 }
 .profile-info--container{
    display: flex;
    position: absolute;
    background: white;
    padding: 20px;
    border: 1px solid;
    left: -110%;
    top: 0px;
 }
 .picture-container{
     @include profile.profile-pic("false");

 }
</style>