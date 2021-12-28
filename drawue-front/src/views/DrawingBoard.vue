<template>
  <div id ="DrawingBoard">
      <div class ="tool-bar">
          <div class="pencil-container" @click ="toolType = 'pencil'" :class ="{'selected': toolType == 'pencil'}">
              <svg width="24" height="24" viewBox="0 0 268 367" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="152.123" y="13.9879" width="52.1453" height="250.218" transform="rotate(25.8416 152.123 13.9879)" stroke-width="20"/>
                <path d="M70.3613 277.384L44.1092 296.597L42.8219 264.091L70.3613 277.384Z" stroke-width="25"/>
                <path d="M30.1847 327.878C30.1847 327.878 21.1367 358.188 82.5684 349.594C144 341 139 337 182 327.878C225 318.756 260 349.594 260 349.594" stroke-width="20"/>
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
          <div class="pencil-size--container">
              <svg width="24" height="24" viewBox="0 0 123 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="25" r="10"/>
                <circle cx="46.5" cy="25.5" r="17.5"/>
                <circle cx="98" cy="25" r="25"/>
              </svg>
               <div class="pencil-stroke--list">
                   <div class="pencil-strokeSize"
                    v-for="strokeWidth in strokeArray" 
                    :key="strokeWidth" 
                    @click="selectedStrokeSize = strokeWidth" 
                    :class="{'selected-child': selectedStrokeSize==strokeWidth}"
                    >
                       <span :style="{height: strokeWidth+'px', width: strokeWidth+'px'}"></span>
                   </div>
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
                <div class="shape-triangle" @click= "selectedShape = 'triangle'; toolType= 'shapes'" :class="{'selected-child': (selectedShape == 'triangle' && toolType== 'shapes')}">
                    <svg width="18" height="18" viewBox="0 0 130 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.3686 102.5L65 20L112.631 102.5H17.3686Z"  stroke-width="15"/>
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
                    <path class="Rectangle_1" d="M225.443 184L353.97 273.592C363.031 279.908 365.257 292.375 358.94 301.436L357.437 303.593C351.12 312.654 338.654 314.88 329.593 308.563L201.066 218.971L225.443 184Z"/>
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
          <div class="resize-container">
              <div class="resize-icon">
                  <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                    <g><g><path d="M492,0H344.212c-11.046,0-20,8.954-20,20s8.954,20,20,20h99.503L283.394,200.322c-7.811,7.811-7.811,20.474,0,28.284
                                c7.81,7.81,20.473,7.811,28.284,0L472,68.284v99.503c0,11.046,8.954,20,20,20c11.046,0,20-8.954,20-20V20
                                C512,9.115,503.154,0,492,0z"/></g></g>
                    <g><g><path d="M228.606,283.394c-7.811-7.81-20.474-7.811-28.284,0L40,443.716v-99.503c0-11.046-8.954-20-20-20s-20,8.954-20,20V492
                                c0,10.866,8.853,20,20,20h147.788c11.046,0,20-8.954,20-20c0-11.046-8.954-20-20-20H68.284l160.322-160.322
                                C236.417,303.867,236.417,291.204,228.606,283.394z"/></g></g>
                  </svg>
              </div>
              <div class="resolution-container">
                  <div v-for="(resolution, index) in resolutionArray" :key="index" @click ="resizeCanvas(resolution)">
                      {{resolution.split('x')[0]}} <br/> x <br/> {{resolution.split('x')[1]}}
                  </div>
              </div>
          </div>
          <div class="download-btn--container" @click ="saveCanvas">
              <div class="download-btn">
                  <svg  viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="Solid"><path d="m239.029 384.97a24 24 0 0 0 33.942 0l90.509-90.509a24 24 0 0 0 0-33.941 24 24 0 0 0 -33.941 0l-49.539 49.539v-262.059a24 24 0 0 0 -48 0v262.059l-49.539-49.539a24 24 0 0 0 -33.941 0 24 24 0 0 0 0 33.941z"/><path d="m464 232a24 24 0 0 0 -24 24v184h-368v-184a24 24 0 0 0 -48 0v192a40 40 0 0 0 40 40h384a40 40 0 0 0 40-40v-192a24 24 0 0 0 -24-24z"/></g></svg>
              </div>
          </div>
          <div class="clear-container" @click = "clearCanvasModal = true">
              <div class="clear-canvas">
                <svg width="24" height="24" viewBox="0 0 364 454" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M80.6599 116.5H283.488C306.591 116.5 324.763 136.242 322.852 159.267L302.978 398.767C301.279 419.245 284.162 435 263.614 435H99.1867C78.553 435 61.3957 419.119 59.8043 398.546L41.2776 159.046C39.5025 136.099 57.644 116.5 80.6599 116.5Z" stroke-width="37"/>
                    <path d="M333 66H33C23.0589 66 15 74.0589 15 84V110C15 111.105 15.8954 112 17 112H347C348.105 112 349 111.105 349 110V82C349 73.1634 341.837 66 333 66Z" stroke-width="29"/>
                    <path d="M134 24V64H231V24C231 19.0294 226.971 15 222 15H143C138.029 15 134 19.0294 134 24Z" stroke-width="29"/>
                    <rect x="108.5" y="166.5" width="17" height="207" rx="8.5" stroke-width="17"/>
                    <rect x="173.5" y="166.5" width="17" height="207" rx="8.5" stroke-width="17"/>
                    <rect x="238.5" y="166.5" width="17" height="207" rx="8.5" stroke-width="17"/>
                </svg>

              </div>
          </div>
      </div>
      <div class="canvas-container">
         <canvas id="canvas" @mouseout="finishDrawing"></canvas> 
      </div>
        <SaveModal :drawingImage="imageDataURL" :isOpen="saveModal" @closingSaveModal="saveModal=false"/>
        <InfoModal v-if="clearCanvasModal" @close ="clearCanvasModal = false">
            <div class="content-container">
                <p> Do you really want to clear the canvas? </p> 
                <div class="btn" @click ="clearCanvas" >Confirm</div>
            </div>
        </InfoModal>
  </div>
