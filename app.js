/// SNAKE \\\

// Query Selectors
const board = document.querySelectorAll("div");
const snake = document.querySelectorAll(".board__snake");
const apple = document.querySelectorAll(".board__apple");
const startButton = document.querySelector(".info__start");
const scoreCounter = document.querySelector(".info__score");

// Variables
let snakeArr = [1, 0]; //snakes head will start in position 1 and will be 2 blocks long
let snakeHeadPosition = snakeArr[0];
let snakeStartPosition = 0; // remove snake tail from first box of grid for first movement
let applePosition = 0;
let isDead = false;
let interval = 750;
const gridSize = 10;
let movingDirection = 1; //by default move right from position 1 in board

const newGame = () => {
  score = 0;
  snakeArr.forEach((item) => board[item].classList.remove("board__snake"));
  board[applePosition].classList.remove("board__apple");
  snakeStartPosition = 0;
  applePosition = 0;
  snakeArr = [1, 0];
  snakeArr.forEach((item) => board[item].classList.add("board__snake"));
  isDead = false;
  movingDirection = 1;
  setInterval(iterativeMovement, interval);
};

startButton.addEventListener("click", newGame);

const move = () => {
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        movingDirection = -1;
        break;
      case 38:
        movingDirection = -gridSize;
        break;
      case 39:
        movingDirection = 1;
        break;
      case 40:
        movingDirection = gridSize;
        break;
    }
  };
};

startButton.addEventListener("click", move);

const iterativeMovement = () => {
  // move tail
  board[snakeArr.pop()].classList.remove("board__snake");
  //move head
  snakeArr.unshift(snakeArr[0] + movingDirection);
  board[snakeArr[0]].classList.add("board__snake");
};

const hitWall = () => {
  if (
    (snakeHeadPosition % gridSize === 0 && movingDirection === -1) || // snake hits left
    (snakeHeadPosition % gridSize === gridSize - 1 && movingDirection === 1) || // snake hits right
    (snakeHeadPosition - gridSize < 0 && movingDirection === -gridSize) || //snake hits top
    (snakeHeadPosition + gridSize >= gridSize * gridSize &&
      movingDirection === gridSize) // snake hits bottom
  ) {
    return clearInterval(interval); // cancel movement if above happens
  }
};
