const board = document.querySelector('.board');
const status = document.querySelector('.status');
const restartButton = document.querySelector('.restart-button');
const popupContainer = document.querySelector('.popup-container');
const popupMessage = document.querySelector('.popup .message');
const newGameButton = document.querySelector('.new-game-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const checkWinner = () => {
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

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'draw';
    }

    return null;
};

const handleCellClick = (index) => {
    if (!gameActive || gameBoard[index] !== '') return;

    gameBoard[index] = currentPlayer;
    board.children[index].textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'draw') {
            showPopup("It's a draw!");
        } else {
            showPopup(`Player ${winner} wins!`);
        }
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const showPopup = (message) => {
    popupMessage.textContent = message;
    popupContainer.style.display = 'flex';
};

const hidePopup = () => {
    popupContainer.style.display = 'none';
};

const handleRestartClick = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = 'Player X\'s turn';
    board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    hidePopup();
};

board.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        const cellIndex = e.target.getAttribute('data-index');
        handleCellClick(cellIndex);
    }
});

restartButton.addEventListener('click', handleRestartClick);

newGameButton.addEventListener('click', () => {
    handleRestartClick();
});
