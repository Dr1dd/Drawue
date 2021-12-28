<template>
    <swiper ref="mySwiper"
      :options="swiperOptions"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
    <swiper-slide v-for="(drawing, index) in drawings" :key="index">
      <router-link :to="{
        name:'DrawingPost',
        params: {username:drawing.username, drawing: drawing, drawingID: drawing._id, liked: drawing.liked = likedPosts.includes(drawing._id) }
      }">
           <img class="carousel-image" :src="'/api/posts/drawing/pic/'+drawing.drawing_path" alt="">
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination bullet" slot="pagination" />
  </swiper>
</template>


<script>
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper-bundle.css'
import axios from 'axios'
SwiperCore.use([ Pagination]);
  export default {
    name: 'Carousel',
    data() {
      return {
        swiperOptions: {
          slidesPerView: "3",
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // Some Swiper option/callback...
        },
        drawings: [],
        likedPosts: [],
        
      }
    },
    components: {
        Swiper,
        SwiperSlide
      },
    mounted(){
      this.getCarouselDrawings();
    },
    methods: {
      getCarouselDrawings(){
        axios.get('/api/posts/drawings/carousel')
          .then((res)=>{
            this.drawings.push(...res.data.drawingPosts);
            this.likedPosts.push(...res.data.likedPosts);
          })
          .catch((err)=>{
            console.log(err.response);
          })
      },
      onSwiper(swiper) {
        console.log(swiper)
      },
      onSlideChange() {
        console.log('slide change')
      },

    },
  }
</script>



<style lang="scss" scoped>

$font-size-huge: 16px;
  .swiper-container{
    min-height: 100%;
    height: 100%;
    background: white;
    border: 1px solid #d4d4d4;
    box-shadow: 2px 2px 4px 2px rgba(173, 173, 173, 0.2);
  }
  .swiper-wrapper{
    background: white;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
    background: #86a1b8;
  }
  .swiper {
  height: 300px;
  width: 100%;

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: $font-size-huge * 2;
    background-color: #fff;
  }
}
.carousel-image{
  height: 100%;
}
</style>
