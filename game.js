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

  BFS(func,target){
    let queue = [this];
    while(queue.length>0){
      queue.push(...func(queue[0]));
      if(target.toString()===queue[0].pos.toString())
        return queue[0];
      queue.shift();
    }
    return;
  }

  toArray(node){

    let array = [];
    if(node.uur!==null)
      array.push(node.uur);
    if(node.rru!==null)
      array.push(node.rru);
    if(node.rrd!==null)
      array.push(node.rrd);
    if(node.ddr!==null)
      array.push(node.ddr);
    if(node.ddl!==null)
      array.push(node.ddl);
    if(node.lld!==null)
      array.push(node.lld);
    if(node.llu!==null)
      array.push(node.llu);
    if(node.uul!==null)
      array.push(node.uul);
    return array;
  }
}
class Knight{
  token = 'k';
  constructor(row,col){
    this.position = [row,col];
    this.moves = new MovesTree(this.position);
  }

  getMoves(node, target){
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

    /*
     * BFS goes here
     * if it finds any leaf node that equals target stop recursion
     * else 
     * recursively call this function for each of the possible moves
     */
    const found = this.moves.BFS(this.moves.toArray, target);
    if(found !== undefined){
      console.dir(this.moves)
      return;
    }
    else{
      if(node.uur!==null)
        this.getMoves(node.uur, target)
      if(node.rru!==null)
        this.getMoves(node.rru, target)
      if(node.rrd!==null)
        this.getMoves(node.rrd, target);
      if(node.ddr!==null)
        this.getMoves(node.ddr, target);
      if(node.ddl!==null)
        this.getMoves(node.ddl, target);
      if(node.lld!==null)
        this.getMoves(node.lld, target);
      if(node.llu!==null)
        this.getMoves(node.llu, target);
      if(node.uul!==null)
        this.getMoves(node.uul, target);
    }
  }    

}
const board = new Board();
board.targetPos = [5,2];
const knight = new Knight(6,3);
board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

knight.getMoves(knight.moves, board.targetPos, knight.moves);
board.visualize();
