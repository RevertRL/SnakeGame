// John Bass, Lillian Layne, other friends, and youtube 


// cached items
const board = document.getElementById('board');
const score1 = document.getElementById('playerScores1');
const score2 = document.getElementById('playerScores2');
const score3 = document.getElementById('playerScores3');
const gridSize = 20;
const playAgain = document.getElementById('playAgain');
const gameOverMsg = document.getElementById('gameOver')

// varibles
let snake = [{ x: 10, y: 10 }];
let food = foodSpawner()
let direction = 'right';
let gameInt;
let gameSpeed = 200;
let gameStarted = false;
let gameOver = false;
let highScores = [];

// functions

// drawing everything on game bored
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
}

function drawSnake() {
    snake.forEach((segment) => {
        const snakeEl = createGameElement('div', 'snake');
        setPosition(snakeEl, segment);
        board.appendChild(snakeEl);
    });
};

function createGameElement(tag, piece) {
    const gameEl = document.createElement(tag);
    gameEl.className = piece;
    return gameEl;
}

function setPosition(gameEl, position) {
    gameEl.style.gridColumn = position.x;
    gameEl.style.gridRow = position.y;
}

function drawFood() {
        const foodEl = createGameElement('div', 'food');
        setPosition(foodEl, food);
        board.appendChild(foodEl);
}

function foodSpawner() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return { x, y };
}

// player movement

function move() {
    const head = {...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    if (checkCollision(head)) {
        endGame();
        return;
    }

    snake.unshift(head);

// how snake grows when it eats
    if (head.x === food.x && head.y === food.y) {
        food = foodSpawner();
        clearInterval(gameInt);
        gameInt = setInterval(() => {
            move();
            draw();
        }, gameSpeed);
    } else {
        snake.pop();
    }
}
//start game function
function startGame() {
    gameStarted = true;
    gameInt = setInterval(() => {
        move();
        draw();
    }, gameSpeed);
}
// keyboard inputs
function handleKeyPress(event) {
    if (!gameInt) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
            direction = 'up';
            break;
            case 'ArrowDown':
            direction = 'down';
            break;
            case 'ArrowRight':
            direction = 'right';
            break;
            case 'ArrowLeft':
            direction = 'left';
            break;
        }
    }
}

document.addEventListener('keydown' , handleKeyPress);

//checking for collision
function checkCollision(head) {
    return (
        head.x < 0 ||
        head.x >= gridSize + 1 ||
        head.y < 0 ||
        head.y >= gridSize + 1 ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function endGame() {
    clearInterval(gameInt);
    gameOver = true;
    gameOverMsg.innerText = ('Game Over! Your score: ' + (snake.length - 1));
    updateHighScores();
    playAgain.style.display = 'block'; 
}

function resetGame() {
    clearInterval(gameInt);
    snake = [{ x: 10, y: 10 }];
    food = foodSpawner();
    direction = 'right';
    gameOver = false;
    board.innerHTML = '';
    gameOverMsg.innerText = '';
    startGame();
}
    
function updateHighScores() {
    highScores.push(snake.length - 1);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 3);
    score1.innerText = highScores[0] || '-';
    score2.innerText = highScores[1] || '-';
    score3.innerText = highScores[2] || '-';
}

playAgain.addEventListener('click', resetGame);