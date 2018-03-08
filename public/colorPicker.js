var socket = io();

function setup() {
  var cnv = createCanvas(document.getElementById('colorPickDOM').clientWidth, document.getElementById('colorPickDOM').clientHeight);
  cnv.parent('colorPickDOM');
  noStroke();
  smooth();

  socket.on('update', (data)=>{
    fill(122, 122, 0);
    ellipse(data.x, data.y, brushSize, brushSize);
  })
}

var Y_AXIS = 1;
var X_AXIS = 2;

function draw() {
  setGradient(0, 0, width/6, height, color(255, 0, 0), color(255, 255, 0), X_AXIS);
  setGradient(width/6, 0, width/6, height, color(255, 255, 0), color(0, 255, 0), X_AXIS);
  setGradient(width*(2/6), 0, width/6, height, color(0, 255, 0), color(0, 255, 255), X_AXIS);
  setGradient(width*(3/6), 0, width/6, height, color(0, 255, 255), color(0, 0, 255), X_AXIS);
  setGradient(width*(4/6), 0, width/6, height, color(0, 0, 255), color(255, 0, 255), X_AXIS);
  setGradient(width*(5/6), 0, width/6, height, color(255, 0, 255), color(255, 0, 0), X_AXIS);
}

function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == X_AXIS) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}

function mouseDragged() {
  if(eraserSelected){
    fill(255, 255, 255);
  } else if(penSelected){
    fill(0, 0, 0);
  }
  ellipse(mouseX, mouseY, brushSize, brushSize);

  socket.emit('drawn', { x: mouseX, y: mouseY });
}