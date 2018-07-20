
class Spheres extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.currentColorPalette = this.colors.palettes.Balearic;

    // Create the cube
    var geometry = new THREE.SphereGeometry( 5, 32, 32 );;
    var material = new THREE.MeshBasicMaterial( {color: this.currentColorPalette[1]} );
    this.sphere = new THREE.Mesh( geometry, material );

    // Put pointlight in cube
    this.pointLight = new THREE.PointLight( this.currentColorPalette[1], 1 );
    this.pointLight.shadowCameraVisible = true;
    this.sphere.add(this.pointLight);
    this.scene.add(this.sphere);
    this.scene.add(new THREE.AmbientLight(0xffffff));
    this.threshold = 5;


    // Create cubes with random colors
    this.rings = [];
  }

  setup() {
    this.scene.add( this.sphere );

  }

  looop() {
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    var sphereScale = map(size, 0, 1, 1, 100);
    this.sphere.scale.set(sphereScale, sphereScale, sphereScale);
    this.sphere.material.emissiveIntensity = size * 2;
    this.sphere.position.z = 0.9 * this.sphere.position.y + 0.1 * (size * 800 - 150);

    if (size > 0.6) {
      this.rings.push(new Ring(this.sphere.position, this.scene, sphereScale, this.currentColorPalette[parseInt(Math.random() * 5) + 1]));
      this.threshold = 5;
    } else {
      this.threshold--;
    }

    this.rings.forEach((ring) => {
      ring.updatePos();
      if (ring.lifespan <= 0) {
        ring.kill();
        this.rings.shift();
      }
    });

    this.pointLight.intensity = size * 10;
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    this.sphere.material.color = new THREE.Color(this.currentColorPalette[1]);
    this.rings.forEach( (ringaling) => {
      ringaling.updateColor(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
    });
  }

  clear() {
    super.clear();
  }
}

class Ring {
  constructor(pos, scene, size, theColor) {
    this.pos = pos;
    this.scene = scene;
    this.lifespan = 500;
    this.rad = map(size, 0, 100, 0, 850);
    var geometry = new THREE.RingBufferGeometry( this.rad - 20, this.rad, 32 );
    var material = new THREE.MeshPhongMaterial( { color: theColor, side: THREE.DoubleSide, emissive: theColor } );
    this.ring = new THREE.Mesh( geometry, material );
    this.ring.position.z = this.pos.z - 100;
    this.scene.add(this.ring);
  }

  updatePos() {
    this.ring.position.z-=4;
    this.lifespan--;
  }

  updateColor(newColor) {
    this.ring.material.emissive = new THREE.Color(newColor);
    this.ring.material.color = new THREE.Color(newColor);
  }

  kill() {
    this.scene.remove(this.ring);
  }
}
