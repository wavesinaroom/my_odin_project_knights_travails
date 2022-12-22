class Board{
  size = 8;

  constructor(){
    this.tiles = Array.from(Array(this.size), ()=>Array.from(Array(this.size), tile=>',')); 
  }

  visualize(){
    this.tiles.forEach(row=>console.log(row.join(' ')));
  }

  placePiece(knight){
    this.tiles[knight.position[0]][knight.position[1]] = knight.ascii;
  }
}

class Knight{
  ascii = 'k';
  constructor(row,col){
    this.position = [row,col];
  }
}
const board = new Board();
const knight = new Knight(4,4);
board.placePiece(knight);
board.visualize();
