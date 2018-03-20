
class Cubes extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera) {
    super(theAudioHandler, theScene, theRenderer, theCamera);
    this.animationFrameID;
    this.cleared = true;

    // Create the cube
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x009900, shininess: 1, shading: THREE.FlatShading, lights: true } );
    this.cube = new THREE.Mesh( new THREE.BoxGeometry( 0, 0, 0), material );

    // Put pointlight in cube
    var pointLight = new THREE.PointLight( 0xffffff, 1 );
    pointLight.shadowCameraVisible = true;
    this.cube.add(pointLight);
    scene.add( this.cube );

    // Create cubes with random colors
    this.group = new THREE.Group();
    for (let i = 0; i < this.audioHandler.getAudioArray().length*2; i ++) {
      let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: Math.random() * 0xffffff, shininess: 1, lights: true  } ) );
      mesh.position.x = Math.random() * 400 - 200;
      mesh.position.y = Math.random() * 400 - 200;
      mesh.position.z = Math.random() * 400 - 200;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.matrixAutoUpdate = true;
      mesh.updateMatrix();
      this.group.add( mesh );
    }
  }

  setup() {
    this.scene.add( this.group );
    scene.add( this.cube );
  }

  looop() {
    // requestAnimationFrame(this.looop.bind(this));
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    let cubeScale = size/2 + 2;
    this.group.scale.set(cubeScale,cubeScale,cubeScale);

    for (var i = 0; i < this.group.children.length; i++) {
      var curr = this.group.children[i];
      let scale = audioHandler.getAudioArray()[i%audioHandler.getAudioArray().length]/30 + 1;
      curr.rotation.y += 0.001*scale;
      curr.scale.set(scale*scalar, scale*scalar, scale*scalar);
    }
  }

  clear() {
    super.clear();
  }
}
