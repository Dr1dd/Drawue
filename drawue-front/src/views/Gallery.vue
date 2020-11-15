<template>
    <div>
        <div class="carousel-container">
            <Carousel/>
        </div>
        <div class="drawing-list--container">
            <div class="filter-container">

            </div>
            <div class="drawing-list--wrapper">
                <div class="drawing-container" v-for="(drawing, index) in drawings" :key="index">
                    <div class="drawing-image">
                        <img :src="'/api/posts/drawing/pic/'+drawing.drawing_path" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import axios from 'axios'
export default {
    name: 'Gallery',
    components:{
        Carousel,
    },
    data(){
        return{
            drawings: [],
        }
    },
    mounted(){
        this.getDrawings();
    },
    methods: {
        getDrawings(){
    
            axios.get('/api/posts/drawings')
                .then((res)=>{
                    console.log(res.data);
                    this.drawings = res.data.drawingPosts;
                })
                .catch((err)=>{
                    console.log(err.response);
                })
        }
    }
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
     padding: 20px;
 }
 .drawing-container{
     height: 164px;
     width: 236px;
     min-width: 236px;
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
</style>