const body = document.querySelector("body");

function randomBodyColor() {
  let hue = Math.floor(Math.random() * 256);
  body.style.backgroundColor = "hsl(" + hue + ", 50%, 50%)"; // set random background color
}

const canvas = document.querySelector("#draw");
const context = canvas.getContext("2d");
[canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

const listOfCoordinates = [];
(cellSize = 14), //px
  (numOfLinesX = (canvas.width / cellSize) >> 0), // number of whole lines fit in to canvas
  (numOfLinesY = (canvas.height / cellSize) >> 0); // number of whole lines fit in to canvas
let coordinates = [];

function getCoordinates() {
  for (let i = 0; i <= numOfLinesY; i++) {
    let y = i * cellSize;
    for (let j = 0; j <= numOfLinesX; j++) {
      let x = j * cellSize;
      coordinates.push({ x: x, y: y, x2: "", y2: "", angle: "" });
    }
  }
}

function drawLines(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.lineWidth = 2;

  for (let i = 0; i < coordinates.length; i++) {
    context.beginPath();
    coordinates[i].x2 = coordinates[i].x + cellSize;
    coordinates[i].y2 = coordinates[i].y + cellSize;

    switch (pickRandomSide()) {
      case 0: // stroke top
        context.moveTo(coordinates[i].x, coordinates[i].y);
        context.lineTo(coordinates[i].x2, coordinates[i].y);
        break;
      case 1: // stroke right
        context.moveTo(coordinates[i].x, coordinates[i].y2);
        context.lineTo(coordinates[i].x, coordinates[i].y2);
        break;
      case 2: // stroke bottom
        context.moveTo(coordinates[i].x, coordinates[i].y2);
        context.lineTo(coordinates[i].x2, coordinates[i].y2);
        break;
      case 3: // stroke left
        context.moveTo(coordinates[i].x, coordinates[i].y);
        context.lineTo(coordinates[i].x, coordinates[i].y2);
        break;
    }
    context.strokeStyle = "black";
    context.stroke();
  }
}

function pickRandomSide() {
  return Math.floor(Math.random() * 4);
}

getCoordinates();
drawLines();
randomBodyColor();

body.addEventListener("click", function() {
  drawLines();
  randomBodyColor();
});
