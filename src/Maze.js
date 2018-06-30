var utils = require("./utils/utils.js");
var Cell = require("./Cell.js");

module.exports = Maze;

var walls = ["top", "right", "bottom", "left"];

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
    var currentCell, wall, i;
    var nextCell = null;
    currentCell = this.get(x, y); // check what it valid
    if(currentCell.isVisited === false){
        utils.shuffleArray(walls);
        currentCell.isVisited = true;
        for(i = 0; i < walls.length; ++i){
            wall = walls[i];
            if(currentCell[wall] === false){
                switch(wall){
                    case "top":
                        nextCell = this.get(x, y-1);
                        if(nextCell){
                            currentCell.top = true;
                            nextCell.bottom = true;
                            this.generate(x, y-1);
                        }
                        break;
                    case "right":
                        nextCell = this.get(x+1, y);
                        if(nextCell){
                            currentCell.right = true;
                            nextCell.left = true;
                            this.generate(x+1, y);
                        }
                        break;
                    case "bottom":
                        nextCell = this.get(x, y+1);
                        if(nextCell){
                            currentCell.bottom = true;
                            nextCell.top = true;
                            this.generate(x, y+1);
                        }
                        break;
                    case "left":
                        nextCell = this.get(x-1, y);
                        if(nextCell){
                            currentCell.left = true;
                            nextCell.right = true;
                            this.generate(x-1, y);
                        }
                        break;
                }
            }
        }
    }
};
