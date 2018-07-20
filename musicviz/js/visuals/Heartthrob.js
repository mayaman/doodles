
class Heartthrob extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.currentColorPalette = this.colors.palettes.Balearic;

    var x = 0, y = 0;
    this.heartShape = new THREE.Shape(); // From http://blog.burlock.org/html5/130-paths
    this.heartShape.moveTo( x + 25, y + 25 );
    this.heartShape.bezierCurveTo( x + 25, y + 25, x + 20, y, x, y );
    this.heartShape.bezierCurveTo( x - 30, y, x - 30, y + 35, x - 30, y + 35 );
    this.heartShape.bezierCurveTo( x - 30, y + 55, x - 10, y + 77, x + 25, y + 95 );
    this.heartShape.bezierCurveTo( x + 60, y + 77, x + 80, y + 55, x + 80, y + 35 );
    this.heartShape.bezierCurveTo( x + 80, y + 35, x + 80, y, x + 50, y );
    this.heartShape.bezierCurveTo( x + 35, y, x + 25, y + 25, x + 25, y + 25 );

    this.group = new THREE.Group();
    this.group.position.y = 50;
    this.scene.add(new THREE.AmbientLight(0xffffff));
    this.scene.add( this.group );


    var extrudeSettings = { amount: 10, bevelEnabled: true, bevelSegments: 5, steps: 1, bevelSize: 1, bevelThickness: 0 };

    for (var i = 0; i < this.audioHandler.getAudioArray().length/2; i++) {
      let curr_color = this.currentColorPalette[parseInt(Math.random() * 5) + 1];
      this.heartShape.moveTo( Math.random()*100, Math.random()*100, Math.random()*100);
      var posOffset = 1000;
      var posMag = 2000;
      this.addShape( this.heartShape, extrudeSettings, curr_color, Math.random() * posMag - posOffset, Math.random() * posMag - posOffset, Math.random() * posMag - posOffset, Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI, 10 );
    }
  }

  setup() {
    this.scene.add( this.group );
  }

  looop() {
    // requestAnimationFrame(this.looop.bind(this));
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    var sphereScale = map(size, 0, 1, 1, 8);

    // if (size*10 > 5) {
    //   console.log('hi');
    //   var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
    //   this.heartShape.moveTo( Math.random()*10, Math.random()*10);
    //   this.addShape( this.heartShape, extrudeSettings, 0xffffff, 0, Math.random() * 100, 0, 0, 0, Math.PI, size );
    // }

    for (var i = 0; i < this.group.children.length; i++) {
      var curr = this.group.children[i];
      let scale = audioHandler.getAudioArray()[i%audioHandler.getAudioArray().length]/50 + 1;
      curr.rotation.y += 0.001*sphereScale;
      curr.rotation.x += 0.001*sphereScale;
      curr.rotation.z += 0.001*sphereScale;
      curr.scale.set(1, 1, scale);
    }
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    this.group.children.forEach((obj) => {
      obj.material.color.set(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
      if (obj.material.emissive) {
        obj.material.emissive.set(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
      }
    });
  }

  clear() {
    super.clear();
  }

  addShape( shape, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {
    // extruded shape
    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color, shininess: 0, emissive: color } ) );
    mesh.position.set( x, y, z - 75 );
    mesh.rotation.set( rx, ry, rz );
    mesh.scale.set( 1, 1, 1);
    this.group.add( mesh );
    this.addLineShape( shape, color, x, y, z, rx, ry, rz, s );
  }

  addLineShape( shape, color, x, y, z, rx, ry, rz, s ) {

    // lines
    shape.autoClose = true;
    var points = shape.getPoints();
    var spacedPoints = shape.getSpacedPoints( 50 );
    var geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
    var geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

    // solid line
    // var line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
    // line.position.set( x, y, z - 25 );
    // line.rotation.set( rx, ry, rz );
    // line.scale.set( s, s, s );
    // this.group.add( line );

    // line from equidistance sampled points
    // var line = new THREE.Line( geometrySpacedPoints, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
    // line.rotation.set( rx, ry, rz );
    // line.position.set( x, y, z + 25 );
    // line.scale.set( s, s, s );
    // this.group.add( line );

    // vertices from real points
    var particles = new THREE.Points( geometryPoints, new THREE.PointsMaterial( { color: color, size: 4 } ) );
    particles.rotation.set( rx, ry, rz );
    particles.position.set( x, y, z + 75 );
    particles.scale.set( s, s, s );
    this.group.add( particles );

    // equidistance sampled points
    var particles = new THREE.Points( geometrySpacedPoints, new THREE.PointsMaterial( { color: color, size: 4 } ) );
    particles.position.set( x, y, z + 125 );
    particles.rotation.set( rx, ry, rz );
    particles.scale.set( s, s, s );
    this.group.add( particles );
  }
}
