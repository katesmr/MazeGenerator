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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "randomInteger": randomInteger
};

function randomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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


/***/ })
/******/ ]);