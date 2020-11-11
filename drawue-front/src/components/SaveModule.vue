<template>
<transition name="fade-away">
  <div v-if="isOpen" class="save-module--container">
      <div class="save-module">
          <div class="save-module--header"> 
              <div class="close-module" @click="closeModule">
                    <div></div>
                    <div></div>
              </div>
          </div>
          <div v-if="!isPublishing" class="save-type">
              <span class="choice-container">
                  <span class="choice-collumn"></span>
                  <span class="choice-text">or</span>
              </span>
              <div class="download-drawing" @click="downloadImage">
                  <a href="#" id="download">
                  <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 18c-.205 0-.401-.084-.542-.232l-5.25-5.5c-.455-.476-.117-1.268.542-1.268h2.75v-5.75c0-.689.561-1.25 1.25-1.25h2.5c.689 0 1.25.561 1.25 1.25v5.75h2.75c.659 0 .997.792.542 1.268l-5.25 5.5c-.141.148-.337.232-.542.232z"/><path d="m21 24h-18c-1.654 0-3-1.346-3-3v-5c0-1.654 1.346-3 3-3h1.5c.552 0 1 .448 1 1s-.448 1-1 1h-1.5c-.551 0-1 .449-1 1v5c0 .551.449 1 1 1h18c.551 0 1-.449 1-1v-5c0-.551-.449-1-1-1h-1.5c-.552 0-1-.448-1-1s.448-1 1-1h1.5c1.654 0 3 1.346 3 3v5c0 1.654-1.346 3-3 3z"/></svg>
                  Download
                  </a>
              </div>
              <div class="publish-drawing" @click="isPublishing = true">
                  <svg enable-background="new 0 0 1000 1000" version="1.1" viewBox="0 0 1e3 1e3" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m498.4 411.5-243.4 235.5h147v294h196v-294h147l-246.6-235.5zm393.6-352.5h-784c-53.9 0-98 44.1-98 98v588c0 53.9 44.1 98 98 98h196v-98h-196v-441h784v441h-196v98h196c53.9 0 98-44.1 98-98v-588c0-53.9-44.1-98-98-98zm-759.5 159.3c-20.3 0-36.8-16.5-36.8-36.8s16.5-36.8 36.8-36.8 36.8 16.5 36.8 36.8-16.5 36.8-36.8 36.8zm98 0c-20.3 0-36.8-16.5-36.8-36.8s16.5-36.8 36.8-36.8 36.8 16.5 36.8 36.8-16.5 36.8-36.8 36.8zm661.5-12.3h-588v-49h588.9l-0.9 49z"/></svg>
                  Publish
              </div>
          </div>
          <div v-else class="publish-module">
              <div class="drawing-container">
                  <div class="drawing-img"> <img :src="getCanvasImage" alt="Canvas Drawing"></div>
              </div>
              <div class="drawing-info">
                    <div class="drawing-title">
                        <input type="text" placeholder="Title">
                    </div>
                    <div class="drawing-description">
                        <textarea name="Description" placeholder="Description"></textarea>
                    </div>
                    <div class="drawing-tags">
                        <div class="tag-container">
                            <div class="tag" v-for="(tag, index) in tags" :key="index">
                                <span class="tag-text"> {{tag}}</span>
                                <span class="close-tag" @click="tags.splice(index, 1)"> <div></div> <div></div></span>
                            </div>
                            <input class="tag-input" type="text"  maxlength="16" id="tag-input" placeholder="Enter a tag" @keyup.space ="addTag" @keyup.enter ="addTag">
                        </div>
                    </div>
              </div>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'SaveModule',
    data(){
        return{
            isPublishing: false,
            tags: [],
        }
    },
    props: {
        drawingImage: String,
        isOpen:{
            type: Boolean,
            default: false,
        }
    },
    mounted(){
        window.addEventListener('click', function(e){
            console.log(this.isPublishing);
            if(this.isPublishing && this.isPublishing!=undefined){
            console.log(e)
                var module = document.getElementsByClassName('save-module');
                if(!module.contains(e.target)){
                    this.closeModule;
                }
            }
        });
        
    },  
    computed:{
        ...mapGetters(['getLoginState']),
        getCanvasImage(){
            return this.drawingImage;
        }
    },
    methods:{
        closeModule(){
            this.$emit('closingSaveModule');
        },
        downloadImage(){
            var image = document.getElementById('download');
            image.href = this.drawingImage;
            image.download = "Drawing.png";
        },
        addTag(e){
            this.tags.push(e.target.value);
            e.target.value = '';
        }
    }

}
</script>

