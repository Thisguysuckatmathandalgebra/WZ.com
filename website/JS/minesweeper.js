document.addEventListener('DOMContentLoaded', function () {
    const rows = 10;
    const cols = 10;
    const mines = 20;
    
    let board = document.getElementById('board');
    let restartButton = document.getElementById('restart');
    let explosionSound = document.getElementById('explosion-sound');
    let victorySound = document.getElementById('victory-sound');
    
    let grid = [];
    
    function initializeGrid() {
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = {
                    isMine: false,
                    revealed: false,
                    adjacentMines: 0
                };
            }
        }
    }
    
    function placeMines() {
        let placedMines = 0;
        while (placedMines < mines) {
            let row = Math.floor(Math.random() * rows);
            let col = Math.floor(Math.random() * cols);
            if (!grid[row][col].isMine) {
                grid[row][col].isMine = true;
                placedMines++;
            }
        }
    }
    
    function calculateAdjacentMines() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!grid[i][j].isMine) {
                    grid[i][j].adjacentMines = countAdjacentMines(i, j);
                }
            }
        }
    }
    
    function countAdjacentMines(row, col) {
        let count = 0;
        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rows - 1); i++) {
            for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, cols - 1); j++) {
                if (grid[i][j].isMine) {
                    count++;
                }
            }
        }
        return count;
    }
    
    function revealCell(row, col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col].revealed) {
            return;
        }
        let cell = document.getElementById(`cell-${row}-${col}`);
        if (grid[row][col].isMine) {
            cell.classList.add('mine');
            explosionSound.play(); // Play explosion sound
            alert("You lost!");
            restartGame(); // Reset the game
            return;
        }
        grid[row][col].revealed = true;
        cell.classList.add('revealed', 'animation');
        cell.textContent = grid[row][col].adjacentMines === 0 ? '' : grid[row][col].adjacentMines;
        if (grid[row][col].adjacentMines === 0) {
            for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rows - 1); i++) {
                for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, cols - 1); j++) {
                    if (!(i === row && j === col)) {
                        revealCell(i, j);
                    }
                }
            }
        }
    }
    
    function revealBoard() {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (!grid[i][j].revealed) {
                    revealCell(i, j);
                }
            }
        }
    }
    
    function restartGame() {
        grid = [];
        initializeGrid();
        placeMines();
        calculateAdjacentMines();
        renderBoard();
    }
    
    function renderBoard() {
        board.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let cell = document.createElement('div');
                cell.id = `cell-${i}-${j}`;
                cell.classList.add('cell', 'hidden');
                cell.addEventListener('click', function () {
                    revealCell(i, j);
                });
                board.appendChild(cell);
            }
            board.appendChild(document.createElement('br'));
        }
    }
    
    restartButton.addEventListener('click', restartGame);
    restartGame();
});
