document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const playerTurnDisplay = document.querySelector('.player-turn');
    const scoreXDisplay = document.querySelector('.score-x');
    const scoreODisplay = document.querySelector('.score-o');
    const drawsDisplay = document.querySelector('.draws');
    const resetBtn = document.getElementById('reset-btn');
    const resetScoreBtn = document.getElementById('reset-score-btn');
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let scores = {
        X: 0,
        O: 0,
        draws: 0
    };
    
    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6]  // diagonal top-right to bottom-left
    ];
    
    // Initialize the game
    function initGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
        
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-cell');
        });
    }
    
    // Handle cell click
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        updateCell(clickedCell, clickedCellIndex);
        checkResult();
    }
    
    // Update cell and board
    function updateCell(cell, index) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());
    }
    
    // Change player
    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerTurnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
    
    // Check for win or draw
    function checkResult() {
        let roundWon = false;
        
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            if (board[a] === '' || board[b] === '' || board[c] === '') {
                continue;
            }
            
            if (board[a] === board[b] && board[b] === board[c]) {
                roundWon = true;
                highlightWinningCells([a, b, c]);
                break;
            }
        }
        
        if (roundWon) {
            announceWinner(currentPlayer);
            updateScore(currentPlayer);
            gameActive = false;
            return;
        }
        
        if (!board.includes('')) {
            announceDraw();
            updateScore('draw');
            gameActive = false;
            return;
        }
        
        changePlayer();
    }
    
    // Highlight winning cells
    function highlightWinningCells(cells) {
        cells.forEach(index => {
            document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
        });
    }
    
    // Announce winner
    function announceWinner(player) {
        playerTurnDisplay.textContent = `Player ${player} Wins!`;
    }
    
    // Announce draw
    function announceDraw() {
        playerTurnDisplay.textContent = 'Game Ended in a Draw!';
    }
    
    // Update score
    function updateScore(result) {
        if (result === 'X' || result === 'O') {
            scores[result]++;
        } else {
            scores.draws++;
        }
        
        updateScoreDisplay();
    }
    
    // Update score display
    function updateScoreDisplay() {
        scoreXDisplay.textContent = `X: ${scores.X}`;
        scoreODisplay.textContent = `O: ${scores.O}`;
        drawsDisplay.textContent = `Draws: ${scores.draws}`;
    }
    
    // Reset score
    function resetScore() {
        scores = {
            X: 0,
            O: 0,
            draws: 0
        };
        updateScoreDisplay();
        initGame();
    }
    
    // Event listeners
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
    
    resetBtn.addEventListener('click', initGame);
    resetScoreBtn.addEventListener('click', resetScore);
    
    // Initialize the game on load
    initGame();
});