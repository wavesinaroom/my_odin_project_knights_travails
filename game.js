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
    this.moves = new MovesTree(this.position,this);
}

  getMoves(node, target, path){
    const twoSteps = 2;
    const oneStep = 1;
    let visited; 
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

    
    path === undefined ? visited = [node.pos]:visited = this.mergePath(path, node.pos);
    const found = this.moves.BFS(this.moves.toArray, target);
    if(found !== undefined){
      console.log(visited);
      return visited;
    }
    else{
      
      if(node.uur!==null)
        if(this.checkVisited(node.uur.pos, visited)===false)
          this.getMoves(node.uur, target, visited);
      if(node.rru!==null)
        if(this.checkVisited(node.rru.pos, visited)===false)
          this.getMoves(node.rru, target, visited);
      if(node.rrd!==null)
        if(this.checkVisited(node.rrd.pos, visited)===false)
          this.getMoves(node.rrd, target, visited);
      if(node.ddr!==null)
        if(this.checkVisited(node.ddr.pos, visited)===false)
          this.getMoves(node.ddr, target, visited);
      if(node.ddl!==null)
        if(this.checkVisited(node.ddl.pos, visited)===false)
          this.getMoves(node.ddl, target, visited);
      if(node.lld!==null)
        if(this.checkVisited(node.lld.pos, visited)===false)
          this.getMoves(node.lld, target, visited);
      if(node.llu!==null)
        if(this.checkVisited(node.llu.pos, visited)===false)
          this.getMoves(node.llu, target, visited);
      if(node.uul!==null)
        if(this.checkVisited(node.uul.pos, visited)===false)
          this.getMoves(node.uul, target, visited);
    }

  }    
  mergePath(path, current){
    let merged = [];
    merged.push(current)
    path.forEach(step=>{
      merged.push(step);
    });
    return merged;
  }
  checkVisited(pos, visited){
    let check = false;
    visited.forEach(tile=>{
      if(tile.toString()===pos.toString())
        check = true;
    });
    return check;
  }

}
const board = new Board();
board.targetPos = [5,2];
const knight = new Knight(5,4);
board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

const path = knight.getMoves(knight.moves, board.targetPos);
console.log(path);
board.visualize();
