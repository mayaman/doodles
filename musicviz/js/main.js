var scalar = 2.5;

// three.js scene setup
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );
camera.position.set(0, 0, 500);
// camera.position.set(-0.00008331137458831904, 1557, 0.0004590835129425484);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xdddddd, 1);
document.body.appendChild( renderer.domElement );

// TODO: read documentation on light (https://www.youtube.com/watch?v=4njnviuvt1Q)
// var light = new THREE.DirectionalLight( 0xffffff, 1 );
// light.position.set( 1, 1, 1 ).normalize();
// scene.add( light );

// Audio
// var audioHandler = new AudioHandler(camera);
// audioHandler.loadSound('sound/backpocket.mp3');
var soundReady = false;
var audioHandler = new MicHandler(camera);

function main() {

  // Controls
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.9;
  controls.zoomSpeed = 0.5;
  controls.rotateSpeed = 0.5;

  // Colors
  var colorPalettes = new ColorPalettes();
  var currentColor = "Grayscale";
  colorPalettes.addColor("Grayscale", '#4c4c4c','#cccccc', '#999999', '#101010', '#dedede', '#858585');
  colorPalettes.addColor("Balearic", '#002947', '#4bbcf4', '#61c0bf', '#bbded6', '#ffb6b9', '#fae3d9');
  colorPalettes.addColor("Mellow", '#fef1e3', '#c4d4e0', '#9aabb9', '#e2b49a', '#e9c77b', '#193446');
  colorPalettes.addColor("Fresh", '#5C6F68', '#3F3F37', '#8AA39B', '#A4F9C8', '#A7FFF6', '#479EA3');
  colorPalettes.addColor("Effect", '#c48d8d', '#858781', '#190933', '#c6778b', '#472836', '#858781');
  colorPalettes.addColor("Subdued", '#0E1530', '#D4AA7D', '#95D9C3', '#EFD09E', '#D2D8B3', '#82C3D8');
  colorPalettes.addColor("Elle", '#9AD2CB', '#472836', '#CEB7B3', '#B7B7B7', '#9ABCA7', '#B79292');
  colorPalettes.addColor("Dunes", '#272727','#D4AA7D', '#EFD09E', '#D2D8B3', '#90A9B7', '#BA9064');
  colorPalettes.addColor("Purp", '#D5C6E0','#192A51', '#967AA1', '#AAA1C8', '#F5E6E8', '#59447A');
  colorPalettes.addColor("Sean", '#0D174D','#8E4B1D', '#C19E11', '#78AFC9', '#004931', '#8E7B6F');



  // Visualizations
  var visualizations = [];
  visualizationNumber = 0;
  visualizations.push(new Title(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Cubes(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Spheres(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Bars(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Circle(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Curly(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Heartthrob(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Thick(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Catmull(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.push(new Balls(audioHandler, scene, renderer, camera, colorPalettes));
  visualizations.forEach( (viz) => {
    viz.clear();
  });
  visualizations[visualizationNumber].updateColors(currentColor);
  visualizations[visualizationNumber].setup();


  // RENDER
  function animate() {
    requestAnimationFrame(animate);
    visualizations[visualizationNumber].looop();
  }
  animate();

  // Event handlers
  document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    console.log('key: ' + keyName);
    var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (keyName == 'q') {
      currentColor = 'Grayscale';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'w') {
      currentColor = 'Balearic';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'e') {
      currentColor = 'Mellow';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'r') {
      currentColor = 'Fresh';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 't') {
      currentColor = 'Effect';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'y') {
      currentColor = 'Subdued';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'u') {
      currentColor = 'Elle';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'i') {
      currentColor = 'Purp';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'o') {
      currentColor = 'Dunes';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == 'p') {
      currentColor = 'Sean';
      visualizations[visualizationNumber].updateColors(currentColor);
    } else if (keyName == ' ') {
      event.preventDefault();
      if (audioHandler.isPlaying()) {
        audioHandler.pauseSound();
      } else {
        audioHandler.playSound();
      }
    } else if (digits.indexOf(keyName) != -1){
      visualizations[visualizationNumber].clear();
      visualizationNumber = parseInt(keyName);
      visualizations[visualizationNumber].setup();
      visualizations[visualizationNumber].updateColors(currentColor);
    }

  });

}

function onWindowResize( event ) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};

function onDocumentMouseMove( event ) {
  console.log('mouse moved');
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function map (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
