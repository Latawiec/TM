var brushSize = 5;
var maxBrushSize = 40;
var brushSizeIndicator;
var penSelected = true;
var eraserSelected = false;
var color = [0, 0, 0];

var socket = io();

function updateBrushSize(value){
  brushSize += value;
  brushSizeIndicator.style.width = brushSize;
  brushSizeIndicator.style.height = brushSize;
  brushSizeIndicator.style.marginLeft = -brushSize/2;
  brushSizeIndicator.style.marginTop = 26 - brushSize/2;
}

var drawingRegion = function(p){

  var withinRegion = false;

  p.setup = function() {
    p.noStroke();
    p.smooth();

    var canvas = p.createCanvas(document.getElementById('DRAW').clientWidth, document.getElementById('DRAW').clientHeight);

    canvas.mousePressed(()=>{
      withinRegion = true;
      if(withinRegion)
      {
          if(eraserSelected){
          p.fill(255, 255, 255);
        } else if(penSelected){
          p.fill(color);
        }
        p.ellipse(p.mouseX, p.mouseY, brushSize, brushSize);
        socket.emit('drawn', { x: p.mouseX, y: p.mouseY });
      }
    })

    canvas.mouseReleased(()=>{
      withinRegion = false;
    })

    document.getElementById('newButton').addEventListener('click', ()=>{
      p.clear();
      p.background(255, 255, 255);
    });

    document.getElementById('penButton').addEventListener('click', ()=>{
      penSelected = true;
      eraserSelected = false;
    });

    document.getElementById('eraserButton').addEventListener('click', ()=>{
      penSelected = false;
      eraserSelected = true;
    });

    brushSizeIndicator = document.getElementById('brushSizeIndicator');
    updateBrushSize(0);

    document.getElementById('increaseSize').addEventListener('click', ()=>{
      if(brushSize <= maxBrushSize){
        updateBrushSize(1);
      }
    });

    document.getElementById('decreaseSize').addEventListener('click', ()=>{
      if(brushSize > 1){
        updateBrushSize(-1);
      }
    });

    socket.on('update', (data)=>{
      p.fill(data.color);
      p.ellipse(data.x, data.y, brushSize, brushSize);
    })
  }

  p.mouseDragged = ()=>{
    if(withinRegion)
    {
        if(eraserSelected){
        p.fill(255, 255, 255);
      } else if(penSelected){
        p.fill(color);
      }
      p.ellipse(p.mouseX, p.mouseY, brushSize, brushSize);
      socket.emit('drawn', { x: p.mouseX, y: p.mouseY, color: color });
    }
  }
}

var colorPicker = function(p){

  var withinRegion = false; 

  p.setup = function() {
    var canvas = p.createCanvas(document.getElementById('colorPickDOM').clientWidth, document.getElementById('colorPickDOM').clientHeight);
    p.noStroke();
    p.smooth();

    canvas.mousePressed(()=>{
      withinRegion = true;
      color = p.get(p.mouseX, p.mouseY);
    });

    canvas.mouseReleased(()=>{
      withinRegion = false;
    })
  }
  
  var Y_AXIS = 1;
  var X_AXIS = 2;
  
  p.draw = function() {
    setGradient(0,             0, p.width/6, p.height, p.color(255, 0, 0),    p.color(255, 255, 0), X_AXIS);
    setGradient(p.width/6,     0, p.width/6, p.height, p.color(255, 255, 0),  p.color(0, 255, 0),   X_AXIS);
    setGradient(p.width*(2/6), 0, p.width/6, p.height, p.color(0, 255, 0),    p.color(0, 255, 255), X_AXIS);
    setGradient(p.width*(3/6), 0, p.width/6, p.height, p.color(0, 255, 255),  p.color(0, 0, 255),   X_AXIS);
    setGradient(p.width*(4/6), 0, p.width/6, p.height, p.color(0, 0, 255),    p.color(255, 0, 255), X_AXIS);
    setGradient(p.width*(5/6), 0, p.width/6, p.height, p.color(255, 0, 255),  p.color(255, 0, 0),   X_AXIS);
  }

  p.mouseDragged = ()=>{
    if(withinRegion){
      color = p.get(p.mouseX, p.mouseY);
    }
  }
  
  function setGradient(x, y, w, h, c1, c2, axis) {
  
    p.noFill();
  
    if (axis == Y_AXIS) {  // Top to bottom gradient
      for (var i = y; i <= y+h; i++) {
        var inter = p.map(i, y, y+h, 0, 1);
        var c = p.lerpColor(c1, c2, inter);
        p.stroke(c);
        p.line(x, i, x+w, i);
      }
    }  
    else if (axis == X_AXIS) {  // Left to right gradient
      for (var i = x; i <= x+w; i++) {
        var inter = p.map(i, x, x+w, 0, 1);
        var c = p.lerpColor(c1, c2, inter);
        p.stroke(c);
        p.line(i, y, i, y+h);
      }
    }
  }
}

new p5(drawingRegion, 'DRAW');
new p5(colorPicker, 'colorPickDOM');