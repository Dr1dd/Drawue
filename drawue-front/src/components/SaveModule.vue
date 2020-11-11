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
          <div class="save-type">
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
              <div class="publish-drawing">
                  <svg enable-background="new 0 0 1000 1000" version="1.1" viewBox="0 0 1e3 1e3" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m498.4 411.5-243.4 235.5h147v294h196v-294h147l-246.6-235.5zm393.6-352.5h-784c-53.9 0-98 44.1-98 98v588c0 53.9 44.1 98 98 98h196v-98h-196v-441h784v441h-196v98h196c53.9 0 98-44.1 98-98v-588c0-53.9-44.1-98-98-98zm-759.5 159.3c-20.3 0-36.8-16.5-36.8-36.8s16.5-36.8 36.8-36.8 36.8 16.5 36.8 36.8-16.5 36.8-36.8 36.8zm98 0c-20.3 0-36.8-16.5-36.8-36.8s16.5-36.8 36.8-36.8 36.8 16.5 36.8 36.8-16.5 36.8-36.8 36.8zm661.5-12.3h-588v-49h588.9l-0.9 49z"/></svg>
                  Publish
              </div>
          </div>
      </div>
  </div>
</transition>
</template>

<script>
export default {
    name: 'SaveModule',
    props: {
        drawingImage: String,
        isOpen:{
            type: Boolean,
            default: false,
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

</style>