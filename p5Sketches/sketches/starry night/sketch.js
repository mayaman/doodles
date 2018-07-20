// var synth = new Tone.Synth({
// 			"oscillator" : {
// 				"type" : "square"
// 			},
// 			"envelope" : {
// 				"attack" : 0.01,
// 				"decay" : 0.2,
// 				"sustain" : 0.2,
// 				"release" : 0.2,
// 			}
// 		}).toMaster();

// Constants
var Y_AXIS = 2;
var X_AXIS = 1;

var stars = [];
var lights = [];
var synth;

var b1, b2;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  // noStroke();

  //create a synth and connect it to the master output (your speakers)
  synth = new Tone.Synth().toMaster();

  for(var i = 0; i < 96; i++) {
    stars[i] = new Star();
    stars[i].twinkle();
    stars[i].display();
  }

  for(var i = 0; i < 500; i++) {
    lights[i] = new Light();
    lights[i].twinkle();
    lights[i].display();
  }

  // Define colors
  b1 = color(0, 0, 102);
  b2 = color(153, 51, 102);

  frameRate(30);
}

function draw() {
  // background(9, 14, 49, 60);
  background(255, 60);


  // Background
  setGradient(0, 0, width/2, height, b1, b2, X_AXIS);
  setGradient(width/2, 0, width/2, height, b2, b1, X_AXIS);

  for(var j = 0; j < 100; j++) {
    stars[j].twinkle();
    stars[j].display();
  }

  for(var j = 0; j < 500; j++) {
    lights[j].twinkle();
    lights[j].display();
  }
}

function star(x, y, radius1, radius2, npoints, aColor) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  fill(aColor);
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

var twinkleNotes = ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4',
'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'G4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'C4', 'C4', 'G4', 'G4', 'A4', 'A4',
'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'];
var currentNote = 0;

// star class
function Star() {
  this.rad = 10;
  this.x = random(0, width);
  this.y = random(0, height);
  this.c = color(random(100, 255), random(100, 255), random(100, 255));
  this.f = 100;
  this.detectRad = 25;
  this.spin = false;


  this.twinkle = function() {
    if (mouseX + this.detectRad > this.x && mouseX - this.detectRad < this.x && mouseY + this.detectRad > this.y && mouseY - this.detectRad < this.y && !this.spin) {
      this.f = this.c;
      this.spin = true;
      //play a middle 'C' for the duration of an 8th note
      synth.triggerAttackRelease(twinkleNotes[currentNote], "8n");
      println("CURRENT NOTE: " + currentNote);
      if (currentNote < twinkleNotes.length-1) {
        currentNote++;
      } else {
        currentNote = 0;
      }
    }
    else {
      this.f = this.c;
      //this.spin = false;
    }
  }

  this.display = function() {
    fill(this.f);
    noStroke();
    push();
    translate(this.x, this.y);
    if (this.spin) {
    rotate(PI/2.0);
    this.y = this.y + 20;
    // this.y = -((this.x * this.x) + this.x + 20);
    }
    star(0, 0, 50, 100, 5, this.c);
    pop();
  }
}


// light class
function Light() {
  this.rad = 2;
  this.x = random(0, width);
  this.y = random(0, height);
  this.f = 100;


  this.twinkle = function() {
    if (mouseX + 50 > this.x && mouseX - 50 < this.x && mouseY + 50 > this.y && mouseY - 50 < this.y) {
      this.f = 255;
    }
    else {
      this.f = 100;
    }
  }

  this.display = function() {
    fill(this.f);
    ellipse(this.x, this.y, this.rad, this.rad);
  }
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}
