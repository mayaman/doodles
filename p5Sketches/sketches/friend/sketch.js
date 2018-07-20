var frq;
var amp;
var a; // level of amplitude

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

var bassBooms = []; 
var lowMidBooms = []; 
var midBooms = []; 
var highMidBooms = []; 
var trebBooms = []; 


var cutoff = 0;
var addCutoff = 0.3;
var decayRate = 0.99;



function preload() {
   soundFile = loadSound("../assets/sound/love-more.mp3");
  //soundFile = loadSound("https://p.scdn.co/mp3-preview/ecb1639c58ceb6311919373fe56399e3ec242045");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

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

  for (var i = 0; i < 10; i++) {
    bassBooms[i] = new Boom(bassC);
  }

  for (var i = 0; i < 10; i++) {
    lowMidBooms[i] = new Boom(lowMidC);
  }

  for (var i = 0; i < 10; i++) {
    midBooms[i] = new Boom(midC);
  }

  for (var i = 0; i < 12; i++) {
    highMidBooms[i] = new Boom(highMidC);
  }

  for (var i = 0; i < 12; i++) {
    trebBooms[i] = new Boom(trebC);
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
  var h;
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
  


  background(a, 0, a, 20);


  // fill(bassC); // dark blue
  // ellipse(offset, offset, bass, bass);
  // ellipse(3*width/4, height/2, bass, bass);
  // ellipse(width - offset, height - 3*offset, bass, bass);

  for(var i = 0; i < bassBooms.length; i++) {
    bassBooms[i].jam(bass);
  }

  for(var i = 0; i < lowMidBooms.length; i++) {
    lowMidBooms[i].jam(lowMid);
  }

  for(var i = 0; i < midBooms.length; i++) {
    midBooms[i].jam(mid);
  }

  for(var i = 0; i < highMidBooms.length; i++) {
    highMidBooms[i].jam(highMid);
  }

  for(var i = 0; i < trebBooms.length; i++) {
    trebBooms[i].jam(treb);
  }

  // fill(lowMidC); // purple
  // ellipse(400, 400, lowMid, lowMid);
  // ellipse(width/2, height - 3*offset, lowMid, lowMid);
  // ellipse(width-2*offset, offset*3, lowMid, lowMid);

  // fill(midC); // light blue
  // ellipse(offset*4, offset*4, mid, mid);
  // ellipse(width/2, height - 7*offset, mid, mid);
  // ellipse(width-5*offset, height-offset, mid, mid);

  // fill(highMidC);
  // ellipse(1000, 100, highMid, highMid);

  // fill(trebC); // light pink
  // ellipse(width - 4*offset, offset*6, treb, treb);
  // ellipse(width/2 - 4*offset, offset*4, treb, treb);
  // ellipse(2*offset, height - 2*offset, treb, treb);
  // ellipse(width/2 + 4*offset, 3*height/4, treb, treb);

  if (v > threshold) {
    fill(random(100), random(100), random(100));
    ellipse(random(width), random(height), 20, 20);
  }
}


// window class
function Boom(color) {
  this.c = color;
  this.x = random(width);
  this.y = random(height);

  this.jam = function(energy) {
    fill(this.c);
    ellipse(this.x, this.y, energy, energy);
  }
}
