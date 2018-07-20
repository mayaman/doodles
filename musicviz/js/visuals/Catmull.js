
class Catmull extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.currentColorPalette = this.colors.palettes.Balearic;

    this.scene.add(new THREE.AmbientLight(0xffffff));

    //Create a closed wavey loop
    var angle = Math.PI;
    var ang_interval = 1;
    var points = [];
    for (var i = 0; i < 200; i++) {
      points.push(new THREE.Vector3( angle, Math.sin(Math.PI)*10, 0 ));
      angle += ang_interval;
    }
    this.spline = new THREE.CatmullRomCurve3([
      new THREE.Vector3( -10, 0, 10 ),
      new THREE.Vector3( -5, 5, 5 ),
      new THREE.Vector3( 0, 0, 0 ),
      new THREE.Vector3( 5, -5, 5 ),
      new THREE.Vector3( 10, 0, 10 )]
    );
    this.spline.curveType = 'catmullrom';

    // var points = curve.getPoints( 50 );
    var geometry = new THREE.TubeBufferGeometry( this.spline, 5, 2, 3, false );
    var material = new THREE.LineBasicMaterial( { color : this.currentColorPalette[1]} );

    // this.mull = new THREE.Line( geometry, material );
    this.mull;
    this.mull2;
    this.mull3;
    this.mull4;
    this.mull5;
    this.angle = 0;
    this.angle_offset = 1/8;
    this.x = -1000;
  }

  setup() {
    if (this.mull) {
      this.scene.add(this.mull);
    }
  }

  looop() {
    this.renderer.render( this.scene, this.camera );

    let size = this.audioHandler.getAverageFrequency() * 0.01;
    if (1) {
      var new_point = size*1000;
      if (this.spline.points.length > 100) {
        console.log('MAX');
        this.spline.points.push(new THREE.Vector3(0, Math.cos(this.angle) * 100 + new_point - 500, 0));
        this.spline.points.shift();
      } else {
        console.log('not max');
        this.spline.points.push(new THREE.Vector3(0, Math.cos(this.angle) * 100 + new_point - 500, 0));
      }
      this.spline.points.forEach( (point) => {
        let curr_x = point.getComponent(0) - 20;
        point.setComponent(0, curr_x);
      });

      this.spline = new THREE.CatmullRomCurve3(this.spline.points);
      var geometry = new THREE.TubeBufferGeometry( this.spline, 100, 20, 100, false );
      var material = new THREE.LineBasicMaterial( { color : this.currentColorPalette[1], linecap: 'round', //ignored by WebGLRenderer
      linejoin:  'round' //ignored by WebGLRenderer
    } );
    this.mull = new THREE.Mesh( geometry, material );
    this.mull2 = new THREE.Mesh( geometry, new THREE.LineBasicMaterial( { color : this.currentColorPalette[2]} ) );
    this.mull2.position.x = -500;
    this.mull2.position.z = -500;

    this.mull3 = new THREE.Mesh( geometry, new THREE.LineBasicMaterial( { color : this.currentColorPalette[3]} ) );
    this.mull3.position.x = 500;
    this.mull3.position.z = 500;

    this.mull4 = new THREE.Mesh( geometry, new THREE.LineBasicMaterial( { color : this.currentColorPalette[4]} ) );
    this.mull4.position.x = 1000;
    this.mull4.position.z = 1000;


    super.clear();
    this.scene.add(this.mull);
    this.scene.add(this.mull2);
    this.scene.add(this.mull3);
    this.scene.add(this.mull4);

  } else {
    this.threshold--;
  }
  this.x+=100;
  this.angle += this.angle_offset;
}

updateColors(colorTitle) {
  this.currentColorPalette = this.colors.palettes[colorTitle];
  this.scene.background = new THREE.Color(this.currentColorPalette[0]);
}

clear() {
  super.clear();
}
}
