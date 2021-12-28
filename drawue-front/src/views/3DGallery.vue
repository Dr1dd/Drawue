<template>
    <div class="gallery3d" id="3D">
        <div class="crosshair" :class="{'intersects': intersects}"></div>
        <div class="overlay">
            <div class="instructions">
                <div class="unlock-pointer">
                    Click to start
                </div>
                <div class="item">Move: WASD</div>
                <div class="item">Jump: Space</div>
            </div>
        </div>
        <transition name="fade">
            <div class="drawing-info" v-if="intersects">
                <div class="drawing-title">
                    {{selectedDrawingInfo.title}}
                </div>
                <div class="drawing-description">
                    {{selectedDrawingInfo.description}}
                </div>
                <div class="stats">
                    <div class="stats-labels">
                        <span>Author</span>
                        <span>Likes</span>    
                    </div>
                    <div class="stats-wrapper">
                        <div class="drawing-author">
                            {{selectedDrawingInfo.username}}
                        </div>
                        <div class="like-count">
                            {{selectedDrawingInfo.like_count}}
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
import * as THREE from "three";
import {PointerLockControls} from "three/examples/jsm/controls/PointerLockControls"
import axios from 'axios';
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
            mouse: '',
            raycaster: '',
            clock:'',
            controls: '',
            velocity: '',
            direction: '',
            objects: [],
            performance: '',
            timer: 0,
            intersects: false,
            selectedDrawingInfo: '',
            movement:{
                forward: false,
                backward: false,
                left: false,
                right: false,
                canJump: false,
            },

            drawings: [],
            drawingPathArray: [],
            pathArray: [],
        }
    },
    mounted(){
        var scene  = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        var velocity  = new THREE.Vector3();
        var direction = new THREE.Vector3();
        var raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
        var renderer = new THREE.WebGLRenderer( { antialias: true } );
        var controls = new PointerLockControls( camera, document.body );
        
        var canvas = document.getElementById('3D');

        canvas.addEventListener( 'click', function(){
            controls.lock();
        }, false);
        var overlay = document.getElementsByClassName('overlay')[0];
        controls.addEventListener('lock', function(){
            overlay.style.display = 'none';
        });

        controls.addEventListener( 'unlock', function () {
            overlay.style.display = '';
        });
        scene.add( controls.getObject() );
        
        this.scene = scene
        this.camera = camera;
        this.velocity = velocity;
        this.direction = direction;
        this.raycaster = raycaster;
        this.renderer = renderer;
        this.controls = controls

        document.addEventListener( 'keydown', this.keyDown, false );
        document.addEventListener( 'keyup', this.keyUp, false );

        this.loadImages();
        this.animate();

    },
    methods:{
        initialize(){
             var objects = [];
            //Scene
            this.scene.background = new THREE.Color( 0xfff55f );
            this.scene.fog = new THREE.Fog( 0xffffff, 0, 750 );

            //Camera
            this.camera.position.set(0, this.player.height, -5);
            this.camera.lookAt(new THREE.Vector3(0, this.player.height, 0));

            //Light
            const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
            light.position.set( 0.5, 1, 0.75 );
            this.scene.add( light );

             // Room
            var wall_texture = new THREE.TextureLoader().load(require('@/assets/wall.jpg'));
            wall_texture.wrapS = THREE.RepeatWrapping;
            wall_texture.wrapT = THREE.RepeatWrapping;
            wall_texture.repeat.set( 8, 8 );
            var floor_texture = new THREE.TextureLoader().load(require('@/assets/floor.jpg'));
            floor_texture.wrapS = THREE.RepeatWrapping;
            floor_texture.wrapT = THREE.RepeatWrapping;
            floor_texture.repeat.set( 16, 16 );
            var room_array = [];
            room_array.push(new THREE.MeshBasicMaterial( { map: wall_texture, side: THREE.BackSide } ));
            room_array.push(new THREE.MeshBasicMaterial( { map: wall_texture, side: THREE.BackSide } ));
            room_array.push(new THREE.MeshBasicMaterial( { map: wall_texture, side: THREE.BackSide } ));
            room_array.push(new THREE.MeshBasicMaterial( { map: floor_texture, side: THREE.BackSide } ));
            room_array.push(new THREE.MeshBasicMaterial( { map: wall_texture, side: THREE.BackSide } ));
            room_array.push(new THREE.MeshBasicMaterial( { map: wall_texture, side: THREE.BackSide  } ));
            
            var room_x = 50;
            var room_y = 25
            var room_z = 50;
            const room = new THREE.Mesh(
                new THREE.BoxGeometry(room_x, room_y, room_z),
                room_array
            );
            room.position.y = 12.5;
            room.position.z = -24.5;
            this.scene.add(room);

            //Adding drawing objects
            var l = this.pathArray.length;
            for(var i = 0; i < l; i++){
                var mesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(3, 2, 1, 1),
                    this.pathArray[i]                    
                );
                mesh.name = `${i}`;
                if(i < (l/3)) {
                    mesh.rotation.y -= Math.PI/2;
                    mesh.position.set(room_x/2-0.05, 2, (-room_z+5.5)+((room_z-5)/(l/3)*i));
                }
                else if(i >= (l/3) && i < (2*l/3)){
                    mesh.rotation.x -= Math.PI;
                    mesh.rotation.z -= Math.PI;
                    mesh.position.set((room_x/2-4.5)-4.5*(i%(l/3)), 2, 0);
                }
                else{
                    mesh.rotation.y += Math.PI/2;
                    mesh.position.set(-room_x/2+0.05, 2, -3.5-((room_z-5)/(l/3)*(i%(2*l/3))));
                }
                this.scene.add(mesh);
                objects.push(mesh);
            }
            //Skybox

            var skyboxImage = "bluecloud";
            const materialArray = this.createMaterialArray(skyboxImage);

            var skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
            var skybox = new THREE.Mesh(skyboxGeo, materialArray);
            this.scene.add(skybox);

            //Renderer
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            var Three = document.getElementById('3D');
            Three.appendChild( this.renderer.domElement );
            this.renderer.render( this.scene, this.camera );

            window.addEventListener( 'resize', this.onWindowResize, false );

            var time = performance.now();
            this.performance = time;
            this.objects = [...objects];


        },
        keyDown(event){
            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    this.movement.forward = true;
                    break;

                case 37: // left
                case 65: // a
                    this.movement.left = true;
                    break;

                case 40: // down
                case 83: // s
                    this.movement.backward = true;
                    break;

                case 39: // right
                case 68: // d
                    this.movement.right = true;
                    break;

                case 32: // space
                    if ( this.movement.canJump === true ) this.velocity.y += 350;
                    this.movement.canJump = false;
                    break;

            }
        },
        keyUp(event){
            switch ( event.keyCode ) {

                case 38: // up
                case 87: // w
                    this.movement.forward = false;
                    break;

                case 37: // left
                case 65: // a
                    this.movement.left = false;
                    break;

                case 40: // down
                case 83: // s
                    this.movement.backward = false;
                    break;

                case 39: // right
                case 68: // d
                    this.movement.right = false;
                    break;

            }
        },
        createPathStrings: function(filename) {
            const basePath = "assets/skybox/";
            const baseFilename = basePath + filename;
            const fileType = ".jpg";
            const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
            return sides.map(side => {
                return baseFilename + "_" + side + fileType;
            });
        },
        createMaterialArray: function(filename) {
            const skyboxImagepaths = this.createPathStrings(filename);
            return skyboxImagepaths.map(image => {
                image = require(`@/${image}`)
                let texture = new THREE.TextureLoader().load(image);
                return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
            });
        },
        onWindowResize() {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( window.innerWidth, window.innerHeight );

        },
        loadImages(){
            var skip = 0;
            var sort = 'Likes';
             axios.post('/api/posts/drawings', {skip, sort})
             .then((res)=>{
                 this.drawings = [...res.data.drawingPosts];
                 var loader = new THREE.TextureLoader();
                 loader.crossOrigin = true;
                 this.drawings.forEach(drawing =>{
                     this.drawingPathArray.push(drawing.drawing_path);
                     this.pathArray.push(new THREE.MeshBasicMaterial({map: loader.load( '/api/posts/drawing/pic/'+drawing.drawing_path) }))
                 })
                this.initialize();
             })
             .catch((err)=>{
                 console.log(err);
             })

            
        },
        animate(){
          requestAnimationFrame( this.animate );

            const time = performance.now();

            if ( this.controls.isLocked === true ) {

                this.raycaster.ray.origin.copy( this.controls.getObject().position );
                this.raycaster.ray.origin.y -= this.player.height-0.1;
                const intersections = this.raycaster.intersectObjects( this.objects );

                this.checkIfHover();
                const onObject = intersections.length > 0;
                const delta = ( time - this.performance ) / 1000;

                this.velocity.x -= this.velocity.x * 100.0 * delta;
                this.velocity.z -= this.velocity.z * 100.0 * delta;
                this.velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

                this.direction.z = Number( this.movement.forward ) - Number( this.movement.backward );
                this.direction.x = Number( this.movement.right ) - Number( this.movement.left );
                this.direction.normalize(); // this ensures consistent movements in all directions

                if ( this.movement.forward || this.movement.backward ) this.velocity.z -= this.direction.z * 1000.0 * delta;
                if ( this.movement.left || this.movement.right ) this.velocity.x -= this.direction.x * 1000.0 * delta;
                if ( onObject === true ) {

                    this.velocity.y = Math.max( 0, this.velocity.y );
                    this.movement.canJump = true;

                }
                this.controls.moveRight( - this.velocity.x * delta );
                this.controls.moveForward( - this.velocity.z * delta );

                this.controls.getObject().position.y += ( this.velocity.y * delta/20 ); // new behavior

                if ( this.controls.getObject().position.y < this.player.height ) {

                    this.velocity.y = 0;
                    this.controls.getObject().position.y = this.player.height;

                    this.movement.canJump = true;

                }
            

            }

            this.performance = time;

            this.renderer.render( this.scene, this.camera );
        },
        checkIfHover(){
            var rayCaster = new THREE.Raycaster(this.controls.getObject().position, this.controls.getDirection(new THREE.Vector3(0, 0, 0)));
            const int = rayCaster.intersectObjects( this.objects );
            var selectedDrawing = ''
            if(int.length>0 && selectedDrawing == '') { 
                this.intersects = true;
                selectedDrawing = this.drawings[parseInt(int[0].object.name)];

            }
            else {
                this.intersects = false;
            }
            this.selectedDrawingInfo = selectedDrawing;
        }
    },
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
.gallery3d{
    display: flex;
    position: relative;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.crosshair{
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    border: 1px solid rgb(148, 148, 148);
    background: white;
    transition: all 0.1s;
}
.overlay{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(55deg, rgba(122,163,201,0.6091387238489145) 41%, rgba(161,187,212,0.4186625333727241) 68%);
    z-index: 2;
}
.instructions{
    display: flex;
    flex-direction: column;
    padding: 15px;
    cursor: pointer;
    .unlock-pointer{
        font-size: 34px;
        font-weight: 700;
        color: white;
        margin: 15px;
    }
    .item{
        font-size: 20px;
        color: #f4f4f4;
    }
}
.locked{
    display: none;
}
.intersects{
    height: 8px;
    width: 8px;
}
.drawing-info{
    position: absolute;
    background: white;
    padding: 15px;
    right: 15px;
    top: 4rem;
    min-width: 200px;
    max-width: 200px;
    max-height: 300px;
    border: 2px solid #859aac;
    border-radius: 13px;
    color: #86a1b8;
    .drawing-title{
        font-weight: 700;
        border-bottom: 2px solid;
        padding-bottom: 5px;
    }
    .drawing-description{
        padding: 10px 0;
        word-break: break-all;
    }

}
.stats{
    display: flex;
    flex-direction: column;
    .stats-labels{
        display:flex;
        justify-content: space-between;
        padding: 3px 0;
    }
    span{
        text-align: left;
        font-weight: 700;
    }
    .stats-wrapper{
        display: inline-flex;
        justify-content: space-between;
        padding: 3px 5px;
        background: #eef7ff;
        border-left: 5px solid #bad7f1;
    }

}

</style>