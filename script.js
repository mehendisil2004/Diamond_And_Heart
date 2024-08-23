const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restartButton");
let currentPlayer = "♡";
let gameActive = true;
let boardState = Array(9).fill(null);

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

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] !== null || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    gameActive = false;
    messageElement.textContent = `${currentPlayer} Wins!`;
  } else if (boardState.every((cell) => cell !== null)) {
    gameActive = false;
    messageElement.textContent = "Draw!";
  } else {
    currentPlayer = currentPlayer === "♡" ? "⟡" : "♡";
  }
}

function checkWin() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return boardState[index] === currentPlayer;
    });
  });
}

function restartGame() {
  currentPlayer = "♡";
  gameActive = true;
  boardState = Array(9).fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  messageElement.textContent = "";
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
