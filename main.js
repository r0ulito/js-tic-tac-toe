const cells = document.querySelectorAll('.cell');
const winnerParentEl = document.querySelector('.winner');
const winnerChildEl = document.querySelector('.winner .text');
const humanPlayer = "X";
const botPlayer = "O";
let startBoard = [];
let possibleMovesArray = [];
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


function possibleMoves() {
    return startBoard.filter(elem => typeof elem == 'number')
}


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
    possibleMovesArray = possibleMoves();
    const randomIndex =  Math.floor(Math.random()*possibleMovesArray.length);
    if(!isGameDraw() && isPlayerWinner(startBoard, humanPlayer) === null) {
        playerAction(possibleMovesArray[randomIndex], botPlayer);
    }
    
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

function isGameDraw() {
	if(possibleMovesArray.length === 0) {
        if(isPlayerWinner(startBoard, humanPlayer) !== null || isPlayerWinner(startBoard, botPlayer) !== null) {
            return false;
        }
		cells.forEach(el => el.style.backgroundColor = 'rgba(0, 255, 0, 0.5)');
		winnerChildEl.innerText = 'Draw !';
		winnerParentEl.style.display = 'block';
		return true;
	}
	return false;
}



