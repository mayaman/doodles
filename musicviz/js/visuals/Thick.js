
class Thick extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.currentColorPalette = this.colors.palettes.Balearic;

    this.scene.add(new THREE.AmbientLight(0xffffff));

    this.mulls = [];

    this.threshold = 0;
    this.start =  new THREE.Vector3( ( - 0.5 ) * 50, 5, 5);
    this.end =  new THREE.Vector3( ( - 4.5 ) * 50, THREE.Math.randFloat( - 50, 50 ), THREE.Math.randFloat( - 50, 50 ) );
  }

  setup() {
  }

  looop() {
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    var sphereScale = map(size, 0.5, 1, 1, 10);
    if (sphereScale > 2 && this.threshold <= 0) {
      let m = new Mull(this.scene, sphereScale, this.currentColorPalette[parseInt(Math.random() * 5) + 1], this.start);
      this.mulls.push(m);
      this.threshold = 2;
    } else {
      this.threshold--;
    }
    this.mulls.forEach((m) => {
      m.updatePos(sphereScale);
      if (m.lifespan <= 0) {
        m.kill();
        this.mulls.shift();
      }
    });

  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    this.mulls.forEach((m) => {
      m.updateColor(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);

    });
  }

  clear() {
    super.clear();
  }
}

class Mull {
  constructor(scene, size, theColor, startPoint) {
    this.scene = scene;
    this.lifespan = 100;
    this.startingPoint = startPoint;
    this.s = size;

    let pp = [];

    this.endingPoint = new THREE.Vector3( ( - 0.5) * 50, this.s, this.s);
    pp.push(this.startingPoint);
    pp.push(this.endingPoint)
    var randomSpline =  new THREE.CatmullRomCurve3(pp);
    //
    this.extrudeSettings = {
      steps: 200,
      bevelEnabled: false,
      extrudePath: randomSpline,
      bevelThickness: 1
    };
    this.pts = []
    var numPts = 5;
    for ( var i = 0; i < numPts * 2; i ++ ) {
      var l = i % 2 == 1 ? 10 : 20;
      var a = i / numPts * Math.PI;
      this.pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );
    }
    var shape = new THREE.Shape( this.pts );
    var geometry = new THREE.ExtrudeGeometry( shape, this.extrudeSettings );
    var material2 = new THREE.MeshLambertMaterial( { color: theColor, emissive: theColor, wireframe: false } );
    this.mull = new THREE.Mesh( geometry, material2 );
    this.mull.position.x = THREE.Math.randFloat(-1000, 1000);
    this.mull.position.y = THREE.Math.randFloat(-1000, 1000);
    this.mull.position.z = THREE.Math.randFloat(-1000, 1000);
    this.mull.rotation.y += Math.PI/2;
    this.mull.scale.set(size, size, size);
    scene.add( this.mull );
  }

  updatePos(s) {
    this.mull.position.x-=(this.s*2);
    this.mull.position.y-=(this.s*2);
    this.lifespan--;
  }

  updateColor(newColor) {
    this.mull.material.emissive = new THREE.Color(newColor);
    this.mull.material.color = new THREE.Color(newColor);
  }

  kill() {
    this.scene.remove(this.mull);
  }

  getEndingPoint() {
    return this.endingPoint;
  }
}
