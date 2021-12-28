<template>
  <div class="reply-container" :style="{paddingLeft: '45px'}" :class="{'minimized': !currentReply[0].expanded}">
      <div class="reply">
        <div class="resize-reply" @click="currentReply[0].expanded= !currentReply[0].expanded">
            <span>{{currentReply[0].expanded ? '&#8722;' : '&#43;'}}</span>
        </div>
        <div class="reply-wrapper" >
                <div class="user-img" @click ="$router.push({ name: 'UserProfile', params: currentReply[0].username })">
                    <img :src="'/api/posts/profile/pic/' + currentReply[0].profilePic" alt="pic" @error="$event.target.src='/api/posts/profile/pic/default-user.png'">
                    <div class="reply-author">
                        <router-link :to="{name: 'UserProfile'}" :params="currentReply[0].username">
                          {{currentReply[0].username}}
                        </router-link>
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
                                <img :src="'/api/posts/profile/pic/' + getProfilePic" alt="pic" @error="$event.target.src='/api/posts/profile/pic/default-user.png'">
                            </div>
                            <div class="comment-input">
                                <div class="text-area">
                                    <span class="reply-text" contenteditable="true" name="comment"></span>
                                    <transition name="drop-down">
                                        <div class="comment-edit--overlay">
                                            <div class="send-icon" @click="sendReply($event, currentReply[0].comment._id, currentReply[0].comment.postID)">
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
        <div class="resize-border" @click="currentReply[0].expanded= !currentReply[0].expanded">
            <div></div>
        </div>
      </div>
      <ErrorModal v-if="replyErrorText !=''" @close="replyErrorText =''" > {{replyErrorText}} </ErrorModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import ErrorModal from './ErrorModal'
export default {
    name: 'Reply',
    data(){
        return{
            currentReply: this.commentArray.filter(obj => { return obj.comment._id == this.replyID}),
            level:  this.replyLevel,
            isReplying: false,
            comments: [],
            replyErrorText: '',
        }
    },
    components:{
        ErrorModal,
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
        sendReply(event, commentID, postID){
                if(this.getLoginState){
                    var textArea = event.target.closest('.text-area');
                    var text = textArea.firstChild.textContent;
                    if(text.length <2){
                        this.replyErrorText = "Reply must have atleast 2 characters";
                        return;
                    }
                    if(text.length >1000){
                        this.replyErrorText = "Reply should not have more than 1000 characters";
                        return;
                    }
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
                        this.replyErrorText = '';
                    })
                    .catch((err)=>{
                        console.log(err.response);
                    });
                }
                else{
                    this.replyErrorText = 'You must be logged in to reply!';
                }
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
        transition: all 0.5s;
    }
    .reply{
        position: relative;
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
            padding-left: 7px;
            cursor: pointer;
            .reply-author{
                font-size: 12px;
                font-weight: 700;
                color: #86a1b8;
                margin: 5px 0;
                cursor: pointer;
            }
            img{
                height: 36px;
                width: 36px;
                border-radius: 50%;
                border: 1px solid #e1e4e4;
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
        .close-reply{
            margin-top: 5px;
        }
    }
    .minimized{
        transition: all 0.5s;
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
                    border: 2px solid #e1e4e4;
                }
                .reply-author{
                    margin: 5px 10px;
                }
            }
    }
    .reply-input--container{
        margin-left: 3rem;
        border-top: 2px solid #eeeeee;
        padding: 5px 0px;
    }
    .replying{
        @include commentReply.replying;
        border-top: none;
    }
    .replies-container{
        width: 100%;
    }
    .reply-error{
        position: absolute;
        bottom: -3px;
        font-size: 12px;
        left: 7rem;
        color: #ff5454;
    }
    .resize-border{
        display: flex;
        justify-content: center;
        position: absolute;
        left: -6px;
        top: -1px;
        height: 100%;
        width: 4px;
        padding: 0 5px;
        cursor: pointer;
        transition: 0.25s all;
        div{
            width: 2px;
            background: #f1f1f1;
        }
        &:hover{
            div{
                 background: #d3d3d3;
            }
        }
    }
</style>