class Board{
  size = 8;
  destination = 'd';
  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size), tile=>',')); 
  }

  visualize(){
    this.tiles.forEach(row=>console.log(row.join(' ')));
  }

  placePiece(piece){
    this.tiles[piece.position[0]][piece.position[1]] = piece.ascii;
  }

  setDestination(position){
    this.tiles[position[0]][position[1]]= this.destination;
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
const destination = [3,2];
board.placePiece(knight);
board.setDestination(destination);
board.visualize();
