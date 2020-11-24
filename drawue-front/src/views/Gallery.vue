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
                 <router-link :to="{
                    name:'DrawingPost',
                    params: {username:drawing.username, drawing: drawing, drawingID: drawing._id, liked: drawing.liked = likedPosts.includes(drawing._id) }
                }">
                    <div class="drawing-image">
                        <img :src="'/api/posts/drawing/pic/'+drawing.drawing_path" alt="">
                    </div>
                      </router-link>
                </div>
                <div class="load-posts" v-if="loading">
                    <Loader loaderType="rain-drop" color="#88a2b9" />
                </div>
            </div>
        </div>
            <router-view :key="$route.path"/>
    </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import axios from 'axios'
import Loader from 'vueloaderspinners'
export default {
    name: 'Gallery',
    components:{
        Carousel,
        Loader
    },
    data(){
        return{
            drawings: [],
            selectedDrawing: '',
            skip: 0,
            loading: false,
            likedPosts: [],
        }
    },
    mounted(){
        this.getDrawings(this.skip);
        window.onscroll = () =>{
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight+20 > document.documentElement.offsetHeight;
            if(bottomOfWindow){
                this.skip += 30;
                this.getDrawings(this.skip);
            }
        }
    },
    methods: {
        getDrawings(numOfPosts){
            var skip = numOfPosts;
            this.loading=true;
            axios.post('/api/posts/drawings', {skip})
                .then((res)=>{
                    this.drawings.push(...res.data.drawingPosts);
                    this.likedPosts.push(...res.data.likedPosts);
                    console.log(this.likedPosts);
                    this.loading=false;
               })
                .catch((err)=>{
                    console.log(err.response);
                    this.loading=false;
                })
        },
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
.load-posts{
    height: 164px;
    width: 267px;
    min-width: 267px;
    margin: 5px;
    max-width: 267px;
    /* border: 2px solid #ededed; */
    transition: all 0.3s;
    cursor: pointer;
    z-index: 1;
    .loader-container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .rain-drop{
            width: 50%;
            height: 50%;
        }
    }
}

</style>