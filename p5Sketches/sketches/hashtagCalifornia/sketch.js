var ca;
var caX;
var s = 0.85;
var p = 32;
var maxSize = 40;
var growing = true;

function preload() {
  ca = loadImage("../assets/img/ca.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  caX = width;
}

function draw() {
  background(64,153,255);
  drawCA();
  text("#FREECALIFORNIA", 100, 100);
  //p = p + 1;

}

function drawCA() {
  imageMode(CORNER);
  scale(s);
  image(ca, caX, 20);

if (caX > 150) {
    caX-=5;
  }
}

// hashtag class
function Hashtag(string, locX, locY) {
  this.tag = string;
  this.x = locX;
  this.y = locY;


  this.grow = function() {
  }

  this.display = function() {
    textSize(p);
    fill(255, 255, 255);
    noStroke();
    text(this.tag, this.x, this.y);
  }
}