// John Bass, Lillian Layne, other friends, and youtube 


// cached items
const board = document.getElementById('board');
const score1 = document.getElementById('playerScores1');
const score2 = document.getElementById('playerScores2');
const score3 = document.getElementById('playerScores3');

// varibles
let snake = [{x: 10, y: 10 }];
let highScores = []

// functions

// drawing everything on game bored
draw(() => {
    board.innerHTML = '';
    drawSnake();
})

drawSnake(() =>{
    snake.forEach((segment) => {
        const snakeEl = createGameElement('div', 'snake');
    });
});

createGameElement((tag, className) => {
    const gameEl = document.createElement(tag);
})



