<template v-show="$route.name == 'DrawingBoard'">
    <swiper ref="mySwiper"
      :options="swiperOptions"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
    <swiper-slide v-for="(color, index) in colors" :key="index">
        <div class="bg-color" :style="{'background': color}" @click="changeCanvasBg(color)">
        </div>
    </swiper-slide>
  </swiper>
</template>


<script>
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/components/pagination/pagination.scss';
import 'swiper/swiper-bundle.css'
SwiperCore.use([ Pagination]);
  export default {
    name: 'BGSwiper',
    data() {
      return {
        swiperOptions: {
          slidesPerView: "3",

          // Some Swiper option/callback...
        },
        colors: ['white', 'black', '#ff7b25', '#a2b9bc', '#b2ad7f', '#878f99', '#b5e7a0', '#e6e2d3', '#eea29a', '#50394c', '#f18973'],
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
      changeCanvasBg(color){
          console.log(color);
          this.$store.commit('SET_CANVAS_BG', color);
      }
    },
  }
</script>



<style lang="scss" scoped>

$font-size-huge: 16px;
  .swiper-container{
    width: 150px;
    height: 30px;
    background: white;
    border: 1px solid #92aabf4f;
    border-radius: 9px;
    box-shadow: 2px 2px 4px 2px rgba(173, 173, 173, 0.2);
  }
  .swiper-wrapper{
    background: white;
  }
  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{
    background: #86a1b8;
  }
  .swiper {
  height: 50px;
  width: 150px;

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
.swiper-slide {
    display: flex;
    width: 54px;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: grab;
}
.bg-color{
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: 1px solid #89a4ba;
    cursor: pointer;
}
</style>
