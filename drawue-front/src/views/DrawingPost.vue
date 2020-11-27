<template>
    <transition name="fade-away">   
         <div class="drawing-modal--container" v-if="selectedDrawing!=''">
            <div class="drawing-modal" v-on-clickaway="clickAwayModal" >
                <div class="close-drawing--modal" @click="clickAwayModal">
                    <div></div>
                    <div></div>
                </div>
                <div class="drawing-info--wrapper">
                    <div class="modal-left--section">
                        <div class="drawing-image" @dblclick="addLike(selectedDrawing._id)">
                            <img :src="'/api/posts/drawing/pic/'+selectedDrawing.drawing_path" alt="">
                        </div>
                        <div class="drawing-statistics">
                            <div class="favourite-container">
                                <div class="favourite-icon" @click ="addLike(selectedDrawing._id)">
                                    <svg :class="{'active': selectedDrawing.liked}" viewBox="0 0 512 456" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M58.6246 61.1778L58.6242 61.1783C36.5116 85.1644 24.4922 118.139 24.4922 153.871C24.4922 191.918 38.7284 225.688 69.6403 262.986C99.2711 298.741 143.183 336.164 193.409 378.968L193.784 379.288L193.807 379.307L193.831 379.327L193.878 379.366C193.885 379.372 193.893 379.379 193.9 379.385C211.557 394.433 231.543 411.467 252.341 429.652L255.954 432.811L259.573 429.659C280.509 411.428 300.538 394.356 318.235 379.281L318.236 379.28L318.715 378.871C368.893 336.105 412.761 298.716 442.372 262.986L438.321 259.63L442.372 262.986C473.28 225.688 487.516 191.918 487.516 153.871C487.516 118.139 475.496 85.1644 453.384 61.1783L449.34 64.9062L453.384 61.1782C431.567 37.5146 401.55 24.4922 368.977 24.4922C344.969 24.4922 322.897 32.1507 303.511 47.1412L303.51 47.1419C295.11 53.6396 283.926 63.3337 273.993 72.8193C267.16 79.3446 260.617 86.053 256.005 91.674C251.393 86.0527 244.85 79.3443 238.017 72.8193C228.084 63.3336 216.899 53.6394 208.498 47.1415L208.497 47.1412C189.111 32.1508 167.039 24.4922 143.035 24.4922C110.458 24.4922 80.4444 37.5147 58.6246 61.1778ZM78.1098 255.967L78.1097 255.967C48.3263 220.031 35.4922 188.66 35.4922 153.871C35.4922 120.572 46.6836 90.3595 66.7113 68.6347C86.4149 47.2666 113.48 35.4922 143.035 35.4922C164.539 35.4922 184.256 42.3023 201.768 55.8428C209.812 62.0638 220.707 71.4984 230.42 80.7745C240.316 90.2245 248.367 98.934 251.28 103.818L256.003 111.734L260.727 103.819C263.642 98.9343 271.695 90.2244 281.59 80.7745C291.304 71.4983 302.198 62.0635 310.24 55.8425C327.752 42.3022 347.469 35.4922 368.977 35.4922C398.528 35.4922 425.597 47.2667 445.296 68.6342C465.324 90.3591 476.516 120.572 476.516 153.871C476.516 188.66 463.681 220.031 433.902 255.967C404.943 290.912 361.746 327.743 311.101 370.907C294.427 385.112 275.641 401.123 255.968 418.216C236.404 401.156 217.649 385.172 201.013 370.994L200.99 370.974L200.966 370.954L200.919 370.915C200.911 370.909 200.904 370.902 200.896 370.896C150.257 327.74 107.065 290.907 78.1098 255.967ZM239.835 443.941L239.831 443.938C219.126 425.833 199.167 408.822 181.581 393.836C181.574 393.83 181.567 393.824 181.559 393.818L181.511 393.775L181.491 393.757L181.47 393.74C129.763 349.677 85.6413 312.051 55.0198 275.104C20.9799 234.028 5.50391 195.592 5.50391 153.871C5.50391 113.049 19.4963 75.6067 44.6649 48.3061C70.1144 20.7038 105.009 5.5 143.035 5.5C171.347 5.5 197.235 14.424 220.115 32.1199C231.691 41.0745 242.229 52.0685 251.547 64.9534L256.003 71.1151L260.46 64.9543C269.782 52.0681 280.317 41.0744 291.896 32.1204L291.896 32.1202C314.777 14.4241 340.665 5.5 368.977 5.5C406.999 5.5 441.897 20.7038 467.347 48.3061C492.515 75.6065 506.504 113.049 506.504 153.871C506.504 195.592 491.032 234.029 456.992 275.1L456.992 275.1C426.37 312.051 382.253 349.672 330.554 393.731C312.931 408.745 292.933 425.79 272.172 443.946L272.171 443.947C267.702 447.857 261.959 450.016 256.004 450.016C250.046 450.016 244.307 447.858 239.835 443.941Z"/>
                                    </svg>

                                </div>
                                <div class="like-count">
                                    {{selectedDrawing.like_count !=undefined ? selectedDrawing.like_count : 0}}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-right--section">
                        <div class="drawing-info--container">
                            <h3>Title:</h3>
                            <div class="drawing-title">
                                {{selectedDrawing.title}}
                            </div>
                            <h3>Description:</h3>
                            <div class="drawing-description">
                                {{selectedDrawing.description}}
                            </div>
                            <h3 v-if="selectedDrawing.tags!=''">Tags:</h3>
                            <div class="drawing-tags--container" v-if="selectedDrawing.tags!=''">
                                <div class="drawing-tag" v-for="(tag, index) in selectedDrawing.tags" :key="index">
                                    {{tag}}
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
                <CommentSection />
            </div>
        </div>
    </transition>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import CommentSection from '../components/Comments'
