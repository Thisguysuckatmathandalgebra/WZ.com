let grid = [];
const gridSize = 4;

// Initialize the grid
function initializeGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

// Add a random tile (either 2 or 4) to a random empty cell
function addRandomTile() {
    const availableCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                availableCells.push({ x: i, y: j });
            }
        }
    }
    if (availableCells.length > 0) {
        const { x, y } = availableCells[Math.floor(Math.random() * availableCells.length)];
        grid[x][y] = Math.random() < 0.9 ? 2 : 10;
    }
}

// Update the grid display
function updateGrid() {
    const gridContainer = document.getElementById("grid-container");
    gridContainer.innerHTML = "";
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = grid[i][j] === 0 ? "" : grid[i][j];
            gridContainer.appendChild(tile);
        }
    }
}

// Reset the game
function resetGame() {
    initializeGrid();
}

// Initialize the game when the page loads
window.onload = initializeGrid;
