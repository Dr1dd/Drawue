<template>
  <div id ="DrawingBoard">
      <div class ="tool-bar">
          <div class="pencil-container" @click ="toolType = 'pencil'" :class ="{'selected': toolType == 'pencil'}">
              <svg width="24" height="24" viewBox="0 0 268 367" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="152.123" y="13.9879" width="52.1453" height="250.218" transform="rotate(25.8416 152.123 13.9879)" stroke="black" stroke-width="20"/>
                <path d="M70.3613 277.384L44.1092 296.597L42.8219 264.091L70.3613 277.384Z" stroke="black" stroke-width="25"/>
                <path d="M30.1847 327.878C30.1847 327.878 21.1367 358.188 82.5684 349.594C144 341 139 337 182 327.878C225 318.756 260 349.594 260 349.594" stroke="black" stroke-width="20"/>
              </svg>
          </div>
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
          <div class ="shapes-container">
              <div class="shapes-selector" :class ="{'selected': toolType == 'shapes'}">
                <svg width="24" height="24" viewBox="0 0 195 202" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="Shapes">
                    <rect id="box" x="10" y="62" width="130" height="130" stroke-width="20"/>
                    <circle id="circle" cx="120" cy="75" r="65" stroke-width="20"/>
                  </g>
                </svg>
              </div>
              <div class="shape-type--container">
                <div class="shape-rectangle" @click= "selectedShape = 'rectangle'; toolType= 'shapes'" :class="{'selected-child': (selectedShape == 'rectangle' && toolType== 'shapes')}">
                    <svg width="18" height="18" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="10" y="10" width="130" height="130" stroke-width="20"/>
                    </svg>
                </div>
                <div class="shape-circle" @click= "selectedShape = 'circle'; toolType= 'shapes'" :class="{'selected-child': (selectedShape == 'circle' && toolType== 'shapes')}">
                    <svg width="18" height="18" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="75" cy="75" r="65" stroke-width="20"/>
                    </svg>
                </div>
              </div>
              
          </div>
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
                    <svg width="20" height="20" viewBox="0 0 371 320" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            toolType: 'pencil',
            selectedShape: this.toolType == 'shapes' ? 'rectangle' : 'none',

            ctx: '',
            canvas: '',
            canvasContainer: '',
            positionX: 0,
            positionY: 0,
            scaledXTransformed: 0,
            scaledYTransformed: 0,
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
            this.canvas.addEventListener('mousemove',this.draw);
    },
    methods: {
        changeColor(color) {
            const { r, g, b, a } = color.rgba
            this.color = `rgba(${r}, ${g}, ${b}, ${a})`
        },
        startDrawing(e) {
            this.painting = true;
            switch(this.toolType){
                case 'shapes':
                    var mousePos = this.getMousePosition(e);
                    this.scaledXTransformed = mousePos[0];
                    this.scaledYTransformed = mousePos[1]; 
                    break;
                case 'pencil':
                    this.draw(e);
                    break;
            }
        },
        finishDrawing(e){
            this.painting = false;
            switch(this.toolType){
                case 'shapes':
                    var mousePos = this.getMousePosition(e);
                    var width =  mousePos[0]- this.scaledXTransformed;
                    var height = mousePos[1]- this.scaledYTransformed;
                    var rectXCoord = this.scaledXTransformed;
                    var rectYCoord =  this.scaledYTransformed;
                    this.ctx.beginPath();
                    if(this.selectedShape == 'rectangle')
                        this.ctx.rect(rectXCoord, rectYCoord, width, height);
                    if(this.selectedShape == 'circle'){
                        var hypotenuseLength = Math.sqrt(Math.pow(width, 2) +Math.pow(height, 2));
                        this.ctx.arc(rectXCoord, rectYCoord, hypotenuseLength, 0, 2 * Math.PI);
                    }
                    this.ctx.stroke();
                    break;
                case 'pencil':
                    break;
            }
            this.ctx.beginPath();
        },
        draw(e){
            if(!this.painting) return;
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 10;
            this.ctx.lineCap = "round";
            var mousePos = this.getMousePosition(e);
            switch(this.toolType){
                case 'shapes':
                    console.log('');
                    break;
                case 'pencil':
                    this.ctx.lineTo(mousePos[0], mousePos[1]);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(mousePos[0], mousePos[1]);
                    break;
            }
        },
        getMousePosition(e){
            this.positionX = (document.body.scrollWidth - this.canvas.getBoundingClientRect().width)/2;
            this.positionY = (document.body.scrollHeight - this.canvas.getBoundingClientRect().height)/2;
            var scaledX = (e.clientX-this.positionX) * this.canvas.width /this.canvas.getBoundingClientRect().width;
            var scaledY =(e.clientY-this.positionY) * this.canvas.height / this.canvas.getBoundingClientRect().height;
            var scaledXTransformed = scaledX+(window.scrollX/this.canvasScale);
            var scaledYTransformed = scaledY+(window.scrollY/this.canvasScale);
            return [scaledXTransformed, scaledYTransformed];
        },
        drawShape(){
            if(!this.painting) return;
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
    width: 99vw;
    margin: 0 auto;

}
.tool-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: space-around;
    align-items: center;
    min-height: 100px;
    top: 28%;
    transform: translate(-50%, -50%);
    border-radius: 24px;
    background: white;
    z-index: 100;
    padding: 6px;
    box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 80%);

}
.pencil-container{
    display: flex;
    border-radius: 50%;
    margin: 15px 0;
    padding: 9px
}
 .color-picker--container{
        position: absolute;
        left: 58px;
        margin-top: -27px;
}
.color-picker{
    cursor: pointer;
    margin: 15px 0;
    .color-icon{
        border-radius: 50%;
        height: 24px;
        width: 24px;
        border: 2px solid $default-icon-color;
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
 .shapes-container{
     display: flex;
     align-self: center;
     cursor: pointer;
     margin: 15px 0;
     .shapes-selector{
        display: flex;
        padding: 9px;
        border-radius: 50%;
     }
     svg{
         stroke: $default-icon-color;
     }
     .shape-type--container{
        display: flex;
        position: absolute;
        visibility: hidden;
        left: 37px;
        margin: -2.5px 7px;
        padding: 5px 15px;
        width: 100px;
        justify-content: space-around;
        z-index: 101;
         div{
            display: flex;
            padding: 10px 10px;
            border-radius: 50%;
            box-shadow: 0px 0px 2px 0px rgb(0 0 0 / 80%);
            background: white;
         }
     }
     &:hover{
         .shape-type--container{
             visibility: visible;
         }
     }
 }
 .zoom{
     display: flex;
     cursor:pointer;
     margin: 15px 0;
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
         margin-top: -5px;
         z-index: 101;
         
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
 .selected{
     background: #8fcde17d;
 }
 .selected-child{
     background: #effbff !important;
 }


</style>