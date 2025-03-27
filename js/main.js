const no = document.querySelector('#no');
const yes = document.querySelector('#yes');
const nombers = document.querySelector('.numbers');
const kub = document.querySelectorAll('.kub');

// let i = 0;
const board = document.getElementById('board');
const resetButton = document.getElementById('resetButton');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
// function home() {
//     no.addEventListener('click', function(e) {
//         no.remove()
//         // yes.innerHTML = 'ЛОХ у тебя нет выбора'
//     });
// }
// home()
function createBoard() {
    board.innerHTML = ''; // Clear existing cells
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X'; // Reset player to X

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    // Validate the cell and game state
    if (gameBoard[index] !== '' || !gameActive) {
        return; // Cell already occupied or game not active
    }

    // Mark the cell with the current player's symbol
    gameBoard[index] = currentPlayer;
    cell.innerHTML = currentPlayer;

    // Check for a winner or a draw
    if (checkWin()) {
        alert(`${currentPlayer} поздравляю! А какую одежду снять?`);
        gameActive = false; // Stop the game
    } else if (gameBoard.every(cell => cell !== '')) {
        alert("УРА! Обе снимаете одежду");
        gameActive = false; // Stop the game
    } else {
        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
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

    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return (
            gameBoard[a] === currentPlayer &&
            gameBoard[b] === currentPlayer &&
            gameBoard[c] === currentPlayer
        );
    });
}

// Reset game button
resetButton.addEventListener('click', createBoard);

// Initialize the game board
createBoard();


