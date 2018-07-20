

function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  clear();
}


function draw() {
  background(255, 5);
  strokeWeight(4);
  line(pmouseX, pmouseY, mouseX, mouseY);
  line(pmouseX, pmouseY + 10, mouseX, mouseY+10);
  line(pmouseX, pmouseY + 20, mouseX, mouseY+20);
  line(pmouseX, pmouseY + 30, mouseX, mouseY+30);
}

function mouseClicked() {
  clear();
}
