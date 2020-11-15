<template>
    <swiper ref="mySwiper"
      :options="swiperOptions"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <div class="swiper-pagination bullet" slot="pagination" />
  </swiper>
</template>


<script>
import SwiperCore, { Pagination } from 'swiper';
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/components/pagination/pagination.scss';
 import 'swiper/swiper-bundle.css'

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
        }
      }
    },
    components: {
        Swiper,
        SwiperSlide
      },

    methods: {
      onSwiper(swiper) {
        console.log(swiper)
      },
      onSlideChange() {
        console.log('slide change')
      },
    },
  }
</script>



<style lang="scss">

$font-size-huge: 16px;
  .swiper-container{
    min-height: 100%;
    background: white;
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
</style>
