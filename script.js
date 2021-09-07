const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');
let score = document.getElementById('score');
let gameOverScreen = document.getElementById('game-over');
let newGameBtn = document.getElementById('new-game');

GRID_SIZE = 20;

let apple = {
    x: getRandomX(),  
    y: getRandomY()
}

let snake = {
    body: [{x: 50, y: 70},
        {x: 70, y: 70}],
    direction: '' 
}

score.textContent = 0

window.onload = function() {
    setInterval(() => {
        moveSnake();
        drawCanvas();
        drawApple();
        drawSnake();
        eatApple();
        isSnakeTouchingItself();
        determineBorderCollision();
    }, 100);
        
        getRandomX();
        getRandomY();
}

function drawCanvas() {    
    colorRect(0, 0, canvas.width, canvas.height, 'gray');
}

function drawSnake() {
    snake.body.forEach(({x, y}) => {
        colorRect(x, y, GRID_SIZE, GRID_SIZE, 'lime');
    });
}
    
function drawApple() { 
    colorCircle(apple.x, apple.y, GRID_SIZE / 2, 'red');
}

function eatApple() {
    const dx = apple.x - snake.body[0].x;
    const dy = apple.y - snake.body[0].y;
    
    if (dx == GRID_SIZE / 2 && dy == GRID_SIZE / 2 ) {
        score.textContent = parseInt(score.textContent) + 1;
        snake.body.push({ x: null, y: null });
        apple.x = getRandomX();
        apple.y = getRandomY();
        
    }
}

function getRandomX() {
    return Math.floor((Math.random() * 39) + 1) * GRID_SIZE;
}
function getRandomY() {
    return Math.floor((Math.random() * 29) + 1) * GRID_SIZE;
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
    if (event.code === 'ArrowLeft' && snake.direction !== 'right') {
        snake.direction = 'left';
    }
    if (event.code === 'ArrowUp' && snake.direction !== 'down') {
        snake.direction = 'up';
    }
    if (event.code === 'ArrowRight' && snake.direction !== 'left') {
        snake.direction = 'right';
    }
    if (event.code === 'ArrowDown' && snake.direction !== 'up') {
        snake.direction = 'down';
    }
    
}

function moveSnake() {
    for (let i = snake.body.length - 1; i > 0; i--) {
        snake.body[i] = Object.assign(snake.body[i], snake.body[i-1]);
    }
    
        switch(snake.direction) {
            case 'left': 
                snake.body[0].x -= GRID_SIZE;
                    break;

            case 'up': 
                snake.body[0].y -= GRID_SIZE;
                    break;

            case 'right': 
                snake.body[0].x += GRID_SIZE;
                    break;

            case 'down': snake.body[0].y += GRID_SIZE;
        }
    
}

function determineBorderCollision () {
    if (snake.body[0].x + GRID_SIZE >= canvas.width || snake.body[0].x <= 0
        || snake.body[0].y <= 0 || snake.body[0].y + GRID_SIZE >= canvas.height) {
        snake.direction = ''; 
        gameOverScreen.style.display = 'block'; 
    }
}

function isSnakeTouchingItself() {
    if (snake.direction != '') {
        for (let i = 1; i < snake.body.length; i++) {
            if (snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
                snake.direction = '';
                gameOverScreen.style.display = 'block'; 
            }
        }
    }
}

newGameBtn.addEventListener('click', restartGame);
function restartGame() {
    score.textContent = 0;
    snake.direction = '';
     snake.body = [
        {x: 50, y: 70},
        {x: 70, y: 70}
    ]
    apple.x = getRandomX();
    apple.y = getRandomY();
    gameOverScreen.style.display = 'none';
}

