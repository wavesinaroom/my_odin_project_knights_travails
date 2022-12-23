class Board{
  size = 8;
  targetPos = [];
  targetToken = 'd';
  moveToken = 'a';

  static isOutOfBoundaries(x,y){
    if(x>this.size-1||x<0)
      return true;
    else if(y>this.size-1||y<0)
      return true;
    else
      return false
  }

  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size), tile=>'·')); 
  }

  visualize(){
    this.tiles.forEach(row=>console.log(row.join(' ')));
  }

  placeItem(position, token){
    if(Board.isOutOfBoundaries(position[0],position[1]))
      throw new Error(`Piece/Target is out board boundaries`);
    else
      this.tiles[position[1]][position[0]] = token;
  }
  
  showPieceMoves(piece){
    for(let i = 0; i<piece.moves.length; ++i)
      this.tiles[piece.moves[i][1]][piece.moves[i][0]] = this.moveToken;
  }

}

class Knight{
  token = 'k';
  moves = [];
  constructor(row,col){
    this.position = [row,col];
  }

  getMoves(){
    const twoStep = 2;
    const oneStep = 1;
   
    //Check if moves are allowed before creating branched moves from each of them

    // -
    //|
    //|
    if(!Board.isOutOfBoundaries(this.position[0]+oneStep,this.position[1]+twoStep))
      this.moves.push(Array.from([this.position[0]+oneStep,this.position[1]+twoStep]));

    //  |
    //--
    if(!Board.isOutOfBoundaries(this.position[0]+twoStep,this.position[1]+oneStep))
      this.moves.push(Array.from([this.position[0]+twoStep,this.position[1]+oneStep]));

    //--
    //  |
    if(!Board.isOutOfBoundaries(this.position[0]+twoStep,this.position[1]-oneStep))
      this.moves.push(Array.from([this.position[0]+twoStep,this.position[1]-oneStep]));

    //|
    //|
    // -
    if(!Board.isOutOfBoundaries(this.position[0]+oneStep,this.position[1]-twoStep))
      this.moves.push(Array.from([this.position[0]+oneStep,this.position[1]-twoStep]));

    // |
    // |
    //-
    if(!Board.isOutOfBoundaries(this.position[0]-oneStep,this.position[1]-twoStep))
      this.moves.push(Array.from([this.position[0]-oneStep,this.position[1]-twoStep]));

    // --
    //|
    if(!Board.isOutOfBoundaries(this.position[0]-twoStep,this.position[1]-oneStep))
      this.moves.push(Array.from([this.position[0]-twoStep,this.position[1]-oneStep]));
    //
    //|
    // --
    if(!Board.isOutOfBoundaries(this.position[0]-twoStep,this.position[1]+oneStep))
      this.moves.push(Array.from([this.position[0]-twoStep,this.position[1]+oneStep]));

    //-
    // |
    // |
    if(!Board.isOutOfBoundaries(this.position[0]-oneStep,this.position[1]+twoStep))
      this.moves.push(Array.from([this.position[0]-oneStep,this.position[1]+twoStep]));
  }
}
const board = new Board();
const knight = new Knight(3,5);
board.placeItem(knight.position, knight.token);
knight.getMoves();
board.showPieceMoves(knight);
board.visualize();
