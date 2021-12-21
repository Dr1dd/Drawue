<template>
    <div>
        <div class="carousel-container">
            <Carousel />
        </div>
        <div class="drawing-list--container">
            <div class="filter-container">
                <div class="filter" @click ="isFiltering = !isFiltering">
                    <div class="filter-icon">
                        <svg id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><g><path d="m420.404 0h-328.808c-50.506 0-91.596 41.09-91.596 91.596v328.809c0 50.505 41.09 91.595 91.596 91.595h328.809c50.505 0 91.595-41.09 91.595-91.596v-328.808c0-50.506-41.09-91.596-91.596-91.596zm61.596 420.404c0 33.964-27.632 61.596-61.596 61.596h-328.808c-33.964 0-61.596-27.632-61.596-61.596v-328.808c0-33.964 27.632-61.596 61.596-61.596h328.809c33.963 0 61.595 27.632 61.595 61.596z"/><path d="m432.733 112.467h-228.461c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-35.661c-8.284 0-15 6.716-15 15s6.716 15 15 15h35.662c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h228.461c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-273.133 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z"/><path d="m432.733 241h-35.662c-6.281-18.655-23.927-32.133-44.672-32.133s-38.39 13.478-44.671 32.133h-228.461c-8.284 0-15 6.716-15 15s6.716 15 15 15h228.461c6.281 18.655 23.927 32.133 44.672 32.133s38.391-13.478 44.672-32.133h35.662c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-80.333 32.133c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.686 17.133 17.133-7.686 17.133-17.133 17.133z"/><path d="m432.733 369.533h-164.194c-6.281-18.655-23.926-32.133-44.672-32.133s-38.391 13.478-44.672 32.133h-99.928c-8.284 0-15 6.716-15 15s6.716 15 15 15h99.928c6.281 18.655 23.926 32.133 44.672 32.133s38.391-13.478 44.672-32.133h164.195c8.284 0 15-6.716 15-15s-6.716-15-15.001-15zm-208.866 32.134c-9.447 0-17.133-7.686-17.133-17.133s7.686-17.133 17.133-17.133 17.133 7.685 17.133 17.132-7.686 17.134-17.133 17.134z"/></g></svg>
                    </div>
                    <div class="filter-label">
                        Filter
                    </div>
                </div>
                <transition name="expand">
                <div v-if="isFiltering" class="transition-container">
                    <div class="filter-wrapper" >
                        <div class="tags-container">
                            <div class="filter-label">
                                Tags:
                            </div>
                            <div class="tag-list">
                                <div class="tag" v-for="(tag, index) in filterTags" :key="index">
                                   <label class="container">{{tag}}
                                        <input type="checkbox" :value="tag" v-model="checkedTags">
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="personal-container" v-if="getLoginState">
                            <div class="filter-label">
                                Personal:
                            </div>
                            <div class="personal-filter">
                                <div class="radio-filter">
                                    <input type="radio" id="personal1" value="default" name="filter" v-model="personal" checked>
                                    <label for="personal1">All drawings (default)</label>
                                </div>
                                <div class="radio-filter">
                                    <input type="radio" id="personal2" value="liked" name="filter" v-model="personal">
                                    <label for="personal2">Drawings I liked</label>
                                </div>
                                <div class="radio-filter">
                                    <input type="radio" id="personal3" value="commented" name="filter" v-model="personal">
                                    <label for="personal3">Drawings I commented on</label>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div class="filter-button" @click="changeFilter">
                        {{checkedTags.length == 0 ? 'Filter' :  checkedTags.length + ' tags'}} <font-awesome-icon :icon="['fas', 'filter']" />
                    </div>
                </div>
                </transition>
                <div class="sort-container">
                      <span @click="sortOpen = !sortOpen">{{sort == '' ? 'Sort by' : 'Sorted by: '+sort}}
                          <div class="arrow" :class="{'up': sortOpen, 'down': !sortOpen}">
                          </div>
                      </span>
                      <transition name="expand">
                        <div v-if="sortOpen" class="sort-list">
                            <ul>
                                <li @click="sortDrawings('Recent')">
                                    Recent
                                </li>
                                <li @click="sortDrawings('Likes')">
                                    Most Liked
                                </li>
                            </ul>
                        </div>
                      </transition>
                </div>
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
import { mapGetters } from 'vuex';
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
            carouselDrawings: [],
            isFiltering: false,
            filterTags: [],
            checkedTags: [],
            postLimit: false,
            personal: 'default',
            sort:'',
            sortOpen: false,
            axiosUrl: '/api/posts/drawings',
       }
    },
    computed:{
        ...mapGetters(['getLoginState']),
    },
    mounted(){
        this.getDrawings(this.skip);
        this.getTags();
        window.onscroll = () =>{
            let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight+20 > document.documentElement.offsetHeight;
            if(bottomOfWindow){
                if(!this.postLimit){
                    this.skip += 30;
                    this.getDrawings(this.skip);
                }
            }
        }
    },
    methods: {
        getDrawings(numOfPosts){
            var skip = numOfPosts;
            if(this.checkedTags) var tags = this.checkedTags;
            this.loading=true;
            var filter = this.personal;
            var sort = this.sort;
            axios.post(this.axiosUrl, {skip, tags, filter, sort})
                .then((res)=>{
                    if(res.data.notFound) this.postLimit = true;
                    this.filterDrawings(res.data);
                    this.loading=false;
               })
                .catch((err)=>{
                    console.log(err.response);
                    this.loading=false;
                })
        },
        filterDrawings(data){
            let allDrawings = [];
            let filtered = [];
             switch(this.personal){
                case 'liked':
                    allDrawings = [...data.drawingPosts];
                    if(data.likedPosts) this.likedPosts.push(...data.likedPosts);
                    filtered = allDrawings.filter((drawing) => this.likedPosts.includes(drawing._id));
                    this.drawings.push(...filtered);
                    break;
                case 'commented':
                    if(data.commentedPosts) {
                        allDrawings = [...data.drawingPosts];
                        if(data.likedPosts) this.likedPosts.push(...data.likedPosts);
                        var commentedPosts = [...data.commentedPosts];
                        filtered = allDrawings.filter((drawing) => commentedPosts.includes(drawing._id));
                        this.drawings.push(...filtered);
                    }
                    break;
                case 'default':
                    if(data.drawingPosts) this.drawings.push(...data.drawingPosts);
                    if(data.likedPosts) this.likedPosts.push(...data.likedPosts);
                    break;
            }
        },
        getTags(){
            axios.get('/api/posts/get-tags')
                .then((res)=>{
                    this.filterTags = res.data.tagArray;
                })
                .catch((err)=>{
                    console.log(err.response);
                })
        },
        changeFilter(){
            this.postLimit=false;
            this.axiosUrl = (this.checkedTags.length != 0) ? '/api/posts/drawings/filter/tags' : '/api/posts/drawings'; 
            this.drawings = [];
            this.likedPosts = [];
            this.skip= 0;
            this.getDrawings(this.skip);        
        },
        sortDrawings(sortType){
            this.sortOpen = !this.sortOpen;
            this.sort = sortType;
            this.postLimit=false;
            this.drawings = [];
            this.likedPosts = [];
            this.skip= 0;
            this.getDrawings(this.skip); 
        }
    },

}
</script>

