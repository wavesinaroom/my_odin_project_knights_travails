class Board{
  size = 8;

  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size), tile=>',')); 
  }

  visualize(){
    this.tiles.forEach(row=>console.log(row.join(' ')));
  }

  placePiece(piece){
    this.tiles[piece.position[0]][piece.position[1]] = piece.ascii;
  }
}

class Knight{
  ascii = 'k';
  constructor(row,col){
    this.position = [row,col];
  }
}
const board = new Board();
const knight = new Knight(4,4);
board.placePiece(knight);
board.visualize();
