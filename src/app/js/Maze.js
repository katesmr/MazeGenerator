var utils = require("./utils/utils.js");

module.exports = Maze;

function Maze(width, height){
    this.width = width;
    this.height = height;
    this.maze = [];
    this._fullMaze();
}

Maze.prototype.get = function(x, y){
    var result = null;
    if((x >= 0 && x < this.width) && (y >= 0 && y < this.height)){
        result = this.maze[y][x];
    }
    return result;
};

Maze.prototype._fullMaze = function(){
    var i, j, row;
    for(i = 0; i < this.height; ++i){
        row = [];
        for(j = 0; j < this.width; ++j){
            row.push(false);
        }
        this.maze.push(row);
    }
};

/**
 * @param x - start x point
 * @param y - start y point
 */
Maze.prototype.generate = function(x, y){
    var cell;
    this.maze[y][x] = true; // set current cell to busy
    cell = this.createNewCell(x, y);
    if(cell === null){
        return null;
    } else{
        console.log(cell);
        this.generate(cell[0], cell[1]);
    }
};

Maze.prototype.createNewCell = function(x, y){
    var newX, newY, cellValue;
    var newCell = this.nextCell(x, y, utils.randomInteger(0, 3));
    while(true){
        newX = newCell[0];
        newY = newCell[1];
        cellValue = this.get(newX, newY);
        if(cellValue === true){
            if(this.hasEmptyNeighbour(x, y) === false){
                // current cell is closed and doesn't has any empty neighbour
                newCell = this.findEmptyCell();  // find new cell in other part of maze
                break;
            } else{
                // while new cell would not be valid or empty (false), create new cell again
                newCell = this.nextCell(x, y, utils.randomInteger(0, 3));
            }
        } else if(cellValue === null){
            // current cell coord out of range
            newCell = this.nextCell(x, y, utils.randomInteger(0, 3));
        } else{
            // find empty cell neighbour
            break;
        }
    }
    return newCell;
};

Maze.prototype.hasEmptyNeighbour = function(x, y){
    var result = true;
    if(this.get(x+1, y) !== false &&
       this.get(x-1, y) !== false &&
       this.get(x, y+1) !== false &&
       this.get(x, y-1) !== false){
        result = false;
    }
    return result;
};

Maze.prototype.findEmptyCell = function(){
    var i, cellIndex;
    var result = null;
    for(i = 0; i < this.maze.length; ++i){
        cellIndex = this.maze[i].indexOf(false);
        if(cellIndex !== -1 && this.hasEmptyNeighbour(cellIndex, i) === true){
            result = [cellIndex, i];
            break;
        }
    }
    return result;
};

Maze.prototype.nextCell = function(x, y, cellSide){
    var result = null;
    switch(cellSide){
        case 0: result = [x, y-1]; break; // top
        case 1: result = [x+1, y]; break; // right
        case 2: result = [x, y+1]; break; // bottom
        case 3: result = [x-1, y]; break; // left
    }
    return result;
};
