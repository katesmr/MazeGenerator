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
