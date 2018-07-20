class AudioHandler {
  constructor(threeCamera) {
    this.listener = new THREE.AudioListener();
		threeCamera.add(this.listener);
		this.sound = new THREE.Audio(this.listener);
		this.audioLoader = new THREE.AudioLoader();

		this.bufferLength = 512;
    this.analyser = new THREE.AudioAnalyser(this.sound, this.bufferLength);
		this.audioArray = new Uint8Array(this.bufferLength);
	}

  loadSound(soundFilePath) {
		this.audioLoader.load(soundFilePath, buffer => {
			this.sound.setBuffer( buffer );
			this.sound.setLoop(true);
			this.sound.setVolume(0.5);
			this.sound.play();
		});
  }

  audioLoaded() {
		this.sound.setBuffer( buffer );
		this.sound.setLoop(true);
		this.sound.setVolume(0.5);
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
    this.analyser.smoothingTimeConstant = 1;
		return this.analyser.getAverageFrequency();
	}

  getFrequencyData() {
		return this.analyser.getFrequencyData();
	}

	getAudioArray() {
		this.audioArray = this.analyser.getFrequencyData();
		return this.audioArray;
	}
}
