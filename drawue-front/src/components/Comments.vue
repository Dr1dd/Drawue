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
          <div class="comment-container" v-for="(commentObj, index) in commentArray" :key="index" :class="{'minimized': !commentObj.expanded}">
              <div class="resize-comment" @click="commentObj.expanded = !commentObj.expanded">
                  <span>{{commentObj.expanded ? '&#8722;' : '&#43;'}}</span>
              </div>
              <div class="comment-wrapper">
                  <div class="comment-author--container">
                      <img :src="'/api/posts/profile/pic/' + commentObj.profilePic" alt="pic">
                      <div class="comment-author">
                          {{commentObj.username}}
                      </div>
                  </div>
                  <div class="comment-text" v-if="commentObj.expanded">
                      {{commentObj.comment.text}}
                  </div>
              </div>
              <div class="comment-interact" v-if="commentObj.expanded" :class="{'replying': isReplying == index }">
                  <div class="comment-reply" @click="isReplying = index">
                      <svg v-if="isReplying != index" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 511.992 511.992" style="enable-background:new 0 0 511.992 511.992;" xml:space="preserve">
                        <g>
                            <g>
                                <path d="M255.992,175.994h-64v-96c0-6.624-4.064-12.544-10.24-14.912c-6.112-2.432-13.152-0.768-17.6,4.16l-160,176
                                    c-5.536,6.112-5.536,15.424,0,21.536l160,176c3.104,3.36,7.424,5.216,11.84,5.216c1.952,0,3.904-0.352,5.76-1.056
                                    c6.176-2.4,10.24-8.32,10.24-14.944v-96h33.6c97.856,0,189.856,38.112,259.072,107.328c4.608,4.608,11.52,5.952,17.44,3.456
                                    c5.984-2.464,9.888-8.32,9.888-14.784C511.992,290.842,397.144,175.994,255.992,175.994z"/>
                            </g>
                        </g>
                      </svg>
                      <div class="close-reply" v-else>
                          <div></div>
                          <div></div>
                      </div>
                  </div>
                  <div class="reply-form--container" v-if="isReplying == index">
                    <div class="reply-input--container">
                         <div class="write-reply">
                            <div class="user-img">
                                <img :src="'/api/posts/profile/pic/' + getProfilePic" alt="pic">
                            </div>
                            <div class="comment-input">
                                <div class="text-area">
                                    <span class="reply-text" contenteditable="true" name="comment"></span>
                                    <transition name="drop-down">
                                        <div class="comment-edit--overlay">
                                            <div class="send-icon" @click="sendReply(commentObj.comment.postID)">
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
                    </div>
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
            isReplying: -1,
            replyText: '',
        }
    },
    validations: {
        commentText: {
            minLength: minLength(2),
            maxLength: maxLength(1000),
        },
        replyText: {
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
        sendReply(postID){
            console.log(postID);
            // var text = this.commentText;
            // var postID = this.$route.params.drawingID;
            // axios.post('/api/posts/comment/reply', {postID, text})
            // .then((res)=>{
            //     console.log(res.data);
            // })
            // .catch((err)=>{
            //     console.log(err.response);
            // })
        },
        getComments(){
            var postID = this.$route.params.drawingID;
            axios.post('/api/posts/comments', {postID})
            .then((res)=>{
                this.commentArray.push(...res.data.commentArray);
                console.log(this.commentArray);
            })
            .catch((err)=>{
                console.log(err.response);
            })
        },

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
        min-height: 100px;  
        align-items: flex-start;
        border-bottom: 2px solid #f1f1f1;
        align-items: center;
        .resize-comment{
            display: flex;
            justify-content: flex-end;
            box-sizing: border-box;
            height: 25px;
            width: 100%;
            font-size: 33px;
            align-items: center;
            line-height: 0.5;
            padding-right: 15px;
            color: $module-theme;
            cursor: pointer;
        }
    }
    .comment-wrapper{
        display: flex;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        padding: 0 15px 0px;
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
    .comment-interact{
        display: flex;
        justify-content: flex-end;
        width: 100%;
        padding-bottom: 5px;
        .comment-reply{
            height: 20px;
            width: 20px;
            padding-right: 15px;
            cursor: pointer;
            svg{
                fill: $module-theme;
                height: 100%;
                width: 100%;
            }
        }
        .close-reply{
            position: relative;
            height: 20px;
            width: 20px;
            div{
                position: absolute;
                width: 2px;
                height: 100%;
                background: $module-theme;
                transform: rotate(45deg);
                right: 0;
                left: 0;
                margin: 0 auto;
            }
            div:nth-child(2){
                transform: rotate(-45deg);
            }
       }
    }
    .minimized{
        flex-direction: row-reverse;
        width: 100%;
        min-height: 40px;
        .comment-wrapper{
            padding: 0 0 0 15px;
        }
        .comment-author--container{
            flex-direction: row;
            img{
                height: 24px;
                width: 24px;
            }
            .comment-author{
                margin: 5px 10px;
            }
        }

    }
    .replying{
        display: block;
        border-top: 2px solid #f1f1f1;
        margin-top: 5px;
        padding-top: 5px;
        .comment-reply{
            float: right;
        }
        .write-reply{
            display: flex;
            min-height: 50px;
            max-height: 400px;
            padding: 7px 7px 7px 60px;
            .user-img{
                display: flex;
                align-self: center;
                img{
                    height: 36px;
                    width: 36px;
                    border-radius: 50%;
                }
            }
        }
        .comment-input{
            width: 92%;
        }
        .comment-edit--overlay{
            background: initial;
            transform: translateY(0);
        }
        .send-icon{
            position: absolute;
            right: -15px;
            bottom: 0px;
        }
        .text-area{
            .reply-text{
                box-sizing: border-box;
                min-height: 35px;
                max-height: 150px;
                max-width: 97%;
                border-radius: 8px;
                border: 2px solid #d6dbda;
                width: 100%;
                margin: 0;
                z-index: 2;
                padding: 5px;
                &:focus{
                    outline: none;
                    box-shadow: 0px 0px 0px 0px;
                }
            }
        }
    }
</style>