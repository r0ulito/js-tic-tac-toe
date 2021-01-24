const cells = document.querySelectorAll('.cell');
const winnerParentEl = document.querySelector('.winner');
const winnerChildEl = document.querySelector('.winner .text');
const humanPlayer = "X";
const botPlayer = "O";
let startBoard = [];
let possibleMoves = [];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();


function startGame() {
    winnerParentEl.style.display = 'none';
    startBoard = Array.from({length : 9}, (v, k) => k);
    cells.forEach(el => {
        el.innerText = '';
        el.addEventListener('click', playerClickAction, false);
        el.style.removeProperty('background-color');
    });

};

function playerClickAction(event) {    
    playerAction(event.target.id, humanPlayer);
    possibleMoves = startBoard.filter(elem => typeof elem == 'number');
    const randomIndex =  Math.floor(Math.random()*possibleMoves.length);
    playerAction(possibleMoves[randomIndex], botPlayer);
};

function playerAction(id, player) {
    const cell = document.getElementById(id);
    cell.removeEventListener('click', playerClickAction);
    cell.innerText = player;
    startBoard[id] = player;
    const gameState = isPlayerWinner(startBoard, player);
    if(gameState) {
        gameEnd(gameState);
    }
};

function isPlayerWinner(board, player) {
    const plays = board.reduce((array, elem, index) => (elem === player) ? array.concat(index) : array, []);
    let gameState = null;
    for(const [index, winning] of winningCombinations.entries()) {
        if(winning.every(elem => plays.indexOf(elem) > -1)) {
            gameState = {
                index: index,
                player: player
            };
            break;
        }
    }
    return gameState
}

function gameEnd(gameState) {
    const color = (gameState.player === humanPlayer ? "lightblue" : "salmon");
    cells.forEach((elem) => {
        elem.removeEventListener('click', playerClickAction);
    });

    for(const index of winningCombinations[gameState.index]) {
        const cell = document.getElementById(index);
        cell.style.backgroundColor = color;
    };

    winnerChildEl.innerText = gameState.player === humanPlayer ? 'You win !!!' : 'You lose !!!';
    winnerParentEl.style.display = "block";
}



