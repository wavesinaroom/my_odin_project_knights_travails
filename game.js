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

class Knight{
  ascii = 'k';
  moves = [];
  constructor(row,col){
    this.position = [row,col];
  }

  getMoves(){
    const twoStep = 2;
    const oneStep = 1;
    let move = [];

    // -
    //|
    //|
    const uur = [this.position[0]+oneStep,this.position[1]+twoStep];
    this.moves.push(uur);
    //  |
    //--
    const rru = [this.position[0]+twoStep,this.position[1]+oneStep];
    this.moves.push(rru);

    //--
    //  |
    const rrd = [this.position[0]+twoStep, this.position[1]-oneStep]
    this.moves.push(rrd);

    //|
    //|
    // -
    const ddr = [this.position[0]+oneStep,this.position[1]-twoStep];
    this.moves.push(ddr);

    // |
    // |
    //-
    const ddl = [this.position[0]-oneStep,this.position[1]-twoStep]; 
    this.moves.push(ddl);

    // --
    //|
    const lld = [this.position[0]-twoStep,this.position[1]-oneStep];
    this.moves.push(lld);

    //|
    // --
    const llu = [this.position[0]-twoStep,this.position[1]+oneStep];
    this.moves.push(llu);

    //-
    // |
    // |
    const uul = [this.position[0]-oneStep,this.position[1]+twoStep];
    this.moves.push(uul);
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
