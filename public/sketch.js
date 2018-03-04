var brushSize = 5;
var maxBrushSize = 40;
var brushSizeIndicator;
var penSelected = true;
var eraserSelected = false;

function updateBrushSize(value){
  brushSize += value;
  brushSizeIndicator.style.width = brushSize;
  brushSizeIndicator.style.height = brushSize;
  brushSizeIndicator.style.marginLeft = -brushSize/2;
  brushSizeIndicator.style.marginTop = 26 - brushSize/2;
}

function setup() {
  var cnv = createCanvas(document.getElementById('DRAW').clientWidth, document.getElementById('DRAW').clientHeight);
  cnv.parent('DRAW');
  noStroke();
  smooth();

  document.getElementById('newButton').addEventListener('click', ()=>{
    clear();
    background(255, 255, 255);
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
}


function draw() {
  
}

function mouseDragged() {
  if(eraserSelected){
    fill(255, 255, 255);
  } else if(penSelected){
    fill(0, 0, 0);
  }
    ellipse(mouseX, mouseY, brushSize, brushSize);
}