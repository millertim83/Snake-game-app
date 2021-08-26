let canvas;
let canvasContext;

let snakeDirection = 'right';
let snakeBody = [
    {x: 50, y: 50},
    {x: 70, y: 50}
]

let appleX = getRandomX();
let appleY = getRandomY();
let appleIsEaten = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(drawEverything, 250);
    setInterval(moveSnake, 250);
    getRandomX();
    getRandomY();

    
}
       


function drawEverything() {
    //draw canvas
    colorRect(0, 0, canvas.width, canvas.height, 'gray');

    //draw snake
    snakeBody.forEach(snakeBodyLink => {
        colorRect(snakeBodyLink.x, snakeBodyLink.y, 20, 20, 'lime');
    });
    
    //draw apple
    colorCircle(appleX, appleY, 5, 'red');
}
    
//apple functions
/*function isAppleEaten() {
    if (snakeBody[0].x == appleX && snakeBody[0].y == appleY) {
        console.log('apple has been eaten');
        return true;
    } return false;
}

function moveApple() {
    if (isAppleEaten) {
    appleX = getRandomX();
    appleY = getRandomY();
    }
}*/

function getRandomX() {
    return Math.floor((Math.random() * 800));
}
function getRandomY() {
    return Math.floor((Math.random() * 600));
}

//Helper functions to draw board, snake, apple, and get random coordinates
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



document.addEventListener('keydown', determineSnakeDirection);

function determineSnakeDirection(e) {
    if (e.code == 'ArrowLeft') {
        if (snakeDirection ==='right') {
            return;
        }
        snakeDirection === 'left';
        console.log('moving left');
    }
    if (e.code == 'ArrowUp') {
        if (snakeDirection === 'down') {
            return;
        }
        snakeDirection === 'up';
    }
    if (e.code == 'ArrowRight') {
        if (snakeDirection === 'left') {
            return;
        }
        snakeDirection === 'right';
    }
    if (e.code == 'ArrowDown') {
        if (snakeDirection === 'up') {
            return;
        }
        snakeDirection === 'down';
    }
}

function moveSnake() {
    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = Object.assign(snakeBody[i], snakeBody[i-1]);
    }
    switch(snakeDirection) {
        case 'left': snakeBody[0].x = snakeBody[0].x - 20;
                     snakeBody[0].y = snakeBody[0].y;
                break;

        case 'up': snakeBody[0].y = snakeBody[0].y - 20;
                   snakeBody[0].x = snakeBody[0].x;
                break;
        case 'right': snakeBody[0].x = snakeBody[0].x + 20;
                      snakeBody[0].y = snakeBody[0].y;
                break;
        case 'down': snakeBody[0].y = snakeBody[0].y + 20;
                     snakeBody[0].x = snakeBody[0].x;
    }
};
