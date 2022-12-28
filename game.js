class Board{
  static size = 8;

  targetPos = [];
  targetToken = 't';
  moveToken = 'a';

  static isOutOfBoundaries(x,y){
    if(x>Board.size-1||x<0)
      return true;
    else if(y>Board.size-1||y<0)
      return true;
    else
      return false;
  }

  constructor(){
    this.tiles = Array.from(Array(Board.size), ()=>Array.from(Array(Board.size), tile=>'·')); 
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
  
  markPieceMoves(piece){
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

  getMoves(position,target){
    const twoSteps = 2;
    const oneStep = 1;
    
    let moves = [];
    let foundTarget = false;
    
    // -
    //|
    //|
    if(!Board.isOutOfBoundaries(position[0]+oneStep,position[1]-twoSteps))
      moves.push(Array.from([position[0]+oneStep,position[1]-twoSteps]));

    //  |
    //--
    if(!Board.isOutOfBoundaries(position[0]+twoSteps,position[1]-oneStep))
      moves.push(Array.from([position[0]+twoSteps,position[1]-oneStep]));

    //--
    //  |
    if(!Board.isOutOfBoundaries(position[0]+twoSteps,position[1]+oneStep))
      moves.push(Array.from([position[0]+twoSteps,position[1]+oneStep]));

    //|
    //|
    // -
    if(!Board.isOutOfBoundaries(position[0]+oneStep,position[1]+twoSteps))
      moves.push(Array.from([position[0]+oneStep,position[1]+twoSteps]));

    // |
    // |
    //-
    if(!Board.isOutOfBoundaries(position[0]-oneStep,position[1]+twoSteps))
      moves.push(Array.from([position[0]-oneStep,position[1]+twoSteps]));

    // --
    //|
    if(!Board.isOutOfBoundaries(position[0]-twoSteps,position[1]+oneStep))
      moves.push(Array.from([position[0]-twoSteps,position[1]+oneStep]));
    
    //|
    // --
    if(!Board.isOutOfBoundaries(position[0]-twoSteps,position[1]-oneStep))
      moves.push(Array.from([position[0]-twoSteps,position[1]-oneStep]));

    //-
    // |
    // |
    if(!Board.isOutOfBoundaries(position[0]-oneStep,position[1]-twoSteps))
      moves.push(Array.from([position[0]-oneStep,position[1]-twoSteps]));

    for(let i = 0; i<moves.length; ++i){
      if(moves[i].toString() === target.toString()){
        foundTarget = true;
        break;
      }
    }

    if(foundTarget)
      return moves;
    else
      console.log('nothing')
  }
}
const board = new Board();
board.targetPos = [7,0];
const knight = new Knight(6,2);

board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

knight.moves = knight.getMoves(knight.position, board.targetPos);
console.dir(knight.moves);
board.visualize();
