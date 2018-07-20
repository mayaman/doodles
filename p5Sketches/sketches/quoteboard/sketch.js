var words = [];
var quote;

var x, y;

var i = 0;

function mouseClicked() { 
  x = mouseX;
  y = mouseY;
  words[i] = prompt("who said what?");
  redraw();
  i++;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noLoop();
}

function draw() {
  fill(0);
  if (words[i] != null) {
    textSize(25);
    quote = text('"' + words[i] + '"', x, y);
  }

  for(var i = 0; i < words.length; i++) {
    if (mouseIsPressed && ) {

    }
  }
}
