<template>
  <div class="reply-container" :style="{paddingLeft: '45px'}" :class="{'minimized': !currentReply[0].expanded}">
      <div class="reply">
        <div class="resize-reply" @click="currentReply[0].expanded= !currentReply[0].expanded">
            <span>{{currentReply[0].expanded ? '&#8722;' : '&#43;'}}</span>
        </div>
        <div class="reply-wrapper">
                <div class="user-img">
                    <img :src="'/api/posts/profile/pic/' + getProfilePic" alt="pic">
                    <div class="reply-author">
                        {{currentReply[0].username}}
                    </div>
                </div>
                <div class="reply-text" v-if="currentReply[0].expanded">
                    {{currentReply[0].comment.text}}
                </div>
        </div>
        <div class="reply-interact" v-if="currentReply[0].expanded" :class="{'replying': isReplying }">
                <div class="comment-reply" @click="isReplying = !isReplying">
                    <svg v-if="!isReplying" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                    <div v-else class="close-reply">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div class="reply-form--container" v-if="isReplying">
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
                                            <div class="send-icon" @click="sendReply(currentReply[0].comment._id, currentReply[0].comment.postID)">
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
        <div class="replies-container" v-if ="currentReply[0].expanded">
                <Reply v-for="(reply, index) in currentReply[0].comment.children" :key="index" :commentArray="commentArray" :replyID="reply" :replyLevel="level+1" />
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
    name: 'Reply',
    data(){
        return{
            currentReply: this.commentArray.filter(obj => { return obj.comment._id == this.replyID}),
            level:  this.replyLevel,
            isReplying: false,
            comments: [],
        }
    },
    props:{
        commentArray:{
            type: Array,
        },
        replyID:{
            type: String,
        },
        replyLevel:{
            type: Number,
        }
    },
    computed:{
        ...mapGetters(['getLoginState', 'getProfilePic', 'getUsername']),
    },
    mounted(){
        this.comments = this.commentArray;
    },
    methods:{
        sendReply(commentID, postID){
             var textArea = event.target.closest('.text-area');
            var text = textArea.firstChild.textContent;
            axios.post('/api/posts/comment/reply', {postID, commentID, text})
            .then((res)=>{
                 var reply = {};
                this.$set(reply, 'username', this.getUsername);
                this.$set(reply, 'profilePic', this.getProfilePic);
                this.$set(reply, 'expanded', true);
                this.$set(reply, 'comment', res.data.reply);
                this.comments.push(reply);
                this.currentReply[0].comment.children.push(res.data.reply._id);
                this.isReplying = false;
            })
            .catch((err)=>{
                console.log(err.response);
            })
        },
    }
}
</script>

<style scoped lang="scss">
$module-theme: #86a1b8;

@use '../sass/components/_commentReply';
    .reply-container{
        display: flex;
        flex-direction: column;
        align-items: baseline;
        box-sizing: border-box;
        width: 100%;
    }
    .reply{
        width: 100%;
        border-top: 2px solid #f1f1f1;
    }
    .reply-wrapper{
        display: flex;
        width: 100%;
         .user-img{
            display: flex;
            flex-direction: column;
            align-items: center;
            .reply-author{
                font-size: 12px;
                font-weight: 700;
                color: #86a1b8;
                margin: 5px 0;
            }
            img{
                height: 36px;
                width: 36px;
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
    .resize-reply{
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
    .reply-text{
        display: flex;
        width: 100%;
        padding: 15px;
        color: #888888;
    }
    .reply-interact{
        @include commentReply.comment-interact;
    }
    .minimized{
            .reply{
                display: flex;
                flex-direction: row-reverse;
                width: 100%;
                min-height: 40px;
                align-items: center;
            }
            .reply-wrapper{
                padding: 0 0 0 15px;
            }
            .user-img{
                flex-direction: row;
                img{
                    height: 24px;
                    width: 24px;
                }
                .reply-author{
                    margin: 5px 10px;
                }
            }
            

    }
    .replying{
        @include commentReply.replying;
    }
    .replies-container{
        width: 100%;
    }
</style>