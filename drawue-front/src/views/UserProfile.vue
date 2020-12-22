<template>
  <div class="user-profile--container">
      <div class="user-profile-md">
          <div class="drawing-container">
              <div class="drawing-post" v-for="(drawing, index) in drawings" :key="index">
                <div class="drawing-thumbnail"> 
                    <img :src="'/api/posts/profile/drawing/'+drawing.drawing_path" alt="">
                </div>
              </div>
          </div>
         <div class="profile-info--container">
                <div class="picture-container">
                    <div class="profile-picture">
                        <img :src="'/api/posts/profile/pic/' + profilePic" alt="">
                    </div>
                </div>
                 <div class="profile-username">
                        <div>
                            @<span>{{ username }}</span>
                        </div>
                    </div>
                <div class="post-info">
                    <div class="drawing-count">Drawings: {{drawingCount}}</div>
                    <div class="like-count">Likes: {{likeCount}}</div>
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
            profilePic: '',
            skip: 0,
            drawings: [],
            likes: [],
            postLimit: false,
            username: '',
            likeCount: 0,
            drawingCount: 0,
        }
    },
    mounted(){
        this.username = this.$route.params.username;
        this.userData();
        this.drawingPosts(this.skip);
        window.onscroll = () =>{
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight+20 > document.documentElement.offsetHeight;
            if(bottomOfWindow){
                if(!this.postLimit){
                    this.skip += 30;
                    this.drawingPosts(this.skip);
                }
            }
        }
    },
    methods:{
        userData(){
            var username = this.$route.params.username;
            var url = '/api/profile/user/'+username;
            axios.get(url)
                .then((res)=>{
                    this.profilePic = res.data.profilePic;
                    this.likeCount = res.data.likeCount;
                    this.drawingCount = res.data.drawings;
                })
                .catch((err)=>{
                    console.log(err.response)
                })
       },
       drawingPosts(){
           var username = this.$route.params.username;
           var url = '/api/profile/drawings/'+username +"?skip="+this.skip+"&limit=30";
           axios.get(url)
                .then((res)=>{
                   // console.log(res.data);
                    if(res.data.notFound != undefined) this.postLimit = res.data.notFound;
                    if(res.data.drawingPosts) this.drawings.push(...res.data.drawingPosts);
                    if(res.data.likedPosts) this.likes.push(...res.data.likedPosts);
                    console.log(res.data);
                })
                .catch((err)=>{
                    console.log(err);
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
     max-width: 40rem;
     margin: 6rem 0 5rem 0;
     padding: 20px;
     position: relative;
     box-shadow: 0px 1px 7px 2px rgba(173, 173, 173, 0.2);
 }
 .profile-info--container{
    display: flex;
    flex-direction: column;
    position: fixed;
    background: white;
    padding: 20px;
    box-shadow: 0px 1px 7px 2px rgba(173, 173, 173, 0.2);
    top: 0px;
    margin-top: 6rem;
    left: 50%;
    margin-left: -25rem;
    height: fit-content;
    width: fit-content;
    color: #86a1b8;
    .profile-username{
        font-weight: 700;
        padding-top: 5px;
    }
    .post-info{
        margin: 15px 0 5px 0;
        text-align: initial;
        padding: 0 0 0 7px;
    }
 }
 .picture-container{
     @include profile.profile-pic("false");
 }
 .drawing-container{
     flex-direction: column;
     margin: 0;
 }
 .drawing-post{
     display: flex;
     height: 150px;
     padding: 5px;
         border-bottom: 1px solid whitesmoke;
     .drawing-thumbnail{
         height: 100%;
         img{
             height: 100%;
         }
     }
 }
</style>