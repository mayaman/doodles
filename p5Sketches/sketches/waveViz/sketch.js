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
  // Tadow IS GOOOOOOD
   soundFile = loadSound("../assets/sound/Tadow.mp3");
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

function mouseClicked() {
  t = 0;
  if (playing) {
    soundFile.pause();
    playing = false;
  }
  else {
    soundFile.play();
    playing = true;
  }
}

function draw() {
  background(0, 0, 0);
  frq.smooth(0.9);
  amp.smooth(0.9);
  var v = amp.getLevel();
  var dat = frq.analyze();
  var bass = map(frq.getEnergy("bass"), 0, 255, 0, 350);
  var lowMid = map(frq.getEnergy("lowMid"), 0, 255, 0, 300);
  var mid = map(frq.getEnergy("mid"), 0, 255, 0, 250);
  var highMid = map(frq.getEnergy("highMid"), 0, 255, 0, 200);
  var treb = map(frq.getEnergy("treble"), 0, 255, 0, 350);

  var a = map(v, 0, 0.3, 100, 200);
  var spectrum = frq.analyze();

  for(var i = 0; i < binCount - s; i++) {
    bins[i].jam(spectrum[i]);
  }
}


// level class
function Level(ex) {
  this.x = ex;

  this.jam = function(energy) {
    var hMap = map(energy, 0, 255, height/2, height - offset);
    var cMap = map(energy, 100, 255, 0, 360);
    colorMode(HSB);
    fill(cMap, 100, 100);

    // bottom waves
    rectMode(CORNERS);
    rect(this.x, hMap, this.x + width/(binCount - s - 1), height);
    rect(width - this.x, hMap, width - this.x + width/(binCount - s - 1), height);

    // top waves
    rect(this.x + width/(binCount - s - 1), 0, this.x, height - hMap);
    rect(width - this.x + width/(binCount - s - 1), 0, width - this.x, height - hMap);
  }
}
