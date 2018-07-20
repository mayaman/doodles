// var scene = new THREE.Scene();
//
// // Set background color
// scene.background = new THREE.Color(0xffffff);
//
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// camera.position.set(0, 0, 500);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );
//

//
// var spline_points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 1, 0) ];
//
// spline = new THREE.CatmullRomCurve3(spline_points
// );
// this.spline.curveType = 'catmullrom';
// var geometry = new THREE.TubeBufferGeometry( this.spline, 1, 200, 10, false );
// var material = new THREE.LineBasicMaterial( { color : 0x000000, linecap: 'round', //ignored by WebGLRenderer
// linejoin:  'round' //ignored by WebGLRenderer
// } );
//
// mull = new THREE.Mesh( geometry, material );
// console.log('hello???');
// if (mull) {
//   scene.add( mull );
// }
//
//
// camera.position.z = 5;
//
// var animate = function () {
//   requestAnimationFrame( animate );
//
//   spline = new THREE.CatmullRomCurve3(spline.points);
//   geometry = new THREE.TubeBufferGeometry( spline, 1, 200, 10, false );
//   mull = new THREE.Mesh( geometry, material );
//   scene.add(mull);
//   renderer.render( scene, camera );
// };
//
// animate();
//
var drawing = false;
document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  console.log('key: ' + keyName);
  if (keyName == ' ') {
    drawing = !drawing;
  }
  console.log('drawing: ' + drawing);
});
//
// document.onmousedown = function onDocumentMouseDown( event ) {
//   event.preventDefault();
//   console.log('mouse down');
//   if (drawing) {
//     var mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
//     var mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;
//     spline.points.push(new THREE.Vector3(event.clientX, event.clientY, 0));
//   }
// }


// three.js animataed line using BufferGeometry

var renderer, scene, camera;

var line;
var MAX_POINTS = 500;
var drawCount;
var splineArray= [];
init();
animate();

function init() {

  // renderer
  renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // scene
  scene = new THREE.Scene();

  // camera
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, 0, 100 );

  // Controls
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.9;
  controls.zoomSpeed = 0.5;
  controls.rotateSpeed = 0.5;
  controls.enabled = false;

  // geometry
  var geometry = new THREE.BufferGeometry();

  // attributes
  var positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
  geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );

  // drawcalls
  drawCount = 2; // draw the first 2 points, only
  geometry.setDrawRange( 0, drawCount );

  // material
  var material = new THREE.LineBasicMaterial( { color: 0xff00ff, linewidth: 2000 } );

  // line
  line = new THREE.Line( geometry,  material );
  scene.add( line );

  // update positions
  updatePositions();

  document.addEventListener('mousedown', onMouseDown, false);

}

// update positions
function updatePositions() {

  var positions = line.geometry.attributes.position.array;

  var index = 0;

  for ( var i = 0; i < splineArray.length;  i ++ ) {

    positions[ index ++ ] = splineArray[i].x;
    positions[ index ++ ] = splineArray[i].y;
    positions[ index ++ ] = splineArray[i].z;
  }
}

// render
function render() {
  renderer.render( scene, camera );
}

function onMouseMove(evt) {
  if(renderer && drawing) {

    var x = ( event.clientX / window.innerWidth ) * 2 - 1;
    var y =  - ( event.clientY / window.innerHeight ) * 2 + 1;
    var vNow = new THREE.Vector3(x, y, 0);

    vNow.unproject(camera);
    splineArray.push(vNow);
  }
}
function onMouseUp(evt) {
  if (drawing) {
    document.removeEventListener("mousemove",onMouseMove,false);
  }
}

function onMouseDown(evt) {

  if(evt.which == 3) return;

  if (drawing) {
    var x = ( event.clientX / window.innerWidth ) * 2 - 1;
    var y =  - ( event.clientY / window.innerHeight ) * 2 + 1;

    // do not register if right mouse button is pressed.

    var vNow = new THREE.Vector3(x, y, 0);
    vNow.unproject(camera);
    console.log(vNow.x + " " + vNow.y+  " " + vNow.z);
    splineArray.push(vNow);
  }
    document.addEventListener("mouseup",onMouseUp,false);
}

document.addEventListener("mousemove",onMouseMove,false);

// animate
function animate() {

  requestAnimationFrame( animate );

  if (drawing) {
    controls.enabled = false;
  } else {
    controls.enabled = true;
  }

  drawCount = splineArray.length;

  line.geometry.setDrawRange( 0, drawCount );

  updatePositions();

  line.geometry.attributes.position.needsUpdate = true; // required after the first render

  render();
}
