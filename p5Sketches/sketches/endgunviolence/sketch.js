var s = 1;
var rects;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  colorMode(HSB);

  rects = [];
  for (let i = 0; i <= 96; i++) {
    fill(random(255), random(255), random(255));
    rects.push(new Life);
  }
}

function draw() {
  background(255);
  rects.forEach(r => {
    r.display();
  });

  fill(255);
  textSize(100);
  text("end gun violence", width/2 - 300, height/2)
}

// star class
function Life() {
  this.rad = 1;
  this.x = random(0, width);
  this.y = random(0, height);
  this.f = color(random(16, 30), random(50, 100), random(50, 100));
  this.growing = true;


  this.twinkle = function() {
    if (mouseX + 50 > this.x && mouseX - 50 < this.x && mouseY + 50 > this.y && mouseY - 50 < this.y) {
      this.f = 255;
    }
    else {
      this.f = 100;
    }
  }

  this.display = function() {
    if (this.rad < width/3 && this.growing) {
      this.rad+=1;
    } else if (this.rad > 0) {
      this.growing = false;
      this.rad-=2;
    } else {
      this.growing = true;
    }
    noStroke();
    fill(this.f);
    ellipse(this.x, this.y, this.rad, this.rad);
  }
}
