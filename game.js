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

class MovesGraph{
  constructor(start){
    this.map = new Map();
    this.map.set(start, []);
  }

  addMove(position, move){
    this.map.get(position).push(move);
  }

  BFS(start, target){
    let visited = {};
    let queue = []; 
    visited[start] = true;
    queue.push(start);
    while(queue.length!==0){
      const head = queue.shift();
      console.log(head);
      const list = this.map.get(head);
      for(let i in list)
      {
        const neigh = list[i];
        if(!visited[neigh]){
          visited[neigh] = true;
          queue.shift();
        }
      }
    }
  }
}

class Knight{
  token = 'k';
  constructor(row,col){
    this.position = [row,col];
    this.moves = new MovesGraph(this.position);
}

  getMoves(node, target){
    const twoSteps = 2;
    const oneStep = 1;

    // -
    //|
    //|
    if(!Board.isOutOfBoundaries(this.position[0]+oneStep,this.position[1]-twoSteps))
      this.moves.addMove(this.position,[this.position[0]+oneStep,this.position[1]-twoSteps]);

    //  |
    //--
    if(!Board.isOutOfBoundaries(this.position[0]+twoSteps,this.position[1]-oneStep))
      this.moves.addMove(this.position, [this.position[0]+twoSteps,this.position[1]-oneStep]);
    //--
    //  |
    if(!Board.isOutOfBoundaries(this.position[0]+twoSteps,this.position[1]+oneStep))
      this.moves.addMove(this.position, [this.position[0]+twoSteps,this.position[1]+oneStep]);
    //|
    //|
    // -
    if(!Board.isOutOfBoundaries(this.position[0]+oneStep,this.position[1]+twoSteps))
      this.moves.addMove(this.position, [this.position[0]+oneStep,this.position[1]+twoSteps]);
    // |
    // |
    //-
    if(!Board.isOutOfBoundaries(this.position[0]-oneStep,this.position[1]+twoSteps))
      this.moves.addMove(this.position, [this.position[0]-oneStep,this.position[1]+twoSteps]);
    // --
    //|
    if(!Board.isOutOfBoundaries(this.position[0]-twoSteps,this.position[1]+oneStep))
      this.moves.addMove(this.position, [this.position[0]-twoSteps,this.position[1]+oneStep]);
    //|
    // --
    if(!Board.isOutOfBoundaries(this.position[0]-twoSteps,this.position[1]-oneStep))
      this.moves.addMove(this.position, [this.position[0]-twoSteps,this.position[1]-oneStep]);
    //-
    // |
    // |
    if(!Board.isOutOfBoundaries(this.position[0]-oneStep,this.position[1]-twoSteps))
      this.moves.addMove(this.position, [this.position[0]-oneStep,this.position[1]-twoSteps]);


    this.moves.BFS(this.position, target); 
  }    

}
const board = new Board();
board.targetPos = [5,6];
const knight = new Knight(6,4);
board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken)

const path = knight.getMoves(knight.moves, board.targetPos);
board.visualize();
