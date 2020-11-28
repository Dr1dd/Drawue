<template>
  <div class="comment-section--container">
      <div class="write-comment" :class="{'focus': inputFocus}">
          <div class="user-img">
              <img :src="'/api/posts/profile/pic/' + getProfilePic" alt="pic">
          </div>
          <div class="comment-input" @focus="inputFocus = true">
              <div class="text-area">
                    <textarea name="comment" :class="{'focus': inputFocus}" @focus="inputFocus = true" v-model="$v.commentText.$model"></textarea>
                    <transition name="drop-down">
                        <div class="comment-edit--overlay" v-if="inputFocus">
                            <div class="send-icon" @click="saveComment">
                                <svg width="536" height="536" viewBox="0 0 536 536" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0)">
                                    <path d="M0 457.82C0 476.486 19.0853 489.071 36.2419 481.718L535.5 267.75L36.2418 53.7822C19.0853 46.4294 0 59.0142 0 77.68V193.987C0 207.018 9.64679 218.036 22.5637 219.758L382.5 267.75L22.5638 315.741C9.64681 317.464 0 328.482 0 341.513V457.82Z" fill="#86A1B8"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0">
                                    <rect width="535.5" height="535.5" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </transition>   
             </div>
          </div>
      </div>
      <div class="comment-list--container">
          <div class="comment-container" v-for="(comment, index) in commentArray" :key="index">
              <div class="resize-comment">
                  <span>&#8722; &#43;</span>
              </div>
              <div class="comment-wrapper">
                  <div class="comment-author--container">
                      <img :src="'/api/posts/profile/pic/' + comment.profilePic" alt="pic">
                      <div class="comment-author">
                          {{comment.username}}
                      </div>
                  </div>
                  <div class="comment-text">
                      {{comment.comment.text}}
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { minLength, maxLength } from 'vuelidate/lib/validators'
import axios from 'axios';
export default {
    name:"CommentSection",
    data(){
        return{
            inputFocus: false,
            commentText: '',
            commentArray: [],
            userArray: [],
        }
    },
    validations: {
        commentText: {
            minLength: minLength(2),
            maxLength: maxLength(1000),
        },

    },
    mounted(){
        this.getComments();
    },
    computed: {
      ...mapGetters(['getLoginState', 'getProfilePic', 'getUsername']),
    },
    methods:{
        saveComment(){
            var text = this.commentText;
            var postID = this.$route.params.drawingID;
            axios.post('/api/posts/comment', {postID, text})
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{
                console.log(err.response);
            })
        },
        getComments(){
            var postID = this.$route.params.drawingID;
            axios.post('/api/posts/comments', {postID})
            .then((res)=>{
                this.commentArray.push(...res.data.commentArray);
                console.log(res.data.commentArray);
                //this.userArray.push(...res.data.userArray);
                console.log(res.data.commentArray);
                //console.log(res.data.userArray);
            })
            .catch((err)=>{
                console.log(err.response);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$module-theme: #86a1b8;
    .comment-section--container{
        display: flex;
        flex-direction: column;
        border-top: 2px solid #f1f1f1;
        margin-top: 25px;
        .focus{
            padding-bottom: 45px;
        }
    }
    .write-comment{
        display: flex;
        padding: 15px;
        min-height: 75px;
        max-height: 400px;
        border-bottom: 2px solid #f1f1f1;
        .user-img{
            img{
                height: 60px;
                width: 60px;
                border-radius: 50%;
            }
        }
    }
    .comment-input{
        width: 100%;
        max-height: 100%;
        text-align: left;
        padding: 5px 15px 5px 10px;
        .text-area{
            display: flex;
            position: relative;
            border-radius: 15px;
        }
        textarea{
            box-sizing: border-box;
            height: 50px;
            min-height: 50px;
            max-height: 150px;
            border-radius: 8px;
            border: 2px solid #d6dbda;
            width: 100%;
            margin: 0;
            z-index: 2;
            &:focus{
                box-shadow: 0px 0px 0px 0px;
            }
        }
        .focus{
                height: 80px;
        }
        svg{
            height:25px;
            width: 25px;
        }
    }
    .comment-edit--overlay{
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        position: absolute;
        background: #dddddd;
        bottom:0;
        left: 0;
        width: 100%;
        height: 45px;
        border-radius: 0 0 10px 10px;
        transform: translateY(33px);
        transition: all 0.25s;
        .send-icon{
            cursor: pointer;
            svg{
                margin: 5px 8px 1px;
            }
        }
    }
    .drop-down-active, .drop-down-leave-active {
      transition: all .6s;
    }
    .drop-down-enter, .drop-down-leave-to {
        opacity: 0;
        transform: translateY(0px);
    }
    .comment-container{
        display: flex;
        flex-direction: column;
        min-height: 150px;
        height: 150px;     
        align-items: flex-start;
        padding: 5px;
        .resize-comment{
            display: flex;
            justify-content: flex-end;
            height: 25px;
            width: 100%;
            font-size: 33px;
            align-items: center;
            line-height: 0.5;
            color: $module-theme;
            cursor: pointer;
        }
    }
    .comment-wrapper{
        display: flex;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 15px;
        border-bottom: 2px solid #f1f1f1;
        .comment-author--container{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            img{
                height: 36px;
                width: 36px;
                border-radius: 50%;
            }
            .comment-author{
                font-size: 12px;
                font-weight: 700;
                color: $module-theme;
                margin: 5px 0;
            }
        }
        .comment-text{
            display: flex;
            width: 100%;
            padding: 15px;
            color: #888888;
        }
    }
</style>