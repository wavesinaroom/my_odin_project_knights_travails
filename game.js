class Board{
  size = 8;
  targetPos = [];
  targetToken = 'd';

  static isOutOfBoundaries(coordinate){
    if(coordinate[0]>this.size||coordinate[0]<0)
      return true;
    else if(coordinate[1]>this.size||coordinate[1]<0)
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
    if(Board.isOutOfBoundaries(position))
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
board.placeItem(knight.position, knight.token);
board.placeItem(board.targetPos, board.targetToken);
board.visualize();
