/// SNAKE \\\

// TODO: when isDead === true, display you lose :( on the game board, possibly by toggling a class applied to board and updating the innertext
// TODO: Push to snakeArr when apple is eaten

// Query Selectors
const board = document.querySelectorAll("div");
const snake = document.querySelectorAll(".board__snake");
const apple = document.querySelectorAll(".board__apple");
const startButton = document.querySelector(".info__start");
const scoreCounter = document.querySelector(".info__score");

// Variables
let snakeArr = [1, 0]; //snakes head will start in position 1 and will be 2 blocks long
let snakeHeadPosition = snakeArr[0];
let applePosition = 0;
let isDead = false;
let interval = 500;
const gridSize = 10;
let movingDirection = 1; //by default move right from position 1 in board
let gameStarted = false;
let score = 0;
let moveInterval = 0;
let wallInterval = 0;
let eatAppleInterval = 0;

const move = () => {
  document.onkeydown = (e) => {
    switch (e.keyCode) {
      case 37:
        if (movingDirection !== 1) {
          movingDirection = -1;
        }
        break;
      case 38:
        if (movingDirection !== gridSize) {
          movingDirection = -gridSize;
        }
        break;
      case 39:
        if (movingDirection !== -1) {
          movingDirection = 1;
        }
        break;
      case 40:
        if (movingDirection !== -gridSize)
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
  snakeHeadPosition = snakeArr[0]; // update the value of snakeHeadPositon to be the same as snakeArr[0]
};

const hitWall = () => {
  if (
    (snakeHeadPosition % gridSize === 0 && movingDirection === -1) || // snake hits left
    (snakeHeadPosition % gridSize === gridSize - 1 && movingDirection === 1) || // snake hits right
    (snakeHeadPosition - gridSize < 0 && movingDirection === -gridSize) || // snake hits top
    (snakeHeadPosition + gridSize >= gridSize * gridSize &&
      movingDirection === gridSize) // snake hits bottom
  ) {
    console.log("hit wall");
    return clearInterval(moveInterval), clearInterval(wallInterval); // cancel movement and hitWall function if above happens
    // isDead = true;
  }
};

const placeApple = () => {
  // randomly generate index between 0 and 99
  let randomIndex = Math.floor(Math.random() * 100);
  if (board[randomIndex].classList.contains("board__snake") === false) {
    board[randomIndex].classList.add("board__apple");
    applePosition = randomIndex;
  }
};

const eatApple = () => {
  if (board[snakeHeadPosition].classList.contains("board__apple")) {
    board[snakeHeadPosition].classList.remove("board__apple");
    score++;
    scoreCounter.innerHTML = `Score: ${score}`;
    placeApple();
  }
};

const newGame = () => {
  score = 0;
  scoreCounter.innerHTML = `Score: ${score}`;
  snakeArr.forEach((item) => board[item].classList.remove("board__snake"));
  board[applePosition].classList.remove("board__apple");
  applePosition = 0;
  snakeArr = [1, 0];
  snakeArr.forEach((item) => board[item].classList.add("board__snake"));
  isDead = false;
  gameStarted = false;
  movingDirection = 1;
  snakeHeadPosition = 1;
  placeApple();
  clearInterval(moveInterval);
  clearInterval(wallInterval);
  clearInterval(eatAppleInterval);
  if (gameStarted === false) {
    wallInterval = setInterval(hitWall, interval);
    moveInterval = setInterval(iterativeMovement, interval);
    eatAppleInterval = setInterval(eatApple, interval);
    startButton.innerHTML = "Restart";
  }
  gameStarted = true;
};

startButton.addEventListener("click", newGame);
