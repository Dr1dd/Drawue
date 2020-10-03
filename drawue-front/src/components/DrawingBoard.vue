<template>
  <div>
      <div class ="tool-bar">
          <div class ="color-picker" @click = 'showColorPicker = true'>
              <div>
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
            positionX: 0,
            positionY: 0,
        }
    },
    mounted(){
            const canvasContainer = document.getElementsByClassName('canvas-container');
            const toolBar = document.getElementsByClassName('tool-bar');
            this.canvas = document.querySelector("#canvas");
            this.ctx = this.canvas.getContext('2d');
            
            // window resize
            this.canvas.height = 720;
            this.canvas.width = 1080;

            const canvasWidth = (canvasContainer[0].offsetWidth - this.canvas.offsetWidth)/2;
            const canvasHeight = (canvasContainer[0].offsetHeight - this.canvas.offsetHeight)/2;
            
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
             this.ctx.strokeStyle = this.color;
             this.ctx.lineWidth = 10;
             this.ctx.lineCap = "round";
             this.ctx.lineTo(e.clientX-this.positionX, e.clientY-this.positionY);
             this.ctx.stroke();
             this.ctx.beginPath();
             this.ctx.moveTo(e.clientX-this.positionX, e.clientY-this.positionY)
        }
    },
}
</script>

<style lang="scss">
.tool-bar{
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: space-around;
    background: #a5e2ff;
    top: 28%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    .color-picker{
        height: 15px;
        width: 15px;
    }

}
 #canvas{
     cursor:crosshair;
     background: white;
 }
</style>