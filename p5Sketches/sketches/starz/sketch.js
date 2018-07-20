var lights = [];
var numberOfStars = 3000;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(9, 14, 49);
  noStroke();
  colorMode(HSB);
  for(var i = 0; i < numberOfStars; i++) {
    lights[i] = new Light();
    lights[i].twinkle();
    lights[i].display();
  }
}

function draw() {
  for(var j = 0; j < numberOfStars; j++) {
    lights[j].twinkle();
    lights[j].display();
  }
}

// star class
function Light() {
  this.rad = 2;
  this.x = random(0, width);
  this.y = random(0, height);
  this.f = color(182, 170, 249);


  this.twinkle = function() {
    if (mouseX + 50 > this.x && mouseX - 50 < this.x && mouseY + 50 > this.y && mouseY - 50 < this.y) {
      // this.f = color(249, 245, 170);
      this.f = color(random(255), 10, random(255));

    }
    else {
      this.f = color(182, 170, 249);
    }
  }

  this.display = function() {
    fill(this.f);
    ellipse(this.x, this.y, this.rad, this.rad);
  }
}
