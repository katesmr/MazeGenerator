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
