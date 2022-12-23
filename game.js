class Board{
  size = 8;
  targetPos = [];
  targetToken = 'd';

  static isOutOfBoundaries(x,y){
    if(x>this.size||x<0)
      return true;
    else if(y>this.size||y<0)
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
      this.tiles[position[0]][position[1]] = token;
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
const knight = new Knight(4,4);
board.targetPos = [2,4];
board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken);
board.visualize();
knight.getMoves();
console.dir(knight.moves);
