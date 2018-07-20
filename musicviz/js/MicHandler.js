class MicHandler {
  constructor(threeCamera) {
    this.listener = new THREE.AudioListener();
    threeCamera.add(this.listener);
    this.sound = new THREE.Audio(this.listener);
    this.audioLoader = new THREE.AudioLoader();

    this.audioContent;
    this.analyser;
    this.audioArray;
    this.bufferSize = 512;

    navigator.getUserMedia({audio:true}, (stream) => {
      console.log('sound allowed!');
      window.persistAudioStream = stream;
      this.audioContent = new AudioContext();
      var audioStream = this.audioContent.createMediaStreamSource(stream);
      this.analyser = this.audioContent.createAnalyser();
      this.audioArray = new Uint8Array(this.bufferSize);
      audioStream.connect(this.analyser);
      this.analyser.fftSize = 1024;
      main();
    }, this.soundNotAllowed);
    this.ready = false;
  }

  soundAllowed (stream) {

  }

  soundNotAllowed(error) {
    console.log(error);
  }

  playSound() {
    this.sound.play();
  }

  isPlaying() {
    return this.sound.isPlaying;
  }

  pauseSound() {
    this.sound.pause();
  }

  getAverageFrequency() {
      // this.analyser.smoothingTimeConstant = 1;
      var value = 0;
      this.analyser.getByteFrequencyData(this.audioArray);
      for ( var i = 0; i < this.audioArray.length; i ++ ) {
        value += this.audioArray[i];
      }
      return value / this.audioArray.length;
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.audioArray);
    return this.audioArray;
  }

  getAudioArray() {
    this.analyser.getByteFrequencyData(this.audioArray);
    return this.audioArray;
  }
}
