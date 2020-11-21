<template>
    <div>
        <div class="carousel-container">
            <Carousel/>
        </div>
        <div class="drawing-list--container">
            <div class="filter-container">

            </div>
            <div class="drawing-list--wrapper">
                <div class="drawing-container" v-for="(drawing, index) in drawings" :key="index" @click="selectedDrawing = drawing">
                    <div class="drawing-image">
                        <img :src="'/api/posts/drawing/pic/'+drawing.drawing_path" alt="">
                    </div>
                </div>
            </div>
        </div>
        <transition name="fade-away">
            <div class="drawing-modal--container" v-if="selectedDrawing!=''">
                <div class="drawing-modal" v-on-clickaway="clickAwayModal" >
                    <div class="close-drawing--modal" @click="selectedDrawing = ''">
                        <div></div>
                        <div></div>
                    </div>
                    <div class="modal-left--section">
                        <div class="drawing-image" @dblclick="addLike(selectedDrawing._id)">
                            <img :src="'/api/posts/drawing/pic/'+selectedDrawing.drawing_path" alt="">
                        </div>
                        <div class="drawing-statistics">
                            Likes:
                            {{selectedDrawing.like_count !=undefined ? selectedDrawing.like_count : 0}}
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
            </div>
        </transition>
    </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import axios from 'axios'
import { directive as onClickaway } from 'vue-clickaway';
export default {
    name: 'Gallery',
    components:{
        Carousel,
    },
    data(){
        return{
            drawings: [],
            selectedDrawing: '',
        }
    },
    mounted(){
        this.getDrawings();
        // if(this.selectedDrawing=='')
        //this.popupItem = this.$el;
        //console.log( this.popupItem);
    },
    directives: {
        onClickaway: onClickaway,
    },
    methods: {
        getDrawings(){
    
            axios.get('/api/posts/drawings')
                .then((res)=>{
                    this.drawings = res.data.drawingPosts;
                })
                .catch((err)=>{
                    console.log(err.response);
                })
        },
        addLike(ID){
            var postID = ID
            axios.post('/api/posts/like', {postID})
        },
        clickAwayModal(){
            if(this.selectedDrawing!='')
             this.selectedDrawing = '';
        }
    },

}
</script>

<style lang="scss" scoped>
 .carousel-container{
    padding-top: 65px;
    min-height: 17rem;
    height: 17rem;
    margin: 0 auto;
    max-width: 95%;
 }
 .drawing-list--container{
    max-width: 95%;
    background: white;
    margin: 20px auto 0px;
    min-height: 17rem;
 }
 .filter-container{
    padding: 20px;
    height: 2rem;
    border-bottom: 1px solid #cfcfcf78;
    background: #ededed;
 }
 .drawing-list--wrapper{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     justify-content: center;
     padding: 20px;
 }
 .drawing-container{
     height: 164px;
     width: 236px;
     min-width: 236px;
     max-width: 263px;
     margin: 5px;
     border: 2px solid #ededed;
     border-radius: 5px;
     transition: all 0.3s;
     cursor: pointer;
     z-index: 1;
     .drawing-image{
        height: 100%;
        width: 100%;
        img{
            height: 100%;
            width: 100%;
            border-radius: 5px;
            transition: all 0.3s;
        }
    }
    &:hover{
        transform: scale(1.1);  
        box-shadow: 8px 8px 2px 1px #f5f5f5;
        z-index: 2;
    }
}
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
    .drawing-modal{
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 20px;
        background: white;
        border-radius: 15px;
        max-width: 1070px;
        margin: 0 13px;
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
</style>