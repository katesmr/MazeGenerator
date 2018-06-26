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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Cell;

function Cell(x, y){
    this.x = x;
    this.y = y;
    this.topWall = false;
    this.rightWall = false;
    this.bottomWall = false;
    this.leftWall = false;
}

Cell.prototype.getCoord = function(){
    return [this.x, this.y];
};

Cell.prototype.setCoord = function(x, y){
    this.x = x;
    this.y = y;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    "randomInteger": randomInteger
};

function randomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(1);
var Cell = __webpack_require__(0);

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


/***/ })
/******/ ]);