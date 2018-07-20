
var x_pos;
var y_pos;
var px_pos;
var py_pos;
function setup() {
  createCanvas(windowWidth, windowHeight);
  fill(0);
  clear();
  x_pos = 0;
  y_pos = height/2;
  px_pos = 0;
  py_pos = height/2;
}


var drawingX = true;
var drawingY = false;
function draw() {
  strokeWeight(20);
  fill(0);
  line(px_pos, py_pos, x_pos, y_pos);

  var nextMove = random(0, 3);

  if (nextMove > 2) {
    drawingX = !drawingX;
    drawingY = !drawingY;
  }

  px_pos = x_pos;
  py_pos = y_pos;

  if (drawingX) {
    x_pos++;
  } else if (drawingY) {
    y_pos-=random(-100, 100);
  }
}

function mouseClicked() {
  clear();
}
