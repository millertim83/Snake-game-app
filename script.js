let canvas;
let canvasContext;

let snakePositionX = 50


window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    
    setInterval(drawEverything, 50);
    
    
}



function drawEverything() {
    snakePositionX = snakePositionX + 7;
    
    //color canvas
    colorRect(0, 0, canvas.width, canvas.height, 'gray');

    //draw snake
    colorRect(snakePositionX, 200, 40, 15, 'green');

    //draw apple
    colorCircle(200, 400, 5, 'yellow');
}

function colorCircle(centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = 'red'
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, 10, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function moveSnake() {
    snakePositionX = snakePositionX + 10;
}