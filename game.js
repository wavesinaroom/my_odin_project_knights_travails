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
    this.uur; 
    
    //  |
    //--
    this.rru;

    //--
    //  |
    this.rrd;

    //|
    //|
    // -
    this.ddr;

    // |
    // |
    //-
    this.ddl;

    // --
    //|
    this.lld;

    //|
    // --
    this.llu;

    //-
    // |
    // |
    this.uul;

  }

  findTargetNode(target, visited){
    if((this.uur!==undefined)&&(this.uur.pos.toString() === target.toString())&&(this.urr.pos.toString()!==visited.pos.toString()))
      return this.uur;
    else if((this.rru!==undefined)&&(this.rru.pos.toString() === target.toString())&&this.rru.pos.toString()!==visited.pos.toString())
      return this.rru;
    else if((this.rrd!==undefined)&&(this.rrd.pos.toString() === target.toString())&&this.rrd.pos.toString()!==visited.pos.toString())
      return this.rrd;
    else if((this.ddr!==undefined)&&(this.ddr.pos.toString() === target.toString())&&this.ddr.pos.toString()!==visited.pos.toString())
      return this.ddr;
    else if((this.ddl!==undefined)&&(this.ddl.pos.toString() === target.toString())&&this.ddl.pos.toString()!==visited.pos.toString())
      return this.ddl;
    else if((this.lld!==undefined)&&(this.lld.pos.toString() === target.toString())&&this.lld.pos.toString()!==visited.pos.toString())
      return this.lld;
    else if((this.llu!==undefined)&&(this.llu.pos.toString() === target.toString())&&this.llu.pos.toString()!==visited.pos.toString())
      return this.llu;
    else if((this.uul!==undefined)&&(this.uul.pos.toString() === target.toString())&&this.uul.pos.toString()!==visited.pos.toString())
      return this.uul;
    else
      return undefined;
  }
}
class Knight{
  token = 'k';
  constructor(row,col){
    this.position = [row,col];
    this.moves = new MovesTree(this.position);
  }

  getMoves(root,target, visited){
    const twoSteps = 2;
    const oneStep = 1;
    
    // -
    //|
    //|
    if(!Board.isOutOfBoundaries(root.pos[0]+oneStep,root.pos[1]-twoSteps))
      root.uur=new MovesTree([root.pos[0]+oneStep,root.pos[1]-twoSteps]);

    //  |
    //--
    if(!Board.isOutOfBoundaries(root.pos[0]+twoSteps,root.pos[1]-oneStep))
      root.rru=new MovesTree([root.pos[0]+twoSteps,root.pos[1]-oneStep]);

    //--
    //  |
    if(!Board.isOutOfBoundaries(root.pos[0]+twoSteps,root.pos[1]+oneStep))
      root.rrd=new MovesTree([root.pos[0]+twoSteps,root.pos[1]+oneStep]);

    //|
    //|
    // -
    if(!Board.isOutOfBoundaries(root.pos[0]+oneStep,root.pos[1]+twoSteps))
      root.ddr=new MovesTree([root.pos[0]+oneStep,root.pos[1]+twoSteps]);

    // |
    // |
    //-
    if(!Board.isOutOfBoundaries(root.pos[0]-oneStep,root.pos[1]+twoSteps))
      root.ddl=new MovesTree([root.pos[0]-oneStep,root.pos[1]+twoSteps]);

    // --
    //|
    if(!Board.isOutOfBoundaries(root.pos[0]-twoSteps,root.pos[1]+oneStep))
      root.lld=new MovesTree([root.pos[0]-twoSteps,root.pos[1]+oneStep]);
    
    //|
    // --
    if(!Board.isOutOfBoundaries(root.pos[0]-twoSteps,root.pos[1]-oneStep))
      root.llu=new MovesTree([root.pos[0]-twoSteps,root.pos[1]-oneStep]);

    //-
    // |
    // |
    if(!Board.isOutOfBoundaries(root.pos[0]-oneStep,root.pos[1]-twoSteps))
      root.uul=new MovesTree([root.pos[0]-oneStep,root.pos[1]-twoSteps]);

    const foundTarget = root.findTargetNode(target, root);
    console.log(foundTarget);
    console.log(`Root:${root.pos} Visited:${visited.pos}`)

    if(foundTarget!==undefined)
      console.log('found')

    if(root.uur!==foundTarget)
      console.log(root.uur.pos)
    if(root.rru!==foundTarget)
      console.log(root.rru.pos)
    if(root.rrd!==foundTarget)
      console.log(root.rrd.pos)
    if(root.ddr!==foundTarget)
      console.log(root.ddr.pos)
    if(root.ddl!==foundTarget)
      console.log(root.ddl.pos)
    if(root.lld!==foundTarget)
      console.log(root.lld.pos)
    if(root.llu!==foundTarget)
      console.log(root.llu.pos)
    if(root.uul!==foundTarget)
      console.log(root.uul.pos)
        
  }    

}
const board = new Board();
board.targetPos = [5,2];
const knight = new Knight(3,3);

board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

knight.getMoves(knight.moves, board.targetPos, knight.moves);
board.visualize();
