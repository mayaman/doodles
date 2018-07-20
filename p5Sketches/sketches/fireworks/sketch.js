var fireworks = [];
var i = -1;
var explode = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}


function draw() {
  background(0);
  if (explode) {
    fireworks[i].extend();
    fireworks[i].display();
  } 
}

function mouseClicked() {
  i++;
  fireworks[i] = new Firework(mouseX, mouseY);
  explode = true;
}

// raindrop class
function Firework(ex, why) {
  this.length = 0;
  this.x = ex;
  this.y = why;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);

  this.extend = function() {
    if (this.length < 100) {
      this.length = this.length + 3;
    }
    else {
      this.length = 0;
      explode = false;
    }
  }

  this.display = function() {
      stroke(this.r, this.g, this.b);
      noFill();
      curve(this.x + (this.length/2), this.y, this.x, this.y, this.x + this.length, this.y + this.length, this.x + (this.length/2), this.y);
      line(this.x, this.y, this.x, this.y + this.length);
      line(this.x, this.y, this.x + this.length, this.y - this.length);
      line(this.x, this.y, this.x - this.length, this.y + this.length);
      line(this.x, this.y, this.x + this.length, this.y);
      line(this.x, this.y, this.x - this.length, this.y - this.length);
      line(this.x, this.y, this.x, this.y - this.length);
      line(this.x, this.y, this.x - this.length, this.y);
  }
}
