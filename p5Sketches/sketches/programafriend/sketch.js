var mic;
var mouthHeight = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);

  /** MIC INPUT **/
  mic = new p5.AudioIn();
  mic.start();
  console.log('starting sketch');
}

function draw() {
  background(200, 20);


  // CUE CIRCLES
  if (mouthHeight > 10) {
    fill(random(255), random(255), random(255));
    noStroke();
  	ellipse(random(width), random(height), 100, 100);
  }

  // DRAW FACE
  noStroke();
  fill(102, 178, 255);
  ellipseMode(CENTER);
  ellipse(width/2, height/2, 500, 500);
  // fill(255, 102, 178);
  fill(255);
  ellipse(width/2 - 80, height/4 + 100, 80, 100);
  ellipse(width/2 + 80, height/4 + 100, 80, 100);
  fill(0, 0, 0);
  ellipse(width/2 - 80, height/4 + 100, 40, 50);
  ellipse(width/2 + 80, height/4 + 100, 40, 50);

  // DRAW MOUTH
  var vol = mic.getLevel();
  console.log(vol);
  fill(127);
  stroke(255, 102, 178);
  strokeWeight(3);
  // map from between 0 and 1 to 0 and 200
  mouthHeight = map(vol, 0, 1, 1, 200);
  rectMode(CENTER);
  ellipse(width/2, height/2 + 100, 200, mouthHeight);
}
