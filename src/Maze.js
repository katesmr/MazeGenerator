var utils = require("./utils/utils.js");
var Cell = require("./Cell.js");

module.exports = Maze;

var wallCount = 4;

function Maze(width, height){
    this.width = width;
    this.height = height;
    this.maze = [];
    this._createEmptyMaze();
}

Maze.prototype._createEmptyMaze = function(){
    var i, j, row;
    for(i = 0; i < this.height; ++i){
        row = [];
        for(j = 0; j < this.width; ++j){
            row.push(new Cell(i, j));
        }
        this.maze.push(row);
    }
};

Maze.prototype.get = function(x, y){
    var result = null;
    if((x >= 0 && x < this.width) && (y >= 0 && y < this.height)){
        result = this.maze[y][x];
    }
    return result;
};

/**
 * @param x - start x point
 * @param y - start y point
 */
Maze.prototype.generate = function(x, y){
    var currentCell;
    var nextCell = null;
    currentCell = this.get(x, y); // check what it valid
    console.log(x, y);
    console.log(currentCell);
    switch(utils.randomInteger(0, wallCount)){
        case 0: // top
            console.log("top");
            nextCell = this.get(currentCell.x, (currentCell.y)-1);
            if(nextCell && currentCell.topWall === false){
                currentCell.topWall = true;
                nextCell.bottomWall = true;
            } else{
                // busy or don't exist
                nextCell = null;
            }
            break;
        case 1: // right
            console.log("right");
            nextCell = this.get((currentCell.x)+1, currentCell.y);
            if(nextCell && currentCell.rightWall === false){
                currentCell.rightWall = true;
                nextCell.leftWall = true;
            } else{
                // busy or don't exist
                nextCell = null;
            }
            break;
        case 2: // bottom
            console.log("bottom");
            nextCell = this.get(currentCell.x, (currentCell.y)+1);
            if(nextCell && currentCell.bottomWall === false){
                currentCell.bottomWall = true;
                nextCell.topWall = true;
            } else{
                // busy or don't exist
                nextCell = null;
            }
            break;
        case 3: // left
            console.log("left");
            nextCell = this.get((currentCell.x)-1, currentCell.y);
            if(nextCell && currentCell.leftWall === false){
                currentCell.leftWall = true;
                nextCell.rightWall = true;
            } else{
                // busy or don't exist
                nextCell = null;
            }
            break;
    }
    if(nextCell !== null){
        this.generate(nextCell.x, nextCell.y)
    } else{
        //this.generate(x, y);
        return null;
    }
};
