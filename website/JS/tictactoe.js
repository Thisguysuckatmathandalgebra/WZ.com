const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('#status');
const resetButton = document.querySelector('#reset');
const difficultyButtons = document.querySelector('#difficulty-buttons');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let difficulty = 'Normal';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function setDifficulty(level) {
    difficulty = level;
    statusDisplay.textContent = `Difficulty set to ${level}. Player X's turn.`;
    difficultyButtons.style.display = 'none';
    board.style.display = 'grid';
}

function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = 'Game is a draw!';
        gameActive = false;
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500);  // Delay for a more realistic feel
        }
    }
}

function computerMove() {
    let move;

    switch (difficulty) {
        case 'Normal':
            move = normalMove();
            break;
        case 'Medium':
            move = mediumMove();
            break;
        case 'Hard':
            move = hardMove();
            break;
        case 'Insanity':
            move = insanityMove();
            break;
    }

    if (move !== undefined) {
        boardState[move] = 'O';
        cells[move].textContent = 'O';
        checkWin();
        if (gameActive) {
            currentPlayer = 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function normalMove() {
    // Random move
    let availableCells = boardState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function mediumMove() {
    // Block X's winning move or choose a random move
    for (let [a, b, c] of winningConditions) {
        if (boardState[a] === 'X' && boardState[b] === 'X' && !boardState[c]) return c;
        if (boardState[a] === 'X' && boardState[c] === 'X' && !boardState[b]) return b;
        if (boardState[b] === 'X' && boardState[c] === 'X' && !boardState[a]) return a;
    }
    return normalMove();
}

function hardMove() {
    // Win if possible, otherwise block or choose a random move
    for (let [a, b, c] of winningConditions) {
        if (boardState[a] === 'O' && boardState[b] === 'O' && !boardState[c]) return c;
        if (boardState[a] === 'O' && boardState[c] === 'O' && !boardState[b]) return b;
        if (boardState[b] === 'O' && boardState[c] === 'O' && !boardState[a]) return a;
    }
    return mediumMove();
}

function insanityMove() {
    // Minimax algorithm for unbeatable AI
    let bestMove = minimax(boardState, 'O');
    return bestMove.index;
}

function minimax(newBoard, player) {
    const availSpots = newBoard.reduce((acc, val, idx) => val === '' ? acc.concat(idx) : acc, []);

    if (checkWinState(newBoard, 'X')) {
        return { score: -10 };
    } else if (checkWinState(newBoard, 'O')) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        let move = {};
        move.index = availSpots[i];
        newBoard[availSpots[i]] = player;

        if (player === 'O') {
            move.score = minimax(newBoard, 'X').score;
        } else {
            move.score = minimax(newBoard, 'O').score;
        }

        newBoard[availSpots[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWinState(board, player) {
    return winningConditions.some(condition => 
        condition.every(index => board[index] === player)
    );
}

function handleResetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    board.style.display = 'none';
    difficultyButtons.style.display = 'block';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);

// Hide board initially and show only after difficulty is selected
board.style.display = 'none';

function checkWin() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = 'Game is a draw!';
        gameActive = false;
    }
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWin();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500);  // Delay for a more realistic feel
        } else {
            computerMove();
        }
    }
}

function computerMove() {
    let move;

    switch (difficulty) {
        case 'Normal':
            move = normalMove();
            break;
        case 'Medium':
            move = mediumMove();
            break;
        case 'Hard':
            move = hardMove();
            break;
        case 'Insanity':
            move = insanityMove();
            break;
    }   

    if (move !== undefined) {
        boardState[move] = 'O';
        cells[move].textContent = 'O';
        checkWin();
        if (gameActive) {
            currentPlayer = 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        }
    }   
}

function normalMove() {
    // Random move
    let availableCells = boardState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

function mediumMove() {
    // Block X's winning move or choose a random move
    for (let [a, b, c] of winningConditions) {
        if (boardState[a] === 'X' && boardState[b] === 'X' && !boardState[c]) return c;
        if (boardState[a] === 'X' && boardState[c] === 'X' && !boardState[b]) return b;
        if (boardState[b] === 'X' && boardState[c] === 'X' && !boardState[a]) return a;
    }
    return normalMove();
}

function checkWinState(board, player) {
    return winningConditions.some(condition => 
        condition.every(index => board[index] === player)
    );
}
winlist.forEach(win => {
    if (checkWinState(boardState, win)) {
        winlist.forEach(w => {
            if (w !== win) {
                boardState[w] = '';
            }
        });
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    }
});
losytwinlist.forEach(losytwin => {
    if (checkWinState(boardState, losytwin)) {
        losytwinlist.forEach(losyw => {
            if (losyw !== losytwin) {
                boardState[losyw] = '';
            }
        });
        statusDisplay.textContent = `Loser wins!`;
        gameActive = false;
    }
});
ifbuttonclicked.forEach(button => {
    if (button === 'reset') {
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        board.style.display = 'none';
        difficultyButtons.style.display = 'block';
    } else if (button === 'winlist') {
        winlist.forEach(win => {
            if (checkWinState(boardState, win)) {
                winlist.forEach(w => {
                    if (w !== win) {
                        boardState[w] = '';
                    }
                });
                statusDisplay.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
            }
        });
    } else if (button === 'losytwinlist') {
        losytwinlist.forEach(losytwin => {
            if (checkWinState(boardState, losytwin)) {
                losytwinlist.forEach(losyw => {
                    if (losyw !== losytwin) {
                        boardState[losyw] = '';
                    }
                });
                statusDisplay.textContent = `Loser wins!`;
                gameActive = false;
            }
        });
    } else {
        console.log('Invalid button clicked');
        alert('Invalid button clicked');
    }
}); 
ifdrawbuttonclicked.forEach(button => {
    if (button === 'reset') {
        boardState = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
        board.style.display = 'none';
        difficultyButtons.style.display = 'block';
    }   
});
ifgamedrawlist.forEach(gamedraw => {
    if (checkWinState(boardState, gamedraw)) {
        gamedrawlist.forEach(gd => {
            if (gd !== gamedraw) {
                boardState[gd] = '';
            }
        });
        statusDisplay.textContent = `Game Draw!`;
        gameActive = false;
    }
});
iflosytgamedrawlist.forEach(losygamedraw => {
    if (checkWinState(boardState, losygamedraw)) {
        losygamedrawlist.forEach(losygd => {
            if (losygd !== losygamedraw) {
                boardState[losygd] = '';
            }
        });
        statusDisplay.textContent = `Loser Game Draw!`;
        gameActive = false;
    }
});
iflosytgamedrawlist.forEach(losygamedraw => {
    if (checkWinState(boardState, losygamedraw)) {
        losygamedrawlist.forEach(losygd => {
            if (losygd !== losygamedraw) {
                boardState[losygd] = '';
            }
        });
        statusDisplay.textContent = `Loser Game Draw!`;
        gameActive = false;
    }
});
iflosytgamedrawlist.forEach(losygamedraw => {
    if (checkWinState(boardState, losygamedraw)) {
        losygamedrawlist.forEach(losygd => {
            if (losygd !== losygamedraw) {
                boardState[losygd] = '';
            }
        });
        statusDisplay.textContent = `Loser Game Draw!`;
        gameActive = false;
    }
});
iflosytgamedrawlist.forEach(losygamedraw => {
    if (checkWinState(boardState, losygamedraw)) {
        losygamedrawlist.forEach(losygd => {
            if (losygd !== losygamedraw) {
                boardState[losygd] = '';
            }
        });
        statusDisplay.textContent = `Loser Game Draw!`;
        gameActive = false;
    }
});
iflosytgamedrawlist.forEach(losygamedraw => {
    if (checkWinState(boardState, losygamedraw)) {
        losygamedrawlist.forEach(losygd => {
            if (losygd !== losygamedraw) {
                boardState[losygd] = '';
            }
        });
        statusDisplay.textContent = `Loser Game Draw!`;
        gameActive = false;
    }
});
iflosytgamedrawlist.forEach(losygamedraw => {
    if (checkWinState(boardState, losygamedraw)) {
        losygamedrawlist.forEach(losygd => {
            if (losygd !== losygamedraw) {
                boardState[losygd] = '';
            }
        });
        statusDisplay.textContent = `Loser Game Draw!`;
        gameActive = false;
    }
});
function handleClick(buttonName) {
    alert(buttonName + ' clicked!');
}

// Add more animations and interactions here if needed
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    
    // Example: Adding a fade-in animation
    const element = document.getElementById('fade-in');
    element.style.opacity = 0;
    
    setTimeout(() => {
        element.style.opacity = 1;
    }, 1000); // Change opacity to 1 after 1 second
    
    // Example: Adding a slide-in animation
    const element2 = document.getElementById('slide-in');
    element2.style.transform = 'translateY(-100%)';
    
    setTimeout(() => {
        element2.style.transform = 'translateY(0)';
    }, 1000); // Change transform to translateY(0) after 1 second
    
    // Example: Adding a fade-out animation
    const element3 = document.getElementById('fade-out');
    element3.style.opacity = 1;
    
    setTimeout(() => {
        element3.style.opacity = 0;
    }, 1000); // Change opacity to 0 after 1 second
    
    // Example: Adding a slide-out animation
    const element4 = document.getElementById('slide-out');
    element4.style.transform = 'translateY(0)';
    
    setTimeout(() => {
        element4.style.transform = 'translateY(-100%)';
    }, 1000); // Change transform to translateY(-100%) after 1 second 

    // Example: Adding a background color change animation
    const element5 = document.getElementById('background-color');
    element5.style.backgroundColor = '#6a11cb';
    
    setTimeout(() => {
        element5.style.backgroundColor = '#2575fc';
    }, 1000); // Change background color to #2575fc after 1 second
    
    // Example: Adding a background animation
    const body = document.body;
    let colors = ['#6a11cb', '#2575fc', '#ff6b6b', '#ff4757'];
    let currentColorIndex = 0;
    
    setInterval(() => {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        body.style.background = `linear-gradient(to right, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`;
    }, 5000); // Change background color every 5 seconds
});
