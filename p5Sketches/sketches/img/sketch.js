
var photo;

function setup() {
  createCanvas(windowWidth, windowHeight);

  photo = loadImage("http://images.clipartpanda.com/scandal-clipart-flower-clip-art9.png");
}

function draw() {
  image(photo, 0, 0);
}