/// SNAKE \\\

// Query Selectors
const board = document.querySelectorAll("div");
const snake = document.querySelectorAll(".board__snake");
const apple = document.querySelectorAll(".board__apple");
const startButton = document.querySelector(".info__start");
const scoreCounter = document.querySelector(".info__score");
const youDied = document.querySelector(".youDied");

// Variables
let snakeArr = [1, 0]; //snakes head will start in position 1 and will be 2 blocks long
let snakeHeadPosition = snakeArr[0];
let applePosition = 0;
let isDead = false;
let interval = 500;
const gridSize = 10;
let movingDirection = 1; //by default move right
let gameStarted = false;
let score = 0;
let moveInterval = 0;
let wallInterval = 0;

// Arrow key movement, also prevents backflips
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
        if (movingDirection !== -gridSize) movingDirection = gridSize;
        break;
    }
  };
};

startButton.addEventListener("click", move);

// Moves the snake array through the board array and pushes to it when apple eaten
const iterativeMovement = () => {
  // move tail
  const tail = snakeArr.pop(); // tail = index of the snakeArr just removed
  board[tail].classList.remove("board__snake"); // removes tail from current index in board
  snakeArr.unshift(snakeArr[0] + movingDirection); // adds 1 to snake array in the box equivalent to snakehead[index] + direction
  board[snakeArr[0]].classList.add("board__snake");
  snakeHeadPosition = snakeArr[0]; // update the value of snakeHeadPositon to be the same as snakeArr[0]

  // eat apple
  if (board[snakeHeadPosition].classList.contains("board__apple")) {
    board[snakeHeadPosition].classList.remove("board__apple");
    score++;
    scoreCounter.innerHTML = `Score: ${score}`;
    placeApple();
    board[tail].classList.add("board__snake"); // use tail to add class snake back to the index of board from which it was removed
    snakeArr.push(tail);
  }
};

// If you hit the wall/yourself
const hitWall = () => {
  if (
    (snakeHeadPosition % gridSize === 0 && movingDirection === -1) || // snake hits left
    (snakeHeadPosition % gridSize === gridSize - 1 && movingDirection === 1) || // snake hits right
    (snakeHeadPosition - gridSize < 0 && movingDirection === -gridSize) || // snake hits top
    (snakeHeadPosition + gridSize >= gridSize * gridSize &&
      movingDirection === gridSize) || // snake hits bottom
    board[snakeHeadPosition + movingDirection].classList.contains(
      "board__snake" // snake hits self
    )
  ) {
    gameOver();
    clearInterval(moveInterval), clearInterval(wallInterval); // cancel movement and hitWall function if above happen
  }
};

// Changes styling when you die and displays "you died :("
const gameOver = () => {
  board.forEach((element) => {
    if (
      element.classList.contains("board__snake") === false &&
      element.classList.contains("board__apple") === false
    ) {
      element.classList.add("game-over");
    } else {
      element.classList.add("game-over2");
    }
  });
  youDied.innerHTML = "You died :(";
};

// Randomly places apple on the grid somewhere where the snake isnt
const placeApple = () => {
  let randomIndex = Math.floor(Math.random() * (gridSize * gridSize));
  if (board[randomIndex].classList.contains("board__snake") === false) {
    board[randomIndex].classList.add("board__apple");
    applePosition = randomIndex;
  } else {
    placeApple();
  }
};

// Starts new game, resets all variables and function intervals
const newGame = () => {
  score = 0;
  scoreCounter.innerHTML = `Score: ${score}`;
  board.forEach((element) => {
    element.classList.remove("game-over");
    element.classList.remove("game-over2");
  });
  snakeArr.forEach((item) => board[item].classList.remove("board__snake"));
  board[applePosition].classList.remove("board__apple");
  youDied.innerHTML = "";
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
  if (gameStarted === false) {
    wallInterval = setInterval(hitWall, interval);
    moveInterval = setInterval(iterativeMovement, interval);
    startButton.innerHTML = "Restart";
  }
  gameStarted = true;
};

startButton.addEventListener("click", newGame);
