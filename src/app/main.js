var Maze = require("./js/Maze.js");

var maze = new Maze(5, 4);
maze.generate(2, 1);
console.log(maze.maze);