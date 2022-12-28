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

  findTargetNode(target){
    if((this.uur!==undefined)&&(this.uur.toString() === target.toString()))
      return this.uur;
    else if((this.rru!==undefined)&&(this.rru.toString() === target.toString()))
      return this.rru;
    else if((this.rrd!==undefined)&&(this.rrd.toString() === target.toString()))
      return this.rrd;
    else if((this.ddr!==undefined)&&(this.ddr.toString() === target.toString()))
      return this.ddr;
    else if((this.ddl!==undefined)&&(this.ddl.toString() === target.toString()))
      return this.ddl;
    else if((this.lld!==undefined)&&(this.lld.toString() === target.toString()))
      return this.lld;
    else if((this.llu!==undefined)&&(this.llu.toString() === target.toString()))
      return this.llu;
    else if((this.uul!==undefined)&&(this.uul.toString() === target.toString()))
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

  getMoves(root,target){
    const twoSteps = 2;
    const oneStep = 1;
    
    if(root.findTargetNode(target)!==undefined)
      return;

    
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

    console.log(root.uur, root.rru, root.rrd, root.ddr, root.ddl, root.lld, root.llu, root.uul);
    if(root.uur!==undefined)
      this.getMoves(root.uur,target);
    if(root.rru!==undefined)
      this.getMoves(root.rru,target);
    if(root.rrd!==undefined)
      this.getMoves(root.rrd,target);
    if(root.ddr!==undefined)
      this.getMoves(root.ddr,target);
    if(root.ddl!==undefined)
      this.getMoves(root.ddl,target);
    if(root.lld!==undefined)
      this.getMoves(root.lld,target);
    if(root.llu!==undefined)
      this.getMoves(root.llu,target);
    if(root.uul!==undefined)
      this.getMoves(root.uul,target);
  }    
}
const board = new Board();
board.targetPos = [3,3];
const knight = new Knight(6,2);

board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

knight.getMoves(knight.moves, board.targetPos);
board.visualize();
