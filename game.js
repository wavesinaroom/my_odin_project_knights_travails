class Board{
  size = 8;

  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size), tile=>',')); 
  }

  visualize(){
    this.tiles.forEach(row=>console.log(row.join(' ')));
  }

  placeKnight(row, col){
    this.tiles[row][col] = 'k';
  }
}

class Knight{
  ascii = 'k';
  position = [];
}
const board = new Board();
board.placeKnight(4, 4);
board.visualize();
