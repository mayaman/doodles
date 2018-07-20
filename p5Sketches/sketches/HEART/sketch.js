var frq;
var amp;
var a; // level of amplitude

var playing = false;
var jamstruction;
var s = 10;

var offset;

var binCount = 32;
var bins = new Array(binCount);

var cutoff = 0;
var addCutoff = 0.3;
var decayRate = 0.99;



function preload() {
   soundFile = loadSound("../assets/sound/jazz.mp3");
  //soundFile = loadSound("https://p.scdn.co/mp3-preview/ecb1639c58ceb6311919373fe56399e3ec242045");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  offset = height/4;

  var smoothing = 0.6;
  frq = new p5.FFT(smoothing, binCount);
  amp = new p5.Amplitude();

  amp.setInput(soundFile);
  frq.setInput(soundFile);
  noStroke();

  for (var i = 0; i < binCount - s; i++) {
    bins[i] = new Level((i*width/(binCount - s))/2);
  }
}

function draw() {
  
}



}
