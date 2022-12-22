class Board{
  size = 8;
  targetPos = [];
  targetChar = 'd';
  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size), tile=>'·')); 
  }

  visualize(){
    this.tiles.forEach(row=>console.log(row.join(' ')));
  }

  placePiece(piece){
    if(this.isOutOfBoundaries(piece.position[0])||this.isOutOfBoundaries(piece.position[1]))
      throw new Error(`Piece is out board boundaries`);
    else
      this.tiles[piece.position[0]][piece.position[1]] = piece.ascii;
  }

  setTarget(position){

    if(this.isOutOfBoundaries(position[0])||this.isOutOfBoundaries(position[1]))
      throw new Error(`Target is out board boundaries`);
    else
      this.tiles[position[0]][position[1]]= this.targetChar;
  }
  
  isOutOfBoundaries(coordinate){
    if(coordinate>this.size||coordinate<0)
      return true;
    else
      return false
  }
}

class Knight{
  ascii = 'k';
  constructor(row,col){
    this.position = [row,col];
  }
}
const board = new Board();
const knight = new Knight(1,4);
board.targetPos = [2,4];
board.placePiece(knight);
board.setTarget(board.targetPos);
board.visualize();


