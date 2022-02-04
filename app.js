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
let gameStarted = false;
let score = 0;
let moveInterval = 0;
let wallInterval = 0

const newGame = () => {
  score = 0;
  snakeArr.forEach((item) => board[item].classList.remove("board__snake"));
  board[applePosition].classList.remove("board__apple");
  snakeStartPosition = 0;
  applePosition = 0;
  snakeArr = [1, 0];
  snakeArr.forEach((item) => board[item].classList.add("board__snake"));
  isDead = false;
  gameStarted = false;
  movingDirection = 1;
  clearInterval(moveInterval);
  clearInterval(wallInterval)
  if (gameStarted === false) {
    moveInterval = setInterval(iterativeMovement, interval);
    wallInterval = setInterval(hitWall, interval);
  }
  gameStarted = true;
  
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
  board[snakeArr.pop()].classList.remove("board__snake"); // removes tail from current index in board
  snakeArr.unshift(snakeArr[0] + movingDirection); // adds 1 to snake array in the box equivalent to snakehead[index] + direction
  board[snakeArr[0]].classList.add("board__snake");
  snakeHeadPosition = snakeArr[0]
};

const hitWall = () => {
  console.log(snakeHeadPosition)
  if (
    (snakeHeadPosition % gridSize === 0 && movingDirection === -1) || // snake hits left
    (snakeHeadPosition % gridSize === gridSize - 1 && movingDirection === 1) || // snake hits right
    (snakeHeadPosition - gridSize < 0 && movingDirection === -gridSize) || //snake hits top
    (snakeHeadPosition + gridSize >= gridSize * gridSize &&
      movingDirection === gridSize) // snake hits bottom
  ) {
    console.log("hit wall");
    return clearInterval(moveInterval), clearInterval(wallInterval) // cancel movement if above happens
  }
};
