var scalar = 2.5;

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.set(0, 0, 500);

var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );

function init() {

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );


  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xdddddd, 1);
  document.body.appendChild( renderer.domElement );

  // controls
  controls = new THREE.OrbitControls( camera, renderer.domElement );
          controls.enableDamping = true;
          controls.dampingFactor = 0.9;
          controls.zoomSpeed = 0.5;
          controls.rotateSpeed = 0.5;
  var skyBoxMat = new THREE.MeshStandardMaterial({color: 0x00ff00, specular: 0x009900, shininess: 30, shading: THREE.FlatShading, lights: true});

  // // CREATE THE CUBE
  var geometry = new THREE.CubeGeometry( 1, 1, 1);
  var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x009900, shininess: 1, shading: THREE.FlatShading, lights: true } );
  var cube = new THREE.Mesh( new THREE.BoxGeometry( 0, 0, 0), material );
  // scene.add( cube );

  group = new THREE.Group();
  for ( var i = 0; i < audioArray.length*2; i ++ ) {
    // MeshLambertMaterial
  	var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff, shininess: 1, lights: true  } ) );
  	mesh.position.x = Math.random() * 400 - 200;
  	mesh.position.y = Math.random() * 400 - 200;
  	mesh.position.z = Math.random() * 400 - 200;
  	mesh.rotation.x = Math.random() * 2 * Math.PI;
  	mesh.rotation.y = Math.random() * 2 * Math.PI;
  	mesh.matrixAutoUpdate = true;
  	mesh.updateMatrix();
  	group.add( mesh );
  }
  pointLight = new THREE.PointLight( 0xffffff, 1 );
  pointLight.shadowCameraVisible = true;
  cube.add(pointLight);
  scene.add( cube );
  scene.add( group );

  function onDocumentMouseMove( event ) {
  	event.preventDefault();
  	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }

  // RENDER THE CUBE
  function animate() {
    // Rotate our object
  	requestAnimationFrame( animate );
  	renderer.render( scene, camera );

    var size = analyser.getAverageFrequency() * 0.01;
    audioArray = analyser.getFrequencyData();

    pointLight.intensity = pointLightIntensity;

    var cubeScale = size/2 + 2;
    group.scale.set(cubeScale,cubeScale,cubeScale);

    for (var i = 0; i < group.children.length; i++) {
      var curr = group.children[i];
      scale = audioArray[i%audioArray.length]/30 + 1;
      curr.rotation.y += 0.001*scale;
      // curr.rotation.z += 0.0001*Date.now();
      curr.scale.set(scale*scalar, scale*scalar, scale*scalar);
    }
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
  }
  animate();

}


function onWindowResize( event ) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
};
