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
