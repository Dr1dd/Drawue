<template>
    <transition name="fade-away">   
         <div class="drawing-modal--container" v-if="selectedDrawing!=''">
            <div class="drawing-modal" v-on-clickaway="clickAwayModal" >
                <div class="close-drawing--modal" @click="clickAwayModal">
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
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway';
import axios from 'axios';

export default {
    data(){
        return{
            selectedDrawing: '',
        }
    },
    props:{
        drawing:{
            type: Object,
        },
        drawingID:{
            type: String,
        }
    },
    directives: {
        onClickaway: onClickaway,
    },
    mounted(){
        this.selectDrawing(this.drawingID);
    },
    methods:{
        clickAwayModal(){
            if(this.selectedDrawing!='')
                this.selectedDrawing = '';
            if(this.drawing == undefined){
                this.$router.push({name: 'Gallery'});
            }
            else this.$router.go(-1);
        },
        selectDrawing(ID){
             if(this.drawing == undefined){
                 var drawingID = ID
                axios.post('/api/posts/drawings/post-info', { drawingID })
                .then((res)=>{
                    this.selectedDrawing = res.data.drawingPost;
                })
                .catch((err)=>{
                    console.log(err.response);
                })
            }
            else this.selectedDrawing = this.drawing;
        },
        addLike(ID){
            console.log(ID);
            var postID = ID;
            axios.post('/api/posts/like', {postID});
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
    .drawing-modal{
        display: flex;
        flex-direction: row;
        position: relative;
        padding: 20px;
        background: white;
        border-radius: 15px;
        max-width: 1070px;
        margin: 0 13px;
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