import axios from 'axios';

export default {
    data(){
        return{
            selectedDrawing: '',
            likeStatus: false,
            author_username: '',
        }
    },
    props:{
        drawing:{
            type: Object,
        },
        drawingID:{
            type: String,
        },
        liked:{
            type: Boolean,
        },
        username:{
            type: String,
        }
    },
    components:{
        CommentSection,
    },
    directives: {
        onClickaway: onClickaway,
    },
    mounted(){
        document.body.style.overflowY = 'hidden';
        this.selectDrawing(this.drawingID);
    },
    methods:{
        clickAwayModal(){
            document.body.style.overflowY = 'auto';
            if(this.selectedDrawing!='')
                this.selectedDrawing = '';
            if(this.drawing == undefined){
                switch(this.$parent.$route.name){
                    case 'DrawingPost':
                         this.$router.push({name: 'Gallery'});
                         break;
                    case 'UserDrawingPost':
                        this.$router.push({name: 'Profile'});
                        break;
                }
            }
            else this.$router.go(-1);
        },
        selectDrawing(ID){
             if(this.drawing == undefined){
                 var drawingID = ID;
                axios.post('/api/posts/drawings/post-info', { drawingID })
                .then((res)=>{
                    this.selectedDrawing = res.data.drawingPost;
                    this.selectedDrawing.liked = res.data.likeStatus;
                })
                .catch((err)=>{
                    console.log(err.response);
                });
            }
            else {
                this.selectedDrawing = this.drawing;
            }
            this.author_username = this.username;
        },
        addLike(ID){
            this.selectedDrawing.liked = !this.selectedDrawing.liked
            this.selectedDrawing.like_count = this.selectedDrawing.liked ? this.selectedDrawing.like_count+=1 : this.selectedDrawing.like_count-=1; 
            var postID = ID;
            var index = this.$parent.likedPosts.indexOf(postID);
            if (index !== -1) {
                this.$parent.likedPosts.splice(index, 1);
            }
            else{
                this.$parent.likedPosts.push(postID);
            }
            var author_username = this.author_username;
            axios.post('/api/posts/like', {postID, author_username})
        }
    }

}
</script>

<style scoped lang="scss">
.drawing-modal--container{
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #a3e3e338;
    z-index: 999;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transition: all 0.25s;
    overflow-y: auto;
    .drawing-modal{
        display: flex;
        flex-direction: column;
        position: relative;
        padding: 20px;
        background: white;
        border-radius: 15px;
        max-width: 1070px;
        margin: 15% 13px 0px;
        border: 1px solid #eaebec;
        transition: all 0.25s;
        .close-drawing--modal{
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            right: -8px;
            top: -12px;
            border-radius: 50%;
            padding: 15px;
            background: white;
            border: 1px solid #d6d8d9;
            cursor: pointer;
            div{
                position: absolute;
                height: 25px;
                left: 0;
                right: 0;
                margin: 0 auto;
                width: 2px;
                background: #86a1b8;
                transform: rotate(45deg);
            }
            div:nth-child(2){
                transform: rotate(-45deg);
            }
        }
    }
}
.drawing-info--wrapper{
    display: flex;
}
.modal-left--section{
    display: flex;
    flex-direction: column;
    flex: 6;
    .drawing-image{
        border: 1px solid #e2e2e2;
        border-radius: 10px;
        img{
           height: 100%;
           width: 100%;
           border-radius: 10px;
        }
    }
}
.drawing-statistics{
    display: flex;
    height: 25px;
    width: 100%;
    padding: 12px 0 0px 12px;
    .favourite-container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
    }
    .favourite-icon{
        height: 75%;
        width: 24px;
        clip-path: url(#heart);
        cursor:pointer;
        svg{
            stroke: #ff7b7b;
            stroke-width: 27px;
            height: 95%;
            width: 100%;
        }
    }
}
.modal-right--section{
    display: flex;
    flex-direction: column;
    flex: 1.5;
    margin: 15px 0 15px 15px;   
    .drawing-info--container{
        text-align: left;
        overflow-y: auto;
        max-height: 49vw;
        padding-right: 10px;
        &::-webkit-scrollbar {
        width: 9px;
        height: 9px;
        }
        &::-webkit-scrollbar-thumb {
        background: #dbdbdb;
        border-radius: 10px;
        }
        &::-webkit-scrollbar-thumb:hover{
        background: #C9D5E0;
        }
        &::-webkit-scrollbar-track{
        background: #ffffff;
        border-radius: 9px;
        box-shadow: inset 7px 8px 12px #f0f0f0;
        }
    }
}
.drawing-title{
    word-break: break-all;
}
.drawing-description{
    word-break: break-all;
}
.drawing-tags--container{
    display: flex;
    flex-wrap: wrap;
}
.drawing-tag{
    padding: 4px 8px;
    margin: 5px 5px 5px 0;
    display: flex;
    width: fit-content;
    border-radius: 14px;
    font-size: 12px;
    border: 2px solid #8eb0c2;
}
.active{
    fill: #ff7b7b;
}
</style>