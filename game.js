class Board{
  size = 8;

  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size))); 
    for(let r = 0; r<this.size; ++r)
      for(let c = 0; c<this.size; ++c)
        this.tiles[r][c] = ',';
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
