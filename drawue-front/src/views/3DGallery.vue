<template>
    <div id="3D">
    </div>

</template>

<script>
import * as THREE from "three";
export default {
    name: 'Gallery3D',
    data(){
        return{
            player:{
                height: 1.8,
                speed: 0.7,
                turnSpeed: Math.PI *0.02
            },
            scene: '',
            camera: '',
            renderer: '',
            geometry: '',
            material: '',
            cube: '',
            meshFloor: '',
        }
    },
    mounted(){
        this.galleryObj = document.getElementById('3DGallery');
         this.initialize();
         window.addEventListener('keydown', (e)=>{
             switch(e.key){
                case 'w':
                     this.camera.position.x -= Math.sin(this.camera.rotation.y) * this.player.speed;
                     this.camera.position.z -= -Math.cos(this.camera.rotation.y) * this.player.speed;
                     break;
                case 's':
                     this.camera.position.x += Math.sin(this.camera.rotation.y) * this.player.speed;
                     this.camera.position.z += -Math.cos(this.camera.rotation.y) * this.player.speed; 
                     break;
                case 'a':
                     this.camera.position.x += Math.sin(this.camera.rotation.y + Math.PI / 2) * this.player.speed;
                     this.camera.position.z += -Math.cos(this.camera.rotation.y + Math.PI / 2) * this.player.speed;
                     break;
                case 'd':
                     this.camera.position.x += Math.sin(this.camera.rotation.y - Math.PI / 2) * this.player.speed;
                     this.camera.position.z += -Math.cos(this.camera.rotation.y - Math.PI / 2) * this.player.speed;
                     break;
             }
         })
    },
    methods:{
        initialize(){
            const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

			const renderer = new THREE.WebGLRenderer();
            renderer.setSize( window.innerWidth, window.innerHeight );
            var Three = document.getElementById('3D');
			Three.appendChild( renderer.domElement );

			const geometry = new THREE.BoxGeometry();
			const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
            
            const meshFloor = new THREE.Mesh(
                new THREE.PlaneGeometry(10, 10, 15, 15),
                new THREE.MeshBasicMaterial({color:0xffffff, wireframe:false})
            );
            meshFloor.rotation.x -= Math.PI /2;
            scene.add( meshFloor );
            camera.position.set(0, this.player.height, -5);
            camera.lookAt(new THREE.Vector3(0, this.player.height, 0));
            this.scene = scene;
            this.camera = camera;
            this.renderer = renderer;
            this.geometry = geometry;
            this.material = material;
            this.cube = cube;
            this.meshFloor = meshFloor;
            this.animate();

        },
        animate(){
            requestAnimationFrame( this.animate );

            this.cube.rotation.x += 0.01;
            this.cube.rotation.y += 0.01;

            this.renderer.render( this.scene, this.camera );
        },
        galleryStart(){
            this.movingCam = true;
            console.log(this.camera.x, this.camera.y);
            this.galleryObj.addEventListener('mouseup',this.galleryFinish);
            this.galleryObj.addEventListener('mousemove',function(event){
                if(!this.movingCam) return;
                var camera = this.camera;
                var res = this.cameraMove(event, camera);
                this.camera = res;
                console.log(this.camera);
                }.bind(this), false);
        },
        galleryFinish(){
            this.movingCam = false;
            this.galleryObj.removeEventListener('mousemove',this.cameraMove);
            this.X = this.camera.x;
            this.Y = this.camera.y;
        },
        cameraMove: function(e, camera){
            var rect = e.target.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            camera.x = (parseInt(camera.x) + x/rect.width).toString();
            camera.y = (parseInt(camera.y) + y/rect.height).toString();
            console.log(x/rect.width);
            console.log("Left? : " + camera.x);
            return camera;
        }
    }
}
</script>

<style lang="scss" scoped>
.getting-started {
  width: 400px;
  height: 247px;
}
.scene{
    height: 100vh;
    width: 100vw;
}
</style>