var maze =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Cell;

function Cell(){
    this.isVisited = false;
    this.top = false;
    this.right = false;
    this.bottom = false;
    this.left = false;
}

Cell.prototype.walls = function(){
    var result = {};
    result.top = this.top;
    result.right = this.right;
    result.bottom = this.bottom;
    result.left = this.left;
    return result;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(4);
var Cell = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = MazeRender;

function MazeRender(maze, scale){
    this.mazeObject = maze;
    this.scale = scale;
    this.maze = document.getElementById("maze");
    this.context = this.maze.getContext("2d");
}

MazeRender.prototype.renderCell = function(x, y, cell){
    var wall;
    var walls = cell.walls();
    var scaledX = x * this.scale;
    var scaledY = y * this.scale;
    this.context.beginPath();
    this.context.moveTo(scaledX, scaledY);
    for(wall in walls){
        if(walls[wall] === false){
            switch(wall){
                case "top":
                    this.context.lineTo(scaledX + this.scale, scaledY);
                    break;
                case "right":
                    this.context.moveTo(scaledX + this.scale, scaledY); // last point of line of top wall
                    this.context.lineTo(scaledX + this.scale, scaledY + this.scale); // draw right wall down by Y
                    break;
                case "bottom":
                    this.context.moveTo(scaledX, scaledY + this.scale); // last point of line of left wall
                    this.context.lineTo(scaledX + this.scale, scaledY + this.scale); // draw bottom wall right by X
                    break;
                case "left":
                    this.context.moveTo(scaledX, scaledY); // begin point of line of top wall
                    this.context.lineTo(scaledX, scaledY + this.scale); // draw right wall down by Y
                    break;
            }
        }
    }
    this.context.stroke();
};

MazeRender.prototype.render = function(){
    var i, j, row;
    for(i = 0; i < this.mazeObject.length; ++i){
        row = this.mazeObject[i];
        for(j = 0; j < row.length; ++j){
            this.renderCell(j, i, row[j]);
        }
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Maze = __webpack_require__(1);
var MazeRender = __webpack_require__(2);

module.exports = {
    "Maze": Maze,
    "MazeRender": MazeRender
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "shuffleArray": shuffleArray,
    "randomInteger": randomInteger
};

function randomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array){
    var i, j, temp;
    for(i = array.length-1; i > 0; --i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


/***/ })
/******/ ]);