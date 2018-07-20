
class Title extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.cleared = true;
    this.currentColorPalette = this.colors.palettes.Grayscale;

    var loader = new THREE.FontLoader();

    this.textGeo;
    this.textMaterial;
    this.textMesh;
    this.text = ' v u l f p e c k ';
    loader.load( 'fonts/optimer_regular.typeface.json', ( font ) => {
      this.textGeo = new THREE.TextBufferGeometry( this.text, {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
      } );
      this.textMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
      this.textGeo.computeBoundingBox();
      var centerOffset = -0.5 * ( this.textGeo.boundingBox.max.x - this.textGeo.boundingBox.min.x );
      this.textMesh = new THREE.Mesh(this.textGeo, this.textMesh);
      this.textMesh.material.color.set(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
      this.textMesh.position.x = centerOffset;
      this.setup();
    } );
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  setup() {
    if (this.textMesh) {
      this.scene.add( this.textMesh );
    }
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  looop() {
    // requestAnimationFrame(this.looop.bind(this));
    this.renderer.render( this.scene, this.camera );

    if (this.textMesh) {
      let size = this.audioHandler.getAverageFrequency() * 0.01;
      let cubeScale = map(size, 0, 1, 0, 2);
      this.textMesh.scale.set(1, cubeScale, 1);
    }
  }

  clear() {
    super.clear();
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    if (this.textMesh) {
      this.textMesh.material.color.set(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
    }
  }
}
