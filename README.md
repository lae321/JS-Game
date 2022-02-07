# JS-Game
Welcome to my reimagining of the classic arcade game Snake! This project was built using JavaScript, CSS/SASS and HTML. 

This project was essentially a bootcamp in array methods and intervals. The snake is an array which moves through a bigger array, the board. Movement is therefore achieved by the repeated adding and removal of classes (and their associated styles) from different positions in the board. Upon eating an apple, the snake array grows by one, and the index from which the class "board__snake" was just removed (in the most recent movement cycle) is used to add this class again, giving the illusion that the snake's length has grown by one square.

Hitting a wall or another part of the snake ends the game, but the user can restart simply by pressing the restart button. 

The logo for the game was made with Adobe Illustrator and the font "Press Start 2P" from Google Fonts, which is used throughout the project.

At the time of writing, my personal high score is 30. See if you can beat it!