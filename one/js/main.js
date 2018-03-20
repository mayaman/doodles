var scalar = 2.5;

// three.js scene setup
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 0, 500);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xdddddd, 1);
document.body.appendChild( renderer.domElement );

// TODO: read documentation on light
var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light );

// Audio
var audioHandler = new AudioHandler(camera);
audioHandler.loadSound('sound/dreamer.mp3');

// Controls
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.9;
controls.zoomSpeed = 0.5;
controls.rotateSpeed = 0.5;

// Visualizations
var visualizations = [];
visualizationNumber = 0;
visualizations.push(new Cubes(audioHandler, scene, renderer, camera));
visualizations.push(new Spheres(audioHandler, scene, renderer, camera));
visualizations[visualizationNumber].setup();

  // RENDER THE CUBE
  function animate() {
    requestAnimationFrame(animate);
    visualizations[visualizationNumber].looop();
  }
  animate();

// Event handlers
document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  console.log('key: ' + keyName);
  visualizations[visualizationNumber].clear();
  visualizationNumber = parseInt(keyName);
  visualizations[visualizationNumber].setup();
});

function onWindowResize( event ) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
