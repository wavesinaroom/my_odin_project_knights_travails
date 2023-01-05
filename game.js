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

class MovesTree{
  constructor(position){
    
    this.pos = position;

    // -
    //|
    //|
    this.uur = null; 
    
    //  |
    //--
    this.rru = null;

    //--
    //  |
    this.rrd = null;

    //|
    //|
    // -
    this.ddr = null;

    // |
    // |
    //-
    this.ddl = null;

    // --
    //|
    this.lld = null;

    //|
    // --
    this.llu = null;

    //-
    // |
    // |
    this.uul = null;

  }

  static getMoves(node){
    const twoSteps = 2;
    const oneStep = 1;
    // -
    //|
    //|
    if(!Board.isOutOfBoundaries(node.pos[0]+oneStep,node.pos[1]-twoSteps))
      node.uur=new MovesTree([node.pos[0]+oneStep,node.pos[1]-twoSteps]);

    //  |
    //--
    if(!Board.isOutOfBoundaries(node.pos[0]+twoSteps,node.pos[1]-oneStep))
      node.rru=new MovesTree([node.pos[0]+twoSteps,node.pos[1]-oneStep]);
    //--
    //  |
    if(!Board.isOutOfBoundaries(node.pos[0]+twoSteps,node.pos[1]+oneStep))
      node.rrd=new MovesTree([node.pos[0]+twoSteps,node.pos[1]+oneStep]);
    //|
    //|
    // -
    if(!Board.isOutOfBoundaries(node.pos[0]+oneStep,node.pos[1]+twoSteps))
      node.ddr=new MovesTree([node.pos[0]+oneStep,node.pos[1]+twoSteps]);
    // |
    // |
    //-
    if(!Board.isOutOfBoundaries(node.pos[0]-oneStep,node.pos[1]+twoSteps))
      node.ddl=new MovesTree([node.pos[0]-oneStep,node.pos[1]+twoSteps]);
    // --
    //|
    if(!Board.isOutOfBoundaries(node.pos[0]-twoSteps,node.pos[1]+oneStep))
      node.lld=new MovesTree([node.pos[0]-twoSteps,node.pos[1]+oneStep]);
    //|
    // --
    if(!Board.isOutOfBoundaries(node.pos[0]-twoSteps,node.pos[1]-oneStep))
      node.llu=new MovesTree([node.pos[0]-twoSteps,node.pos[1]-oneStep]);
    //-
    // |
    // |
    if(!Board.isOutOfBoundaries(node.pos[0]-oneStep,node.pos[1]-twoSteps))
      node.uul=new MovesTree([node.pos[0]-oneStep,node.pos[1]-twoSteps]);

  }    

  BFS(func,target){
    let queue = [this];
    while(queue.length>0){
      if(target.toString()!==queue[0].pos.toString()){
        MovesTree.getMoves(queue[0])
        queue.push(...func(queue[0]));
      }
      else
        return; 
      queue.shift();
    }
  }

  toArray(node){

    let array = [];
    for(let move in node){
      if(move!==null&&Object.keys(node)[0]!=='pos')
        array.push(move)
    }
    return array;
  }
}
class Knight{
  token = 'k';
  constructor(row,col){
    this.position = [row,col];
    this.moves = new MovesTree(this.position,this);
  }
}
const board = new Board();
board.targetPos = [5,2];
const knight = new Knight(4,4);
board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

knight.moves.BFS(knight.moves.toArray, board.targetPos);
console.log(knight.moves);
board.visualize();
