
class Circle extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.cleared = true;
    this.currentColorPalette = this.colors.palettes.Grayscale;

    // Create the cube
    var geometry = new THREE.SphereGeometry(10, 10, 10);
    var material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[1], shininess: 1, lights: true  });
    // var material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[1], side: THREE.DoubleSide, emissive: this.currentColorPalette[1], emissiveIntensity: 2 } );
    this.sphere = new THREE.Mesh( geometry, material );

    // Put pointlight in cube
    this.pointLight = new THREE.PointLight( 0xffffff, 1 );
    this.pointLight.shadowCameraVisible = true;
    this.sphere.add(this.pointLight);
    this.scene.add( this.sphere );
    this.scene.add(new THREE.AmbientLight(0xffffff));

    this.circs =[];
    this.threshold = 0;
  }

  setup() {
    this.scene.add( this.sphere );
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  looop() {
    // requestAnimationFrame(this.looop.bind(this));
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    let cubeScale = map(size, 0, 1, 0, 20);
    let radAccel = map(size, 0, 1, 0, 15);
    var sphereScale = map(size, 0, 1, 1, 8);
    this.sphere.scale.set(sphereScale, sphereScale, sphereScale);
    // this.sphere.material.emissiveIntensity = size * 2;
    // this.sphere.position.y = 0.9 * this.sphere.position.z + 0.1 * (size * 800 - 150);
    var yPos = map(size, 0, 1, 1, 200);
    this.sphere.position.y = yPos;

    if (size > 0.5 && this.threshold <= 0) {
      this.circs.push(new Circ(this.scene, yPos, radAccel, this.currentColorPalette[parseInt(Math.random() * 5) + 1]));
      this.threshold = 5;
    } else {
      this.threshold--;
    }

    this.circs.forEach( (c) => {
      c.updatePos(cubeScale);
      if (c.lifespan <= 0) {
        c.kill();
        this.circs.shift();
      }
    });
  }

  clear() {
    super.clear();
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    this.sphere.material.color = new THREE.Color(this.currentColorPalette[1]);
    this.sphere.material.emissive = new THREE.Color(this.currentColorPalette[1]);
    this.circs.forEach((obj) => {
      obj.updateColor(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
    });
  }
}



class Circ {
  constructor(scene, size, radAcc, theColor) {
    // this.pos = pos;
    this.scene = scene;
    this.lifespan = 200;
    this.rad = 100;
    this.rad_acc = radAcc;

    var geometry = new THREE.SphereGeometry(radAcc,radAcc,radAcc);
    var material = new THREE.MeshPhongMaterial( { color: theColor, side: THREE.DoubleSide, emissive: theColor } );
    this.circ = new THREE.Group();

    let angle = 1/10;
    for (let i = 0; i < 36; i += 1) {
      let curr_color = theColor;
      let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: curr_color, shininess: 1, lights: true  } ) );
      mesh.position.x = Math.sin(Math.PI*angle) * this.rad;
      mesh.position.y = size;
      mesh.position.z = Math.cos(Math.PI*angle) * this.rad;
      mesh.matrixAutoUpdate = true;
      mesh.updateMatrix();
      this.circ.add( mesh );
      angle = angle + 1/10;
    }

    this.scene.add(this.circ);
  }

  updatePos(yPos) {
    this.rad+=this.rad_acc;
    let angle = 1/10;
    for (var i = 0; i < this.circ.children.length; i++) {
      var curr = this.circ.children[i];
      curr.position.x = Math.sin(Math.PI*angle) * this.rad;
      curr.position.z = Math.cos(Math.PI*angle) * this.rad;
      if (i%2 == 0) {
        curr.position.y = yPos;
      } else {
        curr.position.y = -yPos;
      }
      curr.material.emissiveIntensity = this.rad_acc;
      angle = angle + 1/10;

    }
    this.lifespan--;
  }

  updateColor(newColor) {
    this.circ.forEach((c) => {
      c.material.emissive = new THREE.Color(newColor);
      c.material.color = new THREE.Color(newColor);
    });
  }

  kill() {
    this.scene.remove(this.circ);
  }
}
