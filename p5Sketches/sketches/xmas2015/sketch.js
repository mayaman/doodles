var frq;
var amp;
var a; // level of amplitude
var chellaPics = [];
var dadPics = [];
var momPics = [];
var mayaPics = [];
var mom, dad, chella, maya;

var playing = false;
var jamstruction;
var t = 255;

var offset;
var roof = 70;

var threshold = 0.1;
var bassC;
var lowMidC; 
var midC; 
var highMidC;

var trebC;

var frq;
var amp;
var v; // level of amplitude

var rad = 10;

var threshold = 0.5;
var bassthresh = 60;
var lowMidThresh = 140;
var midthresh = 110;
var highMidThresh = 85;

var trebthresh = 100;


var cutoff = 0;
var addCutoff = 0.3;
var decayRate = 0.99;



function preload() {
   soundFile = loadSound("../assets/sound/bohemian.mp3");
   for (var i = 0; i < 5; i++) {
    chellaPics[i] = loadImage("../assets/xmas2015/chella/" + i + ".jpg");
   }

   for (var i = 0; i < 5; i++) {
    dadPics[i] = loadImage("../assets/xmas2015/dad/" + i + ".jpg");
   }

   for (var i = 0; i < 5; i++) {
    momPics[i] = loadImage("../assets/xmas2015/mom/" + i + ".jpg");
   }

   for (var i = 0; i < 5; i++) {
    mayaPics[i] = loadImage("../assets/xmas2015/maya/" + i + ".jpg");
   }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  frameRate(20);

  amp = new p5.Amplitude();
  frq = new p5.FFT();

  bassC = color(36, 0, 103, 30);
  lowMidC = color(191, 143, 251, 30);
  midC = color(117, 126, 239, 30);
  highMidC = color(117, 172, 239, 30);
  trebC = color(247, 152, 210, 30);

  offset = 50;

  amp.setInput(soundFile);
  frq.setInput(soundFile);
  noStroke();

  chella = new Pic(chellaPics, 0, width/4 - 50);
  dad = new Pic(dadPics, width/4, width/2 - 50);
  mom = new Pic(momPics, width/2, 3*width/4 - 50);
  maya = new Pic(mayaPics, 3*width/4, width);
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
  var v = amp.getLevel();
  var dat = frq.analyze();
  var bass = frq.getEnergy("bass");
  var treb = frq.getEnergy("treble");
  var lowMid = frq.getEnergy("lowMid");
  var mid = frq.getEnergy("mid");
  var highMid = frq.getEnergy("highMid");

  // var b = map(v, 0, 0.3, 0, 200);
  background(0, 0, 0, 20);
 

  if (bass > bassthresh) {
    chella.shoop();
  } 

  if (lowMid > lowMidThresh) {
    dad.shoop();
  }

  if (mid > midthresh) {
    mom.shoop();
  }

  if (highMid > highMidThresh) {
    maya.shoop();
  }

  if (treb > trebthresh) {
    fill(160, 12, 245);
    rect(random(width/5 * 4, width), random(10, height), rad, rad);
    // rect(width/5 * 4, 0, width/5, height);
  }

  // fill(255, 255, 255);
  // rect(width/4, 0, 10, height);
  // rect(width/2, 0, 10, height);
  // rect(3*width/4, 0, 10, height);
}


// window class
function Pic(theImages, minX, maxX) {
  this.photos = theImages;
  this.xMin = minX;
  this.xMax = maxX;
  this.y = random(height);

  this.shoop = function() {
    imageMode(CORNER);
    var numPhoto = floor(random(0, 5));
    console.log(numPhoto);
    image(this.photos[numPhoto], random(this.xMin, this.xMax), random(height), 80, 80);
  }
}
