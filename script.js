let canvas;
let canvasContext;
let score = 0;



let snakeDirection = 'right';
let snakeBody = [
    {x: 50, y: 70},
    {x: 70, y: 70}
]


let appleX = getRandomX();
let appleY = getRandomY();
let appleIsEaten = false;

let isGameOver = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(() => {
        
        determineBorderCollision();
        moveSnake();
        drawCanvas();
        drawSnake();
        drawApple();
        eatApple();
        }, 300);
        getRandomX();
        getRandomY();
        console.log(appleX);
        console.log(appleY);
}
      
function drawCanvas() {    
    colorRect(0, 0, canvas.width, canvas.height, 'gray');
}

function drawSnake() {
    snakeBody.forEach(snakeBodyLink => {
        colorRect(snakeBodyLink.x, snakeBodyLink.y, 20, 20, 'lime');
    });
}
    
function drawApple() { 
    colorCircle(appleX, appleY, 10, 'red');
}

function eatApple() {
    const dx = appleX - snakeBody[0].x;
    const dy = appleY - snakeBody[0].y;
    
    if (dx == 10 && dy == 10) {
        document.getElementById('score').innerHTML = score;
        score = score + 1;
        snakeBody.push({ x: null, y: null });
        appleX = getRandomX();
        appleY = getRandomY();
    
    }
}



function getRandomX() {
    return Math.floor((Math.random() * 39)) * 20;
}
function getRandomY() {
    return Math.floor((Math.random() * 29)) * 20;
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

document.addEventListener('keydown', determineSnakeDirection);

function determineSnakeDirection(event) {
    //debugger;
    console.log(event.code);
    if (event.code === 'ArrowLeft' && snakeDirection !== 'right') {
        snakeDirection = 'left';
    }
    if (event.code === 'ArrowUp' && snakeDirection !== 'down') {
        snakeDirection = 'up';
    }
    if (event.code === 'ArrowRight' && snakeDirection !== 'left') {
        snakeDirection = 'right';
    }
    if (event.code === 'ArrowDown' && snakeDirection !== 'up') {
        snakeDirection = 'down';
    }
    
}

function moveSnake() {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = Object.assign(snakeBody[i], snakeBody[i-1]);
        console.log(snakeBody[0].x, snakeBody[0].y);
    }
    
        switch(snakeDirection) {
            case 'left': 
                snakeBody[0].x -= 20;
                    break;

            case 'up': 
                snakeBody[0].y -= 20;
                    break;

            case 'right': 
                snakeBody[0].x += 20;
                    break;

            case 'down': snakeBody[0].y += 20;
        }
    
}

function determineBorderCollision () {
    if (snakeBody[0].x + 20 >= canvas.width || snakeBody[0].x <= 0
        || snakeBody[0].y <= 0 || snakeBody[0].y + 20 >= canvas.height) {
        snakeDirection = '';
        isGameOver = true;
        console.log('Game Over!');  
    }
}


  