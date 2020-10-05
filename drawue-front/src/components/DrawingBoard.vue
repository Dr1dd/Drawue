<template>
  <div id ="DrawingBoard">
      <div class ="tool-bar">
          <div class ="color-picker">
              <div class="color-icon" :style="{'background': color}" @click = 'showColorPicker = !showColorPicker'>
                  
              </div>
              <div class="color-picker--container">
                <color-picker
                    v-if="showColorPicker"
                    theme="light"
                    :color="color"
                    :sucker-hide="true"
                    @changeColor="changeColor"
                />
              </div>
          </div>
          <div></div>
          <div class="zoom">
              <div class="zoom-in" @click ="zoomIn()">
                <svg width="24" height="24" viewBox="0 0 371 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="zoom">
                    <circle id="Ellipse 1" cx="125" cy="125" r="109.5"  stroke-width="31"/>
                    <line id="Line 1" x1="125.5" y1="74" x2="125.5" y2="177" stroke-width="31"/>
                    <line id="Line 2" x1="74" y1="125.5" x2="177" y2="125.5" stroke-width="31"/>
                    <path class="Rectangle_1" d="M225.443 184L353.97 273.592C363.031 279.908 365.257 292.375 358.94 301.436L357.437 303.593C351.12 312.654 338.654 314.88 329.593 308.563L201.066 218.971L225.443 184Z" fill="black"/>
                    </g>
                </svg>
              </div>
              <div class="zoom-out">
                  <div @click ="zoomOut()">
                    <svg width="24" height="24" viewBox="0 0 371 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="zoom">
                        <circle id="Ellipse 1" cx="125" cy="125" r="109.5" stroke-width="31"/>
                        <line id="Line 2" x1="74" y1="125.5" x2="177" y2="125.5" stroke-width="31"/>
                        <path class="Rectangle_1" d="M225.443 184L353.97 273.592C363.031 279.908 365.257 292.375 358.94 301.436L357.437 303.593C351.12 312.654 338.654 314.88 329.593 308.563L201.066 218.971L225.443 184Z" fill="black"/>
                        </g>
                    </svg>
                  </div>
              </div>
          </div>
      </div>
      <div class="canvas-container">
         <canvas id="canvas"></canvas> 
      </div>
  </div>
</template>

