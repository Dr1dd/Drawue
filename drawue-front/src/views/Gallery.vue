<template>
    <div>
        <div class="carousel-container">
            <Carousel/>
        </div>
        <div class="drawing-list--container">
            <div class="filter-container">

            </div>
            <div class="drawing-list--wrapper">

            </div>
        </div>
    </div>
</template>

<script>
import Carousel from '../components/Carousel.vue'

export default {
    name: 'Gallery',
    components:{
        Carousel,
    },
    data(){
        return{

        }
    }
}
</script>

<style lang="scss">
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
</style>