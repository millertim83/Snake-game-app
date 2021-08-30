let canvas;
let canvasContext;

let snakeDirection = 'right';
let snakeBody = [
    {x: 60, y: 60},
    {x: 80, y: 60}
]

let appleX = getRandomX();
let appleY = getRandomY();
let appleIsEaten = false;

let isGameOver = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    console.log(appleX);
    console.log(appleY);

    
    
    setInterval(() => {
        eatApple();
        //determineBorderCollision();
        moveSnake()
        drawCanvas();
        drawSnake();
        drawApple();
    }, 250);
    //setInterval(addSnakeLink, 1000);
    
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

//apple functions
function eatApple() {
    if (snakeBody[0].x === appleX && snakeBody[0].y === appleY) {
        //appleX = getRandomX();
        //appleY = getRandomY();
        console.log('apple has been eaten');
        drawApple();
    }
}

/*function moveApple() {
    if (isAppleEaten) {
    appleX = getRandomX();
    appleY = getRandomY();
    }
}*/

function getRandomX() {
    return Math.floor((Math.random() * 40)) * 20;
}
function getRandomY() {
    return Math.floor((Math.random() * 30)) * 20;
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
}

/*function addSnakeLink() {
    let newSnakeLink = {x: snakeBody[snakeBody.length -1].x, y: snakeBody[snakeBody.length -1].y}
    snakeBody.push(newSnakeLink);
}
*/

function determineBorderCollision () {
    if (snakeBody[0].x >= canvas.width || snakeBody[0].x <= 0
        || snakeBody[0].y >= canvas.height || snakeBody[0].y <=0) {
        let snakeDirection = '';
        isGameOver = true;
        console.log('Game Over!');
    }
}






