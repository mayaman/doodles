var x;
var clicked;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(96, 183, 233);
  noStroke();
  x = 0;
  clicked = false;
}

function draw() {
  background(96, 183, 233);
  noStroke();

  // create the ground
  rectMode(CENTER);
  fill(125, 0, 88);
  rect(width/2, height - 10, width, 50);

  // add arms
  fill(0, 9, 125);
  rect(width/2, height/2 + 100, 300, 10);

  // add single ball
  ellipseMode(CENTER);
  fill(255);

  // add 3 circles to be the body
  ellipse(width/2, height/2, 100, 100);
  ellipse(width/2, height/2 + 100, 150, 150);
  ellipse(width/2, height/2 + 250, 250, 250);

  // snowflakes!
  fill(255);
  ellipse(random(width), random(height), 10, 10);

  ellipse(x, 100, 25, 25);
  x = x + 20; 

  // if clicked display text
  if (clicked) {
  fill(0);
  textSize(32);
  textAlign(CENTER);
  text("you clicked me!", width/2, height/4);
  }
}

//
function mouseClicked() {
  if (clicked) {
    clicked = false;
  } else {
    clicked = true;
  }
}