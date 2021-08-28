let canvas;
let canvasContext;

let snakeDirection = 'down';
let snakeBody = [
    {x: 50, y: 50},
    {x: 70, y: 50}
]

let appleX = getRandomX();
let appleY = getRandomY();
let appleIsEaten = false;

let isgameOver = false;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //determineBorderCollision();
    setInterval(() => {
        drawEverything()
        moveSnake()
    }, 250);
    //setInterval(moveSnake, 250);
    //setInterval(addSnakeLink, 1000);
    getRandomX();
    getRandomY();
    //determineSnakeDirection();
    //determineBorderCollision();


    
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
    if (snakeBody[0].x === appleX && snakeBody[0].y === appleY) {
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
    return Math.floor((Math.random() * 795));
}
function getRandomY() {
    return Math.floor((Math.random() * 595));
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
    if (event.code === 'ArrowLeft') {
        // if (snakeDirection = 'right') {
        //     return;
        // }
        snakeDirection = 'left';
        console.log('Move left');
    }
    if (event.keyCode === 'ArrowUp') {
        // if (snakeDirection = 'down') {
        //     return;
        // }
        snakeDirection = 'up';
        console.log('Move up');
    }
    if (event.keyCode === 'ArrowRight') {
        // if (snakeDirection = 'left') {
        //     return;
        // }
        snakeDirection = 'right';
        console.log('Move right');

    }
    if (event.keyCode === 'ArrowDown') {
        // if (snakeDirection = 'up') {
        //     return;
        // }
        snakeDirection = 'down';
        console.log('Move down');
    }
}

function moveSnake() {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = Object.assign(snakeBody[i], snakeBody[i-1]);
    
        switch(snakeDirection) {
            case 'left': 
                snakeBody[i].x -= 20;
                     //snakeBody[0].y = snakeBody[0].y;
                     console.log('moving left');
                break;

            case 'up': snakeBody[i].y -= 20;
                   //snakeBody[0].x = snakeBody[0].x;
                   console.log('moving up');
                break;

            case 'right': snakeBody[i].x += 20;
                      //snakeBody[0].y = snakeBody[0].y;
                      console.log('moving right');
                break;

            case 'down': snakeBody[i].y += 20;
                     //snakeBody[0].x = snakeBody[0].x;
                     console.log('moving down');
        }
    
    }
}

/*function addSnakeLink() {
    let newSnakeLink = {x: snakeBody[snakeBody.length -1].x, y: snakeBody[snakeBody.length -1].y}
    snakeBody.push(newSnakeLink);
}
*/

/*function determineBorderCollision () {
    if (snakeBody[0].x >= canvas.width) {
        isgameOver = true;
        console.log('Game Over!');
    }
} 
*/





