let canvas;
let canvasContext;
let score = document.getElementById('score').innerHTML = parseInt(0);
let gameOverScreen = document.getElementById('game-over');
let newGameBtn = document.getElementById('new-game');

let snakeDirection = '';
let snakeBody = [
    {x: 50, y: 70},
    {x: 70, y: 70}
]

let appleX = getRandomX();
let appleY = getRandomY();
let appleIsEaten = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setInterval(() => {
        moveSnake();
        drawCanvas();
        drawApple();
        drawSnake();
        eatApple();
        isSnakeTouchingItself();
        determineBorderCollision();
    }, 300);
        
        getRandomX();
        getRandomY();
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
        score += 1;
        document.getElementById('score').innerHTML = score;
        snakeBody.push({ x: null, y: null });
        appleX = getRandomX();
        appleY = getRandomY();
        
    }
}

function getRandomX() {
    return Math.floor((Math.random() * 39) + 1) * 20;
}
function getRandomY() {
    return Math.floor((Math.random() * 29) + 1) * 20;
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
        gameOverScreen.style.display = 'block'; 
    }
}

function isSnakeTouchingItself() {
    if (snakeDirection != '') {
        for (let i = 1; i < snakeBody.length; i++) {
            if (snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
                snakeDirection = '';
                gameOverScreen.style.display = 'block'; 
            }
        }
    }
}

newGameBtn.addEventListener('click', restartGame);
function restartGame() {
    score = document.getElementById('score').innerHTML = parseInt(0);
    snakeDirection = '';
     snakeBody = [
        {x: 50, y: 70},
        {x: 70, y: 70}
    ]
    appleX = getRandomX();
    appleY = getRandomY();
    gameOverScreen.style.display = 'none';
}

