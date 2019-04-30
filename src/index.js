var THREE = require('three');
//import * as THREE from 'three';
//window.THREE = THREE;
// import 'three/examples/js/controls/OrbitControls';
// THREE.OrbitControls = require('three-orbitcontrols')(THREE);
var OrbitControls = require('three-orbit-controls')(THREE)

// const OrbitControls = require('three-orbitcontrols')

var parent, controls, scene, camera, renderer;
var cubeList = [], time = 0;
function animate () {
  // タブが日アクティヴの場合はフレームレートを落としてくれる機能をもつ、タイマー 
  requestAnimationFrame( animate );
  render();
}

function render(){
  time ++;
  for(var i = 0; i < cubeList.length; i++){
    var cubes = cubeList[i];
    var y = 1300;
    y -= i * 20 + time * 5
    if(y < 0){
      y = 0;
    }
    cubes.position.set(0, y , 0);
  }

  //if(time > 5 * 60){
  //  parent.rotation.set(0, time * Math.PI / 200, 0);
  //} else {
    parent.rotation.set(0, time * Math.PI / 600, 0);
  //}
  renderer.render(scene, camera);
}

function init(){
  var SCREEN_HEIGHT = window.innerHeight;
  var SCREEN_WIDTH = window.innerWidth;
      
  var container = document.querySelector('#container' );
	camera = new THREE.PerspectiveCamera( 20, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 50000 );
	camera.position.set( 100, 500, 1000 );

  scene = new THREE.Scene();
  console.log(scene.position)
	camera.lookAt( scene.position );
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	renderer.autoClear = false;
	renderer.sortObjects = false;
  container.append( renderer.domElement );
  
  const light = new THREE.AmbientLight(0xFFFFFF, 1.0);
  scene.add(light);
  //
  
  //controls = new OrbitControls(camera, renderer.domElement)
  controls = new OrbitControls(camera, renderer.domElement)


	parent = new THREE.Object3D();
	scene.add( parent );
  
  var imageSrc = './images/reiwa.png';
  getPixelImage(imageSrc);
}

function getPixelImage(url) {
  var canvas = document.createElement('canvas');   
  var context = canvas.getContext('2d');
  var image = new Image();
  image.onload = () => {
    var width = image.width;
    var height = image.height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(image, 0, 0, width, height);
    console.log(image.width);
    console.log(image.height);

  
    var pixels = context.getImageData(0, 0, width, height).data;
    var channels = 4;
    cubeList = [];
    for (var y=0; y<height; y+=80){
      var cubes = new THREE.Object3D();
      cubeList.push(cubes);
      parent.add(cubes);
      for(var x=0; x<width; x+=80) {
        var index = (x + y*width) * channels;
        var pixel = [pixels[index], pixels[index+1], pixels[index+2], pixels[index+3]];
        var cube = createBox(pixel, (x - width / 2)*0.1, - (y - height/2) * 0.1);
        cubes.add(cube);
      }
    }
  }
  image.src = url;
}

function createBox(pixel, x = 0, y = 0, z = 0){
  var color = (pixel[0] * 0x10000 + pixel[1] * 0x100 + pixel[2]);
  var color = 0xffffff;
  if (pixel[3] == 0){
    color = 0;
  }
  var geometry = new THREE.BoxGeometry( 5, 5, 5 );
  var material = new THREE.MeshBasicMaterial( {color: color} );
  var cube = new THREE.Mesh( geometry, material );
  cube.position.set(x, y, z);
  return cube;
}


init();
animate();
