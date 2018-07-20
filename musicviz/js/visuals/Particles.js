
class Particles extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.currentColorPalette = this.colors.palettes.Balearic;

    this.tick = 0;
    this.clock = new THREE.Clock();
    this.particleSystem = new THREE.GPUParticleSystem( {
				maxParticles: 50000
			} );
		this.scene.add( this.particleSystem );

    this.spawnerOptions = {
				spawnRate: 15000,
				horizontalSpeed: 1.5,
				verticalSpeed: 1.0,
				timeScale: 1
			};

    this.options = {
  				position: new THREE.Vector3(0, 0, 0),
  				positionRandomness: 1,
  				velocity: new THREE.Vector3(),
  				velocityRandomness: .5,
  				color: this.currentColorPalette[3],
  				colorRandomness: 0.8,
  				turbulence: .5,
  				lifetime: 1,
  				size: 1,
  				sizeRandomness: 10
  			};
  }

  setup() {
    this.scene.add( this.particleSystem );
  }

  looop() {
    // requestAnimationFrame(this.looop.bind(this));
    this.renderer.render( this.scene, this.camera );
    var delta = this.clock.getDelta() * this.spawnerOptions.timeScale;
    			this.tick += delta;
    			if ( this.tick < 0 ) this.tick = 0;
          this.speedScalar = this.audioHandler.getAverageFrequency() * 4;
    			if ( delta > 0 ) {
    				this.options.position.x = Math.sin( this.tick * this.spawnerOptions.horizontalSpeed ) * this.speedScalar;
    				// this.options.position.y = Math.sin( this.tick * this.spawnerOptions.verticalSpeed ) * this.speedScalar;;
    				this.options.position.z = Math.sin( this.tick * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed ) * this.speedScalar;
    				for ( var x = 0; x < this.spawnerOptions.spawnRate * delta; x++ ) {
    					// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
    					// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
    					this.particleSystem.spawnParticle( this.options );
    				}
    			}
    			this.particleSystem.update( this.tick );
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);
    this.options.color = new THREE.Color(this.currentColorPalette[1]);
  }

  clear() {
    super.clear();
  }
}
