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
