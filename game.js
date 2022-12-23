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
  
  showPieceMoves(piece){
   //TODO: Come back to this method when a moves knight's moves attribute is ready 
  }
  

  isOutOfBoundaries(coordinate){
    if(coordinate>this.size||coordinate<0)
      return true;
    else
      return false
  }
}

class MovesTree{
  constructor(position){
    const twoStep = 2;
    const oneStep = 1;

    // -
    //|
    //|
    this.uur = [position[0]+oneStep, position[1]+twoStep];
    
    //  |
    //--
    this.rru = [position[0]+twoStep, position[1]+oneStep];

    //--
    //  |
    this.rrd = [position[0]+twoStep,position[1]-oneStep]

    //|
    //|
    // -
    this.ddr = [position[0]+oneStep, position[1]-twoStep];

    // |
    // |
    //-
    this.ddl = [position[0]-oneStep, position[1]-twoStep]; 

    // --
    //|
    this.lld = [position[0]-twoStep, position[1]-oneStep];

    //|
    // --
    this.llu = [position[0]-twoStep, position[1]+oneStep];

    //-
    // |
    // |
    this.uul = [position[0]-oneStep, position[1]+twoStep];

  }
}
class Knight{
  ascii = 'k';
  moves;
  constructor(row,col){
    this.position = [row,col];
  }

  getMoves(){
    this.moves = new MovesTree(this.position);
  }
}
const board = new Board();
const knight = new Knight(4,4);
board.targetPos = [2,4];
board.placePiece(knight);
board.setTarget(board.targetPos);
board.visualize();
knight.getMoves();
console.dir(knight.moves);
