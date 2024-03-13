// John Bass, Lillian Layne, other friends, and youtube 


// cached items
const board = document.getElementById('board');
const score1 = document.getElementById('playerScores1');
const score2 = document.getElementById('playerScores2');
const score3 = document.getElementById('playerScores3');
const gridSize = 20;

// varibles
let snake = [{ x: 10, y: 10 }];
let food = foodSpawner()
let direction = 'right';
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

draw();

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

    snake.unshift(head);

    snake.pop();

}


// setInterval(() => {
//     move();
//     draw();
// }, 200);