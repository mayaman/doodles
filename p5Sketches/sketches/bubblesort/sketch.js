var s = 1;
var rowOfBubs;
var allBubs = [];
var numberOfBubsPerRow = 20;
var numberOfRows = 30;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  background(30, .38, .96);
  ellipseMode(CENTER);
  for (let i = 0; i < numberOfRows; i++) {
    rowOfBubs = new RowOfBubbles();
    for (let j = 0; j <= rowOfBubs.numberOfBubsPerRow; j++) {
      rowOfBubs.addBub(new Bubble(width/(rowOfBubs.numberOfBubsPerRow + 2) + j*70, (i + 1)*height/ (numberOfRows + 2)), j);
    }
    allBubs[i] = rowOfBubs;
  }
}

var swapping = false;
var bX, fX;
function draw() {
  background(309, 38, 96);

  allBubs.forEach( row => {
    row.sort();
  });


}

class RowOfBubbles {

  constructor() {
    this.bubs = [];
    this.numberOfBubsPerRow = 12;
    this.currentIndex = 0;
    this.nextIndex = 1;
    this.swapping = false;

    this.fX;
    this.bX;
  }

  addBub(b, index) {
    this.bubs[index] = b;
  }

  swapBubs(b1, b2) {
    var temp = this.bubs[b1];
    this.bubs[b1] = this.bubs[b2];
    this.bubs[b2] = temp;
  }

  sort() {
    this.bubs.forEach(b => {
      b.display();
    });
    var b1 = this.bubs[this.currentIndex];
    var b2 = this.bubs[this.nextIndex]

    if (b1.rad > b2.rad && !this.swapping) {
      this.fX = b1.x;
      this.bX = b2.x;
      this.swapping = true;
    } else if (this.swapping) {
      b1.moveBack(this.bX);
      b2.moveForward(this.fX);
      if (!b1.swapping && !b2.swapping) {
        this.swapBubs(this.currentIndex, this.nextIndex);
        this.swapping = false;
        this.currentIndex = 0;
        this.nextIndex = 1;
      }
    } else {
      this.currentIndex = this.nextIndex;
      this.nextIndex = (this.nextIndex+1)%(this.numberOfBubsPerRow + 1);
    }
  }
}

// star class
class Bubble {
  constructor(x, y) {
    this.rad = random(20, 80);
    this.x = x;
    this.y = y;
    this.f = color(map(this.rad, 20, 80, 184, 360), random(50, 100), random(40, 60));
    this.swapping = false;
    this.swappingRate = 10;
    ellipseMode(CENTER);
  }

  display() {
    noStroke();
    fill(this.f);
    ellipse(this.x, this.y, this.rad, this.rad);
  }

  moveBack(newXPos) {
    this.swapping = true;
    if (this.x < newXPos) {
      this.x+=this.swappingRate;
    } else {
      this.swapping = false;
    }
  }

  moveForward(newXPos) {
    this.swapping = true;
    if (this.x > newXPos) {
      this.x-=this.swappingRate;
    } else {
      this.swapping = false;
    }
  }
}
