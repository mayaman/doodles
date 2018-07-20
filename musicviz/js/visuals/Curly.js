
class Curly extends Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    super(theAudioHandler, theScene, theRenderer, theCamera, theColors);
    this.animationFrameID;
    this.cleared = true;
    this.currentColorPalette = this.colors.palettes.Grayscale;

    // Create the cube
    var geometry = new THREE.CubeGeometry( 8, 8, 8 );
    var material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[1], shininess: 1, lights: true  } );

    this.cube = new THREE.Mesh( geometry, material );
    this.scene.add(this.cube);
    this.cubeGroup = new THREE.Group();
    // var xpos = 200;
    // for(let i = 0; i < 10; i++) {
    //   let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: this.currentColorPalette[parseInt(Math.random() * 5) + 1], shininess: 1, lights: true  } ) );
    //   mesh.position.x = xpos;
    //   xpos+=200;
    //   this.cubeGroup.add(mesh);
    // }
    //
    // xpos = -200;
    // for(let i = 0; i < 10; i++) {
    //   let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: this.currentColorPalette[parseInt(Math.random() * 5) + 1], shininess: 1, lights: true  } ) );
    //   mesh.position.x = xpos;
    //   xpos-=200;
    //   this.cubeGroup.add(mesh);
    // }
    // this.scene.add(this.cubeGroup);

    this.root = new THREE.Mesh( geometry, material );
    this.root.position.x = 0;
    this.scene.add( this.root );

    // Put pointlight in cube
    this.pointLight = new THREE.PointLight( 0xffffff, 1 );
    this.pointLight.shadowCameraVisible = true;
    this.scene.add(new THREE.AmbientLight(0xffffff));


    var amount = this.audioHandler.getAudioArray().length, parent = this.root;
    var current_color_index = 1;
    for ( var i = 0; i < amount; i ++ ) {
      current_color_index++;
      material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[current_color_index%5 + 1], shininess: 1, lights: true  } );
      let object = new THREE.Mesh( geometry, material );
      object.position.x = 10;
      parent.add( object );
      parent = object;
    }
    this.endCube1 = new THREE.Mesh( geometry, material );
    this.endCube1.position.x = 10;
    parent.add(this.endCube1);
    parent = this.root;
    current_color_index = 1;
    for ( var i = 0; i < amount; i ++ ) {
      current_color_index++;
      material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[current_color_index%5 + 1], shininess: 1, lights: true  } );
      let object = new THREE.Mesh( geometry, material );
      object.position.x = - 10;
      parent.add( object );
      parent = object;
    }
    this.endCube2 = new THREE.Mesh( geometry, material );
    this.endCube2.position.x = -10;
    parent.add(this.endCube2);

    // Y ALTERATIONS
    // new one
    parent = this.root;
    current_color_index = 1;
    for ( var i = 0; i < amount; i ++ ) {
      current_color_index++;
      material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[current_color_index%5 + 1], shininess: 1, lights: true  } );
      let object = new THREE.Mesh( geometry, material );
      object.position.y = 10;
      parent.add( object );
      parent = object;
    }
    this.endCube3 = new THREE.Mesh( geometry, material );
    this.endCube3.position.y = 10;
    parent.add(this.endCube3);

    // new one
    parent = this.root;
    current_color_index = 1;
    for ( var i = 0; i < amount; i ++ ) {
      current_color_index++;
      material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[current_color_index%5 + 1], shininess: 1, lights: true  } );
      let object = new THREE.Mesh( geometry, material );
      object.position.y = - 10;
      parent.add( object );
      parent = object;
    }
    this.endCube4 = new THREE.Mesh( geometry, material );
    this.endCube4.position.y = -10;
    parent.add(this.endCube4);

    // Z ALTERATIONS
    // new one
    parent = this.root;
    current_color_index = 1;
    for ( var i = 0; i < amount; i ++ ) {
      current_color_index++;
      material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[current_color_index%5 + 1], shininess: 1, lights: true  } );
      let object = new THREE.Mesh( geometry, material );
      object.position.z = 10;
      parent.add( object );
      parent = object;
    }
    this.endCube5= new THREE.Mesh( geometry, material );
    this.endCube5.position.z = 10;
    parent.add(this.endCube5);

    parent = this.root;
    current_color_index = 1;
    for ( var i = 0; i < amount; i ++ ) {
      current_color_index++;
      material = new THREE.MeshPhongMaterial( { color: this.currentColorPalette[current_color_index%5 + 1], shininess: 1, lights: true  } );
      let object = new THREE.Mesh( geometry, material );
      object.position.z = - 10;
      parent.add( object );
      parent = object;
    }
    this.endCube6 = new THREE.Mesh( geometry, material );
    this.endCube6.position.z = -10;
    parent.add(this.endCube6);
  }

  setup() {
    this.scene.add( this.root );
    this.scene.add( this.cube );
    this.scene.add(new THREE.AmbientLight(0xffffff));
  }

  looop() {
    this.renderer.render( this.scene, this.camera );
    var time = Date.now() * 0.001;
    let size = this.audioHandler.getAverageFrequency() * 0.01;
    var rx = Math.sin( time * 0.7 ) * 0.1;
    var ry = Math.sin( time * 0.3 ) * 0.1;
    var rz = Math.sin( time * 0.2 ) * 0.1;

    this.root.traverse( function ( object ) {
      object.rotation.x = rx;
      object.rotation.y = ry;
      object.rotation.z = rz;
    } );

    let scale = map(size, 0, 1, 1, 10);
    this.cube.scale.set(scale, scale, scale);
    for (var i = 0; i < this.cubeGroup.children.length; i++) {
      var curr = this.cubeGroup.children[i];
      curr.scale.set(scale/2, scale/2, scale/2);
    }
    this.endCube1.scale.set(scale, scale, scale);
    this.endCube2.scale.set(scale, scale, scale);
    this.endCube3.scale.set(scale, scale, scale);
    this.endCube4.scale.set(scale, scale, scale);
    this.endCube5.scale.set(scale, scale, scale);
    this.endCube6.scale.set(scale, scale, scale);

  }

  clear() {
    super.clear();
  }

  updateColors(colorTitle) {
    this.currentColorPalette = this.colors.palettes[colorTitle];
    this.scene.background = new THREE.Color(this.currentColorPalette[0]);

    this.root.traverse(( object ) => {
      object.material.color.set(this.currentColorPalette[parseInt(Math.random() * 5) + 1]);
    } );
  }
}
