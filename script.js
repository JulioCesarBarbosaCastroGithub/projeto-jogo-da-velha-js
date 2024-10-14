const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let boardState = Array(9).fill('');

// Posições vencedoras
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Função para verificar se há um vencedor
function checkWinner() {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        gameActive = false;
        messageElement.textContent = `Jogador ${currentPlayer} venceu!`;
        return;
      }
    }
    if (!boardState.includes('')) {
        gameActive = false;
        messageElement.textContent = 'Empate!';
      }
}

// Função para alternar o jogador
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageElement.textContent = `Vez do jogador ${currentPlayer}`;
}

// Função para tratar o clique nas células
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
  
    if (boardState[index] !== '' || !gameActive) {
      return;
    }
  
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWinner();
  
    if (gameActive) {
      switchPlayer();
    }
}

// Função para reiniciar o jogo
function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState.fill('');
    cells.forEach(cell => (cell.textContent = ''));
    messageElement.textContent = 'Vez do jogador X';
}

// Adicionar evento de clique para cada célula
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Adicionar evento de clique para o botão de reinício
resetButton.addEventListener('click', resetGame);