<style lang="scss">
$module-theme: #86a1b8;
a{
    color: $module-theme;
    text-decoration: none;
}
.save-module--container{
    display: flex;
    position: fixed;
    z-index: 999;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #00000038;
    top: 0;
    transition: all 0.25s;
}
.save-module{
    display: flex;
    position: relative;
    flex-direction: column;
    min-width: 250px;
    min-height: 115px;
    box-shadow: 0px 0px 4px -2px #000000;
    background: white;
    border-radius: 10px;
    padding: 20px;
    .save-module--header{
        margin-bottom: 10px;
        .close-module{
            position: absolute;
            right: 15px;
            top: 8px;
            cursor: pointer;
            div{
                position: absolute;
                background: $module-theme;
                height: 15px;
                width: 2px;
            }
            div:nth-child(1){
                transform: rotate(45deg);
            }
            div:nth-child(2){
                transform: rotate(-45deg);
            }
        }
    }
    .save-type{
        display: flex;
        position: relative;
        height: 100%;
        div{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: $module-theme;
            font-weight: 700;
            cursor: pointer;
            z-index: 1;
            svg{
                height: 64px;
                width: 64px;
                margin-bottom: 10px;
                fill: $module-theme;
            }
        }
        .download-drawing, .publish-drawing{
            flex: 1;

        }
        .download-drawing{
            margin-right: 32px;
        }
        .choice-container{
            display: flex;
            flex-direction: column;
            position: absolute;
            justify-content: center;
            left: 0;
            right: 0;
            margin: 0 auto;
            top: 0;
            bottom: 0;
            .choice-collumn{
                margin: 0 auto;
                width: 3px;
                height: 100%;
                background:  #d0dae4;
                border-radius: 15px;
            }
            .choice-text{
                position: absolute;
                margin: 0 auto;
                background: #ffffff;
                left: 0;
                right: 0;
                height: 18px;
                width: 18px;
                font-size: 12px;
                line-height: 1.3;
                vertical-align: middle;
                border: 3px solid #d0dae4;
                font-weight: 700;
                color: #d0dae4;
                border-radius: 50%;
            }
        }
    }
}
.publish-module{
    display: flex;
    flex-direction: row;
}
.drawing-container{
    flex: 2;
    .drawing-img{
        box-shadow: 0px 0px 5px -2px #000000;
        border-radius: 5px;
        img{
            height: 96px;
            
        }
    }
}
.drawing-info{
    flex: 6;
    min-width: 350px;
    max-width: 350px;
    padding: 20px;
    div{
        display: flex;
    }
    .drawing-title{
        input{
            width: 100%;
        }
    }

}
.drawing-description{
    width: 100%;
    min-height: 135px;
    textarea{
        width: 100%;
    }
}
.drawing-tags{
    width: 100%;
    .tag-container{
        display: flex;
        flex-wrap: wrap;
        border: 3px solid $module-theme;
        padding: 5px;
        width: 100%;
        .tag{
            display: inline;
            padding: 3px 5px;
            background: white;
            box-shadow: 0px 0px 2px -2px #000000;
            border: 2px solid #86a1b8;
            border-radius: 11px;
            margin: 2px 3px;
            .close-tag{
                position: relative;
                padding: 0px 7px;
                cursor: pointer;
                div{
                    position: absolute;
                    width: 2px;
                    height: 10px;
                    right: 4px;
                    top: 1px;
                    background: $module-theme;
                    
                }
                div:nth-child(1){
                    transform: rotate(45deg);
                }
                div:nth-child(2){
                    transform: rotate(-45deg);
                }
            }
        }
        input{
            border:none;
            margin: 0;
            padding: 0px;
            margin-left: 5px;
            width: 100%;
            flex: 1;
            width: inherit;
            min-width: 50px;     
            &:focus{
                box-shadow: none;
            }
        }
    }
}

</style>