<script>
import colorPicker from '@caohenghu/vue-colorpicker'
export default {
    name: 'DrawingBoard',
    components:{
        colorPicker
    },
    data() {
        return {
            painting: false,

            color: '#59c7f9',
            suckerCanvas: null,
            suckerArea: [],
            isSucking: false,
            showColorPicker: false,

            ctx: '',
            canvas: '',
            canvasContainer: '',
            positionX: 0,
            positionY: 0,
            canvasScale: 1,
            marginVertical: 0,
        }
    },
    mounted(){
            this.canvasContainer = document.getElementsByClassName('canvas-container');
            const toolBar = document.getElementsByClassName('tool-bar');
            this.canvas = document.querySelector("#canvas");
            this.ctx = this.canvas.getContext('2d');
            
            // window resize
            this.canvas.height = 720;
            this.canvas.width = 1080;
            
            const canvasWidth = (this.canvasContainer[0].offsetWidth - this.canvas.getBoundingClientRect().width)/2;
            const canvasHeight = (this.canvasContainer[0].offsetHeight - this.canvas.getBoundingClientRect().height)/2;
            
            this.positionX = canvasWidth;
            this.positionY = canvasHeight-3;
            toolBar[0].setAttribute("style", "left:"+(canvasWidth-15)+"px")
            //EventListeners
            this.canvas.addEventListener('mousedown', this.startDrawing);
            this.canvas.addEventListener('mouseup', this.finishDrawing);
            this.canvas.addEventListener('mousemove', this.draw);
    },
    methods: {
        changeColor(color) {
            const { r, g, b, a } = color.rgba
            this.color = `rgba(${r}, ${g}, ${b}, ${a})`
        },
        startDrawing(e) {
            this.painting = true;
            this.draw(e)
        },
        finishDrawing(){
            this.painting = false;
            this.ctx.beginPath();
        },
        draw(e){
            if(!this.painting) return;

             this.positionX = (document.body.scrollWidth - this.canvas.getBoundingClientRect().width)/2;
             this.positionY = (document.body.scrollHeight - this.canvas.getBoundingClientRect().height)/2;
             this.ctx.strokeStyle = this.color;
             this.ctx.lineWidth = 10;
             this.ctx.lineCap = "round";
             var scaledX = (e.clientX-this.positionX) * this.canvas.width /this.canvas.getBoundingClientRect().width;
             var scaledY =(e.clientY-this.positionY) * this.canvas.height / this.canvas.getBoundingClientRect().height;
             this.ctx.lineTo(scaledX+(window.scrollX/this.canvasScale), scaledY+(window.scrollY/this.canvasScale));
             this.ctx.stroke();
             this.ctx.beginPath();
             this.ctx.moveTo(scaledX+(window.scrollX/this.canvasScale), scaledY+(window.scrollY/this.canvasScale));
        },
        zoomIn(){
            if(parseFloat(this.canvasScale.toFixed(2)) <= 2.9){
                var Page = document.getElementById('canvas');
                this.canvasScale = parseFloat(this.canvasScale.toFixed(2)) + 0.1;
                Page.style.transform = 'scale('+this.canvasScale+')';
                if(parseFloat(this.canvasScale.toFixed(2)) >1){
                    document.body.style.width = (this.canvas.getBoundingClientRect().width+134)+'px';
                    document.body.style.height = (this.canvas.getBoundingClientRect().height+134)+'px';
                    this.marginVertical += 67/2*1.075;
                    this.canvas.style.margin = this.marginVertical +'px 0';
                }
                
            }
        },
        zoomOut(){
            if(parseFloat(this.canvasScale.toFixed(2)) > 0.1){
                var Page = document.getElementById('canvas');
                this.canvasScale = parseFloat(this.canvasScale.toFixed(2)) - 0.1;
                Page.style.transform = 'scale('+this.canvasScale+')';
                if(parseFloat(this.canvasScale.toFixed(2)) >1){
                    document.body.style.width = (this.canvas.getBoundingClientRect().width+134)+'px';
                    document.body.style.height = (this.canvas.getBoundingClientRect().height+134)+'px';
                    if(window.screen.height)
                    this.marginVertical -= 67/2*1.075;
                    this.canvas.style.margin = this.marginVertical +'px 0';
                }
            }
        }
    },
}
</script>

<style lang="scss">
$default-icon-color: #2c3e50;
#DrawingBoard{
    width: 100vw;
    margin: 0 auto;

}
.tool-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: space-around;
    min-height: 100px;
    top: 28%;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    background: white;
    z-index: 100;
    padding: 10px;
    box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 80%);
    .color-picker--container{
        position: absolute;
        left: 55px;
        top: 19px;
    }
    .color-picker{
        cursor: pointer;
        .color-icon{
            border-radius: 50%;
            height: 24px;
            width: 24px;
            border: 2px solid $default-icon-color;
        }
    }

}
 .canvas-container{
     padding: 67px 0;
 }
 #canvas{
     cursor:crosshair;
     background: white;
     transform-origin: center center;
     
 }
 .zoom{
     display: flex;
     cursor:pointer;
     transition: all 0.25s;
     svg{
         stroke: $default-icon-color;
         .Rectangle_1{
             fill: $default-icon-color;
         }
     }
     .zoom-out{
         position: absolute;
         visibility: hidden;
         right: -74px;
         padding: 0px 25px;
         margin-top: -9px;

         div{
             background: white;
             box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 80%);
             border-radius: 50%;
             padding: 9px;
             display: flex;
             flex-direction: column;
             justify-content: center;
         }
         svg{
             position: relative;
         }
     }
     &:hover{
        .zoom-out{
            visibility: visible;
        }
     }
 }
</style>