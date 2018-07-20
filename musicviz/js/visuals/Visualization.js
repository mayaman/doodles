class Visualization {
  constructor(theAudioHandler, theScene, theRenderer, theCamera, theColors) {
    this.audioHandler = theAudioHandler;
    this.scene = theScene;
    this.renderer = theRenderer;
    this.camera = theCamera;
    this.colors = theColors;
  }

  clear() {
    while(this.scene.children.length > 0){
      this.scene.remove(this.scene.children[0]);
    }
  }
}
