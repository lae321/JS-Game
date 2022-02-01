/// SNAKE \\\
// 20x20 board made of divs
// .snake and .apple classes will denote the snake and apple and dictate styling of the appropriate div. Update the class of divs as the snake moves and apples are spawned
// perhaps treat snake as an array? Push to it when apple is eaten, increasing length by one
// at the same time, remove the apple from the board and randomly spawn another somewhere on the grid, unoccupied by the snake
// when apple eaten, score++, increase snake speed
// movement controlled by arrow keys bound to event listeners - movement that opposes the current direction of movement should be ignored
// collision with wall or snake itself ends the game

// Query Selectors
const snake = document.querySelectorAll(".board__snake");
const apple = document.querySelectorAll(".board__apple");
const startButton = document.querySelector(".start")
const scoreCounter = document.querySelector(".score")

// Variables
let snakeHeadPosition = 0;
let snakeLength = 2;
let isDead = false;
const rowMax = 10;

document.onkeydown = e => {
  switch (e.keyCode) {
      case 37:
          console.log("Left key pressed")
          break;
      case 38:
        console.log("Up key pressed")
          break;
      case 39:
        console.log("Right key pressed")
          break;
      case 40:
        console.log("Down key pressed")
          break;
  }
}
// const moveRight = () => {
  
//   for (i = snakeHeadPosition; i < 400; i++) {
//     let nextCell = board[snakeHeadPosition];
//     let currCell = board[i]
//     nextCell.classList.remove("board__snake");
//     currCell.classList.add("board__snake");
    
//   }
// };


// moveRight();
