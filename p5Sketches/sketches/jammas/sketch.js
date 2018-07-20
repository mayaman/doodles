var frq;
var amp;
var a; // level of amplitude
var pics = [];
var jam;

var playing;
var start;

var threshold = 0.1;
var numPhotos = 37;

var frq;
var amp;

var rad = 10;

var threshold = 0.5;
var bassthresh = 60;
var lowMidThresh = 140;
var midthresh = 110;
var highMidThresh = 85;
var trebthresh = 100;



function preload() {
   soundFile = loadSound("../assets/sound/riptide.mp3");
   for (var i = 0; i < numPhotos; i++) {
    pics[i] = loadImage("../assets/jam/" + i + ".jpg");
   }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  frameRate(40);

  amp = new p5.Amplitude();
  frq = new p5.FFT();

  amp.setInput(soundFile);
  frq.setInput(soundFile);
  noStroke();

  jam = new Pic(pics, 0, width);
  start = true;
  playing = false;
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

function vance() {
  textAlign(CENTER);
  fill(255);
  textSize(100);
  text("VANCE JOY", width/2, height/2);
  textSize(32);
  text("FOX THEATRE, POMONA // FRIDAY, MARCH 4TH, 2016", width/2, height/2 + 100);
}

function keyPressed() {
  if (keyCode == ENTER) {
    soundFile.pause();
    playing = false;
    vance();
  }
}

function draw() {
  if (playing) {
  var v = amp.getLevel();
  var dat = frq.analyze();
  var bass = frq.getEnergy("bass");
  var treb = frq.getEnergy("treble");
  var lowMid = frq.getEnergy("lowMid");
  var mid = frq.getEnergy("mid");
  var highMid = frq.getEnergy("highMid");

  var s = map(v, 0, 0.3, 0, 200);
  background(0, 0, 0, 20);
 

  if (bass > bassthresh) {
    jam.shoop();
  } 

  if (lowMid > lowMidThresh) {
    jam.shoop();
  }

  if (mid > midthresh) {
    jam.shoop();
  }

  if (highMid > highMidThresh) {
    jam.shoop();
  }

  if (treb > trebthresh) {
    jam.shoop();
  }

  }
}


// window class
function Pic(theImages, minX, maxX) {
  this.photos = theImages;
  this.xMin = minX;
  this.xMax = maxX;
  this.y = random(height);

  this.shoop = function() {
    var v = amp.getLevel();
    var s = map(v, 0, 0.3, 20, 200);


    imageMode(CORNER);
    var numPhoto = floor(random(0, numPhotos));
    var x = random(50, 100);
    console.log(numPhoto);
    image(this.photos[numPhoto], random(this.xMin, this.xMax), random(height), s, s);
  }
}
