
class Balls extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.cleared = true;
    this.currentColorPalette = this.colors.palettes.Grayscale;

    // Create the cube
    var geometry = new THREE.SphereGeometry(10, 100, 10);
    var material = new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x009900, shininess: 1, shading: THREE.FlatShading, lights: true } );
    this.cube = new THREE.Mesh( new THREE.BoxGeometry( 0, 0, 0), material );

    // Put pointlight in cube
    this.pointLight = new THREE.PointLight( 0xffffff, 1 );
    this.pointLight.shadowCameraVisible = true;
    this.cube.add(this.pointLight);
    this.scene.add( this.cube );
    this.scene.add(new THREE.AmbientLight(0xffffff));


    // Create cubes with random colors
    this.group = new THREE.Group();
    let angle = 1/16;
    this.number_of_balls = 600;
    let bounds = 1000;
    for (let i = 0; i < this.number_of_balls; i += 4) {

      let curr_color = this.currentColorPalette[parseInt(Math.random() * 5) + 1];
      let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: curr_color, shininess: 1, lights: true  } ) );
      mesh.position.x = THREE.Math.randFloat(-bounds, bounds);
      mesh.position.y = THREE.Math.randFloat(-bounds, bounds);
      mesh.position.z = THREE.Math.randFloat(-bounds, bounds);
      mesh.matrixAutoUpdate = true;
      mesh.updateMatrix();
      this.group.add( mesh );
      angle = angle + 1/16;

      let mesh1 = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: curr_color, shininess: 1, lights: true  } ) );
      // mesh1.position.x = map(i, 0, 100, -12, -1000);
      mesh1.position.x = THREE.Math.randFloat(-bounds, bounds);
      mesh1.position.y = THREE.Math.randFloat(-bounds, bounds);
      mesh1.position.z = THREE.Math.randFloat(-bounds, bounds);
      mesh1.matrixAutoUpdate = true;
      mesh1.updateMatrix();
      this.group.add( mesh1 );
      angle = angle + 1/16;
    }
  }

  setup() {
    this.scene.add( this.group );
    this.scene.add( this.cube );
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  looop() {
    // requestAnimationFrame(this.looop.bind(this));
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    let cubeScale = size/2 + 2;
    // this.group.scale.set(cubeScale,cubeScale,cubeScale);

    for (var i = 0; i < this.number_of_balls/2; i+=1) {
      var curr1 = this.group.children[i];
      var curr2 = this.group.children[i + 1];
      var current_freq = audioHandler.getAudioArray()[i];
      if (current_freq != 0) {
        let scale = map(current_freq, 0, 200, 0, 10);
        if (curr1 && curr2) {
          curr1.scale.set(1, scale, scale);
          curr2.scale.set(1, scale, scale);
          curr1.rotation.y += 0.001*scale;
          curr2.rotation.y += 0.001*scale;
        }

      }
    }
  }

  clear() {
    super.clear();
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    this.group.children.forEach((obj) => {
      obj.material.color.set(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
    });
  }
}
