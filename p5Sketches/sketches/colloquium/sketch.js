var startX, startY, x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  startX = width/2;
  startY = height/2;
}

function draw() {
  stroke(random(255), random(255), random(255));
  strokeWeight(3);
  x = random(width);
  y = random(height);
  line(startX, startY, x, y);
  fill(random(255), random(255), random(255));
  ellipse(startX, startY, 15, 15);
  startX = x;
  startY = y;
  frameRate(5);
}