</template>

<script>
import colorPicker from '@caohenghu/vue-colorpicker'
import SaveModal from '../components/SaveModal'
import InfoModal from '../components/InfoModal'
export default {
    name: 'DrawingBoard',
    components:{
        colorPicker,
        SaveModal,
        InfoModal
    },
    data() {
        return {
            painting: false,

            color: '#59c7f9',
            showColorPicker: false,
            toolType: 'pencil',
            selectedShape: this.toolType == 'shapes' ? 'rectangle' : 'none',
            strokeArray: [5, 10, 15, 25, 30],
            resolutionArray: ['1080x720', '1280x760', '1440x900', '1920x1080'],
            selectedResolution: '',
            ctx: '',
            canvas: '',
            savedCanvasData: '',
            canvasContainer: '',
            points: [],
            positionX: 0,
            positionY: 0,
            scaledXTransformed: 0,
            scaledYTransformed: 0,
            canvasScale: 1,
            marginVertical: 0,
            saveModal: false,
            selectedStrokeSize: 5,

            imageDataURL: '',
            clearCanvasModal: false,
        }
    },
    beforeDestroy(){
        window.removeEventListener('resize', this.onResize);
    },
    watch: {
        '$store.state.canvasBg': function() {
            var ctx = document.querySelector("#canvas").getContext('2d');
            ctx.fillStyle = this.$store.state.canvasBg;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },
    mounted(){
            this.canvasContainer = document.getElementsByClassName('canvas-container');
            this.canvas = document.querySelector("#canvas");
            this.ctx = this.canvas.getContext('2d');
            
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize);
            })
            // Canvas size and localstorage loading
            var resolutionStorage = localStorage.getItem('resolution');

            this.selectedResolution = resolutionStorage != undefined ? resolutionStorage.split(',').map( Number ) : [1080, 720]; 
            
            this.canvas.height = this.selectedResolution[1];
            this.canvas.width = this.selectedResolution[0];
            localStorage.setItem('resolution', [this.canvas.width, this.canvas.height]);
            this.onResize();
            this.canvas.style.margin = '7px 0px 0';

            var ctx = document.querySelector("#canvas").getContext('2d');
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            if(localStorage.getItem('imgCanvas') !== null){
                var img=new Image();
                img.onload=function(){
                    ctx.drawImage(img,0,0);
                }
                img.src=localStorage.getItem("imgCanvas");
            }
            
            //EventListeners
            
            this.canvas.addEventListener('mousedown', this.startDrawing);

    },
    methods: {
        changeColor(color) {
            const { r, g, b, a } = color.rgba
            this.color = `rgba(${r}, ${g}, ${b}, ${a})`
        },
        startDrawing(e) {
            this.painting = true;
            this.savedCanvasData = this.ctx.getImageData(0,0, this.canvas.clientWidth, this.canvas.clientHeight);
            var mousePos = this.getMousePosition(e);
            this.scaledXTransformed = mousePos[0];
            this.scaledYTransformed = mousePos[1];
            this.draw(e);
            this.canvas.addEventListener('mouseup', this.finishDrawing);
            this.canvas.addEventListener('mousemove',this.draw);
        },
        draw(e){
            if(!this.painting) return;
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.selectedStrokeSize;
            this.ctx.lineJoin = 'round';
            this.ctx.lineCap = "round";
            var mousePos = this.getMousePosition(e);
            var temp = this.ctx;
            this.points.push(mousePos);
            switch(this.toolType){
                case 'shapes':
                    this.drawShape(e);
                    break;
                case 'pencil':
                    temp.lineTo(mousePos[0], mousePos[1]);
                    temp.stroke();
                    temp.beginPath();
                    temp.moveTo(mousePos[0], mousePos[1]);
                    break;
            }
        },
        drawShape(e){
            if(!this.painting) return;
            if(this.toolType == 'shapes'){
                this.ctx.putImageData(this.savedCanvasData, 0, 0);
                var mousePos = this.getMousePosition(e);
                var width =  mousePos[0]- this.scaledXTransformed;
                var height = mousePos[1]- this.scaledYTransformed;
                var rectXCoord = this.scaledXTransformed;
                var rectYCoord =  this.scaledYTransformed;
               
                this.ctx.lineWidth = this.selectedStrokeSize;
                this.ctx.beginPath();
                switch(this.selectedShape){
                case 'rectangle':
                    this.ctx.rect(rectXCoord, rectYCoord, width, height);
                    break;
                case 'circle':
                    this.drawShapeCircle(rectXCoord, rectYCoord, width, height);
                    break;
                case 'triangle':
                    this.drawShapeTriangle(rectXCoord, rectYCoord, width, height);
                    break;
                }
                this.ctx.stroke();
            }
        },
        drawShapeCircle(rectXCoord, rectYCoord, width, height){
            var hypotenuseLength = Math.sqrt(Math.pow(width, 2) +Math.pow(height, 2));
            this.ctx.arc(rectXCoord, rectYCoord, hypotenuseLength, 0, 2 * Math.PI);
        },
        drawShapeTriangle(rectXCoord, rectYCoord, width, height){
            this.ctx.moveTo(rectXCoord, rectYCoord+height);
            this.ctx.lineTo(rectXCoord+(width/2), rectYCoord);
            this.ctx.moveTo(rectXCoord+(width/2), rectYCoord);
            this.ctx.lineTo(rectXCoord+width, rectYCoord+height);
            this.ctx.moveTo(rectXCoord+width, rectYCoord+height);
            this.ctx.lineTo(rectXCoord, rectYCoord+height);
        },
        finishDrawing(){
            this.painting = false;
            if(this.toolType == "pencil" && this.points.length > 1){
                this.ctx.putImageData(this.savedCanvasData, 0, 0);
                var tmp = this.ctx;
                tmp.beginPath();
                tmp.moveTo(this.points[0][0], this.points[0][1]);
                let i;
                for (i = 1; i < this.points.length - 2; i++) {
                    var c = (this.points[i][0] + this.points[i + 1][0]) / 2;
                    var d = (this.points[i][1] + this.points[i + 1][1]) / 2;
                
                    tmp.quadraticCurveTo(this.points[i][0], this.points[i][1], c, d);
                }
                tmp.quadraticCurveTo(
                    this.points[i][0],
                    this.points[i][1],
                    this.points[i + 1][0],
                    this.points[i + 1][1]
                );
                tmp.stroke();
                this.savedCanvasData = this.ctx.getImageData(0,0, this.canvas.clientWidth, this.canvas.clientHeight);
            }
            this.ctx.beginPath();
            this.localStorageCanvas();
            this.points = [];
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
        zoomIn(){
            // max 300% zoom
            const DrawingBoard = document.getElementById("DrawingBoard");
            if(parseFloat(this.canvasScale.toFixed(2)) <= 2.9){
                var Page = document.getElementById('canvas');
                this.canvasScale = parseFloat(this.canvasScale.toFixed(2)) + 0.1;
                Page.style.transform = 'scale('+this.canvasScale+')';
                if(parseFloat(this.canvasScale.toFixed(2)) >1){
                    DrawingBoard.style.width = ((this.canvas.getBoundingClientRect().width+134) < window.innerWidth ? window.innerWidth : (this.canvas.getBoundingClientRect().width+134)) +'px';
                    DrawingBoard.style.height = ((this.canvas.getBoundingClientRect().height+134) < window.innerHeight  ? window.innerHeight  : (this.canvas.getBoundingClientRect().height+134)) +'px';
                }
                
            }
        },
        zoomOut(){
            // min zoom-out: 100% -> 10%
            const DrawingBoard = document.getElementById("DrawingBoard");
            if(parseFloat(this.canvasScale.toFixed(2)) > 0.1){
                var Page = document.getElementById('canvas');
                this.canvasScale = parseFloat(this.canvasScale.toFixed(2)) - 0.1;
                Page.style.transform = 'scale('+this.canvasScale+')';
                if(parseFloat(this.canvasScale.toFixed(2)) >1){
                    DrawingBoard.style.width = ((this.canvas.getBoundingClientRect().width+134) < window.innerWidth ? window.innerWidth : (this.canvas.getBoundingClientRect().width+134)) +'px';
                    DrawingBoard.style.height = ((this.canvas.getBoundingClientRect().height+134) < window.innerHeight  ? window.innerHeight  : (this.canvas.getBoundingClientRect().height+134)) +'px';
                }
            }
        },
        localStorageCanvas(){
            localStorage.setItem("imgCanvas",this.canvas.toDataURL());
        },
        clearCanvas(){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            localStorage.setItem("imgCanvas",this.canvas.toDataURL());
            this.clearCanvasModal = false;
        },
        saveCanvas(){
            this.saveModal = true;
            var img = this.canvas.toDataURL("image/png");
            this.imageDataURL = img;
        },
        resizeCanvas(res){
            var Page = document.getElementById('canvas');
            var canvasImage = this.canvas.toDataURL();
            localStorage.setItem("imgCanvas",this.canvas.toDataURL());
            //changing canvas size
            this.selectedResolution = res;
            var resolution = this.selectedResolution.split('x');
            this.canvas.width = resolution[0];
            this.canvas.height = resolution[1];
            this.canvasScale = 1;
            Page.style.transform = 'scale('+this.canvasScale+')';
            //loading old canvas image
            var ctx = document.querySelector("#canvas").getContext('2d');
            var img=new Image();
            img.onload=function(){
                ctx.drawImage(img,0,0);
            }
            img.src=canvasImage;
            
            this.onResize();
            localStorage.setItem('resolution', [resolution[0], resolution[1]]);

        },
        onResize() {
            if(this.canvasScale >=1){
                const DrawingBoard = document.getElementById("DrawingBoard");
                const toolBar = document.getElementsByClassName('tool-bar');
                DrawingBoard.style.width = ((this.canvas.getBoundingClientRect().width+134) < window.innerWidth  ? window.innerWidth-15  : ((this.canvas.getBoundingClientRect().width+134)*this.canvasScale)) +'px';
                DrawingBoard.style.height = ((this.canvas.getBoundingClientRect().height+134) < window.innerHeight  ? window.innerHeight-15  : ((this.canvas.getBoundingClientRect().height+134)*this.canvasScale)) +'px';
                var toolBarPosLeft = (DrawingBoard.style.width - this.canvas.getBoundingClientRect().width) <=30 ? 53 : ((DrawingBoard.offsetWidth - this.canvas.getBoundingClientRect().width)/2);
                toolBar[0].setAttribute("style", "left:"+(toolBarPosLeft-15)+"px");
            }
        }
    },
}
</script>

