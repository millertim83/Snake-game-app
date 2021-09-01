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
        //logSnakePosition();
        }, 300);
        getRandomX();
        getRandomY();
}

//function logSnakePosition() {
    //console.log(snakeBody[snakeBody.length - 1].x);
    //console.log(snakeBody[snakeBody.length -1].y);
    
//}
       
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
    if (snakeDirection == 'down') {
        if (snakeBody[0].x + 10  === appleX && snakeBody[0].y + 30 === appleY) {
            //snakeBody.push({x: (snakeBody[0].x), y: (snakeBody[snakeBody.length -1].y)});
            console.log('apple has been eaten');
            score = score + 1;
        }
        
    }
    if (snakeDirection == 'up') {
        if (snakeBody[0].x + 10  === appleX && snakeBody[0].y - 10 === appleY) {
            //snakeBody.push({x: (snakeBody[0].x), y: (snakeBody[snakeBody.length -1].y)});
            console.log("apple has been eaten");
            score = score + 1;
        }
        
        
    }
    if (snakeDirection == 'left') {
        if (snakeBody[0].x - 10  === appleX && snakeBody[0].y + 10 === appleY) {
            //snakeBody.push({x: (snakeBody[snakeBody.length -1].x), y: (snakeBody[0].y)});
            console.log("apple has been eaten");
            score = score + 1;
        }
    }
    if (snakeDirection == 'right') {
        if (snakeBody[0].x + 30  === appleX && snakeBody[0].y + 10 === appleY) {
            //snakeBody.push({x: (snakeBody[snakeBody.length -1].x), y: (snakeBody[0].y)});
            console.log("apple has been eaten");
            score = score + 1;
        }
     
       
    }
    document.getElementById('score').innerHTML = score;

    
    /*if (snakeBody[0].x === appleX && snakeBody[0].y === appleY) {
        //appleX = getRandomX();
        //appleY = getRandomY();
        console.log('apple has been eaten');
        drawApple();
    } */
    
}

/*function moveApple() {
    if (isAppleEaten) {
    appleX = getRandomX();
    appleY = getRandomY();
    }
}*/

function getRandomX() {
    return Math.floor((Math.random() * 39)) * 20;
}
function getRandomY() {
    return Math.floor((Math.random() * 29)) * 20;
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

function determineBorderCollision () {
    if (snakeBody[0].x + 20 >= canvas.width || snakeBody[0].x <= 0
        || snakeBody[0].y <= 0 || snakeBody[0].y + 20 >= canvas.height) {
        snakeDirection = '';
        isGameOver = true;
        console.log('Game Over!');  
    }
}
