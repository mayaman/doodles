
var drawing;
var line_offset = 15;
var stroke_weight = 15;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(170, 230, 249);
  loop(180);
  drawing = false;
}


function draw() {
  background(170, 230, 249, 1);
  strokeWeight(stroke_weight);
  strokeJoin(ROUND);

  if (drawing) {

    // Red
    stroke(252, 117, 117);
    line(pmouseX+line_offset*0.2*3, pmouseY - 3*line_offset, mouseX+line_offset*0.2*3, mouseY-3*line_offset);

    // Orange
    stroke(252, 171, 117);
    line(pmouseX+line_offset*0.2*2, pmouseY - 2*line_offset, mouseX+line_offset*0.2*2, mouseY-2*line_offset);


    // Yellow
    stroke(252, 232, 117);
    line(pmouseX+line_offset*0.2, pmouseY - line_offset, mouseX+line_offset*0.2, mouseY-line_offset);


    // Green
    stroke(142, 221, 120);
    line(pmouseX+line_offset*0.2, pmouseY, mouseX+line_offset*0.2, mouseY);

    // Blue
    stroke(45, 144, 211);
    line(pmouseX+line_offset*0.2*2, pmouseY + 2*line_offset, mouseX+line_offset*0.2*2, mouseY+2*line_offset);

    // Indigo
    stroke(77, 77, 170);
    line(pmouseX+line_offset*0.2, pmouseY + line_offset, mouseX+line_offset*0.2, mouseY+line_offset);

    // Violet
    stroke(205, 72, 216);
    line(pmouseX+line_offset*0.2*3, pmouseY + 3*line_offset, mouseX+line_offset*0.2*3, mouseY+3*line_offset);

    }
}

function mouseClicked() {
  // clear();
  console.log('clicked');
  drawing = !drawing;
}

function keyPressed(key) {
  console.log(key);

  if (key.key == ' ') {
    console.log('space');
    background(170, 230, 249);
  } else {
    stroke_weight = 50;
    line_offset = 50;
  }


}

// function mouseDown() {
//   console.log('mouse down');
//   drawing = true;
// }
//
// function mouseUp() {
//   console.log('mouse up');
//   drawing = false;
// }