<style lang="scss">
$default-icon-color: #2c3e50;
@use '../sass/components/toolbar';
#DrawingBoard{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;

}
.tool-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: space-around;
    align-items: center;
    min-height: 100px;
    top: 20rem;
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
    padding: 9px;
    cursor: pointer;
    svg{
        stroke: $default-icon-color;
    }
}
 .color-picker--container{
    position: absolute;
    left: 62px;
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
     box-shadow: 0px 0px 4px -2px #000000;
     
 }
 .pencil-size--container{
     margin: 15px 0;
     cursor: pointer;
     svg{
         fill: $default-icon-color;
     }
     .pencil-stroke--list{
        @include toolbar.tool-container;
        padding: 5px 15px 5px 23px;
         margin: -39px -1px;
         div{
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 38px;
            height: 38px;
            z-index: 101;
            padding: 0;
            &:hover{
               background: #effbff; 
            }
            span{
                display: flex;
                height: 5px;
                width: 5px;
                background: $default-icon-color;
                border-radius: 50%;
            }
         }
     }
     &:hover{
          .pencil-stroke--list{
             visibility: visible; 
          }
     }
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
        @include toolbar.tool-container;
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
         path{
             fill: $default-icon-color;
         }

     }
     .zoom-out{
         @include toolbar.tool-container;
         padding: 5px 15px 5px 23px;
         margin: -12.5px -1px;
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
 .clear-container{
     display: flex;
     cursor:pointer;
     margin: 15px 0;
     transition: all 0.25s;
     svg{
         stroke: $default-icon-color;
     }
 }
.download-btn--container{
     display: flex;
     cursor:pointer;
     margin: 15px 0;
     transition: all 0.25s;
     svg{
         width: 24px;
         height: 24px;
         fill: $default-icon-color;
     }
 }
 .resize-container{
     display: flex;
     cursor:pointer;
     margin: 15px 0;
     transition: all 0.25s;
     svg{
         width: 24px;
         height: 24px;
         fill: $default-icon-color;
     }
     .resolution-container{
        @include toolbar.tool-container;
        margin: -13.5px 0px;
        padding: 5px 15px 5px 22px;
        div{
            padding: 6.5px 11px;
            color: #2c3e50;
            font-size: 6px;
            font-weight: 900;
        }
     }
    &:hover{
         .resolution-container{
             visibility: visible;
         }
    }
 }
 .selected{
    background: #f0f8ff;
    box-shadow: inset 0px 0px 2px 0px #b4b4b4;
 }
 .selected-child{
     background: #e6f3ff !important;
 }
.content-container{
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    .btn{
        width: fit-content;
    }

}

</style>