<style lang="scss" scoped>
$module-theme: #86a1b8;
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
    margin-bottom: 50px;
    border: 1px solid #d4d4d4;
    box-shadow: 2px 2px 4px 2px rgba(173, 173, 173, 0.2);
 }
 .filter-container{
    display: flex;
    position: relative;
    padding: 16px;
    border-bottom: 1px solid #cfcfcf78;
    background: radial-gradient(circle, rgba(255,255,255,1) 14%, rgba(242,245,249,1) 83%);
    .filter{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 9px;
        cursor: pointer;
        .filter-icon{
            fill: $module-theme;
            height: 24px;
            width: 24px;
        }
        .filter-label{
            font-size: 12px;
            color: $module-theme;
            font-weight: 700;
            margin-top: 2px;
        }
    }
    .filter-button{
        text-align: center;
        background: #a3bed7;
        border-radius: 10px;
        color: white;
        font-weight: 700;
        padding: 6px 8px;
        font-size: 13px;
        height: fit-content;
        place-self: flex-end;
        margin: 5px;
        border: 2px solid #90abc4;
        cursor: pointer;
    }
    .sort-container{
        display: flex;
        right: 20px;
        bottom: 5px;
        position: absolute;
        align-self: flex-end;
        cursor: pointer;
        span{
            color: $module-theme;
            .arrow{
                border-color: $module-theme;
                margin: 0 0px;
            }
        }
        .sort-list{
            position: absolute;
            top: 23px;
            right: -7px;
            max-width: 200px;
            min-width: 111px;
            background: white;
            box-shadow: 0px 0px 4px -2px #000000;
            transform-origin: top right;
            z-index: 999;
            ul{
                list-style-type: none;
                padding: 0;
                text-align: left;
                margin: 0;
                li{
                    color: #8ba5bb;
                    padding: 5px 10px;
                    &:hover{
                        background: #eaeff3;
                    }
                }
            }
        }
    }
 }
 .transition-container{
     display: flex;
     transform-origin: top left;
 }
    .filter-wrapper{
        display: flex;
        position: relative;
        max-width: 600px;
        min-height: 50px;
        background: white;
        border: 2px solid $module-theme;
        border-radius: 10px;
        margin-left: 10px;
        .filter-label{
            display: flex;
            color: $module-theme;
            padding: 5px 0 0 10px;
        }
    .tags-container{
        display: flex;
        flex-direction: column;
        flex: 1;
        .tag-list{
            display: flex;
            flex-wrap: wrap;
            margin-left: 8px;
            .tag{
                display: flex;
                margin: 5px;
                .container {
                    display: block;
                    position: relative;
                    margin-bottom: 12px;
                    cursor: pointer;
                    font-size: 16px;
                    padding-left: 30px;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    color: #a1aec0;
                }
                .container input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }
                .checkmark {
                    position: absolute;
                    top: 0;
                    left: 0;
                    min-height: 20px;
                    min-width: 20px;
                    background-color: #eee;
                }
                .container:hover input ~ .checkmark {
                    background-color: #ccc;
                }
                .container input:checked ~ .checkmark {
                    background-color: #93adc6;
                }
                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
                .container input:checked ~ .checkmark:after {
                    display: block;
                }
                .container .checkmark:after {
                    left: 6px;
                    top: 2px;
                    width: 5px;
                    height: 10px;
                    border: solid white;
                    border-width: 0 3px 3px 0;
                    transform: rotate(45deg);
                }
            }
        }
        &::after{
            content:'';
            position: absolute;
            padding: 6px;
            top: 12px;
            left: -8px;
            background: white;
            border-left: 2px solid #86a1b8;
            border-bottom: 2px solid #86a1b8;
            transform: rotate(45deg);
        }
    }
    .personal-container{
        display: flex;
        flex-direction: column;
        flex: 1;
        .personal-filter{
            display: flex;
            flex-direction: column;
            place-items: flex-start;
            margin-left: 10px;
            .radio-filter{
                margin: 5px 0;
                input{
                    border-radius: 50%;
                    padding: 4px;
                    margin: 0 5px;
                    border: 2px solid #c0cedb;
                    appearance: none;
                    &:checked{
                        background: radial-gradient(circle, rgba(122,163,201,1) 6%, rgba(255,255,255,1) 55%);
                        background-position: center;
                        background-size: 100% 100%;
                    }
                }
                label{
                    color: #a1aec0;
                }
            }
        }
    }
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
  .expand-enter-active, .expand-leave-active {
      transition: all .4s ease;
      max-height: 350px;
  }
  .expand-enter, .expand-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      transform: scale(0,0);
      max-height: 0px;
    
  }

</style>