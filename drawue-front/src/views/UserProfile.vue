<template>
  <div class="user-profile--container">
      <div class="user-profile-md">
          <div class="drawing-container">
              <div class="drawing-post" v-for="(drawing, index) in drawings" :key="index">
                <router-link :to="{
                    name: 'UserDrawingPost',
                    params: {username:drawing.username, drawing: drawing, drawingID: drawing._id, liked: drawing.liked = likes.includes(drawing._id) }
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
         <div class="md-title">
             <div>
                Drawings:
             </div>
         </div>
      </div>
      <router-view :key="$route.path"/>
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
@use '../sass/components/_drawingPost';

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
     min-width: 550px;
     min-height: 100vh;
     margin: 6rem 0 5rem 0;
     padding: 20px;
     background-color: #fafdff;
     position: relative;
     box-shadow: 0px 1px 7px 2px rgba(173, 173, 173, 0.2);
 }
 .profile-info--container{
    display: flex;
    flex-direction: column;
    position: fixed;
    padding: 20px;
    box-shadow: 0px 1px 7px 2px rgba(173, 173, 173, 0.2);
    top: 0px;
    margin-top: 6rem;
    left: 50%;
    margin-left: -30rem;
    height: fit-content;
    width: fit-content;
    color: #86a1b8;
    background: url('~@/assets/wave.svg');
    background-position-y: bottom;
    background-size: 102%;
    background-color: #fafdff;
    .profile-username{
        font-weight: 700;
        padding-top: 5px;
        text-overflow: ellipsis;
    }
    .post-info{
        margin: 15px 0 5px 0;
        text-align: initial;
        padding: 0 0 0 7px;
    }
 }
 .picture-container{
     @include profile.profile-pic(false);
     box-shadow: 0px 0px 10px -2px #d8e5f1;
 }
 .drawing-container{
     flex-direction: column;
     margin: 0;
     width: inherit;
     max-width: 550px;
      color: #86a1b8;
 }
 .drawing-post{
    @include drawingPost.drawingPost;
 }

 .md-title{
    position: absolute;
    top: -2.9rem;
    left: -7px;
    font-size: 19px;
    color: #8ca6bc;
    padding: 7px 7px 0px 7px;
    font-weight: 700;
    overflow: hidden;
    div{
        box-shadow: 0px 1px 7px 2px rgba(173, 173, 173, 0.2);
        height: 20px;
        padding: 10px 15px 10px 10px;
        background: #fafdff;
    }
 }
</style>